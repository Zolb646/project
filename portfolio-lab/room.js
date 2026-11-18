const panels = [...document.querySelectorAll('.panel')];
const canvas = document.querySelector('canvas');
const pen = canvas.getContext('2d');
const nav = document.querySelector('nav');
const jump = nav.querySelector('select');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const counter = document.querySelector('#counter');
const flatLayout = matchMedia('(prefers-reduced-motion: reduce), (max-height: 455px), (max-width: 680px) and (max-height: 620px)');

let width, height, stride, current = -1, frame = 0;

// Project a repeating set of beams and floor tiles toward a single vanishing point.
function drawRoom(position) {
  const horizon = height * .47;
  const center = width * .56;
  const project = (x, y, z) => [center + x * width / z, horizon + y * height / z];
  function polygon(color, points) {
    pen.fillStyle = color;
    pen.beginPath();
    for (const [i, [x, y]] of points.entries()) {
      if (i === 0) pen.moveTo(x, y);
      else pen.lineTo(x, y);
    }
    pen.closePath();
    pen.fill();
  }
  function line(color, a, b, weight = 1) {
    pen.strokeStyle = color;
    pen.lineWidth = weight;
    pen.beginPath();
    pen.moveTo(...a);
    pen.lineTo(...b);
    pen.stroke();
  }
  const near = .35, far = 18;
  const face = (color, a, b) => polygon(color, [project(...a, near), project(...a, far), project(...b, far), project(...b, near)]);
  pen.fillStyle = '#a3aaa0';
  pen.fillRect(0, 0, width, height);
  face('#d3d4c5', [-1,-.72], [1,-.72]);
  face('#c2bdb0', [-1,-.72], [-1,.68]);
  face('#d6caba', [1,-.72], [1,.68]);
  face('#202332', [-1,.68], [1,.68]);
  face('#ff7848', [-1,.27], [-1,.30]);
  face('#f78857', [1,.27], [1,.30]);
  for (let i = -4; i <= 4; i++) {
    line('#838582', project(i/4,.68,near), project(i/4,.68,far));
    line('#919386', project(i/4,-.72,near), project(i/4,-.72,far));
  }
  const offset = (position * 2.4) % 1;
  for (let i = 18; i >= 1; i--) {
    const z = i - offset;
    if (z < near) continue;
    const p = (x,y) => project(x,y,z);
    line('#747879',p(-1,.68),p(1,.68));
    polygon('#94958c',[p(-1,-.72),p(1,-.72),p(1,-.665),p(-1,-.665)]);
    for (const dir of [-1,1]) {
      polygon(dir < 0 ? '#96988e' : '#a79d91',[p(dir,-.72),p(dir*.957,-.665),p(dir*.957,.68),p(dir,.68)]);
      polygon('#fef9ef',[p(dir*.48,-.665),p(dir*.33,-.665),project(dir*.33,-.665,z+.5),project(dir*.48,-.665,z+.5)]);
      line('#ff8456', p(dir*.70,.68),project(dir*.70,.68,z+.55),Math.max(1,4/z));
    }
  }
}

function render() {
  frame = 0;
  if (!document.body.classList.contains('tour')) return;
  const position = Math.max(0, Math.min(panels.length - 1, scrollY / stride));
  drawRoom(position);
  const active = Math.round(position);
  for (const [i, panel] of panels.entries()) {
    const distance = i - position;
    const visible = distance > -.87 && distance < 1.68;
    panel.style.visibility = visible ? 'visible' : 'hidden';
    if (visible) {
      const scale = 1 / (1 + (distance >= 0 ? 1.95 : .78) * distance);
      const opacity = Math.max(0, 1 - Math.abs(distance) * (distance >= 0 ? .76 : 1.9));
      panel.style.transform = `translateX(${distance * 14}%) scale(${scale})`;
      panel.style.opacity = opacity;
      panel.style.zIndex = panels.length - i;
    }
    panel.inert = i !== active;
  }
  if (current !== active) {
    current = active;
    jump.value = String(active);
    counter.textContent = active === panels.length-1 ? 'EXIT' : String(active).padStart(2,'0') + ' / 04';
    prev.disabled = active === 0;
    next.disabled = active === panels.length-1;
  }
}

function scheduleRender() {
  if (!frame) frame = requestAnimationFrame(render);
}

function go(index, smooth = true) {
  if (!panels[index]) return;
  scrollTo({top:index * stride, behavior:smooth ? 'smooth' : 'instant'});
}

function arrange() {
  const tour = Boolean(pen) && !flatLayout.matches;
  document.body.classList.toggle('tour', tour);
  nav.hidden = !tour;
  if (!tour) {
    for (const panel of panels) {
      panel.inert = false;
      panel.removeAttribute('style');
    }
    current = -1;
    return;
  }
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  const density = Math.min(devicePixelRatio || 1, 1.75);
  canvas.width = Math.round(width * density);
  canvas.height = Math.round(height * density);
  pen.setTransform(density, 0, 0, density, 0, 0);
  stride = Math.max(460, height * .95);
  document.body.style.setProperty('--tour-height', (innerHeight + (panels.length-1) * stride) + 'px');
  render();
}

prev.addEventListener('click', () => go(current-1));
next.addEventListener('click', () => go(current+1));
jump.addEventListener('change', () => go(Number(jump.value)));
document.addEventListener('click', event => {
  const anchor = event.target.closest('a[href^="#"]');
  if (!anchor || nav.hidden) return;
  const index = panels.findIndex(panel => '#' + panel.id === anchor.hash);
  if (index !== -1) {
    event.preventDefault();
    go(index);
  }
});
addEventListener('keydown', event => {
  if (nav.hidden || event.altKey || event.ctrlKey || event.metaKey || event.target.closest('select,input,textarea')) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    go(current + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
addEventListener('resize', arrange);
flatLayout.addEventListener('change', arrange);
addEventListener('scroll', scheduleRender, {passive:true});
arrange();
if (!nav.hidden && location.hash) go(panels.findIndex(panel => '#' + panel.id === location.hash), false);
