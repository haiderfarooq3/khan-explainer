// "A new book" in ko: the word, the phrase, then the same phrase quoted in a Latin label.
scene({ lang: 'ko', beats: [
  { say: "책", draw: p => write("책", 80, 260, p, { size: 130 }) },
  { say: "이것은 새 책입니다.", draw: p => write("새 책", 640, 500, p, { size: 110, color: C.orange, center: true }) },
  { dur: 1, draw: p => write("book: 책", 640, 660, p, { size: 50, color: C.blue, center: true }) },
]});
