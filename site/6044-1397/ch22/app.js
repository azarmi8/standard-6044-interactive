window.BOOK_CONFIG = {
  interval: 4500,
  beats: [
  {
    "title": "نسخه‌شناسی استاندارد",
    "body": "این موضوع باید با بندهای مرتبط، مشخصات پروژه، آزمون و سوابق قابل ردیابی دیده شود."
  },
  {
    "title": "تغییرات ویرایش دوم",
    "body": "این موضوع باید با بندهای مرتبط، مشخصات پروژه، آزمون و سوابق قابل ردیابی دیده شود."
  },
  {
    "title": "اثر تغییر بر آزمون و کنترل",
    "body": "این موضوع باید با بندهای مرتبط، مشخصات پروژه، آزمون و سوابق قابل ردیابی دیده شود."
  },
  {
    "title": "ثبت شماره و سال نسخه",
    "body": "این موضوع باید با بندهای مرتبط، مشخصات پروژه، آزمون و سوابق قابل ردیابی دیده شود."
  }
],
  quiz: {
    correct: 'درست — رویکرد استاندارد، زنجیره‌ای و قابل ردیابی است.',
    incorrect: 'کافی نیست — باید شواهد و سوابق مرتبط هم بررسی شوند.'
  },
  onRender(index, beat) {
    const a = document.getElementById('a');
    const c = document.getElementById('c');
    const q = document.getElementById('q');
    if (a) a.textContent = beat.title || '';
    if (c) c.textContent = 'استاندارد ۶۰۴۴:۱۳۹۷ / مرحله ' + (index + 1) + ' از ' + window.BOOK_CONFIG.beats.length;
    if (q) q.textContent = 'این نکته را به فرآیند واقعی QC متصل کن.';
  }
};
