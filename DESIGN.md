---
name: Monte Viejo Visual Language
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d1c5b4'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#9a8f80'
  outline-variant: '#4e4639'
  surface-tint: '#e9c176'
  primary: '#e9c176'
  on-primary: '#412d00'
  primary-container: '#c5a059'
  on-primary-container: '#4e3700'
  inverse-primary: '#775a19'
  secondary: '#ffb3ad'
  on-secondary: '#680009'
  secondary-container: '#ce001d'
  on-secondary-container: '#ffdcd9'
  tertiary: '#c6c6c7'
  on-tertiary: '#2f3131'
  tertiary-container: '#a4a5a5'
  on-tertiary-container: '#393b3b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea5'
  primary-fixed-dim: '#e9c176'
  on-primary-fixed: '#261900'
  on-primary-fixed-variant: '#5d4201'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb3ad'
  on-secondary-fixed: '#410003'
  on-secondary-fixed-variant: '#930011'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-xl:
    fontFamily: notoSerif
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: notoSerif
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
  headline-md:
    fontFamily: notoSerif
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  body-lg:
    fontFamily: beVietnamPro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: beVietnamPro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: beVietnamPro
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin: 40px
  accent-line-height: 2px
---

## Brand & Style

The design system is anchored in the concept of "Artisanal Luxury." It bridges the gap between the raw, untamed beauty of the Amazonas region and the refined sophistication of specialty coffee culture. The aesthetic is a fusion of **Minimalism** and **Tactile** design, utilizing heavy whitespace (or "blackspace") to allow high-fidelity imagery of coffee beans and misty landscapes to take center stage. 

The emotional response should be one of quiet confidence, heritage, and exclusivity. Users should feel they are entering a boutique experience that values the slow, intentional process of coffee cultivation.

## Colors

The palette is unapologetically dark, creating a high-contrast stage for metallic accents.
- **Primary (Golden Harvest):** A rich, muted gold used for primary call-to-actions, iconography, and decorative borders. It represents the value of the bean and the sun over the Amazonas.
- **Neutral (Obsidian Black):** The primary canvas color. It is a deep, matte black that provides a sense of infinite depth and premium quality.
- **Accent (Heritage Line):** The Peruvian flag is represented by a specific red (#D91023) and pure white (#FFFFFF). These are used exclusively as a combined horizontal line element to ground the brand in its geographic origin.

Color application should be sparse; the gold should feel like a "discovery" rather than a dominant wash.

## Typography

This design system employs a pairing of **Noto Serif** and **Be Vietnam Pro** to balance heritage with contemporary warmth.
- **Noto Serif** handles all headlines. Its classic proportions and elegant serifs evoke the literary and historical depth of Peruvian coffee culture. 
- **Be Vietnam Pro** is used for body text and interface elements. Its organic, friendly curves prevent the dark theme from feeling overly cold or corporate.

All caps should be reserved for labels and small navigational elements to maintain an editorial feel.

## Layout & Spacing

The layout follows a **Fixed Grid** model to mirror the structure of a high-end editorial magazine. Wide outer margins (40px+) are essential to maintain the "premium" feel, ensuring content is never crowded.

A signature layout element is the **Heritage Accent Line**. This is a 2px high horizontal line composed of three segments: Red (25%), White (50%), and Red (25%). This line should be used to separate major sections of content or as a decorative "cap" above primary headlines, never exceeding 120px in total width.

## Elevation & Depth

Depth in this design system is achieved through **Tonal Layering** rather than traditional shadows. Since the background is deep black, "higher" surfaces are represented by slightly lighter shades of charcoal (#1A1A1A).

To add a sense of luxury, use **Subtle Golden Glows**. This is an extremely low-opacity (5-10%) radial gradient of the primary gold color placed behind hero products or key cards. It should look like an ambient light source reflecting off a surface in a dimly lit room, suggesting the presence of something precious.

## Shapes

The shape language is **Soft (0.25rem)**. This slight rounding takes the "edge" off the brutal black background, making the interface feel more organic and approachable, akin to the rounded edges of a coffee bean. 

Large containers and image carousels should use the `rounded-lg` (0.5rem) token to emphasize the "vessel" feel of the UI.

## Components

- **Buttons:** Primary buttons are outlined in Gold with Gold text. On hover, they transition to a solid Gold fill with Black text. This "reveal" of light mimics the brightening of coffee when held to the light.
- **Heritage Line Separator:** A custom component consisting of the thin Red-White-Red line. It is used as a subtle "signature" at the end of articles or between product categories.
- **Cards:** Cards use a #141414 background (one step above base black) with a 1px border of #2A2A2A. There are no shadows. The Golden Glow elevation effect can be applied to the background of featured product cards.
- **Input Fields:** Minimalist design with only a bottom border in Gold. Labels use the `label-sm` uppercase style for an architectural look.
- **Chips:** Used for coffee notes (e.g., "Chocolate," "Citrus"). These should have a dark grey background with white text, using the `rounded-xl` pill shape to contrast with the more structured rectangular elements of the grid.
- **Product Tiles:** Focus on centered, high-shadow photography of coffee packaging. The price and title should be centered below the image using Noto Serif.