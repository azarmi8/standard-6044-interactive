# معماری CRETIQ 6044

## اصل معماری

CRETIQ 6044 یک وب‌اپلیکیشن استاتیک و مستقل با لایه‌های محتوا، موتور مطالعه، صحنه‌های تعاملی، شبیه‌ساز، ارزیابی و کنترل کیفیت است.

جریان اصلی:

**Source Standard → Verified Content → Learning Map → Reader Engine → Visual/Simulation → Assessment → QA → Release**

## ساختار اصلی

```text
site/6044-1397/
├── index.html                 # جلد و فهرست
├── assessment.html            # ارزیابی نهایی
├── search.html                # جست‌وجوی محلی
├── style.css                  # پوسته بصری مشترک
├── lib/
│   ├── engine.js              # پخش، ناوبری، Beat، narration
│   ├── engine.css             # کنترل‌ها و رفتار مشترک
│   ├── simulations.js         # primitiveهای شبیه‌سازی
│   ├── assessment.js          # بانک سؤال و grading
│   └── search.js              # ایندکس جست‌وجو
└── chNN/
    ├── index.html             # surface آموزشی واحد
    └── app.js                 # فقط منطق اختصاصی لازم
```

## قرارداد واحد آموزشی

هر یک از ۲۲ واحد یادگیری منبع‌محور یک صحنه SVG با viewBox 1600×900، زبان فارسی RTL و engine مشترک دارد. Unit 23 فقط سطح کتاب‌نامه/مرجع است و جزو واحدهای یادگیری استاندارد محسوب نمی‌شود.

## Engine

`lib/engine.js` مسئول state و playback است:
- index/total و Progress
- Play/Pause/Next/Previous
- Step mode
- Fullscreen
- keyboard
- reduced-motion
- visibility pause
- narration synchronization
- lifecycle callbacks
- sceneTargets/applyScene

منطق فصل نباید این مسئولیت‌ها را دوباره پیاده‌سازی کند.

## Simulation

`lib/simulations.js` APIهای deterministic را برای سناریوهای مهندسی ارائه می‌کند. هر شبیه‌سازی باید منبع، ورودی، خروجی، فرضیات و test caseهای روشن داشته باشد.

## Assessment

`lib/assessment.js` بانک سؤال و grading را مستقل از UI نگه می‌دارد و انواع MCQ، درست/غلط، ترتیب، numeric و scenario را پشتیبانی می‌کند.

## Source governance

- PDF مرجع اصلی است.
- عدد، حد، جدول، فرمول، استثنا و cross-reference بدون منبع وارد نمی‌شود.
- در ابهام OCR باید صفحه منبع بازبینی تصویری شود.
- توضیح آموزشی از متن منبع تفکیک می‌شود.
- داده فرضی تمرین باید صریحاً educational scenario باشد.

## QA

دو لایه CI برای محصول اصلی وجود دارد:

**Static QA** — قرارداد فایل‌ها، ساختار، داده‌ها، شبیه‌سازها و guardهای محتوایی.

**Browser Smoke** — اجرای واقعی routeهای نماینده با Playwright، شامل RTL، SVG، engine، تعامل‌های شبیه‌سازی، موبایل و reduced-motion.

GitHub Pages مسیر انتشار استاتیک را می‌سازد، اما فعال‌سازی Pages در سطح مخزن یک تنظیم مالکیتی است.

## اصل سادگی و پایداری

نسخه پایه بدون API پولی یا سرویس اجباری بیرونی اجرا می‌شود. قابلیت‌های توسعه‌ای باید بدون لطمه به هسته آموزشی و دقت منبع افزوده شوند.
