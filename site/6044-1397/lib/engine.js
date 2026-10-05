/* 6044 Interactive Book Engine — v1.0 audio + engineering core
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
      const audioSrc=item&&item.src?item.src:(chapterKey?'../audio/fa/ch'+chapterKey+'-'+String(i+1).padStart(2,'0')+'.mp3':'');
      return Object.assign({
        displayText:b.displayText||b.body||'',
        spokenText:b.spokenText||b.body||'',
        lang:'fa-IR',
        rate:0.9,
        src:audioSrc
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
      if(narrationAudio){narrationAudio.pause();narrationAudio.onended=null;narrationAudio.onerror=null;narrationAudio=null}
      stopSpeech(true);
      const n=narrationFor(index);
      const transcript=document.querySelector('[data-narration-transcript]');
      if(transcript)transcript.textContent=n.displayText||n.spokenText||'';
      const rateSelect=document.querySelector('[data-narration-rate]');
      if(rateSelect)rateSelect.value=String(speechRate);
      if(n.src){
        narrationAudio=new Audio(n.src);
        narrationAudio.preload='auto';
        narrationAudio.playbackRate=speechRate;
        narrationAudio.onended=()=>{
          if(playing){ if(index<beats.length-1)go(index+1); else stop(); }
        };
        narrationAudio.onerror=()=>{
          narrationAudio=null;
          const fa=faVoices();
          setNarrationStatus(fa.length?'فایل صوتی در دسترس نبود — بلندخوانی فارسی دستگاه':'فایل صوتی فارسی در دسترس نبود — صدای انگلیسی پخش نمی‌شود','warning');
        };
      }
      const fa=faVoices();
      setNarrationStatus(
        narrationAudio?'روایت صوتی فارسی آماده':
        (fa.length?'بلندخوانی فارسی دستگاه آماده — سرعت پیش‌فرض ۰٫۹×':'فایل صوتی فارسی/صدای فارسی دستگاه در دسترس نیست'),
        narrationAudio||fa.length?'ready':'warning'
      );
      const panel=document.querySelector('[data-narration-panel]');
      if(panel)panel.dataset.state='idle';
    }
    async function playNarration(){
      if(narrationAudio){
        narrationAudio.currentTime=Math.max(0,narrationAudio.currentTime||0);
        narrationAudio.play().then(()=>lifecycle('onNarrationPlay',index,beats[index])).catch(()=>{narrationAudio=null;playNarration();});
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
      if(narrationAudio){narrationAudio.currentTime=0;narrationAudio.play().catch(()=>{});return}
      playNarration().then(ok=>{if(ok)setNarrationStatus('در حال بازپخش روایت فارسی','playing')});
    }
    function setNarrationRate(rate){
      speechRate=Math.max(.65,Math.min(1.35,Number(rate)||.9));
      const rateSelect=document.querySelector('[data-narration-rate]'); if(rateSelect)rateSelect.value=String(speechRate);
      if(narrationAudio)narrationAudio.playbackRate=speechRate;
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


    /* v0.9 visual scene compositor — turns flat SVG stages into layered engineering scenes */
    const SVG_NS='http://www.w3.org/2000/svg';
    function svgEl(tag,attrs){
      const el=document.createElementNS(SVG_NS,tag);
      Object.entries(attrs||{}).forEach(([k,v])=>el.setAttribute(k,String(v)));
      return el;
    }
    function ensureTechDefs(svg){
      let defs=svg.querySelector('defs[data-tech-defs]');
      if(defs)return defs;
      defs=document.createElementNS(SVG_NS,'defs');
      defs.dataset.techDefs='true';
      const id='techbg-'+Math.random().toString(36).slice(2,8);
      const bg=svgEl('linearGradient',{id:id+'-bg',x1:'0',y1:'0',x2:'1',y2:'1'});
      [['0%','#071015'],['52%','#0a1b21'],['100%','#082b25']].forEach(([o,c])=>{
        bg.appendChild(svgEl('stop',{offset:o,'stop-color':c}));
      });
      const glow=svgEl('radialGradient',{id:id+'-glow',cx:'78%',cy:'18%',r:'70%'});
      [['0%','#2bf2ad','0.18'],['42%','#27c5de','0.06'],['100%','#071015','0']].forEach(([o,c,a])=>{
        glow.appendChild(svgEl('stop',{offset:o,'stop-color':c,'stop-opacity':a}));
      });
      const grid=svgEl('pattern',{id:id+'-grid',width:'48',height:'48',patternUnits:'userSpaceOnUse'});
      grid.appendChild(svgEl('path',{d:'M48 0H0V48',fill:'none',stroke:'#39e5c0','stroke-opacity':'0.08','stroke-width':'1'}));
      const shadow=svgEl('filter',{id:id+'-shadow',x:'-25%',y:'-25%',width:'150%',height:'160%'});
      shadow.appendChild(svgEl('feDropShadow',{dx:'0',dy:'16',stdDeviation:'18','flood-color':'#000000','flood-opacity':'0.34'}));
      const glowFilter=svgEl('filter',{id:id+'-glowfx',x:'-35%',y:'-35%',width:'170%',height:'170%'});
      glowFilter.appendChild(svgEl('feGaussianBlur',{stdDeviation:'8',result:'blur'}));
      const merge=svgEl('feMerge',{});
      merge.appendChild(svgEl('feMergeNode',{in:'blur'}));
      merge.appendChild(svgEl('feMergeNode',{in:'SourceGraphic'}));
      glowFilter.appendChild(merge);
      [bg,glow,grid,shadow,glowFilter].forEach(x=>defs.appendChild(x));
      defs.dataset.prefix=id;
      svg.insertBefore(defs,svg.firstChild);
      return defs;
    }
    function enhanceTechStage(stage){
      if(!stage||stage.dataset.techComposed==='v09')return;
      const svg=stage.querySelector('svg');
      if(!svg)return;
      stage.dataset.techComposed='v09';
      const defs=ensureTechDefs(svg),prefix=defs.dataset.prefix;
      const bgRect=[...svg.querySelectorAll('rect')].find(r=>r.getAttribute('width')==='1600'&&r.getAttribute('height')==='900')||svg.querySelector('rect');
      if(bgRect){
        bgRect.setAttribute('fill','url(#'+prefix+'-bg)');
        bgRect.setAttribute('stroke','none');
      }
      const firstGraphic=[...svg.children].find(el=>el!==defs&&el!==bgRect);
      const back=svgEl('g',{'class':'tech-backplate','aria-hidden':'true'});
      back.appendChild(svgEl('rect',{x:0,y:0,width:1600,height:900,fill:'url(#'+prefix+'-glow)'}));
      back.appendChild(svgEl('rect',{x:0,y:0,width:1600,height:900,fill:'url(#'+prefix+'-grid)'}));
      back.appendChild(svgEl('path',{d:'M0 650H1600',stroke:'#2bf2ad','stroke-opacity':'0.10','stroke-width':'2'}));
      back.appendChild(svgEl('path',{d:'M0 705H1600',stroke:'#27c5de','stroke-opacity':'0.06','stroke-width':'1'}));
      back.appendChild(svgEl('path',{d:'M70 90h90M70 90v90M1530 90h-90M1530 90v90M70 810h90M70 810v-90M1530 810h-90M1530 810v-90',fill:'none',stroke:'#2bf2ad','stroke-opacity':'0.16','stroke-width':'2'}));
      if(firstGraphic)svg.insertBefore(back,firstGraphic);else svg.appendChild(back);

      const sweep=svgEl('line',{x1:90,y1:170,x2:1510,y2:170,'class':'tech-scan','aria-hidden':'true'});
      svg.appendChild(sweep);
      const focus=svgEl('g',{'class':'tech-focus-layer','aria-hidden':'true'});
      svg.appendChild(focus);

      stage.querySelectorAll('.scene-object,[data-step]').forEach((el,i)=>{
        el.classList.add('tech-scene-object');
        el.style.setProperty('--tech-order',i);
        el.setAttribute('data-tech-object','true');
      });
    }
    function updateTechFocus(stage,n){
      if(!stage)return;
      enhanceTechStage(stage);
      const svg=stage.querySelector('svg'),layer=svg&&svg.querySelector('.tech-focus-layer');
      if(!svg||!layer)return;
      layer.replaceChildren();
      const candidates=[...stage.querySelectorAll('.scene-object,[data-step]')].filter(el=>{
        if(el.matches('[data-step]'))return Number(el.getAttribute('data-step'))===n+1;
        const values=(el.getAttribute('data-beat')||'').split(/\s+/).filter(Boolean).map(Number);
        return values.includes(n+1)||el.classList.contains('is-scene-visible');
      });
      const active=candidates[0];
      if(!active)return;
      try{
        const box=active.getBBox();
        if(!box.width||!box.height)return;
        const pad=18;
        const x=box.x-pad,y=box.y-pad,w=box.width+pad*2,h=box.height+pad*2;
        const frame=svgEl('rect',{x,y,width:w,height:h,rx:18,fill:'none',stroke:'#2bf2ad','stroke-width':'3','stroke-opacity':'0.82','stroke-dasharray':'12 10','class':'tech-focus-frame'});
        const glow=frame.cloneNode(false);
        glow.setAttribute('stroke','#27c5de');
        glow.setAttribute('stroke-opacity','0.24');
        glow.setAttribute('stroke-width','10');
        glow.setAttribute('filter','url(#'+ensureTechDefs(svg).dataset.prefix+'-glowfx)');
        layer.appendChild(glow);layer.appendChild(frame);
        const tag=svgEl('g',{'class':'tech-focus-tag'});
        tag.appendChild(svgEl('rect',{x:x+10,y:y-27,width:146,height:24,rx:8,fill:'#061015',stroke:'#2bf2ad','stroke-opacity':'0.45'}));
        const tx=svgEl('text',{x:x+20,y:y-10,fill:'#9df8d9','font-size':'13','font-weight':'800','font-family':'Vazirmatn,Tahoma,Arial'});
        tx.textContent='ACTIVE / STEP '+faNum(n+1);
        tag.appendChild(tx);layer.appendChild(tag);
      }catch(e){}
    }

    /* v1.1 particle morphology — educational microstructure visualizer, not literal molecular dynamics */
    const particleMorphs=[];
    function clamp01(v){return Math.max(0,Math.min(1,v))}
    function lerp(a,b,t){return a+(b-a)*t}
    function smoothstep(t){t=clamp01(t);return t*t*(3-2*t)}
    function seedRand(seed){
      let s=(seed>>>0)||1;
      return function(){s^=(s<<13);s^=(s>>>17);s^=(s<<5);return ((s>>>0)/4294967296)}
    }
    function initParticleMorph(host){
      if(!host||host.__particleMorph)return host&&host.__particleMorph||null;
      const canvas=host.querySelector('[data-particle-canvas]'); if(!canvas)return null;
      const ctx=canvas.getContext('2d',{alpha:true}); if(!ctx)return null;
      host.__particleMorph={};
      const compact=()=>window.matchMedia&&window.matchMedia('(max-width:800px)').matches;
      const N=compact()?360:760, rand=seedRand(6044), particles=[];
      let width=1,height=1,dpr=1,mode=0,from=[],target=[],transitionStart=performance.now(),transitionDuration=1450,playing=false,sequenceTimer=null,lastBeat=-1;
      const palette=['#2bf2ad','#27c5de','#8bd4ff','#d7e7e2','#b8c7bf','#9cf6db'];
      const phases=[
        ['MATERIAL INPUT','مواد جدا','ورودی‌های کنترل‌شده'],
        ['CEMENT / SCM','ماده سیمانی','ماتریس چسباننده'],
        ['AGGREGATE','سنگدانه','اسکلت دانه‌ای'],
        ['ADMIXTURE','افزودنی','توزیع در سامانه'],
        ['WATER DISTRIBUTION','آب','پخش در حجم'],
        ['HOMOGENIZATION','یکنواختی','اختلاط و توزیع'],
        ['CONCRETE MATRIX','ماتریس بتن','تبدیل مفهومی']
      ];
      for(let i=0;i<N;i++){
        particles.push({u:rand(),v:rand(),size:1.2+rand()*2.6,type:i%7,phase:rand()*Math.PI*2,speed:.35+rand()*.9,seed:rand()*1000,x:null,y:null});
      }
      function resize(){
        const r=canvas.getBoundingClientRect();
        width=Math.max(320,r.width);height=Math.max(210,r.height);
        dpr=Math.min(2,window.devicePixelRatio||1);
        canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
        ctx.setTransform(dpr,0,0,dpr,0,0);
        morphTo(mode,true);
      }
      function fieldPoint(p,m,i){
        const cx=width*.50, cy=height*.52;
        if(m===0){
          const zones=[.16,.32,.48,.64,.80], z=zones[p.type%zones.length];
          return {x:width*z+(p.u-.5)*width*.11,y:height*(.22+.56*((p.type*.13+p.u*.71)%1))};
        }
        if(m===1){
          const a=p.phase+(p.u-.5)*2.4, r=width*(.07+.22*Math.pow(p.v,.55));
          return {x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r*.62};
        }
        if(m===2){
          const cluster=[[-.20,-.08,.17],[-.02,.14,.12],[.19,-.11,.16],[.12,.12,.095],[-.14,.16,.10]];
          const q=cluster[p.type%cluster.length], a=p.phase, r=width*q[2]*(.2+.8*p.u);
          return {x:cx+width*q[0]+Math.cos(a)*r,y:cy+height*q[1]+Math.sin(a)*r*.66};
        }
        if(m===3){
          const ring=(p.type%4)+1, a=p.phase+p.u*Math.PI*2, r=Math.min(width,height)*(.07+.06*ring);
          return {x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r};
        }
        if(m===4){
          const a=p.phase+p.u*Math.PI*4, r=Math.min(width,height)*(.10+.26*p.v);
          return {x:cx+Math.cos(a)*r*.9,y:cy+Math.sin(a)*r};
        }
        if(m===5){
          const cols=6,rows=6,ix=i%cols,iy=Math.floor(i/cols)%rows;
          return {x:width*(.19+(ix+(p.u-.5)*.8)/cols*.62),y:height*(.18+(iy+(p.v-.5)*.8)/rows*.67)};
        }
        /* Final form: fine binder/water/admixture particles fill the body; larger aggregate particles cluster inside it. */
        if(p.type>=4){
          const clusters=[[-.19,-.14,.085],[-.04,.07,.075],[.17,-.12,.095],[.08,.18,.068],[-.12,.17,.060]];
          const q=clusters[(i+p.type)%clusters.length];
          const a=p.phase+p.u*Math.PI*2, r=width*q[2]*Math.sqrt(p.v);
          return {x:cx+width*q[0]+Math.cos(a)*r,y:height*.52+height*q[1]+Math.sin(a)*r*.82};
        }
        const x=width*(.5+(p.u-.5)*.49), y=height*(.22+p.v*.57);
        return {x,y};
      }
      function morphTo(m,instant){
        mode=Math.max(0,Math.min(6,m));
        from=particles.map(p=>p.x==null?fieldPoint(p,mode,0):{x:p.x,y:p.y});
        target=particles.map((p,i)=>fieldPoint(p,mode,i));
        transitionStart=performance.now();transitionDuration=instant?0:(mode===6?2100:1250);
      }
      function resetParticles(){particles.forEach(p=>{p.x=null;p.y=null});lastBeat=-1;morphTo(0,true);setStatus(0)}
      function setStatus(m){
        const [en,fa,sub]=phases[m]||phases[0];
        const a=host.querySelector('[data-particle-phase]'),b=host.querySelector('[data-particle-sub]'),n=host.querySelector('[data-particle-count]');
        if(a)a.textContent=en+' / '+fa;if(b)b.textContent=sub;if(n)n.textContent='PARTICLES '+faNum(N);
        host.dataset.phase=String(m);
      }
      function setStep(n){
        const m=Math.max(0,Math.min(6,Math.round((n/Math.max(1,5))*6)));
        if(m!==lastBeat){lastBeat=n;morphTo(m,false);setStatus(m)}
      }
      function playSequence(){
        pauseSequence();playing=true;let s=0;setStatus(0);morphTo(0,false);
        sequenceTimer=setInterval(()=>{if(!playing)return;s++;if(s>6){pauseSequence();return}morphTo(s,false);setStatus(s)},1950);
      }
      function pauseSequence(){playing=false;if(sequenceTimer){clearInterval(sequenceTimer);sequenceTimer=null}}
      function drawGrid(){
        ctx.save();ctx.globalAlpha=.20;ctx.strokeStyle='#2bf2ad';ctx.lineWidth=.5;
        const step=Math.max(28,width/26);
        for(let x=0;x<=width;x+=step){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,height);ctx.stroke()}
        for(let y=0;y<=height;y+=step){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(width,y);ctx.stroke()}
        ctx.restore();
      }
      function drawTarget(){
        const cx=width*.5, top=height*.19, bottom=height*.82, rx=width*.26, ry=Math.max(18,height*.075);
        ctx.save();ctx.lineWidth=1.4;ctx.setLineDash([8,8]);ctx.strokeStyle='#2bf2ad66';ctx.fillStyle='#2bf2ad07';
        ctx.beginPath();ctx.ellipse(cx,top,rx,ry,0,0,Math.PI*2);ctx.fill();ctx.stroke();
        ctx.beginPath();ctx.moveTo(cx-rx,top);ctx.lineTo(cx-rx,bottom);ctx.quadraticCurveTo(cx,bottom+ry*.42,cx+rx,bottom);ctx.lineTo(cx+rx,top);ctx.stroke();
        ctx.beginPath();ctx.ellipse(cx,bottom,rx,ry*.78,0,0,Math.PI*2);ctx.stroke();
        ctx.restore();
        ctx.save();ctx.fillStyle='#8fa9a2';ctx.font='700 11px Tahoma,Arial';ctx.textAlign='center';ctx.fillText('CONCRETE MATRIX / CONCEPTUAL MICROSTRUCTURE',cx,bottom+ry+24);ctx.restore();
      }
      function drawHud(now){
        const m=Number(host.dataset.phase||0),alpha=.55+.25*Math.sin(now*.0024);
        ctx.save();ctx.fillStyle='#071015aa';ctx.fillRect(18,18,285,64);ctx.strokeStyle='#2bf2ad55';ctx.strokeRect(18,18,285,64);
        ctx.fillStyle='#2bf2ad';ctx.font='800 11px Tahoma,Arial';ctx.fillText('6044 / PARTICLE MORPH ENGINE',32,38);
        ctx.fillStyle='#dbeee8';ctx.font='700 13px Tahoma,Arial';ctx.fillText(phases[m][0],32,61);
        ctx.globalAlpha=alpha;ctx.fillStyle='#27c5de';ctx.fillRect(320,32,Math.max(22,(width-344)*(m/6)),2);ctx.restore();
      }
      function frame(now){
        ctx.clearRect(0,0,width,height);const t=transitionDuration?clamp01((now-transitionStart)/transitionDuration):1,s=smoothstep(t),swirl=(1-s)*(mode===6?1.9:.8);
        drawGrid();if(mode===6)drawTarget();
        const cx=width*.5,cy=height*.52;
        particles.forEach((p,i)=>{
          const a=from[i]||fieldPoint(p,mode,i),b=target[i]||fieldPoint(p,mode,i);
          let x=lerp(a.x,b.x,s),y=lerp(a.y,b.y,s);
          const wobble=(1-s)*Math.sin(now*.0015*p.speed+p.seed)*2.1;
          if(swirl){const dx=x-cx,dy=y-cy,dist=Math.hypot(dx,dy)||1,ang=Math.atan2(dy,dx)+swirl*.18*(p.speed/1.2);x=cx+Math.cos(ang)*dist;y=cy+Math.sin(ang)*dist+wobble}else y+=wobble;
          p.x=x;p.y=y;
          const col=palette[p.type%palette.length],pulse=.55+.45*Math.sin((i+1)*.17+now*.001);
          const sizeFactor=mode===6?(p.type>=4?1.75:1.08):1;
          ctx.globalAlpha=.34+.54*pulse;ctx.fillStyle=col;ctx.beginPath();ctx.arc(x,y,p.size*sizeFactor,0,Math.PI*2);ctx.fill();
          if(i%19===0&&mode>=1){ctx.globalAlpha=.12;ctx.beginPath();ctx.arc(x,y,p.size*3.2,0,Math.PI*2);ctx.fill()}
        });
        ctx.globalAlpha=1;drawHud(now);if(!document.hidden)requestAnimationFrame(frame);
      }
      host.querySelector('[data-particle-play]')?.addEventListener('click',playSequence);
      host.querySelector('[data-particle-pause]')?.addEventListener('click',pauseSequence);
      host.querySelector('[data-particle-reset]')?.addEventListener('click',resetParticles);
      window.addEventListener('resize',resize);
      resize();setStatus(0);requestAnimationFrame(frame);
      const api={setStep,playSequence,pauseSequence,resetParticles};host.__particleMorph=api;particleMorphs.push(api);return api;
    }
    function initParticleMorphs(){document.querySelectorAll('[data-particle-morph]').forEach(initParticleMorph)}
    function syncParticleMorphs(n){particleMorphs.forEach(pm=>pm.setStep(n))}

    function render(){
      if(!beats.length)return;
      const b=beats[index]||{};
      if(title)title.textContent=b.title||b[0]||'';
      if(body)body.textContent=b.body||b[1]||'';
      if(count)count.textContent=faNum(index+1)+' / '+faNum(beats.length);
      if(bar)bar.style.width=((index+1)/beats.length*100)+'%';
      sceneTargets(index);applyScene(cfg.scene,index);updateReaderHUD(); const stage=document.querySelector('.stage,.book-stage'); enhanceTechStage(stage); updateTechFocus(stage,index);
      document.documentElement.style.setProperty('--beat-index',index);
      syncParticleMorphs(index);
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
    ensureNarrationUI();chapterNav();initParticleMorphs();restoreProgress();
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
