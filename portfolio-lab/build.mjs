import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';

const root = new URL('./', import.meta.url);
const output = new URL('dist/', root);
const publicDir = new URL('../zozos-portfolia/public/', root);
const stops = [
  {
    id: 'entrance', label: 'Entrance', title: 'The Workroom.', category: 'Zolbayar Byambajav',
    text: 'I’m Zozo, a frontend engineer in Ulaanbaatar. This is a walk through my work for the web and mobile.',
    color: 'orange',
  },
  {
    id: 'motion-studio', label: 'Motion Studio', title: 'Motion Studio', category: '01 / Browser tools',
    text: 'A canvas, a timeline and a set of keyframes. A browser-based animation editor I designed and built.',
    image: 'projects/motion-studio.webp', alt: 'Motion Studio with a kinetic title card open on its canvas',
    alternate: 'projects/motion-studio-orbit.webp', alternateAlt: 'Motion Studio editing the Orbit composition', caption: 'Animation editor', color: 'yellow', url: 'https://new.zolbayrr.com/motion-studio', action: 'Open the editor',
  },
  {
    id: 'galexora', label: 'Galexora', title: 'Galexora', category: '02 / Interactive atlas',
    text: 'Explore eight planets, trace their orbits and see the solar system through NASA imagery.',
    image: 'projects/galexora.webp', alt: 'Saturn and its rings in the Galexora planet explorer',
    alternate: 'projects/galexora-orbits.webp', alternateAlt: 'The interactive orbit map in Galexora', caption: 'Solar system atlas', color: 'teal', url: 'https://galexora.vercel.app', action: 'Explore Galexora',
  },
  {
    id: 'sign-language', label: 'Sign Language Web', title: 'Sign Language Web', category: '03 / Team project',
    text: 'A practice space for American and Mongolian sign language. I helped build the detection and vocabulary workflows.',
    image: 'projects/sign-language.png', alt: 'Sign Language Detector interface with ASL and MNSL practice options',
    caption: 'Live sign detection', color: 'violet', url: 'https://asl-mnsl.vercel.app/', action: 'Try the platform',
  },
  {
    id: 'wordgym', label: 'WordGym', title: 'WordGym', category: '04 / Mobile',
    text: 'A pocket vocabulary trainer with offline flashcards and practice games. Built with my team in React Native.',
    image: 'projects/wordgym-mobile.jpg', alt: 'WordGym mobile screens for decks, the library and games',
    phones: [
      ['661313709_35697584393162154_3255905771458649988_n.jpg', 'WordGym decks'],
      ['664954530_1471556507988038_4866793057172487913_n.jpg', 'WordGym flashcard'],
      ['661134893_1591413158632014_4849740364661075488_n.jpg', 'WordGym games'],
    ],
    alternate: 'projects/wordgym-showcase.jpg', alternateAlt: 'WordGym study decks, flashcards and vocabulary games', caption: 'Mobile vocabulary app', color: 'yellow', url: 'https://new.zolbayrr.com/projects/wordgym-mobile-app', action: 'Read the case study',
  },
  {
    id: 'contact', label: 'Contact', title: 'Get in touch.', category: 'End of the tour',
    text: 'Have a project in mind? I’d love to hear about it.',
    image: 'portrait.webp', alt: 'Portrait of Zozo', caption: 'Ulaanbaatar, Mongolia', color: 'orange', url: 'mailto:info@zolbayrr.com', action: 'info@zolbayrr.com',
  },
];

await mkdir(new URL('media/', output), { recursive: true });
for (const file of ['room.css', 'room.js']) {
  await copyFile(new URL(file, root), new URL(file, output));
}
for (const file of ['atrium.webp', 'gallery.webp', 'mark.svg']) {
  await copyFile(new URL(file, root), new URL('media/' + file, output));
}

async function copyImage(path) {
  const name = path.split('/').pop();
  await copyFile(new URL(path, path.startsWith('projects/') ? publicDir : root), new URL('media/' + name, output));
  return 'media/' + name;
}

const panels = [];
for (const stop of stops) {
  const entrance = stop.id === 'entrance';
  const contact = stop.id === 'contact';
  const heading = entrance ? 'h1' : 'h2';
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
      ${contact ? img : `<a class="screen" href="${src}" data-preview data-primary-alt="${stop.alt}" ${alternate} aria-label="Enlarge ${stop.title} preview">${img}<span aria-hidden="true">⤢</span></a>`}
      <figcaption>${stop.caption}</figcaption></figure>`;
  }
  panels.push(`<section class="panel ${stop.color}" id="${stop.id}" aria-labelledby="${stop.id}-title">
    <div class="scene" aria-hidden="true"></div>
    <div class="exhibit"><div class="copy"><p class="stamp">${stop.category}</p>
    <${heading} id="${stop.id}-title">${entrance ? 'The<br>Workroom<span>.</span>' : stop.title}</${heading}>
    <p class="intro">${stop.text}</p>
    <a class="action" href="${stop.url ?? '#motion-studio'}">${stop.action ?? 'Enter the gallery'} <span aria-hidden="true">${entrance ? '↓' : '↗'}</span></a></div>
    ${figure}</div></section>`);
}
const page = (await readFile(new URL('index.template.html', root), 'utf8'))
  .replace('<!-- panels -->', panels.join('\n'))
  .replace('<!-- stops -->', stops.map((stop, i) => `<option value="${i}">${stop.label}</option>`).join(''))
  .replace('<!-- track -->', stops.map(stop => `<a href="#${stop.id}" aria-label="Go to ${stop.label}" title="${stop.label}"></a>`).join(''));
await writeFile(new URL('index.html', output), page);
