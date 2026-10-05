window.BOOK_CONFIG = {
  interval: 5000,
  beats: [
    { title: 'مسئولیت تولیدکننده', body: 'کنترل تولید فقط کار آزمایشگاه نیست؛ فصل مسئولیت تولیدکننده را در چارچوب یک سیستم کنترل تولید مطرح می‌کند.' },
    { title: 'سیستم کنترل تولید', body: 'سیستم کنترل تولید باید روش‌ها و کنترل‌های لازم برای تولید را دربرگیرد و شواهد اجرای آن‌ها قابل ثبت و بازیابی باشد.' },
    { title: 'مواد و تجهیزات', body: 'مواد اولیه و تجهیزات تولید باید کنترل شوند. ارتباط این کنترل با فصل ۴ و فصل ۱۳ باعث می‌شود زنجیره از ورودی تا تولید قطع نشود.' },
    { title: 'آزمون اولیه و طرح اختلاط', body: 'آزمون اولیه و طرح اختلاط بخشی از شواهد توانایی تولید بتن مطابق مشخصات موردنظر هستند؛ تغییرات مواد یا شرایط باید در سیستم دیده شوند.' },
    { title: 'صلاحیت کارکنان', body: 'صلاحیت و توانایی کارکنان در اجرای فعالیت‌های مرتبط با تولید و کنترل باید در سیستم کنترل تولید دیده شود.' },
    { title: 'سوابق و ردیابی', body: 'سوابق آزمون، تولید، مواد، تجهیزات و تصمیم‌ها باید قابل ردیابی باشند. یک سیستم خوب باید بتواند نشان دهد «چه چیزی، چه زمانی، توسط چه کسی و با چه شواهدی» کنترل شده است.' }
  ],
  quiz: {
    correct: 'درست — فصل ۱۴ یک سیستم است، نه یک برگه آزمایش.',
    incorrect: 'کافی نیست — ارزیابی کنترل تولید به شواهد و سوابق سیستم نیاز دارد.'
  },
  onRender(index, beat) {
    const q = document.getElementById('q');
    const sub = document.getElementById('sub');
    const cards = document.getElementById('cards');
    if (q) q.textContent = beat.title || '';
    if (sub) sub.textContent = 'ورودی‌ها → تولید → آزمون → سوابق → بازرسی';
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
