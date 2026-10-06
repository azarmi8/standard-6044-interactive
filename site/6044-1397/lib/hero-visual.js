/* 6044 Interactive Book — Engineering Hero Visual v1
   Deterministic canvas visualization:
   material particles -> fresh concrete -> specimen -> test data -> decision.
   Accuracy boundary: conceptual educational visualization; not DEM/CFD/molecular dynamics.
*/
(() => {
  const canvas = document.querySelector('[data-engineering-hero]');
  if (!canvas) return;

  const wrap = canvas.closest('.engineering-hero-stage');
  const phaseLabel = wrap?.querySelector('[data-hero-phase]');
  const phaseDetail = wrap?.querySelector('[data-hero-detail]');
  const progress = wrap?.querySelector('[data-hero-progress]');
  if (!wrap) return;

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return;

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const DPR_LIMIT = 2;
  let dpr = 1;
  let width = 900;
  let height = 600;
  let particles = [];
  let last = performance.now();
  let elapsed = 0;
  let paused = reduced;
  let pointer = { x: 0.72, y: 0.38, active: false };

  const phases = [
    { key: 'MATERIAL', title: 'ورودی مواد', detail: 'سیمان و مواد مکمل • سنگدانه • آب • افزودنی', duration: 4.4 },
    { key: 'MIXING', title: 'اختلاط', detail: 'حرکت • پراکندگی • نزدیک‌شدن اجزا', duration: 4.8 },
    { key: 'CONCRETE', title: 'شکل‌گیری بتن', detail: 'اسکلت سنگدانه + خمیر + آب و افزودنی', duration: 4.8 },
    { key: 'SPECIMEN', title: 'نمونه و آزمون', detail: 'نمونه‌گیری → قالب → آزمون مقاومت فشاری', duration: 4.2 },
    { key: 'DECISION', title: 'داده → تصمیم', detail: 'نتیجه آزمون • ردیابی • قضاوت انطباق', duration: 4.8 }
  ];

  const palette = {
    bg0: '#071015',
    bg1: '#0b171d',
    grid: 'rgba(115, 163, 150, .09)',
    ink: '#e9f6f0',
    muted: '#86a29a',
    green: '#2bf2ad',
    cyan: '#27c5de',
    cream: '#f3ead6',
    aggregate: '#c1a77b',
    cement: '#d8d4c7',
    water: '#64d8ef',
    admixture: '#ef8b6b',
    red: '#ee6b64'
  };

  let seed = 60441397;
  const rand = () => {
    seed += 0x6D2B79F5;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const R = (min, max) => min + rand() * (max - min);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = t => t * t * (3 - 2 * t);
  const ease = t => {
    const s = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    return smooth(s);
  };

  function resize() {
    const rect = wrap.getBoundingClientRect();
    width = Math.max(320, Math.floor(rect.width));
    height = Math.max(260, Math.floor(width * 0.665));
    dpr = Math.min(window.devicePixelRatio || 1, DPR_LIMIT);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.aspectRatio = '900 / 600';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawnParticles() {
    const count = width < 600 ? 560 : 1050;
    particles = Array.from({ length: count }, (_, i) => {
      const type = i % 100 < 46 ? 'aggregate'
        : i % 100 < 70 ? 'cement'
        : i % 100 < 92 ? 'water'
        : 'admixture';
      const angle = R(0, Math.PI * 2);
      const radius = Math.pow(Math.random(), 0.6);
      return {
        type,
        px: R(.03, .97),
        py: R(.08, .93),
        pz: R(-1, 1),
        vx: Math.cos(angle) * R(.0002, .0011),
        vy: Math.sin(angle) * R(.0002, .0011),
        seed: Math.random() * 1000,
        size: type === 'aggregate' ? R(2.2, 6.7) : type === 'cement' ? R(1.1, 3.2) : R(.7, 2.1),
        cluster: Math.floor(R(0, 4)),
        radius
      };
    });
  }

  function matColor(type) {
    return type === 'aggregate' ? palette.aggregate
      : type === 'cement' ? palette.cement
      : type === 'water' ? palette.water
      : palette.admixture;
  }

  function phaseAt(t) {
    let x = t;
    for (let i = 0; i < phases.length; i++) {
      if (x <= phases[i].duration) return { i, p: x / phases[i].duration };
      x -= phases[i].duration;
    }
    return { i: phases.length - 1, p: 1 };
  }

  function targetFor(p, phase, now) {
    const t = p;
    const cx = width * .56;
    const cy = height * .5;

    if (phase === 0) {
      const centers = {
        aggregate: [width * .79, height * .26],
        cement: [width * .63, height * .23],
        water: [width * .76, height * .69],
        admixture: [width * .57, height * .72]
      };
      const c = centers[p.type];
      return {
        x: c[0] + Math.cos(p.seed + now * .0001) * width * .045 + Math.sin(p.seed * 1.7) * width * .02,
        y: c[1] + Math.sin(p.seed * 1.3 + now * .00007) * height * .05
      };
    }

    if (phase === 1) {
      const a = (p.seed * .013 + now * .00012) % (Math.PI * 2);
      const rx = width * (.13 + (p.cluster * .018));
      const ry = height * (.12 + (p.cluster * .012));
      return {
        x: cx + Math.cos(a) * rx,
        y: cy + Math.sin(a) * ry
      };
    }

    if (phase === 2) {
      const x = (p.seed * 0.00137) % 1;
      const y = (p.seed * 0.00217) % 1;
      const ang = Math.atan2(y - .5, x - .5);
      const radial = .32 + .25 * Math.abs(Math.sin(ang * 4 + p.seed));
      return {
        x: cx + Math.cos(ang) * width * radial * (.52 + .48 * p.radius),
        y: cy + Math.sin(ang) * height * radial * (.68 + .32 * p.radius)
      };
    }

    if (phase === 3) {
      const left = width * .46;
      const top = height * .18;
      const rw = width * .22;
      const rh = height * .60;
      const theta = (p.seed % 1) * Math.PI * 2;
      const rx = rw * Math.sqrt(p.radius);
      const ry = rh * Math.sqrt(p.radius);
      return {
        x: left + rw + Math.cos(theta) * rx,
        y: top + rh * .5 + Math.sin(theta) * ry
      };
    }

    // Decision: collapse toward evidence/telemetry channels.
    const lane = p.cluster % 3;
    const x = width * (.52 + lane * .11);
    const y = height * (.72 - lane * .18);
    return {
      x: x + Math.sin(p.seed) * width * .035,
      y: y + Math.cos(p.seed * .7) * height * .08
    };
  }

  function drawBackground(now) {
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, palette.bg0);
    g.addColorStop(1, '#08151b');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.strokeStyle = palette.grid;
    ctx.lineWidth = 1;
    const gx = Math.max(26, width / 22);
    const gy = Math.max(24, height / 16);
    const ox = (now * .006) % gx;
    for (let x = -gx + ox; x < width + gx; x += gx) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    const oy = (now * .004) % gy;
    for (let y = -gy + oy; y < height + gy; y += gy) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }
    ctx.restore();

    const aura = ctx.createRadialGradient(width * .67, height * .42, 10, width * .67, height * .42, width * .46);
    aura.addColorStop(0, 'rgba(43,242,173,.13)');
    aura.addColorStop(.42, 'rgba(39,197,222,.06)');
    aura.addColorStop(1, 'rgba(7,16,21,0)');
    ctx.fillStyle = aura;
    ctx.fillRect(0, 0, width, height);
  }

  function drawMaterialLegend() {
    const items = [
      ['aggregate', 'AGGREGATE'],
      ['cement', 'CEMENT / SCM'],
      ['water', 'WATER'],
      ['admixture', 'ADMIXTURE']
    ];
    const x = width * .055;
    let y = height * .16;
    ctx.font = '700 10px Tahoma, Arial, sans-serif';
    items.forEach(([type, label]) => {
      ctx.fillStyle = matColor(type);
      ctx.beginPath(); ctx.arc(x, y - 3, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = palette.muted;
      ctx.fillText(label, x + 10, y);
      y += 22;
    });
  }

  function drawCenterGeometry(phase, p) {
    const cx = width * .56;
    const cy = height * .5;

    if (phase === 2 || phase === 3) {
      const glow = ctx.createRadialGradient(cx, cy, 5, cx, cy, width * .28);
      glow.addColorStop(0, 'rgba(43,242,173,.16)');
      glow.addColorStop(1, 'rgba(43,242,173,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(cx, cy, width * .32, 0, Math.PI * 2); ctx.fill();
    }

    if (phase === 3) {
      const left = width * .46, top = height * .18, rw = width * .22, rh = height * .60;
      const body = ctx.createLinearGradient(left, top, left + rw * 2, top);
      body.addColorStop(0, '#274939');
      body.addColorStop(.5, '#17382b');
      body.addColorStop(1, '#0f251d');
      ctx.fillStyle = body;
      ctx.strokeStyle = 'rgba(43,242,173,.32)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(left + rw, top + 16, rw, 18, 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.rect(left, top + 16, rw * 2, rh - 32);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(left + rw, top + rh - 16, rw, 18, 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = palette.cream;
      ctx.font = '800 11px Tahoma, Arial, sans-serif';
      ctx.fillText('COMPRESSIVE TEST / 1608-3', left + 14, top - 16);
    }

    if (phase === 4) {
      const x0 = width * .48, y0 = height * .62, w = width * .33, h = height * .25;
      ctx.strokeStyle = 'rgba(39,197,222,.25)';
      ctx.lineWidth = 1;
      for (let i=0;i<5;i++){const yy=y0+i*h/4;ctx.beginPath();ctx.moveTo(x0,yy);ctx.lineTo(x0+w,yy);ctx.stroke();}
      for (let i=0;i<6;i++){const xx=x0+i*w/5;ctx.beginPath();ctx.moveTo(xx,y0);ctx.lineTo(xx,y0+h);ctx.stroke();}
      ctx.strokeStyle = palette.green;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x0, y0+h*.72);
      ctx.lineTo(x0+w*.22, y0+h*.58);
      ctx.lineTo(x0+w*.42, y0+h*.67);
      ctx.lineTo(x0+w*.63, y0+h*.30);
      ctx.lineTo(x0+w*.83, y0+h*.38);
      ctx.lineTo(x0+w, y0+h*.12);
      ctx.stroke();
      ctx.fillStyle = palette.ink;
      ctx.font = '800 22px Tahoma, Arial, sans-serif';
      ctx.fillText('fᶜ = 32.7 MPa', x0, y0 - 18);
      ctx.fillStyle = palette.green;
      ctx.font = '800 10px Tahoma, Arial, sans-serif';
      ctx.fillText('EVIDENCE / TRACEABLE RESULT', x0, y0 + h + 22);
    }
  }

  function drawParticles(progressValue, phaseIndex, now) {
    const phaseProgress = ease(clamp(progressValue, 0, 1));
    const prevIndex = Math.max(0, phaseIndex - 1);
    particles.forEach((p, i) => {
      const target = targetFor(p, phaseIndex, now);
      const prev = targetFor(p, prevIndex, now - 800);
      const morph = phaseIndex === 0 ? 1 : phaseProgress;
      let tx = lerp(prev.x, target.x, morph);
      let ty = lerp(prev.y, target.y, morph);

      if (phaseIndex === 1 || phaseIndex === 2) {
        const flow = Math.sin(now * .001 + p.seed) * height * .012;
        tx += flow;
        ty += Math.cos(now * .0014 + p.seed) * height * .01;
      }

      if (pointer.active) {
        const px = pointer.x * width;
        const py = pointer.y * height;
        const dx = tx - px;
        const dy = ty - py;
        const dist = Math.hypot(dx, dy) + 1;
        const force = clamp((110 - dist) / 110, 0, 1);
        tx += (dx / dist) * width * .035 * force;
        ty += (dy / dist) * height * .035 * force;
      }

      const x = lerp(p.px * width, tx, .92);
      const y = lerp(p.py * height, ty, .92);
      const z = .5 + .5 * Math.sin(p.seed + now * .0003);
      let r = p.size * (.75 + z * .4);

      if (phaseIndex === 4) {
        r *= .55;
      } else if (phaseIndex === 3 && p.type === 'aggregate') {
        r *= 1.15;
      }

      ctx.globalAlpha = phaseIndex === 4 ? .55 : .76 + z * .18;
      ctx.fillStyle = matColor(p.type);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      if (p.type === 'aggregate' && (phaseIndex === 2 || phaseIndex === 3) && r > 3) {
        ctx.globalAlpha *= .22;
        ctx.strokeStyle = palette.cream;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(x, y, r + 2, 0, Math.PI*2); ctx.stroke();
      }

      p.px += p.vx * (phaseIndex < 2 ? 1.2 : .25);
      p.py += p.vy * (phaseIndex < 2 ? 1.2 : .25);
      if (p.px < .015 || p.px > .985) p.vx *= -1;
      if (p.py < .08 || p.py > .94) p.vy *= -1;
      p.px = clamp(p.px, .01, .99);
      p.py = clamp(p.py, .06, .95);
    });
    ctx.globalAlpha = 1;
  }

  function drawTelemetry(phaseIndex, phaseProgress) {
    const x = width * .055;
    const y = height * .83;
    ctx.fillStyle = 'rgba(7,16,21,.72)';
    ctx.strokeStyle = 'rgba(43,242,173,.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, y, width * .37, height * .1, 14);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = palette.muted;
    ctx.font = '700 9px Tahoma, Arial, sans-serif';
    ctx.fillText('ENGINEERING VISUAL STATE', x + 12, y + 18);
    ctx.fillStyle = palette.ink;
    ctx.font = '800 14px Tahoma, Arial, sans-serif';
    ctx.fillText(phases[phaseIndex].key, x + 12, y + 39);

    const barX = x + 12, barY = y + 51, barW = width * .34, barH = 3;
    ctx.fillStyle = 'rgba(255,255,255,.08)';
    ctx.fillRect(barX, barY, barW, barH);
    ctx.fillStyle = palette.green;
    ctx.fillRect(barX, barY, barW * phaseProgress, barH);
  }

  function render(now) {
    drawBackground(now);
    const total = phases.reduce((s,p) => s + p.duration, 0);
    const t = elapsed % total;
    const { i, p } = phaseAt(t);
    drawMaterialLegend();
    drawCenterGeometry(i, p);
    drawParticles(p, i, now);
    drawTelemetry(i, ease(p));

    if (phaseLabel) phaseLabel.textContent = phases[i].title;
    if (phaseDetail) phaseDetail.textContent = phases[i].detail;
    if (progress) progress.style.width = `${Math.round(p * 100)}%`;
  }

  function tick(now) {
    const dt = Math.min(.05, (now - last) / 1000);
    last = now;
    if (!paused) elapsed += dt;
    render(now);
    if (!reduced) requestAnimationFrame(tick);
  }

  wrap.addEventListener('pointermove', e => {
    const r = canvas.getBoundingClientRect();
    pointer.x = clamp((e.clientX - r.left) / r.width, 0, 1);
    pointer.y = clamp((e.clientY - r.top) / r.height, 0, 1);
    pointer.active = true;
  });
  wrap.addEventListener('pointerleave', () => { pointer.active = false; });

  window.addEventListener('resize', () => {
    resize();
    spawnParticles();
    render(performance.now());
  }, { passive: true });

  resize();
  spawnParticles();
  render(performance.now());
  if (!reduced) requestAnimationFrame(tick);
})();
