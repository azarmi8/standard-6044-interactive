# AGENT HANDOFF — CRETIQ 6044

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

Source structure: 15 official chapters + 7 appendices (A–G) + bibliography.
- Units 1–15 = official chapters.
- Units 16–22 = appendices A–G.
- Unit 23 = bibliography/reference surface.

There is no Appendix H in the source. All 23 project entry points may remain as navigation surfaces, but only 22 are source sections.

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

### Priority 1 — Release QA
The runtime/visual pass is now merged on main. Static QA and Browser Smoke passed on PR #16, including Chapter 3/8/10/17 plus mobile/reduced-motion and the new Reader HUD. Remaining release QA is fullscreen visual QA plus final source/publication audit.

### Priority 2 — Visual consistency
PR #16 strengthened the shared Reader HUD and upgraded the Chapter 10 measurement scene and Appendix B calculation scene. The remaining task is final fullscreen visual review and extending the pilot visual language where needed.

### Priority 3 — Narration quality
The shared engine now provides device-based Persian narration fallback plus play/pause/replay/rate controls. Complete the Persian voice benchmark, select a voice only after human listening, then generate/review release narration. Do not bulk-generate before pronunciation approval.

### Priority 4 — Source/content finalization
Resolve remaining clause-level source-audit items and ensure every released source-derived claim has a traceable source reference.

### Priority 5 — Release
Documentation package is complete. GitHub Pages enablement is resolved. Remaining release blockers are human narration approval, final clause-level source audit, fullscreen review, owner acceptance, then v1.0.0.

Do not start new feature families unless they are required to close a v1.0 blocker.

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

**Active release branch:** redesign/cretiq-rendered-visuals-v3  
**PR:** #34  
**Current head:** 6781ba7826127abdffaed597a5920269ffced378

The current branch contains the CRETIQ 6044 rendered-visual V3.1 upgrade. Homepage uses repository-owned engineering renders rather than the previous decorative Canvas/particle homepage choreography. Representative engineering chapters now follow the same authored-render rule:
- Chapter 4: factory/material evidence render
- Chapter 10: fresh-concrete/slump render
- Chapter 11: strength/conformity render

The representative chapter migration removes the legacy particle/lab Canvas runtimes from those surfaces. Visuals are paired with evidence-led text rails instead of fake telemetry or decorative animation.

Latest CI at this checkpoint:
- Static QA: PASS
- Browser Smoke: PASS
- PR mergeable: yes
- PR merged: no

The branch remains ahead of main with no behind drift at this checkpoint.

The three project design skills are now part of the repository baseline:
- .agents/skills/ui-ux-pro-max/SKILL.md
- .agents/skills/emil-design-eng/SKILL.md
- .agents/skills/design-taste-frontend/SKILL.md

Release gates still open: human visual acceptance, final source/publication audit, human narration listening approval, fullscreen/performance/accessibility sweep, owner acceptance, merge and Pages verification.

main remains untouched by PR #34.

CRETIQ 6044 is the product brand. Repository continuity remains standard-6044-interactive.

## Finite delivery rule

`docs/MASTER_ROADMAP.md` is the completion contract. v1.0 has a fixed Definition of Done and a scope-freeze rule. New ideas after scope freeze belong in `POST_RELEASE_IDEAS.md` and must not block v1.0.
