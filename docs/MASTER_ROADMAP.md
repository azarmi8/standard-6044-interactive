# MASTER ROADMAP — Standard 6044 Interactive

## North Star
Deliver a finished, independently usable Persian RTL interactive engineering book and training simulator for Iranian National Standard 6044:1397.

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
**Status: SOURCE CONTENT AUDIT COMPLETE — 22/22 learning units verified.**

- [x] Audit PDF identity, revision, structure and pages.
- [x] Audit Chapters 1–15.
- [x] Audit Appendices A–G.
- [x] Establish OCR ambiguity rule.
- [ ] Reconcile every source-derived numeric/table/formula value in existing HTML and simulation logic against the verified source ledger.

**Exit gate:** content claims in Units 1–22 have verified source locations.  
**Remaining Phase-1 QA:** implementation reconciliation only.

# Phase 2 — Content Architecture
- [ ] Learning objectives for every unit.
- [ ] Source concept → plain explanation → factory application → example → common mistake → interaction.
- [ ] Practice question and source reference per unit.
- [ ] Difficulty/importance metadata.
**Exit gate:** every unit has a complete instructional storyboard.

# Phase 3 — Core Book Engine
- [ ] Shared chapter shell.
- [ ] Beat/timeline engine.
- [ ] Scene lifecycle.
- [ ] Play/pause/next/previous.
- [ ] Progress/navigation/fullscreen.
- [ ] Keyboard controls.
- [ ] Responsive layout.
- [ ] Reduced-motion and fallback states.
- [ ] Reusable SVG/scene helpers.
**Exit gate:** a new chapter can be implemented mainly from configuration/content.

# Phase 4 — Professional Animation System
- [ ] Timeline beats, focus/highlight, zoom/pan, process movement, state transitions, data reveal, procedure sequencing.
- [ ] Replay and step mode.
- [ ] Reduced-motion equivalent.
- [ ] Performance budget.
**Exit gate:** pilot chapters demonstrate one coherent animation language.

# Phase 5 — Narration
- [ ] Persian narration storyboard.
- [ ] Beat timing.
- [ ] Transcript/captions.
- [ ] Speed/seek/replay.
- [ ] No-audio fallback.
- [ ] Audio QA.
**Exit gate:** every released unit has narration or an explicit reason it does not need narration.

# Phase 6 — Engineering Simulations
Priority:
1. [ ] Sampling workflow.
2. [ ] Fresh concrete tests.
3. [ ] Delivery/temperature workflow.
4. [ ] Specimen preparation.
5. [ ] Strength/conformity decision.
6. [ ] Production-control workflow.
7. [ ] Order → production → delivery.
8. [ ] Conformity assessment.
Each simulation must expose source clauses, inputs, outputs, assumptions and validation cases.
**Exit gate:** documented cases reproduce consistently without invented limits.

# Phase 7 — Assessment System
- [ ] MCQ.
- [ ] True/false.
- [ ] Sequence ordering.
- [ ] Drag/drop where useful.
- [ ] Numeric/range decisions.
- [ ] Scenario decisions.
- [ ] Answer explanations.
- [ ] Chapter score/weakness map/review recommendations.
- [ ] Final assessment.
**Exit gate:** meaningful learning-and-assessment loop.

# Phase 8 — Search & Knowledge Navigation
- [ ] Chapter map.
- [ ] Concept/clause search.
- [ ] Cross-reference and related units.
- [ ] Return position.
- [ ] Progress persistence.
- [ ] Bookmarks.
**Exit gate:** known concepts can be found quickly.

# Phase 9 — Visual/Product Polish
- [ ] Cover and contents.
- [ ] Consistent engineering visual system.
- [ ] RTL typography.
- [ ] Mobile/desktop/fullscreen.
- [ ] Loading/error states.
- [ ] Reduced-motion polish.
- [ ] No childish gamification or decorative animation.
**Exit gate:** all chapters look like one product.

# Phase 10 — QA & Validation
### Content
- [ ] Source references.
- [ ] Numbers/tables/formulas.
- [ ] Unsupported claims.
- [ ] Cross-references.
### Functional
- [ ] Chapters/controls/quizzes.
- [ ] Narration/fallback.
- [ ] Mobile/desktop/fullscreen/reduced-motion.
### Technical
- [ ] Clean build.
- [ ] No console errors.
- [ ] Assets/links/performance/accessibility.
**Exit gate:** clean release candidate.

# Phase 11 — Documentation & Handoff
- [ ] README.
- [ ] PRODUCT_SPEC.
- [ ] SOURCE_VERIFICATION.
- [ ] MASTER_ROADMAP.
- [ ] AGENT_HANDOFF.
- [ ] User guide.
- [ ] Architecture map.
- [ ] Commands/limitations/release checklist.
**Exit gate:** new agent can continue without reconstructing history.

# Phase 12 — Release 1.0
- [ ] Release candidate.
- [ ] Owner acceptance review.
- [ ] Release blockers only.
- [ ] Feature freeze.
- [ ] Tag v1.0.0.
- [ ] Changelog/release notes.
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
