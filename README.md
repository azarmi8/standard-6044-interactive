# استاندارد ملی ایران ۶۰۴۴:۱۳۹۷ — کتاب وب تعاملی

یک **کتاب آموزشی تعاملی حرفه‌ای** برای یادگیری و کاربرد استاندارد ملی ایران ۶۰۴۴:۱۳۹۷ — «بتن آماده، ویژگی‌ها».

> **Created by Mohammadreza Azarmi**

## 🎯 هدف محصول

این پروژه قرار نیست صرفاً PDF را به HTML تبدیل کند. هدف، ساخت یک **Professional Interactive Engineering Book / Training Simulator** است که متن و ساختار استاندارد را به تجربه‌ای قابل مطالعه، مشاهده، تمرین و ارزیابی تبدیل می‌کند.

### تجربه هدف

**استاندارد → آموزش → Animation → Simulation → Practice → Scenario → Assessment**

## ✨ قابلیت‌های محصول

- کتاب وب فارسی RTL و Responsive
- فصل‌بندی کامل استاندارد و پیوست‌ها
- Sceneهای تعاملی 1600×900
- Animationهای مرحله‌ای و Timeline-based
- Play / Pause / Previous / Next / Replay
- Narration فارسی همگام با Scene
- Highlight بند، عدد، جدول و نکته در زمان آموزش
- دیاگرام‌های مهندسی و SVG تعاملی
- شبیه‌سازی فرآیندهای بتن و کنترل کیفیت در جاهایی که ارزش آموزشی دارند
- Quizهای چندنوعی و سناریومحور
- تمرین‌های «قبول / رد / بررسی بیشتر»
- حالت Quick Learn / Full Study / Practice / Exam / QC Mode
- جست‌وجوی مفهومی و Cross-reference بین فصل‌ها
- Progress و یادگیری مرحله‌ای
- طراحی حرفه‌ای مهندسی؛ نه داشبورد خشک و نه ظاهر کودکانه
- Mobile / Desktop / Fullscreen
- معماری مستقل از Papermorph و قابل توسعه توسط Agentهای مختلف

## 🧱 اصول محتوایی

1. **استاندارد منبع اصلی است.**
2. متن، شماره بند، جدول، محدوده، استثنا و اصطلاحات بدون پشتوانه حدس زده نمی‌شوند.
3. توضیح آموزشی از محتوای منبع با برچسب/ساختار مناسب جدا می‌شود.
4. تمرین و Simulation نباید نتیجه استاندارد را تحریف کنند.
5. اگر بخشی از منبع قابل خواندن یا تأیید نباشد، Agent باید توقف کند، منبع را دوباره بررسی کند یا گزارش «نیازمند تأیید» بدهد؛ حق ساختن مقدار یا بند جعلی ندارد.
6. منابع وب و پروژه‌های GitHub فقط برای **روش، UX، معماری و ایده‌های فنی** هستند؛ جایگزین متن استاندارد نیستند.

## 🎨 الهام فنی

روش workflow از پروژه‌هایی مانند **Papermorph** الهام گرفته شده است:

PDF → Book Map → Storyboard → Narration → Animation → Quiz → Web Book

همچنین برای قابلیت‌های سخت‌تر، Agentها می‌توانند پروژه‌های حرفه‌ای GitHub را بررسی کنند و از الگوهای mature در SVG/GSAP/WebGL/Three.js/page-turn/accessibility/testing الهام بگیرند.

**هیچ پروژه خارجی dependency اجباری معماری نیست.**

## 📚 پوشش

۱۵ فصل رسمی + پیوست‌های الف تا ز + کتاب‌نامه در نقشه پروژه ثبت شده‌اند.

جزئیات پوشش و قرارداد توسعه در:

- `books/6044-1397/chapters.md`
- `books/6044-1397/COVERAGE.md`
- `docs/MASTER_ROADMAP.md`
- `docs/AGENT_HANDOFF.md`
- `docs/SOURCE_VERIFICATION.md`
- `docs/PRODUCT_SPEC.md`
- `docs/USER_GUIDE.md`
- `docs/ARCHITECTURE.md`
- `docs/RELEASE_CHECKLIST.md`
- `CHANGELOG.md`

> وضعیت فعلی: ۲۲ واحد یادگیری با engine مشترک، شبیه‌سازی‌ها، assessment/search/navigation، Device Narration fallback و Reader HUD پیاده‌سازی شده‌اند. PR #16 همچنین صفحه ورود کتاب و دو Scene آموزشی کلیدی را تقویت کرده است. Static QA و Browser Smoke سبز هستند و GitHub Pages فعال است؛ نسخه 1.0 هنوز به‌دلیل ممیزی نهایی منبع، بازبینی انسانی صدا و چند گیت نهایی انتشار آماده نیست.

## 🤖 قرارداد کار Agentها

هر Agent قبل از تغییر:

1. `docs/AGENT_HANDOFF.md` را بخواند.
2. `docs/MASTER_ROADMAP.md` را بخواند.
3. `books/6044-1397/BOOK.md` و `COVERAGE.md` را بررسی کند.
4. وضعیت واقعی `main` و Git را بررسی کند.
5. از تغییرات موازی و بازنویسی کور جلوگیری کند.
6. محتوای استاندارد را حدس نزند.
7. پس از کار، handoff و roadmap را به‌روز کند.

## 🔒 منبع خصوصی

PDF اصلی و extractionهای خصوصی عمداً در خروجی GitHub منتشر نمی‌شوند. فایل‌های حساس/منبع باید خارج از static site نگهداری شوند.

## ▶️ اجرای محلی

از ریشه پروژه:

```bash
python3 -m http.server 8765 -d site
```

سپس:

```
http://localhost:8765/6044-1397/
```

## 👤 Attribution

**Created by Mohammadreza Azarmi**

Reference methodology: [DozenTwelve/Papermorph](https://github.com/DozenTwelve/Papermorph)

این مخزن یک پروژه مستقل است.
