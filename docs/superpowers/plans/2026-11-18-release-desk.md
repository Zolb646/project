# Release Desk Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task by task.

**Goal:** Ship a usable release-readiness desk with a guided demo and real public GitHub evidence.

**Architecture:** A standalone Next.js route owns the interface. An immutable release model derives readiness and records approvals. A same-origin GitHub endpoint reads bounded public data. Versioned local storage holds the demo and repository drafts.

**Tech stack:** Next.js, React, TypeScript, CSS Modules, Node test runner.

**Spec:** [Release Desk design](../specs/2026-11-18-release-desk-design.md)

## Review focus

- No selected changes, open PRs, or unknown CI cannot be approved.
- A timestamp-only CI refresh retains sign-offs. Changed evidence or reopening resets them.
- Approval snapshots cannot be edited until reopened.
- Invalid local data restores the demo without crashing.
- Partial GitHub data and rate limits are distinguishable, and import accepts only canonical GitHub repository paths.

## Tasks

- [ ] Add failing release model tests for the sample workflow, blocked conditions, approval freeze, refresh identity, and local storage. Implement the state transitions and Markdown export in `src/lib/release-desk/model.ts`. Run the focused tests.
- [ ] Add failing GitHub tests for input normalization, actual merge and head refs, completion semantics, partial evidence, and rate limits. Add a GitHub client and the `/api/release-desk/github` route. Run the focused tests.
- [ ] Build `/release-desk` with workspace navigation, a release header, PR and QA views, an activity log, and a readiness rail. Use ink navy, warm-white surfaces, violet actions, and status colors for the four gates. Stack the rail above the work area on mobile. Verify import, draft switching, reset, approval, export, persistence, and keyboard access in Chromium.
- [ ] Capture the actual app for the English and Mongolian case study. Run the test suite, lint, type check, production build, and SEO checks. Push the scoped branch and deploy to the existing interactive portfolio project.
