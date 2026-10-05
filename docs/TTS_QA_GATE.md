# TTS QA Gate

## Generation
Use `tools/tts/generate_piper.py` with a local Piper executable and a Persian model.

The repository does **not** contain model weights.

## Before accepting audio

For every generated Beat:

- [ ] audio opens and duration is non-zero
- [ ] spokenText matches intended pronunciation
- [ ] Persian words are intelligible
- [ ] numbers are read correctly
- [ ] units are read correctly
- [ ] ASTM / ISIRI / SCC / fc are checked
- [ ] no clipped first/last syllable
- [ ] pauses are natural
- [ ] transcript/displayText remains unchanged
- [ ] SHA-256 in manifest matches the generated file

## Release rule

`generated` is not `reviewed`.

Only human-reviewed audio may become release narration.

## Pilot

Chapter 7 has six narration beats. It is the first candidate for the human listening benchmark.
