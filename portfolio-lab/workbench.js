// The channel on the physical monitor follows the work index, or the two tuner buttons.
const entries = [...document.querySelectorAll('[data-channel]')];
const tuner = document.querySelector('.tuner');
const display = document.querySelector('.glass');
const program = display.querySelector('.program');
const portrait = display.querySelector('.scan');
const caption = display.querySelector('.crt-caption');
const channels = [{ title:'Profile', url:'#assembly' }, ...entries.map(link => ({
  title:link.querySelector('strong').textContent,
  url:link.hash,
  image:link.querySelector('img').src,
}))];
let channel = 0;

function tune(number) {
  channel = (number + channels.length) % channels.length;
  const station = channels[channel];
  display.href = station.url;
  display.setAttribute('aria-label', channel ? 'Open ' + station.title : 'About Zozo');
  portrait.hidden = channel !== 0;
  program.hidden = channel === 0;
  if (station.image) program.src = station.image;
  caption.textContent = channel ? station.title : 'Zozo / Profile';
  tuner.querySelector('output').textContent = 'CH ' + String(channel).padStart(2,'0') + ' / ' + station.title;
  entries.forEach((entry,i) => entry.classList.toggle('tuned', i+1 === channel));
}
tuner.hidden = false;
tuner.querySelector('button:first-child').addEventListener('click', () => tune(channel - 1));
tuner.querySelector('button:last-child').addEventListener('click', () => tune(channel + 1));
entries.forEach((link,i) => {
  link.addEventListener('focus', () => tune(i+1));
  link.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') tune(i+1); });
});

async function enableSample() {
  const sample = document.querySelector('.sample');
  const canvas = sample.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const [{demoScene},{drawScene}] = await Promise.all([import('./model.js'),import('./render.js')]);
  const scene = demoScene();
  const assets = new Map();
  const range = sample.querySelector('input');
  const play = sample.querySelector('button');
  const output = sample.querySelector('output');
  let animation = 0;
  let started = 0;
  function draw(time) {
    range.value = time;
    drawScene(ctx,scene,time,assets);
    output.textContent = (time/1000).toFixed(1) + ' s';
  }
  function pause() {
    cancelAnimationFrame(animation);
    animation = 0;
    play.textContent = '▶';
    play.setAttribute('aria-label','Play animation');
  }
  function tick(now) {
    const time = Math.min(now - started,scene.duration);
    draw(time);
    if (time === scene.duration) pause();
    else animation = requestAnimationFrame(tick);
  }
  play.addEventListener('click', () => {
    if (animation) return pause();
    const position = Number(range.value);
    started = performance.now() - (position >= scene.duration ? 0 : position);
    play.textContent = 'Ⅱ';
    play.setAttribute('aria-label','Pause animation');
    animation = requestAnimationFrame(tick);
  });
  range.addEventListener('input', () => { pause(); draw(Number(range.value)); });
  const panel = sample.closest('.panel');
  new MutationObserver(() => { if (panel.inert) pause(); }).observe(panel,{attributes:true,attributeFilter:['inert']});
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  draw(0);
  sample.hidden = false;
  sample.closest('figure').classList.add('playable');
}
enableSample().catch(error => console.error('Animation preview unavailable',error));
