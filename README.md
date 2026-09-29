# SEALED WITH LOVE — Concept 4

A wedding invitation for Omar & Aya, styled as a piece of romantic
vintage stationery: cream/ivory paper, burgundy wax-seal red, antique
gold foil, and a handwritten script accent font. There is no 3D here —
deliberately, in contrast to Concept 3's Three.js ring — just plain CSS,
inline SVG, and Framer Motion scroll reveals. A visitor opens a sealed
envelope, reads the letter inside scene by scene, and watches it fold
back up and re-seal at the end.

## The experience, in order

1. **Envelope Intro** — a sealed envelope on a dark background; tap (or
   scroll) to crack the wax seal and open it. The letter rises out and
   the page crossfades to cream paper.
2. **Greeting** — the opening line of the letter: a short salutation and
   the couple's names.
3. **Invitation Card** — the invitation itself: names, date, venue,
   pressed onto a deckled cardstock card.
4. **Countdown** — four wax-stamped badges counting down to the wedding.
5. **Location** — a postcard-style scene with a line-art pin sketch and
   an "Open Location" button that opens Google Maps.
6. **Keepsake** — the couple's illustrated proposal/acceptance portraits,
   presented small, tilted, and tucked into the letter.
7. **RSVP** — a vintage reply card: fill-in name line, guest count, and
   "Joyfully Accepts" / "Regretfully Declines" tick choices.
8. **Final Seal** — the letter folds back up, the background darkens back
   to the envelope color, and a wax seal stamps it closed for good.

## Getting started

```bash
npm install
npm run dev       # local dev server with HMR
npm run build     # production build, output to dist/
npm run preview   # preview the production build locally
```

## Editing the wedding details

Everything content-related lives in one file: `src/data/wedding.js`.

- **Wedding year** — change `WEDDING_YEAR`. The day/month (`31/10`) are
  fixed to match the printed invite text; only the year needs updating
  per event. `WEDDING_DATE` is derived from `WEDDING_YEAR` +
  `WEDDING_MONTH` + `WEDDING_DAY` + `WEDDING_HOUR`/`WEDDING_MINUTE` and
  feeds the countdown directly.
- **Google Maps link** — set `GOOGLE_MAPS_URL` to a real "Share → Copy
  link" URL from Google Maps for the venue. The Location scene's "Open
  Location" button opens this URL directly in a new tab.
- **Names, venue text** — edit the `wedding` object in the same file
  (`groomName`, `brideName`, `venue`, `venueTransliteration`,
  `monogram`, etc). Every scene reads from this object — there are no
  other hardcoded names in the app.

## Swapping the keepsake images

Drop replacement illustrations in `public/photos/` using the existing
filenames:

- `public/photos/omar-proposal.png`
- `public/photos/aya-accept.png`

The Keepsake scene (`src/components/Keepsake.jsx`) references them via
`keepsakeGroomImage` / `keepsakeBrideImage` / `keepsakeLabel` in
`src/data/wedding.js` — swap the files in place and no code changes are
needed. Images with a near-black background work best: the scene applies
a soft radial mask so the dark background blends into the page rather
than reading as a hard-edged photo card.

## RSVP storage

The RSVP scene has no backend. On submit it writes a JSON object to
`localStorage` under the key `sealed-with-love-rsvp`:

```json
{ "name": "...", "guests": 1, "attending": "yes", "submittedAt": "..." }
```

On mount it checks for an existing entry under that key and shows the
confirmed/declined state instead of the empty form, so a page reload
doesn't lose the visitor's response. To reset it during testing, clear
that key from the browser's dev tools (Application → Local Storage).

## Design notes

- Every scene respects `prefers-reduced-motion` via the shared
  `useReducedMotion()` hook — scroll reveals fall back to simple opacity
  fades, and `EnvelopeIntro`'s looping "tap to open" hint stops animating.
- Scroll reveals use Framer Motion's `whileInView` throughout (not
  scroll-scrubbed GSAP, matching this concept's simpler brief) except for
  `FinalSeal`'s background color, which cross-fades from paper back to
  the dark envelope tone as the section enters view.
- All content columns are wrapped in a centered `max-w-md`/`md:max-w-lg`/
  `lg:max-w-xl` container so the mobile-first layout doesn't stretch
  edge-to-edge on wider viewports.
