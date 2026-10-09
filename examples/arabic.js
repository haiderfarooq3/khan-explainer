// A 12-second lesson with right-to-left writing. For Arabic or Hebrew, `x` is the right end of the
// text, where the pen starts, and the word is uncovered right to left. The voice still speaks English,
// so `say` spells the sound ("kitaab") while the board shows the real word.
scene({
  beats: [
    { say: 'Arabic is written from right to left.', draw: p => {
        write('Right to left', 60, 85, seg(p, 0, .5), { size: 56, color: C.yellow });
        arrow([1210, 150], [800, 150], seg(p, .5, 1), { color: C.yellow });
    } },
    { say: 'This word is kitaab: a book.', draw: p => {
        write('كِتَابٌ', 1200, 320, seg(p, 0, .6), { size: 130 });
        write('kitaab: a book', 620, 310, seg(p, .6, 1), { size: 40, color: C.blue });
    } },
    { say: 'And this one is jadeed: new.', draw: p => {
        write('جَدِيدٌ', 1200, 490, seg(p, 0, .6), { size: 130, color: C.orange });
        write('jadeed: new', 620, 480, seg(p, .6, 1), { size: 40, color: C.orange });
    } },
    { say: 'Together they say: a new book.', draw: p => {
        write('كِتَابٌ جَدِيدٌ', 640, 660, seg(p, 0, .7), { size: 110, color: C.green, center: true });
        check(960, 610, seg(p, .7, 1));
    } },
  ],
});
