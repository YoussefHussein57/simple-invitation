import { motion } from "framer-motion";
import { wedding } from "../data/wedding";

/**
 * Scene 8 (final) — the letter folds back up. Mirrors EnvelopeIntro:
 * the background darkens back to --color-envelope as this section
 * scrolls into view, closing with a wax seal stamping the letter shut
 * for good. Nothing follows this in the document.
 */
export function FinalSeal() {
  return (
    <motion.section
      // Literal hex values, not var(--color-*) references — Framer
      // Motion can't resolve/interpolate a CSS variable reference as a
      // color, so it would snap instead of crossfading smoothly. Keep
      // these in sync with --color-paper / --color-envelope in index.css.
      initial={{ backgroundColor: "#f6efe0" }}
      whileInView={{ backgroundColor: "#14100c" }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8 text-center md:max-w-lg lg:max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col items-center gap-3"
        >
          <p className="font-serif text-3xl text-paper md:text-4xl">
            {wedding.groomName}
          </p>
          <span className="font-heading text-2xl text-gold-bright">&amp;</span>
          <p className="font-serif text-3xl text-paper md:text-4xl">
            {wedding.brideName}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-1.5"
        >
          <p className="font-serif text-xl tracking-[0.15em] text-gold-bright">
            {wedding.date}
          </p>
          <p className="font-serif text-base text-paper-dim" dir="rtl">
            {wedding.venue}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-1 pt-4"
        >
          <p className="font-serif text-base italic text-paper-dim">With love,</p>
          <p className="font-heading text-3xl text-paper">
            {wedding.groomName} &amp; {wedding.brideName}
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: 12 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
          className="mt-4 flex h-14 w-14 items-center justify-center rounded-full shadow-lg sm:h-16 sm:w-16"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, var(--color-wax-bright), var(--color-wax) 70%)",
          }}
        >
          <span className="font-serif text-base italic tracking-wide text-paper sm:text-lg">
            {wedding.monogram}
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}
