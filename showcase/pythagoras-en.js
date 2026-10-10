// Pythagoras' theorem in en: the same board and the same beats, narrated and labelled in the language.
scene({ lang: 'en', beats: [
  { say: "Here is Pythagoras' theorem.", draw: p => {
      write("Pythagoras' theorem", 60, 95, seg(p, 0, .8), { size: 60, color: C.yellow });
      stroke(line([60, 125], [1220, 125]), seg(p, .8, 1), { color: C.yellow, width: 3 });
  } },
  { say: "Take a triangle with one right angle.", draw: p => {
      stroke(line([200, 620], [200, 290]), seg(p, 0, .3));
      stroke(line([200, 620], [640, 620]), seg(p, .3, .6));
      stroke(line([640, 620], [200, 290]), seg(p, .6, .9));
      stroke([[200, 580], [240, 580], [240, 620]], seg(p, .9, 1), { color: C.pink, width: 4 });
  } },
  { say: "Call the two short sides a and b, and the long side c.", draw: p => {
      write('a', 150, 470, seg(p, 0, .3), { size: 56, color: C.blue });
      write('b', 405, 680, seg(p, .3, .6), { size: 56, color: C.green });
      write('c', 440, 430, seg(p, .6, 1), { size: 56, color: C.orange });
  } },
  { say: "Then a squared plus b squared equals c squared.", draw: p => {
      write('a² + b² = c²', 740, 330, p, { size: 72 });
  } },
  { say: "For example, three squared plus four squared is nine plus sixteen, which is twenty five, five squared.", draw: p => {
      write('3² + 4² = 5²', 740, 440, seg(p, 0, .45), { size: 56, color: C.blue });
      write('9 + 16 = 25', 740, 530, seg(p, .45, .9), { size: 56, color: C.blue });
      check(1120, 480, seg(p, .9, 1));
  } },
  { say: "It works for every right triangle.", draw: p => {
      write("every right triangle", 740, 650, seg(p, 0, .8), { size: 44, color: C.yellow });
      stroke(oval(945, 308, 235, 62), seg(p, .8, 1), { color: C.yellow, width: 3 });
  } },
]});
