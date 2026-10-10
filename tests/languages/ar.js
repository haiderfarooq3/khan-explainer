// "A new book" in ar: the word, the phrase, then the same phrase quoted in a Latin label.
scene({ lang: 'ar', beats: [
  { say: "كِتَابٌ", draw: p => write("كِتَابٌ", 1200, 260, p, { size: 130 }) },
  { say: "هذا كتاب جديد.", draw: p => write("كِتَابٌ جَدِيدٌ", 640, 500, p, { size: 110, color: C.orange, center: true }) },
  { dur: 1, draw: p => write("book: كِتَابٌ", 640, 660, p, { size: 50, color: C.blue, center: true }) },
]});
