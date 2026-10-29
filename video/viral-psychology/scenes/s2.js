/* Scene 2 - Social currency (13.0 s) */
const tt=title("Social currency",120,150,BLUE,1.0);
elem(0.10,1.80,tt.strokes,0.02);

/* "We share what makes us look in the know." */
const pa=person(300,330,1.0,{arms:[[-60,70],[70,-30]]});
elem(1.95,2.90,pa.list);
const st=mkStroke(starD(300,262,40,17),{sw:6.5});
elem(3.00,3.35,[st]); fillAfter(st,GOLD,0,0.25);
const bub=mkStroke(ell(660,400,175,80),{sw:6.5,color:BLUE});
const tail=mkStroke("M540 448 L470 505 L590 470",{sw:6.5,color:BLUE});
elem(3.45,4.00,[bub,tail]); fillAfter(bub,"#eef2ff",0,0.25);
const psst=ctext("psst!",660,420,1.0,BLUE,6.5);
elem(4.10,4.70,psst.strokes,0.02);

/* "New York's Please Don't Tell bar hid its entrance in a hot dog shop phone booth," */
const pdt=ctext("Please Don't Tell",1250,440,0.8,ORANGE,6);
elem(4.75,6.00,pdt.strokes,0.02);
const shop=mkStroke(rectD(900,520,1300,800,3),{sw:6.5});
const awn=mkStroke(poly([[880,520],[935,562],[990,520],[1045,562],[1100,520],[1155,562],[1210,520],[1265,562],[1320,520]],false,2),{sw:6.5,color:RED});
elem(6.10,7.00,[shop,awn]); fillAfter(shop,"#fff7e6",0,0.3);
const hd=ctext("hot dogs",1100,640,0.6,INK,5.5);
elem(7.05,7.70,hd.strokes,0.02);
const bun=mkStroke(ell(1100,722,98,28),{sw:6,color:ORANGE});
const saus=mkStroke(wl(1030,720,1170,720,2),{sw:15,color:RED});
const must=mkStroke("M1040 712 L1056 702 L1072 716 L1088 702 L1104 716 L1120 702 L1136 716 L1152 704",{sw:5,color:GOLD});
elem(7.75,8.50,[bun,saus,must]); fillAfter(bun,"#f3d9a6",0,0.25);
const bk=mkStroke(rectD(1360,480,1500,800,3),{sw:6.5});
const b1=mkStroke(wl(1362,560,1498,560,2),{sw:5});
const b2=mkStroke(wl(1362,640,1498,640,2),{sw:5});
const hs=mkStroke("M1400 690 C1388 700 1388 730 1400 740 M1388 715 L1412 715 M1456 690 C1468 700 1468 730 1456 740",{sw:5});
elem(8.55,9.35,[bk,b1,b2,hs]);
const bar=ctext("bar",1430,880,0.7,ORANGE,6);
const ar0=arrowS(1430,830,1430,806,ORANGE,6);
elem(9.40,9.95,[...bar.strokes,...ar0],0.02);

/* "and the secret itself spread the word." */
const q1=person(1670,420,0.4,{arms:[[-45,-25],[45,-25]],sw:4});
const q2=person(1800,560,0.4,{arms:[[-45,-25],[45,-25]],sw:4});
const q3=person(1670,700,0.4,{arms:[[-45,-25],[45,-25]],sw:4});
elem(10.05,11.15,[...q1.list,...q2.list,...q3.list],0.02);
const sp1=arrowS(1530,560,1612,500,ORANGE,6,10);
const sp2=arrowS(1530,640,1735,630,ORANGE,6,10);
const sp3=arrowS(1530,720,1612,770,ORANGE,6,10);
elem(11.25,11.85,[...sp1,...sp2,...sp3],0.03);

finalize(13.0);
