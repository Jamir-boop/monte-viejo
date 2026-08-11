# Monte Viejo Google SEO plan

Last updated: 2026-08-11

## Goal

Make `https://monteviejo.org/` easy for Google to crawl, understand, index, and measure before the next campaign. Keep home coffee drinkers in Peru as the primary audience and WhatsApp as the main conversion.

## Operating rules

- Keep the site static and compatible with GitHub Pages.
- Keep `content.js` as the client-editable source for visible content.
- Use only verified product and business facts.
- Do not create thin pages, fake reviews, certifications, prices, or delivery claims.
- Treat Google Ads and organic search as separate channels with shared landing-page quality.

## Baseline from the 2026-08-11 audit

- `https://monteviejo.org/` returns `200` and exposes the main content in HTML.
- `http://monteviejo.org/` also returns `200`; HTTPS consolidation requires a Cloudflare or hosting change.
- `https://www.monteviejo.org/` redirects to the HTTPS apex domain.
- `https://monteviejo.org/code.html` returns `200` and exposes an obsolete design.
- `sitemap.xml` returns `404`.
- The Cloudflare-generated `robots.txt` does not declare a sitemap.
- The homepage has no canonical URL or structured data.
- Static and JavaScript page titles are different.
- Referenced page images total about 3.7 MB; `family-sq.png` is about 2.4 MB.
- Authenticated Search Console, Analytics, Ads, and field Core Web Vitals data are not available yet.

## Phase 1: Index integrity and search metadata

Status: complete and verified in production

- [x] Add the HTTPS canonical URL.
- [x] Align the static and JavaScript title and description.
- [x] Use the `es-PE` language tag.
- [x] Add Open Graph and social preview metadata with a dedicated 1200 × 630 image.
- [x] Add factual `Organization`, `WebSite`, and `WebPage` JSON-LD.
- [x] Generate static SEO metadata and fallback WhatsApp links from `content.js` during deployment.
- [x] Add a root `robots.txt` that allows crawling and declares the sitemap.
- [x] Add a root `sitemap.xml` containing canonical, indexable pages only.
- [x] Remove the obsolete `code.html` page from publication.
- [x] Configure a permanent HTTP-to-HTTPS redirect in Cloudflare.

Acceptance criteria:

- One preferred homepage URL: `https://monteviejo.org/`.
- The canonical, title, description, Open Graph URL, JSON-LD URL, and sitemap URL agree.
- `code.html` returns `404` or `410` after deployment.
- `robots.txt` and `sitemap.xml` return `200` after deployment.

## Phase 2: Image and loading performance

Status: complete locally

- [x] Replace the 2.4 MB family image used by the page with a compressed WebP copy.
- [x] Replace the hero JPEG with a smaller WebP copy after visual inspection.
- [x] Add intrinsic image dimensions where the source dimensions are fixed.
- [x] Give high priority only to the primary hero image.
- [x] Lazy-load and asynchronously decode below-fold images.
- [x] Preserve descriptive alt text and the current responsive composition.
- [x] Measure the referenced image payload before and after.

Acceptance criteria:

- The referenced image payload falls substantially without visible breakage.
- Above-fold images remain eager; below-fold images are lazy.
- The package gallery and content-driven product rendering still work.
- No new Impeccable detector findings appear.

## Phase 3: Google indexing and measurement

Status: blocked on account access and measurement decisions

- [ ] Verify a Search Console Domain property for `monteviejo.org` through DNS.
- [ ] Submit `https://monteviejo.org/sitemap.xml`.
- [ ] Run URL Inspection for the homepage and request indexing.
- [ ] Confirm the Google-selected canonical after Google processes the page.
- [ ] Select GA4, Google Ads conversion tracking, or another approved measurement method.
- [ ] Track outbound WhatsApp clicks with page and campaign source.
- [ ] Verify one test conversion before paid traffic starts.

Acceptance criteria:

- Search Console reports that the canonical homepage is available to Google.
- The sitemap status is `Success`.
- A test WhatsApp click appears once in the selected measurement system.

## Phase 4: Search-intent landing pages

Status: blocked on keyword data and commercial facts

Planned pages, in priority order:

1. `/cafe-en-grano/` for retail coffee-bean purchase intent.
2. `/cafe-molido/` for retail ground-coffee purchase intent.
3. `/cafe-verde-mayorista/` for green coffee and wholesale intent.
4. `/cafe-amazonas/` for origin, family, and Rodríguez de Mendoza searches.

Before implementation, validate the seed terms in Google Ads Keyword Planner for Peru and Spanish. Each commercial page also needs verified price or quote rules, availability, delivery coverage, delivery time, payment process, and current product details. Pages must contain useful, distinct information and a product-specific WhatsApp message.

Acceptance criteria:

- Each page has one clear search intent, unique metadata, useful visible content, and a canonical URL.
- Retail campaign ads link to the matching retail page, not to a generic homepage.
- No page repeats the homepage with only a changed heading.

## Phase 5: Authority and local visibility

Status: planned after indexing

- [ ] Confirm whether Monte Viejo is eligible for a Google Business Profile through real in-person customer contact.
- [ ] Keep business name, phone, site URL, location or service area, and social profiles consistent.
- [ ] Seek legitimate mentions from coffee associations, partner cafés, regional agriculture organizations, and relevant publications.
- [ ] Publish original farm, harvest, process, and preparation content only when it answers real customer or Search Console questions.
- [ ] Avoid purchased links, bulk directories, and keyword-filled location pages.

## Campaign launch gate

- [x] HTTP redirects permanently to the HTTPS canonical.
- [x] `code.html` is unavailable.
- [ ] Search Console accepts the sitemap and live homepage.
- [ ] WhatsApp conversion tracking passes a test.
- [x] Mobile image loading and the WhatsApp CTA pass functional checks.
- [ ] Prices, delivery coverage, payment, and order expectations are clear on the selected landing page.
- [ ] Each ad group links to a page that directly matches its search intent.

## Metrics

Track weekly after launch:

- Indexed canonical pages.
- Non-brand impressions, clicks, CTR, and average position by page and query.
- Mobile LCP, INP, and CLS from Search Console when field data becomes available.
- Organic and paid WhatsApp clicks by landing page.
- Qualified WhatsApp conversations and completed orders, if the business can record them.
- Paid cost per qualified conversation.

Do not set a ranking promise until at least 28 days of Search Console data exist.

## Decisions and access required from the owner

1. Which retail product will lead the campaign: coffee beans, ground coffee, or both?
2. What are the current prices, payment methods, delivery areas, delivery costs, and typical delivery times?
3. Can customers visit Monte Viejo in person, or does the business meet customers in person?
4. Which measurement method is approved, and what Google account should own Search Console, Analytics, and Ads?
5. Cloudflare access is complete. Namecheap access is not expected unless DNS ownership or nameserver changes are required.

## Verification record

Local implementation completed on 2026-08-11:

- The referenced image payload fell from about 3.72 MB to 1.25 MB, a 66.4% reduction.
- The replaced family and hero source pair fell from 2,655,687 bytes to 187,524 bytes, a 92.9% reduction.
- Both generated images are valid WebP files at the original dimensions.
- `content.js` and `assets/js/content-loader.js` pass `node --check`.
- JSON-LD and `sitemap.xml` parse successfully.
- All local `src` and `href` file references resolve.
- The Impeccable static detector reports zero findings for `index.html`.
- Local HTTP checks return `200` for the homepage, `robots.txt`, and `sitemap.xml`; `code.html` returns `404`.
- Desktop and 390 px mobile browser checks show no horizontal overflow, no broken images, and no console errors.
- The primary WhatsApp CTA remains inside the first mobile viewport.
- The package gallery advances to item `2 / 3` with the correct visible image.
- The deployment build generates static metadata, structured data, and WhatsApp phone values from `content.js`.
- Cloudflare redirects HTTP to the HTTPS canonical with `301 Moved Permanently`.
- GitHub Pages deployed commit `9a9ae63` successfully through the generated-site workflow.
- Production returns `200` for the homepage, `robots.txt`, and `sitemap.xml`; `code.html` returns `404`.
- Production metadata, images, WhatsApp links, browser console, and horizontal overflow checks pass.

Still not verified:

- Authenticated Search Console indexing and selected canonical.
- Field Core Web Vitals.
- Analytics and Google Ads conversion tracking.
