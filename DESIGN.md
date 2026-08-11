---
name: "Monte Viejo"
description: "Cereza total: an everyday family-farm coffee system built from saturated cherry red, warm white, and soft photographic windows."
colors:
  cherry: "#c8102e"
  cherry-bright: "#d81736"
  cherry-deep: "#970820"
  cherry-soft: "#f8dfe4"
  leaf-soft: "#dce9df"
  paper: "#fffdf9"
  white: "#ffffff"
  ink: "#1d1514"
  muted: "#6d5652"
  focus-rose: "#ffb8c5"
typography:
  display:
    fontFamily: "Sarina, Segoe Script, cursive"
    fontSize: "clamp(4.7rem, 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  display-tablet:
    fontFamily: "Sarina, Segoe Script, cursive"
    fontSize: "clamp(4.2rem, 17vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  display-mobile:
    fontFamily: "Sarina, Segoe Script, cursive"
    fontSize: "clamp(3.7rem, 18vw, 5.1rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Be Vietnam Pro, Arial, sans-serif"
    fontSize: "clamp(2.4rem, 5vw, 4.6rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Be Vietnam Pro, Arial, sans-serif"
    fontSize: "clamp(1.25rem, 2.2vw, 1.8rem)"
    fontWeight: 750
    lineHeight: 1.18
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Be Vietnam Pro, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  body-lg:
    fontFamily: "Be Vietnam Pro, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Be Vietnam Pro, Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "0.08em"
  button:
    fontFamily: "Be Vietnam Pro, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 800
    lineHeight: 1.55
rounded:
  quote: "14px"
  surface: "16px"
  pill: "999px"
spacing:
  grid-gap: "24px"
  card-padding: "30px"
  container-gutter: "48px"
  section-mobile: "72px"
  section-tablet: "84px"
  section: "112px"
components:
  button-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.cherry-deep}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "13px 22px"
    height: "50px"
  button-cherry:
    backgroundColor: "{colors.cherry}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
    height: "44px"
  product-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "{spacing.card-padding}"
  product-card-featured:
    backgroundColor: "{colors.cherry}"
    textColor: "{colors.white}"
    rounded: "{rounded.surface}"
    padding: "{spacing.card-padding}"
  proof-strip:
    backgroundColor: "{colors.cherry}"
    textColor: "{colors.white}"
    padding: "20px 24px"
  product-badge:
    backgroundColor: "{colors.white}"
    textColor: "{colors.cherry-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
  navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "0 24px"
    height: "78px"
  gallery-control:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    size: "32px"
    height: "32px"
    width: "32px"
---

# Design System: Monte Viejo

## Overview

**Creative North Star: "Cereza total"**

Monte Viejo feels like everyday coffee from one real family farm: vivid, warm, direct, and easy to trust. Saturated coffee-cherry red creates the visual world, warm white gives it air, and real product, landscape, and family photography supplies the proof.

The system refuses generic dark-luxury black-and-gold coffee branding. Its expression comes from one swept script gesture, soft photographic windows, a blossom motif, and tactile controls, while all product information stays clear and friendly.

**Key Characteristics:**

- Saturated cherry-red and warm-white fields
- One expressive script gesture against a rounded grotesk interface
- Organic photographic windows with real farm and product imagery
- Mostly flat tonal structure with selective ambient depth
- Tactile, direct, and friendly components

## Colors

Cherry red is the dominant brand field; warm whites and a softened cherry tint provide relief, while dark ink and muted brown carry readable content.

### Primary

- **Coffee-Cherry Red:** The dominant field for hero, origin, invitation, featured product, and primary header action.
- **Deep Cherry:** Strong text on pale surfaces and the dark end of the hero gradient.

### Secondary

- **Cherry Blossom Tint:** The family-story field and a soft catalog-card variant.
- **Focus Rose:** A high-visibility focus outline for keyboard interaction.

### Neutral

- **Warm Paper:** The page canvas and footer background.
- **Clean White:** Major relief surfaces, light actions, and content cards.
- **Coffee Ink:** Default text on pale surfaces.
- **Warm Muted Brown:** Supporting copy, footer links, and secondary information.

**The Cereza Rule.** Cherry red owns large fields and main actions; black and gold enter only through the real logo and package photography.

## Typography

**Display Font:** Sarina (with Segoe Script and cursive fallbacks)
**Body Font:** Be Vietnam Pro (with Arial and sans-serif fallbacks)

**Character:** Sarina supplies one human, swept signature. Be Vietnam Pro keeps navigation, product detail, proof, and long-form copy rounded, legible, and matter-of-fact.

### Hierarchy

- **Display** (400, fluid 4.7–6rem, 0.92): The Monte Viejo hero mark only, rotated slightly to preserve its handwritten gesture.
- **Headline** (800, fluid 2.4–4.6rem, 1.02): Major section statements and closing calls to action.
- **Title** (750, fluid 1.25–1.8rem, 1.18): Product and value-card names.
- **Body** (400, 1rem, 1.55): Default reading copy; supporting introductions rise to 1.125rem and stay near 65–68 characters.
- **Label** (800, 0.6875rem, 0.08em): Uppercase origin and specification labels.
- **Button** (800, 0.875rem, 1.55): Compact, direct action language.

**The One Script Gesture Rule.** Sarina belongs to the Monte Viejo hero mark only; all reading and interface copy stays in Be Vietnam Pro.

## Layout

The page uses centered fluid containers capped at 1240px, with a 48px desktop gutter that contracts to 32px on small screens. Section rhythm steps from 112px on desktop to 84px below 820px and 72px below 540px.

Desktop sections use direct two-column compositions, a twelve-column product grid, and generous gaps. Product cards shift from asymmetric five/seven-column spans to equal halves below 1050px and a single column below 820px. The hero becomes a stacked red message and farm window below 820px; its action remains before the imagery and the origin proof becomes a two-by-two grid.

The family section is a compact proof moment rather than a long-form story: an organic 4:3 photograph supports a short introduction and three hairline-separated facts. It uses the 84px section rhythm on desktop and places copy before photography on narrow screens.

## Elevation & Depth

The system is mostly flat and tonal. White, paper, blush, and cherry fields create structure without framing every section; ambient shadows belong to photographic objects, action pills, and meaningful card hover lift. Organic masks, overlap, subtle image scale, and a single gloss sweep provide depth without turning the page into a stack of floating panels.

### Shadow Vocabulary

- **Action Ambient:** A concentrated cherry-brown shadow under the light WhatsApp actions.
- **Card Rest:** A broad, low-opacity warm shadow that separates white catalog cards from warm paper.
- **Card Lift:** A larger warm shadow paired with a 5px hover rise.
- **Photographic Object:** A diffuse drop shadow on the hero bag and stronger ambient depth around the package gallery.

**The Flat-by-Default Rule.** Keep structural surfaces flat and tonal; add ambient depth only to photographic objects or meaningful interactive lift.

## Shapes

Functional controls are clear pills, while content cards use gently rounded 16px corners. Photography is more expressive: asymmetric percentage radii form soft farm, family, and package windows; the hero bag uses a clipped product silhouette. Fine hairlines divide proof and origin data without boxing the whole interface.

**The Soft Window Rule.** Use organic asymmetry for photographs, clean pills for actions, and restrained corners for information containers.

## Components

### Buttons

- **Shape:** Full pill with a 50px primary action height and 44px compact header action.
- **Light Primary:** White on cherry contexts with deep-cherry text and a tight ambient shadow.
- **Cherry Header:** Cherry on warm paper with white text.
- **Hover / Focus:** Rise 2px; light buttons run one gloss sweep, and keyboard focus keeps the visible rose outline.

### Chips

- **Badge:** Small white pill with deep-cherry text, 8px by 12px padding, and 800-weight copy. Use only for concise product emphasis.

### Cards / Containers

- **Product Cards:** White or soft tonal fills, 16px corners, a 30px content inset, and large photographic headers. Featured retail uses a full cherry field with white copy.
- **Hover / Focus:** Rise 5px, deepen the ambient shadow, and scale the image to 1.035. Focus does not add a competing card outline because the global focus ring remains visible.
- **Story Blocks:** Flat rows separated by a single cherry-tinted top hairline.

### Navigation

- **Desktop:** Sticky warm-paper header, small dark links, cherry underline on hover or focus, and one compact WhatsApp pill.
- **Mobile:** Hide the link group below 820px and keep the brand plus WhatsApp action. The header action becomes unavailable while the hero action is visible, so only one primary action competes at a time.

### Origin Proof Strip

Use a full cherry field with four concise definition-list cells and translucent white dividers. On narrow screens, reflow it into a two-by-two grid without changing the proof order.

### Package Gallery

Place product imagery inside one white organic window, with two circular transparent arrow controls below. Hover and keyboard focus invert each control from transparent to white.

## Do's and Don'ts

### Do:

- **Do** let coffee-cherry red own major fields and actions.
- **Do** use real farm, family, and package photography inside soft windows.
- **Do** keep the product offer, origin proof, and WhatsApp action direct and readable.
- **Do** disable gloss, lift, and automatic gallery motion when reduced motion is requested.

### Don't:

- **Don't** rebuild the rejected generic black-and-gold luxury world.
- **Don't** spread the script font beyond the single Monte Viejo hero gesture.
- **Don't** add shadows to every section, divider, or information block.
- **Don't** replace organic photography with decorative cards or a bento grid.
