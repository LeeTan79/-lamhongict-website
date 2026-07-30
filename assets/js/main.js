
const toggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.main-nav');
const header=document.querySelector('.site-header');
const progress=document.querySelector('.page-progress');
const backTop=document.querySelector('.back-top');

toggle?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded',String(open));
});
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

window.addEventListener('scroll',()=>{
  const y=window.scrollY;
  const max=document.documentElement.scrollHeight-window.innerHeight;
  header?.classList.toggle('scrolled',y>10);
  backTop?.classList.toggle('show',y>500);
  if(progress&&max>0)progress.style.width=((y/max)*100)+'%';
});
backTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}
}),{threshold:.13});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const counterObserver=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(!e.isIntersecting)return;
  const el=e.target,target=Number(el.dataset.count),start=performance.now();
  function run(now){
    const p=Math.min((now-start)/1100,1);
    el.textContent=Math.floor(target*(1-Math.pow(1-p,3)));
    if(p<1)requestAnimationFrame(run);else el.textContent=target;
  }
  requestAnimationFrame(run);
  counterObserver.unobserve(el);
}),{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>counterObserver.observe(el));
