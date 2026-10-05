# MASTER ROADMAP — Interactive Standard 6044:1397

## Product North Star

Build a professional Persian interactive engineering book and training simulator for Iranian National Standard 6044:1397.

**North Star:** Standard → Learn → See → Practice → Decide → Assess

## Current baseline

- 15 main chapters mapped.
- Appendices A–H mapped as units 16–23.
- Interactive HTML exists for all 23 units.
- Core chapters 4, 6, 7, 9, 10, 11, 12, 13, 14, 15 have been deepened with interactive beats.
- GitHub Pages workflow exists.
- Private source PDF is not committed.
- Attribution: Mohammadreza Azarmi.
- Architecture is independent from Papermorph.

## Product tracks

### Track A — Source fidelity
- Verify every chapter against the actual 6044:1397 source.
- Preserve clause numbers, tables, limits, definitions and exceptions.
- Mark educational paraphrase separately.
- Never invent missing source content.

### Track B — Book engine
- Shared chapter shell.
- Shared scene/timeline model.
- Progress and navigation.
- Responsive/mobile behavior.
- Accessibility and keyboard controls.

### Track C — Animation engine
- Timeline beats.
- Scene transitions.
- SVG motion.
- Focus/highlight/zoom.
- Controlled camera movement.
- Replay/step mode.
- Prefer lightweight 2D; use WebGL/Three.js only where it adds educational value.

### Track D — Narration
- Persian narration JSON.
- Timed narration-to-beat mapping.
- Play/pause/seek/speed.
- Optional captions/transcript.

### Track E — Engineering simulations
Priority candidates:
1. sampling workflow
2. fresh concrete tests
3. delivery/temperature workflow
4. specimen preparation
5. compressive-strength decision scenarios
6. production-control workflow
7. conformity/acceptance scenarios

Every simulation must document assumptions and source basis.

### Track F — Assessment
- MCQ
- true/false
- sequence ordering
- drag/drop
- numeric/range decisions
- scenario decisions
- chapter score
- weakness map
- review recommendations

### Track G — UX / visual polish
- professional engineering visual language
- RTL typography
- mobile/desktop/fullscreen
- chapter map
- search
- cross references
- reduced-motion option
- no decorative animation that harms learning

### Track H — QA / delivery
- link checks
- chapter registry check
- narration schema check
- JS errors
- responsive smoke tests
- accessibility smoke tests
- content/source verification
- final local preview

## Definition of Done for a chapter

A chapter is not final merely because its HTML loads.

Required:
- source reviewed
- clause mapping documented
- educational explanation separated
- scene/storyboard present
- animation beats functional
- narration synchronized where planned
- interaction works
- quick check works
- mobile layout checked
- no broken links
- no unsupported claims
- chapter registered in roadmap/handoff

## Agent rule

Do not create a new phase/architecture without owner instruction. Continue from the actual repository state.

