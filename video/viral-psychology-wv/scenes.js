// "The Hidden Psychology of Going Viral" - skill version (whiteboard-video engine).
const star = (cx, cy, R, r) => poly(Array.from({ length: 10 }, (_, i) => {
  const a = (-90 + i * 36) * Math.PI / 180, q = i % 2 ? r : R; return [cx + q * Math.cos(a), cy + q * Math.sin(a)];
}), true, 1);
const face = (cx, cy, r, kind, at, col) => {
  P(circ(cx, cy, r, r), at, .45, { fill: col, fillOp: .18 });
  const e = at + .45;
  if (kind === 'awe') {
    P(circ(cx - 28, cy - 12, 9, 13) + circ(cx + 28, cy - 12, 9, 13) + circ(cx, cy + 38, 14, 18), e, .35, { w: 6 });
    P(line(cx + 100, cy - 70, cx + 100, cy - 36, 1) + line(cx + 83, cy - 53, cx + 117, cy - 53, 1), e + .3, .2, { c: GOLD, w: 6 });
  } else if (kind === 'anger') {
    P(line(cx - 48, cy - 34, cx - 10, cy - 18, 1) + line(cx + 48, cy - 34, cx + 10, cy - 18, 1) + line(cx - 26, cy + 40, cx + 26, cy + 36, 1), e, .35, { w: 7 });
    P(wave(cx - 40, cx + 40, cy - r - 24, 8, 40), e + .3, .25, { c: RED, w: 6 });
  } else {
    P(line(cx - 48, cy - 18, cx - 10, cy - 34, 1) + line(cx + 48, cy - 18, cx + 10, cy - 34, 1) + arc(cx, cy + 62, 28, 200, 340), e, .35, { w: 6 });
    P(poly([[cx - 30, cy + 4], [cx - 40, cy + 30], [cx - 20, cy + 30]], true, 0), e + .3, .2, { c: BLUE, w: 5, fill: BLUE, fillOp: .4 });
  }
};
window.SCENES = {
  cover(A, { W }) {
    T('The Hidden Psychology of Going Viral', W / 2, 150, 96, A(0, 0), 1.0, { c: BLUE });
    P(rect(300, 330, 520, 230, 3) + line(430, 560, 426, 680, 2) + line(690, 560, 694, 680, 2), A(0, .55), .6, { fill: BLUE, fillOp: .1 });
    T('$1,000,000', 560, 490, 120, A(0, .85), .55, { c: GREEN });
    P(star(1330, 300, 50, 21), A(1, 0), .35, { fill: GOLD, fillOp: .6 });
    P(icon.person(1330, 500, 1.3), A(1, .2), .6);
    P(poly([[1400, 440], [1500, 395], [1500, 495], [1400, 460]], true, 2) + wave(1530, 1640, 445, 18, 40), A(1, .6), .4, { c: RED, fill: RED, fillOp: .15 });
    const g1 = T('going viral =', 520, 800, 90, A(2, .1), .6, { anchor: 'start' });
    const g2 = T('$$$', g1.x + g1.width + 30, 800, 90, A(2, .65), .3, { anchor: 'start', c: GREEN });
    T('?', g2.x + g2.width + 24, 800, 90, A(2, .85), .15, { anchor: 'start' });
    P(line(g2.x - 10, 700, g2.x + g2.width + 10, 815, 3) + line(g2.x + g2.width + 10, 700, g2.x - 10, 815, 3), A(3, .1), .35, { c: RED, w: 11 });
    T('6 ingredients', 360, 905, 80, A(4, .5), .6, { c: BLUE, anchor: 'start' });
    P(arrow(850, 880, 960, 880), A(5, .0), .3);
    for (let i = 0; i < 6; i++) P(circ(1050 + i * 100, 880, 36, 36), A(5, .1 + i * .08), .25, { c: BLUE, w: 6, fill: BLUE, fillOp: .15 });
  },
  social(A, { W }) {
    T('Social currency', W / 2, 150, 110, A(0, 0), .8, { c: BLUE });
    P(icon.person(300, 700, 1.3), A(1, 0), .6);
    P(star(300, 535, 40, 17), A(1, .25), .3, { fill: GOLD, fillOp: .6 });
    P(icon.bubble(640, 400, 330, 120), A(1, .5), .4, { fill: BLUE, fillOp: .1 });
    T('psst!', 640, 425, 70, A(1, .75), .3, { c: BLUE });
    T("Please Don't Tell", 1260, 350, 80, A(2, 0), .7, { c: GOLD });
    P(rect(950, 430, 380, 270, 3) + poly([[930, 430], [985, 470], [1040, 430], [1095, 470], [1150, 430], [1205, 470], [1260, 430], [1315, 470], [1350, 430]], false, 2), A(2, .18), .6, { fill: GOLD, fillOp: .12 });
    T('hot dogs', 1140, 600, 62, A(2, .3), .4);
    P(rect(1400, 400, 140, 300, 3) + line(1402, 480, 1538, 480, 2) + line(1402, 560, 1538, 560, 2), A(2, .42), .5);
    T('bar', 1470, 780, 60, A(2, .55), .3, { c: GOLD });
    [[1730, 440], [1790, 590], [1730, 740]].forEach(([x, y], i) => {
      P(arrow(1570, 560 + (i - 1) * 50, x - 90, y), A(2, .7 + i * .06), .25, { c: GOLD });
      P(icon.person(x, y + 50, .55), A(2, .72 + i * .06), .25);
    });
  },
  triggers(A, { W }) {
    T('Triggers', W / 2, 150, 110, A(0, 0), .7, { c: GOLD });
    P(icon.person(240, 760, 1.2), A(1, 0), .5);
    P(circ(640, 430, 190, 95), A(1, .25), .45, { fill: GOLD, fillOp: .1 });
    P(circ(640, 410, 40, 44) + rect(622, 452, 36, 24, 1), A(1, .5), .35, { c: GOLD, fill: GOLD, fillOp: .35 });
    P(rect(1020, 380, 110, 120, 2) + 'M1130 410 C1180 410 1180 480 1130 480', A(1, .7), .4);
    P(arrow(1000, 440, 850, 440), A(1, .88), .2, { c: GOLD });
    P(rect(660, 650, 160, 210, 2) + rect(672, 618, 136, 32, 1), A(2, 0), .4, { fill: GOLD, fillOp: .35 });
    P(rect(1000, 650, 160, 210, 2) + rect(1012, 618, 136, 32, 1), A(2, .2), .4, { fill: BLUE, fillOp: .3 });
    P(arrow(850, 760, 970, 760), A(2, .42), .25);
    T('peanut butter', 740, 915, 50, A(2, .55), .4);
    T('jelly', 1080, 915, 50, A(2, .8), .25);
    P(circ(1560, 400, 105, 105), A(3, .05), .5, { c: RED, fill: RED, fillOp: .3 });
    P(rect(1470, 620, 150, 56, 2) + rect(1500, 584, 60, 36, 1) + circ(1505, 700, 20, 20) + circ(1590, 700, 20, 20), A(3, .25), .5);
    P(rect(1330, 780, 380, 120, 3), A(3, .5), .4, { c: RED, fill: RED, fillOp: .25 });
    T('Mars', 1520, 872, 90, A(3, .65), .35, { c: RED });
    P(arrow(1770, 900, 1770, 720), A(3, .85), .25, { c: GREEN, w: 9 });
  },
  emotion(A, { W }) {
    T('Emotion', W / 2, 150, 110, A(0, 0), .7, { c: RED });
    P(rect(170, 300, 300, 260, 3) + line(195, 345, 445, 345, 2) + line(195, 395, 330, 395, 2) + line(195, 445, 445, 445, 2) + line(195, 495, 445, 495, 2), A(1, 0), .8, { fill: GRAY, fillOp: .1 });
    T('7,000', 320, 660, 90, A(1, .2), .5);
    T('articles', 320, 740, 56, A(1, .32), .4, { c: GRAY });
    face(780, 450, 90, 'awe', A(1, .5), GOLD);
    T('awe', 780, 760, 66, A(1, .62), .3);
    face(1120, 450, 90, 'anger', A(1, .72), RED);
    T('anger', 1120, 760, 66, A(1, .84), .3);
    P(arrow(780, 650, 780, 560) + arrow(1120, 650, 1120, 560), A(1, .92), .3, { c: GREEN, w: 9 });
    face(1500, 450, 90, 'sad', A(2, 0), BLUE);
    P(arrow(1500, 560, 1500, 650), A(2, .45), .3, { c: RED, w: 9 });
    T('sadness', 1500, 760, 66, A(2, .55), .4);
  },
  public(A, { W }) {
    T('Public', W / 2, 150, 110, A(0, 0), .7, { c: GREEN });
    P(circ(240, 360, 100, 52) + circ(240, 360, 22, 22), A(1, 0), .5, { fill: INK, fillOp: .1 });
    P(arrow(240, 430, 240, 500), A(1, .4), .25, { c: GREEN });
    P(icon.person(190, 760, 1), A(1, .55), .35);
    P(icon.person(360, 760, 1), A(1, .75), .35);
    P(rect(760, 330, 440, 270, 3) + poly([[720, 600], [1240, 600], [1275, 650], [685, 650]], true, 2), A(2, .05), .7, { fill: GRAY, fillOp: .12 });
    P(circ(980, 470, 52, 56), A(2, .4), .4, { fill: GRAY, fillOp: .5 });
    P('M985 410 C985 392 998 382 1014 382 C1014 398 1004 410 985 410', A(2, .5), .2, { c: GREEN });
    T('billboard', 980, 790, 100, A(2, .65), .55, { c: RED });
    [1400, 1580, 1760].forEach((x, i) => {
      P(rect(x - 70, 430, 140, 90, 2) + line(x - 92, 548, x + 92, 548, 2) + circ(x, 478, 16, 17), A(3, .05 + i * .22), .4, { fill: GRAY, fillOp: .12 });
      P(icon.tick(x, 640, 28), A(3, .15 + i * .22), .25, { c: GREEN, w: 8 });
    });
    T('copied', 1580, 790, 76, A(3, .8), .4, { c: GREEN });
  },
  value(A, { W }) {
    T('Practical value', W / 2, 150, 110, A(0, 0), .8, { c: GREEN });
    P(rect(170, 320, 290, 250, 3) + line(200, 370, 430, 370, 2) + line(200, 420, 340, 420, 2), A(1, 0), .6, { fill: GRAY, fillOp: .1 });
    P(icon.tick(300, 500, 40), A(1, .45), .3, { c: GREEN, w: 10 });
    P(arrow(480, 440, 580, 440), A(1, .65), .25);
    P(icon.person(680, 600, .85), A(1, .8), .3);
    P(line(840, 780, 1240, 780, 2) + line(840, 780, 840, 400, 2), A(2, 0), .4, { w: 6 });
    P(rect(910, 450, 100, 330, 2), A(2, .15), .4, { c: GREEN, fill: GREEN, fillOp: .35 });
    P(rect(1100, 630, 100, 150, 2), A(2, .4), .4, { c: GRAY, fill: GRAY, fillOp: .25 });
    T('useful', 960, 850, 52, A(2, .6), .3);
    T('less', 1150, 850, 52, A(2, .75), .25);
    P(icon.clock(1420, 380, 46), A(3, 0), .4, { c: GREEN });
    T('quick', 1510, 400, 70, A(3, .1), .3, { anchor: 'start', c: GREEN });
    P(circ(1420, 560, 40, 40) + line(1450, 590, 1484, 624, 1), A(3, .3), .4, { c: GREEN });
    T('clear', 1510, 580, 70, A(3, .4), .3, { anchor: 'start', c: GREEN });
    P(poly([[1385, 700], [1455, 700], [1455, 810], [1420, 782], [1385, 810]], true, 1), A(3, .6), .4, { c: GREEN, fill: GREEN, fillOp: .3 });
    T('worth saving', 1490, 780, 70, A(3, .7), .5, { anchor: 'start', c: GREEN });
  },
  stories(A, { W }) {
    T('Stories', W / 2, 150, 110, A(0, 0), .7, { c: BLUE });
    P(poly([[240, 340], [400, 340], [372, 640], [268, 640]], true, 2) + rect(228, 308, 184, 32, 1) + rect(255, 640, 130, 100, 2), A(1, 0), .8, { fill: BLUE, fillOp: .12 });
    T('Blendtec', 320, 830, 60, A(1, .12), .4);
    T('2006', 700, 380, 100, A(1, .2), .4, { c: BLUE });
    P(rect(640, 450, 330, 150, 3) + rect(660, 468, 290, 114, 2), A(1, .32), .5, { c: GREEN, fill: GREEN, fillOp: .15 });
    T('$50', 805, 560, 90, A(1, .42), .35, { c: GREEN });
    T('supplies', 805, 665, 52, A(1, .5), .3, { c: GRAY });
    P(icon.person(1500, 620, 1.4), A(1, .6), .5);
    P(icon.bubble(1560, 300, 420, 130), A(1, .75), .35, { c: BLUE, fill: BLUE, fillOp: .1 });
    T('will it blend?', 1560, 322, 62, A(1, .88), .35, { c: BLUE });
    P(circ(660, 860, 22, 22) + circ(710, 840, 22, 22) + circ(705, 890, 22, 22), A(2, 0), .4, { c: RED });
    P(circ(920, 860, 44, 44), A(2, .3), .4, { fill: GRAY, fillOp: .1 });
    P(rect(1100, 790, 100, 150, 8) + rect(1114, 815, 72, 90, 2), A(2, .6), .4, { fill: GRAY, fillOp: .12 });
  },
  payoff(A, { W }) {
    T('The result', W / 2, 150, 110, A(0, 0), .6, { c: GREEN });
    P(rect(160, 300, 460, 250, 3), A(0, .1), .6, { fill: INK, fillOp: .85 });
    P(poly([[340, 350], [340, 500], [460, 425]], true, 1), A(0, .17), .3, { c: '#ffffff', fill: '#ffffff', fillOp: 1 });
    T('150,000,000', 390, 650, 82, A(0, .25), .6, { c: GOLD });
    T('views', 390, 730, 60, A(0, .35), .3, { c: GRAY });
    P(line(800, 700, 1250, 700, 2), A(0, .45), .3, { w: 6 });
    [60, 110, 170, 260, 380].forEach((h, i) => P(rect(840 + i * 80, 700 - h, 50, h, 2), A(0, .5 + i * .04), .25, { fill: GREEN, fillOp: .3 }));
    P(arrow(830, 580, 1270, 290), A(0, .72), .4, { c: GREEN, w: 9 });
    T('+700%', 1590, 430, 150, A(0, .8), .5, { c: GREEN });
    T('retail blender sales in 2 years', 1030, 790, 54, A(0, .9), .5, { c: GRAY });
    T('the product was the story.', W / 2, 910, 100, A(1, 0), .9, { c: BLUE });
  },
  recap(A, { W }) {
    T('The six ingredients', W / 2, 150, 110, A(0, 0), .7, { c: BLUE });
    const names = [['Social currency', 300, 300, BLUE], ['Triggers', 300, 385, GOLD], ['Emotion', 300, 470, RED], ['Public', 1020, 300, GREEN], ['Practical value', 1020, 385, GREEN], ['Stories', 1020, 470, BLUE]];
    names.forEach(([s, x, y, c], i) => T(s, x, y, 66, A(0, .06 + i * .15), .5, { anchor: 'start', c }));
    P(poly([[300, 900], [300, 850], [490, 850], [490, 800], [680, 800], [680, 750], [870, 750], [870, 700], [1060, 700], [1060, 650], [1250, 650], [1250, 900], [300, 900]], false, 1), A(1, 0), .8, { fill: BLUE, fillOp: .12 });
    P(arrow(340, 790, 1340, 560), A(1, .45), .4, { c: GOLD, w: 9 });
    T('odds', 1600, 640, 130, A(1, .7), .5, { c: GOLD });
  },
  design(A, { W }) {
    T('Before you post', W / 2, 150, 110, A(0, 0), .7, { c: BLUE });
    P(rect(200, 300, 260, 460, 8) + rect(222, 350, 216, 300, 2), A(0, .1), .6, { fill: GRAY, fillOp: .12 });
    P('M330 600 C280 565 268 500 302 484 C322 476 330 494 330 504 C330 494 338 476 358 484 C392 500 380 565 330 600', A(0, .3), .4, { c: RED, fill: RED, fillOp: .3 });
    T('why would someone', 560, 450, 78, A(0, .4), .6, { anchor: 'start', c: BLUE });
    T('look good sharing this?', 560, 560, 78, A(0, .65), .7, { anchor: 'start', c: BLUE });
    const a = T("Virality isn't", 560, 720, 100, A(1, 0), .5, { anchor: 'start' });
    const b = T('luck.', a.x + a.width + 30, 720, 100, A(1, .45), .3, { anchor: 'start' });
    P(line(b.x - 10, 690, b.x + b.width + 10, 680, 3), A(1, .8), .2, { c: RED, w: 11 });
    const d = T("It's design.", W / 2, 900, 150, A(2, 0), .7, { c: BLUE });
    P(wave(d.x, d.x + d.width, 940, 8, 90), A(2, .7), .25, { c: BLUE, w: 9 });
  }
};
