# Chapter UI / Engine Audit — 6044:1397

Date: 2026-10-05
Branch: phase5/narration-foundation

## Result

The 22 learning-unit HTML pages were checked against the shared book-engine contract.

### Engine-ready / already using shared engine

- ch01
- ch02
- ch07
- ch08
- ch10
- ch11
- ch17

### Partial / simulation without shared book engine

- ch12 — simulation script present, shared engine absent
- ch15 — simulation script present, shared engine absent

### Legacy / scaffold pages without shared engine

- ch03
- ch04
- ch05
- ch06
- ch09
- ch13
- ch14
- ch16
- ch18
- ch19
- ch20
- ch21
- ch22

## Important interpretation

This is a structural audit only. It does **not** mean the legacy pages have incorrect source content.

The source-grounded Markdown coverage for units 1–22 remains the content authority. The HTML layer is being treated as a presentation/interaction layer.

## Next controlled work

1. Do not rewrite verified source content.
2. Bring legacy pages onto the shared visual/navigation shell in small batches.
3. Add the shared engine only where the page has a real beat/playback model.
4. Keep simulations separate from the core book engine contract.
5. Add narration only after pronunciation/text QA is approved.
6. Do not introduce new v1.0 scope merely to make every chapter visually identical.

## Priority

P0 shell/navigation:
ch03, ch04, ch05, ch06, ch09, ch12, ch13, ch14, ch15, ch16, ch18, ch19, ch20, ch21, ch22.

P1 full beat/animation conversion:
based on learning value, not page count.

This audit is a structural baseline for Phase 9/10 and is not a release approval.
