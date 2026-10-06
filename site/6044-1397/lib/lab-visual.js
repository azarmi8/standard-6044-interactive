/* 6044 Engineering Visual Engine v2 — laboratory hero scenes
   Canvas visualizations are deterministic teaching scenes, not physical simulators.
*/
(function(){
  'use strict';
  function boot(){
    const hosts=[...document.querySelectorAll('[data-lab-visual]')];
    if(!hosts.length)return;
    const faNum=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
    const lerp=(a,b,t)=>a+(b-a)*t;
    const clamp=v=>Math.max(0,Math.min(1,v));
    const smooth=t=>{t=clamp(t);return t*t*(3-2*t)};
    const reduced=()=>window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    hosts.forEach(host=>{
      if(host.__labVisualV2)return;
      const canvas=host.querySelector('canvas[data-lab-canvas]');
      const ctx=canvas&&canvas.getContext('2d');
      if(!ctx)return;
      const type=host.dataset.labVisual;
      const stateCount=type==='strength'?6:6;
      let w=1,h=1,dpr=1,state=0,from=0,to=0,start=0,duration=900,raf=0,running=false;
      const labels=type==='strength'
        ?['SAMPLE','SPECIMEN / 1608-2','CURING','LOAD APPLICATION','FAILURE / CRACK PATH','CONFORMITY']
        :['SLUMP CONE','LIFT','MEASURE','SCC / FLOW','TEMPERATURE + DENSITY','QC CONTEXT'];
      const faLabels=type==='strength'
        ?['نمونه نماینده','ساخت نمونه','عمل‌آوری','اعمال بار','الگوی شکست','انطباق']
        :['اسلامپ','آزادسازی مخروط','اندازه‌گیری','جریان بتن خودتراکم','دما + چگالی','زمینه تصمیم QC'];

      function resize(){
        const r=canvas.getBoundingClientRect();w=Math.max(320,r.width);h=Math.max(220,r.height);
        dpr=Math.min(2,window.devicePixelRatio||1);
        canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
        render();
      }
      function bg(){
        ctx.fillStyle='#040a0e';ctx.fillRect(0,0,w,h);
        ctx.save();ctx.globalAlpha=.14;ctx.strokeStyle='#2bf2ad';ctx.lineWidth=.5;
        const s=Math.max(30,w/28);for(let x=0;x<=w;x+=s){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}
        for(let y=0;y<=h;y+=s){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
        ctx.restore();
      }
      function shell(){
        const g=ctx.createRadialGradient(w*.52,h*.54,10,w*.52,h*.54,Math.max(w,h)*.62);
        g.addColorStop(0,'rgba(43,242,173,.07)');g.addColorStop(.55,'rgba(39,197,222,.02)');g.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
        ctx.strokeStyle='rgba(43,242,173,.18)';ctx.strokeRect(16,16,w-32,h-32);
      }
      function stageBar(){
        ctx.save();ctx.fillStyle='rgba(5,12,16,.88)';ctx.fillRect(26,24,Math.min(520,w*.58),70);
        ctx.strokeStyle='rgba(43,242,173,.28)';ctx.strokeRect(26,24,Math.min(520,w*.58),70);
        ctx.fillStyle='#2bf2ad';ctx.font='900 11px Tahoma,Arial';ctx.fillText('6044 / ENGINEERING LAB VISUAL V2',42,45);
        ctx.fillStyle='#eff8f4';ctx.font='800 15px Tahoma,Arial';ctx.fillText(labels[state],42,69);
        ctx.fillStyle='#8fa9a2';ctx.font='700 11px Tahoma,Arial';ctx.fillText(faLabels[state],42,87);
        ctx.restore();
      }
      function drawFresh(s){
        const cx=w*.5,base=h*.72;
        ctx.save();ctx.translate(cx,base);
        const coneW=Math.min(w*.22,140),coneH=Math.min(h*.34,150);
        ctx.fillStyle='rgba(190,205,199,.16)';ctx.strokeStyle='#97aaa4';ctx.lineWidth=2;
        ctx.beginPath();ctx.moveTo(-coneW*.56,-coneH);ctx.lineTo(coneW*.56,-coneH);ctx.lineTo(coneW*.38,0);ctx.lineTo(-coneW*.38,0);ctx.closePath();ctx.fill();ctx.stroke();
        const fillTop=-coneH*.73*(1-s*.45),fillBottom=-8;
        ctx.fillStyle='#6d887a';ctx.beginPath();ctx.ellipse(0,fillTop,coneW*.43,Math.max(10,(coneW*.2)*(1-s*.2)),0,0,Math.PI*2);ctx.fill();
        if(state>=1){
          ctx.save();ctx.strokeStyle='#2bf2ad';ctx.setLineDash([8,7]);ctx.lineWidth=2;
          const lifted=Math.min(70,s*70);
          ctx.beginPath();ctx.moveTo(coneW*.8,-coneH);ctx.lineTo(coneW*.8,-coneH-lifted);ctx.stroke();
          ctx.restore();
        }
        ctx.restore();
        if(state>=1){
          const y=base+18, measured=state===1?128:state===2?125:600;
          ctx.strokeStyle='#27c5de';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx-150,y);ctx.lineTo(cx+150,y);ctx.stroke();
          ctx.strokeStyle='#2bf2ad';ctx.beginPath();ctx.moveTo(cx-150,y-16);ctx.lineTo(cx-150,y+16);ctx.moveTo(cx+150,y-16);ctx.lineTo(cx+150,y+16);ctx.stroke();
          ctx.fillStyle='#eaf7f3';ctx.font='800 16px Tahoma,Arial';ctx.textAlign='center';
          ctx.fillText(state===2?'125 mm':'MEASUREMENT',cx,y-22);
          ctx.textAlign='start';
        }
        if(state===3){
          ctx.strokeStyle='rgba(39,197,222,.35)';ctx.lineWidth=2;
          for(let i=0;i<5;i++){const yy=h*.32+i*22;ctx.beginPath();ctx.moveTo(w*.20,yy);ctx.bezierCurveTo(w*.40,yy-24,w*.60,yy+24,w*.80,yy);ctx.stroke()}
          ctx.fillStyle='#8fe8cd';ctx.font='700 11px Tahoma,Arial';ctx.fillText('SLUMP FLOW / SCC',w*.20,h*.30)
        }
        if(state>=4){
          ctx.fillStyle='#76d4eb';ctx.beginPath();ctx.arc(w*.22,h*.27,9,0,Math.PI*2);ctx.fill();
          ctx.fillStyle='#8fa9a2';ctx.font='700 11px Tahoma,Arial';ctx.fillText('TEMPERATURE',w*.24,h*.275);
          ctx.fillStyle='#d0b879';ctx.beginPath();ctx.arc(w*.22,h*.34,9,0,Math.PI*2);ctx.fill();
          ctx.fillStyle='#8fa9a2';ctx.fillText('DENSITY',w*.24,h*.345);
        }
        if(state===5){
          ctx.fillStyle='#eaf7f3';ctx.font='900 22px Tahoma,Arial';ctx.fillText('PROPERTY → TEST → CRITERION → RECORD',w*.18,h*.83);
        }
      }
      function drawStrength(s){
        const cx=w*.48,top=h*.26,bodyH=h*.42,r=Math.min(w*.11,64);
        ctx.save();ctx.translate(cx,top);
        const gap=state>=3?Math.min(18,s*18):0;
        ctx.fillStyle='#a9b9b3';ctx.strokeStyle='#e0ebe7';ctx.lineWidth=2;
        ctx.beginPath();ctx.roundRect(-r,-8-gap/2,r*2,bodyH-gap,18,18);ctx.fill();ctx.stroke();
        if(state>=2){
          ctx.fillStyle='#6d8479';ctx.globalAlpha=.45;ctx.beginPath();ctx.roundRect(-r+10,8,r*2-20,bodyH-34,13,13);ctx.fill();ctx.globalAlpha=1;
        }
        if(state>=3){
          const load=Math.round(12+s*34);
          ctx.fillStyle='#2bf2ad';ctx.fillRect(-r*.9,-55,r*1.8,9);
          ctx.fillStyle='#eff8f4';ctx.font='800 14px Tahoma,Arial';ctx.textAlign='center';ctx.fillText(load+' MPa',0,-66);
          ctx.textAlign='start';
        }
        if(state>=4){
          ctx.strokeStyle='#ffb37a';ctx.lineWidth=3;
          ctx.beginPath();ctx.moveTo(-r*.45,40);ctx.lineTo(-r*.10,82);ctx.lineTo(r*.05,130);ctx.lineTo(r*.45,165);ctx.stroke();
          ctx.beginPath();ctx.moveTo(r*.35,52);ctx.lineTo(r*.10,95);ctx.stroke();
        }
        ctx.restore();
        ctx.fillStyle='#8fa9a2';ctx.font='700 12px Tahoma,Arial';ctx.textAlign='center';
        ctx.fillText(state<4?'SPECIMEN TRACE / ISIRI 1608-3':'FAILURE PATH — CONCEPTUAL',cx,h*.83);
        ctx.textAlign='start';
        if(state===5){
          ctx.fillStyle='#2bf2ad';ctx.font='900 20px Tahoma,Arial';ctx.fillText('MEAN → INDIVIDUAL LIMIT → DECISION',w*.24,h*.16);
        }
      }
      function render(){
        const t=duration?smooth((performance.now()-start)/duration):1;bg();shell();
        if(type==='strength')drawStrength(t);else drawFresh(t);stageBar();
        if(running&&!reduced())raf=requestAnimationFrame(render);
      }
      function setState(i,instant){
        state=Math.max(0,Math.min(stateCount-1,Number(i)||0));from=state;to=state;start=performance.now();duration=instant?0:900;
        host.dataset.labState=String(state);
        const e=host.querySelector('[data-lab-phase]');if(e)e.textContent=faLabels[state];
        render();
      }
      function syncBeat(e){
        const i=e&&e.detail?Number(e.detail.index):0;
        setState(Math.max(0,Math.min(5,i)),false);
      }
      function run(){
        running=true;setState(0,true);
        if(window.BookEngine)try{window.BookEngine.stop();window.BookEngine.go(0);window.BookEngine.play()}catch(e){}
        else render();
      }
      function pause(){
        running=false;if(raf)cancelAnimationFrame(raf);
        if(window.BookEngine)try{window.BookEngine.stop()}catch(e){}
      }
      function reset(){
        running=false;if(raf)cancelAnimationFrame(raf);
        if(window.BookEngine)try{window.BookEngine.stop();window.BookEngine.go(0)}catch(e){}
        setState(0,true);
      }
      host.querySelector('[data-lab-play]')?.addEventListener('click',run);
      host.querySelector('[data-lab-pause]')?.addEventListener('click',pause);
      host.querySelector('[data-lab-reset]')?.addEventListener('click',reset);
      window.addEventListener('6044:beat',syncBeat);
      window.addEventListener('resize',resize);
      resize();setState(0,true);
      host.__labVisualV2={setState,run,pause,reset};
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();