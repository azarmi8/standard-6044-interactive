# Visual & Engine Audit — 6044 Interactive

## Audit scope
Branch: `phase9/legacy-engine-migration`  
Audit date: 2026-10-06

Checked Chapters 1–15 and Appendices A–G (Units 16–22) for:
- document title
- Persian RTL contract (`lang="fa"`, `dir="rtl"`)
- 1600×900 SVG stage
- forbidden infinite animation
- shared engine reference

## Result

| Chapter | Title | RTL | 1600×900 | Infinite loop | Shared engine |
|---|---:|---:|---:|---:|---:|
| 01 | ✅ | ✅ | ✅ | ❌ | ✅ |
| 02 | ✅ | ✅ | ✅ | ❌ | ✅ |
| 03 | ✅ | ✅ | ✅ | ❌ | ✅ |
| 04 | ✅ | ✅ | ✅ | ❌ | ✅ |
| 05 | ✅ | ✅ | ✅ | ❌ | ✅ |
| 06 | ✅ | ✅ | ✅ | ❌ | ✅ |
| 07 | ✅ | ✅ | ✅ | ❌ | ✅ |
| 08 | ✅ | ✅ | ✅ | ❌ | ✅ |
| 09 | ✅ | ✅ | ✅ | ❌ | ✅ |
| 10 | ✅ | ✅ | ✅ | ❌ | ✅ |
| 11 | ✅ | ✅ | ✅ | ❌ | ✅ |
| 12 | ✅ | ✅ | ✅ | ❌ | ✅ |
| 13 | ✅ | ✅ | ✅ | ❌ | ✅ |
| 14 | ✅ | ✅ | ✅ | ❌ | ✅ |
| 15 | ✅ | ✅ | ✅ | ❌ | ✅ |

### Appendices A–G

| Unit | Appendix | Title/Surface | RTL | 1600×900 | Shared engine |
|---|---|---|---:|---:|---:|
| 16 | A | الزامات یکنواختی بتن | ✅ | ✅ | ✅ |
| 17 | B | مقاومت فشاری هدف | ✅ | ✅ | ✅ |
| 18 | C | هوای بتن و شرایط رویارویی | ✅ | ✅ | ✅ |
| 19 | D | سامانه کنترل تولید | ✅ | ✅ | ✅ |
| 20 | E | بتن پرمقاومت | ✅ | ✅ | ✅ |
| 21 | F | ارزیابی، نظارت و گواهی کنترل تولید | ✅ | ✅ | ✅ |
| 22 | G | تغییرات اعمال‌شده نسبت به مرجع | ✅ | ✅ | ✅ |

## Interpretation

The visual and engine contract is now consistent across all 22 learning units: Chapters 1–15 and Appendices A–G use the shared book engine for playback/navigation. Unit 23 is bibliography/reference surface and remains outside the learning-unit engine contract.

This closes the legacy-engine migration cleanup for the 22 learning units. Remaining Phase 9/10 work is browser/mobile validation, visual polish, narration review, and release QA.

### Migration rule
For future changes:
1. Preserve their current source-grounded content and quiz behavior.
2. Move playback/navigation state into `lib/engine.js`.
3. Do not duplicate engine behavior in chapter-local scripts.
4. Preserve the 1600×900 scene contract.
5. Preserve reduced-motion and accessibility behavior.
6. Run static QA before considering each migration complete.

No source requirement is changed by this audit.
