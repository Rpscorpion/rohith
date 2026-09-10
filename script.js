const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
$("#y").textContent=new Date().getFullYear();
const menu=$(".menu"),nav=$(".hud nav");menu?.addEventListener("click",()=>nav.classList.toggle("open"));
$$(".hud nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

// Cinematic reveal: each scene gets a subtle depth shift while entering/leaving.
const scenes=$$(".scene");
const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle("in-view",e.isIntersecting)),{threshold:.18});
scenes.forEach(s=>io.observe(s));

// Reference-style timeline interaction: hover/tap a year -> clock needle moves.
const hand=$(".hand"), cards=$$(".year-card");
function setYear(card){
  cards.forEach(c=>c.classList.remove("active"));
  card.classList.add("active");
  hand.style.transform=`translateX(-50%) rotate(${card.dataset.angle}deg)`;
}
cards.forEach(c=>{c.addEventListener("mouseenter",()=>setYear(c));c.addEventListener("focus",()=>setYear(c));c.addEventListener("click",()=>setYear(c))});
setYear(cards[0]);

// Pointer parallax for the floating project wall.
if(matchMedia("(pointer:fine)").matches){
  $$(".project").forEach(card=>{
    card.addEventListener("mousemove",e=>{
      const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      card.style.setProperty("--rx",`${-y*4}deg`);
      card.style.setProperty("--ry",`${x*4}deg`);
    });
    card.addEventListener("mouseleave",()=>{card.style.setProperty("--rx","0deg");card.style.setProperty("--ry","0deg")});
  });
}

// For the reference-like "move through the work" feeling.
addEventListener("scroll",()=>{
  const y=scrollY;
  $$(".projects .project").forEach((p,i)=>{
    const r=p.getBoundingClientRect(),depth=(innerHeight/2-(r.top+r.height/2))*0.018;
    if(r.bottom>0&&r.top<innerHeight) p.style.setProperty("--py",`${depth}px`);
  });
},{passive:true});
