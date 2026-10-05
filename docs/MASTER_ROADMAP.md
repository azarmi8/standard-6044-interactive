# MASTER ROADMAP — Standard 6044 Interactive

## North Star

Deliver a **finished, independently usable Persian RTL interactive engineering book and training simulator** for Iranian National Standard 6044:1397.

**Owner:** Mohammadreza Azarmi  
**Repository:** `azarmi8/standard-6044-interactive`

The project is considered finished only when the Definition of Done below is satisfied. New features do not extend the roadmap unless the owner explicitly opens a post-release track.

---

## 0. Completion contract

### In scope for v1.0
- Complete source-grounded coverage of all 15 chapters and normative/informative appendices in the source PDF.
- Source verification ledger for every source-derived claim, number, table, formula, exception and cross-reference.
- Professional interactive book engine.
- Professional animation/beat engine.
- Persian narration + transcript/captions.
- Interactive engineering simulations where the standard can be represented faithfully.
- Practice and assessment engine.
- QC-oriented scenarios.
- Search, chapter map, cross-references, bookmarks/progress.
- Responsive desktop/mobile/fullscreen experience.
- Accessibility basics and reduced-motion mode.
- Offline/static-capable delivery without mandatory paid services.
- Automated QA/build checks.
- Final user guide and agent handoff.
- Release tag and changelog.

### Explicitly out of v1.0
- AI chatbot required for core operation.
- Live IoT/device integrations.
- Paid API dependency.
- Full 3D recreation of every process.
- User accounts/cloud sync unless already required by a completed core feature.

These may become v2 tracks, but they cannot block v1.0.

---

# Phase 1 — Source Lock & Audit

**Goal:** eliminate content uncertainty.

- [x] Audit PDF identity, revision, structure and pages.
- [x] Audit Chapter 1.
- [x] Audit Chapter 2.
- [x] Audit Chapter 3.
- [x] Audit Chapter 4.
- [x] Audit Chapter 5.
- [x] Audit Chapter 6.
- [x] Audit Chapter 7.
- [x] Audit Chapter 8.
- [ ] Audit Chapter 9.
- [ ] Audit Chapter 10.
- [ ] Audit Chapter 11.
- [ ] Audit Chapter 12.
- [ ] Audit Chapter 13.
- [ ] Audit Chapter 14.
- [ ] Audit Chapter 15.
- [ ] Audit Appendices A–G / bibliography according to source structure.
- [x] Establish `NEEDS_SOURCE_REVIEW` rule; remaining ambiguous claims are tracked in source audit.
- [ ] No unsupported numeric limit remains in published content.

**Next batch:** Chapters 9–12.

**Exit gate:** every source-derived learning item has a verified source location.

---

# Phase 2 — Content Architecture

**Goal:** convert verified material into teachable units.

For every chapter/unit:

- [ ] Learning objectives.
- [ ] Source concepts.
- [ ] Plain-language explanation.
- [ ] Practical QC interpretation.
- [ ] Example.
- [ ] Common mistake.
- [ ] Interactive opportunity.
- [ ] Practice question.
- [ ] Source reference.
- [ ] Difficulty/importance metadata.

**Exit gate:** every unit has a complete instructional storyboard.

---

# Phase 3 — Core Book Engine

**Goal:** stop duplicating page logic.

- [ ] Shared chapter shell.
- [ ] Beat/timeline engine.
- [ ] Scene lifecycle.
- [ ] Play/pause/next/previous.
- [ ] Progress indicator.
- [ ] Chapter navigation.
- [ ] Keyboard controls.
- [ ] Fullscreen.
- [ ] Responsive layout.
- [ ] Reduced-motion mode.
- [ ] Error/fallback state.
- [ ] Reusable SVG/scene helpers.

**Exit gate:** a new chapter can be implemented mainly from configuration/content rather than copied HTML logic.

---

# Phase 4 — Professional Animation System

**Goal:** make animation instructional.

- [ ] Timeline-based beats.
- [ ] Focus/highlight.
- [ ] Zoom/pan.
- [ ] Process movement.
- [ ] State transitions.
- [ ] Data reveal.
- [ ] Procedure sequencing.
- [ ] Replay.
- [ ] Step mode.
- [ ] Reduced-motion equivalent.
- [ ] Performance budget.

Use mature GitHub projects as implementation research where useful. Do not add dependencies merely for visual novelty.

**Exit gate:** pilot chapters demonstrate a coherent animation language.

---

# Phase 5 — Narration

- [ ] Persian narration storyboard.
- [ ] Beat-to-narration timing.
- [ ] Transcript.
- [ ] Captions.
- [ ] Playback speed.
- [ ] Seek/replay.
- [ ] No-audio fallback.
- [ ] Audio asset QA.

**Exit gate:** every released learning unit has narration or an explicit reason it does not need narration.

---

# Phase 6 — Engineering Simulations

Build only simulations supported by verified source material.

Priority:

1. [ ] Sampling workflow.
2. [ ] Fresh concrete workflow/tests.
3. [ ] Delivery/temperature workflow.
4. [ ] Specimen preparation.
5. [ ] Strength/conformity decision.
6. [ ] Production-control workflow.
7. [ ] Order → production → delivery scenario.
8. [ ] Conformity assessment scenario.

Each simulation:
- [ ] source clauses recorded
- [ ] inputs defined
- [ ] outputs defined
- [ ] assumptions disclosed
- [ ] validation cases
- [ ] no invented limits

**Exit gate:** simulations reproduce documented educational cases consistently.

---

# Phase 7 — Assessment System

- [ ] MCQ.
- [ ] True/false.
- [ ] Sequence ordering.
- [ ] Drag/drop where useful.
- [ ] Numeric/range decisions.
- [ ] Scenario decisions.
- [ ] Explanations after answers.
- [ ] Chapter score.
- [ ] Weakness map.
- [ ] Review recommendations.
- [ ] Final assessment.

**Exit gate:** learner can complete a meaningful learning-and-assessment loop without external tools.

---

# Phase 8 — Search & Knowledge Navigation

- [ ] Chapter map.
- [ ] Concept search.
- [ ] Clause search.
- [ ] Cross-reference.
- [ ] Related learning units.
- [ ] Return to previous position.
- [ ] Progress persistence.
- [ ] Useful bookmarks.

**Exit gate:** a learner can find a known concept quickly.

---

# Phase 9 — Visual/Product Polish

- [ ] Cover.
- [ ] Contents.
- [ ] Consistent visual system.
- [ ] Professional engineering aesthetic.
- [ ] RTL typography.
- [ ] Mobile layout.
- [ ] Desktop layout.
- [ ] Fullscreen learning mode.
- [ ] Empty/error states.
- [ ] Loading states.
- [ ] No childish gamification.
- [ ] No unnecessary animation.

**Exit gate:** all chapters look like one product, not separate prototypes.

---

# Phase 10 — QA & Validation

### Content QA
- [ ] Source references checked.
- [ ] Numbers/tables/formulas checked.
- [ ] No unsupported claims.
- [ ] No broken cross-references.

### Functional QA
- [ ] Every chapter opens.
- [ ] Every control works.
- [ ] Every quiz works.
- [ ] Narration works/falls back.
- [ ] Mobile works.
- [ ] Desktop works.
- [ ] Fullscreen works.
- [ ] Reduced-motion works.

### Technical QA
- [ ] Clean build.
- [ ] No console errors.
- [ ] No broken local assets.
- [ ] Links checked.
- [ ] Performance sanity check.
- [ ] Accessibility sanity check.

**Exit gate:** clean release candidate.

---

# Phase 11 — Documentation & Handoff

- [ ] README finalized.
- [ ] PRODUCT_SPEC finalized.
- [ ] SOURCE_VERIFICATION finalized.
- [ ] MASTER_ROADMAP finalized.
- [ ] AGENT_HANDOFF finalized.
- [ ] User guide finalized.
- [ ] Architecture map finalized.
- [ ] Development commands documented.
- [ ] Known limitations documented.
- [ ] Release checklist documented.

**Exit gate:** a new agent can clone the repo and understand how to continue without asking the owner to reconstruct history.

---

# Phase 12 — Release 1.0

- [ ] Final release candidate.
- [ ] Owner acceptance review.
- [ ] Fix release blockers only.
- [ ] Freeze feature scope.
- [ ] Tag `v1.0.0`.
- [ ] Changelog.
- [ ] Release notes.
- [ ] Final Pages/Demo verification.
- [ ] Archive source-sensitive material correctly.
- [ ] Mark roadmap v1.0 COMPLETE.

---

# Definition of Done — v1.0

The project is **DONE** when all are true:

1. All source-derived content is verified against the 6044:1397 source.
2. All 23 learning units have a coherent instructional experience.
3. Shared engine architecture is used instead of uncontrolled page duplication.
4. Animation is functional and educational.
5. Narration/transcript works.
6. Simulations work where applicable.
7. Assessment works.
8. Search/navigation works.
9. Mobile and desktop work.
10. Accessibility/reduced motion works.
11. Automated/manual QA is clean.
12. Documentation and agent handoff are complete.
13. Release `v1.0.0` is tagged.
14. No open v1.0 blocker remains.

**A new idea is not a reason to delay v1.0.**

---

# Anti-Infinite-Project Rule

AI projects often never finish because every new idea becomes “Phase Next”.

This project has a hard rule:

> **Finish the committed scope first. Then release.**

New ideas after scope freeze go into `POST_RELEASE_IDEAS.md` and do not reopen v1.0.

Possible post-release examples:
- AI tutor.
- Live IoT.
- advanced 3D factory.
- cloud accounts.
- multilingual narration.
- authoring tools.

They are explicitly **not v1.0 blockers**.

---

# Progress protocol for every agent

Before work:
1. Read README.
2. Read MASTER_ROADMAP.
3. Read AGENT_HANDOFF.
4. Read SOURCE_VERIFICATION for content work.
5. Check current git/main state.
6. Identify the first unchecked task that is actually unblocked.

After work:
1. Run relevant checks.
2. Update documentation/status.
3. Commit a focused change.
4. Report what changed.
5. Report what remains.
6. Never silently expand scope.

**The roadmap is a completion mechanism, not a list of endless ambitions.**
