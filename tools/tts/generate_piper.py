#!/usr/bin/env python3
"""Generate Persian narration audio with a local Piper executable.

No model is bundled with the repository. Example:
  python tools/tts/generate_piper.py --manifest books/6044-1397/NARRATION_MANIFEST.json \
    --piper C:\\tts\\piper\\piper.exe --model C:\\tts\\models\\fa_IR-amir-medium.onnx

The script writes WAV files and updates the manifest. It never changes sourceText/displayText.
"""
from __future__ import annotations
import argparse, hashlib, json, subprocess, wave
from pathlib import Path

def sha256(path: Path) -> str:
    h=hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda:f.read(1024*1024), b""):
            h.update(chunk)
    return h.hexdigest()

def duration_ms(path: Path) -> int:
    with wave.open(str(path),"rb") as w:
        rate=w.getframerate()
        return round(w.getnframes()*1000/rate) if rate else 0

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--manifest",required=True)
    ap.add_argument("--piper",required=True)
    ap.add_argument("--model",required=True)
    ap.add_argument("--output-root",default="site/6044-1397/audio/fa")
    ap.add_argument("--chapter",type=int)
    ap.add_argument("--provider",default="piper")
    ap.add_argument("--model-name",default="fa_IR-amir-medium")
    args=ap.parse_args()

    manifest_path=Path(args.manifest)
    data=json.loads(manifest_path.read_text(encoding="utf-8"))
    items=data.get("items",[])
    out=Path(args.output_root)
    out.mkdir(parents=True,exist_ok=True)
    changed=False

    for item in items:
        if args.chapter and item["chapter"] != args.chapter:
            continue
        text=item.get("spokenText") or item.get("sourceText") or ""
        if not text.strip():
            item["status"]="rejected"
            continue
        target=out/f'ch{item["chapter"]:02d}-b{item["beat"]:02d}.wav'
        cmd=[args.piper,"--model",args.model,"--output_file",str(target)]
        subprocess.run(cmd,input=text,text=True,check=True)
        item.update({
            "audio":str(target).replace("\\","/"),
            "status":"generated",
            "provider":args.provider,
            "model":args.model_name,
            "durationMs":duration_ms(target),
            "sha256":sha256(target),
        })
        changed=True

    if changed:
        manifest_path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print("Generated narration audio." if changed else "No matching narration items.")

if __name__=="__main__":
    main()
