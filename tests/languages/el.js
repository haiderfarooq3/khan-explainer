// "A new book" in el: the word, the phrase, then the same phrase quoted in a Latin label.
scene({ lang: 'el', beats: [
  { say: "βιβλίο", draw: p => write("βιβλίο", 80, 260, p, { size: 130 }) },
  { say: "Αυτό είναι ένα νέο βιβλίο.", draw: p => write("νέο βιβλίο", 640, 500, p, { size: 110, color: C.orange, center: true }) },
  { dur: 1, draw: p => write("book: βιβλίο", 640, 660, p, { size: 50, color: C.blue, center: true }) },
]});
