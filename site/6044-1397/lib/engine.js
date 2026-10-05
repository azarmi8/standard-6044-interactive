/* 6044 Interactive Book Engine — v0.8
   Shared reader playback, strict Persian narration, chapter HUD.
*/
(function(){
  'use strict';
  function boot(){
    const cfg=window.BOOK_CONFIG||{};
    const beats=Array.isArray(cfg.beats)?cfg.beats:[];
    const quiz=cfg.quiz||null;
    let index=0,timer=null,playing=false,interval=Number(cfg.interval||5000);
    const $=id=>document.getElementById(id);
    const title=$('title'), body=$('body'), count=$('count'), bar=$('bar'), play=$('play');
    const prev=$('prev'), next=$('next'), result=$('quizResult')||$('result'), fullscreen=$('fullscreen');
    const controls=document.querySelector('.book-controls');
    let stepMode=false, narrationAudio=null, speechUtterance=null, speechRate=0.9, voiceProbe=null;
    const progressKey='standard6044-book-progress-v1';
    const chapterKey=location.pathname.match(/\/ch(\d{2})\//)?.[1]||null;

    function loadProgress(){try{return JSON.parse(localStorage.getItem(progressKey)||'{}')}catch(e){return {}}}
    function chapterNumber(){return chapterKey?Number(chapterKey):null}
    function chapterNav(){
      const n=chapterNumber(); if(!n)return;
      const host=document.querySelector('.book-controls'); if(!host)return;
      if(host.querySelector('.chapter-nav'))return;
      const nav=document.createElement('nav');
      nav.className='chapter-nav';
      nav.setAttribute('aria-label','ناوبری فصل');
      const prevLink=n>1?'ch'+String(n-1).padStart(2,'0')+'/':'../';
      const nextLink=n<22?'ch'+String(n+1).padStart(2,'0')+'/':'../';
      nav.innerHTML='<a class="secondary nav-link" href="'+prevLink+'">'+(n>1?'← فصل قبلی':'← فهرست')+'</a><a class="secondary nav-link" href="../">فهرست</a><a class="secondary nav-link" href="'+nextLink+'">'+(n<22?'فصل بعدی →':'فهرست →')+'</a>';
      host.insertBefore(nav,host.firstChild);
    }
    function saveProgress(){
      if(!chapterKey)return;
      const p=loadProgress();
      p[chapterKey]={index,total:beats.length,updatedAt:new Date().toISOString()};
      try{localStorage.setItem(progressKey,JSON.stringify(p))}catch(e){}
    }
    function toggleBookmark(){
      if(!chapterKey)return;
      const p=loadProgress(), k='bookmark'; p[k]=p[k]||{};
      if(p[k][chapterKey]===index)delete p[k][chapterKey]; else p[k][chapterKey]=index;
      try{localStorage.setItem(progressKey,JSON.stringify(p))}catch(e){}
      updateBookmarkButton();
    }
    function updateBookmarkButton(){
      const b=$('bookmark'); if(!b||!chapterKey)return;
      const p=loadProgress(), saved=p.bookmark&&p.bookmark[chapterKey]===index;
      b.textContent=saved?'★ نشانک فعال':'☆ نشانک';
      b.setAttribute('aria-pressed',String(!!saved));
    }
    function restoreProgress(){
      if(!chapterKey)return;
      const p=loadProgress(),saved=p[chapterKey];
      if(saved&&Number.isInteger(saved.index)&&saved.index>=0&&saved.index<beats.length)index=saved.index;
    }
    function sceneTargets(n){
      document.querySelectorAll('[data-beat]').forEach(el=>{
        const values=(el.getAttribute('data-beat')||'').split(/\s+/).filter(Boolean).map(Number);
        const active=values.includes(n+1);
        el.classList.toggle('is-active',active);
        el.setAttribute('aria-hidden',active?'false':'true');
      });
    }
    function applyScene(scene,n){
      if(!scene||typeof scene!=='object')return;
      const root=document.querySelector(scene.root||'.stage,.book-stage'); if(!root)return;
      const step=(scene.steps||[])[n]||{};
      if(step.focus){
        root.style.setProperty('--scene-focus-x',String(step.focus.x??50)+'%');
        root.style.setProperty('--scene-focus-y',String(step.focus.y??50)+'%');
        root.classList.add('has-scene-focus');
      }else root.classList.remove('has-scene-focus');
      if(step.className)root.dataset.sceneState=step.className;
      if(step.progress!=null)root.style.setProperty('--scene-progress',String(step.progress));
      root.querySelectorAll('[data-scene-role]').forEach(el=>{
        const role=el.getAttribute('data-scene-role');
        const visible=Array.isArray(step.show)?step.show.includes(role):true;
        el.classList.toggle('is-scene-visible',visible);
        el.setAttribute('aria-hidden',visible?'false':'true');
      });
    }
    function lifecycle(name,n,b){
      const fn=cfg[name]; if(typeof fn==='function')fn(n,b);
      const hook=cfg.scene&&cfg.scene[name]; if(typeof hook==='function')hook(n,b);
    }
    function narrationFor(i){
      const b=beats[i]||{}, n=cfg.narration;
      const item=Array.isArray(n)?(n[i]||null):(n&&Array.isArray(n.beats)?(n.beats[i]||null):null);
      return Object.assign({
        displayText:b.displayText||b.body||'',
        spokenText:b.spokenText||b.body||'',
        lang:'fa-IR',
        rate:0.9
      },item||{});
    }
    function speechSupported(){return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window}
    function faVoices(){
      if(!speechSupported())return [];
      return window.speechSynthesis.getVoices().filter(v=>/^fa([_-]|$)/i.test(v.lang||'')||/persian|farsi|فارسی/i.test(v.name||''));
    }
    function setNarrationStatus(msg,kind){
      const el=document.querySelector('[data-narration-status]'); if(el){el.textContent=msg;el.dataset.kind=kind||'';}
    }
    function stopSpeech(cancel=true){
      if(!speechSupported())return;
      if(cancel)window.speechSynthesis.cancel();
      speechUtterance=null;
    }
    function waitForFaVoice(){
      if(!speechSupported())return Promise.resolve(null);
      const voices=faVoices();
      if(voices.length)return Promise.resolve(voices[0]);
      if(voiceProbe)return voiceProbe;
      voiceProbe=new Promise(resolve=>{
        let done=false;
        const finish=voice=>{if(done)return;done=true;window.speechSynthesis.removeEventListener('voiceschanged',onChange);clearTimeout(timer);voiceProbe=null;resolve(voice||null)};
        const onChange=()=>finish(faVoices()[0]||null);
        const timer=setTimeout(()=>finish(faVoices()[0]||null),900);
        window.speechSynthesis.addEventListener('voiceschanged',onChange,{once:false});
      });
      return voiceProbe;
    }
    async function speakCurrent(){
      if(!speechSupported()){setNarrationStatus('صدای مرورگر در دسترس نیست','error');return false}
      const n=narrationFor(index), text=n.spokenText||n.displayText||'';
      if(!text)return false;
      const voice=await waitForFaVoice();
      if(!voice){
        stopSpeech(true);
        setNarrationStatus('صدای فارسی روی این دستگاه پیدا نشد — زبان مرورگر انگلیسی نمی‌شود','warning');
        return false;
      }
      stopSpeech(true);
      speechUtterance=new SpeechSynthesisUtterance(text);
      speechUtterance.lang='fa-IR';
      speechUtterance.voice=voice;
      speechUtterance.rate=Number(n.rate||speechRate||0.9);
      speechUtterance.pitch=1;
      const current=index;
      speechUtterance.onstart=()=>{
        const panel=document.querySelector('[data-narration-panel]');
        if(panel)panel.dataset.state='playing';
        setNarrationStatus('در حال پخش روایت فارسی — '+(voice.name||'صدای فارسی'),'playing');
      };
      speechUtterance.onend=()=>{
        if(current!==index)return;
        lifecycle('onNarrationEnd',index,beats[index]);
        if(playing){
          if(index<beats.length-1)go(index+1); else stop();
        }
      };
      speechUtterance.onerror=()=>{
        if(current!==index)return;
        setNarrationStatus('پخش روایت فارسی با خطا متوقف شد','error');
        if(playing)stop();
      };
      window.speechSynthesis.speak(speechUtterance);
      return true;
    }
    function syncNarration(){
      if(narrationAudio){narrationAudio.pause();narrationAudio=null}
      stopSpeech(true);
      const n=narrationFor(index);
      const transcript=document.querySelector('[data-narration-transcript]');
      if(transcript)transcript.textContent=n.displayText||n.spokenText||'';
      const rateSelect=document.querySelector('[data-narration-rate]');
      if(rateSelect)rateSelect.value=String(speechRate);
      const fa=faVoices();
      setNarrationStatus(
        n.src?'روایت استودیویی آماده':
        (fa.length?'صدای فارسی دستگاه آماده — سرعت پیش‌فرض ۰٫۹×':'برای روایت فارسی، صدای فارسی دستگاه لازم است؛ انگلیسی پخش نمی‌شود'),
        fa.length||n.src?'ready':'warning'
      );
      const panel=document.querySelector('[data-narration-panel]');
      if(panel)panel.dataset.state='idle';
    }
    async function playNarration(){
      if(narrationAudio){
        narrationAudio.play().catch(()=>{});
        lifecycle('onNarrationPlay',index,beats[index]);
        return true;
      }
      const ok=await speakCurrent();
      if(ok)lifecycle('onNarrationPlay',index,beats[index]);
      else{
        playing=false;
        if(play)play.textContent='پخش';
        const panel=document.querySelector('[data-narration-panel]'); if(panel)panel.dataset.state='idle';
      }
      return ok;
    }
    function pauseNarration(){
      if(narrationAudio){narrationAudio.pause();lifecycle('onNarrationPause',index,beats[index]);return}
      if(speechSupported()){window.speechSynthesis.pause();lifecycle('onNarrationPause',index,beats[index]);setNarrationStatus('روایت مکث شد','paused')}
    }
    function replayNarration(){
      if(narrationAudio){narrationAudio.currentTime=0;playNarration();return}
      playNarration().then(ok=>{if(ok)setNarrationStatus('در حال بازپخش روایت فارسی','playing')});
    }
    function setNarrationRate(rate){
      speechRate=Math.max(.65,Math.min(1.35,Number(rate)||.9));
      const rateSelect=document.querySelector('[data-narration-rate]'); if(rateSelect)rateSelect.value=String(speechRate);
      if(speechUtterance){
        const wasSpeaking=speechSupported()&&!window.speechSynthesis.paused;
        stopSpeech(true);
        if(wasSpeaking)playNarration();
      }
    }
    function ensureNarrationUI(){
      const host=document.querySelector('[data-narration-panel]')||document.querySelector('.narration-panel');
      if(host)host.setAttribute('data-narration-panel','true');
      else{
        const after=document.querySelector('.book-controls'); if(!after)return;
        const panel=document.createElement('section');
        panel.className='narration-panel';
        panel.setAttribute('data-narration-panel','true');
        panel.setAttribute('aria-label','روایت فارسی');
        panel.innerHTML='<div class="narration-head"><div><strong data-narration-status>روایت فارسی</strong><span class="narration-label">FA / VOICE</span></div><div class="narration-actions"><button type="button" data-narrate-play>▶ روایت</button><button type="button" data-narrate-pause class="secondary">⏸ مکث</button><button type="button" data-narrate-replay class="secondary">↻ بازپخش</button><label>سرعت <select data-narration-rate aria-label="سرعت روایت"><option value="0.75">۰٫۷۵×</option><option value="0.9" selected>۰٫۹×</option><option value="1">۱×</option><option value="1.15">۱٫۱۵×</option><option value="1.25">۱٫۲۵×</option></select></label></div></div><p data-narration-transcript>روایت این گام اینجا نمایش داده می‌شود.</p>';
        after.insertAdjacentElement('afterend',panel);
      }
      const p=$('[data-narrate-play]'),pause=$('[data-narrate-pause]'),replay=$('[data-narrate-replay]'),rate=$('[data-narration-rate]');
      if(p)p.onclick=()=>playNarration();
      if(pause)pause.onclick=()=>{pauseNarration();const panel=$('[data-narration-panel]');if(panel)panel.dataset.state='paused';};
      if(replay)replay.onclick=()=>replayNarration();
      if(rate)rate.onchange=()=>setNarrationRate(rate.value);
      if(speechSupported()&&!window.speechSynthesis.__6044Listener){
        window.speechSynthesis.__6044Listener=true;
        window.speechSynthesis.addEventListener('voiceschanged',()=>{if(document.visibilityState!=='hidden')syncNarration()});
      }
    }
    function faNum(n){return String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d])}
    function ensureReaderHUD(){
      const stage=document.querySelector('.stage,.book-stage'); if(!stage)return null;
      let hud=stage.querySelector('[data-reader-hud]');
      if(hud)return hud;
      hud=document.createElement('div');
      hud.className='reader-hud';
      hud.setAttribute('data-reader-hud','true');
      hud.innerHTML='<div class="reader-hud-head"><div><span class="reader-hud-brand">6044 / ENGINEERING READER</span><span class="reader-hud-source" data-reader-hud-source>استاندارد ملی ایران ۶۰۴۴:۱۳۹۷</span></div><span class="reader-hud-step" data-reader-hud-step></span></div><div class="reader-hud-main"><strong data-reader-hud-title></strong><span data-reader-hud-role>منبع → فهم → کاربرد → تمرین → تصمیم</span></div><div class="reader-hud-rail" data-reader-hud-rail aria-label="مراحل این بخش"></div>';
      stage.appendChild(hud);
      return hud;
    }
    function updateReaderHUD(){
      const hud=ensureReaderHUD(); if(!hud)return;
      const beat=beats[index]||{},step=hud.querySelector('[data-reader-hud-step]'),t=hud.querySelector('[data-reader-hud-title]'),source=hud.querySelector('[data-reader-hud-source]'),rail=hud.querySelector('[data-reader-hud-rail]');
      if(step)step.textContent='گام '+faNum(index+1)+' / '+faNum(beats.length);
      if(t)t.textContent=beat.title||'';
      if(source)source.textContent=beat.sourceRef||'استاندارد ملی ایران ۶۰۴۴:۱۳۹۷';
      if(rail&&rail.childElementCount!==beats.length){
        rail.innerHTML='';
        beats.forEach((b,i)=>{
          const btn=document.createElement('button');
          btn.type='button';btn.className='reader-hud-dot';btn.dataset.readerBeat=String(i);
          btn.setAttribute('aria-label','گام '+faNum(i+1)+': '+(b.title||''));
          btn.title=b.title||'';
          btn.onclick=()=>go(i);
          rail.appendChild(btn);
        });
      }
      if(rail)rail.querySelectorAll('.reader-hud-dot').forEach((el,i)=>{
        const active=i===index;
        el.classList.toggle('is-current',active);
        el.setAttribute('aria-current',active?'step':'false');
      });
    }
    function render(){
      if(!beats.length)return;
      const b=beats[index]||{};
      if(title)title.textContent=b.title||b[0]||'';
      if(body)body.textContent=b.body||b[1]||'';
      if(count)count.textContent=faNum(index+1)+' / '+faNum(beats.length);
      if(bar)bar.style.width=((index+1)/beats.length*100)+'%';
      sceneTargets(index);applyScene(cfg.scene,index);updateReaderHUD();
      document.documentElement.style.setProperty('--beat-index',index);
      lifecycle('onRender',index,b);saveProgress();updateBookmarkButton();syncNarration();
    }
    function go(n){
      const ni=Math.max(0,Math.min(beats.length-1,n));
      if(ni===index&&beats.length){render();if(playing&&!timer)playNarration();return}
      lifecycle('onBeatEnd',index,beats[index]);index=ni;render();lifecycle('onBeatStart',index,beats[index]);
      if(playing&&!timer)playNarration();
    }
    function stop(){
      if(timer){clearInterval(timer);timer=null}
      const was=playing;playing=false;pauseNarration();
      if(play)play.textContent='پخش';
      const panel=$('[data-narration-panel]');if(panel)panel.dataset.state='paused';
      if(was)lifecycle('onPause',index,beats[index]);
    }
    function step(){if(!beats.length)return;stop();go(index+1)}
    function toggleStepMode(){
      stepMode=!stepMode;if(stepMode)stop();
      const b=$('step');if(b)b.setAttribute('aria-pressed',String(stepMode));
      const root=document.querySelector('.stage,.book-stage');if(root)root.classList.toggle('step-mode',stepMode);
    }
    function toggle(){
      if(playing){stop();return}
      if(stepMode||((window.matchMedia)&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)){step();return}
      playing=true;if(play)play.textContent='توقف';
      playNarration().then(ok=>{if(!ok)return;lifecycle('onPlay',index,beats[index])});
    }
    function enter(){
      lifecycle('onEnter',index,beats[index]);render();lifecycle('onBeatStart',index,beats[index]);
    }
    if(prev)prev.onclick=()=>go(index-1);
    if(next)next.onclick=()=>go(index+1);
    if(play)play.onclick=toggle;
    if(controls&&!$('bookmark')){
      const b=document.createElement('button');b.id='bookmark';b.type='button';b.className='secondary';b.textContent='☆ نشانک';b.onclick=toggleBookmark;controls.appendChild(b);
    }
    if(controls&&!$('step')){
      const b=document.createElement('button');b.id='step';b.type='button';b.textContent='گام بعدی';b.setAttribute('aria-pressed','false');controls.appendChild(b);
    }
    const stepButton=$('step');if(stepButton){stepButton.onclick=()=>step();stepButton.addEventListener('dblclick',toggleStepMode)}
    ensureNarrationUI();chapterNav();restoreProgress();
    if(fullscreen)fullscreen.onclick=()=>{
      const el=document.querySelector('.stage,.book-stage');if(!el)return;
      if(document.fullscreenElement)document.exitFullscreen();else if(el.requestFullscreen)el.requestFullscreen();
    };
    document.addEventListener('keydown',e=>{
      if(e.target&&/INPUT|TEXTAREA|SELECT|BUTTON/.test(e.target.tagName))return;
      if(e.key==='ArrowRight')go(index+1);
      if(e.key==='ArrowLeft')go(index-1);
      if(e.key===' '){e.preventDefault();toggle()}
      if(e.key.toLowerCase()==='s'){e.preventDefault();step()}
      if(e.key.toLowerCase()==='m'){e.preventDefault();toggleStepMode()}
      if(e.key==='Home')go(0);
      if(e.key==='End')go(beats.length-1);
      if(e.key.toLowerCase()==='f'){e.preventDefault();if(fullscreen)fullscreen.click()}
    });
    document.addEventListener('visibilitychange',()=>{if(document.hidden&&timer)stop()});
    if(quiz&&result){
      document.querySelectorAll('[data-q],[data-ok]').forEach(btn=>btn.addEventListener('click',()=>{
        const key=btn.dataset.q||btn.dataset.ok,good=key==='good'||key==='1';
        result.textContent=good?(quiz.correct||'درست.'):(quiz.incorrect||'این پاسخ درست نیست. دوباره به منبع و توضیح برگرد.');
        result.className=good?'good':'bad';
      }));
    }
    window.addEventListener('beforeunload',()=>{stopSpeech(true);lifecycle('onExit',index,beats[index])});
    enter();
    window.BookEngine={next:()=>go(index+1),prev:()=>go(index-1),play:toggle,stop,step,toggleStepMode,go,playNarration,pauseNarration,replayNarration,setNarrationRate,toggleBookmark,get index(){return index},get total(){return beats.length}};
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
