import './workbench.js';
import { drawJourney, drawScan } from './journey.js';
const panels = [...document.querySelectorAll('.panel')];
const exhibits = panels.map(panel => panel.querySelector('.exhibit'));
const nav = document.querySelector('nav');
const jump = nav.querySelector('select');
const stops = [...nav.querySelectorAll('.track a')];
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const counter = document.querySelector('#counter');
const viewer = document.querySelector('dialog');
const flatLayout = matchMedia('(prefers-reduced-motion: reduce), (max-height: 455px), (max-width: 760px) and (max-height: 650px)');
let stride = 0;
let current = -1;
let frame = 0;
let monitorBox;

// Read layout coordinates before transforms so reversing a scroll follows the same lens path.
function measureMonitor() {
  const glass = document.querySelector('.glass');
  let x = glass.offsetWidth / 2, y = glass.offsetHeight / 2;
  for (let el = glass; el && el !== panels[0]; el = el.offsetParent) {
    x += el.offsetLeft;
    y += el.offsetTop;
  }
  monitorBox = {x, y, width:glass.offsetWidth, height:glass.offsetHeight};
}


const journey = document.querySelector('.journey');
const scan = document.querySelector('.scan');
const photo = scan.querySelector('img');
function prepareScan() {
  drawScan(scan.querySelector('canvas'),photo);
  scan.classList.add('ready');
}
if(photo.complete && photo.naturalWidth) prepareScan();
else photo.addEventListener('load',prepareScan,{once:true});

function render() {
  frame = 0;
  if (nav.hidden) return;
  const position = Math.max(0, Math.min(panels.length - 1, scrollY / stride));
  document.body.classList.toggle('at-entrance', position < .5);
  const outgoing = Math.floor(position);
  const fraction = position - outgoing;
  const transition = Math.max(0, Math.min(1, (fraction - .24) / .52));
  const wipe = transition * transition * (3 - 2 * transition);
  const active = Math.round(position);

  const travelling = position > 4.17 && position < 7;
  journey.hidden = !travelling;
  if(travelling) drawJourney(journey, Math.min(1,Math.max(0,(position-4.24)/2.7)));
  document.body.classList.toggle('light-room', active > 0 && active < 5);
  for (const [i, panel] of panels.entries()) {
    const entering = i === outgoing + 1;
    const visible = (i === outgoing && wipe < 1) || (entering && wipe > 0);
    panel.style.visibility = visible ? 'visible' : 'hidden';
    panel.inert = i !== active;
    if (!visible) continue;
    const travel = entering ? wipe - 1 : wipe;
    panel.style.zIndex = entering ? 2 : 1;
    panel.style.opacity = '1';
    panel.style.transform = 'none';
    panel.style.clipPath = 'none';
    exhibits[i].style.transform = 'none';
    if(outgoing === 0 && wipe > 0 && monitorBox?.width) {
      const {x,y,width,height} = monitorBox;
      const vw = journey.clientWidth || document.documentElement.clientWidth;
      const vh = panels[0].clientHeight;
      const zoom = 1 + (Math.max(vw/width,vh/height)*1.12-1)*wipe*wipe;
      const dx = (vw/2-x)*wipe, dy = (vh/2-y)*wipe;
      if (!entering) {
        panel.style.transformOrigin = `${x}px ${y}px`;
        panel.style.transform = `translate(${dx}px,${dy}px) scale(${zoom})`;
      } else {
        const top = Math.max(0,y+dy-height*zoom/2);
        const right = Math.max(0,vw-x-dx-width*zoom/2);
        const bottom = Math.max(0,vh-y-dy-height*zoom/2);
        const left = Math.max(0,x+dx-width*zoom/2);
        panel.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px round ${(1-wipe)*26}px)`;
        panel.style.opacity = String(wipe);
      }
    } else if(outgoing < 4) {
      panel.style.transform = `translateY(${-travel*100}%)`;
      exhibits[i].style.transform = `perspective(1300px) rotateX(${travel*16}deg) scale(${1-.06*Math.abs(travel)})`;
    } else if(outgoing === 4 && !entering) {
      panel.style.transform = `scale(${1+wipe*.63})`;
      panel.style.opacity = String(1-wipe);
    } else if(i === 5 || i === 6) {
      panel.style.opacity = String(entering ? Math.max(0,2*wipe-1) : Math.max(0,1-2*wipe));
    } else if(entering && i === 7) {
      panel.style.clipPath = `inset(${(1-wipe)*47}% ${(1-wipe)*48}%)`;
    }
  }
  if (current === active) return;
  current = active;
  jump.value = String(active);
  counter.textContent = active > 4 ? ['BUILD','CITY','EXIT'][active-5] : String(active).padStart(2,'0') + ' / 04';
  for (const [i, stop] of stops.entries()) {
    if (i === active) stop.setAttribute('aria-current', 'step');
    else stop.removeAttribute('aria-current');
  }
  prev.disabled = active === 0;
  next.disabled = active === panels.length - 1;
}

function go(index, smooth = true) {
  if (panels[index]) scrollTo({top:index * stride, behavior:smooth ? 'smooth' : 'instant'});
}

function arrange() {
  const previousPosition = stride && !nav.hidden ? scrollY / stride : null;
  const tour = !flatLayout.matches;
  document.body.classList.toggle('tour', tour);
  nav.hidden = !tour;
  if (!tour) {
    for (const [i, panel] of panels.entries()) {
      panel.inert = false;
      panel.removeAttribute('style');
      exhibits[i].removeAttribute('style');

    }
    document.body.classList.remove('light-room','at-entrance');
    journey.hidden = true;
    if (current >= 0) panels[current].scrollIntoView({behavior:'instant'});
    current = -1;
    return;
  }
  measureMonitor();
  stride = Math.max(460, document.querySelector('.viewport').clientHeight * .95);
  document.body.style.setProperty('--tour-height', (innerHeight + (panels.length - 1) * stride) + 'px');
  if (previousPosition !== null) scrollTo({top:previousPosition * stride, behavior:'instant'});
  render();
}

prev.addEventListener('click', () => go(current - 1));
next.addEventListener('click', () => go(current + 1));
jump.addEventListener('change', () => go(Number(jump.value)));
document.addEventListener('click', event => {
  const anchor = event.target.closest('a[href^="#"]');
  if (!anchor || nav.hidden || event.metaKey || event.ctrlKey) return;
  const index = panels.findIndex(panel => '#' + panel.id === anchor.hash);
  if (index !== -1) {
    event.preventDefault();
    if (location.hash !== anchor.hash) history.pushState(null, '', anchor.hash);
    go(index, !anchor.hasAttribute('data-channel'));
  }
});
addEventListener('keydown', event => {
  if (viewer.open || nav.hidden || event.altKey || event.ctrlKey || event.metaKey || event.target.closest('select,input,textarea,.tuner')) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    go(current + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
addEventListener('popstate', () => {
  if (nav.hidden) return;
  const index = location.hash ? panels.findIndex(panel => '#' + panel.id === location.hash) : 0;
  if (index >= 0) go(index,false);
});
addEventListener('resize', arrange);
flatLayout.addEventListener('change', arrange);
addEventListener('scroll', () => {
  if (!frame && !nav.hidden) frame = requestAnimationFrame(render);
}, {passive:true});
arrange();
if (!nav.hidden && location.hash) go(panels.findIndex(panel => '#' + panel.id === location.hash), false);

const largeImage = viewer.querySelector('.featured');
const switchImage = viewer.querySelector('.switch');
const description = viewer.querySelector('#viewer-caption');
let images = [];
let viewIndex = 0;
function showImage(index) {
  viewIndex = index;
  const { src, alt } = images[index];
  largeImage.src = src;
  largeImage.alt = alt;
  description.textContent = alt;
}
const projects = [...document.querySelectorAll('[data-preview]')];
const flanks = [...viewer.querySelectorAll('.flank')];
let projectIndex = 0;
function selectProject(index) {
  projectIndex = (index + projects.length) % projects.length;
  const link = projects[projectIndex];
  images = [{src:link.href,alt:link.dataset.primaryAlt}];
  if(link.dataset.alternate) images.push({src:link.dataset.alternate,alt:link.dataset.alt});
  viewer.querySelector('h2').textContent = link.closest('.panel').querySelector('h2').textContent;
  switchImage.hidden = images.length === 1;
  showImage(0);
  for(const [i,button] of flanks.entries()){
    const other=projects[(projectIndex+(i ? 1 : -1)+projects.length)%projects.length];
    const name=other.closest('.panel').querySelector('h2').textContent;
    button.querySelector('img').src=other.href;
    button.querySelector('span').textContent=name;
    button.setAttribute('aria-label','View '+name);
  }
}
for(const [i,link] of projects.entries()){
  link.addEventListener('click',event=>{
    if(typeof viewer.showModal !== 'function' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)return;
    event.preventDefault();
    selectProject(i);
    viewer.showModal();
  });
}
for(const [i,button] of flanks.entries()){
  button.addEventListener('click',()=>selectProject(projectIndex+(i ? 1 : -1)));
}
viewer.addEventListener('keydown',event=>{
  if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
    event.preventDefault();
    selectProject(projectIndex+(event.key==='ArrowRight'?1:-1));
  }
});
switchImage.addEventListener('click', () => showImage((viewIndex + 1) % images.length));
viewer.querySelector('.close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => {
  if (event.target !== viewer) return;
  const bounds = viewer.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
});
