# Zozo portfolio design

The user selected a clean, minimal, light direction on 2026-11-18.

## Visual direction

The portfolio leads with the engineer's name, a brief introduction, and a real
portrait. Selected work follows in an open two-column gallery. Real project
images carry the visual variety; the surrounding interface stays quiet.

- White canvas: `#ffffff`
- Main text: `#20252b`
- Secondary text: `#626c78`
- Dividers: `#e4e7ec`
- Secondary surface: `#f6f7f9`
- Blue link/focus accent: `#315bce`

Manrope is the display and body family. Use medium weight and tight spacing for
the large name, restrained semibold for headings, and regular body text.
JetBrains Mono is available for technical content only.

## Layout

- Container widths: 1280px for the homepage and 1200px for detail content,
  including responsive gutters.
- Header: compact wordmark, quiet navigation, language switch, contact link.
- Hero: name and introduction on the left, portrait on the right. On phones,
  the portrait becomes a small circular image beneath the actions.
- Work: large images with captions, descriptions, and a short technology list.
  All, Web, and Mobile filters update the same gallery.
- About, experience, and skills: open text layouts separated by light rules.
- Contact: a quiet gray surface with the existing contact form.

## Components and interaction

Primary actions use charcoal with white text and rounded ends. Secondary actions
use a light border or an understated text link. Inputs have a contrasting gray border (`#848c97`) and
visible blue focus. Project images have a small corner radius. Cards on detail
pages use a light border without offset shadows.

Keep content visible before hydration. Use motion only for hover feedback and
filter changes, and respect reduced motion. Retain keyboard navigation, native
form validation, dialog focus handling, localized links, and the existing SEO.
