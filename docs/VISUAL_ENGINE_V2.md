# Engineering Visual Engine v2

## Purpose
The Standard 6044 interactive book uses a shared visual language for engineering learning rather than decorative motion.

## Core rule
Every animated object must carry an educational meaning: material, process, measurement, evidence, or decision.

## v2 primitives
- visual-timeline.js — deterministic timeline primitive for stateful visual sequences.
- material-visual.js — semantic particle/microstructure renderer for Chapter 4.
- engine.js emits 6044:beat so visual modules can synchronize with the shared Reader beat/narration state.
- Reduced-motion mode disables the animation loop and renders a stable state.

## Material semantics
Particles have explicit types: aggregate, cement/SCM, water, and admixture. Their target layouts and motion patterns differ by state.

## Accuracy boundary
The particle scene is an educational conceptual microstructure visualization. It is not molecular dynamics, CFD, DEM, or a validated material model.

## Acceptance
A visual scene is accepted only when:
1. the user can tell what engineering process is being shown;
2. motion changes the explanation, not only the decoration;
3. narration/beat and visual state are synchronized;
4. source context remains available;
5. reduced-motion and mobile states remain usable;
6. the scene has a deterministic reset/replay path.
