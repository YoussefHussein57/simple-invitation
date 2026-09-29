import { motion } from "framer-motion";
import {
  keepsakeGroomImage,
  keepsakeBrideImage,
  keepsakeLabel,
  wedding,
} from "../data/wedding";

/**
 * Scene 6 — the illustrated keepsake. Omar proposing and Aya saying
 * yes, tucked into the letter as one small moment — no photo-card
 * framing, no background of their own; the artwork's backgrounds have
 * been cut to true transparency so they simply rest on the page like
 * the rest of the site's illustration work, just given a soft
 * grounding shadow and a slight independent tilt.
 */
export function Keepsake() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-paper px-6 py-24">
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8 md:max-w-lg lg:max-w-xl">
        <div className="relative flex w-full items-end justify-center">
          <motion.img
            src={keepsakeGroomImage}
            alt={`${wedding.groomName} proposing`}
            initial={{ opacity: 0, y: 20, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -7 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 -mr-6 w-[52%] max-w-[210px] object-contain sm:-mr-8"
            style={{ filter: "drop-shadow(0 16px 18px rgba(43,36,28,0.28))" }}
          />

          <motion.img
            src={keepsakeBrideImage}
            alt={`${wedding.brideName} saying yes`}
            initial={{ opacity: 0, y: 20, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 6 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="relative z-20 w-[52%] max-w-[210px] object-contain"
            style={{ filter: "drop-shadow(0 16px 18px rgba(43,36,28,0.28))" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <span className="font-tech text-[10px] uppercase tracking-[0.3em] text-gold-dim">
            {keepsakeLabel}
          </span>
          <span className="font-heading text-3xl text-wax">
            {wedding.groomName} × {wedding.brideName}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
