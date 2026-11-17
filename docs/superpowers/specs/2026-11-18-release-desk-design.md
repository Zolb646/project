# Release Desk

## Purpose

Release Desk is an interactive portfolio project for someone coordinating a software release. It brings the proposed changes, CI evidence, QA work, and approval into one release view. A portfolio visitor should be able to unblock and approve a sample release within a few minutes without creating a GitHub account.

The first version combines a self-contained sample workspace with read-only import from public GitHub repositories. Demo identities, CI actions, and sign-offs are labeled as simulated. The app represents readiness for a recorded set of changes. It does not assert GitHub branch-protection compliance or actually deploy code.

## Core workflow

1. The demo opens on a release with a failing check and incomplete QA. The visitor can see the exact reasons the release is blocked and resolve the sample check using a clearly labeled demo action.
2. The visitor creates or edits a release, selects PRs, records QA outcomes and notes, and records QA and release-owner sign-offs. A visible activity log captures the changes against the active release.
3. The release becomes ready once it contains changes, all selected PRs have merged, imported CI is passing for their recorded commit references, every required QA item has passed, and the two sign-offs apply to the current change set. Unknown, failed, pending, and unavailable checks keep it blocked with a reason.
4. Marking a ready release approved records a timestamp and freezes its evidence. Reopening it clears its sign-offs. Editing selected changes, their commit references or reported CI results, or required QA results clears prior sign-offs on a draft. A refresh that only updates the last-checked time leaves sign-offs valid. Draft metadata and notes may still be edited without clearing sign-offs.
5. The visitor can copy or download plain Markdown release notes with links to the selected PRs, their recorded CI and QA state, sign-offs, and the approval timestamp where present.

## GitHub import

Accept a public GitHub repository in owner/repo form or as a GitHub repository URL. Validate the names server-side and derive GitHub API paths from those names. List recent open and merged PRs with a bounded page size. For merged PRs, use the reported merge commit; for open PRs, use the current head commit for the preview. Import status only for PRs the visitor selects, with a manual refresh that can replace that snapshot. Show the recorded commit ref and last refresh time. Treat request failures and no reported checks as unknown rather than passing.

Read GitHub Checks and legacy commit statuses. Any failing check blocks readiness, pending checks keep it pending, and a completed set passes only if every reported result is success, neutral, or skipped and at least one result is success. Expose API limits and incomplete snapshots explicitly. Bound caching, timeout, pagination, and concurrent requests. Avoid rendering remote text as HTML or storing a GitHub token in the browser.

Reference: [GitHub pull requests](https://docs.github.com/en/rest/pulls/pulls#list-pull-requests), [check runs](https://docs.github.com/en/rest/checks/runs#list-check-runs-for-a-git-reference), and [combined commit status](https://docs.github.com/en/rest/commits/statuses#get-the-combined-status-for-a-specific-reference).

## App and portfolio

- The app lives at /release-desk in the existing Next.js project. It has an independent, utilitarian visual design with the active release, the readiness reasons, and the next action easy to scan.
- Release data is stored in the current browser. The visitor can open the demo or create and reopen multiple drafts. Each draft has its own PRs, QA, and sign-offs and belongs to one repository. Importing a different repository does not replace existing drafts. The demo is stored separately so a visitor can reset it without affecting their imported drafts. This is a design choice for v1. Use a versioned storage format with safe handling of stale or invalid data.
- Real team accounts, shared workspaces, private-repo permissions, GitHub write actions, webhooks, and automatic deployments are outside the first release.
- The portfolio gets an English and Mongolian case study with a working demo link after the app works. The app's first interface language is English.
- The builder can choose the component structure and exact visual treatment. Keep keyboard navigation, screen-reader labels and status announcements, small-screen reflow, and reduced-motion support.

## Acceptance criteria

A visitor can complete the sample release, see it blocked for the expected reasons, approve it, export release notes, and see the same local state after refreshing. Once approval evidence changes, the app must require fresh sign-offs. A visitor can import real PR and CI data from a public repo, distinguish request errors from rate limits, and reopen a saved draft after trying a different repository. Both locale versions of the portfolio can launch the demo. The release state transitions are covered by tests, and the main workflow is verified in a browser.
