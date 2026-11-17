import { LuArrowRight, LuCheck, LuCircleDashed, LuCircleX, LuCopy, LuDownload, LuLockKeyhole, LuRotateCcw, LuShieldCheck } from "react-icons/lu";
import { readiness, ROLES, type Release, type ReleaseAction } from "@/lib/release-desk/model";
import styles from "./desk.module.css";

export type DeskView = "changes" | "qa" | "activity";

const statusTitles = { blocked: "Blocked", ready: "Ready to approve", approved: "Approved" };

export function Readiness({ release, busy, act, openView }: {
  release: Release;
  busy: boolean;
  act: (action: ReleaseAction) => void;
  openView: (view: DeskView) => void;
}) {
  const { gates, status } = readiness(release);
  const passed = gates.filter(({ state }) => state === "passed").length;
  const statusDescriptions = {
    blocked: "Clear the gates below before approving.",
    ready: "All gates passed. This release can be approved.",
    approved: "The approval and its evidence have been recorded.",
  };
  const approved = status === "approved";

  return <section className={styles.readiness} aria-label="Release readiness">
      <div className={styles.readinessTop}>
        <span className={styles.readinessIcon}><LuShieldCheck aria-hidden /></span>
        <h2>Release readiness</h2>
      </div>
      <div className={styles.readinessState} aria-live="polite">
        <p className={styles.stateTitle} data-state={status}>{statusTitles[status]}</p>
        <p>{statusDescriptions[status]}</p>
      </div>
      <div className={styles.meter} role="img" aria-label={`${passed} of 4 gates passed`}>
        {gates.map((gate) => <span key={gate.id} data-state={gate.state} />)}
      </div>
      <p className={styles.progressText}>{passed} of 4 gates passed</p>
      <ol className={styles.gates}>
        {gates.map(({ id, label, state, detail }) => {
          const Icon = state === "passed" ? LuCheck : state === "blocked" ? LuCircleX : LuCircleDashed;
          return <li key={id}>
            <span className={styles.gateIcon} data-state={state}><Icon aria-hidden /></span>
            <div>
              {id === "signoff" ? <strong>{label}</strong> : <button type="button" className={styles.gateLink}
                onClick={() => openView(id === "qa" ? "qa" : "changes")}>{label}<LuArrowRight aria-hidden /></button>}
              <p>{detail}</p>
            </div>
          </li>;
        })}
      </ol>
      <div className={styles.approve}>
        {approved ? <button type="button" className={styles.button} onClick={() => act({ type: "reopen" })}><LuRotateCcw aria-hidden /> Reopen release</button> :
          <button type="button" className={styles.primary} disabled={status !== "ready" || busy} onClick={() => act({ type: "approve" })}>
            {status === "ready" ? <LuCheck aria-hidden /> : <LuLockKeyhole aria-hidden />} Approve release
          </button>}
      </div>
    </section>;
}

export function ReleaseActions({ release, busy, act, copy, download }: {
  release: Release;
  busy: boolean;
  act: (action: ReleaseAction) => void;
  copy: () => void;
  download: () => void;
}) {
  const { status, canSign } = readiness(release);
  return <aside className={styles.actions} aria-label="Release sign-offs and notes">
    <section className={styles.railCard}>
      <div className={styles.cardTitle}><h2>Sign-offs</h2><span>Recorded locally</span></div>
      {(["qa", "owner"] as const).map((role) => <div className={styles.signoff} key={role}>
        <span>{ROLES[role]}</span>
        {release.signoffs[role] ? <span className={styles.signed}><LuCheck aria-hidden /> Signed</span> :
          <button type="button" className={styles.smallButton} disabled={!canSign || status === "approved" || busy} aria-label={`Record ${ROLES[role]}`}
            onClick={() => act({ type: "sign", role })}>Sign</button>}
      </div>)}
    </section>

    <section className={styles.railCard}>
      <div className={styles.cardTitle}><h2>Release notes</h2><span>Markdown</span></div>
      <div className={styles.export}>
        <button type="button" className={styles.button} onClick={copy}><LuCopy aria-hidden /> Copy</button>
        <button type="button" className={styles.button} onClick={download}><LuDownload aria-hidden /> Download</button>
      </div>
    </section>
  </aside>;
}
