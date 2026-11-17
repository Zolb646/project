"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { LuActivity, LuArrowLeft, LuArrowRight, LuBox, LuClipboardCheck, LuFlaskConical, LuGitPullRequest, LuPlus, LuRotateCcw, LuX } from "react-icons/lu";
import { FaGithub } from "react-icons/fa6";
import { applyRelease, createDemo, createRelease, DEMO_CHANGES, DEMO_ID, MAX_DRAFTS, releaseNotes, type Change, type Release, type ReleaseAction } from "@/lib/release-desk/model";
import { ActivityView, ChangesView, QaView } from "./EvidenceViews";
import { Readiness, ReleaseActions, type DeskView } from "./Readiness";
import { updateWorkspace, useWorkspace } from "./workspace";
import styles from "./desk.module.css";

const views = [
  { id: "changes", label: "Changes", icon: LuGitPullRequest },
  { id: "qa", label: "QA checklist", icon: LuClipboardCheck },
  { id: "activity", label: "Activity", icon: LuActivity },
] as const;

async function github<T>(repo: string, pr?: number, signal?: AbortSignal): Promise<T> {
  const params = new URLSearchParams({ repo });
  if (pr !== undefined) params.set("pr", String(pr));
  const response = await fetch(`/api/release-desk/github?${params}`, { cache: "no-store", signal });
  const data = await response.json().catch(() => null);
  if (!response.ok || !data) throw new Error(data?.error ?? "GitHub could not be reached. Try again shortly.");
  return data;
}

function updateRelease(id: string, change: (release: Release) => Release) {
  updateWorkspace((data) => {
    if (id === DEMO_ID) {
      const demo = change(data.demo);
      return demo === data.demo ? data : { ...data, demo };
    }
    const previous = data.drafts.find((draft) => draft.id === id);
    if (!previous) return data;
    const next = change(previous);
    return next === previous ? data : { ...data, drafts: data.drafts.map((draft) => draft === previous ? next : draft) };
  });
}

export default function ReleaseDesk() {
  const { workspace, storageAvailable } = useWorkspace();
  const release = workspace.drafts.find(({ id }) => id === workspace.activeId) ?? workspace.demo;
  const demo = release.id === DEMO_ID;
  const locked = Boolean(release.approvedAt);
  const [view, setView] = useState<DeskView>("changes");
  const [pickerId, setPickerId] = useState<string | null>(null);
  const [candidateLists, setCandidateLists] = useState<Record<string, Change[]>>({});
  const [listLoading, setListLoading] = useState<string | null>(null);
  const [evidenceJob, setEvidenceJob] = useState<{ id: string; number: number } | null>(null);
  const [error, setError] = useState<{ id: string; message: string } | null>(null);
  const [notice, setNotice] = useState("");
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState("");
  const [renaming, setRenaming] = useState(false);
  const [title, setTitle] = useState("");
  const importDialog = useRef<HTMLDialogElement>(null);
  const resetDialog = useRef<HTMLDialogElement>(null);
  const evidenceRunning = useRef(false);
  const workArea = useRef<HTMLElement>(null);
  const importRequest = useRef<AbortController | null>(null);
  const currentJob = evidenceJob?.id === release.id ? evidenceJob : null;
  const anotherListLoading = !demo && listLoading !== null && listLoading !== release.repo;
  const anotherEvidenceLoading = !demo && evidenceJob !== null && !currentJob;

  function act(action: ReleaseAction) {
    const at = new Date().toISOString();
    updateRelease(release.id, (target) => applyRelease(target, action, at));
  }

  function openRelease(id: string) {
    updateWorkspace((data) => ({ ...data, activeId: id }));
    setRenaming(false);
    setView("changes");
    setPickerId(null);
    setNotice("");
  }

  function navigate(next: DeskView, focus = false) {
    setView(next);
    if (focus) workArea.current?.focus();
  }

  async function importRepository(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (importRequest.current || workspace.drafts.length >= MAX_DRAFTS) return;
    const fields = new FormData(event.currentTarget);
    const input = String(fields.get("repo") ?? "");
    const releaseTitle = String(fields.get("title") ?? "").trim();
    const request = new AbortController();
    importRequest.current = request;
    setImporting(true);
    setImportError("");
    try {
      const result = await github<{ repo: string; changes: Change[] }>(input, undefined, request.signal);
      if (request.signal.aborted) return;
      const id = crypto.randomUUID();
      const draft = createRelease(id, result.repo, new Date().toISOString());
      updateWorkspace((data) => data.drafts.length < MAX_DRAFTS ? {
        ...data, activeId: id, drafts: [{ ...draft, title: releaseTitle || draft.title }, ...data.drafts],
      } : data);
      setCandidateLists((lists) => ({ ...lists, [result.repo]: result.changes }));
      setView("changes");
      setRenaming(false);
      setPickerId(id);
      setNotice("Repository imported. Add a pull request to load its checks.");
      importDialog.current?.close();
    } catch (failure) {
      if (!request.signal.aborted) setImportError((failure as Error).message);
    } finally {
      if (importRequest.current === request) {
        importRequest.current = null;
        setImporting(false);
      }
    }
  }

  async function togglePicker() {
    if (pickerId === release.id) {
      setPickerId(null);
      return;
    }
    if (anotherListLoading) return;
    setPickerId(release.id);
    if (demo || listLoading) return;
    const { id, repo } = release;
    setListLoading(repo);
    setError(null);
    try {
      const result = await github<{ changes: Change[] }>(repo);
      setCandidateLists((lists) => ({ ...lists, [repo]: result.changes }));
    } catch (failure) {
      setError({ id, message: (failure as Error).message });
    } finally { setListLoading(null); }
  }

  async function refresh(change: Change, select = false) {
    if (evidenceRunning.current || locked) return;
    evidenceRunning.current = true;
    const { id, repo } = release;
    setEvidenceJob({ id, number: change.number });
    setError(null);
    if (select) act({ type: "select", change });
    try {
      const result = await github<{ change: Change }>(repo, change.number);
      updateRelease(id, (target) => applyRelease(target, { type: "evidence", change: result.change }, new Date().toISOString()));
    } catch (failure) {
      updateRelease(id, (target) => applyRelease(target, { type: "evidence", change: { ...change, ci: null } }, new Date().toISOString()));
      setError({ id, message: `PR #${change.number}. ${(failure as Error).message}` });
    } finally {
      evidenceRunning.current = false;
      setEvidenceJob(null);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(releaseNotes(release));
      setNotice("Release notes copied.");
    } catch { setNotice("Clipboard unavailable. Download the notes to save a copy."); }
  }

  function download() {
    const file = URL.createObjectURL(new Blob([releaseNotes(release)], { type: "text/markdown" }));
    const anchor = document.createElement("a");
    anchor.href = file;
    anchor.download = `${release.title.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "") || "release-notes"}.md`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(file), 1000);
    setNotice("Release notes downloaded.");
  }

  return <div className={styles.shell}>
    <a className={styles.skip} href="#desk-content">Skip to release</a>
    <aside className={styles.sidebar} aria-label="Release workspaces">
      <Link className={styles.brand} href="/release-desk"><span><LuBox aria-hidden /></span> Release Desk</Link>
      <div className={styles.workspaceNav}>
        <h2>Workspaces</h2>
        <button type="button" className={styles.workspaceButton} aria-current={demo ? "page" : undefined} onClick={() => openRelease(DEMO_ID)}>
          <LuFlaskConical aria-hidden /><span>Demo workspace</span>
        </button>
        <div className={styles.drafts}>
          {workspace.drafts.map((draft) => <button type="button" className={styles.workspaceButton} key={draft.id} aria-current={release.id === draft.id ? "page" : undefined}
            onClick={() => openRelease(draft.id)} title={`${draft.title} · ${draft.repo}`}>
            <FaGithub aria-hidden /><span>{draft.title}<small>{draft.repo}</small></span>
          </button>)}
        </div>
        <button type="button" className={styles.newRelease} onClick={() => {
          setImportError("");
          importDialog.current?.querySelector("form")?.reset();
          importDialog.current?.showModal();
        }} disabled={workspace.drafts.length >= MAX_DRAFTS}>
          <LuPlus aria-hidden /> New release
        </button>
        {workspace.drafts.length >= MAX_DRAFTS && <p className={styles.draftLimit}>{MAX_DRAFTS} saved releases</p>}
      </div>
      <Link className={styles.portfolioLink} href="/projects/release-desk"><LuArrowLeft aria-hidden /> Portfolio case study</Link>
    </aside>

    <main id="desk-content" className={styles.main}>
      <div className={styles.topbar}>
        <span><span className={styles.breadcrumbLabel}>Workspace</span><span className={styles.divider}>/</span>{demo ? "Demo" : release.repo}</span>
        <span className={styles.local} data-available={storageAvailable}><i /> {storageAvailable ? "Local workspace" : "Storage unavailable"}</span>
      </div>

      <div className={styles.canvas}>
        {!storageAvailable && <p className={styles.error} role="alert">
          Changes in this session will be lost when you reload. Download release notes to keep a copy.
        </p>}
        <header className={styles.hero}>
          <div>
            <span className={styles.source}>{demo ? <LuFlaskConical aria-hidden /> : <FaGithub aria-hidden />} {release.repo}</span>
            {renaming ? <form className={styles.rename} onSubmit={(event) => {
              event.preventDefault();
              act({ type: "rename", title });
              setRenaming(false);
            }}>
              <label className={styles.srOnly} htmlFor="release-name">Release name</label>
              <input id="release-name" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={100} autoFocus required />
              <button className={styles.primary} type="submit">Save</button>
              <button className={styles.button} type="button" onClick={() => setRenaming(false)}>Cancel</button>
            </form> : <h1>{release.title}</h1>}
            <p>{demo ? "Clear a failed CI check, finish QA, and approve a sample release." : "Review pull requests, record QA, and check whether this release is ready."}</p>
          </div>
          <div className={styles.heroActions}>
            {!locked && !renaming && <button type="button" className={styles.button} onClick={() => {
              setTitle(release.title); setRenaming(true);
            }}>Rename</button>}
            {demo && <button type="button" className={styles.button} onClick={() => resetDialog.current?.showModal()}><LuRotateCcw aria-hidden /> Reset demo</button>}
          </div>
        </header>

        <div className={styles.layout}>
          <Readiness release={release} busy={Boolean(currentJob)} act={act} openView={(next) => navigate(next, true)} />
          <section className={styles.workArea} ref={workArea} tabIndex={-1} aria-label="Release evidence">
            <nav className={styles.tabs} aria-label="Release evidence">
              {views.map(({ id, label, icon: Icon }) => <button type="button" onClick={() => navigate(id)} key={id} aria-current={view === id ? "page" : undefined}>
                <Icon aria-hidden /> {label}
              </button>)}
            </nav>
            <div className={styles.view}>
              {error?.id === release.id && <p className={styles.error} role="alert">{error.message}</p>}
              {view === "changes" && <ChangesView key={release.id} release={release} candidates={demo ? DEMO_CHANGES : candidateLists[release.repo]}
                picking={pickerId === release.id} loading={listLoading === release.repo} evidenceNumber={currentJob?.number}
                anotherListLoading={anotherListLoading} anotherEvidenceLoading={anotherEvidenceLoading} act={act}
                showPicker={togglePicker} refresh={(change) => void refresh(change)}
                select={(change) => demo ? act({ type: "select", change }) : void refresh(change, true)} />}
              {view === "qa" && <QaView key={release.id} release={release} act={act} />}
              {view === "activity" && <ActivityView release={release} />}
            </div>
          </section>
          <ReleaseActions release={release} busy={Boolean(currentJob)} act={act} copy={copy} download={download} />
        </div>
      </div>
      <p role="status" className={styles.notice}>{notice}{notice && <button type="button" className={styles.iconButton} aria-label="Dismiss message" onClick={() => setNotice("")}><LuX aria-hidden /></button>}</p>
    </main>

    <dialog className={styles.dialog} ref={importDialog} aria-labelledby="import-title" onClose={() => {
      importRequest.current?.abort();
      importRequest.current = null;
      setImporting(false);
    }}>
      <div className={styles.dialogHeader}>
        <span className={styles.readinessIcon}><FaGithub aria-hidden /></span>
        <button className={styles.iconButton} type="button" aria-label="Close repository import" onClick={() => importDialog.current?.close()}><LuX aria-hidden /></button>
      </div>
      <h2 id="import-title">New release</h2>
      <p>Import recent pull requests from a public GitHub repository. Your draft and sign-offs stay in this browser.</p>
      <form className={styles.importForm} onSubmit={importRepository}>
        <label htmlFor="github-repo">GitHub repository</label>
        <input id="github-repo" name="repo" placeholder="owner/repository" maxLength={180} required autoFocus />
        <label htmlFor="initial-title">Release name <span>(optional)</span></label>
        <input id="initial-title" name="title" placeholder="e.g. Storefront 2.8.0" maxLength={100} />
        {importError && <p className={styles.error} role="alert">{importError}</p>}
        <button type="submit" className={styles.primary} disabled={importing}>{importing ? "Importing…" : "Import repository"}<LuArrowRight aria-hidden /></button>
      </form>
    </dialog>

    <dialog className={styles.dialog} ref={resetDialog} aria-labelledby="reset-title">
      <div className={styles.dialogHeader}>
        <span className={styles.readinessIcon}><LuRotateCcw aria-hidden /></span>
        <button className={styles.iconButton} type="button" aria-label="Close reset confirmation" onClick={() => resetDialog.current?.close()}><LuX aria-hidden /></button>
      </div>
      <h2 id="reset-title">Reset the demo?</h2>
      <p>This restores the sample pull requests, QA results, and approval to their starting state.</p>
      <div className={styles.dialogActions}>
        <button type="button" className={styles.button} onClick={() => resetDialog.current?.close()}>Cancel</button>
        <button type="button" className={styles.primary} onClick={() => {
          updateWorkspace((data) => ({ ...data, demo: createDemo() }));
          openRelease(DEMO_ID);
          resetDialog.current?.close();
          setNotice("Demo reset.");
        }}>Reset demo</button>
      </div>
    </dialog>
  </div>;
}
