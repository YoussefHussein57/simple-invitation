import { motion } from "framer-motion";
import { coupleImage, keepsakeLabel, wedding } from "../data/wedding";
import { BotanicalSprig } from "./BotanicalCorner";

/**
 * Scene 6 — the illustrated keepsake. A single portrait of Omar and
 * Aya together, tucked into the letter as one small moment — no
 * photo-card framing, no background of its own; the artwork's
 * background has been cut to true transparency so it simply rests on
 * the page like the rest of the site's illustration work, just given
 * a soft grounding shadow.
 */
export function Keepsake() {
  return (
    <section className="relative flex min-h-[55vh] flex-col items-center justify-center bg-paper px-6 py-16 sm:min-h-[60vh]">
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8 md:max-w-lg lg:max-w-xl">
        <motion.img
          src={coupleImage}
          alt={`${wedding.groomName} and ${wedding.brideName}`}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="w-[74%] max-w-[340px] object-contain"
          style={{ filter: "drop-shadow(0 20px 22px rgba(43,36,28,0.28))" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <span className="font-tech text-xs uppercase tracking-[0.3em] text-gold-dim">
            {keepsakeLabel}
          </span>
          <span className="font-heading text-4xl text-wax">
            {wedding.groomName} × {wedding.brideName}
          </span>
          <div className="mt-1 flex items-center gap-3">
            <BotanicalSprig className="h-9 w-32 -scale-x-100 opacity-85" />
            <BotanicalSprig className="h-9 w-32 rotate-180 opacity-85" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
