window.BOOK_CONFIG = {
  interval: 4500,
  beats: [
  {
    "title": "بررسی بتن پس از مسئله مقاومت/پذیرش",
    "body": "این موضوع باید با بندهای مرتبط، مشخصات پروژه، آزمون و سوابق قابل ردیابی دیده شود."
  },
  {
    "title": "ترکیب شواهد آزمون و سوابق",
    "body": "این موضوع باید با بندهای مرتبط، مشخصات پروژه، آزمون و سوابق قابل ردیابی دیده شود."
  },
  {
    "title": "تصمیم فنی مستند",
    "body": "این موضوع باید با بندهای مرتبط، مشخصات پروژه، آزمون و سوابق قابل ردیابی دیده شود."
  },
  {
    "title": "قابلیت ردیابی",
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
