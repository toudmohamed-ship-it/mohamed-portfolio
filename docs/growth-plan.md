# Growth plan, November 2026 to April 2027

Reviewed 13 Nov 2026: finished items ticked, dropped items struck through, Phase 3 reordered. The decisions of 10 Nov 2026 at the end of this file override anything older above them.

Starting point (Search Console, 30 July to 31 October 2026): 7 clicks, 240 impressions. Brand searches already work (homepage at position 1.9). Non-brand searches barely show. The rebuilt site went live on 31 October 2026, so this is the baseline to beat.

## Blog or no blog?

Service pages and case studies make the money. A blog does not, if it means publishing general articles to chase traffic: big sites own "what is SEO" queries, and Google's AI answers now take most clicks on simple informational questions.

A small blog still pays off, if every article meets three conditions:

1. **It answers a problem a future client searches for**: "GA4 not tracking WhatsApp clicks", "crawled currently not indexed". A person with that problem is close to hiring someone.
2. **It links to one service page.** Articles are there to show Google (and AI assistants) that the site covers the whole topic, and to pass links to the page that sells.
3. **It shows first-hand experience**: real screenshots, real steps, cases from the portfolio. That is what makes it rank, and what makes it worth sharing on LinkedIn.

So the rule is: **service pages first, then 2 articles a month at most, each attached to a service.** If an article cannot be attached to a service, do not write it.

## Phase 1: November 2026 (foundations)

- [x] Search Console: sitemap resubmitted and indexing requested (5 Nov 2026).
- [x] Search Console fixes (2 Nov 2026): the language switcher no longer links to `/en/...` (12 redirect URLs), and the old article URL that returned 404 now redirects to the technical SEO checklist.
- [x] Case studies rewritten in EN, FR and AR (2 Nov 2026): about the project, problems, steps with their reason, lessons, role and period. Facts from Mohamed and his CVs only; clients and agency unnamed. The sports federation study was cut back to his real scope, and the +40% claim was removed site-wide. Next: in Search Console, Validate fix on "Crawled, currently not indexed".
- [x] Article dates fixed in `src/lib/blog-data.ts`; `BlogPosting` schema is live.
- [x] The two thin articles were rewritten in EN and FR (6 Nov 2026):
  - `keyword-research-process`: expand to 1,200+ words, linked to the services hub.
  - `why-websites-fail`: rewrite as "Why a service website gets traffic but no leads" (links to GA4 tracking and the technical audit), or redirect it to the technical SEO checklist.
- [x] The site's GA4 records leads as key events: generate_lead, whatsapp_click, email_click (9 Nov 2026).
- [ ] LinkedIn: same name and title as the site ("SEO & Growth Specialist"), link to the site in the featured section.

## Phase 2: December 2026 to February 2027 (pages that sell)

- [x] **"SEO for law firms" page** (`/services/seo-for-law-firms`, EN/FR/AR, live 31 Oct 2026). Backed by the U.S. law firm case study. Search Console already shows a law firm searching for a U.S.-based SEO provider.
- [x] **"Consultant SEO au Maroc" page** (`/consultant-seo-maroc`, FR/AR/EN, live 1 Nov 2026), backed by the Moroccan B2B case study. The homepage and About titles no longer say "in Morocco", so this page alone targets the Morocco searches; linked from the homepage, the footer and the case study.
- [ ] Profiles outside the site: Upwork (profile exists, needs a rewrite: https://www.upwork.com/freelancers/~01ef4abcbfdcca5b81). Add it to `sameAs` in the schema once it is rewritten and the employer has approved freelance work. ~~Malt and Clutch~~ dropped (8 Nov 2026).
- [ ] Ask 2 or 3 past clients for a short written review that can be published without their name (for example "Law firm, U.S."). This is the biggest gap on the site.

## Phase 3: articles, from December 2026 (2 per month)

In order. Each one names its target search and the page it links to. Reordered 13 Nov 2026 (Mohamed): not too much GA4. The clusters now alternate, and GA4 is 2 of 12, plus the Looker Studio article as a reporting topic, all spread out. Nothing is written yet.

| # | Article | Target search | Links to |
|---|---|---|---|
| 1 | Crawled, currently not indexed: causes and fixes | crawled currently not indexed | Technical SEO audit |
| 2 | Google Business Profile categories: how to choose | google business profile categories | Local SEO |
| 3 | Track WhatsApp clicks in GA4 with Google Tag Manager | track whatsapp clicks ga4 | GA4 tracking |
| 4 | Website migration SEO checklist | website migration seo checklist | Technical SEO audit |
| 5 | Local SEO for law firms: what actually moves rankings | law firm local seo | Local SEO, SEO for law firms |
| 6 | Canonical tags explained, with examples | canonical tag | Technical SEO audit |
| 7 | How to get Google reviews and reply to them | how to get google reviews | Local SEO |
| 8 | SEO local au Maroc : le guide (written in French first, English version second) | seo local maroc | Local SEO |
| 9 | City pages that rank without duplicate content | location pages seo | Local SEO |
| 10 | Medspa and clinic SEO: a technical checklist | medspa seo | Technical SEO audit |
| 11 | Looker Studio dashboard for a service business | looker studio dashboard leads | GA4 tracking |
| 12 | GA4 key events vs conversions: what changed | ga4 key events | GA4 tracking |

Each article: English and French. No Arabic articles (selective languages, Nov 2026: Arabic is kept for the commercial pages). Follow the outline in `docs/semantic-seo-audit.md`: definition, steps, tools, mistakes, FAQ. Share every article on LinkedIn the week it goes out, with one screenshot or one figure from it.

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

## Current plan (5 Nov 2026), from the language and competitor research

Report: `reports/Languages and solo SEO competitors.md` (local only, not in git).

**Decisions (Mohamed, 5 Nov 2026):** selective languages; prices set from the market, upper-middle (he usually charges 10,000 MAD a month); free mini-audit as the main offer; article dates chosen by Claude; stay on Next.js (no WordPress).

**Batch 1, site structure (week of 5 Nov):**
- [x] Selective languages: a language version is indexed only if it is fully written. Thin FR/AR versions get noindex and leave hreflang and the sitemap. New articles: EN and FR only; Arabic for commercial pages.
- [x] Article dates fixed (2025 to 2026) and `BlogPosting` schema with datePublished and dateModified.
- [x] ~~"From" prices in MAD (FR, AR) and USD (EN) on the services hub and service pages.~~ Dropped 10 Nov 2026: prices stay private.
- [x] Free mini-audit as the main call to action, with a defined output and deadline. Built, then hidden by portfolio mode (`OPEN_FOR_WORK = false`) until the employer approves.

**Batch 2, content (week of 12 Nov):**
- [x] Rewrite `keyword-research-process` and `why-websites-fail` (EN, then FR).
- [x] Translate the lead-gen checklist into French; remove the duplicate FAQ in the local SEO guide.
- [x] Case study numbers near the top of the homepage and service pages.
- [x] GA4 tracking presented as a lead service; "you work with me directly" and "how it works".
- [x] Check that the site's GA4 records leads as key events (form, WhatsApp, booking).

**Then measure:** Page indexing export in 2 to 3 weeks; Performance export in early December against the Aug to Oct baseline; French and Arabic review in February 2027.

### Mohamed's checklist
- [x] In GA4, generate_lead, whatsapp_click and email_click are marked as key events (9 Nov 2026).
- [x] Resubmit the sitemap and request indexing of the reworked pages (done 5 Nov 2026).
- [ ] Validate fix in Search Console: "Crawled, currently not indexed", "Not found (404)", "Page with redirect".
- [ ] Google Business Profile: only if he meets clients in person in a city (service-area profile, address hidden). Google does not allow online-only businesses (checked 8 Nov 2026); a profile without in-person contact risks suspension. Until then, reviews go on LinkedIn and Upwork.
- [x] ~~Malt profile~~ and ~~Clutch profile~~: dropped (8 Nov 2026). Malt is mostly France, and Mohamed decided against Clutch. Platforms kept: LinkedIn first, then Upwork.
- [ ] Upwork profile: rewrite it (it exists but needs work).
- [ ] Ask the two current freelance clients for a review when their projects end (Google or LinkedIn; anonymous is fine).
- [ ] Check search volumes in Google Keyword Planner: "consultant SEO Maroc", "expert SEO Maroc", "خبير سيو", "مستشار SEO".
- [ ] LinkedIn: headline, About, Featured and Services page rewritten (drafts in chat, 8 Nov 2026).
- [x] Illustrated portrait (received 5 Nov 2026). The eye-follow effect was removed at his request (6 Nov); the About page shows the full portrait as a still image.
- [ ] Tell Claude when the master's is finished (update the About page in 3 languages).

## Decisions (Mohamed, 10 Nov 2026)

- **Positioning: SEO and growth**, not "SEO and GA4 tracking". Growth means the work in the case studies (conversion optimization, SaaS launch with web design and marketing automation, CTR and content) plus building WordPress websites. GA4 tracking stays as a service, framed as measurement inside growth. Site copy not yet changed.
- **Prices are private.** All published prices were removed (service pages, Morocco page, share images). The cost FAQs stay, without numbers. Do not publish prices again, even after employer approval, unless Mohamed asks.
- **Employer approval:** not yet given. Until it is, nothing that actively seeks clients. Maintenance mode for the site is under discussion.
- **WordPress websites:** a service he provides. An upcoming case study (a full site he built and optimized) will back it; the client has not signed off yet, so no service page or case study until then.
- **Industry pages: later, not now.** Only for industries with real experience: clinics and medical spas (medspa audit), SaaS and B2B (SaaS launch, Moroccan B2B), marketplaces (luxury marketplace audit). The law firm page is the model.
- **Site in portfolio mode** (`OPEN_FOR_WORK = false`): buttons that ask for work are hidden. Since 13 Nov 2026 this also covers the sentences about calls and quotes (homepage, cost FAQs, first-contact FAQ), the `ProfessionalService` schema and the "SEO consultant" description in the `Person` schema. All of it comes back when the constant is set to `true`. The CV download was removed on 13 Nov 2026: the file named clients and was out of date. A new CV can be added back once Mohamed supplies one without client names.
- **Early December 2026:** Mohamed sends the Search Console export to compare with the August to October baseline.
- **Blog:** keep a small blog of problem articles tied to one service; LinkedIn gets shorter, different versions that link back (strategy report, 10 Nov 2026).
