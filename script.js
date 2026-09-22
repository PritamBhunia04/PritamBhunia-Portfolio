const nav = document.querySelector('.navbar');
const menuBtn = document.querySelector('.menu-btn');
menuBtn.addEventListener('click', () => nav.classList.toggle('open'));

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('nav a')];
window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
});

document.getElementById('year').textContent = new Date().getFullYear();

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
function makeParticles() {
  particles = Array.from({length: Math.min(75, Math.floor(innerWidth / 16))}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.4 + .3,
    vx: (Math.random() - .5) * .18,
    vy: (Math.random() - .5) * .18
  }));
}
function animateParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach((p,i) => {
    p.x += p.vx; p.y += p.vy;
    if(p.x<0||p.x>canvas.width) p.vx*=-1;
    if(p.y<0||p.y>canvas.height) p.vy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(183,255,60,.45)';
    ctx.fill();
    for(let j=i+1;j<particles.length;j++){
      const q=particles[j], dx=p.x-q.x, dy=p.y-q.y, d=Math.hypot(dx,dy);
      if(d<120){
        ctx.beginPath();
        ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
        ctx.strokeStyle=`rgba(183,255,60,${.07*(1-d/120)})`;
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(animateParticles);
}
resizeCanvas(); makeParticles(); animateParticles();
window.addEventListener('resize', () => { resizeCanvas(); makeParticles(); });
