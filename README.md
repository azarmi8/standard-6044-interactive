# استاندارد ملی ایران ۶۰۴۴:۱۳۹۷ — کتاب وب تعاملی

یک کتاب وب تعاملی و آموزشی فارسی درباره **استاندارد ملی ایران ۶۰۴۴:۱۳۹۷ — بتن آماده، ویژگی‌ها**.

## درباره پروژه

این پروژه توسط **Mohammadreza Azarmi** ساخته می‌شود و هدف آن تبدیل محتوای استاندارد ۶۰۴۴ به یک تجربه آموزشی تعاملی، تصویری و قابل مرور در وب است.

روش طراحی پروژه از ایده‌ها و ساختار پروژه [Papermorph](https://github.com/DozenTwelve/Papermorph) الهام گرفته است: PDF → نقشه کتاب → storyboard → narration → animation & quizzes → web book.

> Papermorph یک مرجع معماری/روش کار است؛ این مخزن یک پروژه مستقل با محتوای مستقل و متعلق به پروژه کتاب تعاملی ۶۰۴۴ است.

## وضعیت

- Pilot فصل ۱: آماده
- فصل‌های ۲ تا ۱۵: در دست ساخت
- زبان: فارسی RTL
- سبک: مهندسی، حرفه‌ای، تعاملی، بدون ظاهر کودکانه
- خروجی فعلی: Static Web Book
- منبع محتوای استاندارد: استاندارد ملی ایران ۶۰۴۴:۱۳۹۷

## ساختار

```
books/6044-1397/
  BOOK.md
  chapters.md
  chapters/ch01.md

content/6044-1397/ch01/
  narration.fa.json

site/6044-1397/
  index.html
  style.css
  ch01/
    index.html
    app.js
```

منابع خصوصی مانند PDF اصلی و متن استخراج‌شده عمداً در Git منتشر نمی‌شوند.

## اجرای محلی

از ریشه پروژه:

```bash
python3 -m http.server 8765 -d site
```

سپس:

```
http://localhost:8765/6044-1397/
```

## Attribution

Created by **Mohammadreza Azarmi**.

Interactive educational web book based on Iranian National Standard 6044:1397.

Reference methodology: [DozenTwelve/Papermorph](https://github.com/DozenTwelve/Papermorph).
