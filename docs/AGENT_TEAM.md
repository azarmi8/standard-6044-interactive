# CRETIQ Agent Team — Operating System

## Mission

Turn CRETIQ 6044 from a technically functional interactive book into a coherent **premium engineering product** whose real UI reaches the quality bar established by the owner's CRETIQ reference render.

The immediate problem is not lack of features. It is the gap between:

**Reference Render → Real Product UI**

The team exists to close that gap without damaging the verified 6044 content or the existing static-first architecture.

## Team topology

```
CRETIQ LEAD
    |
    +-- Creative Director
    +-- UX / Design Systems Architect
    +-- Frontend Engineer
    +-- Motion / Interaction Designer
    +-- Engineering UX Reviewer
    +-- QA / Visual Regression Reviewer
```

The Creative Director and UX Architect establish the visual grammar first. Frontend and Motion implement it. Engineering UX and QA validate it. The Lead synthesizes the result.

## Mission 001 — Workspace Rebuild

### Goal

Rebuild `/workspace` into the first production-quality CRETIQ command surface.

### Starting point

- Base: current `main`
- Related visual work: PR #34 may be inspected as reference, but it is not automatically merged or treated as the new base.
- Preserve existing 6044 logic, routes, local study state, and navigation contracts.

### Acceptance criteria

#### Visual
- The page no longer reads as a generic admin dashboard.
- Typography is restrained and readable; no oversized body copy.
- One coherent industrial/premium visual language is used across hero, navigation, metrics, and content.
- Backgrounds support hierarchy instead of competing with content.
- Layout has deliberate composition and whitespace.
- Visual weight is driven by content and engineering context, not decorative chrome.
- The owner reference render's core DNA is recognizable in the real UI.

#### Interaction
- At least one high-value interaction demonstrates an engineering/QC concept rather than visual decoration.
- Example: an input/value → range evaluation → verdict state.
- Motion communicates transition, cause/effect, focus, progression, or state.
- Reduced-motion provides an equivalent functional experience.

#### Engineering integrity
- No 6044 numbers, clauses, limits, or acceptance criteria are invented or silently changed.
- Existing source-boundary labels remain clear.
- Existing navigation and study-state behavior remains functional.
- No private source PDF enters the public build.

#### Responsive/accessibility
- Desktop and mobile layouts are intentionally designed, not merely stacked.
- RTL reading order remains correct.
- Keyboard navigation remains usable.
- Focus states remain visible.
- Reduced-motion mode is stable.
- No horizontal overflow at supported viewport sizes.

#### QA
- Deterministic static QA passes.
- Browser smoke passes.
- No console errors on affected routes.
- Visual regression/screenshot review passes the product acceptance bar.

## Execution order

### Stage A — Creative direction
Deliver a concise visual contract:
- layout zones
- typography scale
- spacing rhythm
- color roles
- surface/elevation rules
- image/render treatment
- component hierarchy
- do/don't examples

No production coding before this contract exists.

### Stage B — Design system
Translate the contract into reusable CSS variables/classes/components.

### Stage C — Workspace implementation
Rebuild the page using existing architecture and reusable primitives.

### Stage D — Engineering interaction
Add one meaningful QC/engineering interaction.

### Stage E — Visual/functional QA
Run deterministic and browser checks, then perform screenshot-based review.

### Stage F — PR synthesis
The Lead records:
- changed files
- acceptance criteria status
- known limitations
- evidence from tests/review

## Scope guard

Mission 001 is complete when `/workspace` establishes the reusable visual system and interaction bar.

Do **not** automatically redesign every chapter or invent a new feature family in the same mission.

Subsequent pages should inherit the proven system through separate focused tasks.

## External orchestration

Agency Orchestrator may be used as the team planner/dispatcher. It is **not** a runtime dependency of the book and must not be bundled into the website.

The GitHub repository remains the durable source of truth for:
- missions
- role contracts
- branches
- commits
- Pull Requests
- deterministic QA
- release evidence

## Relationship to GitHub Agentic Workflows

GitHub Agentic Workflows (`gh-aw`) can later automate read-only review, CI diagnosis, and controlled issue/PR outputs. Do not give agent workflows unrestricted write or merge authority by default.

The deterministic CI layer remains responsible for builds, tests, browser smoke, and deployment.
