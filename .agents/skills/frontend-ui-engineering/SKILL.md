---
name: frontend-ui-engineering
description: Production-quality frontend engineering baseline for accessible, responsive, maintainable UI.
---

# Frontend UI Engineering — Project Adapter

Source inspiration: addyosmani/agent-skills — frontend-ui-engineering.

Use for user-facing HTML/CSS/JS changes where correctness must survive real interaction, responsive layouts, accessibility, and maintenance.

## Hard gates
- Semantic HTML and keyboard access for every interaction.
- Visible focus; never remove outlines without an equivalent.
- Explicit default, hover, active, focus-visible, disabled, loading, error and success states where applicable.
- Reserve image space, lazy-load below-fold media, and avoid unnecessary runtime work.
- Keep CSS/JS state local and understandable; avoid hidden global side effects.
- Prefer real content/assets over placeholders and never fabricate metrics or status.
- Validate desktop/mobile and reduced-motion behavior.
- Test the rendered artifact, not only source strings.
