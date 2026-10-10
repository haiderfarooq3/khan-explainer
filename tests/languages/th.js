// "A new book" in th: the word, the phrase, then the same phrase quoted in a Latin label.
scene({ lang: 'th', beats: [
  { say: "หนังสือ", draw: p => write("หนังสือ", 80, 260, p, { size: 130 }) },
  { say: "นี่คือหนังสือใหม่", draw: p => write("หนังสือใหม่", 640, 500, p, { size: 110, color: C.orange, center: true }) },
  { dur: 1, draw: p => write("book: หนังสือ", 640, 660, p, { size: 50, color: C.blue, center: true }) },
]});
