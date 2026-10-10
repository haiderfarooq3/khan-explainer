// Pythagoras' theorem in ja: the same board and the same beats, narrated and labelled in the language.
scene({ lang: 'ja', beats: [
  { say: "これはピタゴラスの定理です。", draw: p => {
      write("ピタゴラスの定理", 60, 95, seg(p, 0, .8), { size: 58, color: C.yellow });
      stroke(line([60, 125], [1220, 125]), seg(p, .8, 1), { color: C.yellow, width: 3 });
  } },
  { say: "直角がひとつある三角形を考えます。", draw: p => {
      stroke(line([200, 620], [200, 290]), seg(p, 0, .3));
      stroke(line([200, 620], [640, 620]), seg(p, .3, .6));
      stroke(line([640, 620], [200, 290]), seg(p, .6, .9));
      stroke([[200, 580], [240, 580], [240, 620]], seg(p, .9, 1), { color: C.pink, width: 4 });
  } },
  { say: "短い二辺をエー、ビー、いちばん長い辺をシーとします。", draw: p => {
      write('a', 150, 470, seg(p, 0, .3), { size: 56, color: C.blue });
      write('b', 405, 680, seg(p, .3, .6), { size: 56, color: C.green });
      write('c', 440, 430, seg(p, .6, 1), { size: 56, color: C.orange });
  } },
  { say: "すると、エーの二乗たすビーの二乗は、シーの二乗に等しくなります。", draw: p => {
      write('a² + b² = c²', 740, 330, p, { size: 72 });
  } },
  { say: "たとえば、三の二乗たす四の二乗は、九たす十六で二十五、つまり五の二乗です。", draw: p => {
      write('3² + 4² = 5²', 740, 440, seg(p, 0, .45), { size: 56, color: C.blue });
      write('9 + 16 = 25', 740, 530, seg(p, .45, .9), { size: 56, color: C.blue });
      check(1120, 480, seg(p, .9, 1));
  } },
  { say: "これはすべての直角三角形で成り立ちます。", draw: p => {
      write("すべての直角三角形で", 740, 650, seg(p, 0, .8), { size: 46, color: C.yellow });
      stroke(oval(945, 308, 235, 62), seg(p, .8, 1), { color: C.yellow, width: 3 });
  } },
]});
