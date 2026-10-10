// "A new book" in fr: the word, the phrase, then the same phrase quoted in a Latin label.
scene({ lang: 'fr', beats: [
  { say: "livre", draw: p => write("livre", 80, 260, p, { size: 130 }) },
  { say: "Voici un nouveau livre.", draw: p => write("nouveau livre", 640, 500, p, { size: 110, color: C.orange, center: true }) },
  { dur: 1, draw: p => write("book: livre", 640, 660, p, { size: 50, color: C.blue, center: true }) },
]});
