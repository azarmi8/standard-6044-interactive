# RELEASE READINESS — Standard 6044 Interactive

Last checked: 2026-10-06

## Current baseline

- Main: `1f281bd511b5f16e11296771d4a08436c5c21a3f`
- Product: CRETIQ 6044 — Persian RTL interactive engineering book for Iranian National Standard 6044:1397.
- Source structure: 15 official chapters + Appendices A–G + bibliography.
- Learning units: 22.
- Shared engine: all 22 learning units.
- Attribution: Mohammadreza Azarmi.

## Gate status

| Gate | Status | Evidence / note |
|---|---|---|
| Source structure lock | PASS | 15 chapters + A–G + bibliography; no Appendix H |
| 22-unit HTML contract | PASS | title + RTL + 1600×900 checked |
| Shared engine migration | PASS | Units 1–22 use shared engine/control/navigation |
| JS/config smoke | PASS | 14 migrated appendix/chapter configs parse and callbacks execute |
| Simulation contracts | PASS | deterministic simulation tests reviewed; ch11 edge-case corrected |
| Assessment/search contracts | PASS | existing QA contract + static inspection |
| Professional cover/contents | PASS | merged and strengthened by PR #16 |
| Static QA | PASS | Main Run #217 succeeded on `b4b5c6a564a96f830aa70b1ee970f5a856cfefdf` |
| Browser/mobile/reduced-motion QA | PASS | Main Browser Smoke Run #169 succeeded; 39 tests passed including all 23 book surfaces, mobile/reduced-motion and interactive pilots |
| Persian TTS human listening | PENDING | benchmark/contract exists; release audio not approved |
| GitHub Pages | PASS | Main Deploy Run #219 succeeded for `1f281bd511b5f16e11296771d4a08436c5c21a3f` |
| Release documentation/handoff | PASS | Core release documentation exists; current-state refresh recorded here |

## Merge policy

A change may be merged when:
1. Scope is finite and aligned with the roadmap.
2. Source content is not silently changed.
3. Deterministic/static validation is available.
4. Any unavailable hosted CI result is explicitly recorded as pending rather than called green.
5. Browser/audio/release gates are never represented as complete without real evidence.

## Release blockers

### B-001 — GitHub Pages enablement
RESOLVED. Repository-level Pages is enabled and the workflow deploys `site/6044-1397` with GitHub Actions.

### B-002 — Hosted CI recovery
RESOLVED. Main Static QA Run #219 is green.

### B-003 — Browser smoke
RESOLVED. Main Browser Smoke Run #169 is green with 39/39 tests passed.

### B-004 — Persian narration review
Select a voice only after human listening. Check Persian pronunciation, numbers, units, ASTM/ISIRI/SCC/fc and technical pauses before approving release audio.

### B-005 — Final source audit
Close remaining clause-level source verification items before v1.0.0.

## Out of scope for v1.0

AI tutor/chatbot, live IoT integrations, mandatory paid APIs, full 3D recreation of every process, cloud account sync, and multilingual narration remain post-release ideas unless a current release gate proves otherwise.
