window.BOOK_CONFIG = {
  interval: 5000,
  beats: [
    { title: 'برگه تحویل', body: 'برگه تحویل و شناسه محموله یکی از نقاط اصلی ردیابی است؛ اطلاعات آن باید بتواند بار را به مشخصات سفارش و سوابق بعدی وصل کند.' },
    { title: 'مشخصات محموله', body: 'مشخصات، مقدار، رده و زمان‌های مرتبط با تحویل باید به شکل روشن ثبت شوند تا کنترل کیفیت بداند نتیجه مربوط به کدام بتن است.' },
    { title: 'محل پروژه و نمونه', body: 'ارتباط محموله با محل پروژه و نمونه‌های گرفته‌شده باید حفظ شود. این ارتباط برای تفسیر نتایج و بررسی عدم انطباق اهمیت دارد.' },
    { title: 'آزمون و پذیرش', body: 'آزمون و تصمیم پذیرش باید بر اساس مشخصات مربوط و نتایج ثبت‌شده انجام شود؛ یک نتیجه بدون شناسه یا بدون معیار قابل تفسیر کامل نیست.' },
    { title: 'آب و افزودنی در محل', body: 'آب یا افزودنی افزوده‌شده در محل، در صورت انجام، باید در سوابق مرتبط با محموله ثبت شود تا تغییرات ترکیب بتن قابل ردیابی باشد.' },
    { title: 'تصمیم QC', body: 'در کنترل واقعی، برگه تحویل فقط یک فرم اداری نیست: کلید اتصال سفارش، بار، محل، تغییرات، نمونه‌ها، آزمون و تصمیم پذیرش است.' }
  ],
  quiz: {
    correct: 'درست — کنترل بتن آماده بدون ردیابی محموله ناقص است.',
    incorrect: 'کافی نیست — باید بتوان تغییرات و نتایج را به محموله مشخص نسبت داد.'
  },
  onRender(index, beat) {
    const q = document.getElementById('q');
    const sub = document.getElementById('sub');
    const cards = document.getElementById('cards');
    if (q) q.textContent = beat.title || '';
    if (sub) sub.textContent = 'سفارش → برگه تحویل → محل → نمونه → آزمون → پذیرش';
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
