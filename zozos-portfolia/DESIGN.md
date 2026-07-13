---
name: Zozo — Portfolio
description: A bold neo-brutalist portfolio that presents projects as pinned, stamped case files.
colors:
  accent-orange: "#ff6b35"
  accent-teal: "#4ecdc4"
  accent-yellow: "#ffe66d"
  accent-violet: "#a855f7"
  accent-orange-ink: "#c2410c"
  accent-teal-ink: "#0f766e"
  accent-yellow-ink: "#92400e"
  accent-violet-ink: "#7e22ce"
  navy: "#1a1a2e"
  cream: "#fef9ef"
  muted: "#4a4a68"
typography:
  display:
    fontFamily: "Avenir Next, Trebuchet MS, Segoe UI, sans-serif"
    fontSize: "clamp(3rem, 6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Avenir Next, Trebuchet MS, Segoe UI, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.25rem)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Avenir Next, Trebuchet MS, Segoe UI, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.875rem)"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Avenir Next, Trebuchet MS, Segoe UI, sans-serif"
    fontSize: "clamp(1rem, 1.2vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "var(--font-jetbrains-mono), Consolas, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.2em"
rounded:
  none: "0px"
  pill: "9999px"
  phone-frame-outer: "1.8rem"
  phone-frame-inner: "1.15rem"
spacing:
  control-x: "1.25rem"
  control-y: "0.75rem"
  card: "1.5rem"
  card-lg: "1.75rem"
  section-y: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.accent-orange}"
    textColor: "{colors.navy}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-secondary:
    backgroundColor: "{colors.accent-teal}"
    textColor: "{colors.navy}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-outline:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.navy}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  card:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.navy}"
    rounded: "{rounded.none}"
    padding: "{spacing.card}"
  badge:
    backgroundColor: "{colors.accent-yellow}"
    textColor: "{colors.navy}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 12px"
  badge-violet:
    backgroundColor: "{colors.accent-violet-ink}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 12px"
  input:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.navy}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
---

# Design System: Zozo — Portfolio

## 1. Overview

**Creative North Star: "The Studio Pinboard"**

The site reads like a working engineer's pinboard, not a polished marketing brochure: portraits sit slightly askew with sticky-note squares peeking out from behind them, a rotated status tag hangs off the hero image like a pinned note, and every project is presented as a stamped case file — challenge, ownership, architecture, lessons — rather than a bare skills list. The system is confident enough to show its seams: hard offset shadows instead of soft blur, thick navy borders instead of subtle hairlines, mono-stamped labels instead of quiet sans-serif captions. It is loud on purpose, because the positioning it serves — "this engineer already works like a team member, not a tutorial-follower" — needs evidence presented with conviction, not apologized for with a muted template look.

This system explicitly rejects the safe, cream-and-shadow SaaS default: no soft ambient glows, no rounded-corner minimalism, no gradient-text hero. Depth comes from flat, hard-edged shadows at fixed offsets, and shape stays sharp everywhere except the one place it represents real hardware (device mockups).

**Key Characteristics:**
- Hard-edged "brutal" drop shadows (no blur) as the entire elevation language
- Thick navy borders (2–3px) on every interactive surface
- A four-color accent rotation (orange, teal, yellow, violet) used deliberately per role, never mixed within one element
- Sharp, unrounded corners everywhere except device-mockup bezels
- Mono, uppercase, wide-tracked labels used as "stamps" on eyebrows, badges, and status tags
- Physical hover behavior: buttons press into their shadow, cards lift away from theirs
- Every animation and hover transition collapses to a near-instant state change under `prefers-reduced-motion: reduce`; scroll-reveals default to visible so nothing depends on JS or IntersectionObserver actually firing

## 2. Colors

The palette pairs a warm, paper-like cream field and near-black navy ink with four saturated accents, each assigned a single consistent job rather than used interchangeably.

### Primary
- **Signal Orange** (#ff6b35): the "go" color — primary button fill, active nav state, hero eyebrow text, logo mark, focus ring. Reserved for the single most important action or signal on a given screen.

### Secondary
- **Workbench Teal** (#4ecdc4): the secondary action color — secondary button fill, decorative sticky-note squares behind portraits, one badge variant. Cooler and calmer than orange; used for the "second" option next to a primary action.

### Tertiary
- **Highlighter Yellow** (#ffe66d): the accent-of-accents — text selection color, default badge fill, decorative sticky squares, the underline bar beneath most section headings. Reads as a literal highlighter mark.
- **Rare Violet** (#a855f7): reserved for the least common badge variant only. Its scarcity is the point — it should never anchor a primary surface.

### Neutral
- **Ink Navy** (#1a1a2e): the structural color — all body text, all borders, all shadow color, the mobile menu surface. Nearly everything that isn't cream or an accent is this exact navy.
- **Paper Cream** (#fef9ef): the base surface — page background, card fill, button-outline fill, input fill. Carries a faint dual radial-gradient tint (orange top-left, teal top-right) plus a 32px navy grid line pattern at 4% opacity, masked to fade out by 88% down the page.
- **Muted Slate** (#4a4a68): secondary text — subheadings, descriptions, supporting copy. Never used for primary body copy or headings.

### Named Rules
**The Ink Rule.** Every button, card, input, and badge gets a navy border (2px on small elements like badges, 3px everywhere else). It is the one non-negotiable structural line in the system — nothing floats without one.

**The One Job Per Accent Rule.** Orange means primary action or active state. Teal means secondary action. Yellow means highlight or default tag. Violet means rare tag only. Don't reassign an accent's job within a single view.

**The Ink-Safe Text Rule.** The four vivid accents (#ff6b35, #4ecdc4, #ffe66d, #a855f7) are fill and border colors, not text colors — measured against Paper Cream they land between 1.2:1 and 3.8:1, all short of WCAG AA's 4.5:1 for normal text. Whenever an accent needs to render as text, an icon stroke, or a small fill carrying text (a badge, a link, an eyebrow, a status message), use its ink variant instead: Signal Orange → `#c2410c`, Workbench Teal → `#0f766e`, Highlighter Yellow → `#92400e`, Rare Violet → `#7e22ce`. Each ink variant holds the parent's hue and clears 4.5:1 against cream and white. Exception: white text directly on a vivid accent fill (button/badge) — pair those with navy text instead, since white-on-accent fails contrast too (verified: white on Signal Orange is 2.84:1). Exception to the exception: yellow, teal, and outline fills already have enough headroom for navy text at full saturation; only orange (button-primary, badge-orange) and violet (badge-violet, which uses the ink fill directly) needed a swap.

## 3. Typography

**Display/Body Font:** Avenir Next (with Trebuchet MS, Segoe UI, sans-serif fallback — Avenir Next is a system/licensed font with no free web-embeddable source, so non-Mac visitors see the Trebuchet MS/Segoe UI fallback; that's an accepted degrade, not a bug)
**Label/Mono Font:** JetBrains Mono, self-hosted via `next/font/google` (with Consolas, SFMono-Regular, monospace fallback). Unlike the display/body face, JetBrains Mono is freely embeddable and is loaded for every visitor — the Stamped Label system is load-bearing to the brand identity, so it doesn't get to silently degrade to a system fallback the way the body face does.

**Character:** A single confident geometric-humanist sans carries nearly all display and body text, so the mono face reads as a distinct "stamp" register — every time JetBrains Mono appears, uppercase and wide-tracked, it signals metadata (an eyebrow, a tag, a status line) rather than narrative content.

### Hierarchy
- **Display** (800 extrabold, `clamp(3rem, 6vw, 4.5rem)`, line-height 0.95, letter-spacing -0.025em): the hero name/headline only — "Zozo."
- **Headline** (900 black, `clamp(1.875rem, 3vw, 2.25rem)`, line-height 1.1, letter-spacing -0.025em): section titles ("About", "Projects", "Experience"), always paired with a colored underline bar beneath.
- **Title** (700 bold, `clamp(1.25rem, 2vw, 1.875rem)`, line-height 1.2): the hero role line and card-level headings.
- **Body** (400 regular, `clamp(1rem, 1.2vw, 1.25rem)`, line-height 1.625): paragraph copy, capped near 65–75ch by the container width.
- **Label** (600 semibold, 0.75rem, letter-spacing 0.2em, uppercase, mono): eyebrows, badges, status tags, nav-adjacent metadata.

### Named Rules
**The Stamped Label Rule.** Any time text is functioning as metadata rather than a sentence — an eyebrow, a badge, a status pill — it switches to mono, uppercase, and 0.2em tracking. Narrative copy never uses mono.

## 4. Elevation

The system is flat at rest and uses hard-edged, non-blurred "brutal" shadows as its only depth cue — a solid navy silhouette offset from the shape, not a soft ambient glow. Elevation doubles as an interaction cue: elements move toward or away from their own shadow in response to hover/focus, so shadow size communicates pressed vs. lifted state rather than static hierarchy.

### Shadow Vocabulary
- **brutal-sm** (`box-shadow: 3px 3px 0 0 #1a1a2e`): small elements — eyebrow badges, status tags, secondary photo frame.
- **brutal** (`box-shadow: 5px 5px 0 0 #1a1a2e`): the default — buttons at rest, cards at rest.
- **brutal-lg** (`box-shadow: 8px 8px 0 0 #1a1a2e`): elevated/hover state — cards on hover, the primary hero portrait frame.

### Named Rules
**The Offset, Not Blur Rule.** Depth never comes from blur or opacity falloff — only a flat-color shadow at a fixed pixel offset. If a shadow needs softness to look right, it's the wrong tool here.

**The Press-or-Lift Rule.** Buttons press into their shadow on hover (translate 3px toward the shadow's offset, shadow disappears) to read as "pushed." Cards do the opposite — they lift away from the page (translate up, shadow grows from brutal to brutal-lg) to read as "raised." Under `prefers-reduced-motion: reduce`, every transition and animation in the system (press, lift, fade-in-up, slide-in) collapses to a 0.01ms near-instant state change rather than being disabled outright — the end state still communicates, just without motion.

**The Visible Focus Rule.** Keyboard focus gets a 3px solid outline in Ink-Safe Orange (`#c2410c`), offset 3px from the element — never the vivid Signal Orange, which only reaches 2.7:1 against Paper Cream and fails the 3:1 minimum for UI-component focus indicators. Inputs additionally gain the `brutal` shadow on focus (see Inputs below); neither treatment is ever removed without a replacement.

## 5. Components

### Buttons
- **Shape:** perfectly square, 0px radius, 3px navy border on every variant.
- **Primary:** Signal Orange fill, **navy** text (not white — white-on-orange only reaches 2.84:1), `brutal` shadow at rest.
- **Secondary:** Workbench Teal fill, navy text, `brutal` shadow at rest.
- **Outline:** Paper Cream fill, navy text, `brutal` shadow at rest — used for the tertiary/lowest-emphasis action.
- **Hover/Focus:** all three variants translate 3px right and down (toward the shadow's offset) while the shadow disappears, reading as a physical press. Disabled state drops opacity to 60% and suppresses the press animation.

### Badges
- **Style:** 2px navy border, mono uppercase label text, no radius. Four fills available: yellow default (navy text), teal (navy text), orange (navy text, not white — same 2.84:1 failure as the primary button), and violet, which uses the **ink-safe** violet fill (`#7e22ce`) with white text rather than the vivid violet swatch, since neither white nor navy clears 4.5:1 against the vivid version. Pick per the One Job Per Accent rule, don't mix roles.

### Cards
- **Corner Style:** square, 0px radius.
- **Background:** a soft white-to-transparent vertical gradient over cream with a 1px backdrop blur, so cards read as a slightly frosted layer above the page's grid-and-gradient background rather than a flat opaque block.
- **Shadow Strategy:** `brutal` at rest, `brutal-lg` + 4px upward lift on hover (see Press-or-Lift Rule).
- **Border:** 3px navy.
- **Internal Padding:** 24px (28px at `sm` breakpoint and up).

### Inputs / Fields
- **Style:** cream fill, 3px navy border, 0px radius, navy text with muted-slate placeholder.
- **Focus:** the `brutal` shadow appears on focus (it's absent at rest) rather than a glow or border-color shift — focus is signaled by gaining elevation, consistent with the rest of the system's shadow language.
- **Label:** semibold navy, sits above the field, not inline.

### Navigation
- **Style:** fixed top bar, transparent over the hero and solidifying (cream/95 + backdrop blur + 3px bottom border) once scrolled or on any non-home page. Logo is the wordmark "Zozo" with an orange period. Links use semibold sans; the active section turns Signal Orange, everything else is navy with an orange hover transition. Mobile collapses to a hamburger triggering a slide-in panel (`slide-in` keyframe, 300ms ease-out) over a solid navy surface.

### Pinboard Portrait (signature component)
The hero portrait is the clearest expression of the North Star: a primary photo in a `brutal-lg`-shadowed cream frame, with two Workbench-Teal and Highlighter-Yellow squares peeking out from behind it like sticky notes, a smaller secondary photo pinned at a -7° rotation like a Polaroid, and a rotated status tag reading "Status" in a Stamped Label. On hover, the whole group reacts as one physical object — the primary frame lifts and rotates slightly, the secondary photo and tag shift further out from behind it. Device-mockup frames in the project gallery use the one deliberate radius exception in the system (1.8rem outer / 1.15rem inner bezel) because they represent real phone hardware, not UI chrome.

## 6. Do's and Don'ts

### Do:
- **Do** keep every interactive surface (button, card, input, badge) perfectly square (0px radius) and bordered in 3px (2px for badges) Ink Navy.
- **Do** use only the three brutal shadow steps (3px / 5px / 8px, `0 0 #1a1a2e`, no blur) for elevation — never introduce a soft/ambient shadow alongside them.
- **Do** assign each accent color exactly one job per the One Job Per Accent rule (orange = primary/active, teal = secondary, yellow = highlight/default tag, violet = rare tag only).
- **Do** switch to mono/uppercase/0.2em-tracked type whenever text is acting as metadata (eyebrow, badge, status), and keep narrative copy in the sans display/body face.
- **Do** make buttons press into their shadow on hover/focus and cards lift away from theirs — elevation change is the interaction feedback, not a color or opacity shift.
- **Do** reserve rounded corners for the phone-mockup device frames only; that is the single sanctioned exception to the Sharp Corner posture.
- **Do** use the ink-safe accent variants (`accent-orange-ink`, `accent-teal-ink`, `accent-yellow-ink`, `accent-violet-ink`) for any text, link, icon stroke, or status message rendered on cream or white — the vivid accents are for fills and borders only.
- **Do** keep touch targets at 44×44px minimum on any control meant for touch (icon buttons, gallery arrows) — measure the full hit area, not just the visible glyph.

### Don't:
- **Don't** soften the system toward generic rounded-corner, soft-shadow SaaS minimalism — PRODUCT.md is explicit that the bold neo-brutalist identity is the differentiator against templated portfolios, not a phase to grow out of.
- **Don't** add gradient text, glassmorphism-as-decoration, or side-stripe colored borders anywhere in this system.
- **Don't** use a blurred or ambient shadow anywhere the brutal shadow vocabulary already applies.
- **Don't** let violet appear as a dominant surface color; it exists for scarcity.
- **Don't** round a button, card, input, or badge corner "for softness" — the sharp corner is load-bearing to the brand, not an oversight.
- **Don't** set a vivid accent color (`accent-orange`, `accent-teal`, `accent-yellow`, `accent-violet`) as a text or icon color on a light surface — none of the four clear WCAG AA on cream or white; use the matching ink variant.
- **Don't** pair white text with a vivid accent fill except where a specific contrast check has confirmed it (teal and yellow fills already clear it with navy text; orange and vivid violet do not, hence the navy-text and ink-fill exceptions above).
- **Don't** gate a section's initial visibility on JavaScript or `IntersectionObserver` actually firing — reveal-on-scroll is an enhancement layered on top of content that renders visible by default, per `AnimateOnScroll`'s isomorphic-effect pattern.
