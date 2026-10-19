import { NextRequest, NextResponse } from "next/server";
import { isIP } from "node:net";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website?: string;
};

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_ENTRIES = 10_000;

const globalRateLimitStore = globalThis as typeof globalThis & {
  __contactRateLimitStore?: Map<string, RateLimitEntry>;
};

function getRateLimitStore() {
  if (!globalRateLimitStore.__contactRateLimitStore) {
    globalRateLimitStore.__contactRateLimitStore = new Map();
  }
  return globalRateLimitStore.__contactRateLimitStore;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isContactPayload(value: unknown): value is ContactPayload {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const payload = value as Record<string, unknown>;
  return typeof payload.name === "string" &&
    typeof payload.email === "string" &&
    typeof payload.message === "string" &&
    (payload.website === undefined || typeof payload.website === "string");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: NextRequest) {
  // Only Vercel's ingress is trusted to replace this header. Direct servers
  // share a bucket rather than accepting client-supplied forwarding headers.
  const forwardedIp = process.env.VERCEL === "1"
    ? request.headers.get("x-vercel-forwarded-for")?.trim()
    : undefined;
  const ip = forwardedIp && isIP(forwardedIp) ? forwardedIp : "unknown";

  const store = getRateLimitStore();
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now - entry.windowStart >= RATE_LIMIT_WINDOW_MS) store.delete(key);
  }
  const existing = store.get(ip);

  if (!existing) {
    // Do not evict active entries: that would reset their request budgets.
    if (store.size >= RATE_LIMIT_MAX_ENTRIES) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
    store.set(ip, { count: 1, windowStart: now });
  } else {
    if (existing.count >= RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
    existing.count += 1;
    store.set(ip, existing);
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "info@zolbayrr.com";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "Zozo <info@zolbayrr.com>";

  if (!resendApiKey) {
    return NextResponse.json(
      { error: "Email service is not configured on the server." },
      { status: 500 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isContactPayload(payload)) {
    return NextResponse.json(
      { error: "Name, email, and message must be strings." },
      { status: 400 }
    );
  }

  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message.trim();
  const website = payload.website?.trim();

  if (website) {
    return NextResponse.json({ success: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  if (name.length > 100 || email.length > 320 || message.length > 5000) {
    return NextResponse.json(
      { error: "Input is too long. Please shorten your message." },
      { status: 400 }
    );
  }

  const textBody = [
    "New portfolio contact form submission",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const htmlBody = `
    <h2>New portfolio contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong></p>
    <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(message)}</pre>
  `;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `Portfolio Contact from ${name}`,
      text: textBody,
      html: htmlBody,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    return NextResponse.json(
      { error: "Failed to send email.", details: errorText },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
