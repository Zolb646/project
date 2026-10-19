import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import Module from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";
const { NextRequest } = await import("next/server.js");

// Load the actual route without Next's server or a new test-runner dependency.
const filename = fileURLToPath(new URL("../src/app/api/contact/route.ts", import.meta.url));
const routeModule = new Module(filename);
routeModule.filename = filename;
routeModule.paths = Module._nodeModulePaths(path.dirname(filename));
routeModule._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2021 },
}).outputText, filename);
const { POST } = routeModule.exports;

const originalFetch = global.fetch;
const originalNow = Date.now;
const originalKey = process.env.RESEND_API_KEY;
const originalVercel = process.env.VERCEL;
const valid = { name: "Visitor", email: "visitor@example.com", message: "Hello" };
let sent;

beforeEach(() => {
  global.__contactRateLimitStore = new Map();
  process.env.RESEND_API_KEY = "test-only-key";
  process.env.VERCEL = "1";
  sent = [];
  global.fetch = async (_url, options) => {
    sent.push(JSON.parse(options.body));
    return new Response("{}", { status: 200 });
  };
});

afterEach(() => {
  global.fetch = originalFetch;
  Date.now = originalNow;
  if (originalKey === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = originalKey;
  if (originalVercel === undefined) delete process.env.VERCEL;
  else process.env.VERCEL = originalVercel;
  delete global.__contactRateLimitStore;
});

function post(payload, ip = "192.0.2.1", extraHeaders = {}) {
  return POST(new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-vercel-forwarded-for": ip, ...extraHeaders },
    body: JSON.stringify(payload),
  }));
}

test("malformed field types return 400 without sending email", async () => {
  const invalid = [null, [], {}, { ...valid, name: 42 }, { ...valid, email: [] },
    { ...valid, message: {} }, { ...valid, website: false }];
  for (const [index, body] of invalid.entries()) {
    assert.equal((await post(body, `192.0.2.${index + 1}`)).status, 400);
  }
  assert.equal(sent.length, 0);
});

test("valid content is trimmed and HTML-escaped before delivery", async () => {
  const response = await post({ name: " <Visitor> ", email: " visitor@example.com ", message: " <hello> & goodbye " });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(sent.length, 1);
  assert.equal(sent[0].reply_to, "visitor@example.com");
  assert.match(sent[0].html, /&lt;hello&gt; &amp; goodbye/);
  assert.match(sent[0].subject, /<Visitor>$/);
});

test("Vercel IP limit survives spoofed generic forwarding headers", async () => {
  for (let i = 0; i < 3; i++) {
    assert.equal((await post(valid, "192.0.2.1", { "x-forwarded-for": `198.51.100.${i}` })).status, 200);
  }
  assert.equal((await post(valid, "192.0.2.1", { "x-real-ip": "198.51.100.9" })).status, 429);
  assert.equal((await post(valid, "192.0.2.2")).status, 200);
  assert.equal(sent.length, 4);
});

test("standalone servers ignore every client-supplied IP header", async () => {
  delete process.env.VERCEL;
  for (let i = 0; i < 3; i++) assert.equal((await post(valid, `192.0.2.${i}`)).status, 200);
  assert.equal((await post(valid, "192.0.2.99")).status, 429);
  assert.equal(sent.length, 3);
});

test("expired visitor entries are removed and the request budget resets", async () => {
  let now = 1_000_000;
  Date.now = () => now;
  for (let i = 0; i < 3; i++) await post(valid);
  await post(valid, "192.0.2.2");
  assert.equal((await post(valid)).status, 429);
  now += 10 * 60 * 1000;
  assert.equal((await post(valid)).status, 200);
  assert.equal(global.__contactRateLimitStore.size, 1);
});

test("a full store rejects new visitors without resetting active budgets", async () => {
  // Seed a full active window, then verify behavior through the public handler.
  const now = Date.now();
  for (let i = 0; i < 10_000; i++) {
    global.__contactRateLimitStore.set(`2001:db8::${i.toString(16)}`, { count: 3, windowStart: now });
  }
  assert.equal((await post(valid, "198.51.100.1")).status, 429);
  assert.equal((await post(valid, "2001:db8::1")).status, 429);
  assert.equal(global.__contactRateLimitStore.size, 10_000);
  assert.equal(sent.length, 0);
});
