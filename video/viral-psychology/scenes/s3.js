/* Scene 3 - Triggers (10.4 s) */
const tt=title("Triggers",120,150,ORANGE,1.0);
elem(0.10,1.20,tt.strokes,0.02);

/* "Ideas spread when everyday cues remind us." */
const pp=person(280,380,0.95,{arms:[[-55,60],[60,60]]});
elem(1.10,1.95,pp.list);
const c2=mkStroke(ell(372,520,8,7),{sw:6,color:ORANGE});
const c1=mkStroke(ell(405,470,15,13),{sw:6,color:ORANGE});
const tb=mkStroke(ell(560,360,150,85),{sw:6.5,color:ORANGE});
const bulb=mkStroke(ell(560,340,38,42),{sw:6.5});
const bbase=mkStroke("M545 380 L545 402 L575 402 L575 380",{sw:6.5});
const rays=mkStroke("M560 282 L560 268 M512 300 L502 292 M608 300 L618 292",{sw:5,color:GOLD});
elem(2.0,2.95,[c2,c1,tb,bulb,bbase,rays],0.03); fillAfter(bulb,"#fff4b8",0,0.25); fillAfter(tb,"#fff1e6",0,0.25);
const mug=mkStroke(rectD(900,330,990,430,3),{sw:6.5});
const mh=mkStroke("M990 352 C1034 352 1034 406 990 406",{sw:6.5});
const steam=mkStroke("M925 310 C915 295 935 285 925 270 M955 310 C945 295 965 285 955 270",{sw:5,color:GRAY});
const link=arrowS(880,380,725,372,ORANGE,6);
elem(3.0,3.75,[mug,mh,steam,...link],0.03); fillAfter(mug,"#e8eef7",0,0.25);

/* "Say peanut butter, and you think jelly." */
const jar1=mkStroke(rectD(400,640,560,850,3),{sw:6.5});
const lid1=mkStroke(rectD(410,606,550,640,2),{sw:6.5});
const lab1=mkStroke(rectD(425,700,535,780,2),{sw:5});
const jar2=mkStroke(rectD(700,640,860,850,3),{sw:6.5});
const lid2=mkStroke(rectD(710,606,850,640,2),{sw:6.5});
const lab2=mkStroke(rectD(725,700,835,780,2),{sw:5});
elem(3.85,5.05,[jar1,lid1,lab1,jar2,lid2,lab2],0.03);
fillAfter(jar1,"#e2b27a",0,0.3); fillAfter(jar2,"#c4b5fd",0,0.3);
const ar=arrowS(585,745,675,745,ORANGE,6.5);
elem(5.10,5.35,ar,0.02);
const l1=ctext("peanut butter",480,925,0.5,INK,5.5);
const l2=ctext("jelly",780,925,0.5,INK,5.5);
elem(5.4,6.45,[...l1.strokes,...l2.strokes],0.02);

/* "Mars bar sales reportedly jumped when NASA's Pathfinder rover hit the news." */
const planet=mkStroke(ell(1350,330,95,95),{sw:6.5});
const cr1=mkStroke(ell(1320,300,18,12),{sw:5});
const cr2=mkStroke(ell(1385,365,24,14),{sw:5});
elem(6.45,7.20,[planet,cr1,cr2],0.03); fillAfter(planet,"#f0a07c",0,0.3);
const rb=mkStroke(rectD(1560,520,1700,572,2),{sw:6});
const rc=mkStroke(rectD(1595,486,1655,520,2),{sw:6});
const rw1=mkStroke(ell(1590,596,19,19),{sw:6});
const rw2=mkStroke(ell(1672,596,19,19),{sw:6});
const ran=mkStroke("M1675 520 L1695 460 L1715 454",{sw:5});
const nasa=ctext("NASA",1630,700,0.5,SLATE,5.5);
elem(7.25,8.15,[rb,rc,rw1,rw2,ran,...nasa.strokes],0.025);
const candy=mkStroke(rectD(1150,790,1500,910,4),{sw:6.5});
elem(8.2,8.6,[candy]); fillAfter(candy,RED,0,0.25);
const mars=ctext("Mars",1325,882,0.95,"#ffffff",7);
elem(8.65,9.3,mars.strokes,0.02);
const up=arrowS(1580,930,1760,720,GREEN,8,-20);
elem(9.35,9.8,up,0.03);

finalize(10.5);
