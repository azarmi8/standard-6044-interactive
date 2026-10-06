---
name: playwright-visual-regression
description: Lightweight visual-regression and rendered-UI verification baseline for Playwright.
---

# Playwright Visual Regression — Project Adapter

Source inspiration: RoninForge/roninforge-playwright — playwright-visual-regression.

Use when a UI change can regress layout, imagery, typography, spacing, or responsive presentation.

## Rules
- Functional smoke and visual verification are complementary.
- Prefer stable, deterministic regions and mask only genuinely volatile content.
- Pin viewport/browser/OS assumptions before trusting a screenshot baseline.
- Disable animations or use reduced motion for screenshot comparison.
- Keep screenshot checks focused on representative surfaces instead of snapshotting every pixel of the product.
- Treat failed visual diffs as review items, not flakes to silence.
- Never claim a visual match without inspecting the rendered artifact.
