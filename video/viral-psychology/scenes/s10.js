/* Scene 10 - Design (8.2 s) */
const GRN="#15803d";
drawG.setAttribute("transform","translate(130 0)"); fillG.setAttribute("transform","translate(130 0)");
/* "So before you post, ask why someone would look good sharing this." */
const phone=mkStroke(poly([[170,200],[430,200],[430,660],[170,660]],true,4),{sw:7});
const scr=mkStroke(rectD(192,250,408,560,2),{sw:5});
const heart=mkStroke("M300 500 C250 465 238 400 272 384 C292 376 300 394 300 404 C300 394 308 376 328 384 C362 400 350 465 300 500",{sw:6.5,color:RED});
const btn=mkStroke("M300 620 L301 620",{sw:10});
elem(0.1,1.5,[phone,scr,heart,btn],0.04); fillAfter(phone,"#e5e7eb",0,0.3); fillAfter(scr,"#ffffff",0,0.1); fillAfter(heart,"#fecaca",0,0.25);
const q1=text("Why would someone",560,300,0.62,()=>BLUE,5.5);
const q2=text("look good sharing this?",560,410,0.62,()=>BLUE,5.5);
elem(1.6,2.9,q1.strokes,0.01);
elem(2.95,4.5,q2.strokes,0.01);

/* "Virality isn't luck." */
const vi=ctext("Virality isn't luck.",960,720,0.8,INK,6.5);
elem(4.6,6.0,vi.strokes,0.01);
const lk=vi.pos.filter((_,i)=>i>=vi.pos.length-5);
const strike=mkStroke(wl(lk[0].x0-8,720-30,lk[lk.length-1].x1+8,720-24,3),{sw:9,color:RED});
elem(6.05,6.3,[strike]);

/* "It's design." */
const ds=ctext("It's design.",960,930,1.1,PURPLE,8);
elem(6.4,7.6,ds.strokes,0.01);
const ul=mkStroke(wl(ds.x0,965,ds.x1,962,6),{sw:7,color:PURPLE});
elem(7.65,7.95,[ul]);

finalize(8.6);
