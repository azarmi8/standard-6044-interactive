/* 6044 Engineering Visual Engine v2 — semantic material morphology
   Educational visualization only. It is not molecular dynamics or a physical CFD/DEM model.
*/
(function(){
  'use strict';
  function boot(){
    const host=document.querySelector('[data-particle-morph]');
    if(!host||host.__materialVisualV2)return;
    const canvas=host.querySelector('[data-particle-canvas]');
    const ctx=canvas&&canvas.getContext('2d',{alpha:true});
    if(!canvas||!ctx)return;
    const prefersReduced=()=>window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact=()=>window.matchMedia&&window.matchMedia('(max-width:800px)').matches;
    const faNum=n=>String(Math.round(n)).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
    const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
    const lerp=(a,b,t)=>a+(b-a)*t;
    const smooth=t=>{t=clamp(t);return t*t*(3-2*t)};
    const rnd=(seed)=>{let s=(seed>>>0)||1;return()=>{s^=s<<13;s^=s>>>17;s^=s<<5;return(s>>>0)/4294967296}};
    const rand=rnd(6044);
    const states=[
      {en:'MATERIAL INPUT',fa:'ورودی مواد',sub:'مواد جدا / کنترل‌شده'},
      {en:'CEMENT / SCM',fa:'سیمان و مواد مکمل',sub:'مادهٔ ریزدانهٔ چسباننده'},
      {en:'AGGREGATE SKELETON',fa:'اسکلت سنگدانه',sub:'دانه‌های درشت + ریز'},
      {en:'ADMIXTURE DISPERSION',fa:'پخش افزودنی',sub:'اثر موضعی در سامانه'},
      {en:'WATER DISTRIBUTION',fa:'توزیع آب',sub:'پخش در حجم اختلاط'},
      {en:'HOMOGENIZATION / MATRIX',fa:'یکنواختی / ماتریس مفهومی',sub:'سامانهٔ یکپارچه برای ادامهٔ آموزش'}
    ];
    const types=[
      {key:'aggregate',label:'AGGREGATE',size:4.8,alpha:.95},
      {key:'cement',label:'CEMENT / SCM',size:2.0,alpha:.83},
      {key:'water',label:'WATER',size:1.45,alpha:.72},
      {key:'admixture',label:'ADMIXTURE',size:1.9,alpha:.9}
    ];
    const particles=[];
    let w=1,h=1,dpr=1,current=0,from=[],to=[],start=0,duration=1550,raf=0;
    function count(){return compact()?480:900;}
    function rebuild(){
      particles.length=0;
      const N=count();
      for(let i=0;i<N;i++){
        particles.push({
          u:rand(),v:rand(),a:rand()*Math.PI*2,
          type:i%4,phase:rand()*Math.PI*2,
          size:types[i%4].size*(.72+rand()*.58),
          drift:.15+rand()*.85,seed:rand()*10000
        });
      }
    }
    function resize(){
      const r=canvas.getBoundingClientRect();
      w=Math.max(320,r.width);h=Math.max(260,r.height);dpr=Math.min(2,window.devicePixelRatio||1);
      canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      rebuild();setState(current,true);
    }
    function target(p,i,state){
      const cx=w*.5,cy=h*.53;
      if(state===0){
        const slots=[.12,.31,.50,.69,.88];
        const x=w*slots[Math.min(4,p.type+i%2)]+(p.u-.5)*w*.10;
        const y=h*(.20+p.v*.58);
        return {x,y};
      }
      if(state===1){
        const ang=p.a+(p.u-.5)*2.2, rad=Math.min(w,h)*(.06+.30*Math.sqrt(p.v));
        return {x:cx+Math.cos(ang)*rad*.95,y:cy+Math.sin(ang)*rad*.62};
      }
      if(state===2){
        if(p.type===0){
          const c=[[-.19,-.12,.095],[.00,.10,.082],[.20,-.08,.11],[.13,.17,.072],[-.14,.18,.078]][i%5];
          const a=p.a+p.u*Math.PI*2,rad=Math.min(w,h)*c[2]*(.28+.72*Math.sqrt(p.v));
          return {x:cx+w*c[0]+Math.cos(a)*rad,y:cy+h*c[1]+Math.sin(a)*rad*.78};
        }
        const ring=(i%5)+1,a=p.a+p.u*Math.PI*2,rad=Math.min(w,h)*(.055+ring*.017);
        return {x:cx+Math.cos(a)*rad*w/Math.max(w,h),y:cy+Math.sin(a)*rad};
      }
      if(state===3){
        if(p.type===3){
          const a=p.a+p.u*Math.PI*6,rad=Math.min(w,h)*(.10+.17*p.v);
          return {x:cx+Math.cos(a)*rad,y:cy+Math.sin(a)*rad*.72};
        }
        return target(p,i,2);
      }
      if(state===4){
        const stream=(i%7)-3,t=(p.u+.12*stream)%1;
        return {x:w*(.22+t*.56),y:cy+h*.22*Math.sin(t*Math.PI*2+p.a)+stream*h*.035};
      }
      if(p.type===0){
        const c=[[-.20,-.12,.105],[.01,.11,.086],[.20,-.06,.115],[.13,.18,.075],[-.13,.18,.078]][i%5];
        const a=p.a+p.u*Math.PI*2,rad=Math.min(w,h)*c[2]*(.25+.72*Math.sqrt(p.v));
        return {x:cx+w*c[0]+Math.cos(a)*rad,y:cy+h*c[1]+Math.sin(a)*rad*.78};
      }
      return {x:w*(.24+.52*p.u),y:h*(.23+.54*p.v)};
    }
    function setState(state,instant){
      current=Math.max(0,Math.min(states.length-1,Number(state)||0));
      from=particles.map((p,i)=>p.x==null?target(p,i,current):{x:p.x,y:p.y});
      to=particles.map((p,i)=>target(p,i,current));
      start=performance.now();duration=instant?0:(current===5?2200:1450);
      host.dataset.visualState=String(current);
      const ph=host.querySelector('[data-particle-phase]'),sub=host.querySelector('[data-particle-sub]'),cnt=host.querySelector('[data-particle-count]');
      const s=states[current];
      if(ph)ph.textContent=s.en+' / '+s.fa;
      if(sub)sub.textContent=s.sub;
      if(cnt)cnt.textContent='PARTICLES '+faNum(particles.length);
      if(prefersReduced())draw(performance.now());
    }
    function drawBackground(){
      ctx.fillStyle='#040a0e';ctx.fillRect(0,0,w,h);
      ctx.save();ctx.globalAlpha=.18;ctx.strokeStyle='#2bf2ad';ctx.lineWidth=.5;
      const step=Math.max(28,w/30);
      for(let x=0;x<=w;x+=step){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
      for(let y=0;y<=h;y+=step){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
      ctx.restore();
      const g=ctx.createRadialGradient(w*.52,h*.52,10,w*.52,h*.52,Math.max(w,h)*.6);
      g.addColorStop(0,'rgba(43,242,173,.08)');g.addColorStop(.45,'rgba(39,197,222,.025)');g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
    }
    function drawFrame(state,t){
      const s=smooth(t),zoom=state===5?1+0.05*s:1;
      ctx.save();ctx.translate(w/2,h/2);ctx.scale(zoom,zoom);ctx.translate(-w/2,-h/2);
      drawBackground();
      if(state>=2){
        ctx.save();ctx.strokeStyle='rgba(43,242,173,.16)';ctx.lineWidth=1;ctx.setLineDash([7,10]);
        ctx.beginPath();ctx.ellipse(w*.5,h*.53,w*.27,h*.29,0,0,Math.PI*2);ctx.stroke();ctx.restore();
      }
      if(state===5){
        ctx.save();ctx.fillStyle='rgba(7,16,21,.24)';ctx.strokeStyle='rgba(43,242,173,.22)';ctx.lineWidth=1.2;
        ctx.beginPath();ctx.ellipse(w*.5,h*.53,w*.29,h*.31,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.restore();
      }
      const cx=w*.5,cy=h*.53,now=performance.now();
      particles.forEach((p,i)=>{
        const a=from[i]||to[i],b=to[i]||a;
        let x=lerp(a.x,b.x,s),y=lerp(a.y,b.y,s);
        if(state<5||s<1){
          const dx=x-cx,dy=y-cy,ang=Math.atan2(dy,dx),rad=Math.hypot(dx,dy)||1;
          const swirl=(1-s)*(.035+p.drift*.025);
          x=cx+Math.cos(ang+swirl)*rad;y=cy+Math.sin(ang+swirl)*rad;
        }
        if(state===4)y+=Math.sin(now*.0017+p.seed)*2.5;
        p.x=x;p.y=y;
        const type=types[p.type],pulse=.65+.35*Math.sin(now*.002+p.phase);
        ctx.globalAlpha=type.alpha*(.55+.40*pulse);
        ctx.fillStyle=p.type===0?'#d0b879':p.type===1?'#8fe8cd':p.type===2?'#76d4eb':'#f5c45e';
        const r=p.size*(state===5&&p.type===0?1.18:1);
        ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
        if(state>=3&&i%31===0){ctx.globalAlpha=.10;ctx.beginPath();ctx.arc(x,y,r*4.5,0,Math.PI*2);ctx.fill();}
      });
      if(state===4||state===5){
        ctx.save();ctx.globalAlpha=.18;ctx.strokeStyle='#27c5de';ctx.lineWidth=1.4;
        for(let i=0;i<6;i++){const yy=h*(.30+i*.055);ctx.beginPath();ctx.moveTo(w*.18,yy);ctx.bezierCurveTo(w*.40,yy-25,w*.60,yy+25,w*.82,yy);ctx.stroke();}
        ctx.restore();
      }
      if(state===5){
        ctx.save();ctx.globalAlpha=.13;ctx.strokeStyle='#eaf3f0';ctx.lineWidth=1;
        for(let i=0;i<Math.min(120,particles.length);i+=7){
          const p=particles[i],q=particles[(i*17+41)%particles.length];
          if(p.type===0&&q.type!==0){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
        }
        ctx.restore();
      }
      ctx.restore();
    }
    function drawHUD(now){
      const s=states[current];
      ctx.save();
      const boxW=Math.min(430,w*.50);
      ctx.fillStyle='rgba(5,12,16,.88)';ctx.fillRect(18,18,boxW,76);
      ctx.strokeStyle='rgba(43,242,173,.28)';ctx.strokeRect(18,18,boxW,76);
      ctx.fillStyle='#2bf2ad';ctx.font='900 11px Tahoma,Arial';ctx.fillText('6044 / ENGINEERING VISUAL ENGINE V2',32,39);
      ctx.fillStyle='#edf7f3';ctx.font='800 15px Tahoma,Arial';ctx.fillText(s.en,32,64);
      ctx.fillStyle='#8fa9a2';ctx.font='700 11px Tahoma,Arial';ctx.fillText('STATE '+faNum(current+1)+' / '+faNum(states.length),32,83);
      const bw=Math.max(40,w-390);ctx.fillStyle='rgba(43,242,173,.10)';ctx.fillRect(330,54,bw,3);
      ctx.fillStyle='#2bf2ad';ctx.fillRect(330,54,bw*(current/(states.length-1)),3);
      ctx.restore();
      ctx.save();ctx.font='700 11px Tahoma,Arial';ctx.textAlign='right';ctx.fillStyle='#91aaa2';ctx.fillText('CONCEPTUAL MICROSTRUCTURE',w-24,h-22);ctx.restore();
      ctx.save();ctx.font='800 10px Tahoma,Arial';ctx.textAlign='left';
      const x=24,y=h-54;types.forEach((t,i)=>{ctx.fillStyle=['#d0b879','#8fe8cd','#76d4eb','#f5c45e'][i];ctx.beginPath();ctx.arc(x+i*118,y,4,0,Math.PI*2);ctx.fill();ctx.fillStyle='#9eb7af';ctx.fillText(t.label,x+10+i*118,y+4)});ctx.restore();
    }
    function draw(now){
      const t=duration?clamp((now-start)/duration):1;
      drawFrame(current,t);drawHUD(now);
      if(!prefersReduced())requestAnimationFrame(draw);
    }
    function syncBeat(e){
      const i=e&&e.detail?Number(e.detail.index):0;
      setState(Math.max(0,Math.min(5,i)),false);
    }
    function runSync(){
      if(window.BookEngine){
        try{window.BookEngine.stop();window.BookEngine.go(0);window.BookEngine.play();return;}catch(e){}
      }
      if(localTimeline)localTimeline.play();
    }
    function pause(){
      if(window.BookEngine)try{window.BookEngine.stop();}catch(e){}
      if(localTimeline)localTimeline.pause();
    }
    function reset(){
      if(window.BookEngine)try{window.BookEngine.stop();window.BookEngine.go(0);}catch(e){}
      if(localTimeline)localTimeline.reset();
      setState(0,true);
    }
    const localTimeline=window.VisualTimeline?new window.VisualTimeline({length:6,duration:2200,onStep:(i)=>setState(i,false)}):null;
    host.querySelector('[data-particle-play]')?.addEventListener('click',runSync);
    host.querySelector('[data-particle-pause]')?.addEventListener('click',pause);
    host.querySelector('[data-particle-reset]')?.addEventListener('click',reset);
    window.addEventListener('6044:beat',syncBeat);
    window.addEventListener('resize',resize);
    rebuild();resize();setState(0,true);
    if(prefersReduced())draw(performance.now());else requestAnimationFrame(draw);
    host.__materialVisualV2={setState,runSync,pause,reset,get state(){return current}};
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();