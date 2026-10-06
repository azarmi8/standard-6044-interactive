(() => {
  const root = document.querySelector('[data-render-sequence]');
  if (!root) return;

  const images = [...root.querySelectorAll('.render-sequence-media img')];
  const tabs = [...root.querySelectorAll('[data-render-scene]')];
  const play = root.querySelector('[data-render-play]');
  const kicker = root.querySelector('[data-render-kicker]');
  const count = root.querySelector('[data-render-count]');
  const title = root.querySelector('[data-render-title]');
  const copy = root.querySelector('[data-render-copy]');
  const progress = root.querySelector('.render-sequence-progress i');

  if (!images.length || tabs.length !== images.length || !play || !kicker || !count || !title || !copy || !progress) return;

  const scenes = [
    { kicker: '01 / FACTORY', title: 'مواد و تولید', copy: 'ردپای بتن از کارخانه شروع می‌شود.' },
    { kicker: '02 / FRESH CONCRETE', title: 'بتن تازه', copy: 'آزمون، قبل از آن‌که عدد تبدیل به تصمیم شود.' },
    { kicker: '03 / STRENGTH EVIDENCE', title: 'مقاومت و شاهد', copy: 'نتیجهٔ آزمایش، حلقهٔ آخر تصمیم انطباق است.' }
  ];

  let active = 0;
  let timer = null;
  let playing = false;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  const setScene = (next, restart = true) => {
    active = (next + scenes.length) % scenes.length;
    const scene = scenes[active];

    images.forEach((img, i) => img.classList.toggle('is-active', i === active));
    tabs.forEach((tab, i) => {
      const selected = i === active;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    kicker.textContent = scene.kicker;
    count.textContent = String(active + 1).padStart(2, '0') + ' — 03';
    title.textContent = scene.title;
    copy.textContent = scene.copy;
    progress.style.setProperty('--render-progress', String(active + 1));

    if (restart && playing) {
      progress.classList.remove('is-running');
      void progress.offsetWidth;
      progress.classList.add('is-running');
    }
  };

  const stop = () => {
    window.clearInterval(timer);
    timer = null;
    playing = false;
    play.setAttribute('aria-pressed', 'false');
    play.querySelector('span').textContent = 'پخش مسیر';
    progress.classList.remove('is-running');
  };

  const start = () => {
    if (reduced.matches) return;
    stop();
    playing = true;
    play.setAttribute('aria-pressed', 'true');
    play.querySelector('span').textContent = 'توقف مسیر';
    progress.classList.add('is-running');
    timer = window.setInterval(() => setScene(active + 1), 3900);
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      stop();
      setScene(i, false);
    });
    tab.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const dir = event.key === 'ArrowRight' ? 1 : -1;
      tabs[(i + dir + tabs.length) % tabs.length].focus();
      setScene(i + dir, false);
      stop();
    });
  });

  play.addEventListener('click', () => {
    if (playing) stop();
    else start();
  });

  const observer = new IntersectionObserver(entries => {
    const visible = entries.some(entry => entry.isIntersecting);
    if (visible && !reduced.matches && !root.dataset.seen) {
      root.dataset.seen = 'true';
      window.setTimeout(start, 420);
    }
    if (!visible && playing) stop();
  }, { threshold: 0.35 });
  observer.observe(root);

  reduced.addEventListener?.('change', () => {
    if (reduced.matches) stop();
  });

  setScene(0, false);
})();