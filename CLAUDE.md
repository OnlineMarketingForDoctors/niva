# Project rules

## This site must NOT be indexed by search engines

Until explicitly told otherwise, every page built in this repo must stay out of search results:

- Every HTML page must include in `<head>`:
  `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">`
  (If using a framework, set this in the root layout/metadata so it applies to all pages.)
- Keep the `X-Robots-Tag` header in `vercel.json` (applies to every response, including PDFs and images).
- Do NOT add `Disallow: /` to `robots.txt` — it stops crawlers from seeing the noindex directives. If a `robots.txt` exists, it should allow crawling.
- Do NOT add a sitemap or submit the site to Google Search Console for indexing.
