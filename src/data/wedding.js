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
  // Derived from WEDDING_DATE, not hardcoded, so changing the year
  // above keeps these correct automatically.
  dayLabel: WEDDING_DATE.toLocaleDateString("en-US", { weekday: "long" }),
  dayMonthLabel: WEDDING_DATE.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  }),
  timeLabel: WEDDING_DATE.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }),
  venue: "دار ضباط المدفعية",
  venueTransliteration: "Artillery Officers House",
  hallName: "El Malka Hall",
  hallNameArabic: "قاعة الملكة",
  mapsUrl: GOOGLE_MAPS_URL,
  monogram: "O & A",
};

// ------------------------------------------------------------
// KEEPSAKE ART — a single illustrated couple portrait, presented as
// a little keepsake tucked into the letter, not a photo card. Swap
// the file in /public/photos to update.
// ------------------------------------------------------------
export const coupleImage = "/photos/omar-aya-couple.png";
export const keepsakeLabel = "SOON, FOREVER BEGINS";
