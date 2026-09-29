import { motion } from "framer-motion";
import { useCountdown } from "../hooks/useCountdown";
import { WEDDING_DATE } from "../data/wedding";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

/**
 * Scene 4 — a small stamped postmark label above four wax-stamped
 * countdown badges, ticking down to the wedding date.
 */
export function Countdown() {
  const time = useCountdown(WEDDING_DATE);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-paper px-6 py-24">
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-10 md:max-w-lg lg:max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-tech text-xs uppercase tracking-[0.4em] text-gold-dim">
            Counting The Days
          </span>
          <span className="font-tech text-[11px] uppercase tracking-[0.3em] text-ink-dim">
            Until We Say Yes
          </span>
        </motion.div>

        <div className="grid w-full grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
          {UNITS.map((unit, i) => (
            <motion.div
              key={unit.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-wax shadow-md sm:h-24 sm:w-24"
                style={{
                  background:
                    "radial-gradient(circle at 32% 28%, #faf5e8, var(--color-paper-dim) 75%)",
                }}
              >
                <span className="font-serif text-2xl font-medium text-wax sm:text-3xl">
                  {String(time[unit.key]).padStart(2, "0")}
                </span>
              </div>
              <span className="font-tech text-[10px] uppercase tracking-[0.3em] text-ink-dim">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
