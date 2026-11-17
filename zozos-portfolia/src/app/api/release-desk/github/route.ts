import { GithubError, listChanges, loadEvidence, normalizeRepo } from "@/lib/release-desk/github";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  try {
    const repo = normalizeRepo(params.get("repo") ?? "");
    const pr = params.get("pr");
    if (pr !== null) {
      if (!/^\d{1,15}$/.test(pr)) throw new GithubError("Enter a valid pull request number.", 400);
      return Response.json({ change: await loadEvidence(repo, Number(pr)) });
    }
    return Response.json({ repo, changes: await listChanges(repo) });
  } catch (error) {
    if (error instanceof GithubError) {
      return Response.json({ error: error.message }, {
        status: error.status,
        headers: error.retryAfter ? { "Retry-After": error.retryAfter } : undefined,
      });
    }
    return Response.json({ error: "Could not load GitHub data. Try again shortly." }, { status: 502 });
  }
}
