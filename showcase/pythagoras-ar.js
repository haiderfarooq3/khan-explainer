// Pythagoras' theorem in ar: the same board and the same beats, narrated and labelled in the language.
scene({ lang: 'ar', beats: [
  { say: "هذه مبرهنة فيثاغورس.", draw: p => {
      write("مبرهنة فيثاغورس", 1220, 95, seg(p, 0, .8), { size: 96, color: C.yellow });
      stroke(line([60, 125], [1220, 125]), seg(p, .8, 1), { color: C.yellow, width: 3 });
  } },
  { say: "لنأخذ مثلثاً فيه زاوية قائمة.", draw: p => {
      stroke(line([200, 620], [200, 290]), seg(p, 0, .3));
      stroke(line([200, 620], [640, 620]), seg(p, .3, .6));
      stroke(line([640, 620], [200, 290]), seg(p, .6, .9));
      stroke([[200, 580], [240, 580], [240, 620]], seg(p, .9, 1), { color: C.pink, width: 4 });
  } },
  { say: "نسمي الضلعين القصيرين إيه و بي، والضلع الأطول سي.", draw: p => {
      write('a', 150, 470, seg(p, 0, .3), { size: 56, color: C.blue });
      write('b', 405, 680, seg(p, .3, .6), { size: 56, color: C.green });
      write('c', 440, 430, seg(p, .6, 1), { size: 56, color: C.orange });
  } },
  { say: "إذن، مربع إيه زائد مربع بي يساوي مربع سي.", draw: p => {
      write('a² + b² = c²', 740, 330, p, { size: 72 });
  } },
  { say: "مثلاً، ثلاثة تربيع زائد أربعة تربيع يساوي تسعة زائد ستة عشر، أي خمسة وعشرين، وهو خمسة تربيع.", draw: p => {
      write('3² + 4² = 5²', 740, 440, seg(p, 0, .45), { size: 56, color: C.blue });
      write('9 + 16 = 25', 740, 530, seg(p, .45, .9), { size: 56, color: C.blue });
      check(1120, 480, seg(p, .9, 1));
  } },
  { say: "وهذا صحيح لكل مثلث قائم الزاوية.", draw: p => {
      write("لكل مثلث قائم الزاوية", 1220, 650, seg(p, 0, .8), { size: 72, color: C.yellow });
      stroke(oval(945, 308, 235, 62), seg(p, .8, 1), { color: C.yellow, width: 3 });
  } },
]});
