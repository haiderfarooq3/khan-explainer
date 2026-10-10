// "A new book" in es: the word, the phrase, then the same phrase quoted in a Latin label.
scene({ lang: 'es', beats: [
  { say: "libro", draw: p => write("libro", 80, 260, p, { size: 130 }) },
  { say: "Este es un libro nuevo.", draw: p => write("libro nuevo", 640, 500, p, { size: 110, color: C.orange, center: true }) },
  { dur: 1, draw: p => write("book: libro", 640, 660, p, { size: 50, color: C.blue, center: true }) },
]});
