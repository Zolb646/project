# Interactive Portfolio Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task by task.

**Goal:** Refresh the existing portfolio with useful, accessible interactions and publish an independent version at new.zolbayrr.com.

**Architecture:** Keep Next.js, existing bilingual content, project routes, contact delivery, and SEO. Add an interactive project browser in the hero and category filtering in selected work. Deploy a separate Vercel project from a feature branch to preserve the current production site.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4. No new production dependencies.

**Spec:** User request in this session: make the portfolio feel more interactive and current, choose the direction, deploy to new.zolbayrr.com, and record standing project-scoped commit/push permission globally.

## Design decisions

- Keep the recognizable pinboard palette: paper #fffdf5, ink #202027, orange #ff7a45, teal #99e4d2, yellow #ffe566; white for the browser surface.
- Keep Bricolage Grotesque for display, Manrope for body, JetBrains Mono only for browser metadata.
- Hero: identity and concise copy on the left; an interactive project window on the right. Show real work immediately, with selectable projects and real screenshots. A small portrait preserves the personal introduction.
- Work section: All, Web, and Mobile buttons filter real case studies; preserve direct links and server-rendered initial content.
- Keep motion user-triggered, with reduced-motion support. Avoid adding decorative cursor effects or autoplay.
- Update canonical origin through an environment variable so each deployment has correct metadata.

## Global constraints

- Communicate with the user in Mongolian; repository documentation and commits in English.
- The user explicitly delegated design choices and authorized deployment and scoped commit/push.
- Preserve output/linkedin-profile-update.txt, which was already untracked.
- Global commit/push exception applies only to /home/zolb646/Projects/project (Zolb646/project).

## Review focus

- Initial HTML includes the selected project even before hydration.
- Keyboard users can operate project selection and filters.
- Mobile layouts fit at 320px without horizontal overflow.
- Both locales retain correct labels and localized project links.
- New deployment has its own origin and working contact configuration.

## Tasks

- [x] Verify the existing site and missing interactions; inspect deployment access.
- [x] Add localized interactive hero, project browser, and project filters.
- [x] Verify interaction states in the browser plus lint, typecheck, existing tests, build, and SEO checks.
- [ ] Record global permission, commit scoped changes, and push the feature branch.
- [ ] Create a separate Vercel deployment, attach new.zolbayrr.com, configure DNS, and verify live routes.

## Verification and final decisions

- Existing interactions were absent on the original site, then project selection, matching case-study destination, and mobile filtering passed browser checks.
- Both languages fit at 390px; Mongolian also fits at 320px with no horizontal overflow.
- Removed the generic sketch toggle after review: real screenshots give a more accurate view of each project.
- Added a regression test for a trailing slash in the deployment origin; verified it fails before normalizing the URL and passes afterward.

- Final production build with `NEXT_PUBLIC_SITE_URL=https://new.zolbayrr.com/` passed; 7 tests, lint, typecheck, and 10-page plus 6-fallback SEO checks passed.
- Vercel deployment dpl_5WkGjYXwaF5P5NazFEXM3bUaJ7tS is ready; DNS CNAME verification passed.
