import { stripTypeScriptTypes } from 'node:module';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';

const root = new URL('./', import.meta.url);
const output = new URL('dist/', root);
const publicDir = new URL('../zozos-portfolia/public/', root);
const stops = [
  {
    id: 'entrance', label: 'Entrance',
  },
  {
    id: 'motion-studio', label: 'Motion Studio', title: 'Motion Studio', category: '01 / Browser tools',
    text: 'Drag the playhead to scrub a title card. I built the timeline, canvas renderer and export tools for this browser-based editor.',
    role: 'Design & frontend', stack: 'TypeScript / Canvas API',
    image: 'projects/motion-studio.webp', alt: 'Motion Studio with a kinetic title card open on its canvas',
    alternate: 'projects/motion-studio-orbit.webp', alternateAlt: 'Motion Studio editing the Orbit composition', caption: 'Animation editor', color: 'yellow', url: 'https://new.zolbayrr.com/motion-studio', action: 'Open the editor',
  },
  {
    id: 'galexora', label: 'Galexora', title: 'Galexora', category: '02 / Interactive atlas',
    text: 'I built an atlas of eight planets with an orbital map and a daily image feed from NASA. Pick a planet to trace its orbit and explore the mission archive.',
    role: 'Frontend development', stack: 'Next.js / NASA APOD',
    image: 'projects/galexora.webp', alt: 'Saturn and its rings in the Galexora planet explorer',
    alternate: 'projects/galexora-orbits.webp', alternateAlt: 'The interactive orbit map in Galexora', caption: 'Solar system atlas', color: 'teal', url: 'https://galexora.vercel.app', action: 'Explore Galexora',
  },
  {
    id: 'sign-language', label: 'Sign Language Web', title: 'Sign Language Web', category: '03 / Team project',
    text: 'Our team built a practice space for American and Mongolian sign language. I worked on the GraphQL and database features behind its live practice and vocabulary tools.',
    role: 'Full-stack team project', stack: 'GraphQL / Prisma',
    image: 'projects/sign-language.png', alt: 'Sign Language Detector interface with ASL and MNSL practice options',
    caption: 'Live sign detection', color: 'violet', url: 'https://asl-mnsl.vercel.app/', action: 'Try the platform',
  },
  {
    id: 'wordgym', label: 'WordGym', title: 'WordGym', category: '04 / Mobile',
    text: 'My team built a pocket vocabulary trainer. I worked on deck navigation, offline study and the practice games that put each new word to use.',
    role: 'Mobile development', stack: 'React Native / SQLite',
    image: 'projects/wordgym-mobile.jpg', alt: 'WordGym mobile screens for decks, the library and games',
    phones: [
      ['661313709_35697584393162154_3255905771458649988_n.jpg', 'WordGym decks'],
      ['664954530_1471556507988038_4866793057172487913_n.jpg', 'WordGym flashcard'],
      ['661134893_1591413158632014_4849740364661075488_n.jpg', 'WordGym games'],
    ],
    alternate: 'projects/wordgym-showcase.jpg', alternateAlt: 'WordGym study decks, flashcards and vocabulary games', caption: 'Mobile vocabulary app', color: 'yellow', url: 'https://new.zolbayrr.com/projects/wordgym-mobile-app', action: 'Read the case study',
  },
  {
    id: 'assembly', label: 'Engineering', title: 'On the production floor.', category: 'Engineering / erxes',
    text: 'At erxes I build and maintain production interfaces with React, TypeScript and GraphQL.',
    url: '#passage', action: 'Continue', color: 'teal',
  },
  {
    id: 'passage', label: 'Ulaanbaatar', title: 'Ulaanbaatar.', category: 'Home / Mongolia',
    text: 'I work from Ulaanbaatar, building for people on the web and on mobile.',
    url: '#contact', action: 'Get in touch', color: 'teal',
  },
  {
    id: 'contact', label: 'Contact', title: 'Get in touch.', category: 'End of the tour',
    text: 'Have a project in mind? I’d love to hear about it.',
    color: 'orange', url: 'mailto:info@zolbayrr.com', action: 'info@zolbayrr.com',
  },
];

await mkdir(new URL('media/', output), { recursive: true });
for (const file of ['room.css', 'room.js', 'journey.js', 'workbench.css', 'workbench.js']) {
  await copyFile(new URL(file, root), new URL(file, output));
}
for (const file of ['atrium.webp', 'gallery.webp', 'mark.svg', 'exit-room.webp', 'portrait.webp', 'terminal.webp']) {
  await copyFile(new URL(file, root), new URL('media/' + file, output));
}

for (const file of ['barlow-condensed-bold.ttf', 'OFL.txt']) {
  await copyFile(new URL('fonts/' + file, root), new URL('media/' + file, output));
}
// Run the same scene, interpolation and canvas renderer that ship in the full editor.
for (const module of ['model', 'render']) {
  const source = await readFile(new URL('../zozos-portfolia/src/lib/motion-studio/' + module + '.ts', root), 'utf8');
  const js = stripTypeScriptTypes(source).replace('from "./model"', 'from "./model.js"');
  await writeFile(new URL(module + '.js', output), js);
}

async function copyImage(path) {
  const name = path.split('/').pop();
  await copyFile(new URL(path, path.startsWith('projects/') ? publicDir : root), new URL('media/' + name, output));
  return 'media/' + name;
}

const projects = stops.filter(stop => stop.image);
const workIndex = projects.map((project, index) => `<a href="#${project.id}" data-channel="${index+1}">
  <img src="media/${project.image.split('/').pop()}" width="72" height="46" alt=""><span><small>${project.category}</small><strong>${project.label}</strong></span><b aria-hidden="true">↗</b></a>`).join('');

const panels = [];
for (const stop of stops) {
  const entrance = stop.id === 'entrance';
  if (entrance) {
    panels.push(`<section id="entrance" class="panel home" aria-labelledby="entrance-title"><div class="exhibit home-grid">
      <div class="identity">
        <p class="byline"><i aria-hidden="true"></i> Frontend engineer at erxes</p>
        <h1 id="entrance-title">Zolbayar<br>Byambajav<span>.</span></h1>
        <p class="identity-intro">I’m Zozo. I build interfaces for the web and mobile, from a keyframe editor to an atlas of the solar system.</p>
        <a href="#motion-studio" class="enter">Explore my work <b aria-hidden="true">↘</b></a>
      </div>
      <div class="workstation"><div class="instrument">
        <img class="hardware" src="media/terminal.webp" alt="Orange desktop terminal" fetchpriority="high" width="1254" height="1254">
        <a class="glass" href="#assembly" aria-label="About Zozo">
          <div class="scan"><img src="media/portrait.webp" alt=""><canvas></canvas></div>
          <img class="program" alt="" hidden><span class="crt-caption">Zozo / Profile</span>
        </a>
      </div>
      <div class="tuner" hidden><button aria-label="Previous channel">←</button><output aria-live="polite">CH 00 / Profile</output><button aria-label="Next channel">→</button></div></div>
      <div class="work-index" aria-label="Selected projects">${workIndex}</div>
      </div></section>`);
    continue;
  }
  let figure = '';
  if (stop.image) {
    const src = await copyImage(stop.image);
    let img = `<img src="${src}" alt="${stop.alt}" decoding="async">`;
    if (stop.phones) {
      const phones = [];
      for (const [file, alt] of stop.phones) {
        const phone = await copyImage('projects/wordgym-gallery/' + file);
        phones.push(`<img src="${phone}" alt="${alt}" decoding="async">`);
      }
      img = `<div class="phones">${phones.join('')}</div>`;
    }
    const alternate = stop.alternate ? `data-alternate="${await copyImage(stop.alternate)}" data-alt="${stop.alternateAlt}"` : '';
    figure = `<figure>
      <a class="screen" href="${src}" data-preview data-primary-alt="${stop.alt}" ${alternate} aria-label="Enlarge ${stop.title} preview">${img}<span aria-hidden="true">⤢</span></a>
      ${stop.id === 'motion-studio' ? `<div class="sample" hidden><canvas width="960" height="540" aria-label="Night Shift animated title card"></canvas>
      <div class="timeline"><button type="button" aria-label="Play animation">▶</button><input aria-label="Animation playhead" type="range" min="0" max="6000" step="10" value="0"><output>0.0 s</output></div></div>` : ''}
      <figcaption>${stop.caption}</figcaption></figure>`;
  }
  panels.push(`<section class="panel ${stop.color} ${stop.image ? 'catalogue' : ''}" id="${stop.id}" aria-labelledby="${stop.id}-title">
    <div class="scene" aria-hidden="true"></div>
    <div class="exhibit"><div class="copy"><p class="stamp">${stop.category}</p>
    <h2 id="${stop.id}-title">${stop.title}</h2>
    <p class="intro">${stop.text}</p>
    <a class="action" href="${stop.url}">${stop.action} <span aria-hidden="true">${stop.url.startsWith('#') ? '↓' : '↗'}</span></a>
    ${stop.role ? `<dl class="credits"><div><dt>Role</dt><dd>${stop.role}</dd></div><div><dt>Tools</dt><dd>${stop.stack}</dd></div></dl>` : ''}</div>
    ${figure}</div></section>`);
}
const page = (await readFile(new URL('index.template.html', root), 'utf8'))
  .replace('<!-- panels -->', panels.join('\n'))
  .replace('<!-- stops -->', stops.map((stop, i) => `<option value="${i}">${stop.label}</option>`).join(''))
  .replace('<!-- track -->', stops.map(stop => `<a href="#${stop.id}" aria-label="Go to ${stop.label}" title="${stop.label}"></a>`).join(''));
await writeFile(new URL('index.html', output), page);
