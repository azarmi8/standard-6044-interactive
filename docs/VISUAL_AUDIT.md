# Visual & Engine Audit — 6044 Interactive

## Audit scope
Branch: `phase9/legacy-engine-migration`  
Audit date: 2026-10-05

Checked Chapters 1–15 for:
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

## Interpretation

The visual contract is consistent across all 15 chapters, and Chapters 1–15 now use the shared book engine for playback/navigation. Appendices (Units 16–22) are a separate migration surface; Unit 17 already uses the engine, while Units 16 and 18–22 remain non-engine.

This is a **Phase 9/10 cleanup item**, not a reason to add a new feature family.

### Migration rule
For any remaining non-engine appendix migration:
1. Preserve their current source-grounded content and quiz behavior.
2. Move playback/navigation state into `lib/engine.js`.
3. Do not duplicate engine behavior in chapter-local scripts.
4. Preserve the 1600×900 scene contract.
5. Preserve reduced-motion and accessibility behavior.
6. Run static QA before considering each migration complete.

No source requirement is changed by this audit.
