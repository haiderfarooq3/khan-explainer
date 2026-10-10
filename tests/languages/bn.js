// "A new book" in bn: the word, the phrase, then the same phrase quoted in a Latin label.
scene({ lang: 'bn', beats: [
  { say: "বই", draw: p => write("বই", 80, 260, p, { size: 130 }) },
  { say: "এটা একটা নতুন বই।", draw: p => write("নতুন বই", 640, 500, p, { size: 110, color: C.orange, center: true }) },
  { dur: 1, draw: p => write("book: বই", 640, 660, p, { size: 50, color: C.blue, center: true }) },
]});
