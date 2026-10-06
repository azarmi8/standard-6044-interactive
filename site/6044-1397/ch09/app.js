window.BOOK_CONFIG = {
  interval: 5000,
  beats: [
    { title: 'صلاحیت و تجهیزات', body: 'نمونه‌برداری باید با صلاحیت و تجهیزات مناسب انجام شود تا نمونه‌ای که برای آزمون انتخاب می‌شود نماینده بتن موردنظر باشد.' },
    { title: 'نمونه نماینده', body: 'نمونه باید نماینده محموله تحویلی باشد؛ مهم فقط داشتن نمونه نیست، بلکه باید بتوان نتیجه آزمون را به بتن مربوط نسبت داد.' },
    { title: 'شناسه و زمان', body: 'زمان نمونه‌برداری، محل، شماره محموله و وسیله حمل از اطلاعات کلیدی ردیابی هستند و باید در سوابق مرتبط ثبت شوند.' },
    { title: 'آزمون بتن تازه', body: 'آزمون‌های بتن تازه باید به نمونه‌برداری درست متصل باشند. نتیجه آزمون زمانی برای کنترل کیفیت قابل اتکاست که هویت نمونه و شرایط نمونه‌برداری روشن باشد.' },
    { title: 'ارتباط با مقاومت', body: 'نمونه‌برداری بتن تازه با فرایند تهیه آزمونه‌های مقاومت ارتباط دارد؛ زنجیره نمونه تا آزمون سخت‌شده نباید گسسته شود.' },
    { title: 'عدم انطباق', body: 'اگر در نتیجه آزمون یا شرایط نمونه‌برداری مسئله‌ای ایجاد شود، بررسی باید بر اساس بندهای مرتبط، مشخصات پروژه و سوابق انجام شود؛ از یک نتیجه منفرد تصمیم نگیرید.' }
  ],
  quiz: {
    correct: 'درست — نمونه باید هویت، نمایندگی و مسیر آزمون مشخص داشته باشد.',
    incorrect: 'کافی نیست — بدون ردیابی، نتیجه آزمایش برای تصمیم QC ناقص است.'
  },
  onRender(index, beat) {
    const q = document.getElementById('q');
    const sub = document.getElementById('sub');
    const cards = document.getElementById('cards');
    if (q) q.textContent = beat.title || '';
    if (sub) sub.textContent = 'بار تحویلی → نمونه نماینده → آزمون → تصمیم';
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
