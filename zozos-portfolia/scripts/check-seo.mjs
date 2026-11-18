import assert from "node:assert/strict";

// Run against a local production server after `npm run build && npm start`.
const base = process.env.SEO_CHECK_URL || "http://localhost:3000";
const site = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://zolbayrr.com").origin;

async function get(path, status = 200) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, status, `${path}: unexpected HTTP status`);
  return response;
}

function tags(html, element) {
  return [...html.matchAll(new RegExp(`<${element}\\b[^>]*>`, "g"))].map(([tag]) =>
    Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, name, value]) => [name.toLowerCase(), value.replaceAll("&amp;", "&")]))
  );
}

const sitemap = await (await get("/sitemap.xml")).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
assert.ok(urls.length > 0, "Sitemap must contain public pages");

for (const url of urls) {
  assert.equal(new URL(url).origin, site);
  const path = new URL(url).pathname;
  const html = await (await get(path)).text();
  const links = tags(html, "link");
  const meta = tags(html, "meta");
  assert.equal(new URL(links.find((tag) => tag.rel === "canonical")?.href).href, new URL(url).href, `${path}: canonical`);
  assert.equal(tags(html, "html")[0]?.lang, path.startsWith("/mn") ? "mn" : "en");
  for (const language of ["en", "mn", "x-default"]) {
    const alternate = links.find((tag) => tag.rel === "alternate" && tag.hreflang === language);
    assert.ok(alternate?.href.startsWith(site), `${path}: missing ${language} alternate`);
  }
  assert.equal(new URL(meta.find((tag) => tag.property === "og:url")?.content).href, new URL(url).href);
  assert.equal(meta.find((tag) => tag.name === "twitter:card")?.content, "summary_large_image");
  assert.ok(!meta.some((tag) => tag.name === "robots" && tag.content.includes("noindex")));

  const graphs = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap(([, json]) => JSON.parse(json)["@graph"] || []);
  assert.ok(graphs.some((node) => node["@type"] === "Person"));
  assert.ok(graphs.some((node) => node["@type"] === "WebSite"));
  if (path.includes("/projects/")) {
    assert.equal(graphs.find((node) => node["@type"] === "CreativeWork")?.url, url);
    assert.equal(graphs.find((node) => node["@type"] === "BreadcrumbList")?.itemListElement.at(-1).item, url);
  }

  const image = meta.find((tag) => tag.property === "og:image")?.content;
  assert.ok(image?.startsWith(site), `${path}: missing absolute preview image`);
  const imageResponse = await get(new URL(image).pathname);
  assert.ok(imageResponse.headers.get("content-type")?.startsWith("image/"));
  console.log(`SEO OK: ${path}`);
}

for (const path of ["/missing-page", "/projects/missing-page", "/mn/missing-page", "/mn/projects/missing-page", "/404", "/mn/404"]) {
  const html = await (await get(path, 404)).text();
  const meta = tags(html, "meta");
  assert.ok(meta.some((tag) => tag.name === "robots" && tag.content.includes("noindex")));
  assert.ok(!tags(html, "link").some((tag) => tag.rel === "canonical" || tag.rel === "alternate"));
  assert.ok(!meta.some((tag) => tag.property?.startsWith("og:") || tag.name?.startsWith("twitter:")));
  assert.ok(html.includes("<h1"), `${path}: missing server-rendered fallback`);
  console.log(`404 SEO OK: ${path}`);
}

const optimized = await get("/_next/image?url=%2Fprojects%2Fgalexora.webp&w=640&q=75");
assert.ok(optimized.headers.get("content-type")?.startsWith("image/"), "Project image optimization must remain reachable");
console.log("Project image optimizer OK");
