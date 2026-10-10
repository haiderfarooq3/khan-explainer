// "A new book" in ru: the word, the phrase, then the same phrase quoted in a Latin label.
scene({ lang: 'ru', beats: [
  { say: "книга", draw: p => write("книга", 80, 260, p, { size: 130 }) },
  { say: "Это новая книга.", draw: p => write("новая книга", 640, 500, p, { size: 110, color: C.orange, center: true }) },
  { dur: 1, draw: p => write("book: книга", 640, 660, p, { size: 50, color: C.blue, center: true }) },
]});
