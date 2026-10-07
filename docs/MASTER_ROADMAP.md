# MASTER ROADMAP — Standard 6044 Interactive

## North Star
Deliver a finished, independently usable Persian RTL interactive engineering product — CRETIQ 6044 — for Iranian National Standard 6044:1397.

**Owner:** Mohammadreza Azarmi  
**Repository:** azarmi8/standard-6044-interactive

## 0. Completion contract
### In scope for v1.0
- Complete source-grounded coverage of all 15 chapters and appendices A–G.
- Source verification ledger for every source-derived claim, number, table, formula, exception and cross-reference.
- Professional interactive book engine, animation/beat engine and Persian narration/transcript.
- Engineering simulations where faithfully representable.
- Practice/assessment, QC scenarios, search/navigation, bookmarks/progress.
- Responsive desktop/mobile/fullscreen, accessibility/reduced-motion, static/offline-capable delivery.
- Automated QA, final documentation, release tag/changelog.

### Explicitly out of v1.0
- Required AI chatbot.
- Live IoT/device integrations.
- Paid API dependency.
- Full 3D recreation of every process.
- User accounts/cloud sync unless required by an already-completed core feature.

# Phase 1 — Source Lock & Audit
**Status: COMPLETE — 22/22 learning units verified + current HTML numeric reconciliation.**

- [x] Audit PDF identity, revision, structure and pages.
- [x] Audit Chapters 1–15.
- [x] Audit Appendices A–G.
- [x] Establish OCR ambiguity rule.
- [x] Reconcile source-derived numeric/table/formula values currently embedded in instructional HTML against the verified source ledger.

**Exit gate:** content claims in Units 1–22 have verified source locations.  
**Phase 1 exit gate: PASSED.**

# Phase 2 — Content Architecture
**Status: COMPLETE — learning map + practice map + priority metadata established.**

- [x] Learning objectives for every unit.
- [x] Source concept → plain explanation → factory application → interaction.
- [x] Practice question and source reference per unit.
- [x] Difficulty metadata.
- [x] Importance/priority metadata.
**Exit gate:** every unit has a complete instructional storyboard. **PASSED.**

Current artifacts:
- `books/6044-1397/LEARNING_MAP.md`
- `books/6044-1397/PRACTICE_MAP.md`
- `site/6044-1397/lib/engine.js`
- `site/6044-1397/lib/engine.css`
- `docs/CORE_BOOK_ENGINE.md`
- Representative migrated units: ch01, ch02, ch07, ch10, ch11, ch17

# Phase 3 — Core Book Engine
**Status: COMPLETE — shared engine + lifecycle/scene contract is applied across all 22 learning units; browser/runtime validation is now handled by Phases 9–10.**

- [x] Shared chapter shell.
- [x] Beat/timeline engine.
- [x] Scene lifecycle.
- [x] Play/pause/next/previous.
- [x] Progress/navigation/fullscreen.
- [x] Keyboard controls.
- [x] Responsive layout.
- [x] Reduced-motion and fallback states.
- [x] Reusable SVG/scene helpers.
**Exit gate:** a new chapter can be implemented mainly from configuration/content. **PASSED.**

## Engineering Visual Engine v2 — current branch upgrade
## Authored Render Hardening — current branch upgrade
**Status: implemented on PR #34 and validated by CI.**

- [x] Repository-owned engineering renders are the canonical homepage visual assets.
- [x] Homepage semantic render sequence communicates Factory → Fresh Concrete → Strength Evidence.
- [x] Representative Chapter 4 uses the factory/material render instead of particle-morph Canvas.
- [x] Representative Chapter 10 uses the fresh-concrete/slump render instead of lab Canvas.
- [x] Representative Chapter 11 uses the strength render instead of lab Canvas.
- [x] Shared evidence-led render panel with responsive desktop/mobile treatment.
- [x] Static QA forbids the migrated decorative visual runtimes from reappearing on chapter surfaces.
- [x] Browser Smoke covers representative render presence, natural dimensions and legacy-canvas absence.
- [ ] Human visual acceptance of representative chapter surfaces.

## Engineering Product Polish — current branch upgrade
**Status: implemented as a non-Production PR upgrade.**
- [x] Persian-first typography baseline across the book shell.
- [x] Premium RTL Study Command Drawer across home, search, assessment and all 23 book surfaces.
- [x] Context-aware current chapter plus previous/next navigation in the drawer.
- [x] Local study-state summary in the drawer using existing progress/bookmark storage.
- [x] Hybrid visual language: Engineering Dark for visual/simulation surfaces + restrained warm reading surface for chapter copy.
- [x] Homepage narrative ordering: material-intelligence showcase now follows the main entry experience before the architecture showcase.
- [x] Browser smoke coverage for drawer open/close, current context and 23-unit navigation.
- [x] CI concurrency guard so only the latest Browser Smoke run remains active for the PR.
- [ ] Final human visual review on representative desktop/mobile devices.

**Status: implemented as a non-Production PR prototype.**

- [x] Semantic particle states for aggregate, cement/SCM, water and admixture.
- [x] Shared Reader-to-visual beat event for narration/scene synchronization.
- [x] Reusable visual timeline primitive.
- [x] Chapter 4 material morphology hero scene.
- [x] Chapter 10 fresh-concrete laboratory hero scene.
- [x] Chapter 11 compressive-strength laboratory hero scene.
- [x] Reduced-motion stable rendering path for canvas scenes.
- [ ] Final human visual review and desktop/mobile performance measurement.

# Phase 4 — Professional Animation System
**Status: IN PROGRESS — animation contract and process choreography are implemented; remaining work is final performance/visual validation.**
- [x] Timeline beats, focus/highlight, state transitions and procedure sequencing foundation.
- [x] Replay/step playback primitive.
- [x] Reduced-motion equivalent for step progression.
- [x] Shared animation contract.
- [x] Process-specific movement patterns implemented across process/calculation pilot states.
- [x] Focus/progress data-reveal foundation validated on numeric pilot.
- [ ] Performance budget measured on representative desktop/mobile.
- [x] One-shot process choreography guard covered by static QA.
**Exit gate:** pilot chapters demonstrate one coherent animation language.

# Phase 5 — Narration
**Status: IN PROGRESS — narration engine and Persian TTS QA pipeline are implemented; release audio still needs human approval.**

- [x] Persian narration storyboard pilot (Units 01, 07, 11).
- [x] Beat-level transcript support.
- [x] Play/pause/replay/speed controls in shared engine.
- [x] No-audio fallback.
- [x] displayText / spokenText separation.
- [x] Persian pronunciation dictionary foundation.
- [x] TTS benchmark pack.
- [x] Provider-neutral narration manifest/schema.
- [x] Provider-neutral narration tooling scaffold.
- [ ] Release-valid Piper generation and final voice package (model weights kept outside repository).
- [x] Audio QA/release gate.
- [ ] Human listening benchmark and voice selection.
- [ ] Generate/review release narration for all released units.
**Exit gate:** every released unit has narration or an explicit reason it does not need narration.

# Phase 6 — Engineering Simulations
Priority:
1. [x] Sampling workflow — Chapter 8 pilot with deterministic QA.
2. [x] Fresh concrete tests — Chapter 10 pilot with deterministic QA.
3. [x] Delivery/temperature workflow — Chapter 7 pilot with deterministic QA.
4. [x] Specimen preparation — Chapter 11 traceability pilot with deterministic QA.
5. [x] Strength/conformity decision — Chapter 11 pilot with deterministic QA.
6. [x] Production-control workflow — Chapter 14 control-system checklist pilot with deterministic QA.
7. [x] Order → production → delivery — Chapter 6/12 traceability workflow pilot with deterministic QA.
8. [x] Conformity assessment — Chapter 15 readiness-chain pilot with deterministic QA.
Each simulation must expose source clauses, inputs, outputs, assumptions and validation cases. Shared contract: `docs/SIMULATION_CONTRACT.md`; first shared primitive: `site/6044-1397/lib/simulations.js`.
**Exit gate:** documented cases reproduce consistently without invented limits.

# Phase 7 — Assessment System
**Status: PILOT COMPLETE — shared deterministic assessment engine + 8-question final assessment surface implemented.**
- [x] MCQ.
- [x] True/false.
- [x] Sequence ordering.
- [x] Drag/drop where useful — not required for the v1.0 pilot because the same ordering task is keyboard/mobile friendly.
- [x] Numeric/range decisions.
- [x] Scenario decisions.
- [x] Answer explanations.
- [x] Chapter/unit score + weakness map + review recommendations.
- [x] Final assessment.
- [x] Local progress persistence and reset.
- [x] Static QA for question-bank metadata and grading contract.
**Exit gate:** PASSED for the current assessment pilot; broader chapter-level coverage remains a Phase 9/10 polish and QA task.

# Phase 8 — Search & Knowledge Navigation
**Status: COMPLETE — local search + chapter navigation + return position + progress + bookmarks implemented.**
- [x] Chapter/unit map.
- [x] Concept/clause-oriented search index for all 22 learning units.
- [x] Related-unit result links.
- [x] Local/static operation without paid API.
- [x] Return position — shared book-engine navigation restores the last beat locally.
- [x] Progress persistence — chapter-level local progress.
- [x] Bookmarks — chapter/beat bookmarks.
**Exit gate:** PASSED — the navigation/persistence layer is implemented; remaining work is visual/browser QA in Phases 9–10.

# Phase 9 — Visual/Product Polish
**Status: IN PROGRESS — unified engineering product shell, all-22-unit engine migration, cover/contents treatment and browser smoke are complete; fullscreen and final publication audit remain.**
- [x] Consistent engineering visual system foundation.
- [x] RTL typography foundation.
- [x] Mobile/desktop responsive command tiles.
- [x] Direct entry to Search, Assessment and key simulators.
- [x] Shared previous/list/next chapter navigation.
- [x] Local return-position and bookmark UI.
- [x] Reduced-motion behavior on new interaction layer.
- [x] Cover and contents final treatment.
- [x] Engineering Hero Visual v1 — material particles → concrete → specimen → test data → decision, with reduced-motion and responsive canvas geometry.
- [x] Full 22-unit visual/engine consistency audit — Chapters 1–15 + Appendices A–G use the shared book engine; bibliography remains a reference-only surface.
- [x] Loading/error states.
- [x] Representative desktop/mobile/reduced-motion browser smoke — current PR head verified by Browser Smoke.
- [ ] Fullscreen visual QA.
- [ ] No childish gamification or decorative animation.
**Exit gate:** all chapters look like one product.

# Phase 10 — QA & Validation
### Content
- [ ] Final clause-level source references.
- [x] Numbers/tables/formulas in current numeric-bearing interactions reconciled.
- [ ] Unsupported claims sweep.
- [ ] Cross-references sweep.
### Functional
- [ ] Chapters/controls/quizzes.
- [x] Narration engine + fallback contract.
- [ ] Release narration/audio review.
- [x] Mobile/desktop/reduced-motion browser smoke.
- [ ] Fullscreen visual QA.
### Technical
- [ ] Clean build.
- [ ] No console/page errors on the browser-smoke route set — rerun required after the current title-brand failure.
- [ ] Assets/links/performance/accessibility final sweep.
- [x] Static QA runner + GitHub Actions contract check on the active development branch.
- [x] Static QA passed on current PR head after authored-render hardening.
- [x] Browser Smoke is green on the current PR head.
**Exit gate:** clean release candidate.

### Phase 11 — Documentation & Handoff
**Status: COMPLETE — release documentation and continuation artifacts are present.**
- [x] README.
- [x] PRODUCT_SPEC.
- [x] SOURCE_VERIFICATION.
- [x] MASTER_ROADMAP.
- [x] AGENT_HANDOFF.
- [x] User guide.
- [x] Architecture map.
- [x] Commands/limitations/release checklist.
- [x] Changelog.
**Exit gate:** new agent can continue without reconstructing history. **PASSED.**

# Phase 12 — Release 1.0
- [ ] Release candidate.
- [ ] Owner acceptance review.
- [x] Release blockers-only scope enforced.
- [ ] Feature freeze.
- [ ] Tag v1.0.0.
- [x] Changelog/release-notes scaffold.
- [ ] Pages/demo verification.
- [ ] Archive source-sensitive material.
- [ ] Mark roadmap COMPLETE.

## Definition of Done
1. All source-derived content verified.
2. All 22 source learning units + bibliography reference surface are coherent.
3. Shared engine replaces uncontrolled duplication.
4. Animation is functional and educational.
5. Narration/transcript works.
6. Simulations work where applicable.
7. Assessment works.
8. Search/navigation works.
9. Mobile/desktop work.
10. Accessibility/reduced motion works.
11. QA is clean.
12. Documentation/handoff complete.
13. v1.0.0 tagged.
14. No open v1.0 blocker.

## Anti-Infinite-Project Rule
A new idea is not a reason to delay v1.0. New ideas go to POST_RELEASE_IDEAS.md.

## Agent protocol
Before: README → MASTER_ROADMAP → AGENT_HANDOFF → SOURCE_VERIFICATION → git/main → first unblocked task.
After: checks → docs/status → focused commit → report changed/remaining → no silent scope expansion.


## V3.1 Release Candidate — current branch truth

**Branch:** redesign/cretiq-rendered-visuals-v3  
**PR:** #34  
**Current head:** 6781ba7826127abdffaed597a5920269ffced378

### Verified
- [x] CRETIQ 6044 rendered homepage uses repository-owned hero.webp, slump.webp, strength.webp.
- [x] Legacy homepage canvas/process choreography is no longer loaded by the homepage.
- [x] Semantic render sequence: Factory → Fresh Concrete → Strength Evidence.
- [x] Manual scene selection, playback, keyboard navigation and reduced-motion behavior.
- [x] Representative Chapter 4/10/11 surfaces use authored renders and no longer load the migrated decorative Canvas visual runtimes.
- [x] Static QA: PASS.
- [x] Browser Smoke: PASS.
- [x] PR mergeability verified.

### Still blocking v1.0
- [ ] Human visual acceptance of representative pages.
- [ ] Final clause-level source/publication audit.
- [ ] Human narration listening approval and release audio package.
- [ ] Fullscreen/performance/accessibility final sweep.
- [ ] Owner acceptance.
- [ ] Merge to main, Pages verification, release tag.

**Scope rule:** no new feature family should be opened unless it closes one of these release gates.



## V3.2 Release Candidate — 2026-10-07

**Branch:** `redesign/cretiq-rendered-visuals-v3`  
**PR:** #34  
**Head:** `98e0d38e33f821c749abdfcce3b1a9df78a80a37`

### Verified
- Static QA: PASS
- Browser Smoke: PASS — 40/40
- Repository-owned authored renders are wired into homepage and representative chapter surfaces.
- Chapter 04/10/11 render-led surfaces are mobile-safe and reduced-motion aware.
- Visual QA artifacts now capture homepage plus authored render assets for human inspection.

### Remaining release gates
- Human visual acceptance of the authored render set. Chapter 10 `slump.webp` remains the weak asset and must not be replaced with unrelated branded imagery.
- Final clause-level publication audit against `6044-1397.pdf`.
- Human approval of Persian narration.
- Final accessibility/performance/fullscreen sweep.
- Owner approval before merge to `main`, then Pages verification and release tag.

**Scope rule:** no new feature family until these release gates are closed.
