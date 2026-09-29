import { motion } from "framer-motion";
import { wedding } from "../data/wedding";

/**
 * Scene 2 — the opening line of the letter. A breath after the envelope:
 * a short salutation, the two names, and a single closing line. Nothing
 * more — generous whitespace is the point.
 */
export function Greeting() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-paper px-6 py-24">
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8 text-center md:max-w-lg lg:max-w-xl">
        <FlourishRule />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-serif text-lg italic text-ink-dim md:text-xl"
        >
          Together with joyful hearts,
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="font-heading text-5xl leading-tight text-wax md:text-6xl"
        >
          {wedding.groomName} &amp; {wedding.brideName}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="font-serif text-lg text-ink md:text-xl"
        >
          request the honor of your presence at their wedding.
        </motion.p>

        <FlourishRule flip />
      </div>
    </section>
  );
}

function FlourishRule({ flip = false }) {
  return (
    <svg
      viewBox="0 0 200 24"
      className={`h-4 w-32 text-ink-dim opacity-60 md:w-40 ${
        flip ? "rotate-180" : ""
      }`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 12 C 50 2, 70 22, 100 12 S 150 2, 200 12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="100" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}
