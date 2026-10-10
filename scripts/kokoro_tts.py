#!/usr/bin/env python3
# Kokoro: a free, local, human-sounding voice (https://huggingface.co/hexgrad/Kokoro-82M).
# render.js pipes in {"voice": "af_heart", "speed": 1.0, "lines": [{"text": ..., "out": "0.wav"}]};
# one process speaks every line, so the model loads once. Setup: pip install kokoro soundfile
# (Japanese: "misaki[ja]" then python -m unidic download; Chinese: "misaki[zh]").
import json, sys
import numpy as np, soundfile as sf
from kokoro import KPipeline

job = json.load(sys.stdin)
pipe = KPipeline(lang_code=job['voice'][0], repo_id='hexgrad/Kokoro-82M')   # the voice's first letter is its language
for line in job['lines']:
    parts = [r.audio for r in pipe(line['text'], voice=job['voice'], speed=job.get('speed', 1.0)) if r.audio is not None]
    if not parts: sys.exit(f'kokoro produced no audio for: {line["text"]}')
    sf.write(line['out'], np.concatenate([p.numpy() if hasattr(p, 'numpy') else p for p in parts]), 24000)
