/* Scene 8 - The payoff (10.8 s) */
/* "The series passed one hundred fifty million views," */
const scr=mkStroke(rectD(150,250,600,500,3),{sw:7});
const tri=mkStroke("M330 300 L330 450 L450 375 Z",{sw:6.5,color:"#ffffff"});
elem(0.2,1.3,[scr,tri],0.04); fillAfter(scr,"#1f2937",0,0.3); fillAfter(tri,"#ffffff",0,0.2);
const mv=ctext("150,000,000",375,610,0.8,ORANGE,6.5);
elem(1.4,2.75,mv.strokes,0.02);
const vw=ctext("views",375,700,0.7,SLATE,6);
elem(2.8,3.45,vw.strokes,0.02);

/* "and the company says retail blender sales rose seven hundred percent in two years." */
const axx=mkStroke("M800 700 L1250 700",{sw:6});
const bars=[60,110,170,260,380].map((h,i)=>mkStroke(rectD(840+i*80,700-h,890+i*80,700,2),{sw:6}));
elem(3.5,5.0,[axx,...bars],0.04);
bars.forEach(b=>fillAfter(b,"#bbf7d0",0,0.2));
const rise=arrowS(830,560,1270,260,GREEN,8,-35);
elem(5.05,5.6,rise,0.03);
const pct=ctext("+700%",1580,400,1.4,GREEN,8);
elem(5.65,7.0,pct.strokes,0.02);
const rs=ctext("retail blender sales",1030,775,0.5,SLATE,5.5);
const ty=ctext("in 2 years",1030,835,0.5,SLATE,5.5);
elem(7.05,8.2,[...rs.strokes,...ty.strokes],0.008);

/* "The product was the story." */
const fin=ctext("the product was the story.",960,985,0.9,PURPLE,7);
elem(8.3,10.2,fin.strokes,0.008);

finalize(10.8);
