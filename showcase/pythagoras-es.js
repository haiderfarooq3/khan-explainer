// Pythagoras' theorem in es: the same board and the same beats, narrated and labelled in the language.
scene({ lang: 'es', beats: [
  { say: "Este es el teorema de Pitágoras.", draw: p => {
      write("Teorema de Pitágoras", 60, 95, seg(p, 0, .8), { size: 60, color: C.yellow });
      stroke(line([60, 125], [1220, 125]), seg(p, .8, 1), { color: C.yellow, width: 3 });
  } },
  { say: "Toma un triángulo con un ángulo recto.", draw: p => {
      stroke(line([200, 620], [200, 290]), seg(p, 0, .3));
      stroke(line([200, 620], [640, 620]), seg(p, .3, .6));
      stroke(line([640, 620], [200, 290]), seg(p, .6, .9));
      stroke([[200, 580], [240, 580], [240, 620]], seg(p, .9, 1), { color: C.pink, width: 4 });
  } },
  { say: "Llama a y b a los lados cortos, y c al lado largo.", draw: p => {
      write('a', 150, 470, seg(p, 0, .3), { size: 56, color: C.blue });
      write('b', 405, 680, seg(p, .3, .6), { size: 56, color: C.green });
      write('c', 440, 430, seg(p, .6, 1), { size: 56, color: C.orange });
  } },
  { say: "Entonces, a al cuadrado más b al cuadrado es igual a c al cuadrado.", draw: p => {
      write('a² + b² = c²', 740, 330, p, { size: 72 });
  } },
  { say: "Por ejemplo, tres al cuadrado más cuatro al cuadrado es nueve más dieciséis, o sea veinticinco, cinco al cuadrado.", draw: p => {
      write('3² + 4² = 5²', 740, 440, seg(p, 0, .45), { size: 56, color: C.blue });
      write('9 + 16 = 25', 740, 530, seg(p, .45, .9), { size: 56, color: C.blue });
      check(1120, 480, seg(p, .9, 1));
  } },
  { say: "Funciona con todo triángulo rectángulo.", draw: p => {
      write("todo triángulo rectángulo", 740, 650, seg(p, 0, .8), { size: 44, color: C.yellow });
      stroke(oval(945, 308, 235, 62), seg(p, .8, 1), { color: C.yellow, width: 3 });
  } },
]});
