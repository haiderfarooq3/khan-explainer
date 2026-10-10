#!/usr/bin/env node
// Render a blackboard explainer:  node render.js <scene.js> <out.mp4>
// The voice drives the clock: each beat is spoken first and its measured length
// times that beat's drawing, so voice and pen stay in sync without guessing.
const { execFileSync, spawn, spawnSync } = require('child_process');
const { once } = require('events');
const fs = require('fs'), os = require('os'), path = require('path'), crypto = require('crypto');

const FPS = 30, LEAD = 0.3, GAP = 0.15, TAIL = 1.0;   // seconds: before the first word, between beats, hold at the end
const [sceneFile, out] = process.argv.slice(2);
const die = m => { console.error(m); process.exit(1); };
if (!sceneFile || !out) die('usage: node render.js <scene.js> <out.mp4>');
const MAC = process.platform === 'darwin';   // elsewhere espeak-ng stands in for `say`: rougher, but it speaks about a hundred languages
let chromium;
try { ({ chromium } = require('playwright')); }
catch { die(`playwright missing. Run: cd ${__dirname} && npm install && npx playwright install chromium`); }

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'khan-'));
const probe = f => parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]));
const jpeg = dataUrl => Buffer.from(dataUrl.split(',')[1], 'base64');

// ponytail: one `say` take per beat, so intonation resets at every beat and the voice is robotic.
// Upgrade: a single full take + forced alignment (whisper.cpp) for word timings, or return a
// Chatterbox/Piper file from here for a human voice. Anything that writes an audio file works.
// A scene's `lang` picks the free voice that speaks it; `voice` names one outright.
const SAY = { en: 'Samantha', ar: 'Majed', he: 'Carmit', hi: 'Lekha', zh: 'Tingting', ja: 'Kyoko', ko: 'Yuna', th: 'Kanya',
              ru: 'Milena', el: 'Melina', tr: 'Yelda', id: 'Damayanti', es: 'Mónica', fr: 'Thomas', de: 'Anna', it: 'Alice', pt: 'Luciana',
              bn: 'Piya', ta: 'Vani', te: 'Geeta', kn: 'Soumya', uk: 'Lesya', vi: 'Linh', pl: 'Zosia', nl: 'Xander', sv: 'Alva', ms: 'Amira' };
const ESPEAK = { en: 'en-us', zh: 'cmn' };   // every other code is espeak-ng's own: ur, fa, bn, ta, ...
function voiceFor(meta) {
  const lang = meta.lang || 'en';
  if (!MAC) {
    try { execFileSync('espeak-ng', ['--version'], { stdio: 'ignore' }); }
    catch { die('the free voice needs macOS `say`, or espeak-ng on other systems (apt install espeak-ng)'); }
    return meta.voice || ESPEAK[lang] || lang;
  }
  const voice = meta.voice || SAY[lang];
  if (!voice) die(`macOS has no built-in voice for lang '${lang}'. Name one with \`voice\`, or use \`eleven\` or \`audio\`.`);
  if (!execFileSync('say', ['-v', '?'], { encoding: 'utf8' }).split('\n').some(l => l.startsWith(voice + ' ')))
    die(`the voice ${voice} is not installed. Add it in System Settings > Accessibility > Spoken Content > System voice > Manage Voices.`);
  return voice;
}
function tts(text, i, voice, rate) {
  const txt = path.join(tmp, `${i}.txt`), audio = path.join(tmp, MAC ? `${i}.aiff` : `${i}.wav`);
  fs.writeFileSync(txt, text);
  if (MAC) execFileSync('say', ['-v', voice, '-r', String(rate), '-o', audio, '-f', txt]);
  else execFileSync('espeak-ng', ['-v', voice, '-s', String(rate), '-w', audio, '-f', txt]);
  return audio;
}

// Optional human voice: put ELEVENLABS_API_KEY in the environment and `eleven: '<voice id>'` on the scene.
// The whole script is read in ONE take, so it flows like one person talking, then cut back into beats
// at the character times the API returns. Takes are cached beside the scene, so re-rendering the same
// words costs nothing: fix the drawing as often as you like.
async function elevenTakes(beats, opt, dir) {
  const o = typeof opt === 'string' ? { voice: opt } : opt;
  if (!o.voice) die('`eleven` needs a voice id: eleven: \'<voice id>\' or eleven: { voice: \'<voice id>\' }');
  const said = beats.map((b, i) => ({ i, text: b.say })).filter(b => b.text), text = said.map(b => b.text).join(' ');
  const body = JSON.stringify({ text, model_id: o.model || 'eleven_multilingual_v2', voice_settings: o.settings });
  const cache = path.join(dir, '.voice', crypto.createHash('sha1').update(o.voice + body).digest('hex').slice(0, 12) + '.json');
  if (!fs.existsSync(cache)) {
    const key = process.env.ELEVENLABS_API_KEY;
    if (!key) die('the scene sets `eleven`, so ELEVENLABS_API_KEY must be set. Remove `eleven` to use the free Mac voice.');
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${o.voice}/with-timestamps`, { method: 'POST', headers: { 'xi-api-key': key, 'content-type': 'application/json' }, body });
    if (!r.ok) die(`ElevenLabs ${r.status}: ${await r.text()}`);
    fs.mkdirSync(path.dirname(cache), { recursive: true });
    fs.writeFileSync(cache, await r.text());
  }
  const take = JSON.parse(fs.readFileSync(cache)), { character_start_times_seconds: starts, character_end_times_seconds: ends } = take.alignment;
  if (starts.length !== text.length) die(`ElevenLabs timed ${starts.length} characters for a ${text.length}-character script. Keep \`say\` to plain text.`);
  const mp3 = path.join(tmp, 'take.mp3'), wav = path.join(tmp, 'take.wav');
  fs.writeFileSync(mp3, Buffer.from(take.audio_base64, 'base64'));
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', mp3, '-ar', '48000', wav]);
  // Cut halfway through the pause between one beat's last character and the next beat's first, on a
  // whole millisecond, so the pieces land back together sample-exact.
  const cuts = [0];
  let pos = 0;
  said.slice(0, -1).forEach(b => { pos += b.text.length + 1; cuts.push(Math.round((ends[pos - 2] + starts[pos]) * 500) / 1000); });
  cuts.push(probe(wav));
  return Object.fromEntries(said.map((b, k) => {
    const f = path.join(tmp, `${b.i}.wav`);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', wav, '-af', `atrim=start=${cuts[k]}:end=${cuts[k + 1]}`, f]);
    return [b.i, f];
  }));
}

// Optional local human voice: `kokoro: true` (or a voice name, or { voice, speed }) on the scene, or
// KHAN_TTS=kokoro to try it on any scene. Free and offline after the first model download; it speaks
// English, Spanish, French, Hindi, Italian, Japanese, Portuguese and Chinese. Takes are cached beside the scene.
const KOKORO = { en: 'af_heart', 'en-gb': 'bf_emma', es: 'ef_dora', fr: 'ff_siwis', hi: 'hf_alpha', it: 'if_sara', ja: 'jf_alpha', pt: 'pf_dora', zh: 'zf_xiaobei' };
function kokoroTakes(meta, dir) {
  const o = typeof meta.kokoro === 'string' ? { voice: meta.kokoro } : meta.kokoro === true || !meta.kokoro ? {} : meta.kokoro;
  const voice = o.voice || KOKORO[meta.lang || 'en'];
  if (!voice) {
    if (meta.kokoro) die(`Kokoro does not speak lang '${meta.lang}'. It speaks ${Object.keys(KOKORO).join(', ')}.`);
    return null;   // only KHAN_TTS asked for it: this language keeps the built-in voice
  }
  const said = meta.beats.map((b, i) => ({ i, text: b.say })).filter(b => b.text), speed = o.speed || 1;
  const cache = path.join(dir, '.voice', 'kokoro');
  const lines = said.map(b => ({ i: b.i, text: b.text, out: path.join(cache, crypto.createHash('sha1').update(`${voice} ${speed} ${b.text}`).digest('hex').slice(0, 12) + '.wav') }));
  const todo = lines.filter(l => !fs.existsSync(l.out));
  if (todo.length) {
    fs.mkdirSync(cache, { recursive: true });
    const py = process.env.KHAN_PYTHON || 'python3';
    const r = spawnSync(py, [path.join(__dirname, 'kokoro_tts.py')], { input: JSON.stringify({ voice, speed, lines: todo }), stdio: ['pipe', 'inherit', 'inherit'] });
    if (r.status !== 0) die(`Kokoro failed. Install it with: ${py} -m pip install kokoro soundfile (set KHAN_PYTHON to use another Python)`);
  }
  return Object.fromEntries(lines.map(l => [l.i, l.out]));
}

(async () => {
  const browser = await chromium.launch(), page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto('file://' + path.join(__dirname, 'board.html'));
  // The scene gets its own scope: a scene variable named like a helper (box, line, ring) must not be a redeclaration error.
  await page.addScriptTag({ content: `(() => {\n${fs.readFileSync(path.resolve(sceneFile), 'utf8')}\n})();` });
  const meta = await page.evaluate(() => window.sceneMeta());
  if (errs.length || !meta) die(`scene failed to load: ${errs.join('; ') || 'scene({...}) was never called'}`);

  if (process.env.KHAN_THEME) await page.evaluate(t => window.setTheme(t), process.env.KHAN_THEME);   // KHAN_THEME=light re-skins any scene
  // Screenshot backgrounds go in as data URLs: a file:// image would taint the canvas and block toDataURL.
  const dir = path.dirname(path.resolve(sceneFile));
  const mime = f => 'image/' + ({ jpg: 'jpeg' }[path.extname(f).slice(1).toLowerCase()] || path.extname(f).slice(1).toLowerCase());
  await page.evaluate(m => window.loadImages(m), Object.fromEntries(meta.bgs.map(f => [f, `data:${mime(f)};base64,` + fs.readFileSync(path.resolve(dir, f)).toString('base64')])));

  const takes = meta.eleven && !meta.audio ? await elevenTakes(meta.beats, meta.eleven, dir) : null;
  const kok = !meta.audio && !takes && (meta.kokoro || process.env.KHAN_TTS === 'kokoro') ? kokoroTakes(meta, dir) : null;
  const voice = meta.audio || takes || kok ? null : voiceFor(meta);
  if (!meta.audio) console.log(`voice ${takes ? 'ElevenLabs' : kok ? 'Kokoro' : voice}`);
  const gap = meta.gap ?? (takes ? 0 : GAP);   // scene-level `gap` slows the pace: more air between beats. One take already has its own pauses.
  let at = LEAD;
  const clips = [];
  let timings, total;
  if (meta.audio) {
    // Recorded voice: the audio file is the clock. Each beat starts at its `at` (seconds into the
    // file, from a word-level transcript) and draws until the next beat starts, or for its `dur`.
    const f = path.resolve(dir, meta.audio);
    total = probe(f) + TAIL / 2;   // a short hold on the finished board after the last word
    clips.push({ f, at: 0 });
    timings = meta.beats.map((b, i) => {
      if (typeof b.at !== 'number') die(`beat ${i + 1} needs \`at\` (seconds into ${meta.audio})`);
      const next = meta.beats[i + 1]?.at ?? total;
      if (next <= b.at) die(`beat ${i + 1} starts at ${b.at}s, not before the next beat (${next}s)`);
      return { start: b.at, dur: Math.min(b.dur || Infinity, next - b.at - 0.02) };   // finish a hair early, so the QA frame of a beat is not the next beat's wiped board
    });
  } else {
    timings = meta.beats.map((b, i) => {
      let dur = b.dur || 1;
      if (b.say) { const f = takes ? takes[i] : kok ? kok[i] : tts(b.say, i, voice, meta.rate); dur = probe(f); clips.push({ f, at }); }
      const t = { start: at, dur: gap < 0.03 ? dur - 0.02 : dur };   // back to back, finish a hair early: the QA frame must not be the next beat's board
      at += dur + gap;
      return t;
    });
    total = at - gap + TAIL;
  }
  await page.evaluate(t => window.setTimings(t), timings);
  await page.evaluate(() => document.fonts.ready);

  const args = ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-'];
  clips.forEach(c => args.push('-i', c.f));
  if (clips.length) {
    const delayed = clips.map((c, i) => `[${i + 1}:a]aresample=48000,adelay=${Math.round(c.at * 1000)}:all=1[a${i}]`).join(';');
    const mix = clips.map((_, i) => `[a${i}]`).join('') + `amix=inputs=${clips.length}:normalize=0,apad[a]`;
    args.push('-filter_complex', `${delayed};${mix}`, '-map', '0:v', '-map', '[a]', '-c:a', 'aac', '-b:a', '160k', '-ac', '2');
  }
  args.push('-t', total.toFixed(3), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-movflags', '+faststart', out);
  const ff = spawn('ffmpeg', args, { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < Math.ceil(total * FPS); i++) {
    const buf = jpeg(await page.evaluate(t => window.frame(t), i / FPS));
    if (!ff.stdin.write(buf)) await once(ff.stdin, 'drain');
  }
  ff.stdin.end();
  await once(ff, 'close');

  // QA sheet: the board as it stands at the end of every beat, tiled into one image.
  for (let i = 0; i < timings.length; i++)
    fs.writeFileSync(path.join(tmp, `b${String(i).padStart(3, '0')}.jpg`), jpeg(await page.evaluate(t => window.frame(t), timings[i].start + timings[i].dur + 0.01)));   // +0.01: land past the beat's last stroke
  const sheet = path.join(tmp, 'sheet.jpg');
  const cols = meta.size[0] < meta.size[1] ? 6 : 3;   // a vertical board tiles six across so the sheet stays readable
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '1', '-i', path.join(tmp, 'b%03d.jpg'),
    '-vf', `scale=${cols === 3 ? 640 : 300}:-1,tile=${cols}x${Math.ceil(timings.length / cols)}`, '-frames:v', '1', sheet]);
  const warns = await page.evaluate(() => window.warnings());
  await browser.close();

  timings.forEach((t, i) => console.log(`beat ${i + 1}  ${t.start.toFixed(2)}s  +${t.dur.toFixed(2)}s  ${meta.beats[i].say || (meta.audio ? '' : '(silent)')}`));
  warns.forEach(w => console.log('WARN ' + w));
  console.log('sheet ' + sheet);
  const got = probe(out);
  if (Math.abs(got - total) > 0.1) die(`FAIL ${out} is ${got}s, expected ${total.toFixed(2)}s`);
  console.log(`ok ${out} ${got.toFixed(2)}s`);
})().catch(e => die(e.stack || String(e)));
