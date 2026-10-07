---
name: ui-animation
description: Purposeful, performant UI motion baseline for transitions, feedback, reveals, and state changes.
---

# UI Animation — Project Adapter

Source inspiration: mblode/agent-skills — ui-animation.

Use whenever motion is added, reviewed, or replaced.

## Motion doctrine
- Every animation must answer: what user-visible meaning does this motion communicate?
- Prefer continuity and spatial context over fade-only replacement.
- Use transform/opacity where practical; avoid layout-thrashing animation.
- High-frequency controls get subtle feedback; rare moments may carry more expression.
- Pair open/close, forward/back, hover/focus and success/error states consistently.
- Respect input method and viewport; motion must never be the only way to understand state.
- Every animated path gets a prefers-reduced-motion equivalent.
- Do not hide rough choreography with blur, random particles, infinite loops, or decorative noise.
- Measure/inspect the result before shipping; implementation that merely compiles is not motion QA.
