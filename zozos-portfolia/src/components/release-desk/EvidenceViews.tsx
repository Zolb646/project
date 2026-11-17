"use client";

import { useState, type FormEvent } from "react";
import { LuArrowUpRight, LuCheck, LuChevronDown, LuCircleAlert, LuClock3, LuGitMerge, LuGitPullRequest, LuPlus, LuRotateCw, LuX } from "react-icons/lu";
import { ciResult, DEMO_ID, githubPullUrl, MAX_CHANGES, MAX_QA, type Change, type QaResult, type Release, type ReleaseAction } from "@/lib/release-desk/model";
import styles from "./desk.module.css";

const ciLabels = { success: "Passing", failure: "Failed", pending: "Pending", neutral: "Skipped / neutral", unknown: "Unknown" };
const qaLabels = { pending: "Pending", passed: "Passed", failed: "Failed" };

function ChangeTitle({ change, repo }: { change: Change; repo?: string }) {
  const label = <> <span className={styles.prNumber}>#{change.number}</span> {change.title}</>;
  return <div className={styles.changeTitle}>
    {repo ? <a href={githubPullUrl(repo, change.number)} target="_blank" rel="noreferrer">{label}<LuArrowUpRight aria-hidden /></a> : <strong>{label}</strong>}
    <span className={styles.changeMeta}>@{change.author}</span>
  </div>;
}

export function ChangesView({ release, candidates, picking, loading, evidenceNumber, anotherListLoading, anotherEvidenceLoading, act, showPicker, refresh, select }: {
  release: Release;
  candidates: Change[] | undefined;
  picking: boolean;
  loading: boolean;
  evidenceNumber?: number;
  anotherListLoading: boolean;
  anotherEvidenceLoading: boolean;
  act: (action: ReleaseAction) => void;
  showPicker: () => void;
  refresh: (change: Change) => void;
  select: (change: Change) => void;
}) {
  const demo = release.id === DEMO_ID;
  const locked = Boolean(release.approvedAt);
  const firstFailure = release.changes.find(({ ci }) => ciResult(ci) === "failure");
  const available = candidates?.filter((candidate) => !release.changes.some(({ number }) => number === candidate.number)) ?? [];
  const evidenceBusy = anotherEvidenceLoading || evidenceNumber !== undefined;

  return <>
    <div className={styles.viewHeading}>
      <div><h2>Pull requests</h2><p>{release.changes.length} selected for this release</p></div>
      {!locked && <button type="button" className={styles.button} onClick={showPicker} aria-expanded={picking} disabled={anotherListLoading && !picking}>
        {picking ? <LuX aria-hidden /> : <LuPlus aria-hidden />} {picking ? "Close picker" : "Add pull requests"}
      </button>}
    </div>
    {!locked && anotherListLoading && <p className={styles.waiting} role="status">Loading pull requests for another draft…</p>}
    {!locked && anotherEvidenceLoading && <p className={styles.waiting} role="status">Refreshing CI for another draft…</p>}

    {picking && !locked && <section className={styles.picker} aria-label="Available pull requests">
      <h3>Available pull requests</h3>
      {loading ? <p role="status">Loading recent pull requests…</p> :
        available.length ? <ul>{available.map((change) => <li className={styles.candidate} key={change.number}>
          <ChangeTitle change={change} repo={demo ? undefined : release.repo} />
          <span className={styles.pill} data-tone={change.state === "merged" ? "purple" : "slate"}>{change.state}</span>
          <button type="button" className={styles.smallButton} disabled={release.changes.length >= MAX_CHANGES || evidenceBusy} onClick={() => select(change)}
            aria-label={`Add pull request #${change.number}`}><LuPlus aria-hidden /> Add</button>
        </li>)}</ul> : <p>{candidates ? "No more recent open or merged pull requests to add." : "Pull requests could not be loaded. Close the picker and try again."}</p>}
      {release.changes.length >= MAX_CHANGES && <p>This release already has {MAX_CHANGES} pull requests.</p>}
    </section>}

    {demo && firstFailure && !locked && <div className={styles.nextAction}>
      <LuCircleAlert aria-hidden />
      <div><strong>CI failed on PR #{firstFailure.number}</strong><p>Simulate a passing rerun to clear the CI gate.</p></div>
      <button type="button" className={styles.button} onClick={() => act({ type: "fixDemoCheck", number: firstFailure.number })}>
        <LuRotateCw aria-hidden /> Simulate rerun
      </button>
    </div>}

    {release.changes.length ? <ul className={styles.changeList}>
      {release.changes.map((change) => {
        const result = ciResult(change.ci);
        const waiting = evidenceNumber === change.number;
        return <li key={change.number} className={styles.change}>
          <div className={styles.changeTop}>
            <span className={styles.changeIcon} data-merged={change.state === "merged"}>
              {change.state === "merged" ? <LuGitMerge aria-hidden /> : <LuGitPullRequest aria-hidden />}
            </span>
            <ChangeTitle change={change} repo={demo ? undefined : release.repo} />
            <span className={styles.pill} data-tone={change.state === "merged" ? "purple" : "slate"}>{change.state}</span>
            {!locked && <button type="button" className={styles.iconButton} disabled={waiting}
              aria-label={`Remove pull request #${change.number}`} onClick={() => act({ type: "remove", number: change.number })}><LuX aria-hidden /></button>}
          </div>

          <details className={styles.evidence}>
            <summary><span className={styles.pill} data-tone={result}>CI {ciLabels[result].toLowerCase()}</span>
              {change.sha && <code>{change.sha.slice(0, 7)}</code>}<LuChevronDown aria-hidden /></summary>
            {change.ci?.checks.length ? <ul>{change.ci.checks.map((check, index) =>
              <li key={`${check.name}-${index}`}><span>{check.name}</span><span className={styles.pill} data-tone={check.result}>{ciLabels[check.result]}</span></li>
            )}</ul> : <p>No CI checks are recorded for this commit.</p>}
            {change.ci && !change.ci.complete && <p>GitHub returned incomplete check results.</p>}
            {change.ci && <p>Checked <time dateTime={change.ci.checkedAt}>{change.ci.checkedAt.slice(0, 16).replace("T", " ")} UTC</time></p>}
          </details>
          {!demo && !locked && <button type="button" className={styles.refresh} disabled={evidenceBusy} onClick={() => refresh(change)}>
            <LuRotateCw aria-hidden /> {waiting ? "Refreshing…" : "Refresh CI"}
          </button>}
        </li>;
      })}
    </ul> : <div className={styles.empty}><LuGitPullRequest aria-hidden /><h3>No pull requests selected</h3><p>Add a recent open or merged pull request to start collecting evidence.</p></div>}
  </>;
}

export function QaView({ release, act }: { release: Release; act: (action: ReleaseAction) => void }) {
  const [title, setTitle] = useState("");
  const locked = Boolean(release.approvedAt);
  const passed = release.qa.filter(({ result }) => result === "passed").length;

  function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    act({ type: "addQa", id: crypto.randomUUID(), title: trimmed });
    setTitle("");
  }

  return <>
    <div className={styles.viewHeading}><div><h2>QA checklist</h2><p>{passed} of {release.qa.length} required checks passed</p></div></div>
    <ul className={styles.qaList}>
      {release.qa.map((item) => {
        const Icon = item.result === "passed" ? LuCheck : item.result === "failed" ? LuX : LuClock3;
        return <li key={item.id} className={styles.qaItem}>
          <div className={styles.qaTop}>
            <span className={styles.qaIcon} data-result={item.result}><Icon aria-hidden /></span>
            <strong>{item.title}</strong>
            <select aria-label={`Result for ${item.title}`} value={item.result} disabled={locked} onChange={(event) => act({ type: "qaResult", id: item.id, result: event.target.value as QaResult })}>
              {Object.entries(qaLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
            </select>
          </div>
          {item.note && <p className={styles.qaNote}>{item.note}</p>}
          {!locked && <details className={styles.qaDetails}><summary>{item.note ? "Edit note" : "Add note"}</summary>
            <form onSubmit={(event) => {
              event.preventDefault();
              const form = event.currentTarget;
              act({ type: "qaNote", id: item.id, note: String(new FormData(form).get("note") ?? "") });
              form.closest("details")?.removeAttribute("open");
            }}>
              <label className={styles.srOnly} htmlFor={`note-${item.id}`}>Note for {item.title}</label>
              <textarea id={`note-${item.id}`} name="note" key={item.note} defaultValue={item.note} maxLength={500} rows={2} />
              <button className={styles.smallButton} type="submit">Save note</button>
            </form>
          </details>}
        </li>;
      })}
    </ul>
    {!locked && release.qa.length < MAX_QA && <form className={styles.addQa} onSubmit={add}>
      <label className={styles.srOnly} htmlFor="add-qa">New required QA check</label>
      <input id="add-qa" placeholder="New required QA check" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={100} required />
      <button className={styles.button} type="submit"><LuPlus aria-hidden /> Add check</button>
    </form>}
  </>;
}

export function ActivityView({ release }: { release: Release }) {
  return <>
    <div className={styles.viewHeading}><div><h2>Release activity</h2><p>Latest changes first</p></div></div>
    <ol className={styles.activityList}>
      {release.activity.map(({ message, at }, index) => <li key={`${at}-${index}`}>
        <span><LuClock3 aria-hidden /></span>
        <div><strong>{message}</strong><time dateTime={at}>{at.slice(0, 16).replace("T", " ")} UTC</time></div>
      </li>)}
    </ol>
  </>;
}
