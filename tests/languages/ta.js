// "A new book" in ta: the word, the phrase, then the same phrase quoted in a Latin label.
scene({ lang: 'ta', beats: [
  { say: "புத்தகம்", draw: p => write("புத்தகம்", 80, 260, p, { size: 130 }) },
  { say: "இது ஒரு புதிய புத்தகம்.", draw: p => write("புதிய புத்தகம்", 640, 500, p, { size: 110, color: C.orange, center: true }) },
  { dur: 1, draw: p => write("book: புத்தகம்", 640, 660, p, { size: 50, color: C.blue, center: true }) },
]});
