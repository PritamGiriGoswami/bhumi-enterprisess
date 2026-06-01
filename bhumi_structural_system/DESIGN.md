---
name: Bhumi Structural System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45474c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#041528'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a2a3e'
  on-tertiary-container: '#8191a9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
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
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system is engineered for a construction and architectural firm that bridges the gap between physical durability and digital precision. The brand personality is **authoritative, meticulous, and visionary**. It avoids the clutter of traditional industrial design in favor of a **Modern Corporate** aesthetic with **Minimalist** influences.

The UI should evoke a sense of structural integrity. We achieve this through a "drafting table" philosophy: ample white space, razor-sharp geometric alignments, and a rhythmic use of golden accents to highlight "points of interest" or "active construction." The target audience includes property developers, high-end residential clients, and urban planners who value both the technical blueprint and the final aesthetic result.

## Colors
This design system utilizes a high-contrast palette rooted in architectural materials.

- **Primary (Deep Slate Blue):** Represents the blueprint, the steel beam, and professional stability. Used for headers, primary text, and heavy structural elements.
- **Secondary (Construction Gold):** A vibrant amber used sparingly for calls to action, progress indicators, and "active state" highlights. It symbolizes the spark of innovation and the visibility of a construction site.
- **Tertiary (Muted Slate):** Used for secondary information, icons, and borders to maintain a technical, sophisticated feel.
- **Neutral (Ice White & Slate Gray):** The canvas. A clean, cool white base provides the "gallery" feel required to showcase high-quality architectural photography.

## Typography
The typography strategy reinforces the duality of the brand: **Montserrat** provides a bold, geometric foundation for headings that feels built to last. **Inter** handles the complex data and descriptive text with neutral, high-legibility efficiency.

We introduce **Geist** for labels and technical data points. Its monospaced-adjacent qualities lend a "developer" or "engineer" precision to measurements, site specs, and metadata. All caps should be reserved strictly for labels and small navigational elements to maintain a professional, blueprint-inspired rhythm.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to mirror the constraints of a physical site plan. We utilize a 12-column grid with generous 24px gutters to ensure content never feels "cramped"—space is treated as a luxury material.

- **Desktop:** 12-column grid, 1280px max-width, center-aligned.
- **Tablet:** 8-column fluid grid with 32px side margins.
- **Mobile:** 4-column fluid grid with 16px side margins.

Spacing should follow a strict 8px base unit. Use larger 64px or 80px vertical gaps between major sections to emphasize the "monumental" scale of the projects being showcased.

## Elevation & Depth
Depth is communicated through **Tonal Layers** rather than heavy shadows. The background is a crisp neutral, while "floating" elements like cards use a subtle, 1px low-contrast outline in Muted Slate (`#E2E8F0`).

When elevation is required for interactivity (e.g., a hovered card), use an **Ambient Shadow**: a very large, soft blur with 4% opacity of the Primary color. This creates a "lift" effect that feels airy and modern, rather than heavy or dated. Architectural imagery should be treated as the highest layer, often breaking the grid or overlapping container borders to create a 3D "visionary" feel.

## Shapes
In alignment with structural engineering, the shape language is **Soft (0.25rem)**. This slight rounding takes the "edge" off the industrial nature of the brand, making it feel modern and approachable without losing the precision of a sharp corner.

- **Small elements (Buttons, Inputs):** 4px (0.25rem) radius.
- **Large elements (Cards, Image Containers):** 8px (0.5rem) radius.
- **Interactive Accents:** Use 45-degree angled clipped corners on decorative elements (like image frames or tab indicators) to mimic architectural drafting symbols.

## Components
- **Buttons:** Primary buttons are solid Deep Slate Blue with white Montserrat text. Secondary buttons use a "ghost" style with a Construction Gold border and text, gaining a subtle gold fill on hover.
- **Cards:** Cards are the primary vessel for project portfolios. They feature a 1px border, "bleed-to-edge" imagery at the top, and a technical label (Geist) at the bottom right indicating project status or square footage.
- **Input Fields:** Use a "minimalist blueprint" style—labels are always visible above the field in uppercase Geist. The active state is indicated by a 2px Construction Gold bottom-border.
- **Progress Indicators:** For project timelines, use a linear track in Muted Slate with a Construction Gold fill.
- **Project Overlays:** Use high-quality 3D renders or architectural photos as full-bleed backgrounds for specific "Vision" sections, overlaying them with semi-transparent Slate Blue panels for text readability.
- **Architectural Patterns:** Incorporate a subtle "grid paper" or "dot matrix" background pattern (low opacity) in sections containing heavy data or technical specs.