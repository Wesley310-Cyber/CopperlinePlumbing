/* Scene 4 - Emotion (10.6 s) */
const tt=title("Emotion",120,150,RED,1.0);
elem(0.10,1.10,tt.strokes,0.02);

/* "In a study of nearly seven thousand New York Times articles," */
const paper=mkStroke(rectD(150,260,450,520,3),{sw:6.5});
const head=mkStroke(wl(175,305,425,303,2),{sw:9});
const ln1=mkStroke(wl(175,350,300,350,2),{sw:5});
const ln2=mkStroke(wl(175,392,300,392,2),{sw:5});
const ln3=mkStroke(wl(175,434,425,434,2),{sw:5});
const ln4=mkStroke(wl(175,476,425,476,2),{sw:5});
const pic=mkStroke(rectD(330,335,425,405,2),{sw:5});
elem(1.15,2.9,[paper,head,ln1,ln2,ln3,ln4,pic],0.03); fillAfter(paper,"#f1f5f9",0,0.3);
const n7=ctext("7,000",300,650,0.9,INK,6);
const art=ctext("articles",300,735,0.6,SLATE,5.5);
elem(3.0,4.45,[...n7.strokes,...art.strokes],0.02);

/* faces */
function face(cx,cy,r,kind){
  const o=[];
  const hd=mkStroke(ell(cx,cy,r,r),{sw:6.5}); o.push(hd);
  const E=(dx)=>mkStroke(ell(cx+dx*r,cy-.15*r,.12*r,.16*r),{sw:5.5});
  const dot=(dx)=>mkStroke(`M${f(cx+dx*r)} ${f(cy-.12*r)} L${f(cx+dx*r+.6)} ${f(cy-.1*r)}`,{sw:11});
  if(kind==="awe"){
    o.push(E(-.35),E(.35));
    o.push(mkStroke(`M${f(cx-.52*r)} ${f(cy-.5*r)} Q${f(cx-.36*r)} ${f(cy-.72*r)} ${f(cx-.2*r)} ${f(cy-.5*r)}`,{sw:5}));
    o.push(mkStroke(`M${f(cx+.2*r)} ${f(cy-.5*r)} Q${f(cx+.36*r)} ${f(cy-.72*r)} ${f(cx+.52*r)} ${f(cy-.5*r)}`,{sw:5}));
    o.push(mkStroke(ell(cx,cy+.48*r,.17*r,.22*r),{sw:5.5}));
    o.push(mkStroke(`M${f(cx+1.15*r)} ${f(cy-.9*r)} L${f(cx+1.15*r)} ${f(cy-.5*r)} M${f(cx+.95*r)} ${f(cy-.7*r)} L${f(cx+1.35*r)} ${f(cy-.7*r)} M${f(cx-1.15*r)} ${f(cy-.8*r)} L${f(cx-1.15*r)} ${f(cy-.5*r)} M${f(cx-1.35*r)} ${f(cy-.65*r)} L${f(cx-.95*r)} ${f(cy-.65*r)}`,{sw:5,color:GOLD}));
  } else if(kind==="anger"){
    o.push(dot(-.35),dot(.35));
    o.push(mkStroke(wl(cx-.6*r,cy-.5*r,cx-.12*r,cy-.28*r,1),{sw:7}));
    o.push(mkStroke(wl(cx+.6*r,cy-.5*r,cx+.12*r,cy-.28*r,1),{sw:7}));
    o.push(mkStroke(`M${f(cx-.36*r)} ${f(cy+.5*r)} L${f(cx-.18*r)} ${f(cy+.42*r)} L${f(cx)} ${f(cy+.52*r)} L${f(cx+.18*r)} ${f(cy+.42*r)} L${f(cx+.36*r)} ${f(cy+.5*r)}`,{sw:5.5}));
    o.push(mkStroke(`M${f(cx-.4*r)} ${f(cy-1.15*r)} C${f(cx-.55*r)} ${f(cy-1.3*r)} ${f(cx-.25*r)} ${f(cy-1.4*r)} ${f(cx-.4*r)} ${f(cy-1.6*r)} M${f(cx+.4*r)} ${f(cy-1.15*r)} C${f(cx+.25*r)} ${f(cy-1.3*r)} ${f(cx+.55*r)} ${f(cy-1.4*r)} ${f(cx+.4*r)} ${f(cy-1.6*r)}`,{sw:5,color:RED}));
  } else {
    o.push(dot(-.35),dot(.35));
    o.push(mkStroke(wl(cx-.6*r,cy-.25*r,cx-.12*r,cy-.46*r,1),{sw:5}));
    o.push(mkStroke(wl(cx+.6*r,cy-.25*r,cx+.12*r,cy-.46*r,1),{sw:5}));
    o.push(mkStroke(`M${f(cx-.32*r)} ${f(cy+.6*r)} Q${f(cx)} ${f(cy+.3*r)} ${f(cx+.32*r)} ${f(cy+.6*r)}`,{sw:5.5}));
    const tx=cx-.4*r,ty=cy+.1*r;
    o.push(mkStroke(`M${f(tx)} ${f(ty)} L${f(tx-9)} ${f(ty+26)} C${f(tx-9)} ${f(ty+42)} ${f(tx+9)} ${f(ty+42)} ${f(tx+9)} ${f(ty+26)} Z`,{sw:4.5,color:BLUE}));
  }
  return o;
}
/* "awe and anger made stories more likely to be shared." */
const awe=face(800,450,80,"awe");
elem(4.55,5.55,awe,0.03); fillAfter(awe[0],"#fff8d6",0,0.3);
const lA=ctext("awe",800,880,0.8,INK,6);
elem(5.6,5.95,lA.strokes,0.02);
const ang=face(1150,450,80,"anger");
elem(6.0,7.0,ang,0.03); fillAfter(ang[0],"#fee2e2",0,0.3);
const lG=ctext("anger",1150,880,0.8,INK,6);
elem(7.05,7.6,lG.strokes,0.02);
const u1=arrowS(800,740,800,580,GREEN,8);
const u2=arrowS(1150,740,1150,580,GREEN,8);
elem(7.65,8.25,[...u1,...u2],0.03);
/* "Sadness made them less likely." */
const sad=face(1500,450,80,"sad");
elem(8.3,9.2,sad,0.03); fillAfter(sad[0],"#dbeafe",0,0.3);
const d1=arrowS(1500,580,1500,740,RED,8);
elem(9.25,9.6,d1,0.03);
const lS=ctext("sadness",1500,880,0.8,INK,6);
elem(9.65,10.25,lS.strokes,0.02);

finalize(11.0);
