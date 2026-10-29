/* Scene 7 - Stories (11.4 s) */
const tt=title("Stories",120,150,PURPLE,1.0);
elem(0.10,1.00,tt.strokes,0.02);

/* "In 2006, Blendtec spent fifty dollars on supplies for its first video:" */
const jar=mkStroke(poly([[200,330],[380,330],[350,640],[230,640]],true,2),{sw:6.5});
const lid=mkStroke(rectD(188,298,392,330,2),{sw:6.5});
const bse=mkStroke(rectD(215,640,365,745,3),{sw:6.5});
const btn=mkStroke(ell(290,694,14,14),{sw:5.5});
elem(1.1,2.5,[jar,lid,bse,btn],0.04); fillAfter(jar,"#e0f2fe",0,0.3); fillAfter(bse,"#cbd5e1",0,0.3);
const bl=ctext("Blendtec",290,845,0.7,PURPLE,6);
elem(2.55,3.45,bl.strokes,0.02);
const yr=text("2006",700,360,1.0,()=>PURPLE,7);
elem(3.5,4.4,yr.strokes,0.03);
const note=mkStroke(rectD(700,440,1030,590,3),{sw:6.5});
const nin=mkStroke(rectD(722,460,1008,570,2),{sw:4.5,color:GREEN});
elem(4.45,5.3,[note,nin],0.03); fillAfter(note,"#dcfce7",0,0.25);
const fifty=ctext("$50",865,548,0.8,GREEN,6.5);
const sup=ctext("supplies",865,675,0.6,SLATE,5.5);
elem(5.35,6.15,[...fifty.strokes,...sup.strokes],0.02);

/* "a CEO in a lab coat asking, will it blend?" */
const CXC=1250;
const ceo=person(CXC,300,1.15,{arms:[[-55,60],[60,60]]});
const coat=mkStroke(poly([[CXC-46,ceo.sh],[CXC+46,ceo.sh],[CXC+90,ceo.hip+10],[CXC-90,ceo.hip+10]],true,2),{sw:6.5,color:PURPLE});
const gog=mkStroke(`M${CXC-30} ${f(ceo.hy-4)} L${CXC+30} ${f(ceo.hy-4)}`,{sw:12,color:SLATE});
elem(6.2,7.3,[...ceo.list,coat,gog],0.03); fillAfter(coat,"#ede9fe",0,0.25);
const bub=mkStroke(ell(1590,300,235,82),{sw:6.5,color:PURPLE});
const tail=mkStroke("M1445 350 L1388 398 L1490 372",{sw:6.5,color:PURPLE});
elem(7.35,7.9,[bub,tail],0.03); fillAfter(bub,"#f5f3ff",0,0.25);
const wb=ctext("will it blend?",1590,322,0.7,PURPLE,6);
elem(7.95,8.7,wb.strokes,0.02);

/* "Marbles, golf balls, then an iPhone." */
const m1=mkStroke(ell(900,885,22,22),{sw:5.5,color:BLUE});
const m2=mkStroke(ell(950,862,22,22),{sw:5.5,color:RED});
const m3=mkStroke(ell(944,910,22,22),{sw:5.5,color:GREEN});
elem(8.75,9.3,[m1,m2,m3],0.03);
const gb=mkStroke(ell(1120,882,42,42),{sw:6.5},);
const gd=mkStroke("M1100 865 L1101 866 M1125 860 L1126 861 M1112 888 L1113 889 M1138 884 L1139 885 M1122 906 L1123 907",{sw:7});
elem(9.35,9.95,[gb,gd],0.03); fillAfter(gb,"#ffffff",0,0.2);
const ph=mkStroke(rectD(1280,815,1376,955,5),{sw:6.5});
const ps=mkStroke(rectD(1292,835,1364,925,2),{sw:4.5});
const pb=mkStroke("M1328 940 L1329 940",{sw:8});
elem(10.0,10.8,[ph,ps,pb],0.03); fillAfter(ph,"#e5e7eb",0,0.25);

finalize(11.7);
