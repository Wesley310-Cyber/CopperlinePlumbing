/* Scene 6 - Practical value (8.8 s) */
const tt=title("Practical value",120,150,TEAL,1.0);
elem(0.10,1.70,tt.strokes,0.02);

/* "People share useful news." */
const card=mkStroke(rectD(140,280,420,540,3),{sw:6.5});
const cl1=mkStroke(wl(170,330,390,330,2),{sw:5});
const cl2=mkStroke(wl(170,372,300,372,2),{sw:5});
const chk=mkStroke("M200 470 L240 510 L330 410",{sw:10,color:GREEN});
elem(1.75,2.65,[card,cl1,cl2,chk],0.04); fillAfter(card,"#f1f5f9",0,0.25);
const pr=person(610,330,0.7,{arms:[[-45,-30],[45,-30]],sw:5.5});
const sh=arrowS(440,430,545,430,TEAL,6.5);
elem(2.7,3.4,[...sh,...pr.list],0.03);

/* "In that same study, more useful articles were shared more." */
const ax=mkStroke("M780 760 L1180 760",{sw:6});
const ay=mkStroke("M780 760 L780 380",{sw:6});
const bar1=mkStroke(rectD(850,430,950,760,3),{sw:6.5});
const bar2=mkStroke(rectD(1040,610,1140,760,3),{sw:6.5});
elem(3.5,4.6,[ay,ax,bar1,bar2],0.04); fillAfter(bar1,"#99f6e4",0,0.3); fillAfter(bar2,"#e5e7eb",0,0.3);
const lu=ctext("useful",900,835,0.55,INK,5.5);
const ll=ctext("less",1090,835,0.55,INK,5.5);
elem(4.65,5.3,[...lu.strokes,...ll.strokes],0.02);

/* "Make it quick, clear, and worth saving." */
const sw1=mkStroke(ell(1380,350,46,46),{sw:6.5,color:TEAL});
const sw2=mkStroke("M1370 296 L1390 296 M1385 300 L1396 312",{sw:6,color:TEAL});
const sw3=mkStroke("M1380 350 L1380 322 M1380 350 L1400 360",{sw:6});
const q=text("quick",1470,376,0.8,()=>TEAL,6);
elem(5.35,6.1,[sw1,sw2,sw3,...q.strokes],0.02);
const mg1=mkStroke(ell(1376,540,40,40),{sw:6.5,color:TEAL});
const mg2=mkStroke("M1405 570 L1438 604",{sw:9,color:TEAL});
const cr=text("clear",1470,566,0.8,()=>TEAL,6);
elem(6.15,6.9,[mg1,mg2,...cr.strokes],0.02);
const bk=mkStroke("M1340 690 L1404 690 L1404 784 L1372 760 L1340 784 Z",{sw:6.5,color:TEAL});
const ws=text("worth saving",1440,750,0.8,()=>TEAL,6);
elem(6.95,8.2,[bk,...ws.strokes],0.02); fillAfter(bk,"#99f6e4",0,0.25);

finalize(9.0);
