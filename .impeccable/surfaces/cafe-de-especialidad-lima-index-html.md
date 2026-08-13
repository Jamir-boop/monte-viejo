---
version: 1
slug: "cafe-de-especialidad-lima-index-html"
primary_target: "cafe-de-especialidad-lima/index.html"
related_targets: ["cafe-de-especialidad-lima/campaign.css","cafe-de-especialidad-lima/campaign.js"]
---

# Lima campaign landing page

- **Scope and mode:** Persuade surface at `cafe-de-especialidad-lima/index.html`; mobile-first, Spanish, static GitHub Pages.
- **Audience and job:** Lima home-coffee drinkers aged roughly 25–54 must understand the launch value, choose a format, and start a complete WhatsApp order.
- **Action and proof:** Primary action is WhatsApp. Proof is the real Monte Viejo package, family, Rodríguez de Mendoza landscape, +1600 m s. n. m., washed process, and estimated 83 SCA.
- **Offer:** 500 g at S/55; featured 1 kg at S/85; honest S/25 saving against two 500 g bags. Whole bean or ground. Yape, Plin, and transfer. Delivery has an additional cost quoted by district, with free delivery on purchases over S/200. Valid through September 30, 2026, or the first 100 units.
- **Direction:** Approved comp `.impeccable/mocks/lima-campaign-combined-preview.png`. Bag-led cherry hero from Option 1, followed by Option 2's clean selection and proof system. Preserve offer → size → preparation → district → WhatsApp.
- **Memorable moment:** The real black package crosses a diagonal cherry-to-paper seam beside the large S/85 offer; the order choices begin immediately below it.
- **Boundaries:** Keep the established Cereza total system. No S/130 reference, false crossed-out price, free shipping, countdown, testimonials, cart, checkout, or invented delivery time. The available package photograph says 500 g and is a temporary product reference; do not label the photographed package as 1 kg.
- **Responsive behavior:** On mobile the hero, controls, and proof are one clear vertical route with a sticky WhatsApp action. On desktop the offer and product stage become a two-column first viewport, while the order flow stays directly below.

## Shipped surface decisions

- Stack the hero size and price as a compact value block so the offer stays legible beside the overlapping package at every breakpoint.
- Keep “Elige tu tamaño” as the first visible order heading; the broader form title stays available to assistive technology without delaying the first choice.
- Show the photographed 500 g package disclosure directly beneath the hero product. The disclosure travels with the image and remains visible against the diagonal seam.
- Mark selected options with a cherry border, pale cherry fill, and check; reserve the “Mejor precio” badge for the preselected 1 kg choice.
- Keep the district control as a native text-and-datalist combobox containing the 43 districts of Lima; accept unaccented typing and normalize it to the official display name before handoff.
- On mobile, show the fixed WhatsApp action only while every in-flow action is outside the viewport, and offset it for the device safe area.
- Use one entrance motion on the package only; remove effective animation and transition time when reduced motion is requested.

## Implementation inventory

| Region | Commitment | Medium |
|---|---|---|
| Compact brand | Logo and brand name only; no full navigation | Semantic HTML + existing logo asset |
| Hero | Cherry field, diagonal seam, large price and package overlap | Semantic HTML/CSS + existing package WebP |
| Primary action | Large warm-white pill in hero; red pill in order flow | Accessible anchors/buttons + inline SVG icon |
| Size | Two options, 1 kg preselected and visually dominant | Native radio inputs with styled labels |
| Preparation | Whole bean and ground options | Native radio inputs with styled labels |
| District | Required searchable choice across Lima's 43 districts | Native text input + datalist with canonical-name validation |
| WhatsApp handoff | Prepared message includes campaign, size, format, and district | Small progressive-enhancement JavaScript |
| Origin proof | Panoramic organic window and four facts | Existing landscape WebP + semantic definition list |
| Family proof | Compact photo strip, not a long story | Existing family WebP + short factual copy |
| Terms | Payments, delivery cost, real promotion limit | Semantic text and lightweight inline icons |
| Tracking hooks | UTM preservation and `Contact` event hook without inventing a pixel ID | HTML data attributes + JavaScript event dispatch |

## Component grammar

- Soft 16 px information surfaces, pill actions and controls, no bento grid.
- Hairline cherry dividers and flat tonal regions; shadow only for product and important actions.
- Be Vietnam Pro throughout; Sarina only for the Monte Viejo gesture.
- Cherry owns the hero and actions; warm paper owns the selection and proof areas.
