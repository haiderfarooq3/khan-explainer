// "A new book" in zh: the word, the phrase, then the same phrase quoted in a Latin label.
scene({ lang: 'zh', beats: [
  { say: "书", draw: p => write("书", 80, 260, p, { size: 130 }) },
  { say: "这是一本新书。", draw: p => write("新书", 640, 500, p, { size: 110, color: C.orange, center: true }) },
  { dur: 1, draw: p => write("book: 书", 640, 660, p, { size: 50, color: C.blue, center: true }) },
]});
