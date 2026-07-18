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

1. **Add real photos.** Create an `images/` folder and add photos from the
   client Dropbox folder:
   - `images/hero.jpg` — wide, high-quality renovation shot (referenced in `.hero`).
   - `images/mechanism.jpg` — wide project photo (referenced in `.mechanism__media`).
   - For the proof gallery, give each `<figure class="shot">` a real photo:
     add `class="shot has-photo"` and an inline
     `style="background-image:url('images/project-1.jpg');background-size:cover;background-position:center;"`.
   Placeholders are labelled blocks until real photos are added — the page
   still works without them.

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
