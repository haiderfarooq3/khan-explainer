// "A new book" in he: the word, the phrase, then the same phrase quoted in a Latin label.
scene({ lang: 'he', beats: [
  { say: "סֵפֶר", draw: p => write("סֵפֶר", 1200, 260, p, { size: 130 }) },
  { say: "זה ספר חדש.", draw: p => write("סֵפֶר חָדָשׁ", 640, 500, p, { size: 110, color: C.orange, center: true }) },
  { dur: 1, draw: p => write("book: סֵפֶר", 640, 660, p, { size: 50, color: C.blue, center: true }) },
]});
