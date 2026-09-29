// ============================================================
// SEALED WITH LOVE — central configuration
// Edit this file to update names, dates, venue, and links.
// ============================================================

// The wedding day/month are fixed per the invite ("31 / 10").
// Set the correct YEAR here — it is the single source of truth
// used by the countdown and by every date display in the app.
export const WEDDING_YEAR = 2026;
export const WEDDING_MONTH = 10; // October (1-indexed)
export const WEDDING_DAY = 31;
export const WEDDING_HOUR = 19; // 24h clock — ceremony start time, adjust as needed
export const WEDDING_MINUTE = 0;

export const WEDDING_DATE = new Date(
  WEDDING_YEAR,
  WEDDING_MONTH - 1,
  WEDDING_DAY,
  WEDDING_HOUR,
  WEDDING_MINUTE,
  0
);

// Replace this with a real, verified Google Maps share link for the venue.
// e.g. from Google Maps: Share -> Copy link
export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=%D8%AF%D8%A7%D8%B1%20%D8%B6%D8%A8%D8%A7%D8%B7%20%D8%A7%D9%84%D9%85%D8%AF%D9%81%D8%B9%D9%8A%D8%A9";

export const wedding = {
  groomName: "Omar",
  brideName: "Aya",
  date: "31 / 10",
  dateFull: `31 / 10 / ${WEDDING_YEAR}`,
  venue: "دار ضباط المدفعية",
  venueTransliteration: "Artillery Officers House",
  mapsUrl: GOOGLE_MAPS_URL,
  monogram: "O & A",
};

// ------------------------------------------------------------
// KEEPSAKE ART — the illustrated proposal/acceptance portraits,
// shared with Concept3. Presented here as a little keepsake
// tucked inside the letter, not a photo card. Swap the files in
// /public/photos to update.
// ------------------------------------------------------------
export const keepsakeGroomImage = "/photos/omar-proposal.png";
export const keepsakeBrideImage = "/photos/aya-accept.png";
export const keepsakeLabel = "A KEEPSAKE FROM THE DAY HE ASKED";
