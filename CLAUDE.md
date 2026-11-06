# mohamedtoudghi.com

Portfolio of Mohamed Toudghi, SEO consultant in Morocco, working remotely (technical SEO, local SEO, GA4 tracking for service businesses, B2B and SaaS). Next.js 16 (App Router) + Tailwind CSS 4 + next-intl, deployed on Vercel. Three languages: English at `/`, French at `/fr`, Arabic (RTL) at `/ar`.

The site is the proof of his SEO work, so SEO, speed and accessibility are not optional.

## Facts

- Use only facts, numbers, client names and contact details that already exist in `messages/*.json`, `src/lib/data.ts`, `src/lib/constants.ts`, or that Mohamed gives in chat.
- Never invent numbers, testimonials, prices, clients, awards, dates or processes. If content is missing (prices, a testimonial), leave the section out and tell Mohamed what is needed.
- Never name a client or show a client's website, logo, domain or a person's face: Mohamed has no permission. Blur them in screenshots (`D:/tools/site-check/blur.js`) and describe clients generically ("Law firm (U.S.)").

## Writing (all three languages)

- Plain, specific sentences. Name the real result, place or tool. Delete any sentence a competitor could also use.
- No em dashes (—). No exclamation marks. No emojis.
- Banned: unlock, elevate, seamless, cutting-edge, state-of-the-art, world-class, tailored solutions, data-driven, in today's fast-paced world, trusted partner, journey, empower, leverage, revolutionize, delve, passion for excellence, "it's not just X, it's Y".
- Headings state a fact or a benefit. Buttons say what happens ("Book a call", not "Learn more").
- Every copy change goes into `messages/en.json`, `fr.json` and `ar.json` together. No hard-coded user-facing strings in components.
- Selective languages (Nov 2026): a language version is indexed only when it is fully written. Articles list their full languages in `BLOG_POSTS.locales` (`src/lib/blog-data.ts`); other versions are summaries with noindex, left out of hreflang and the sitemap. New articles: English and French. Arabic is kept for the commercial pages. Write English first, then French, then Arabic.

## Design

- Calm palette, defined once in `src/app/globals.css` (`@theme`): paper `#F7F5F0`, ink `#1C2321`, muted `#5A645F`, line `#E2DDD3`, forest `#2E6B57`, sage `#E6EFEA`, mint `#7FC4A8`. Use the token classes (`bg-paper`, `text-ink`, `text-forest`...), not new hex values.
- Fonts: Geist (Latin) and Geist Mono for small data labels, loaded with `next/font` in `src/app/[locale]/layout.tsx`. Arabic uses the device system font (no web font): Cairo cost about 10 Lighthouse points on `/ar`.
- No gradients on text or backgrounds, no glassmorphism, no glow except the hero cursor light, no stock or AI images. Real photos only (`public/images`).
- Exception chosen by Mohamed (Nov 2026): his illustrated portrait on the About page (`public/images/portrait.webp`), shown as a still image. An eye-follow version was tried and removed at his request. Source files: `D:portrait-src`.
- The old blog images were AI-generated and were removed. Article figures are drawn in HTML/SVG (`.fig`, `.cwv` in globals.css). Case study screenshots use next/image with real sizes from `src/lib/image-sizes.ts`.
- Shared patterns live in `globals.css`: `.lift` (card hover), `.row-link`, `.btn`, `.arrow`, `.navlink`, `.reveal`, `.in` + `.d1`–`.d6` (entrance delays).

## Motion rules (performance first)

Motion stays only while it costs nothing measurable. Before adding or changing any:

- Animate `transform` and `opacity` only. Never animate width, height, top/left, box-shadow or anything that triggers layout or paint each frame.
- No JavaScript animation loop on page load. JS motion (hero cursor light, card drift, `CursorFollower`) runs only after the mouse moves, only on `(pointer: fine)`, and stops when settled.
- Content must never be hidden from crawlers: entrance animations are gated on `html.js` (set by an inline script) and never applied to the H1 or the LCP element.
- Text that changes (the rotating hero word) must not move the layout: its box is sized by the longest word (`.words::after`).
- Everything is disabled under `prefers-reduced-motion: reduce`.

## SEO

- Canonical + hreflang (en, fr, ar, x-default) on every page via `pageAlternates(locale, path)` from `src/lib/seo.ts`. Pages must return the full `alternates` object: Next.js replaces the layout's, it does not merge.
- Unique title under 60 characters and meta description under 155 per page and language. The layout title template (`%s | Mohamed Toudghi`) does not apply to the homepage, so its titles include the name.
- One H1 per page, headings in order. The H1 Google reads must be one clean sentence (the server renders the first rotating word only).
- New pages go into `src/app/sitemap.ts`. Internal links point to real URLs.
- Semantic SEO plan, topical map and content backlog: `docs/semantic-seo-audit.md`. Follow its page outline for new service or article pages.
- Growth plan (what to publish next, in order, and what to measure): `docs/growth-plan.md`.
- "Consultant SEO au Maroc" / "مستشار SEO في المغرب" belongs to `/consultant-seo-maroc` (copy in `MoroccoPage`). Do not put "in Morocco" back in the homepage or About titles: two pages on the same query compete with each other.
- Service pages: the three main services have their own page (`/services/<slug>`, data in `src/lib/services.ts`, copy in `ServicePages`); the hub `/services` keeps all six. Link to a service with `serviceHref(key)`. Industry pages (`seo-for-law-firms`) use the same template with `parent` set to their main service; add them after the three main entries.
- Language is decided by the URL only (`localeDetection: false` in `src/i18n/routing.ts`). Do not turn cookie or browser-language redirects back on.
- Only the `HomePage` and `ContactForm` message namespaces are sent to the browser (see the layout). Add a namespace there only if a client component needs it.

## Analytics

- GA4 (`G-9GBZG4HWN2`) loads from `src/components/seo/Analytics.tsx` on first interaction or 10 s after load (when idle). Do not move it back into `<head>`.
- The GTM container `GTM-53XVQ2J6` was empty and was removed. Re-add it only if Mohamed sets up tags in it, and load it the same delayed way.

## Performance budget

- Lighthouse mobile performance 90+ on `/`, `/fr`, `/ar`; accessibility 100; CLS under 0.05; TBT under 200 ms.
- Measured locally on 2026-10-31 (production build, median of 3): `/` 95, `/fr` 95, `/ar` 93; inner pages 95 to 98; accessibility 100 everywhere. Local runs on this laptop vary by about 10; confirm with PageSpeed Insights.
- Lessons: Cairo (Arabic web font) cost about 10 points on /ar; Geist Mono with display swap caused CLS 0.21 on articles (now `display: optional`); below-the-fold homepage sections use `.cv` (content-visibility).

## Working method

- This machine's C: drive is full. Keep everything on D: (repo at `D:\mohamedtoudghi-portfolio`, npm cache at `D:\npm-cache`).
- Work on a branch, never directly on `main` (Vercel deploys `main` to production).
- After a change: `npm run build`, check `/`, `/fr`, `/ar` at 375 and 1280 px with no horizontal overflow, run Lighthouse mobile, and report the scores. If a score drops by more than a few points, find the cause before going on.
- Commit only when Mohamed asks.

## QA

- `D:	oolssite-checkcheck.js` (Playwright, uses installed Chrome): every page in 3 languages at 320/375/768/1280 px. Checks overflow, one H1, console errors, broken images and all internal links. Run: `node D:/tools/site-check/check.js http://localhost:3005`.
