import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';

const root = new URL('./', import.meta.url);
const output = new URL('dist/', root);
const publicDir = new URL('../zozos-portfolia/public/', root);
const stops = [
  {
    id: 'entrance', label: 'Entrance', title: 'The Workroom.', category: 'Zozo’s portfolio',
    text: 'I’m Zozo, a frontend engineer in Ulaanbaatar. Walk through four of my web and mobile projects.',
    image: 'portrait.webp', alt: 'Portrait of Zozo', caption: 'Zozo', color: 'orange',
  },
  {
    id: 'motion-studio', label: 'Motion Studio', title: 'Motion Studio', category: '01 / Browser tools',
    text: 'A canvas, a timeline and a set of keyframes. A browser-based animation editor I designed and built.',
    image: 'projects/motion-studio.webp', alt: 'Motion Studio with a kinetic title card open on its canvas',
    caption: 'Animation editor', color: 'yellow', url: 'https://new.zolbayrr.com/motion-studio', action: 'Open the editor',
  },
  {
    id: 'galexora', label: 'Galexora', title: 'Galexora', category: '02 / Interactive atlas',
    text: 'Explore eight planets, trace their orbits and see the solar system through NASA imagery.',
    image: 'projects/galexora.webp', alt: 'Saturn and its rings in the Galexora planet explorer',
    caption: 'Solar system atlas', color: 'teal', url: 'https://galexora.vercel.app', action: 'Explore Galexora',
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
    caption: 'Mobile vocabulary app', color: 'yellow', url: 'https://new.zolbayrr.com/projects/wordgym-mobile-app', action: 'Read the case study',
  },
  {
    id: 'contact', label: 'Contact', title: 'Get in touch.', category: 'End of the tour',
    text: 'Have a project in mind? I’d love to hear about it.',
    caption: 'Ulaanbaatar, Mongolia', color: 'orange', url: 'mailto:info@zolbayrr.com', action: 'info@zolbayrr.com',
  },
];

await mkdir(new URL('media/', output), { recursive: true });
for (const file of ['room.css', 'room.js']) {
  await copyFile(new URL(file, root), new URL(file, output));
}
const panels = [];
for (const stop of stops) {
  let artwork = '<div class="endmark" aria-hidden="true">Z<span>.</span></div>';
  if (stop.image) {
    const name = stop.image.split('/').pop();
    await copyFile(new URL(stop.image, stop.id === 'entrance' ? root : publicDir), new URL('media/' + name, output));
    artwork = `<img src="media/${name}" alt="${stop.alt}" decoding="async">`;
  }
  panels.push(`<section class="panel ${stop.color}" id="${stop.id}" aria-labelledby="${stop.id}-title">
    <div class="copy"><p class="stamp">${stop.category}</p>
    <${stop.id === 'entrance' ? 'h1' : 'h2'} id="${stop.id}-title">${stop.title}</${stop.id === 'entrance' ? 'h1' : 'h2'}>
    <p class="intro">${stop.text}</p>
    <a class="action" href="${stop.url ?? '#motion-studio'}">${stop.action ?? 'Enter the gallery'} <span aria-hidden="true">${stop.url ? '↗' : '↓'}</span></a></div>
    <figure><div class="mat">${artwork}</div><figcaption><span>${stop.caption}</span><span class="figure-num" aria-hidden="true">${stop.id === 'entrance' ? '✳' : stop.id === 'contact' ? '↗' : stop.category.slice(0, 2)}</span></figcaption></figure>
  </section>`);
}
const page = (await readFile(new URL('index.template.html', root), 'utf8'))
  .replace('<!-- panels -->', panels.join('\n'))
  .replace('<!-- stops -->', stops.map((stop, i) => `<option value="${i}">${stop.label}</option>`).join(''));
await writeFile(new URL('index.html', output), page);
