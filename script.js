(function(){
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const yearEl = document.getElementById("year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const nav = document.querySelector(".nav");
  const onScroll = () => {
    if(window.scrollY > 8) nav.classList.add("is-stuck");
    else nav.classList.remove("is-stuck");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, {passive:true});

  const revealTargets = document.querySelectorAll("[data-reveal]");
  if(!reduceMotion && "IntersectionObserver" in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },{threshold:.12});
    revealTargets.forEach(el=>io.observe(el));
  }else{
    revealTargets.forEach(el=>el.classList.add("in"));
  }

  const canvas = document.querySelector(".hero__canvas");
  const hero = document.querySelector(".hero");
  if(!canvas || !hero || reduceMotion) return;

  const ctx = canvas.getContext("2d");
  let w,h,dpr,nodes,raf;
  const mouse={x:-999,y:-999};
  const VIOLET="91,75,224";
  const CORAL="255,106,85";

  function size(){
    dpr=Math.min(window.devicePixelRatio||1,2);
    w=canvas.clientWidth; h=canvas.clientHeight;
    canvas.width=w*dpr; canvas.height=h*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    buildNodes();
  }

  function buildNodes(){
    const count=Math.max(22,Math.min(48,Math.round((w*h)/26000)));
    nodes=Array.from({length:count},()=>({
      x:Math.random()*w,y:Math.random()*h,
      vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,
      r:Math.random()*1.6+1,coral:Math.random()<.25
    }));
  }

  function step(){
    ctx.clearRect(0,0,w,h);
    const linkDist=132;
    for(let i=0;i<nodes.length;i++){
      const n=nodes[i];
      n.x+=n.vx;n.y+=n.vy;
      if(n.x<0||n.x>w)n.vx*=-1;
      if(n.y<0||n.y>h)n.vy*=-1;

      const dxm=mouse.x-n.x,dym=mouse.y-n.y,dm=Math.hypot(dxm,dym);
      if(dm<150 && dm>0){
        n.x+=(dxm/dm)*.35;n.y+=(dym/dm)*.35;
      }

      for(let j=i+1;j<nodes.length;j++){
        const m=nodes[j],dx=n.x-m.x,dy=n.y-m.y,d=Math.hypot(dx,dy);
        if(d<linkDist){
          const a=(1-d/linkDist)*.5;
          ctx.strokeStyle=`rgba(${VIOLET},${a})`;
          ctx.lineWidth=1;
          ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
        }
      }
    }

    for(const n of nodes){
      ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${n.coral?CORAL:VIOLET},.85)`;
      ctx.fill();
    }
    raf=requestAnimationFrame(step);
  }

  hero.addEventListener("mousemove",e=>{
    const rect=canvas.getBoundingClientRect();
    mouse.x=e.clientX-rect.left;mouse.y=e.clientY-rect.top;
  });
  hero.addEventListener("mouseleave",()=>{
    mouse.x=-999;mouse.y=-999;
  });

  let resizeT;
  window.addEventListener("resize",()=>{
    clearTimeout(resizeT);resizeT=setTimeout(size,150);
  });

  const heroObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        if(!raf) step();
      }else{
        cancelAnimationFrame(raf);raf=null;
      }
    });
  });
  heroObs.observe(hero);

  size();
  step();
})();