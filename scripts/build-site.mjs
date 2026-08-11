import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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
  socialImageAlt: site?.socialImageAlt
};

for (const [name, value] of Object.entries(required)) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing content value: ${name}`);
  }
}

if (!/^\d{8,15}$/.test(site.whatsappPhone)) {
  throw new Error("site.whatsappPhone must contain 8 to 15 digits");
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

let html = readFileSync(resolve(root, "index.html"), "utf8");
const marker = /<!-- seo:generated:start -->[\s\S]*?<!-- seo:generated:end -->/;

if (!marker.test(html)) {
  throw new Error("SEO generation markers are missing from index.html");
}

html = html
  .replace(marker, seo)
  .replace(/<html lang="[^"]+">/, `<html lang="${escapeHtml(site.language)}">`)
  .replace(/phone=\d+/g, `phone=${site.whatsappPhone}`);

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const entry of ["assets", "CNAME", "content.js", "robots.txt", "sitemap.xml"]) {
  cpSync(resolve(root, entry), resolve(output, entry), { recursive: true });
}

writeFileSync(resolve(output, "index.html"), html);

const renderedJson = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
const organization = renderedJson["@graph"].find((entry) => entry["@type"] === "Organization");
const phones = [...html.matchAll(/phone=(\d+)/g)].map((match) => match[1]);

if (organization?.telephone !== `+${site.whatsappPhone}` || phones.some((phone) => phone !== site.whatsappPhone)) {
  throw new Error("Generated SEO or WhatsApp phone does not match content.js");
}

console.log(`Built ${output} with SEO metadata from content.js`);
