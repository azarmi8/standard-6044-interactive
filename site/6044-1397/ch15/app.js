window.BOOK_CONFIG = {
  interval: 5000,
  beats: [
    { title: 'هدف ارزیابی انطباق', body: 'هدف، بررسی انطباق بتن آماده با الزامات استاندارد و مشخصات مرتبط بر پایه نتایج آزمون، مدارک و سوابق کنترل است.' },
    { title: 'آزمون اولیه', body: 'آزمون اولیه، در موارد لازم، برای بررسی توانایی ترکیب و فرایند تولید در دستیابی به مشخصات موردنظر انجام می‌شود.' },
    { title: 'کنترل تولید', body: 'کنترل تولید طبق فصل ۱۴ یکی از پایه‌های ارزیابی انطباق است؛ بنابراین فصل ۱۵ باید در کنار سامانه کنترل تولید خوانده شود.' },
    { title: 'ارزیابی نهاد ذی‌صلاح', body: 'در مواردی که ارزیابی یا تأیید نهاد ذی‌صلاح لازم باشد، مدارک، نتایج آزمون و سوابق سامانه باید برای ارزیابی در دسترس باشند.' },
    { title: 'گواهی و قانون', body: 'گواهی و الزامات قانونی باید در چارچوب آنچه استاندارد و مقررات مربوط تعیین می‌کنند دیده شوند؛ این صفحه جایگزین متن رسمی یا مقررات اجرایی نیست.' },
    { title: 'جمع‌بندی', body: 'انطباق حاصل مجموعه‌ای از کنترل‌ها و نتایج مرتبط است: سفارش و مشخصات → مصالح → تولید → بتن تازه → نمونه و آزمون → کنترل تولید → ارزیابی و سوابق.' }
  ],
  quiz: {
    correct: 'درست — انطباق باید بر پایه مجموعه نتایج، مدارک، سوابق و الزامات مربوط ارزیابی شود.',
    incorrect: 'کافی نیست — یک نتیجه منفرد به‌تنهایی کل سیستم انطباق را توصیف نمی‌کند.'
  },
  onRender(index, beat) {
    const q = document.getElementById('q');
    const sub = document.getElementById('sub');
    const cards = document.getElementById('cards');
    if (q) q.textContent = beat.title || '';
    if (sub) sub.textContent = 'مشخصات → شواهد → ارزیابی → تصمیم';
    if (!cards) return;
    cards.innerHTML = window.BOOK_CONFIG.beats.map((item, k) => {
      const active = k === index;
      return '<g class="scene-object" data-beat="' + (k + 1) + '" aria-hidden="' + (active ? 'false' : 'true') + '" style="opacity:' + (active ? '1' : '.38') + ';transform:scale(' + (active ? '1.02' : '1') + ')">' +
        '<rect x="' + (140 + k * 230) + '" y="220" width="200" height="275" rx="22" fill="' + (active ? '#173c2a' : '#dce9df') + '"/>' +
        '<text x="' + (240 + k * 230) + '" y="285" font-size="19" font-weight="700" text-anchor="middle" fill="' + (active ? '#fff' : '#173c2a') + '">' + (k + 1) + '</text>' +
        '<text x="' + (240 + k * 230) + '" y="345" font-size="18" text-anchor="middle" fill="' + (active ? '#fff' : '#173c2a') + '">' + item.title.slice(0, 14) + '</text>' +
      '</g>';
    }).join('');
  }
};
