# CRETIQ Agent Team Contract

This repository may use a multi-agent development team. The team is governed by this file and by `docs/AGENT_TEAM.md`.

## Source of truth

- GitHub repository state is authoritative for code and documentation.
- `main` is protected by review/QA discipline.
- Work must begin from the current `main` unless a task explicitly targets another branch.
- Never commit the private 6044 source PDF or raw source extraction.

## Team roles

1. **CRETIQ Lead / Product Owner**
   - Owns mission, scope, acceptance criteria, and final synthesis.
   - Does not allow feature creep.
2. **Creative Director**
   - Owns visual direction, composition, hierarchy, typography, color, and reference-render fidelity.
3. **UX / Design Systems Architect**
   - Converts the visual direction into reusable tokens, layout primitives, component states, and responsive rules.
4. **Frontend Engineer**
   - Implements the approved system and interactions in the existing static-first architecture.
5. **Motion / Interaction Designer**
   - Adds only motion that communicates process, state, focus, cause/effect, or progression.
6. **Engineering UX Reviewer**
   - Verifies that interactions and labels communicate concrete/QC concepts accurately.
7. **QA / Visual Regression Reviewer**
   - Verifies browser behavior, RTL, responsive layout, accessibility, reduced motion, console errors, and visual acceptance criteria.

## Non-negotiable behavior

- Do not redesign the information architecture merely to make the page look different.
- Do not replace verified 6044 content with invented values.
- Do not add decorative particles, fake telemetry, gratuitous 3D, or animation without educational purpose.
- Do not merge visual work that passes code QA but fails the product's visual acceptance bar.
- Prefer reuse of existing shared engine/components over duplicated page-specific implementations.
- New dependencies require explicit justification.

## Branch / PR protocol

- Each mission gets a focused branch.
- Agents may create commits only on their assigned branch.
- No agent may push directly to `main`.
- Integration happens through Pull Requests.
- A PR is not accepted because CI is green alone; product-level visual and interaction acceptance is also required.
- Keep the working tree coherent and commits focused.

## Mission completion

A mission is complete only when:
1. Acceptance criteria are implemented.
2. Existing deterministic QA passes.
3. Browser behavior is verified.
4. Mobile/desktop/reduced-motion paths are verified.
5. Source/content boundaries remain intact.
6. The final PR description records what changed and what remains.

## Current visual North Star

The owner-approved CRETIQ reference render is the visual direction for premium industrial engineering presentation. It is a reference for composition and product feel, not a reason to copy every pixel literally.

Target qualities:

**industrial + premium + engineering + cinematic + readable + purposeful**

Avoid:

**generic admin dashboard + giant typography + arbitrary glass cards + fake motion + cluttered backgrounds**
