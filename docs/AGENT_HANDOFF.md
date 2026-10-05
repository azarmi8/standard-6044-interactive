# AGENT HANDOFF — Standard 6044 Interactive

## Read first

1. `docs/MASTER_ROADMAP.md`
2. `books/6044-1397/BOOK.md`
3. `books/6044-1397/COVERAGE.md`
4. `books/6044-1397/chapters.md`

## Owner

**Mohammadreza Azarmi**

Repository: `azarmi8/standard-6044-interactive`

## Mission

Create a professional, Persian RTL, interactive learning experience for Iranian National Standard 6044:1397.

This is an independent project. Papermorph is a methodology reference, not a runtime dependency.

## Non-negotiable content rule

The 6044:1397 source is authoritative.

Do NOT guess:
- clause numbers
- numeric limits
- acceptance criteria
- table values
- definitions
- exceptions
- sampling frequencies
- test requirements

If the source cannot be read or verified:
**STOP → locate/re-read the source → compare credible copies if necessary → mark uncertainty.**

Web research may corroborate or help locate source material, but must not silently replace the standard.

## Non-negotiable engineering rule

The product should feel like a professional engineering training system, not a PDF viewer.

Use animation when it improves comprehension:
- process animation
- focus/highlight
- step-by-step procedure
- equipment movement
- data/state transitions
- simulation
- scenario decision

Avoid animation that is only decorative.

## External project research

When a difficult capability is needed, inspect mature GitHub projects first.

Look for proven patterns in:
- SVG/GSAP timelines
- Three.js/WebGL
- page-turn/book interfaces
- educational simulations
- accessibility
- responsive interaction
- testing

Reuse ideas and patterns responsibly; do not blindly copy code or create unnecessary dependencies.

## Current content map

Units 1–15 = official chapters.

Units 16–23:
- 16: Appendix A
- 17: Appendix B
- 18: Appendix C
- 19: Appendix D
- 20: Appendix E
- 21: Appendix F
- 22: Appendix G
- 23: Appendix H

All 23 units currently have interactive HTML entry points.

## Current deepened chapters

Interactive beat work has been applied to:
- ch04
- ch06
- ch07
- ch09
- ch10
- ch11
- ch12
- ch13
- ch14
- ch15

## Immediate next work

### Priority 1 — Source verification
Review chapters 1–15 and appendices A–H against the actual source. Replace any unsupported/over-simplified claim.

### Priority 2 — Shared engine
Extract repeated chapter behavior into reusable:
- scene model
- beat/timeline controller
- progress/navigation
- quiz component
- narration controller

Do not break existing chapters while refactoring.

### Priority 3 — High-value simulations
Build real educational simulations beginning with:
1. sampling
2. fresh concrete testing
3. delivery/temperature
4. specimen preparation
5. strength/conformity decisions

### Priority 4 — Assessment
Add reusable quiz/scenario infrastructure.

### Priority 5 — QA
Run full static build/link/browser smoke checks.

## Git discipline

- Work from current `main`.
- Inspect status before editing.
- Keep commits focused.
- Do not overwrite another Agent's work.
- Do not commit the private PDF/source extraction.
- Update this handoff when architecture or milestone status materially changes.

## Delivery language

Persian UI first.
English technical identifiers are acceptable where useful.

## Attribution

Created by **Mohammadreza Azarmi**.


## Source verification gate

Read docs/SOURCE_VERIFICATION.md before content work. The PDF 6044-1397.pdf in the owner's Library is authoritative. If OCR is ambiguous, inspect the page image. Never infer numbers, tables, limits, exceptions or clause wording.

## Product quality gate

Read docs/PRODUCT_SPEC.md before shared UX/animation/simulation work. Prefer reusable engine components and real educational interactions over duplicated static pages.

## Current truth

All 23 units have HTML entry points, but they are not source-final. The next content milestone is clause-level source verification followed by replacement of unsupported summaries. Do not describe the current book as fully verified until that audit is complete.
