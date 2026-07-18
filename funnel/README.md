# Kovacs Construction — Renovation Call Funnel

A two-page Google Ads funnel for cold homeowner traffic. Vanilla HTML/CSS/JS, no build step.

## Files
```
/funnel
  landing.html     Main landing page (hero → form → proof → FAQ → final CTA)
  thank-you.html   Post-submit confirmation ("we'll call you shortly")
  privacy.html     Privacy policy placeholder
  terms.html       Terms of service placeholder
  styles.css       All styling (mobile-first)
  script.js        UTM handling, sticky CTA, FAQ accordion, smooth scroll
  images/          Drop real project photos here (see below)
```

## Before going live — checklist

1. **Photos — currently embedded from Google Drive.** The hero, mechanism
   section and both galleries pull real project photos directly from the
   client's shared Google Drive folder via Google's image CDN
   (`https://drive.google.com/thumbnail?id=<FILE_ID>&sz=w####`). They render
   because the folder is shared "anyone with the link."

   **Recommended before scaling ad spend: self-host these files.** Drive is not
   a CDN — it can be slower and Google may rate-limit or change the endpoint.
   To self-host: download the originals, drop them in `images/`, and replace
   each `https://drive.google.com/thumbnail?...` URL in `landing.html` /
   `thank-you.html` with `images/<name>.jpg`. Resize to ~1600–2000px wide and
   compress to keep the page fast. The `.hero` / `.mechanism__media` rules in
   `styles.css` already point at `images/hero.jpg` / `images/mechanism.jpg` as
   the local fallback.

2. **Tracking codes.** Paste GTM / GA4 / Meta Pixel into the clearly-marked
   comments in the `<head>` and after `<body>` on **every** page. The
   booked-call conversion event goes only in the marked block on
   `thank-you.html` — never on `landing.html`.

3. **Form redirect + UTMs.** In the GoHighLevel form builder, set the
   post-submit redirect to `thank-you.html`. To pass UTMs into the CRM, add
   hidden fields to the form named: `utm_source`, `utm_medium`,
   `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `fbclid`, `ttclid`,
   `msclkid`. `script.js` appends captured values to the iframe URL and to the
   internal link to `thank-you.html`.

4. **Phone number.** Currently `07711 788515` (placeholder per brief). Update
   the `tel:` links and visible number if it changes.

## Notes
- Colours follow the Kovacs brand: charcoal `#1b1b1b`, warm bronze `#c29a5b`,
  soft off-white `#f5f1ea`.
- Proof figures used: 5.0 Houzz rating, 100+ projects, 35+ years' building
  experience, Best of Houzz. Confirm these before launch.
