# CORE BOOK ENGINE — Architecture Contract

## Purpose

The 6044 interactive book uses one shared runtime for chapter playback and scene state. A chapter supplies content/configuration; the engine owns navigation, lifecycle, accessibility and playback.

## Contract

### Required chapter configuration

`window.BOOK_CONFIG` may provide:

- `interval`: automatic beat interval in milliseconds.
- `beats[]`: ordered learning beats with `title` and `body`.
- `quiz`: shared correct/incorrect feedback.
- `onRender(index, beat)`: chapter-specific rendering hook.
- `onEnter(index, beat)`: scene initialization hook.
- `onBeatStart(index, beat)`: beat activation hook.
- `onBeatEnd(index, beat)`: beat cleanup hook.
- `onPlay(index, beat)`, `onPause(index, beat)`: playback hooks.
- `onExit(index, beat)`: lifecycle cleanup hook.

The optional `scene` object may provide the same lifecycle callbacks for a more explicit scene namespace.

## Declarative scene targets

Any SVG/HTML element with:

`data-beat="N"`

is automatically activated when beat N is active.

Multiple beats are supported:

`data-beat="1 3 5"`

The engine toggles `is-active` and `aria-hidden`. CSS supplies the default visual transition.

This means simple scenes do not need chapter-specific JavaScript.

## Lifecycle

`enter → render → beatStart → [play/pause] → beatEnd → render → beatStart → exit`

The lifecycle is intentionally small. Complex visual behavior belongs in a chapter's configuration hook only when declarative targets are insufficient.

## Ownership

Engine owns:
- playback state
- current beat
- navigation
- progress
- keyboard controls
- fullscreen
- reduced motion
- visibility pause
- shared quiz feedback
- declarative beat activation

Chapter owns:
- source-grounded content
- scene markup
- optional custom visual hooks
- chapter-specific assessment content

## Design rule

If the same behavior is needed by multiple chapters, move it into the engine rather than copying it into chapter files.

## Pilot acceptance

The engine must support at least:
1. narrative chapter,
2. reference-heavy chapter,
3. numeric/engineering chapter,

without changing the engine.

Current pilot set: ch01, ch02, ch10.
