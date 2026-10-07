# Agency Orchestrator Mission 001 — CRETIQ Workspace

You are the orchestration layer for the CRETIQ 6044 repository.

## Objective

Coordinate a specialist team to rebuild the existing `/workspace` page to a premium industrial engineering standard, using the owner's CRETIQ reference render as the visual North Star.

## Required team

- Creative Director
- UX / Design Systems Architect
- Frontend Engineer
- Motion / Interaction Designer
- Engineering UX Reviewer
- QA / Visual Regression Reviewer
- CRETIQ Lead for final synthesis

## Hard constraints

- Start from current `main`.
- Do not merge PR #34 automatically.
- Do not modify or weaken 6044 source-verification contracts.
- Do not invent standard values, clauses, limits, or tests.
- Do not add paid or mandatory runtime dependencies.
- Do not replace the static-first architecture unless a task proves it is necessary.
- Do not use decorative animation as a substitute for product interaction.
- Do not declare success from CI alone.

## Required workflow

1. Inspect repository instructions and the current `main`.
2. Inspect PR #34 and existing visual assets only as reference material.
3. Creative Director produces the visual contract.
4. UX Architect converts it to reusable tokens/primitives.
5. Frontend Engineer implements the workspace.
6. Motion Designer adds only meaningful motion.
7. Engineering UX Reviewer checks domain clarity.
8. QA Reviewer runs deterministic and browser checks and reports visual defects.
9. Lead synthesizes the results into one focused Pull Request.

## Definition of done

The final PR must demonstrate:
- restrained, professional typography
- coherent hierarchy
- intentional background composition
- non-generic CRETIQ visual identity
- at least one meaningful engineering/QC interaction
- desktop/mobile/reduced-motion support
- no 6044 content regression
- passing deterministic QA
- passing browser smoke
- no console errors on affected routes

## Deliverable

One focused PR titled:

`feat: rebuild CRETIQ workspace with agent-team design system`

The PR must contain the implementation plus the visual/QA evidence needed for human acceptance.
