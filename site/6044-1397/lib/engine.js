/* 6044 Interactive Book Engine — v0.4
   Shared, data-driven playback + scene lifecycle.
*/
(function(){
  'use strict';
  function boot(){
    const cfg=window.BOOK_CONFIG||{};
    const beats=Array.isArray(cfg.beats)?cfg.beats:[];
    const quiz=cfg.quiz||null;
    let index=0,timer=null,interval=Number(cfg.interval||4500);

    const $=id=>document.getElementById(id);
    const title=$('title'), body=$('body'), count=$('count'), bar=$('bar'), play=$('play');
    const prev=$('prev'), next=$('next'), result=$('quizResult')||$('result'), fullscreen=$('fullscreen');
    const controls=document.querySelector('.book-controls');
    let stepMode=false;

    function sceneTargets(n){
      document.querySelectorAll('[data-beat]').forEach(el=>{
        const values=(el.getAttribute('data-beat')||'').split(/\s+/).filter(Boolean).map(Number);
        const active=values.includes(n+1);
        el.classList.toggle('is-active',active);
        el.setAttribute('aria-hidden',active?'false':'true');
      });
    }
    function applyScene(scene,n,b){
      if(!scene||typeof scene!=='object')return;
      const root=document.querySelector(scene.root||'.stage,.book-stage');
      if(!root)return;
      const steps=Array.isArray(scene.steps)?scene.steps:[];
      const step=steps[n]||{};
      if(step.focus){
        root.style.setProperty('--scene-focus-x',String(step.focus.x??50)+'%');
        root.style.setProperty('--scene-focus-y',String(step.focus.y??50)+'%');
        root.classList.add('has-scene-focus');
      } else root.classList.remove('has-scene-focus');
      if(step.className) root.dataset.sceneState=step.className;
      if(step.progress!=null) root.style.setProperty('--scene-progress',String(step.progress));
      root.querySelectorAll('[data-scene-role]').forEach(el=>{
        const role=el.getAttribute('data-scene-role');
        const visible=Array.isArray(step.show)?step.show.includes(role):true;
        el.classList.toggle('is-scene-visible',visible);
        el.setAttribute('aria-hidden',visible?'false':'true');
      });
    }
    function lifecycle(name,n,b){
      const fn=cfg[name];
      if(typeof fn==='function') fn(n,b);
      const hook=cfg.scene&&cfg.scene[name];
      if(typeof hook==='function') hook(n,b);
    }
    function render(){
      if(!beats.length)return;
      const b=beats[index]||{};
      if(title) title.textContent=b.title||b[0]||'';
      if(body) body.textContent=b.body||b[1]||'';
      if(count) count.textContent=(index+1)+' / '+beats.length;
      if(bar) bar.style.width=((index+1)/beats.length*100)+'%';
      sceneTargets(index);
      applyScene(cfg.scene,index,b);
        document.documentElement.style.setProperty('--beat-index',index);
      lifecycle('onRender',index,b);
    }
    function go(n){
      const nextIndex=Math.max(0,Math.min(beats.length-1,n));
      if(nextIndex===index && beats.length){ render(); return; }
      const previous=index;
      lifecycle('onBeatEnd',previous,beats[previous]);
      index=nextIndex;
      render();
      lifecycle('onBeatStart',index,beats[index]);
    }
    function stop(){
      if(timer){clearInterval(timer);timer=null}
      if(play) play.textContent='پخش';
      lifecycle('onPause',index,beats[index]);
    }
    function step(){
      if(!beats.length)return;
      stop();
      go(index+1);
    }
    function toggleStepMode(){
      stepMode=!stepMode;
      if(stepMode) stop();
      const b=$('step'); if(b) b.setAttribute('aria-pressed',String(stepMode));
      const root=document.querySelector('.stage,.book-stage'); if(root) root.classList.toggle('step-mode',stepMode);
    }
    function toggle(){
      if(timer){stop();return}
      if(stepMode || (window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)){
        step(); return;
      }
      timer=setInterval(()=>{
        if(index>=beats.length-1){stop();return}
        go(index+1);
      },interval);
      if(play) play.textContent='توقف';
      lifecycle('onPlay',index,beats[index]);
    }
    function enter(){
      lifecycle('onEnter',index,beats[index]);
      render();
      lifecycle('onBeatStart',index,beats[index]);
    }
    if(prev) prev.onclick=()=>go(index-1);
    if(next) next.onclick=()=>go(index+1);
    if(play) play.onclick=toggle;
    if(controls && !$('step')){
      const b=document.createElement('button'); b.id='step'; b.type='button'; b.textContent='گام بعدی'; b.setAttribute('aria-pressed','false'); controls.appendChild(b);
    }
    const stepButton=$('step');
    if(stepButton){stepButton.onclick=()=>step(); stepButton.addEventListener('dblclick',toggleStepMode);}
    if(fullscreen) fullscreen.onclick=()=>{
      const el=document.querySelector('.stage')||document.querySelector('.book-stage');
      if(!el)return;
      if(document.fullscreenElement)document.exitFullscreen();
      else if(el.requestFullscreen)el.requestFullscreen();
    };
    document.addEventListener('keydown',e=>{
      if(e.target&&/INPUT|TEXTAREA|SELECT|BUTTON/.test(e.target.tagName))return;
      if(e.key==='ArrowRight') go(index+1);
      if(e.key==='ArrowLeft') go(index-1);
      if(e.key===' '){e.preventDefault();toggle()}
      if(e.key.toLowerCase()==='s'){e.preventDefault();step()}
      if(e.key.toLowerCase()==='m'){e.preventDefault();toggleStepMode()}
      if(e.key==='Home') go(0);
      if(e.key==='End') go(beats.length-1);
      if(e.key.toLowerCase()==='f'){e.preventDefault();if(fullscreen)fullscreen.click()}
    });
    document.addEventListener('visibilitychange',()=>{if(document.hidden&&timer)stop()});
    if(quiz&&result){
      document.querySelectorAll('[data-q],[data-ok]').forEach(btn=>{
        btn.addEventListener('click',()=>{
          const key=btn.dataset.q||btn.dataset.ok;
          const good=key==='good'||key==='1';
          result.textContent=good?(quiz.correct||'درست.'):(quiz.incorrect||'این پاسخ درست نیست. دوباره به منبع و توضیح برگرد.');
          result.className=good?'good':'bad';
        });
      });
    }
    window.addEventListener('beforeunload',()=>lifecycle('onExit',index,beats[index]));
    enter();
    window.BookEngine={next:()=>go(index+1),prev:()=>go(index-1),play:toggle,stop,step,toggleStepMode,go,get index(){return index},get total(){return beats.length}};
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
