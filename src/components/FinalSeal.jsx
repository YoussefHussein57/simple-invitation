import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";
import { wedding } from "../data/wedding";
import { BotanicalSprig } from "./BotanicalCorner";
import { useReducedMotion } from "../hooks/useReducedMotion";

// Scattered twinkling sparkles — a handful of small gold stars that
// gently pulse, like candlelight rather than a void. Positions are
// hand-placed to sit around the text, never on top of it.
const SPARKLES = [
  { top: "12%", left: "18%", size: 14, delay: 0 },
  { top: "20%", left: "82%", size: 10, delay: 0.6 },
  { top: "38%", left: "8%", size: 9, delay: 1.2 },
  { top: "45%", left: "90%", size: 13, delay: 0.3 },
  { top: "68%", left: "12%", size: 10, delay: 1.6 },
  { top: "74%", left: "86%", size: 9, delay: 0.9 },
  { top: "88%", left: "22%", size: 11, delay: 1.9 },
  { top: "90%", left: "76%", size: 12, delay: 0.4 },
];

function Sparkles({ reducedMotion }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-gold-bright"
          style={{ top: s.top, left: s.left }}
          initial={{ opacity: 0 }}
          animate={
            reducedMotion
              ? { opacity: 0.5 }
              : { opacity: [0, 0.9, 0.3, 0.9, 0] }
          }
          transition={
            reducedMotion
              ? { duration: 1 }
              : {
                  duration: 3.6,
                  delay: s.delay,
                  repeat: Infinity,
                  repeatDelay: 1.4,
                  ease: "easeInOut",
                }
          }
        >
          <Sparkle
            width={s.size}
            height={s.size}
            fill="currentColor"
            strokeWidth={0}
          />
        </motion.span>
      ))}
    </div>
  );
}

/**
 * Scene 8 (final) — the letter folds back up. Mirrors EnvelopeIntro:
 * the background settles from cream into a deep midnight blue (not a
 * flat void-black or brown) as this section scrolls into view — a
 * soft gold glow blooms behind the names and gentle gold sparkles
 * twinkle like stars in a night sky, so the closing note reads as
 * joyful rather than somber, before the wax seal stamps the letter
 * shut for good. Nothing follows this in the document.
 */
export function FinalSeal() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      // Literal hex values, not var(--color-*) references — Framer
      // Motion can't resolve/interpolate a CSS variable reference as a
      // color, so it would snap instead of crossfading smoothly.
      initial={{ backgroundColor: "#f6efe0" }}
      whileInView={{ backgroundColor: "#161d33" }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      {/* warm candlelit glow behind everything — a static gradient that
          just fades in, kept separate from the background-color
          crossfade above since Framer can't interpolate a gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.8, delay: 0.3 }}
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 45%, rgba(212,165,101,0.22), transparent 70%)",
        }}
      />

      <Sparkles reducedMotion={reducedMotion} />

      <div className="relative mx-auto flex w-full max-w-md flex-col items-center gap-8 text-center md:max-w-lg lg:max-w-xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="font-tech text-[11px] uppercase tracking-[0.4em] text-gold-bright"
        >
          Here&rsquo;s To Forever
        </motion.p>

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
          <div className="mb-1 flex items-center gap-3">
            <BotanicalSprig className="h-9 w-32 -scale-x-100 opacity-90" />
            <BotanicalSprig className="h-9 w-32 rotate-180 opacity-90" />
          </div>
          <p className="font-serif text-base italic text-paper-dim">
            With so much love,
          </p>
          <p className="font-heading text-3xl text-paper">
            {wedding.groomName} &amp; {wedding.brideName}
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: 12 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
          className="relative mt-4 flex h-14 w-14 items-center justify-center rounded-full shadow-lg sm:h-16 sm:w-16"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, var(--color-wax-bright), var(--color-wax) 70%)",
            boxShadow:
              "0 0 0 1px rgba(212,165,101,0.3), 0 8px 24px -6px rgba(212,165,101,0.35), 0 4px 14px rgba(0,0,0,0.4)",
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
