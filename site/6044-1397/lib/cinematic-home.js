/* CRETIQ 6044 — Cinematic Visual System v2
   Vector-first canvas art direction: precise geometry, restrained motion, no stock assets.
   Educational visualization only; not a physical/material simulation.
*/
(()=>{"use strict";
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const ease=t=>{t=clamp(t);return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2};
const DPR=Math.min(window.devicePixelRatio||1,2);
const colors={bg:"#071015",panel:"#0b151b",line:"#23414a",muted:"#86a39a",text:"#ecf6f2",green:"#2bf2ad",cyan:"#27c5de",cream:"#f2ead8",sand:"#bca77b",water:"#64d8ef",binder:"#d7d0c1",orange:"#ef8b6b",red:"#ff6d73"};

function fitCanvas(c,host){
  const r=host.getBoundingClientRect(),w=Math.max(320,Math.floor(r.width)),h=Math.max(260,Math.floor(r.height));
  c.width=Math.floor(w*DPR); c.height=Math.floor(h*DPR); c.style.width=w+"px"; c.style.height=h+"px";
  return {w,h,ctx:c.getContext("2d")};
}
function rounded(ctx,x,y,w,h,r){const rr=Math.min(r,w/2,h/2);ctx.beginPath();ctx.roundRect(x,y,w,h,rr);ctx.closePath()}
function glowDot(ctx,x,y,r,c,alpha=.8){
  const g=ctx.createRadialGradient(x,y,0,x,y,r*3.8);g.addColorStop(0,c);g.addColorStop(1,"rgba(0,0,0,0)");
  ctx.globalAlpha=alpha;ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r*3.8,0,Math.PI*2);ctx.fill();
  ctx.globalAlpha=1;ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
}
function polygon(ctx,cx,cy,r,n,rot=0){
  ctx.beginPath();for(let i=0;i<n;i++){const a=rot+i*Math.PI*2/n,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r*.84;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.closePath()
}
function seeded(n){let x=n|0;return()=>{x=Math.imul(1664525,x)+1013904223;return((x>>>0)/4294967296)}}

function drawGrid(ctx,w,h,t,alpha=.16){
  ctx.save();ctx.globalAlpha=alpha;ctx.strokeStyle=colors.line;ctx.lineWidth=1;
  const s=Math.max(34,Math.round(w/20)),ox=(t*.006)%s,oy=(t*.004)%s;
  for(let x=-s+ox;x<w+s;x+=s){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}
  for(let y=-s+oy;y<h+s;y+=s){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
  ctx.restore()
}
function drawCrosshair(ctx,x,y,r){
  ctx.save();ctx.strokeStyle="rgba(43,242,173,.16)";ctx.lineWidth=1;
  [[x-r,y,x-r+14,y],[x+r,y,x+r-14,y],[x,y-r,x,y-r+14],[x,y+r,x,y+r-14]].forEach(p=>{ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(p[2],p[3]);ctx.stroke()});
  ctx.beginPath();ctx.arc(x,y,r*.55,0,Math.PI*2);ctx.stroke();ctx.restore()
}
function label(ctx,text,x,y,size=10,fill=colors.muted,align="left"){
  ctx.save();ctx.font="800 "+size+"px Tahoma,Arial,sans-serif";ctx.fillStyle=fill;ctx.textAlign=align;ctx.fillText(text,x,y);ctx.restore()
}

const heroPhases=[
  {title:"ورودی مواد",detail:"سیمان و مواد مکمل · سنگدانه · آب · افزودنی"},
  {title:"اختلاط",detail:"ترکیب کنترل‌شده و حرکت اجزا به سمت یک سیستم واحد"},
  {title:"شکل‌گیری بتن",detail:"اسکلت سنگدانه · خمیر · آب · افزودنی"},
  {title:"نمونه و آزمون",detail:"نمونه‌برداری · قالب · آزمون مقاومت فشاری"},
  {title:"داده → تصمیم",detail:"نتیجه آزمون · ردیابی · قضاوت انطباق"}
];

function hero(){
  const stage=$(".engineering-hero-stage"),canvas=$("[data-engineering-hero]"),overlay=$("[data-engineering-hero-overlay]");
  if(!stage||!canvas||!overlay)return;
  const main=fitCanvas(canvas,stage),ov=fitCanvas(overlay,stage);if(!main.ctx||!ov.ctx)return;
  let w=main.w,h=main.h,t0=performance.now(),paused=matchMedia?.("(prefers-reduced-motion: reduce)").matches,phase=0,phaseP=0,quality="high";
  stage.dataset.heroRenderer="canvas";stage.dataset.heroQuality=quality;
  const p=$("[data-hero-phase]",stage),d=$("[data-hero-detail]",stage),bar=$("[data-hero-progress]",stage);
  const rnd=seeded(60441397),pts=Array.from({length:150},()=>({x:rnd(),y:rnd(),r:1+rnd()*2.4,a:.2+rnd()*.7}));
  function resize(){const a=fitCanvas(canvas,stage),b=fitCanvas(overlay,stage);w=a.w;h=a.h}
  window.addEventListener("resize",resize,{passive:true});
  function header(){
    const c=ov.ctx;c.clearRect(0,0,w,h);drawGrid(c,w,h,performance.now(),.10);
    c.save();c.strokeStyle="rgba(43,242,173,.11)";c.lineWidth=1;c.beginPath();c.moveTo(w*.06,h*.84);c.lineTo(w*.94,h*.84);c.stroke();c.restore();
    label(c,"VECTOR ENGINE / EDUCATIONAL MODE",w*.055,h*.09,9,colors.muted);
  }
  function particles(c,cx,cy,count,spread,t,cols){
    const rr=Math.min(w,h)*spread;
    pts.slice(0,count).forEach((q,i)=>{
      const a=i*.618+t*.00035*(1+(i%4)*.15),rad=rr*(.12+.88*((i*37)%101)/101);
      const x=cx+Math.cos(a)*rad*(.6+.4*q.x),y=cy+Math.sin(a*1.17)*rad*.68;
      const col=cols[i%cols.length];glowDot(c,x,y,q.r,col,.24+.22*q.a)
    })
  }
  function drawHero(now){
    const c=main.ctx;c.setTransform(DPR,0,0,DPR,0,0);c.clearRect(0,0,w,h);
    const bg=c.createRadialGradient(w*.61,h*.42,0,w*.61,h*.42,Math.max(w,h)*.72);bg.addColorStop(0,"#10382f");bg.addColorStop(.48,"#091a1e");bg.addColorStop(1,colors.bg);c.fillStyle=bg;c.fillRect(0,0,w,h);
    drawGrid(c,w,h,now,.08);
    const cx=w*.58,cy=h*.49,u=Math.min(w,h);
    drawCrosshair(c,cx,cy,u*.34);
    if(phase===0){
      particles(c,cx,cy,105,.47,now,[colors.sand,colors.binder,colors.water,colors.orange]);
      const spots=[[.25,.26,colors.sand,"AGGREGATE"],[.12,.67,colors.binder,"CEMENT / SCM"],[.76,.21,colors.water,"WATER"],[.81,.70,colors.orange,"ADMIXTURE"]];
      spots.forEach(([x,y,col,txt],i)=>{const sx=w*x,sy=h*y;glowDot(c,sx,sy,4,col,.65);label(c,txt,sx+10,sy+4,8,col,"left");if(i<3){c.strokeStyle="rgba(255,255,255,.08)";c.beginPath();c.moveTo(sx,sy);c.lineTo(cx+(i-1)*u*.11,cy+(i%2?.08:-.08)*u);c.stroke()}});
    }else if(phase===1){
      const drumW=u*.48,drumH=u*.20,angle=Math.sin(now*.002)*.11;
      c.save();c.translate(cx,cy);c.rotate(angle);
      c.shadowColor="rgba(43,242,173,.18)";c.shadowBlur=26;c.fillStyle="#0f2c2c";c.strokeStyle="rgba(43,242,173,.52)";c.lineWidth=2;
      c.beginPath();c.moveTo(-drumW*.48,-drumH*.50);c.lineTo(drumW*.36,-drumH*.36);c.lineTo(drumW*.46,drumH*.34);c.lineTo(-drumW*.28,drumH*.52);c.closePath();c.fill();c.stroke();
      c.strokeStyle="rgba(242,234,216,.22)";c.lineWidth=1;for(let i=-1;i<=1;i++){c.beginPath();c.ellipse(i*drumW*.12,0,drumW*.28,drumH*.48,0,0,Math.PI*2);c.stroke()}
      c.restore();
      particles(c,cx,cy,u?70:50,.28,now,[colors.sand,colors.binder,colors.water,colors.orange]);
      label(c,"CONTROLLED MIXING",cx,cy+u*.27,9,colors.green,"center");
    }else if(phase===2){
      const r=u*.23;
      const g=c.createRadialGradient(cx-u*.04,cy-u*.06,4,cx,cy,r*1.65);g.addColorStop(0,"#274e43");g.addColorStop(.55,"#152c2d");g.addColorStop(1,"#0a151a");
      c.fillStyle=g;c.shadowColor="rgba(43,242,173,.25)";c.shadowBlur=32;c.beginPath();c.ellipse(cx,cy,r*1.12,r*.82,0,0,Math.PI*2);c.fill();
      for(let i=0;i<22;i++){const a=i*2.399+now*.0001,rr=r*(.15+.82*((i*17)%31)/31),x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr*.74;polygon(c,x,y,6+(i%3)*2,5,a);c.fillStyle=i%4===0?colors.sand:i%5===0?colors.water:colors.binder;c.globalAlpha=.88;c.fill();c.globalAlpha=1}
      c.strokeStyle="rgba(43,242,173,.32)";c.lineWidth=2;c.beginPath();c.ellipse(cx,cy,r*1.35,r*.98,0,0,Math.PI*2);c.stroke();
      label(c,"FRESH CONCRETE / CONCEPTUAL MATRIX",cx,cy+r*1.45,10,colors.text,"center");
    }else if(phase===3){
      const sw=u*.18,sh=u*.40,x=cx-sw/2,y=cy-sh/2;
      c.save();c.shadowColor="rgba(39,197,222,.18)";c.shadowBlur=30;c.fillStyle="#102126";c.strokeStyle="rgba(39,197,222,.48)";c.lineWidth=2;rounded(c,x,y,sw,sh,18);c.fill();c.stroke();
      const top=y+12,bottom=y+sh-12;c.fillStyle=colors.binder;c.globalAlpha=.30;rounded(c,x+8,top+12,sw-16,sh-24,14);c.fill();c.globalAlpha=1;
      c.fillStyle="#173a33";rounded(c,x+8,y-30,sw-16,20,6);c.fill();c.fillStyle=colors.green;rounded(c,x+sw*.42,y-10,sw*.16,sh*.16,4);c.fill();
      c.strokeStyle="rgba(43,242,173,.55)";c.beginPath();c.moveTo(cx,y-10);c.lineTo(cx,y+sh*.34);c.stroke();
      c.restore();label(c,"COMPRESSIVE TEST",cx, y+sh+26,9,colors.muted,"center");label(c,"ISIRI 1608-3",cx,y-44,9,colors.cream,"center");
    }else{
      const x=w*.48,y=h*.25,gw=w*.36,gh=h*.25;
      c.save();c.strokeStyle="rgba(39,197,222,.20)";c.lineWidth=1;for(let i=0;i<5;i++){c.beginPath();c.moveTo(x,y+i*gh/4);c.lineTo(x+gw,y+i*gh/4);c.stroke()}for(let i=0;i<6;i++){c.beginPath();c.moveTo(x+i*gw/5,y);c.lineTo(x+i*gw/5,y+gh);c.stroke()}
      c.strokeStyle=colors.green;c.lineWidth=3;c.beginPath();[[0,.82],[.17,.67],[.34,.71],[.55,.35],[.74,.44],[1,.16]].forEach(([px,py],i)=>{const xx=x+px*gw,yy=y+py*gh;i?c.lineTo(xx,yy):c.moveTo(xx,yy)});c.stroke();
      glowDot(c,x+gw,y+gh*.16,5,colors.green,.95);label(c,"32.7 MPa",x,y-16,23,colors.text,"left");label(c,"TRACEABLE RESULT / DECISION",x,y+gh+23,9,colors.green,"left");
      rounded(c,w*.08,h*.68,w*.27,h*.12,12);c.fillStyle="rgba(10,25,31,.78)";c.fill();c.strokeStyle="rgba(43,242,173,.25)";c.stroke();label(c,"EVIDENCE",w*.10,h*.73,9,colors.muted,"left");label(c,"PASS / REVIEW",w*.10,h*.775,14,colors.text,"left");c.restore();
    }
  }
  function frame(now){
    const total=23,elapsed=Math.max(0,(now-t0)/1000);const raw=((elapsed%total)/total)*heroPhases.length;phase=Math.max(0,Math.min(heroPhases.length-1,Math.floor(raw)));phaseP=Math.max(0,Math.min(0.999,raw-phase));
    const hp=heroPhases[phase]||heroPhases[0];
    drawHero(now);header();
    p.textContent=hp.title;d.textContent=hp.detail;bar.style.width=((phase+phaseP)/heroPhases.length*100).toFixed(1)+"%";
    if(!paused)requestAnimationFrame(frame)
  }
  stage.addEventListener("pointermove",e=>{stage.style.setProperty("--pointer-x",e.offsetX+"px");stage.style.setProperty("--pointer-y",e.offsetY+"px")});
  window["6044HeroVisual"]={seekPhase(i,pct=.5){phase=Math.max(0,Math.min(heroPhases.length-1,Math.floor(Number(i)||0)));phaseP=Math.max(0,Math.min(.999,Number(pct)||0));t0=performance.now();drawHero(performance.now());header();const hp=heroPhases[phase]||heroPhases[0];p.textContent=hp.title;d.textContent=hp.detail;bar.style.width=((phase+phaseP)/heroPhases.length*100)+"%"}};
  frame(performance.now())
}

function particleMorph(){
  const host=$(".home-visual-preview"),canvas=$("[data-particle-canvas]",host);if(!host||!canvas)return;
  const {ctx}=fitCanvas(canvas,host),st=fitCanvas(canvas,host);let w=st.w,h=st.h,state=0,t0=performance.now(),playing=false;
  const phaseTexts=[["MATERIAL INPUT","مواد جدا و کنترل‌شده"],["CEMENT / SCM","مواد چسباننده"],["AGGREGATE SKELETON","اسکلت سنگدانه"],["ADMIXTURE DISPERSION","پراکندگی افزودنی"],["WATER DISTRIBUTION","توزیع آب"],["HOMOGENIZATION","ماتریس مفهومی"],["CONCEPTUAL CONCRETE","بتن تازه"]];
  const rnd=seeded(604404),N=260,pts=Array.from({length:N},()=>({a:rnd()*Math.PI*2,r:.08+rnd()*.88,size:1.2+rnd()*2.8,type:Math.floor(rnd()*4)}));
  const typeColor=[colors.sand,colors.binder,colors.water,colors.orange];
  const phase=$("[data-particle-phase]",host),count=$("[data-particle-count]",host);
  host.dataset.visualState="0";count.textContent="260 PARTICLES";
  function resize(){const a=fitCanvas(canvas,host);w=a.w;h=a.h}
  window.addEventListener("resize",resize,{passive:true});
  function target(q,i,now){
    const cx=w*.52,cy=h*.51,u=Math.min(w,h),p=state;
    if(p===0)return{x:cx+(q.r*u*.34)*Math.cos(q.a+now*.0002),y:cy+(q.r*u*.25)*Math.sin(q.a*1.18),s:1};
    if(p<=2)return{x:cx+(q.r*u*.25)*Math.cos(q.a+i*.011),y:cy+(q.r*u*.20)*Math.sin(q.a+i*.013),s:1.05};
    if(p<=4)return{x:cx+Math.cos(q.a+i*.03)*u*.18*q.r,y:cy+Math.sin(q.a*1.6+i*.017)*u*.15*q.r,s:1.15};
    const rr=u*.20*Math.sqrt(q.r);return{x:cx+Math.cos(q.a+i*.07)*rr,y:cy+Math.sin(q.a+i*.11)*rr*.80,s:p===6?1.35:1.18};
  }
  function draw(now){
    ctx.clearRect(0,0,w,h);
    const g=ctx.createRadialGradient(w*.52,h*.52,0,w*.52,h*.52,Math.min(w,h)*.46);g.addColorStop(0,"#163b36");g.addColorStop(1,"#081115");ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
    drawGrid(ctx,w,h,now,.08);
    const pulse=.5+.5*Math.sin(now*.002);
    ctx.save();ctx.strokeStyle="rgba(43,242,173,.22)";ctx.lineWidth=1;ctx.setLineDash([7,8]);ctx.beginPath();ctx.ellipse(w*.52,h*.51,w*.26,h*.22,0,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);ctx.restore();
    pts.forEach((q,i)=>{const a=target(q,i,now),col=typeColor[q.type],gl=state>=6?1.15:.75;glowDot(ctx,a.x,a.y,q.size*a.s,col,.25*gl)})
    label(ctx,"CRETIQ / MATERIAL INTELLIGENCE",w*.055,h*.10,9,colors.green);
    label(ctx,phaseTexts[state][0],w*.055,h*.17,12,colors.text);
    label(ctx,phaseTexts[state][1],w*.055,h*.21,9,colors.muted);
    if(playing&&performance.now()-t0>1650){state=Math.min(6,state+1);t0=performance.now();host.dataset.visualState=String(state)}
    if(phase){phase.textContent=phaseTexts[state][0]+" / "+phaseTexts[state][1]}
    if(playing&&state<6)requestAnimationFrame(draw);else if(!playing)requestAnimationFrame(draw);
  }
  $("[data-particle-play]",host)?.addEventListener("click",()=>{playing=true;t0=performance.now();draw(performance.now())});
  $("[data-particle-reset]",host)?.addEventListener("click",()=>{state=0;playing=false;host.dataset.visualState="0";t0=performance.now()});
  resize();requestAnimationFrame(draw)
}

hero();particleMorph();
$$("[data-process-step]").forEach(btn=>{
  btn.addEventListener("click",()=>{$$("[data-process-step]").forEach(b=>b.setAttribute("aria-selected",String(b===btn)));const i=Number(btn.dataset.processStep);const root=$("[data-process-stage]");if(root)root.dataset.processState=String(i)})
});
(()=>{const stage=$("[data-process-stage]");if(!stage)return;let s=0;const texts=[
["01","MATERIAL INPUT","مواد وارد می‌شوند.","سه گروه اصلی ماده وارد فرایند می‌شوند و هنوز با هم مخلوط نشده‌اند."],
["02","MIXING","اختلاط آغاز می‌شود.","حرکت کنترل‌شده، اجزا را از حالت جدا به یک سیستم واحد نزدیک می‌کند."],
["03","FRESH CONCRETE","بتن تازه شکل می‌گیرد.","اسکلت سنگدانه و خمیر پیوسته، یک مادهٔ قابل آزمون می‌سازند."],
["04","SPECIMEN / TEST","شاهد ساخته می‌شود.","نمونهٔ قابل ردیابی آماده می‌شود تا نتیجهٔ آزمون معنا پیدا کند."],
["05","EVIDENCE / DECISION","داده به تصمیم می‌رسد.","عدد، ردیابی و معیار پذیرش کنار هم قرار می‌گیرند."]
];
function set(i){s=Math.max(0,Math.min(4,i));stage.dataset.processState=String(s);$("[data-process-number]").textContent=texts[s][0];$("[data-process-kicker]").textContent=texts[s][1];$("[data-process-title]").textContent=texts[s][2];$("[data-process-copy]").textContent=texts[s][3]}
set(0);$$("[data-process-step]").forEach(b=>b.addEventListener("click",()=>set(Number(b.dataset.processStep))));
})();
})();