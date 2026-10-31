# Growth plan, November 2026 to April 2027

Starting point (Search Console, 30 July to 31 October 2026): 7 clicks, 240 impressions. Brand searches already work (homepage at position 1.9). Non-brand searches barely show. The rebuilt site went live on 31 October 2026, so this is the baseline to beat.

## Blog or no blog?

Service pages and case studies make the money. A blog does not, if it means publishing general articles to chase traffic: big sites own "what is SEO" queries, and Google's AI answers now take most clicks on simple informational questions.

A small blog still pays off, if every article meets three conditions:

1. **It answers a problem a future client searches for**: "GA4 not tracking WhatsApp clicks", "crawled currently not indexed". A person with that problem is close to hiring someone.
2. **It links to one service page.** Articles are there to show Google (and AI assistants) that the site covers the whole topic, and to pass links to the page that sells.
3. **It shows first-hand experience**: real screenshots, real steps, cases from the portfolio. That is what makes it rank, and what makes it worth sharing on LinkedIn.

So the rule is: **service pages first, then 2 articles a month at most, each attached to a service.** If an article cannot be attached to a service, do not write it.

## Phase 1: November 2026 (foundations)

- [ ] Search Console: submit the sitemap again and request indexing for the 3 service pages, `/services`, `/contact` and the rewritten articles.
- [ ] Give the correct article dates (the dates in `src/lib/blog-data.ts` and in the articles disagree). This unblocks `BlogPosting` schema.
- [ ] Expand or retire the two remaining thin articles:
  - `keyword-research-process`: expand to 1,200+ words, linked to the services hub.
  - `why-websites-fail`: rewrite as "Why a service website gets traffic but no leads" (links to GA4 tracking and the technical audit), or redirect it to the technical SEO checklist.
- [ ] Check that the site's own GA4 records leads as key events (contact form, WhatsApp clicks, call bookings). Otherwise we cannot measure any of this.
- [ ] LinkedIn: same name and title as the site ("SEO consultant, technical SEO, local SEO and GA4"), link to the site in the featured section.

## Phase 2: December 2026 to February 2027 (pages that sell)

- [ ] **"SEO for law firms" page** (EN first). Backed by the U.S. law firm case study. Search Console already shows a law firm searching for a U.S.-based SEO provider.
- [ ] **"Consultant SEO au Maroc" / "خبير SEO في المغرب"**: Morocco is the only country sending real clicks (4 of 7). A French and Arabic page for Moroccan businesses, backed by the Moroccan B2B case study.
- [ ] Profiles outside the site: Malt and Clutch (or similar), then add them to `sameAs` in the schema.
- [ ] Ask 2 or 3 past clients for a short written review that can be published without their name (for example "Law firm, U.S."). This is the biggest gap on the site.

## Phase 3: articles, from December 2026 (2 per month)

In order. Each one names its target search and the page it links to.

| # | Article | Target search | Links to |
|---|---|---|---|
| 1 | Track WhatsApp clicks in GA4 with Google Tag Manager | track whatsapp clicks ga4 | GA4 tracking |
| 2 | Crawled, currently not indexed: causes and fixes | crawled currently not indexed | Technical SEO audit |
| 3 | Google Business Profile categories: how to choose | google business profile categories | Local SEO |
| 4 | GA4 key events vs conversions: what changed | ga4 key events | GA4 tracking |
| 5 | Website migration SEO checklist | website migration seo checklist | Technical SEO audit |
| 6 | Local SEO for law firms: what actually moves rankings | law firm local seo | Local SEO, SEO for law firms |
| 7 | Canonical tags explained, with examples | canonical tag | Technical SEO audit |
| 8 | How to get Google reviews and reply to them | how to get google reviews | Local SEO |
| 9 | Looker Studio dashboard for a service business | looker studio dashboard leads | GA4 tracking |
| 10 | SEO local au Maroc : le guide (FR) / SEO محلي في المغرب (AR) | seo local maroc | Local SEO |
| 11 | City pages that rank without duplicate content | location pages seo | Local SEO |
| 12 | Medspa and clinic SEO: a technical checklist | medspa seo | Technical SEO audit |

Each article: English first, French and Arabic when the topic has demand there (always for #10, then local SEO topics). Follow the outline in `docs/semantic-seo-audit.md`: definition, steps, tools, mistakes, FAQ. Share every article on LinkedIn the week it goes out, with one screenshot or one figure from it.

## Phase 4: March to April 2027 (review)

- [ ] Compare Search Console with the baseline above (same 3-month window).
- [ ] Update the articles that get impressions but rank 8 to 20: these are the quickest wins.
- [ ] Add a service page for one of the three other services only if there is a case study to back it.

## What to measure, every month

| Metric | Where | Baseline (Aug to Oct 2026) |
|---|---|---|
| Non-brand clicks | Search Console, queries without "toudghi" | about 0 |
| Impressions on service pages | Search Console, Pages | 0 (pages did not exist) |
| Leads (form, WhatsApp, booking) | GA4 key events | to be set up |
| Leads by landing page | GA4, Pages and screens with key events | to be set up |

Export Search Console (Queries, Pages, Countries, last 3 months) once a month and keep the files, so each month can be compared with the last.
