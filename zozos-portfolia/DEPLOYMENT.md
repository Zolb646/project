# Deployment

The production site runs on Vercel. Set `RESEND_API_KEY`, and optionally
`CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL`, in the project's environment settings.

The contact endpoint trusts `x-vercel-forwarded-for` only when Vercel sets
`VERCEL=1`. See [Vercel's request header contract](https://vercel.com/docs/headers/request-headers).
On direct local or Docker servers, forwarding headers are ignored and requests
share one rate-limit bucket. Do not set `VERCEL=1` on a publicly accessible
standalone server.

Rate limits are best-effort, per process: three requests per IP per ten minutes.
Expired entries are removed on incoming requests, and each process stores at
most 10,000 active entries. Vercel instances do not share these counters, and
restarts reset them. A deployment-wide limit requires a shared store or an
ingress rate-limit rule.

For a standalone container:

```sh
docker build -t zozo-portfolio .
docker run --rm -p 3000:3000 --env-file .env.local zozo-portfolio
```

Environment files are excluded from the image; pass secrets at runtime.

After a production build, start the server and run `npm run check:seo` to verify
sitemap pages, canonical URLs, language alternates, social images, JSON-LD,
404 indexing rules, and project image optimization. Set `SEO_CHECK_URL` if the
local server uses a port other than 3000.

The custom fallback uses Next.js 16's experimental `globalNotFound` option
because the English and Mongolian routes have separate root layouts. The proxy
rewrites unknown project slugs and Mongolian URLs to static localized 404 pages,
preserving the requested URL and HTTP 404 status. This avoids the empty server
HTML produced by dynamic `notFound()` fallbacks in the installed Next.js version
([upstream issue](https://github.com/vercel/next.js/issues/95613)).


## Interactive version

The independent version at `https://new.zolbayrr.com` uses the Vercel project
`zozo-interactive`. Deploy from the app directory with:

```sh
vercel deploy --project zozo-interactive --prod --yes
```

Set `NEXT_PUBLIC_SITE_URL=https://new.zolbayrr.com` in that project's production
and preview environments. This controls canonicals, language alternates, sitemap,
structured data, and social metadata. The default origin remains `https://zolbayrr.com`.
The new project uses the same contact environment variables described above.

Cloudflare DNS: `new` is a DNS-only CNAME to
`8c680fc14a0208ab.vercel-dns-017.com`. The original root and `www` records belong
to the separate `zozo` project.

Run the SEO check with the same origin used for the build:

```sh
NEXT_PUBLIC_SITE_URL=https://new.zolbayrr.com npm run check:seo
```
