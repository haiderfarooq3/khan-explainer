// One word, "book", in eight languages, each written the way it is written by hand. Arabic, Urdu and Hebrew
// start at their right end (`x` is where the pen starts); everything else runs left to right. Urdu shares
// Arabic's letters, so `lang: 'ur'` asks for its nastaliq hand. The voice speaks English throughout.
scene({
  beats: [
    { say: 'Every language writes the word book its own way.', draw: p => {
        write('book', 60, 85, seg(p, 0, .5), { size: 60, color: C.yellow });
        stroke(line([60, 110], [1220, 110]), seg(p, .5, 1), { color: C.yellow, width: 3 });
    } },
    { say: 'Arabic runs from right to left,', draw: p => {
        write('كِتَابٌ', 1220, 250, seg(p, 0, .7), { size: 100 });
        write('Arabic', 700, 230, seg(p, .7, 1), { size: 34, color: C.blue });
    } },
    { say: 'and Urdu uses the same letters in a slanting hand.', draw: p => {
        write('کتاب', 1220, 410, seg(p, 0, .7), { size: 70, color: C.orange, lang: 'ur' });
        write('Urdu', 700, 380, seg(p, .7, 1), { size: 34, color: C.blue });
    } },
    { say: 'Hebrew runs right to left as well.', draw: p => {
        write('סֵפֶר', 1220, 560, seg(p, 0, .7), { size: 100, color: C.pink });
        write('Hebrew', 700, 530, seg(p, .7, 1), { size: 34, color: C.blue });
        arrow([1220, 640], [900, 640], seg(p, .7, 1), { color: C.yellow });
    } },
    { say: 'Hindi hangs every letter from one line.', draw: p => {
        write('किताब', 60, 250, seg(p, 0, .7), { size: 90, color: C.green });
        write('Hindi', 380, 230, seg(p, .7, 1), { size: 34, color: C.blue });
    } },
    { say: 'Chinese, Japanese and Korean fill a square for each sound.', draw: p => {
        write('书', 60, 400, seg(p, 0, .3), { size: 90, color: C.purple });
        write('本', 170, 400, seg(p, .3, .6), { size: 90, color: C.purple });
        write('책', 280, 400, seg(p, .6, .9), { size: 90, color: C.purple });
        write('CJK', 420, 380, seg(p, .9, 1), { size: 34, color: C.blue });
    } },
    { say: 'And Russian has an alphabet of its own.', draw: p => {
        write('книга', 60, 550, seg(p, 0, .7), { size: 80, color: C.red });
        write('Russian', 380, 530, seg(p, .7, 1), { size: 34, color: C.blue });
        arrow([60, 640], [380, 640], seg(p, .7, 1), { color: C.yellow });
    } },
  ],
});
