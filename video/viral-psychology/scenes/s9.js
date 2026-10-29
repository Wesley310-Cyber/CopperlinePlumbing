/* Scene 9 - The six ingredients (7.6 s) */
/* "Social currency, triggers, emotion, public, practical value, stories." */
const GRN="#15803d";
const names=[
  ["Social currency",130,200,BLUE],["Triggers",130,330,ORANGE],["Emotion",130,460,RED],
  ["Public",1010,200,GRN],["Practical value",1010,330,TEAL],["Stories",1010,460,PURPLE]
];
const nm=names.map(([s,x,y,c])=>text(s,x,y,0.7,()=>c,6));
const win=[[0.15,0.95],[1.0,1.55],[1.6,2.05],[2.1,2.55],[2.6,3.55],[3.6,4.05]];
nm.forEach((t,i)=>elem(win[i][0],win[i][1],t.strokes,0.008));

/* "You don't need all six, but each one raises the odds." */
const steps=mkStroke("M200 1010 L200 930 L390 930 L390 850 L580 850 L580 770 L770 770 L770 690 L960 690 L960 610 L1150 610 L1150 530 L1340 530 L1340 1010 L200 1010",{sw:7});
elem(4.15,5.25,[steps],0.0); fillAfter(steps,"#dbeafe",0,0.3);
const rise=arrowS(240,880,1440,450,ORANGE,9,-80);
elem(5.3,5.85,rise,0.03);
const od=ctext("odds",1650,600,1.5,ORANGE,8);
elem(5.9,6.7,od.strokes,0.02);

finalize(7.6);
