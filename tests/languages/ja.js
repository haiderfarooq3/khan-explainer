// "A new book" in ja: the word, the phrase, then the same phrase quoted in a Latin label.
scene({ lang: 'ja', beats: [
  { say: "本", draw: p => write("本", 80, 260, p, { size: 130 }) },
  { say: "これは新しい本です。", draw: p => write("新しい本", 640, 500, p, { size: 110, color: C.orange, center: true }) },
  { dur: 1, draw: p => write("book: 本", 640, 660, p, { size: 50, color: C.blue, center: true }) },
]});
