window.BOOK_CONFIG = {
  interval: 4500,
  beats: [
  {
    "title": "شرایط رویارویی",
    "body": "این موضوع باید با بندهای مرتبط، مشخصات پروژه، آزمون و سوابق قابل ردیابی دیده شود."
  },
  {
    "title": "9.5 mm → 4.5% متوسط / 5.5% شدید",
    "body": "این موضوع باید با بندهای مرتبط، مشخصات پروژه، آزمون و سوابق قابل ردیابی دیده شود."
  },
  {
    "title": "19.0 mm → 5.0% متوسط / 6.0% شدید",
    "body": "این موضوع باید با بندهای مرتبط، مشخصات پروژه، آزمون و سوابق قابل ردیابی دیده شود."
  },
  {
    "title": "37.5 mm → 6.0% متوسط / 7.5% شدید",
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
