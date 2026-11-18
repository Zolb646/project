const panels = [...document.querySelectorAll('.panel')];
const scenes = panels.map(panel => panel.querySelector('.scene'));
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

function render() {
  frame = 0;
  if (nav.hidden) return;
  const position = Math.max(0, Math.min(panels.length - 1, scrollY / stride));
  const outgoing = Math.floor(position);
  const fraction = position - outgoing;
  const transition = Math.max(0, Math.min(1, (fraction - .24) / .52));
  const wipe = transition * transition * (3 - 2 * transition);
  const active = Math.round(position);

  for (const [i, panel] of panels.entries()) {
    const entering = i === outgoing + 1;
    const visible = (i === outgoing && wipe < 1) || (entering && wipe > 0);
    panel.style.visibility = visible ? 'visible' : 'hidden';
    panel.inert = i !== active;
    if (!visible) continue;
    panel.style.zIndex = entering ? 2 : 1;
    const edge = 110 - wipe * 120;
    panel.style.clipPath = entering && wipe < 1
      ? `polygon(${edge + 7}% 0,100% 0,100% 100%,${edge - 7}% 100%)`
      : 'none';
    const travel = entering ? wipe - 1 : fraction;
    scenes[i].style.transform = `scale(${1 + Math.abs(travel) * .19}) translateX(${-travel * 2}%)`;
    exhibits[i].style.transform = `perspective(1600px) translateX(${-travel * 6}%) rotateY(${travel * -3}deg)`;
  }
  if (current === active) return;
  current = active;
  jump.value = String(active);
  counter.textContent = active === panels.length - 1 ? 'EXIT' : String(active).padStart(2,'0') + ' / 04';
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
      scenes[i].removeAttribute('style');
    }
    if (current >= 0) panels[current].scrollIntoView({behavior:'instant'});
    current = -1;
    return;
  }
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
    go(index);
  }
});
addEventListener('keydown', event => {
  if (viewer.open || nav.hidden || event.altKey || event.ctrlKey || event.metaKey || event.target.closest('select,input,textarea')) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    go(current + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
addEventListener('resize', arrange);
flatLayout.addEventListener('change', arrange);
addEventListener('scroll', () => {
  if (!frame && !nav.hidden) frame = requestAnimationFrame(render);
}, {passive:true});
arrange();
if (!nav.hidden && location.hash) go(panels.findIndex(panel => '#' + panel.id === location.hash), false);

const largeImage = viewer.querySelector('img');
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
document.querySelectorAll('[data-preview]').forEach(link => {
  link.addEventListener('click', event => {
    if (typeof viewer.showModal !== 'function' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    images = [{ src:link.href, alt:link.dataset.primaryAlt }];
    if (link.dataset.alternate) images.push({src:link.dataset.alternate, alt:link.dataset.alt});
    viewer.querySelector('h2').textContent = link.closest('.panel').querySelector('h2').textContent;
    switchImage.hidden = images.length === 1;
    showImage(0);
    viewer.showModal();
  });
});
switchImage.addEventListener('click', () => showImage((viewIndex + 1) % images.length));
viewer.querySelector('.close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => {
  if (event.target !== viewer) return;
  const bounds = viewer.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
});
