# 6044 Persian TTS Pipeline

Provider-neutral local pipeline contract for Phase 5.

## Inputs
- narration config containing `displayText` and optional `spokenText`
- pronunciation dictionary
- selected local TTS provider/model

## Outputs
- `site/6044-1397/audio/fa/chNN-bNN.wav` or another browser-compatible format
- manifest with source beat, provider, model, duration and checksum

## Rules
1. Never modify source/display text.
2. Prefer `spokenText` for synthesis when present.
3. Fail closed if a referenced model is missing.
4. Never commit model weights to the repository.
5. Audio is not release-ready until human pronunciation review passes.
6. Keep provider selection outside the book engine.

## Current benchmark candidate
Piper `fa_IR` is the primary local benchmark family. The official Piper voice catalog lists Persian voices including Amir, Ganji, Ganji Adabi, Gyro and Reza Ibrahim. 
