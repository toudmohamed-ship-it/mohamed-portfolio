# Semantic SEO audit and topical map

mohamedtoudghi.com, 31 October 2026. Covers all pages in English, French and Arabic.

## 1. Foundations

**Central entity:** Mohamed Toudghi, SEO consultant (one `Person` with `@id` `https://www.mohamedtoudghi.com/#person`, referenced by every page's structured data).

**Source context (why the site exists, how it earns):** an independent consultant based in Morocco, working remotely, who sells three things to service businesses, B2B and SaaS: technical SEO audits, local SEO, and GA4 / conversion tracking. Every page should connect back to one of those three, or to proof that he delivers them.

**Central search intent:** "hire an SEO consultant who can fix my site and show results" (commercial), supported by "learn how to fix it myself" (informational, the blog).

## 2. Topical map

```
Mohamed Toudghi, SEO consultant (home)                      core
├── Services hub (/services)                                core
│   ├── Technical SEO audit (/services/technical-seo-audit)  core, money page
│   ├── Local SEO (/services/local-seo)                      core, money page
│   │   └── SEO for law firms (/services/seo-for-law-firms) industry page, child of Local SEO
│   └── GA4 & tracking (/services/ga4-tracking)              core, money page
├── Proof: case studies (/portfolio, 7 studies)              core support
├── About, Contact, Privacy                                  trust
└── Blog                                                     outer, supporting
    ├── Technical SEO cluster  → links to Technical SEO audit
    │   ├── technical-seo-checklist-2026          (3,500 words)
    │   ├── technical-seo-audit-checklist-lead-gen (3,400 words)
    │   └── why-websites-fail                      (thin, 280 words)
    ├── Local SEO cluster      → links to Local SEO
    │   └── local-seo-guide-businesses             (1,200 words)
    ├── Analytics cluster      → links to GA4 & tracking
    │   └── ga4-event-tracking                     (1,200 words, rewritten Oct 2026)
    └── Keyword research       → links to the services hub
        └── keyword-research-process               (thin, 260 words)
```

Contextual bridges now in place: service page → related guide and case studies; case study → its service page(s) and guide; article → its service page (`ServiceBridge`); home offer cards → service pages.

## 3. How each service page is built

Each page has one macro context (the service) and answers the searcher's questions in order. Headings name the entity, so the page can rank for its query variations, not just one keyword:

| Section | Purpose | Example heading (technical audit) |
|---|---|---|
| Definition | "what is X" queries, defines the entity with plain subject-verb-object statements | What is a technical SEO audit? |
| Who it is for | problem-aware searches | When your site needs a technical SEO audit |
| What is included | entity attributes and values (each deliverable + what it means) | What the technical SEO audit includes |
| Process | "how does X work" | How the technical SEO audit works |
| Tools | related entities (Screaming Frog, Search Console, Lighthouse...) | Tools and data behind the audit |
| Comparison | "X vs Y" queries | Technical SEO audit vs. full SEO audit |
| Proof | first-hand experience (case studies) | Results from similar projects |
| FAQ | long-tail questions: cost, time, platforms, language | How much does a technical SEO audit cost? |

Structured data per page: `Service` with `provider` → the Person, `about` (main entity) and `mentions` (related entities), each with a Wikipedia `sameAs`, plus `OfferCatalog` (deliverables), `FAQPage` and `BreadcrumbList`. All of it matches visible content.

## 4. Findings and status

| # | Finding | Status |
|---|---|---|
| 1 | Service pages were thin (420 to 520 words) with generic headings ("Is this for you?") | **Fixed:** 750 to 1,050 words, entity-named headings, definition, scope, process, tools, comparison, 6 to 7 FAQs, in 3 languages |
| 2 | No entity graph: Person had a job title and LinkedIn only; pages did not reference each other | **Fixed:** one `@graph` with Person (alumniOf AUI, knowsLanguage, knowsAbout with Wikipedia links), WebSite and ProfessionalService; services and case studies point to the Person by `@id` |
| 3 | ProfessionalService claimed opening hours and a "$$" price range not in the facts | **Fixed:** removed |
| 4 | Articles did not link to the service they support | **Fixed:** service box under each article in the three main clusters |
| 5 | Three articles were thin (260 to 280 words): `ga4-event-tracking`, `keyword-research-process`, `why-websites-fail` | **Partly fixed:** `ga4-event-tracking` rewritten (1,200 words, EN/FR/AR, FAQ). **To do:** expand the other two to 1,200+ words each, with the same outline as the service pages (definition, steps, tools, mistakes, FAQ) |
| 6 | Articles have no `BlogPosting` schema | **Blocked:** the dates in `src/lib/blog-data.ts` and in the article text disagree (e.g. Nov 28, 2024 vs Nov 28, 2025). Needs the correct dates from Mohamed |
| 7 | Some French and Arabic articles fall back to a short translation (no fr/ar HTML file) | **To do:** translate `technical-seo-audit-checklist-lead-gen` into FR and AR |
| 8 | `local-seo-guide-businesses` has its own FAQ section in the HTML and a second FAQ block from metadata | **To do:** keep one |
| 9 | The services hub lists six services; only three have pages | **By design:** add pages for the other three only when there is proof (case studies) for them |
| 10 | Entity presence outside the site is weak (LinkedIn only) | **To do (Mohamed):** Google Business Profile (once a city is chosen), consistent name/title on LinkedIn, Clutch or Malt profiles, then add them to `sameAs` |

## 5. Content backlog (in priority order)

Each new article belongs to one cluster, targets a question people search, and links up to its service page.

1. **Technical SEO cluster:** "Crawled, currently not indexed: causes and fixes"; "Canonical tags explained, with examples"; "Website migration SEO checklist".
2. **Local SEO cluster:** "Google Business Profile categories: how to choose"; "How to get Google reviews (and reply to them)"; "City pages that rank without duplicate content". FR and AR versions matter here: "SEO local Maroc", "SEO محلي".
3. **Analytics cluster:** "Track WhatsApp clicks in GA4 with Google Tag Manager"; "GA4 conversions vs. key events"; "Looker Studio dashboard for service businesses".

## 6. Writing rules for semantic content (also see CLAUDE.md)

- Name the entity in the H1, the first sentence and the H2s ("What is local SEO?", not "Overview").
- Define with plain statements: subject, verb, object ("A technical SEO audit finds crawl errors").
- Give attributes with concrete values (what is checked, which tool, which threshold), never vague claims.
- One page, one main purpose. If a section answers a different search, it belongs on another page and gets linked.
- Facts about clients and results come only from the case studies. No invented numbers, prices or durations.
