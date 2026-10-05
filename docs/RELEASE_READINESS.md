# RELEASE READINESS — Standard 6044 Interactive

Last checked: 2026-10-06

## Current baseline

- Main: `cd0190bdba6e5dc365f67b625293d9a15796875c`
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
| Professional cover/contents | PASS | merged in PR #6 |
| Static QA | PASS | Release-candidate PR head passed Static QA; latest main rerun may remain queued but code identity was tested |
| Browser/mobile/reduced-motion QA | PASS | Playwright Browser Smoke passed on current main baseline; representative desktop/mobile/reduced-motion routes covered |
| Persian TTS human listening | PENDING | benchmark/contract exists; release audio not approved |
| GitHub Pages | BLOCKED BY SETTINGS | repository Pages is not enabled yet; workflow is prepared |
| v1.0.0 release | NOT READY | blocked by remaining gates above |

## Merge policy

A change may be merged when:
1. Scope is finite and aligned with the roadmap.
2. Source content is not silently changed.
3. Deterministic/static validation is available.
4. Any unavailable hosted CI result is explicitly recorded as pending rather than called green.
5. Browser/audio/release gates are never represented as complete without real evidence.

## Release blockers

### B-001 — GitHub Pages enablement
Repository-level Pages must be enabled with GitHub Actions as the publishing source.

### B-002 — Hosted CI recovery
The current GitHub-hosted runner incident is delaying workflow start. Once runners recover, run the current main QA and record the real conclusion.

### B-003 — Browser smoke
Verify representative chapters on desktop/mobile/fullscreen/reduced-motion in a real browser.

### B-004 — Persian narration review
Select a voice only after human listening. Check Persian pronunciation, numbers, units, ASTM/ISIRI/SCC/fc and technical pauses before approving release audio.

### B-005 — Final source audit
Close remaining clause-level source verification items before v1.0.0.

## Out of scope for v1.0

AI tutor/chatbot, live IoT integrations, mandatory paid APIs, full 3D recreation of every process, cloud account sync, and multilingual narration remain post-release ideas unless a current release gate proves otherwise.
