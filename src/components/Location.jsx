import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { wedding } from "../data/wedding";

/**
 * Scene 5 — styled as a postcard. A small line-art pin-and-roads
 * sketch, the venue name, and a postage-stamp button that opens the
 * real map link.
 */
export function Location() {
  function openMap() {
    window.open(wedding.mapsUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-paper-grain bg-paper px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-md flex-col items-center gap-8 border border-gold-dim/40 bg-paper px-8 py-12 text-center shadow-[0_14px_35px_-15px_rgba(43,36,28,0.3)] md:max-w-lg lg:max-w-xl"
      >
        <span className="font-tech text-xs uppercase tracking-[0.4em] text-gold-dim">
          Destination
        </span>

        <MapSketch />

        <div className="flex flex-col items-center gap-1.5">
          <p className="font-serif text-2xl text-ink sm:text-3xl" dir="rtl">
            {wedding.venue}
          </p>
          <p className="font-tech text-[11px] uppercase tracking-[0.3em] text-ink-dim">
            {wedding.venueTransliteration}
          </p>
        </div>

        <button
          type="button"
          onClick={openMap}
          className="flex min-h-11 items-center gap-2 border-2 border-dashed border-gold-dim px-6 py-3 font-tech text-xs uppercase tracking-[0.3em] text-wax transition-colors hover:bg-paper-dim active:bg-paper-dim"
        >
          <MapPin className="h-4 w-4" aria-hidden="true" />
          Open Location
        </button>
      </motion.div>
    </section>
  );
}

function MapSketch() {
  return (
    <svg
      viewBox="0 0 120 100"
      className="h-24 w-28 text-ink-dim"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 80 C 30 60, 40 90, 65 70 S 100 50, 116 65"
        stroke="var(--color-gold-dim)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M10 30 C 35 45, 55 20, 80 35"
        stroke="var(--color-gold-dim)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M60 12 C 71 12 80 21 80 32 C 80 47 60 66 60 66 C 60 66 40 47 40 32 C 40 21 49 12 60 12 Z"
        stroke="var(--color-wax)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="60" cy="31" r="7" stroke="var(--color-wax)" strokeWidth="2" />
    </svg>
  );
}
