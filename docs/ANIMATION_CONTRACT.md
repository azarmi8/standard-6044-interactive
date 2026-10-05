# ANIMATION CONTRACT — Standard 6044 Interactive

## هدف
یک زبان حرکتی مشترک برای کتاب: هر حرکت باید یک مفهوم مهندسی را توضیح دهد، نه صرفاً تزئین.

## Primitiveهای v1
- **Reveal:** ورود مرحله‌ای عنصر مرتبط با beat.
- **Focus:** تمرکز روی ناحیه/عنصر مهم با مختصات درصدی.
- **State transition:** تغییر وضعیت صحنه با `scene.steps[].className`.
- **Process movement:** جابه‌جایی کنترل‌شده عناصر با CSS بر اساس state.
- **Data reveal:** نمایش مقدار/نتیجه همزمان با beat.
- **Sequence:** یک beat = یک گام قابل تکرار در فرآیند.
- **Step mode:** اجرای دستی گام‌به‌گام برای آموزش و تحلیل.
- **Reduced motion:** همان ترتیب و اطلاعات، بدون حرکت اجباری.
- **One-shot choreography:** حرکت فرآیندی فقط هنگام ورود به state اجرا می‌شود و loop تزئینی ندارد.

## قرارداد فصل
فصل فقط محتوای منبع، markup صحنه و داده‌های beat/scene را تعریف می‌کند. رفتار مشترک در engine می‌ماند.

نمونه:
```js
scene: {
  root: '.stage',
  steps: [
    { className: 'arrival', focus: {x: 55, y: 50}, show: ['truck','ticket'] },
    { className: 'sampling', focus: {x: 42, y: 58}, show: ['truck','sample'] }
  ]
}
```

## قواعد کیفیت
1. حرکت بدون توضیح آموزشی حذف می‌شود.
2. عدد/حد/فرمول فقط از source ledger می‌آید.
3. هر scene باید با pause/next/previous قابل فهم باشد.
4. step mode باید همان اطلاعات playback را بدون وابستگی به زمان ارائه کند.
5. reduced-motion نباید اطلاعات یا ترتیب را حذف کند.
6. CSS animation باید سبک باشد؛ WebGL فقط وقتی ارزش آموزشی آن ثابت شود.
7. animationهای فرآیندی نباید infinite باشند مگر اینکه خود مفهوم مهندسی ذاتاً چرخه‌ای باشد و در آن صورت نیز باید کنترل توقف/دسترسی داشته باشند.

## Performance budget
- ترجیح SVG/CSS و DOM کم‌حجم.
- بدون کتابخانه animation اجباری در v1.
- بدون loopهای تزئینی برای عناصر آموزشی.
- هدف: کنترل‌های اصلی و scene اولیه بدون long task محسوس روی desktop معمولی و موبایل میان‌رده.

## وضعیت
Phase 4 در حال تکمیل است. Engine v0.4 دارای step playback، focus state و process choreography یک‌باره است.
