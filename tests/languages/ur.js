// "A new book" in ur: the word, the phrase, then the same phrase quoted in a Latin label.
scene({ lang: 'ur', beats: [
  { say: "کتاب", draw: p => write("کتاب", 1200, 260, p, { size: 130 }) },
  { say: "یہ ایک نئی کتاب ہے۔", draw: p => write("نئی کتاب", 640, 500, p, { size: 110, color: C.orange, center: true }) },
  { dur: 1, draw: p => write("book: کتاب", 640, 660, p, { size: 50, color: C.blue, center: true }) },
]});
