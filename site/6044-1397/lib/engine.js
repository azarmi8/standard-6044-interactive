/* 6044 Interactive Book Engine — v0.1
   Data-driven chapter playback, keyboard control, reduced-motion fallback and quiz feedback.
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

  function render(){
    if(!beats.length)return;
    const b=beats[index]||{};
    if(title) title.textContent=b.title||b[0]||'';
    if(body) body.textContent=b.body||b[1]||'';
    if(count) count.textContent=(index+1)+' / '+beats.length;
    if(bar) bar.style.width=((index+1)/beats.length*100)+'%';
    document.documentElement.style.setProperty('--beat-index',index);
    if(typeof cfg.onRender==='function') cfg.onRender(index,b);
  }
  function stop(){
    if(timer){clearInterval(timer);timer=null}
    if(play) play.textContent='پخش';
  }
  function go(n){
    index=Math.max(0,Math.min(beats.length-1,n));
    render();
  }
  function toggle(){
    if(timer){stop();return}
    if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      go(index+1); return;
    }
    timer=setInterval(()=>{
      if(index>=beats.length-1){stop();return}
      go(index+1);
    },interval);
    if(play) play.textContent='توقف';
  }
  if(prev) prev.onclick=()=>go(index-1);
  if(next) next.onclick=()=>go(index+1);
  if(play) play.onclick=toggle;
  if(fullscreen) fullscreen.onclick=()=>{const el=document.querySelector('.stage')||document.querySelector('.book-stage');if(!el)return;if(document.fullscreenElement)document.exitFullscreen();else if(el.requestFullscreen)el.requestFullscreen()};

  document.addEventListener('keydown',e=>{
    if(e.target&&/INPUT|TEXTAREA|SELECT|BUTTON/.test(e.target.tagName))return;
    if(e.key==='ArrowRight') go(index+1);
    if(e.key==='ArrowLeft') go(index-1);
    if(e.key===' '){e.preventDefault();toggle()}
    if(e.key==='Home') go(0);
    if(e.key==='End') go(beats.length-1);
    if(e.key.toLowerCase()==='f'){e.preventDefault();if(fullscreen)fullscreen.click()}
  });

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
  render();
  window.BookEngine={next:()=>go(index+1),prev:()=>go(index-1),play:toggle,stop,go,get index(){return index}};
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
