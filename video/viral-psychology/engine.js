/* Shared whiteboard engine: builds the stage, the pen, the stroke font and the master clock.
   A scene file loads this, adds strokes with elem()/fillAfter(), then calls finalize(seconds). */
(function(){
  const st=document.createElement("style");
  st.textContent=`
  html,body{margin:0;height:100%;background:#1b1f23;overflow:hidden}
  #stage{position:absolute;left:0;top:0;width:1920px;height:1080px;transform-origin:0 0;
    background:#fdfcf8;box-shadow:inset 0 0 0 16px #e4e7ea,inset 0 0 90px rgba(60,70,80,.10)}
  svg{position:absolute;left:0;top:0;width:1920px;height:1080px}
  #draw path{fill:none;stroke-linecap:round;stroke-linejoin:round}
`;
  document.head.appendChild(st);
  const d=document.createElement("div"); d.id="stage";
  d.innerHTML=`<svg id="board" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
    <g id="fills"></g>
    <g id="draw"></g>
    <g id="hand" style="display:none">
      <g transform="rotate(42)">
        <path d="M0 0 L34 -10 L34 10 Z" id="nib" fill="#1f2937" stroke="#39424f" stroke-width="2" stroke-linejoin="round"/>
        <rect x="34" y="-14" width="230" height="28" rx="8" fill="#f5f7fa" stroke="#39424f" stroke-width="3"/>
        <rect x="34" y="-14" width="56" height="28" rx="5" id="band" fill="#1f2937"/>
        <rect x="236" y="-15" width="90" height="30" rx="10" fill="#39424f"/>
        <path d="M100 -7 L226 -7" stroke="#cfd6df" stroke-width="3" stroke-linecap="round"/>
      </g>
    </g>
  </svg>`;
  document.body.appendChild(d);
})();

/* ---------------------------------------------------------------
   Scene 1 — "A million-dollar ad budget..."   (whiteboard draw-on)
   One master clock: render(t) drives every stroke, fill and the hand.
   ?t=N freezes at N seconds.  No ?t plays once from 0.
---------------------------------------------------------------- */
const NS = "http://www.w3.org/2000/svg";
const svg = document.getElementById("board");
const drawG = document.getElementById("draw");
const fillG = document.getElementById("fills");
const hand = document.getElementById("hand");
const nib = document.getElementById("nib");
const band = document.getElementById("band");

const INK = "#1f2937", GREEN = "#15803d", RED = "#dc2626", BLUE = "#1d4ed8", SLATE = "#475569";
let T_END = 12.0;             // scene length (s), set by finalize()
const REST = { x: 2050, y: 1220 };   // hand parked off the board
const NIB_HOLD = 0.3;         // pen rests on the board after the last stroke

/* ---------- seeded wobble so the hand-drawn look is repeatable ---------- */
function rng(seed){ return function(){ seed|=0; seed=seed+0x6D2B79F5|0;
  let t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t;
  return ((t^t>>>14)>>>0)/4294967296; }; }
const R = rng(11);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const f=n=>n.toFixed(1);

/* ---------- single-stroke handwriting font (baseline 0, x-height 50) ---------- */
const BOWL="M42 -38 C36 -47 29 -50 22 -50 C10 -50 4 -38 4 -24 C4 -11 10 0 22 0 C30 0 38 -7 42 -14";
const ARCH="M6 -30 C8 -46 18 -50 26 -50 C38 -50 42 -42 42 -28 L42 2";
const G={
 a:{w:56,s:[BOWL,"M44 -52 L44 2"]},
 d:{w:56,s:[BOWL,"M44 -102 L44 2"]},
 g:{w:56,s:[BOWL,"M44 -52 L44 22 C44 36 36 42 24 42 C14 42 8 38 4 32"]},
 e:{w:54,s:["M6 -26 L44 -26 C44 -42 36 -50 24 -50 C12 -50 4 -40 4 -25 C4 -10 12 0 24 0 C34 0 40 -5 44 -12"]},
 h:{w:50,s:["M6 -102 L6 2",ARCH]},
 i:{w:22,s:["M10 -50 L10 2","M10 -74 L10.6 -72"]},
 J:{w:46,s:["M36 -100 L36 -20 C36 -2 24 4 12 2 C6 0 2 -4 2 -10"]},
 l:{w:26,s:["M10 -102 L10 -8 C10 -2 14 0 18 0"]},
 n:{w:50,s:["M6 -50 L6 2",ARCH]},
 o:{w:54,s:["M26 -50 C12 -50 4 -40 4 -25 C4 -10 12 0 26 0 C38 0 46 -10 46 -25 C46 -40 38 -50 26 -52"]},
 r:{w:38,s:["M6 -50 L6 2","M6 -28 C8 -44 18 -50 32 -48"]},
 s:{w:46,s:["M38 -42 C32 -50 14 -52 10 -40 C6 -28 36 -26 38 -12 C40 2 16 4 6 -6"]},
 t:{w:38,s:["M18 -80 L18 -10 C18 -2 24 0 32 -2","M4 -50 L34 -50"]},
 v:{w:44,s:["M4 -50 L22 0 L40 -50"]},
 B:{w:56,s:["M6 -100 L6 2","M6 -100 C34 -104 46 -92 40 -76 C36 -64 22 -56 6 -54 C34 -56 52 -44 46 -24 C42 -6 24 0 6 0"]},
 "1":{w:36,s:["M10 -78 L26 -100 L26 0"]},
 "0":{w:54,s:["M26 -100 C10 -100 3 -76 3 -50 C3 -24 10 0 26 0 C42 0 49 -24 49 -50 C49 -76 42 -100 28 -100"]},
 "6":{w:54,s:["M42 -88 C36 -100 28 -100 24 -100 C8 -100 2 -70 2 -40 C2 -12 10 0 26 0 C42 0 48 -12 48 -28 C48 -44 38 -54 26 -54 C14 -54 4 -46 2 -34"]},
 ",":{w:18,s:["M8 -4 L2 14"]},
 "$":{w:52,s:["M42 -78 C36 -96 10 -98 8 -78 C6 -58 40 -52 42 -30 C44 -6 12 -2 4 -22","M24 -112 L24 12"]},
 "=":{w:52,s:["M4 -36 L44 -36","M4 -16 L44 -16"]},
 "?":{w:48,s:["M6 -78 C8 -100 44 -104 44 -76 C44 -56 24 -52 24 -30 L24 -22","M24 -4 L24.6 -2"]},
 " ":{w:30,s:[]}
};
const widthOf=(str,sc)=>[...str].reduce((a,c)=>a+(G[c]?G[c].w:30)*sc,0);

/* ---------- stroke registry ---------- */
const segs = [];     // every drawable stroke: {el,len,k,ctm,color,t0,t1}
const fills = [];    // {el,t0,dur}

function mkStroke(d,{color=INK,sw=6,tf=null,k=1}={}){
  const p=document.createElementNS(NS,"path");
  p.setAttribute("d",d); p.setAttribute("stroke",color); p.setAttribute("stroke-width",sw);
  p.style.visibility="hidden";
  let parent=drawG;
  if(tf){ parent=document.createElementNS(NS,"g"); parent.setAttribute("transform",tf); drawG.appendChild(parent); }
  parent.appendChild(p);
  const len=p.getTotalLength();
  p.style.strokeDasharray=(len+1)+" "+(len+1);
  const m=p.getCTM();
  return {el:p,len,k,ctm:m,color,d};
}
function toBoard(s,pt){ const q=svg.createSVGPoint(); q.x=pt.x; q.y=pt.y; const r=q.matrixTransform(s.ctm); return {x:r.x,y:r.y}; }
function tip(s,frac){ return toBoard(s,s.el.getPointAtLength(s.len*frac)); }

/* schedule strokes inside a window; draw time shared out by length (constant pen speed) */
function elem(t0,t1,strokes,gap=0.035){
  const total=strokes.reduce((a,s)=>a+s.len*s.k,0);
  const draw=(t1-t0)-gap*(strokes.length-1);
  let t=t0, px=0;
  strokes.forEach(s=>{
    const dur=Math.max(0.04,draw*(s.len*s.k)/total);
    s.t0=t; s.t1=t+dur; t+=dur+gap; px+=s.len*s.k; segs.push(s);
  });
  console.log("elem",t0.toFixed(2),"-",t1.toFixed(2),"px/s",Math.round(px/draw));
  return strokes;
}
/* colour-in after the outline lands */
function fillAfter(stroke,color,delay=0.0,dur=0.3){
  const p=document.createElementNS(NS,"path");
  p.setAttribute("d",stroke.d); p.setAttribute("fill",color); p.setAttribute("stroke","none");
  p.style.opacity=0;
  let parent=fillG;
  fillG.appendChild(p);
  fills.push({el:p,stroke,delay,dur});
}

/* ---------- hand-drawn line helpers ---------- */
function wl(x1,y1,x2,y2,a=3){
  const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,o=(R()-.5)*2*a*Math.min(1,L/140);
  return `M${f(x1)} ${f(y1)} Q${f((x1+x2)/2-dy/L*o)} ${f((y1+y2)/2+dx/L*o)} ${f(x2)} ${f(y2)}`;
}
function poly(P,closed=true,a=3){
  const j=()=> (R()-.5)*2;
  const Q=P.map(p=>({x:p[0]+j()*1.5,y:p[1]+j()*1.5}));
  let d=`M${f(Q[0].x)} ${f(Q[0].y)}`;
  const n=closed?Q.length:Q.length-1;
  for(let i=0;i<n;i++){
    const A=Q[i],B=Q[(i+1)%Q.length],dx=B.x-A.x,dy=B.y-A.y,L=Math.hypot(dx,dy)||1,o=j()*a*Math.min(1,L/140);
    d+=` Q${f((A.x+B.x)/2-dy/L*o)} ${f((A.y+B.y)/2+dx/L*o)} ${f(B.x)} ${f(B.y)}`;
  }
  if(closed){ const A=Q[0],B=Q[1],dx=B.x-A.x,dy=B.y-A.y,L=Math.hypot(dx,dy)||1; d+=` L${f(A.x+dx/L*7)} ${f(A.y+dy/L*7)}`; }
  return d;
}
function smooth(P){
  let d=`M${f(P[0].x)} ${f(P[0].y)}`;
  for(let i=0;i<P.length-1;i++){
    const p0=P[i-1]||P[i],p1=P[i],p2=P[i+1],p3=P[i+2]||p2;
    d+=` C${f(p1.x+(p2.x-p0.x)/6)} ${f(p1.y+(p2.y-p0.y)/6)} ${f(p2.x-(p3.x-p1.x)/6)} ${f(p2.y-(p3.y-p1.y)/6)} ${f(p2.x)} ${f(p2.y)}`;
  }
  return d;
}
function loop(cx,cy,r){
  const P=[],ph=R()*6;
  for(let a=-110;a<=270;a+=30){
    const t=a*Math.PI/180,rr=r*(1+.045*Math.sin(2*t+ph));
    P.push({x:cx+rr*Math.cos(t),y:cy+rr*Math.sin(t)});
  }
  return smooth(P);
}
function text(str,x0,base,sc,colorFn,sw){
  const out=[]; let cx=x0; const pos=[];
  [...str].forEach((ch,i)=>{
    const g=G[ch]; if(!g){ cx+=30*sc; return; }
    const rot=(R()-.5)*4,sx=1+(R()-.5)*.08,dy=(R()-.5)*3*sc;
    const tf=`translate(${f(cx)} ${f(base+dy)}) rotate(${rot.toFixed(2)}) scale(${(sc*sx).toFixed(3)} ${sc})`;
    pos.push({ch,x0:cx,x1:cx+g.w*sc});
    g.s.forEach(d=>out.push(mkStroke(d,{color:colorFn(ch,i),sw:sw/sc,tf,k:sc})));
    cx+=g.w*sc;
  });
  return {strokes:out,pos,x0,x1:cx};
}


/* ======== full alphabet (adds to the glyphs above) ======== */
const BWL="M6 -34 C12 -46 20 -50 28 -50 C40 -50 46 -40 46 -25 C46 -10 40 0 28 0 C18 0 10 -6 6 -16";
Object.assign(G,{
 b:{w:54,s:["M6 -102 L6 2",BWL]},
 c:{w:50,s:["M44 -40 C38 -48 32 -50 24 -50 C12 -50 4 -40 4 -25 C4 -10 12 0 24 0 C32 0 38 -2 44 -10"]},
 f:{w:38,s:["M40 -92 C32 -104 20 -100 18 -86 L18 2","M4 -50 L34 -50"]},
 j:{w:26,s:["M16 -50 L16 22 C16 36 10 42 0 42","M16 -74 L16.6 -72"]},
 k:{w:46,s:["M6 -102 L6 2","M40 -50 L8 -20","M16 -28 L42 2"]},
 m:{w:74,s:["M6 -50 L6 2","M6 -30 C8 -46 16 -50 22 -50 C32 -50 36 -42 36 -28 L36 2","M36 -28 C38 -44 46 -50 54 -50 C64 -50 68 -42 68 -28 L68 2"]},
 p:{w:54,s:["M6 -50 L6 42",BWL]},
 q:{w:56,s:[BOWL,"M44 -52 L44 42"]},
 u:{w:48,s:["M6 -50 L6 -18 C6 -4 14 0 24 0 C34 0 42 -4 42 -18","M42 -50 L42 2"]},
 w:{w:56,s:["M4 -50 L16 0 L28 -36 L40 0 L52 -50"]},
 x:{w:44,s:["M4 -50 L40 2","M40 -50 L4 2"]},
 y:{w:46,s:["M4 -50 L22 -2","M42 -50 L18 34 C14 42 8 44 2 42"]},
 z:{w:50,s:["M6 -50 L42 -50 L6 0 L44 0"]},
 A:{w:52,s:["M4 2 L26 -100 L48 2","M12 -34 L40 -34"]},
 C:{w:52,s:["M48 -84 C42 -98 34 -102 26 -102 C10 -102 3 -76 3 -50 C3 -24 10 2 26 2 C36 2 44 -4 48 -18"]},
 D:{w:58,s:["M6 -100 L6 2","M6 -100 C40 -102 52 -76 52 -50 C52 -24 40 0 6 0"]},
 E:{w:50,s:["M46 -100 L6 -100 L6 0 L46 0","M6 -52 L38 -52"]},
 M:{w:60,s:["M6 2 L6 -100 L30 -40 L54 -100 L54 2"]},
 N:{w:56,s:["M6 2 L6 -100 L50 2 L50 -100"]},
 P:{w:52,s:["M6 -100 L6 2","M6 -100 C36 -104 48 -92 44 -76 C40 -60 24 -54 6 -54"]},
 S:{w:52,s:["M44 -84 C38 -102 12 -102 9 -84 C6 -66 42 -62 45 -40 C48 -16 14 0 4 -16"]},
 T:{w:52,s:["M2 -100 L50 -100","M26 -100 L26 2"]},
 V:{w:52,s:["M2 -100 L26 2 L50 -100"]},
 W:{w:66,s:["M2 -100 L16 2 L32 -70 L48 2 L62 -100"]},
 "2":{w:52,s:["M6 -76 C8 -98 44 -100 44 -74 C44 -56 22 -34 4 2 L48 2"]},
 "3":{w:52,s:["M6 -90 C20 -104 44 -98 40 -78 C38 -62 22 -56 18 -54 C40 -54 50 -40 46 -20 C42 0 14 6 4 -8"]},
 "4":{w:52,s:["M38 2 L38 -100 L4 -34 L50 -34"]},
 "5":{w:52,s:["M44 -100 L10 -100 L6 -56 C20 -66 44 -60 46 -34 C48 -8 18 6 4 -8"]},
 "7":{w:50,s:["M4 -100 L48 -100 L18 2"]},
 "8":{w:52,s:["M26 -52 C8 -56 6 -96 26 -100 C46 -98 44 -56 26 -52 C4 -48 2 0 26 0 C50 0 48 -48 26 -52"]},
 "9":{w:52,s:["M6 -12 C12 0 20 0 24 0 C40 0 46 -30 46 -60 C46 -88 38 -100 22 -100 C6 -100 0 -88 0 -72 C0 -56 10 -46 22 -46 C34 -46 44 -54 46 -66"]},
 ".":{w:16,s:["M4 -2 L4.6 0"]},
 "'":{w:14,s:["M6 -100 L4 -78"]},
 "!":{w:20,s:["M8 -100 L8 -28","M8 -4 L8.6 -2"]},
 "-":{w:32,s:["M4 -30 L26 -30"]},
 "%":{w:56,s:["M44 -100 L6 2","M12 -100 C4 -100 2 -88 8 -82 C14 -78 22 -82 22 -92 C22 -98 18 -100 12 -100","M38 -18 C30 -18 28 -6 34 0 C40 4 48 0 48 -10 C48 -16 44 -18 38 -18"]},
 "+":{w:48,s:["M4 -50 L44 -50","M24 -70 L24 -30"]},
 ":":{w:16,s:["M4 -34 L4.6 -32","M4 -4 L4.6 -2"]}
});

Object.assign(G,{I:{w:30,s:["M15 -100 L15 2","M5 -100 L25 -100","M5 2 L25 2"]}});
const ORANGE="#c2410c", PURPLE="#6d28d9", TEAL="#0f766e", GOLD="#f7c948", GRAY="#9ca3af";

/* ======== shape helpers ======== */
function ell(cx,cy,rx,ry){            // hand-drawn ellipse, slight overshoot
  const P=[],ph=R()*6;
  for(let a=-110;a<=270;a+=30){
    const t=a*Math.PI/180,k=1+.045*Math.sin(2*t+ph);
    P.push({x:cx+rx*k*Math.cos(t),y:cy+ry*k*Math.sin(t)});
  }
  return smooth(P);
}
const rectD=(x1,y1,x2,y2,a=3)=>poly([[x1,y1],[x2,y1],[x2,y2],[x1,y2]],true,a);
function starD(cx,cy,Ro,ri){ const P=[]; for(let i=0;i<10;i++){ const a=(-90+i*36)*Math.PI/180,r=i%2?ri:Ro; P.push([cx+r*Math.cos(a),cy+r*Math.sin(a)]); } return poly(P,true,0); }
function arrowS(x1,y1,x2,y2,color=INK,sw=6.5,bend=0){
  const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L,h=Math.min(34,L*.35);
  const mx=(x1+x2)/2-uy*bend,my=(y1+y2)/2+ux*bend;
  const shaft=mkStroke(`M${f(x1)} ${f(y1)} Q${f(mx)} ${f(my)} ${f(x2)} ${f(y2)}`,{sw,color});
  // head direction follows the end of the curve
  const ex=x2-mx,ey=y2-my,EL=Math.hypot(ex,ey)||1,vx=ex/EL,vy=ey/EL;
  const a1=[x2-h*(vx*Math.cos(.5)-vy*Math.sin(.5)),y2-h*(vy*Math.cos(.5)+vx*Math.sin(.5))];
  const a2=[x2-h*(vx*Math.cos(-.5)-vy*Math.sin(-.5)),y2-h*(vy*Math.cos(-.5)+vx*Math.sin(-.5))];
  const head=mkStroke(`M${f(a1[0])} ${f(a1[1])} L${f(x2)} ${f(y2)} L${f(a2[0])} ${f(a2[1])}`,{sw,color});
  return [shaft,head];
}
/* stick person. top = top of head.  arms: [[dxL,dyL],[dxR,dyR]] from shoulder, in px at sc=1 */
function person(cx,top,sc=1,{arms=[[-60,70],[60,70]],color=INK,sw=6.5,face="smile",skip=[]}={}){
  const r=42*sc,hy=top+r,ny=top+2*r,hip=top+210*sc,sh=top+2*r+34*sc;
  const out={};
  out.head=mkStroke(loop(cx,hy,r),{sw,color});
  if(face==="smile") out.face=mkStroke(`M${f(cx-r*.42)} ${f(hy+r*.2)} C${f(cx-r*.18)} ${f(hy+r*.55)} ${f(cx+r*.18)} ${f(hy+r*.55)} ${f(cx+r*.42)} ${f(hy+r*.2)}`,{sw:sw*.75,color});
  out.eyes=mkStroke(`M${f(cx-r*.34)} ${f(hy-r*.18)} L${f(cx-r*.33)} ${f(hy-r*.16)} M${f(cx+r*.34)} ${f(hy-r*.18)} L${f(cx+r*.35)} ${f(hy-r*.16)}`,{sw:sw*1.2,color});
  out.body=mkStroke(wl(cx,ny,cx,hip,2),{sw,color});
  out.armL=mkStroke(wl(cx,sh,cx+arms[0][0]*sc,sh+arms[0][1]*sc,3),{sw,color});
  out.armR=mkStroke(wl(cx,sh,cx+arms[1][0]*sc,sh+arms[1][1]*sc,3),{sw,color});
  out.legL=mkStroke(wl(cx,hip,cx-52*sc,hip+100*sc,3),{sw,color});
  out.legR=mkStroke(wl(cx,hip,cx+52*sc,hip+100*sc,3),{sw,color});
  out.list=["head","eyes","face","body","armL","armR","legL","legR"].filter(k=>out[k]&&!skip.includes(k)).map(k=>out[k]);
  out.hy=hy; out.r=r; out.sh=sh; out.hip=hip; out.feet=hip+100*sc;
  return out;
}
/* handwritten title with a wobbly underline; returns strokes in order */
function title(str,x,base,color,sc=1.2){
  const t=text(str,x,base,sc,()=>color,7);
  const ul=mkStroke(wl(x,base+22,t.x1-8,base+20,6),{sw:6,color});
  return {strokes:[...t.strokes,ul],x1:t.x1};
}
/* centred text helper */
function ctext(str,cx,base,sc,color,sw=6){ const w=widthOf(str,sc); return text(str,cx-w/2,base,sc,typeof color==="function"?color:()=>color,sw); }

function finalize(T){
segs.sort((a,b)=>a.t0-b.t0);
segs.forEach(s=>{ s.a=tip(s,0); s.b=tip(s,1); });
const LAST=Math.max(...segs.map(s=>s.t1));
T_END=Math.max(T,LAST+0.85);          // always leave time for the pen to leave the board
console.log("duration",T_END,"last stroke ends",LAST.toFixed(2));
/* =====================  MASTER RENDER  ===================== */
const ease=u=>u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;
function travel(A,B,u,lifted){
  const e=ease(clamp(u,0,1)),d=Math.hypot(B.x-A.x,B.y-A.y);
  const lift=lifted&&d>40?Math.min(38,d*.12)*Math.sin(Math.PI*clamp(u,0,1)):0;
  return {x:A.x+(B.x-A.x)*e,y:A.y+(B.y-A.y)*e-lift,lift};
}
function handAt(t){
  const first=segs[0];
  if(t<first.t0) return travel(REST,first.a,t/first.t0,false);
  let i=-1; for(let j=0;j<segs.length;j++){ if(segs[j].t0<=t) i=j; else break; }
  const s=segs[i];
  if(t<=s.t1){ const k=(t-s.t0)/(s.t1-s.t0),p=tip(s,k); return {x:p.x,y:p.y,lift:0,color:s.color}; }
  if(i===segs.length-1){
    const ex=s.t1+NIB_HOLD;
    if(t<ex) return {x:s.b.x,y:s.b.y,lift:0,color:s.color};
    const o=travel(s.b,REST,(t-ex)/(T_END-0.2-ex),true); o.color=s.color; return o;
  }
  const n=segs[i+1],g=n.t0-s.t1;
  const o=travel(s.b,n.a,g>0?(t-s.t1)/g:1,true); o.color=n.color; return o;
}
function render(t){
  for(const s of segs){
    const k=clamp((t-s.t0)/(s.t1-s.t0),0,1);
    if(k<=0){ s.el.style.visibility="hidden"; continue; }
    s.el.style.visibility="visible";
    s.el.style.strokeDashoffset=(s.len+1)-s.len*k;
  }
  for(const fl of fills){
    fl.el.style.opacity=clamp((t-(fl.stroke.t1+fl.delay))/fl.dur,0,1);
  }
  if(window.__noHand){ hand.style.display="none"; return; }
  const h=handAt(t);
  hand.style.display="";
  hand.setAttribute("transform",`translate(${f(h.x)} ${f(h.y)})`);
  const lf=h.lift||0;
  hand.style.filter=`drop-shadow(${(6+lf*.6).toFixed(1)}px ${(8+lf*.9).toFixed(1)}px ${(5+lf*.3).toFixed(1)}px rgba(40,50,60,${(.28-Math.min(.14,lf/260)).toFixed(2)}))`;
  nib.setAttribute("fill",h.color||INK); band.setAttribute("fill",h.color||INK);
}

/* ---------- fit to window, then run ---------- */
const stage=document.getElementById("stage");
function fit(){
  const s=Math.min(innerWidth/1920,innerHeight/1080);
  stage.style.transform=`translate(${(innerWidth-1920*s)/2}px,${(innerHeight-1080*s)/2}px) scale(${s})`;
}
fit(); addEventListener("resize",fit);
window.seek=render; window.T_END=T_END;

const q=new URLSearchParams(location.search), tq=q.get("t");
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
if(q.get("hand")==="0") window.__noHand=true;
if(tq!==null){ render(parseFloat(tq)); }
else if(reduced){ window.__noHand=true; render(T_END); }
else{
  let t0=null;
  (function loop_(now){ if(t0===null) t0=now; const t=(now-t0)/1000; render(Math.min(t,T_END)); if(t<T_END) requestAnimationFrame(loop_); })(performance.now());
  addEventListener("click",()=>location.reload());
}
window.__ready=true;

}
