/* 6044 Interactive Book — Engineering Hero Visual v2
   WebGL point-cloud + 2D engineering annotation layer.
   Narrative: material input -> mixing -> concrete -> specimen -> evidence.
   Accuracy boundary: deterministic conceptual educational visualization;
   not DEM, CFD, molecular dynamics, or validated microstructure simulation.
*/
(() => {
  const glCanvas = document.querySelector('[data-engineering-hero]');
  const overlay = document.querySelector('[data-engineering-hero-overlay]');
  if (!glCanvas || !overlay) return;

  const wrap = glCanvas.closest('.engineering-hero-stage');
  const phaseLabel = wrap?.querySelector('[data-hero-phase]');
  const phaseDetail = wrap?.querySelector('[data-hero-detail]');
  const progress = wrap?.querySelector('[data-hero-progress]');
  if (!wrap) return;

  const ctx = overlay.getContext('2d');
  if (!ctx) return;

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const DPR_LIMIT = 2;
  let dpr = 1;
  let width = 900, height = 600;
  let last = performance.now();
  let elapsed = 0;
  let paused = reduced;
  let pointer = { x: 0.12, y: 0.0, active: false };
  let particles = [];

  const phases = [
    { key:'MATERIAL', title:'ورودی مواد', detail:'سیمان و مواد مکمل • سنگدانه • آب • افزودنی', duration:4.4 },
    { key:'MIXING', title:'اختلاط', detail:'حرکت • پراکندگی • نزدیک‌شدن اجزا', duration:4.8 },
    { key:'CONCRETE', title:'شکل‌گیری بتن', detail:'اسکلت سنگدانه + خمیر + آب و افزودنی', duration:4.8 },
    { key:'SPECIMEN', title:'نمونه و آزمون', detail:'نمونه‌گیری → قالب → آزمون مقاومت فشاری', duration:4.2 },
    { key:'DECISION', title:'داده → تصمیم', detail:'نتیجه آزمون • ردیابی • قضاوت انطباق', duration:4.8 }
  ];

  const color = {
    bg:'#071015', grid:'rgba(115,163,150,.11)', ink:'#e9f6f0', muted:'#86a29a',
    green:[43/255,242/255,173/255], cyan:[39/255,197/255,222/255],
    cream:[243/255,234/255,214/255], aggregate:[193/255,167/255,123/255],
    cement:[216/255,212/255,199/255], water:[100/255,216/255,239/255],
    admixture:[239/255,139/255,107/255], red:[238/255,107/255,100/255]
  };

  let seed = 60441397;
  const rand = () => {
    seed += 0x6D2B79F5;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const R = (a,b) => a + rand()*(b-a);
  const clamp = (v,a,b) => Math.max(a, Math.min(b,v));
  const lerp = (a,b,t) => a + (b-a)*t;
  const smooth = t => t*t*(3-2*t);
  const ease = t => smooth(t < .5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2);

  const gl = glCanvas.getContext('webgl', { alpha:false, antialias:false, powerPreference:'high-performance' });
  const glReady = !!gl;
  let program = null;
  let posBuffer = null, colorBuffer = null, sizeBuffer = null;
  let posData, colorData, sizeData;
  let uniforms = null;
  let attribs = null;

  const vertexSource = `
    attribute vec3 a_position;
    attribute vec4 a_color;
    attribute float a_size;
    uniform float u_time;
    uniform float u_pointScale;
    uniform float u_yaw;
    uniform float u_pitch;
    varying vec4 v_color;
    void main(){
      vec3 p = a_position;
      float sway = sin(u_time * .85 + p.z * 9.0 + p.x * 3.0) * .004;
      p.xy += vec2(sway, cos(u_time * .72 + p.y * 7.0) * .003);

      float cy = cos(u_yaw), sy = sin(u_yaw);
      float cp = cos(u_pitch), sp = sin(u_pitch);
      p = vec3(p.x * cy - p.z * sy, p.y, p.x * sy + p.z * cy);
      p = vec3(p.x, p.y * cp - p.z * sp, p.y * sp + p.z * cp);

      float depth = clamp(1.35 - p.z * .34, .68, 1.82);
      vec2 projected = p.xy / depth;
      gl_Position = vec4(projected, clamp(p.z * .72, -1.0, 1.0), 1.0);
      gl_PointSize = max(1.0, a_size * u_pointScale / depth);
      v_color = a_color;
    }
  `;
  const fragmentSource = `
    precision mediump float;
    varying vec4 v_color;
    void main(){
      vec2 q = gl_PointCoord - .5;
      float d = length(q);
      float core = 1.0 - smoothstep(.02,.28,d);
      float halo = 1.0 - smoothstep(.20,.50,d);
      float alpha = (core * .92 + halo * .30) * v_color.a;
      if(alpha < .015) discard;
      gl_FragColor = vec4(v_color.rgb, alpha);
    }
  `;

  function compile(src,type){
    const s=gl.createShader(type);
    gl.shaderSource(s,src); gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){ gl.deleteShader(s); return null; }
    return s;
  }
  function initGL(){
    if(!gl) return;
    const vs=compile(vertexSource,gl.VERTEX_SHADER);
    const fs=compile(fragmentSource,gl.FRAGMENT_SHADER);
    if(!vs||!fs){ return; }
    program=gl.createProgram();
    gl.attachShader(program,vs); gl.attachShader(program,fs); gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)){ program=null; return; }
    posBuffer=gl.createBuffer(); colorBuffer=gl.createBuffer(); sizeBuffer=gl.createBuffer();
    uniforms={
      time:gl.getUniformLocation(program,'u_time'),
      pointScale:gl.getUniformLocation(program,'u_pointScale'),
      yaw:gl.getUniformLocation(program,'u_yaw'),
      pitch:gl.getUniformLocation(program,'u_pitch')
    };
    attribs={position:gl.getAttribLocation(program,'a_position'), color:gl.getAttribLocation(program,'a_color'), size:gl.getAttribLocation(program,'a_size')};
    gl.useProgram(program);
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.disable(gl.DEPTH_TEST);
  }

  if(glReady) initGL();

  function resize(){
    const rect=wrap.getBoundingClientRect();
    width=Math.max(320,Math.floor(rect.width));
    height=Math.max(260,Math.floor(rect.height));
    dpr=Math.min(window.devicePixelRatio||1,DPR_LIMIT);

    glCanvas.width=Math.floor(width*dpr);
    glCanvas.height=Math.floor(height*dpr);
    overlay.width=Math.floor(width*dpr);
    overlay.height=Math.floor(height*dpr);
    glCanvas.style.width=width+'px';
    glCanvas.style.height=height+'px';
    overlay.style.width=width+'px';
    overlay.style.height=height+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.direction='ltr';
    ctx.textAlign='left';
    ctx.textBaseline='alphabetic';
    if(glReady && gl){
      gl.viewport(0,0,glCanvas.width,glCanvas.height);
      gl.clearColor(0.027,0.063,0.082,1);
    }
  }

  function spawnParticles(){
    const count=width<600 ? 2600 : 7200;
    seed=60441397;
    particles=Array.from({length:count},(_,i)=>{
      const mod=i%100;
      const type=mod<46?'aggregate':mod<70?'cement':mod<92?'water':'admixture';
      const a=R(0,Math.PI*2);
      return {
        type,
        x:R(-1,1), y:R(-1,1), z:R(-1,1),
        tx:0,ty:0,tz:0,
        size:type==='aggregate'?R(2.0,5.4):type==='cement'?R(1.0,2.8):R(.65,2.0),
        seed:R(0,1000),
        zBias:R(-.72,.72),
        radiusBias:Math.pow(R(.03,1),.55),
        cluster:i%6,
        phaseBias:R(0,.8),
        vx:Math.cos(a)*R(.00008,.00045),
        vy:Math.sin(a)*R(.00008,.00045)
      };
    });
    posData=new Float32Array(count*3);
    colorData=new Float32Array(count*4);
    sizeData=new Float32Array(count);
    for(let i=0;i<count;i++) sizeData[i]=particles[i].size;
    if(glReady&&gl&&program) uploadStatic();
  }

  function uploadStatic(){
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,colorData,gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,sizeData,gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,posData,gl.DYNAMIC_DRAW);
  }

  function colorFor(type){
    return type==='aggregate'?color.aggregate:type==='cement'?color.cement:type==='water'?color.water:color.admixture;
  }

  const totals=phases.reduce((s,p)=>s+p.duration,0);
  function phaseAt(t){
    let x=t;
    for(let i=0;i<phases.length;i++){
      if(x<=phases[i].duration) return {i,p:x/phases[i].duration};
      x-=phases[i].duration;
    }
    return {i:phases.length-1,p:1};
  }

  function target3D(p,phase,now){
    // World coordinates reserve the right side of the viewport for the visual object.
    const cx=.12, cy=.02;
    if(phase===0){
      const groups={
        aggregate:[.48,.42], cement:[.26,.44], water:[.44,-.46], admixture:[.08,-.42]
      };
      const g=groups[p.type], spin=now*.00012+p.seed;
      return {x:g[0]+Math.cos(spin)*.13+Math.sin(p.seed)*.035,
              y:g[1]+Math.sin(spin*1.17)*.12+Math.cos(p.seed*.8)*.028,
              z:Math.sin(p.seed*1.7)*.78};
    }
    if(phase===1){
      const a=p.seed*.017+now*.0005+p.cluster*.6;
      const ring=.20+.07*(p.cluster%4);
      return {x:cx+Math.cos(a)*ring,
              y:cy+Math.sin(a)*ring*.72,
              z:Math.sin(a*1.7+p.seed)*.78};
    }
    if(phase===2){
      const a=(p.seed*.009)% (Math.PI*2);
      const radial=Math.min(.46,.10+.36*p.radiusBias);
      const rr=radial*(p.type==='aggregate'?1:p.type==='cement'?.92:.86);
      const zScale=Math.sqrt(Math.max(.05,1-(rr/.48)*(rr/.48)));
      return {
        x:cx+Math.cos(a)*rr,
        y:cy+Math.sin(a)*rr*.74,
        z:p.zBias*zScale
      };
    }
    if(phase===3){
      const a=p.seed*1.73;
      const rr=.30*Math.sqrt((p.seed%100)/100);
      return {x:cx+Math.cos(a)*rr,
              y:cy+Math.sin(a)*.78*rr,
              z:(p.seed%2?1:-1)*Math.sqrt(Math.max(0,.76-rr*rr))};
    }
    const lane=p.cluster%4;
    return {x:-.05+lane*.18+Math.sin(p.seed)*.025,
            y:.46-lane*.28+Math.cos(p.seed*.7)*.055,
            z:Math.sin(p.seed*2.1)*.32};
  }

  function updateParticles(phaseIndex,phaseProgress,now){
    const e=ease(phaseProgress);
    const prevIndex=Math.max(0,phaseIndex-1);
    const pointerX=(pointer.x*2-1)*.9;
    const pointerY=(.5-pointer.y)*1.3;

    for(let i=0;i<particles.length;i++){
      const p=particles[i];
      const a=target3D(p,phaseIndex,now);
      const b=target3D(p,prevIndex,now-620);
      const m=phaseIndex===0?1:e;
      let x=lerp(b.x,a.x,m), y=lerp(b.y,a.y,m), z=lerp(b.z,a.z,m);

      if(pointer.active){
        const dx=x-pointerX, dy=y-pointerY;
        const dist=Math.hypot(dx,dy)+.001;
        const force=clamp((.32-dist)/.32,0,1);
        x+=dx/dist*.055*force;
        y+=dy/dist*.055*force;
      }

      // Small coherent drift prevents a dead "screensaver" look.
      x+=Math.sin(now*.00065+p.seed)*.006;
      y+=Math.cos(now*.00052+p.seed*.7)*.005;

      p.x=lerp(p.x,x,.84); p.y=lerp(p.y,y,.84); p.z=lerp(p.z,z,.84);

      posData[i*3]=p.x;
      posData[i*3+1]=p.y;
      posData[i*3+2]=p.z;

      const c=colorFor(p.type);
      const alpha=phaseIndex===4?.46:.66+((Math.sin(p.seed+now*.0007)+1)*.10);
      colorData[i*4]=c[0]; colorData[i*4+1]=c[1]; colorData[i*4+2]=c[2]; colorData[i*4+3]=alpha;
    }
  }

  function drawOverlayBackground(now){
    ctx.clearRect(0,0,width,height);
    const gx=Math.max(28,width/20), gy=Math.max(26,height/15);
    ctx.strokeStyle=color.grid; ctx.lineWidth=1;
    const ox=(now*.008)%gx, oy=(now*.005)%gy;
    for(let x=-gx+ox;x<width+gx;x+=gx){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,height);ctx.stroke();}
    for(let y=-gy+oy;y<height+gy;y+=gy){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(width,y);ctx.stroke();}

    const aura=ctx.createRadialGradient(width*.63,height*.45,4,width*.63,height*.45,width*.42);
    aura.addColorStop(0,'rgba(43,242,173,.12)');
    aura.addColorStop(.5,'rgba(39,197,222,.045)');
    aura.addColorStop(1,'rgba(7,16,21,0)');
    ctx.fillStyle=aura; ctx.fillRect(0,0,width,height);

    ctx.fillStyle=color.muted;
    ctx.font='800 9px Tahoma,Arial,sans-serif';
    ctx.fillText(glReady?'WEBGL POINT CLOUD / GPU':'CANVAS FALLBACK / SAFE MODE',width*.055,height*.11);

    const scan=(now*.045)%height;
    ctx.fillStyle='rgba(43,242,173,.08)';
    ctx.fillRect(0,scan,width,1);
  }

  function drawLegend(){
    const items=[
      ['aggregate','AGGREGATE'],['cement','CEMENT / SCM'],['water','WATER'],['admixture','ADMIXTURE']
    ];
    let y=height*.16, x=width*.055;
    items.forEach(([type,label])=>{
      const c=colorFor(type);
      ctx.fillStyle='rgb('+c.map(v=>Math.round(v*255)).join(',')+')';
      ctx.beginPath();ctx.arc(x,y-3,3.2,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=color.muted;ctx.font='700 9px Tahoma,Arial,sans-serif';
      ctx.fillText(label,x+10,y); y+=20;
    });
  }

  function drawPhaseGeometry(phase,p){
    const cx=width*.56, cy=height*.49;
    if(phase===1||phase===2){
      ctx.save();ctx.translate(cx,cy);ctx.globalAlpha=phase===1?.28:.16;
      for(let i=0;i<5;i++){
        ctx.beginPath();ctx.ellipse(0,0,width*(.13+i*.028),height*(.105+i*.016),performance.now()*.0002+i*.65,-1.12,1.92);
        ctx.strokeStyle=i%2?'rgba(39,197,222,.8)':'rgba(43,242,173,.8)';ctx.lineWidth=1.1;ctx.stroke();
      }
      ctx.restore();
    }
    if(phase===2){
      ctx.save();
      const reticleR=Math.min(width*.33,height*.28);
      ctx.strokeStyle='rgba(43,242,173,.18)';
      ctx.lineWidth=1;
      [[0,-reticleR],[reticleR,0],[0,reticleR],[-reticleR,0]].forEach(([dx,dy])=>{
        ctx.beginPath();ctx.moveTo(cx+dx*.92,cy+dy*.92);ctx.lineTo(cx+dx,cy+dy);ctx.stroke();
      });

      const aura=ctx.createRadialGradient(cx-width*.04,cy-height*.02,8,cx,cy,width*.34);
      aura.addColorStop(0,'rgba(43,242,173,.105)');
      aura.addColorStop(.45,'rgba(39,197,222,.045)');
      aura.addColorStop(1,'rgba(7,16,21,0)');
      ctx.fillStyle=aura;
      ctx.beginPath();ctx.ellipse(cx,cy,width*.33,height*.25,0,0,Math.PI*2);ctx.fill();

      ctx.strokeStyle='rgba(243,234,214,.18)';ctx.lineWidth=1;
      for(let i=0;i<5;i++){
        const k=1-i*.11;
        ctx.beginPath();
        ctx.ellipse(cx-width*.015,cy+height*.008,width*.31*k,height*.235*k,0,0,Math.PI*2);
        ctx.stroke();
      }
      ctx.strokeStyle='rgba(43,242,173,.18)';
      ctx.beginPath();ctx.moveTo(cx-width*.34,cy);ctx.lineTo(cx+width*.34,cy);ctx.stroke();
      ctx.beginPath();ctx.moveTo(cx,cy-height*.25);ctx.lineTo(cx,cy+height*.25);ctx.stroke();

      ctx.fillStyle='rgba(233,246,240,.88)';
      ctx.font='900 13px Tahoma,Arial,sans-serif';
      ctx.fillText('FRESH CONCRETE / CONCEPTUAL MATRIX',cx-width*.19,cy-height*.28);
      ctx.fillStyle='rgba(134,162,154,.9)';
      ctx.font='700 9px Tahoma,Arial,sans-serif';
      ctx.fillText('aggregate skeleton  •  paste  •  water  •  admixture',cx-width*.19,cy-height*.245);
      ctx.restore();
    }
    if(phase===3){
      const x=cx-width*.105,y=height*.19,w=width*.21,h=height*.58;
      ctx.save();
      ctx.fillStyle='rgba(23,56,43,.24)';ctx.strokeStyle='rgba(43,242,173,.38)';
      ctx.beginPath();ctx.roundRect(x,y,w,h,16);ctx.fill();ctx.stroke();
      ctx.strokeStyle='rgba(243,234,214,.22)';
      ctx.beginPath();ctx.ellipse(cx,y+11,w*.48,10,0,0,Math.PI*2);ctx.stroke();
      ctx.beginPath();ctx.ellipse(cx,y+h-11,w*.48,10,0,0,Math.PI*2);ctx.stroke();
      ctx.fillStyle='rgba(233,246,240,.82)';ctx.font='800 9px Tahoma,Arial,sans-serif';
      ctx.fillText('ISIRI 1608-3 / COMPRESSIVE TEST',x+12,y-12);
      // press head + load line
      ctx.fillStyle='rgba(39,197,222,.72)';ctx.fillRect(cx-18,y-42,36,24);
      ctx.fillStyle='rgba(43,242,173,.5)';ctx.fillRect(cx-1,y-18,2,h*.14);
      ctx.restore();
    }
  }

  function drawDecisionGraph(){
    const x=width*.49,y=height*.64,w=width*.40,h=height*.22;
    ctx.strokeStyle='rgba(39,197,222,.18)';ctx.lineWidth=1;
    for(let i=0;i<5;i++){const yy=y+i*h/4;ctx.beginPath();ctx.moveTo(x,yy);ctx.lineTo(x+w,yy);ctx.stroke();}
    for(let i=0;i<6;i++){const xx=x+i*w/5;ctx.beginPath();ctx.moveTo(xx,y);ctx.lineTo(xx,y+h);ctx.stroke();}
    ctx.strokeStyle='rgba(43,242,173,.9)';ctx.lineWidth=2.2;ctx.beginPath();
    const pts=[[0,.78],[.18,.62],[.37,.69],[.55,.33],[.75,.41],[1,.12]];
    pts.forEach(([px,py],i)=>{const xx=x+px*w, yy=y+py*h;i?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy);});
    ctx.stroke();
    ctx.fillStyle=color.ink;ctx.font='900 20px Tahoma,Arial,sans-serif';ctx.fillText('fᶜ = 32.7 MPa',x,y-15);
    ctx.fillStyle='rgba(43,242,173,.8)';ctx.font='800 9px Tahoma,Arial,sans-serif';ctx.fillText('EVIDENCE / TRACEABLE RESULT',x,y+h+20);
  }

  function drawTelemetry(phaseIndex,phaseProgress){
    const x=width*.055, y=height*.82, w=width*.40,h=height*.105;
    ctx.fillStyle='rgba(7,16,21,.70)';ctx.strokeStyle='rgba(43,242,173,.20)';
    ctx.beginPath();ctx.roundRect(x,y,w,h,12);ctx.fill();ctx.stroke();
    ctx.fillStyle=color.muted;ctx.font='700 8px Tahoma,Arial,sans-serif';ctx.fillText('ENGINEERING VISUAL STATE',x+11,y+17);
    ctx.fillStyle=color.ink;ctx.font='900 13px Tahoma,Arial,sans-serif';ctx.fillText(phases[phaseIndex].key,x+11,y+37);
    ctx.fillStyle='rgba(255,255,255,.08)';ctx.fillRect(x+11,y+50,w-22,3);
    ctx.fillStyle='#2bf2ad';ctx.fillRect(x+11,y+50,(w-22)*phaseProgress,3);
  }

  function renderGL(timeSec){
    if(!glReady||!gl||!program) return;
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.uniform1f(uniforms.time,timeSec);
    gl.uniform1f(uniforms.pointScale, width<600 ? 1.95*dpr : 2.35*dpr);
    const targetYaw = pointer.active ? (pointer.x-.5)*.34 : Math.sin(timeSec*.28)*.025;
    const targetPitch = pointer.active ? (.5-pointer.y)*.24 : Math.cos(timeSec*.22)*.018;
    gl.uniform1f(uniforms.yaw,targetYaw);
    gl.uniform1f(uniforms.pitch,targetPitch);

    gl.bindBuffer(gl.ARRAY_BUFFER,posBuffer);
    const locPos=attribs.position;
    gl.enableVertexAttribArray(locPos);gl.vertexAttribPointer(locPos,3,gl.FLOAT,false,0,0);
    gl.bufferSubData(gl.ARRAY_BUFFER,0,posData);

    gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
    const locColor=attribs.color;
    gl.enableVertexAttribArray(locColor);gl.vertexAttribPointer(locColor,4,gl.FLOAT,false,0,0);
    gl.bufferSubData(gl.ARRAY_BUFFER,0,colorData);

    gl.bindBuffer(gl.ARRAY_BUFFER,sizeBuffer);
    const locSize=attribs.size;
    gl.enableVertexAttribArray(locSize);gl.vertexAttribPointer(locSize,1,gl.FLOAT,false,0,0);

    gl.drawArrays(gl.POINTS,0,particles.length);
  }

  function renderFallback(phaseIndex,phaseProgress,now){
    if(glReady) return;
    ctx.save();
    particles.slice(0,900).forEach(p=>{
      const a=target3D(p,phaseIndex,now), b=target3D(p,Math.max(0,phaseIndex-1),now-620);
      const m=phaseIndex===0?1:ease(phaseProgress);
      const wx=lerp(b.x,a.x,m)*width*.45+width*.56;
      const wy=-lerp(b.y,a.y,m)*height*.42+height*.50;
      const rr=Math.max(.7,p.size*(1+.3*(p.z+.2)));
      const c=colorFor(p.type);
      ctx.fillStyle='rgb('+c.map(v=>Math.round(v*255)).join(',')+')';
      ctx.globalAlpha=.58;
      ctx.beginPath();ctx.arc(wx,wy,rr,0,Math.PI*2);ctx.fill();
    });
    ctx.restore();
    ctx.globalAlpha=1;
  }

  function render(now){
    const t=elapsed%totals, state=phaseAt(t), idx=state.i, p=state.p;
    updateParticles(idx,p,now);
    renderGL(now*.001);
    drawOverlayBackground(now);
    drawLegend();
    drawPhaseGeometry(idx,p);
    if(idx===4) drawDecisionGraph();
    if(!glReady) renderFallback(idx,p,now);
    drawTelemetry(idx,ease(p));

    if(phaseLabel) phaseLabel.textContent=phases[idx].title;
    if(phaseDetail) phaseDetail.textContent=phases[idx].detail;
    if(progress) progress.style.width=Math.round(p*100)+'%';
    wrap.dataset.heroRenderer=glReady?'webgl':'canvas';
    wrap.dataset.heroPhaseState=phases[idx].key.toLowerCase();
  }

  function tick(now){
    const dt=Math.min(.05,(now-last)/1000);last=now;
    if(!paused) elapsed+=dt;
    render(now);
    if(!reduced) requestAnimationFrame(tick);
  }

  wrap.addEventListener('pointermove',e=>{
    const r=glCanvas.getBoundingClientRect();
    pointer.x=clamp((e.clientX-r.left)/r.width,0,1);
    pointer.y=clamp((e.clientY-r.top)/r.height,0,1);
    pointer.active=true;
  },{passive:true});
  wrap.addEventListener('pointerleave',()=>{pointer.active=false;});

  window.addEventListener('resize',()=>{resize();spawnParticles();render(performance.now());},{passive:true});
  document.addEventListener('visibilitychange',()=>{ if(document.hidden) paused=true; else if(!reduced) paused=false; });

  resize();spawnParticles();render(performance.now());
  if(!reduced) requestAnimationFrame(tick);

  window['6044HeroVisual']={
    pause:()=>paused=true,
    play:()=>{if(!reduced)paused=false},
    reset:()=>{elapsed=0;render(performance.now())},
    seekPhase:(index,progressValue=.5)=>{
      const safeIndex=Math.max(0,Math.min(phases.length-1,Number(index)||0));
      const safeProgress=Math.max(0,Math.min(1,Number(progressValue)||0));
      elapsed=phases.slice(0,safeIndex).reduce((s,p)=>s+p.duration,0)+phases[safeIndex].duration*safeProgress;
      render(performance.now());
    }
  };
})();
