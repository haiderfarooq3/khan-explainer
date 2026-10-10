#!/usr/bin/env node
// Which face each script actually gets on this machine:  node tests/fonts.js
// A face counts as installed when text set in it measures differently from the same text in two generic fallbacks.
const path = require('path');
const { chromium } = require(path.join(__dirname, '../scripts/node_modules/playwright'));
const SAMPLE = { Hebrew: 'ספר', Urdu: 'نئی کتاب', Arabic: 'كتاب', Syriac: 'ܟܬܒܐ', Devanagari: 'किताब', Bengali: 'নতুন বই', Gurmukhi: 'ਕਿਤਾਬ',
                 Gujarati: 'પુસ્તક', Tamil: 'புத்தகம்', Telugu: 'పుస్తకం', Kannada: 'ಪುಸ್ತಕ', Thai: 'หนังสือ', Kana: 'あたらしい', Hangul: '새 책', Han: '新书', Cyrillic: 'книга' };
(async () => {
  const b = await chromium.launch(), pg = await b.newPage();
  await pg.goto('file://' + path.join(__dirname, '../scripts/board.html'));
  const rows = await pg.evaluate(SAMPLE => {
    const c = document.createElement('canvas').getContext('2d'), w = (f, s) => { c.font = `40px ${f}`; return c.measureText(s).width; };
    const has = (fam, s) => ['monospace', 'serif'].some(g => w(`"${fam}",${g}`, s) !== w(g, s));
    const name = k => k.urdu ? 'Urdu' : (k.re.source.match(/Script=(\w+)/) || [])[1]?.replace(/^Hiragana$/, 'Kana') || '?';
    return SCRIPTS.map(k => { const n = name(k), s = SAMPLE[n] || ''; const fams = k.face.split(',').map(f => f.replace(/"/g, ''));
      return { script: n, uses: s ? fams.find(f => has(f, s)) || 'NONE (system fallback)' : '-', tried: fams.join(', ') }; });
  }, SAMPLE);
  await b.close();
  rows.forEach(r => console.log(`${r.script.padEnd(11)} ${r.uses.padEnd(28)} (${r.tried})`));
})();
