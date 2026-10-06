# PRODUCT SPEC — Professional Interactive 6044

## Product identity
Standard 6044 Interactive is a professional Persian RTL interactive engineering book and training simulator for Iranian National Standard 6044:1397.

Owner / creator: Mohammadreza Azarmi

Independent implementation. این محصول is a workflow reference, not a runtime dependency.

## Product promise
Standard → Explain → Animate → Simulate → Practice → Decide → Assess

## Experience modes
1. Quick Learn — short visual explanation.
2. Full Study — complete chapter learning path with source mapping.
3. Practice — interactive exercises and procedure simulations.
4. Exam — mixed question types and scoring.
5. QC Mode — factory-oriented scenarios.

## Animation requirements
Animation is instructional, not decorative:
- timeline beats
- step-by-step process motion
- focus / highlight / zoom
- state changes
- data/state transitions
- equipment/process movement
- controlled transitions
- replay / pause / step
- reduced-motion alternative

2D/SVG is the default. WebGL/Three.js is reserved for scenes where 3D materially improves comprehension.

## High-value simulations
- sampling workflow
- fresh concrete tests
- delivery and temperature workflow
- specimen preparation
- strength/conformity decisions
- production-control workflow
- conformity/acceptance scenarios
- order-to-delivery chain

Every simulation must record source clauses, assumptions, educational simplifications, inputs, outputs and validation cases. It must never invent a standard limit.

## Narration
Persian narration, timed beat mapping, play/pause/seek/speed, captions/transcript, replay and no-audio fallback.

## Assessment
MCQ, true/false, sequence ordering, drag/drop, numeric/range decision, scenario decision, explanations, chapter score, weakness map and review recommendations.

## Search/navigation
Chapter map, concept search, clause/reference search, cross-reference, return-to-previous-position, progress and useful bookmarks.

## Visual direction
Professional engineering visual language, Persian RTL first, readable typography, large scene canvas, restrained green/cream/charcoal system, no childish gamification, mobile/desktop/fullscreen, keyboard and reduced-motion support.

## Technical principles
Static-first delivery, no mandatory paid API, no mandatory external runtime dependency, shared engine over duplicated chapter logic, graceful degradation, GitHub as source of truth, private source PDF never committed to public site.

## Agent rule
For difficult capabilities, inspect mature GitHub projects first for proven patterns. Reuse ideas responsibly; do not blindly copy code or introduce unnecessary dependencies.
