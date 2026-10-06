# RELEASE READINESS — Standard 6044 Interactive

Last checked: 2026-10-06

## Current baseline

- Main: `b4b5c6a564a96f830aa70b1ee970f5a856cfefdf`
- Product: Persian RTL interactive engineering book for Iranian National Standard 6044:1397.
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
| Browser/mobile/reduced-motion QA | PENDING | Main Browser Smoke Run #167 was still in progress at last check; PR #27 Browser Smoke passed 39/39 after the Chapter 15 + bibliography fixes |
| Persian TTS human listening | PENDING | benchmark/contract exists; release audio not approved |
| GitHub Pages | PASS | Main Deploy Run #218 succeeded for `b4b5c6a564a96f830aa70b1ee970f5a856cfefdf` |
| Release documentation/handoff | PASS | Core release documentation exists; current-state refresh is required after QA/branding changes |\n| v1.0.0 release | NOT READY | blocked by remaining release gates above |

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
RESOLVED. Main Static QA is green on Run #217.

### B-003 — Browser smoke
PENDING. PR #27 Browser Smoke passed 39/39; main Run #167 was still running at the last status check.


OPEN. Run #156 reports 24/26 passed; two failures are the `/assessment.html` and `/search.html` title assertions caused by the stale AZARMI titles.

### B-004 — Persian narration review
Select a voice only after human listening. Check Persian pronunciation, numbers, units, ASTM/ISIRI/SCC/fc and technical pauses before approving release audio.

### B-005 — Final source audit
Close remaining clause-level source verification items before v1.0.0.

## Out of scope for v1.0

AI tutor/chatbot, live IoT integrations, mandatory paid APIs, full 3D recreation of every process, cloud account sync, and multilingual narration remain post-release ideas unless a current release gate proves otherwise.
