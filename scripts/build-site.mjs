import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "_site");
const contentSource = readFileSync(resolve(root, "content.js"), "utf8");
const sandbox = { window: {} };

vm.runInNewContext(contentSource, sandbox, { filename: "content.js" });

const content = sandbox.window.siteContent;
const site = content?.site;
const campaign = content?.campaign;

const required = {
  title: site?.title,
  description: site?.description,
  brandName: site?.brandName,
  canonicalUrl: site?.canonicalUrl,
  language: site?.language,
  locale: site?.locale,
  organizationDescription: site?.organizationDescription,
  logo: site?.logo,
  whatsappPhone: site?.whatsappPhone,
  socialImage: site?.socialImage,
  socialImageAlt: site?.socialImageAlt,
  heroBrand: content.hero?.title,
  heroTitle: content.hero?.text,
  storyTitle: content.story?.title,
  storyIntro: content.story?.intro,
  storyCaption: content.story?.caption
};

for (const [name, value] of Object.entries(required)) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing content value: ${name}`);
  }
}

if (!/^\d{8,15}$/.test(site.whatsappPhone)) {
  throw new Error("site.whatsappPhone must contain 8 to 15 digits");
}

for (const [name, value] of Object.entries({
  campaignTitle: campaign?.title,
  campaignDescription: campaign?.description,
  campaignCanonicalUrl: campaign?.canonicalUrl,
  campaignOffer: campaign?.offer,
  campaignSaving: campaign?.saving,
  campaignPromotion: campaign?.promotion,
  campaignSocialImage: campaign?.socialImage,
  campaignSocialImageAlt: campaign?.socialImageAlt
})) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing content value: ${name}`);
  }
}

if (!Array.isArray(campaign.sizes) || campaign.sizes.length !== 2 || campaign.sizes.some((size) => !size.value || !size.price)) {
  throw new Error("content.campaign.sizes must contain two complete options");
}

const priceOf = (size) => Number(campaign.sizes.find((item) => item.value === size)?.price.replace(/[^\d.]/g, ""));
const campaignSaving = priceOf("500 g") * 2 - priceOf("1 kg");
if (campaignSaving <= 0 || campaign.saving !== `Ahorras S/${campaignSaving}`) {
  throw new Error("Campaign prices and the advertised saving do not match");
}

const canonicalUrl = new URL(site.canonicalUrl).href;
const absoluteUrl = (path) => new URL(path, canonicalUrl).href;
const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${canonicalUrl}#organization`,
      name: site.brandName,
      url: canonicalUrl,
      description: site.organizationDescription,
      telephone: `+${site.whatsappPhone}`,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(site.logo)
      }
    },
    {
      "@type": "WebSite",
      "@id": `${canonicalUrl}#website`,
      url: canonicalUrl,
      name: site.brandName,
      inLanguage: site.language,
      publisher: { "@id": `${canonicalUrl}#organization` }
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: site.title,
      description: site.description,
      inLanguage: site.language,
      isPartOf: { "@id": `${canonicalUrl}#website` },
      about: { "@id": `${canonicalUrl}#organization` },
      primaryImageOfPage: absoluteUrl(site.socialImage)
    }
  ]
};

const jsonLd = JSON.stringify(structuredData, null, 2).replaceAll("<", "\\u003c");
const seo = `<!-- seo:generated:start -->
    <meta name="description" content="${escapeHtml(site.description)}">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <title>${escapeHtml(site.title)}</title>
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="${escapeHtml(site.locale)}">
    <meta property="og:site_name" content="${escapeHtml(site.brandName)}">
    <meta property="og:title" content="${escapeHtml(site.title)}">
    <meta property="og:description" content="${escapeHtml(site.description)}">
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
    <meta property="og:image" content="${escapeHtml(absoluteUrl(site.socialImage))}">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${escapeHtml(site.socialImageAlt)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(site.title)}">
    <meta name="twitter:description" content="${escapeHtml(site.description)}">
    <meta name="twitter:image" content="${escapeHtml(absoluteUrl(site.socialImage))}">
    <meta name="twitter:image:alt" content="${escapeHtml(site.socialImageAlt)}">
    <script type="application/ld+json">
${jsonLd.split("\n").map((line) => `      ${line}`).join("\n")}
    </script>
    <!-- seo:generated:end -->`;

const campaignUrl = new URL(campaign.canonicalUrl).href;
const campaignStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${campaignUrl}#webpage`,
      url: campaignUrl,
      name: campaign.title,
      description: campaign.description,
      inLanguage: site.language,
      isPartOf: { "@id": `${canonicalUrl}#website` },
      about: { "@id": `${campaignUrl}#product` }
    },
    {
      "@type": "Product",
      "@id": `${campaignUrl}#product`,
      name: "Café tostado Monte Viejo",
      description: campaign.description,
      image: absoluteUrl(campaign.socialImage),
      brand: { "@type": "Brand", name: site.brandName },
      offers: campaign.sizes.map((size) => ({
        "@type": "Offer",
        name: size.value,
        price: size.price.replace(/[^\d.]/g, ""),
        priceCurrency: "PEN",
        availability: "https://schema.org/InStock",
        url: campaignUrl,
        priceValidUntil: "2026-09-30"
      }))
    }
  ]
};
const campaignJsonLd = JSON.stringify(campaignStructuredData, null, 2).replaceAll("<", "\\u003c");
const campaignSeo = `<!-- campaign-seo:generated:start -->
    <meta name="description" content="${escapeHtml(campaign.description)}">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <title>${escapeHtml(campaign.title)}</title>
    <link rel="canonical" href="${escapeHtml(campaignUrl)}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="${escapeHtml(site.locale)}">
    <meta property="og:site_name" content="${escapeHtml(site.brandName)}">
    <meta property="og:title" content="${escapeHtml(campaign.title)}">
    <meta property="og:description" content="${escapeHtml(campaign.description)}">
    <meta property="og:url" content="${escapeHtml(campaignUrl)}">
    <meta property="og:image" content="${escapeHtml(absoluteUrl(campaign.socialImage))}">
    <meta property="og:image:alt" content="${escapeHtml(campaign.socialImageAlt)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(campaign.title)}">
    <meta name="twitter:description" content="${escapeHtml(campaign.description)}">
    <meta name="twitter:image" content="${escapeHtml(absoluteUrl(campaign.socialImage))}">
    <script type="application/ld+json">
${campaignJsonLd.split("\n").map((line) => `      ${line}`).join("\n")}
    </script>
    <!-- campaign-seo:generated:end -->`;

let html = readFileSync(resolve(root, "index.html"), "utf8");
const marker = /<!-- seo:generated:start -->[\s\S]*?<!-- seo:generated:end -->/;

if (!marker.test(html)) {
  throw new Error("SEO generation markers are missing from index.html");
}

html = html
  .replace(marker, seo)
  .replace(/<html lang="[^"]+">/, `<html lang="${escapeHtml(site.language)}">`)
  .replace(/(<p class="hero-brand">)[\s\S]*?(<\/p>)/, `$1${escapeHtml(content.hero.title)}$2`)
  .replace(/(<h1 class="hero-copy" id="hero-title">)[\s\S]*?(<\/h1>)/, `$1${escapeHtml(content.hero.text)}$2`)
  .replace(/phone=\d+/g, `phone=${site.whatsappPhone}`);

let campaignHtml = readFileSync(resolve(root, "cafe-de-especialidad-lima/index.html"), "utf8");
const campaignMarker = /<!-- campaign-seo:generated:start -->[\s\S]*?<!-- campaign-seo:generated:end -->/;
if (!campaignMarker.test(campaignHtml)) {
  throw new Error("Campaign SEO generation markers are missing");
}
campaignHtml = campaignHtml.replace(campaignMarker, campaignSeo);

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const entry of ["assets", "cafe-de-especialidad-lima", "CNAME", "content.js", "robots.txt", "sitemap.xml"]) {
  cpSync(resolve(root, entry), resolve(output, entry), { recursive: true });
}

writeFileSync(resolve(output, "index.html"), html);
writeFileSync(resolve(output, "cafe-de-especialidad-lima/index.html"), campaignHtml);

const renderedJson = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
const organization = renderedJson["@graph"].find((entry) => entry["@type"] === "Organization");
const phones = [...html.matchAll(/phone=(\d+)/g)].map((match) => match[1]);
const localAssets = [...html.matchAll(/(?:href|src)="(assets\/[^"?]+)(?:\?[^"#]*)?"/g)].map((match) => match[1]);
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
const missingAnchors = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]).filter((id) => !ids.has(id));
const campaignAssets = [...campaignHtml.matchAll(/(?:href|src)="\.\.\/(assets\/[^"?]+)(?:\?[^"#]*)?"/g)].map((match) => match[1]);
const campaignDistricts = [...campaignHtml.matchAll(/<option value="([^"]+)"><\/option>/g)].map((match) => match[1]);

if (organization?.telephone !== `+${site.whatsappPhone}` || phones.some((phone) => phone !== site.whatsappPhone)) {
  throw new Error("Generated SEO or WhatsApp phone does not match content.js");
}

if ((html.match(/<h1\b/g) || []).length !== 1 || !html.includes(escapeHtml(content.hero.text))) {
  throw new Error("Generated page must contain one content-driven H1");
}

if (!Array.isArray(content.story?.proof) || content.story.proof.length !== 3 || content.story.proof.some((item) => !item.label || !item.value)) {
  throw new Error("content.story.proof must contain three complete items");
}

if (!html.includes(escapeHtml(content.story.intro)) || content.story.proof.some((item) => !html.includes(escapeHtml(item.label)) || !html.includes(escapeHtml(item.value)))) {
  throw new Error("Generated family section does not match content.js");
}

if (!html.includes('<details class="business-products" open>')) {
  throw new Error("Business products must be visible without JavaScript on desktop");
}

if (localAssets.some((asset) => !existsSync(resolve(root, asset)))) {
  throw new Error("Generated page references a missing local asset");
}

if (missingAnchors.length) {
  throw new Error(`Generated page references missing anchors: ${missingAnchors.join(", ")}`);
}

if (campaignAssets.some((asset) => !existsSync(resolve(root, asset)))) {
  throw new Error("Generated campaign page references a missing local asset");
}

if ((campaignHtml.match(/<h1\b/g) || []).length !== 1 || !campaignHtml.includes(escapeHtml(campaign.offer))) {
  throw new Error("Generated campaign page must contain one H1 and the content-driven offer");
}

if (campaignDistricts.length !== 43 || new Set(campaignDistricts).size !== 43) {
  throw new Error("Campaign district list must contain the 43 unique districts of Lima");
}

const robots = readFileSync(resolve(root, "robots.txt"), "utf8");
const sitemap = readFileSync(resolve(root, "sitemap.xml"), "utf8");
if (!robots.includes(`${canonicalUrl}sitemap.xml`) || !sitemap.includes(`<loc>${canonicalUrl}</loc>`) || !sitemap.includes(`<loc>${campaignUrl}</loc>`)) {
  throw new Error("robots.txt or sitemap.xml does not match the canonical URL");
}

console.log(`Built ${output} with homepage and campaign SEO metadata from content.js`);
