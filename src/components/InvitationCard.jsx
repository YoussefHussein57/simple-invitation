import { motion } from "framer-motion";
import { wedding } from "../data/wedding";

/**
 * Scene 3 — the invitation itself. The single most important physical
 * object in the site: a pressed cardstock invitation sitting on the
 * page, deckled at the edges, holding the couple's names, the date,
 * and the venue.
 */
export function InvitationCard() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-paper-grain bg-paper px-6 py-24">
      <div className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="deckled-edge relative flex flex-col items-center gap-7 bg-paper px-8 py-14 text-center shadow-[0_18px_45px_-15px_rgba(43,36,28,0.35)] sm:px-12 sm:py-16"
          style={{ backgroundColor: "#faf5e8" }}
        >
          <span className="font-tech text-[11px] uppercase tracking-[0.4em] text-gold-dim">
            The Wedding Of
          </span>

          <div className="flex flex-col items-center gap-3">
            <p className="font-serif text-3xl font-medium tracking-wide text-ink sm:text-4xl">
              {wedding.groomName}
            </p>
            <span className="font-heading text-3xl text-wax">&amp;</span>
            <p className="font-serif text-3xl font-medium tracking-wide text-ink sm:text-4xl">
              {wedding.brideName}
            </p>
          </div>

          <div className="h-px w-16 bg-gold-dim opacity-50" />

          <p className="font-serif text-4xl tracking-[0.15em] text-wax sm:text-5xl">
            {wedding.date}
          </p>

          <div className="flex flex-col items-center gap-1.5 pt-2">
            <p className="font-serif text-xl text-ink sm:text-2xl" dir="rtl">
              {wedding.venue}
            </p>
            <p className="font-tech text-[11px] uppercase tracking-[0.3em] text-ink-dim">
              {wedding.venueTransliteration}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
