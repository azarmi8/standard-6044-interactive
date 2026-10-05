window.BOOK_CONFIG = {
  interval: 5000,
  beats: [
    { title: 'دو روش سفارش', body: 'سفارش می‌تواند بر مبنای مشخصات عملکردی بتن یا بر مبنای مشخصات ترکیب یا طرح اختلاط انجام شود. روش انتخاب‌شده باید در سفارش و قرارداد روشن باشد.' },
    { title: 'مشخصات عملکردی', body: 'حسب مورد، اطلاعاتی مانند اندازه اسمی بزرگ‌ترین سنگدانه، روانی یا کارایی، هوای بتن، رده مقاومت، شرایط محیطی، نوع سیمان، حداقل سیمان، مواد مکمل، نسبت آب مؤثر به مواد سیمانی و روش انتقال باید مشخص شوند.' },
    { title: 'رده مقاومت', body: 'فصل رده‌های مقاومت C و LC را برای بتن معمولی و سبک مطرح می‌کند. رده انتخابی باید در ارتباط با مشخصات فنی پروژه و سفارش دیده شود.' },
    { title: 'اطلاعات ترکیب', body: 'در سفارش مبتنی بر ترکیب، مشخصات اجزای طرح و الزامات مربوط باید صریح باشند تا تولیدکننده بداند چه چیزی باید ساخته و کنترل شود.' },
    { title: 'تحویل و انتقال', body: 'اطلاعات محل تحویل، روش انتقال و سایر اطلاعات لازم برای اجرای سفارش بخشی از زنجیره سفارش است؛ ابهام در این قسمت می‌تواند ردیابی QC را دشوار کند.' },
    { title: 'ردیابی', body: 'طرح اختلاط، مشخصات مواد، نتایج آزمون‌ها و اطلاعات سفارش باید به شکلی نگهداری شوند که ارتباط سفارش ← تولید ← محموله ← آزمون قابل بازسازی باشد.' }
  ],
  quiz: {
    correct: 'درست — سفارش باید به اطلاعاتی تبدیل شود که تولید و کنترل آن ممکن و قابل ردیابی باشد.',
    incorrect: 'کافی نیست — ابهام در سفارش مستقیماً روی تولید و کنترل اثر می‌گذارد.'
  },
  onRender(index, beat) {
    const q = document.getElementById('q');
    const sub = document.getElementById('sub');
    const cards = document.getElementById('cards');
    if (q) q.textContent = beat.title || '';
    if (sub) sub.textContent = 'سفارش ← تولید ← تحویل ← آزمون';
    if (!cards) return;
    cards.innerHTML = window.BOOK_CONFIG.beats.map((item, k) => {
      const active = k === index;
      return '<g class="scene-object" data-beat="' + (k + 1) + '" aria-hidden="' + (active ? 'false' : 'true') + '" style="opacity:' + (active ? '1' : '.38') + ';transform:scale(' + (active ? '1.02' : '1') + ')">' +
        '<rect x="' + (140 + k * 230) + '" y="220" width="200" height="275" rx="22" fill="' + (active ? '#173c2a' : '#dce9df') + '"/>' +
        '<text x="' + (240 + k * 230) + '" y="285" font-size="19" font-weight="700" text-anchor="middle" fill="' + (active ? '#fff' : '#173c2a') + '">' + (k + 1) + '</text>' +
        '<text x="' + (240 + k * 230) + '" y="345" font-size="18" text-anchor="middle" fill="' + (active ? '#fff' : '#173c2a') + '">' + item.title.slice(0, 13) + '</text>' +
      '</g>';
    }).join('');
  }
};
