// Pythagoras' theorem in hi: the same board and the same beats, narrated and labelled in the language.
scene({ lang: 'hi', beats: [
  { say: "यह है पाइथागोरस प्रमेय।", draw: p => {
      write("पाइथागोरस प्रमेय", 60, 95, seg(p, 0, .8), { size: 64, color: C.yellow });
      stroke(line([60, 125], [1220, 125]), seg(p, .8, 1), { color: C.yellow, width: 3 });
  } },
  { say: "एक समकोण त्रिभुज लीजिए।", draw: p => {
      stroke(line([200, 620], [200, 290]), seg(p, 0, .3));
      stroke(line([200, 620], [640, 620]), seg(p, .3, .6));
      stroke(line([640, 620], [200, 290]), seg(p, .6, .9));
      stroke([[200, 580], [240, 580], [240, 620]], seg(p, .9, 1), { color: C.pink, width: 4 });
  } },
  { say: "छोटी भुजाओं को ए और बी कहिए, और सबसे लंबी भुजा को सी।", draw: p => {
      write('a', 150, 470, seg(p, 0, .3), { size: 56, color: C.blue });
      write('b', 405, 680, seg(p, .3, .6), { size: 56, color: C.green });
      write('c', 440, 430, seg(p, .6, 1), { size: 56, color: C.orange });
  } },
  { say: "तो ए का वर्ग जमा बी का वर्ग, सी के वर्ग के बराबर है।", draw: p => {
      write('a² + b² = c²', 740, 330, p, { size: 72 });
  } },
  { say: "जैसे, तीन का वर्ग जमा चार का वर्ग, यानी नौ जमा सोलह, बराबर पच्चीस, जो पाँच का वर्ग है।", draw: p => {
      write('3² + 4² = 5²', 740, 440, seg(p, 0, .45), { size: 56, color: C.blue });
      write('9 + 16 = 25', 740, 530, seg(p, .45, .9), { size: 56, color: C.blue });
      check(1120, 480, seg(p, .9, 1));
  } },
  { say: "यह हर समकोण त्रिभुज के लिए सही है।", draw: p => {
      write("हर समकोण त्रिभुज के लिए", 740, 650, seg(p, 0, .8), { size: 48, color: C.yellow });
      stroke(oval(945, 308, 235, 62), seg(p, .8, 1), { color: C.yellow, width: 3 });
  } },
]});
