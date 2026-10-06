# Changelog

All notable changes to this project will be documented here.

## [Unreleased]

### Verified — 2026-10-06
- Main `1f281bd...` has green Static QA (#219), green Browser Smoke (#169, 39/39), and green Pages Deploy (#219).

### Fixed — 2026-10-06
- Corrected the bibliography surface: Unit 23 now reflects the two references listed on source page 73 and is no longer presented as a nonexistent Appendix H.
- Repaired a real Chapter 15 JavaScript runtime/syntax failure by moving the conformity interaction into the chapter script with DOM guards.
- Expanded Browser Smoke to cover all 23 book surfaces and added regression guards for duplicate HTML IDs and stale public-brand tokens.
- Rebranded the public product as **CRETIQ 6044** and kept Mohammadreza Azarmi as creator attribution only.
- Fixed assessment/search page titles and public brand surfaces to use the new product identity.
- Removed a duplicated capability block from the homepage and aligned its CSS class with the active CRETIQ product shell.
- Documented the current Browser Smoke failure instead of reporting stale green status.

### Added
- Professional Persian RTL interactive book surface for Standard 6044:1397.
- Shared book engine for the 22 source learning units.
- Engineering scene/beat playback and reduced-motion behavior.
- Deterministic concrete QC simulations.
- Assessment, local search, progress and bookmarks.
- Persian narration contract, pronunciation dictionary and TTS QA gate.
- Static QA and Playwright browser smoke workflows.
- Release documentation: user guide, architecture map and v1 checklist.

### Corrected
- Removed the former invented «پیوست ح» source classification; Unit 23 is bibliography/reference only.
- Normalized appendix taxonomy from Chapters to Appendices A–G.
- Hardened static QA script scanning and browser smoke dependency/assertions.

### Release status
- v1.0.0 has **not** been released yet.
- GitHub Pages is enabled; the current main deployment is green. Browser Smoke remains the active functional release gate.
- Persian narration remains pending human listening approval.
