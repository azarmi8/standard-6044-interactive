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
Static QA is wired on both `main` and feature PRs. The latest main run is currently queued because GitHub Actions is experiencing runner-assignment delays; once runners recover, review the real result before calling QA green. Then perform browser/mobile/fullscreen/reduced-motion smoke checks.

### Priority 2 — Visual consistency
Finish the cross-chapter visual audit and cover/contents treatment without introducing a new framework or dependency.

### Priority 3 — Narration quality
Complete the Persian voice benchmark, select a voice only after human listening, then generate/review release narration. Do not bulk-generate before pronunciation approval.

### Priority 4 — Source/content finalization
Resolve remaining clause-level source-audit items and ensure every released source-derived claim has a traceable source reference.

### Priority 5 — Release
Complete documentation/handoff, verify GitHub Pages, freeze scope, obtain owner acceptance, and tag v1.0.0.

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

`main` baseline: `0719ea98467ce555c6709c23e16aede539a5a7f2`. All 23 navigation surfaces have HTML entry points; Units 1–22 are the source learning units and Unit 23 is bibliography/reference. All 22 learning units now use the shared book engine and shared control/navigation contract. The repository contains pilot simulations, assessment/search/navigation persistence, Persian narration foundation, and visual QA contracts. GitHub Pages is still disabled at repository level, so deployment cannot complete until Pages is enabled/configured. The book is still a release candidate in progress: do not describe it as fully source-final or release-ready until Phase 10 QA and the remaining source/narration/browser gates pass.


## Finite delivery rule

`docs/MASTER_ROADMAP.md` is the completion contract. v1.0 has a fixed Definition of Done and a scope-freeze rule. New ideas after scope freeze belong in `POST_RELEASE_IDEAS.md` and must not block v1.0.
