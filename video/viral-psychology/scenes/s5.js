/* Scene 5 - Public (12.3 s) */
const GRN="#15803d";
const tt=title("Public",120,150,GRN,1.0);
elem(0.10,1.00,tt.strokes,0.02);

/* "We copy what we can see." */
const eye=mkStroke("M140 300 C190 240 290 240 340 300 C290 360 190 360 140 300 Z",{sw:6.5});
const pupil=mkStroke(ell(240,300,22,22),{sw:6});
const look=arrowS(240,385,240,455,GRN,6.5);
elem(1.05,1.75,[eye,pupil,...look],0.03); fillAfter(pupil,INK,0,0.2);
const pA=person(240,480,0.7,{arms:[[-45,50],[45,-35]],sw:5.5});
const pB=person(440,480,0.7,{arms:[[-45,50],[45,-35]],sw:5.5});
elem(1.85,3.30,[...pA.list,...pB.list],0.03);

/* "Apple turned its laptop logo to face outward, so every open laptop became a billboard." */
const lid=mkStroke(rectD(700,300,1120,560,3),{sw:7});
const base=mkStroke(poly([[660,560],[1160,560],[1190,606],[630,606]],true,2),{sw:7});
elem(3.45,4.75,[lid,base],0.05); fillAfter(lid,"#e5e7eb",0,0.3);
const apl=mkStroke(ell(910,436,50,54),{sw:6.5});
const leaf=mkStroke("M915 378 C915 360 928 350 944 350 C944 366 934 378 915 378",{sw:6,color:GRN});
elem(4.85,5.9,[apl,leaf],0.03); fillAfter(apl,"#6b7280",0,0.3);
const bb=ctext("billboard",910,740,0.9,ORANGE,6.5);
elem(6.4,8.0,bb.strokes,0.02);

/* "Make the choice visible, and people imitate it." */
const copies=[];
[1380,1560,1740].forEach(cx=>{
  const l=mkStroke(rectD(cx-66,430,cx+66,520,2),{sw:6});
  const b=mkStroke(wl(cx-86,544,cx+86,544,2),{sw:6});
  const a=mkStroke(ell(cx,478,15,16),{sw:5});
  copies.push(l,b,a);
});
elem(9.0,10.3,copies,0.03);
[0,1,2].forEach(i=>fillAfter(copies[i*3],"#e5e7eb",0,0.2));
const ticks=[1380,1560,1740].map(cx=>mkStroke(`M${cx-22} 610 L${cx-6} 628 L${cx+26} 588`,{sw:8,color:GRN}));
elem(10.4,11.2,ticks,0.08);
const cp=ctext("copied",1560,740,0.8,GRN,6);
elem(11.25,11.95,cp.strokes,0.02);

finalize(12.8);
