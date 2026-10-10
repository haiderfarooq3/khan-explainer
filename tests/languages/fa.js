// "A new book" in fa: the word, the phrase, then the same phrase quoted in a Latin label.
scene({ lang: 'fa', beats: [
  { say: "کتاب", draw: p => write("کتاب", 1200, 260, p, { size: 130 }) },
  { say: "این یک کتاب نو است.", draw: p => write("کتاب نو", 640, 500, p, { size: 110, color: C.orange, center: true }) },
  { dur: 1, draw: p => write("book: کتاب", 640, 660, p, { size: 50, color: C.blue, center: true }) },
]});
