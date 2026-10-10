// "A new book" in hi: the word, the phrase, then the same phrase quoted in a Latin label.
scene({ lang: 'hi', beats: [
  { say: "किताब", draw: p => write("किताब", 80, 260, p, { size: 130 }) },
  { say: "यह एक नई किताब है।", draw: p => write("नई किताब", 640, 500, p, { size: 110, color: C.orange, center: true }) },
  { dur: 1, draw: p => write("book: किताब", 640, 660, p, { size: 50, color: C.blue, center: true }) },
]});
