# Credit Partner Pro — Magazine Editorial Landing Page

Single landing page at `/` built from the uploaded brief. All visible text in English (provided copy); code comments in Spanish. Every CTA opens `https://calendly.com/creditpartnerpr0/appointment` in a new tab.

## Brand
- Logo: uploaded full logo (navbar + footer); uploaded SVG icon as favicon.
- Colors: green #128160 (buttons/accents), navy #055475 (text, footer, final CTA), white / #F8F9FA alternating sections, #F0F0F0 step numbers.
- Fonts: Playfair Display (headings), Plus Jakarta Sans (body), loaded via Google Fonts.

## Sections
1. Sticky navbar: logo left, "Get Verified" button right; frosted blur appears after scrolling.
2. Hero (magazine cover): eyebrow "ISSUE NO. 01 • CREDIT PARTNERSHIPS", green-outlined badge, serif headline, subhead, hairline with "<<" before a large green CTA with arrow that slides on hover; framed portrait of a businessman in suit and glasses with offset frame and soft parallax.
3. The Asset: asymmetric editorial layout, documents photo with floating navy card "Access advances up to $2,500".
4. The Process: 3 columns, giant 01/02/03 behind each step (Initial Qualification, Quick Credit Verification (QCV), Strategic Matching) with short supporting copy.
5. Trust & Security: light background, lock / shield / certificate icons with staggered entrance.
6. Final CTA: navy background, white headline, green button, smiling professional woman in oval frame.
7. Footer: logo, small gray FTC disclaimer, Privacy Policy and Terms links.

Hairline dividers between sections, fade-up scroll reveal on all blocks, hover lift on cards and buttons; mobile-first stacking.

## Technical details
- Rewrite `src/routes/index.tsx` with section components in `src/components/landing/`; install `framer-motion` for reveal/parallax (`useScroll`/`useTransform`, `whileInView`).
- Design tokens in `src/styles.css` (oklch equivalents of brand hexes, font tokens).
- Logo PNG via lovable-assets pointer; favicon from SVG copied to `public/favicon.svg`, remove `favicon.ico`.
- Unsplash image URLs; route head() with title/description/og tags; hero image URL used as og:image.
- Privacy/Terms as `#` placeholders (no pages provided) and step descriptions/disclaimer text written by me — flagged for replacement.
