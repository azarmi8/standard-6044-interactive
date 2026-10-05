# Visual & Engine Audit — 6044 Interactive

## Audit scope
Branch: `phase5/narration-foundation`  
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
| 04 | ✅ | ✅ | ✅ | ❌ | ⚠️ legacy inline |
| 05 | ✅ | ✅ | ✅ | ❌ | ⚠️ legacy inline |
| 06 | ✅ | ✅ | ✅ | ❌ | ⚠️ legacy inline |
| 07 | ✅ | ✅ | ✅ | ❌ | ✅ |
| 08 | ✅ | ✅ | ✅ | ❌ | ✅ |
| 09 | ✅ | ✅ | ✅ | ❌ | ⚠️ legacy inline |
| 10 | ✅ | ✅ | ✅ | ❌ | ✅ |
| 11 | ✅ | ✅ | ✅ | ❌ | ✅ |
| 12 | ✅ | ✅ | ✅ | ❌ | ⚠️ legacy inline |
| 13 | ✅ | ✅ | ✅ | ❌ | ⚠️ legacy inline |
| 14 | ✅ | ✅ | ✅ | ❌ | ⚠️ legacy inline |
| 15 | ✅ | ✅ | ✅ | ❌ | ⚠️ legacy inline |

## Interpretation

The visual contract is already consistent across all 15 chapters. The remaining architecture inconsistency is that eight chapters still use self-contained inline beat/playback logic rather than the shared book engine.

This is a **Phase 9/10 cleanup item**, not a reason to add a new feature family.

### Migration rule
When those eight chapters are migrated:
1. Preserve their current source-grounded content and quiz behavior.
2. Move playback/navigation state into `lib/engine.js`.
3. Do not duplicate engine behavior in chapter-local scripts.
4. Preserve the 1600×900 scene contract.
5. Preserve reduced-motion and accessibility behavior.
6. Run static QA before considering each migration complete.

No source requirement is changed by this audit.
