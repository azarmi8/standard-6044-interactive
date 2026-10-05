# RELEASE READINESS — Standard 6044 Interactive

Last checked: 2026-10-06

## Current baseline

- Main: `966d24f4b1eba12249b315dfb8901c4ff2d23fb7`
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
| Static QA | PASS | PR #16 Static QA passed after reader/runtime + visual pass changes |
| Browser/mobile/reduced-motion QA | PASS | PR #16 Browser Smoke passed with Chapter 3/8/10/17 and mobile/reduced-motion coverage |
| Persian TTS human listening | PENDING | benchmark/contract exists; release audio not approved |
| GitHub Pages | PASS | repository Pages is enabled; latest deployment reached Configure → Upload → Deploy successfully |
| Release documentation/handoff | PASS | User guide, architecture map, release checklist and changelog merged in PR #14 |\n| v1.0.0 release | NOT READY | blocked by remaining release gates above |

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
RESOLVED. Current main Static QA Run #64 and Browser Smoke Run #14 both succeeded.

### B-003 — Browser smoke
Core smoke is verified on current main. Remaining release task is fullscreen visual QA; no browser-smoke failure is currently open.

### B-004 — Persian narration review
Select a voice only after human listening. Check Persian pronunciation, numbers, units, ASTM/ISIRI/SCC/fc and technical pauses before approving release audio.

### B-005 — Final source audit
Close remaining clause-level source verification items before v1.0.0.

## Out of scope for v1.0

AI tutor/chatbot, live IoT integrations, mandatory paid APIs, full 3D recreation of every process, cloud account sync, and multilingual narration remain post-release ideas unless a current release gate proves otherwise.
