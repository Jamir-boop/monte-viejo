# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** home coffee drinkers in Peru who buy roasted beans or ground coffee for daily use and order by WhatsApp.
- **Secondary:** cafés, roasters, and shops buying green coffee or volume; the site must give them a clear path without letting it lead.

## Product Purpose

Monte Viejo sells specialty coffee directly from a family farm to the drinker. The website is the storefront: it presents the coffee, proves the origin, and turns a visit into a WhatsApp order. Success = the visitor sends a pre-filled WhatsApp order message.

## Positioning

A two-generation family farm in Rodríguez de Mendoza, Amazonas, selling traceable single-origin coffee grown above 1600 m s. n. m. (washed process, Catimor and Típica varieties, ~83 SCA). No neighboring brand can copy the specific place, altitude, and family behind each bag.

## Operating Context

- Orders happen in WhatsApp (+51 993 908 403); there is no cart or checkout.
- The site is static, hosted on GitHub Pages at monteviejo.org; there is no build step or backend.
- The client edits all text, images, and the WhatsApp number directly in `content.js` (see CLIENT_GUIDE.md); this workflow must survive any redesign.

## Capabilities and Constraints

- Catalog: green coffee, roasted beans, ground coffee — a small, fixed range.
- Language: Spanish.
- Static hosting only: no server code, no framework build, no analytics beyond what static hosting allows.

## Brand Commitments

- Name: Monte Viejo. Logo asset: `assets/images/logo-black-main.png`.
- Voice: plain, warm Spanish; factual family-and-origin tone, not luxury cliché.
- Peruvian/Amazonas origin is identity, not decoration.

## Evidence on Hand

- Real copy: `content.js` (story, catalog, process, contact).
- Photography: family, landscape, and product images under `assets/images/`.
- Incumbent visual system: `DESIGN.md` (dark "Artisanal Luxury") — user rejected it as too dark/heavy and generic luxury; it is anti-reference for the redesign.
- Absences: no testimonials, press, certifications, or sales figures — do not fabricate.

## Product Principles

1. Home drinker first; business buyers get a visible but secondary path.
2. Every screen stays one tap away from a WhatsApp order.
3. Origin truth (place, altitude, family) persuades; luxury signaling does not.
4. The client edits content without a developer — structure must stay content-driven.
