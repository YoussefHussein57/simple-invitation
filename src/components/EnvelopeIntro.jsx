import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { wedding } from "../data/wedding";

const STAGE = { CLOSED: "closed", OPENING: "opening", REVEALED: "revealed" };

/**
 * Scene 1 — the whole concept in miniature. A sealed envelope sits in
 * the dark; the visitor taps it (or scrolls) to open it. The wax seal
 * cracks, the flap swings open (and — via backface-visibility — simply
 * stops rendering once it's rotated past perpendicular, which is what
 * lets the letter appear to pass "through" it without any real
 * clipping/masking trickery), and the letter rises out and settles as
 * the page's paper background. Everything after this section is the
 * letter's own pages.
 */
export function EnvelopeIntro() {
  const reducedMotion = useReducedMotion();
  const [stage, setStage] = useState(
    reducedMotion ? STAGE.REVEALED : STAGE.CLOSED
  );

  function open() {
    if (stage !== STAGE.CLOSED) return;
    setStage(STAGE.OPENING);
    window.setTimeout(() => setStage(STAGE.REVEALED), 1050);
  }

  useEffect(() => {
    if (reducedMotion) return undefined;
    const controller = new AbortController();
    const onScroll = () => open();
    window.addEventListener("wheel", onScroll, {
      once: true,
      passive: true,
      signal: controller.signal,
    });
    window.addEventListener("touchmove", onScroll, {
      once: true,
      passive: true,
      signal: controller.signal,
    });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isClosed = stage === STAGE.CLOSED;
  const isRevealed = stage === STAGE.REVEALED;

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 transition-colors duration-[1600ms] ease-in-out"
      style={{
        backgroundColor: isRevealed
          ? "var(--color-paper)"
          : "var(--color-envelope)",
      }}
    >
      <div className="bg-paper-grain pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[1600ms]" style={{ opacity: isRevealed ? 1 : 0 }} />

      <button
        type="button"
        onClick={open}
        aria-label="Open the envelope"
        disabled={!isClosed}
        className="relative flex flex-col items-center gap-6 disabled:cursor-default"
      >
        <div
          className="relative w-[78vw] max-w-[320px]"
          style={{ aspectRatio: "3 / 2", perspective: 1200 }}
        >
          {/* envelope body */}
          <motion.div
            className="absolute inset-0 rounded-sm shadow-2xl"
            style={{ backgroundColor: "var(--color-paper-dim)" }}
            animate={{ opacity: isRevealed ? 0 : 1 }}
            transition={{ duration: 0.9, delay: isRevealed ? 0.5 : 0 }}
          >
            <div
              className="absolute inset-x-0 bottom-0 h-1/2 opacity-[0.07]"
              style={{
                clipPath: "polygon(0 100%, 50% 34%, 100% 100%)",
                backgroundColor: "var(--color-ink)",
              }}
            />
          </motion.div>

          {/* flap — backface-visibility hides it once it's rotated past
              perpendicular, which is what sells the letter passing "through" */}
          <motion.div
            className="absolute inset-x-0 top-0 origin-top shadow-md"
            style={{
              height: "56%",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              backgroundColor: "var(--color-paper-shadow)",
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
            animate={{ rotateX: isClosed ? 0 : -175 }}
            transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
          />

          {/* wax seal */}
          <motion.div
            className="absolute left-1/2 top-[46%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg sm:h-14 sm:w-14"
            style={{
              background:
                "radial-gradient(circle at 32% 28%, var(--color-wax-bright), var(--color-wax) 70%)",
            }}
            animate={
              isClosed
                ? { scale: 1, opacity: 1, rotate: 0 }
                : { scale: [1, 1.18, 0], opacity: [1, 1, 0], rotate: [0, -6, -22] }
            }
            transition={{ duration: 0.5, ease: "easeIn" }}
          >
            <span className="font-serif text-base italic tracking-wide text-paper sm:text-lg">
              {wedding.monogram}
            </span>
          </motion.div>
        </div>

        {isClosed && (
          <motion.div
            animate={
              reducedMotion ? {} : { opacity: [0.45, 0.85, 0.45], y: [0, -3, 0] }
            }
            transition={
              reducedMotion
                ? {}
                : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            }
            className="flex flex-col items-center gap-2 text-paper-dim"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            <span className="font-tech text-[11px] uppercase tracking-[0.35em]">
              Tap To Open
            </span>
          </motion.div>
        )}
      </button>

      {/* letter — an independently-sized overlay (not scaled up from
          the small envelope box, which would overflow the viewport on
          mobile) that grows from a tiny point at the envelope's center
          up to its own properly capped size. */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 flex w-[82vw] max-w-xs flex-col items-center justify-center gap-3 rounded-sm px-6 py-10 text-center shadow-xl sm:max-w-sm"
        style={{
          x: "-50%",
          y: "-50%",
          backgroundColor: "var(--color-paper)",
          border: "1px solid var(--color-paper-shadow)",
        }}
        initial={{ scale: 0.12, opacity: 0 }}
        animate={
          isRevealed
            ? { scale: 1, opacity: 1 }
            : { scale: 0.12, opacity: 0 }
        }
        transition={{
          duration: 1.1,
          delay: isRevealed ? 0.35 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <p className="font-heading text-4xl leading-none text-wax sm:text-5xl">
          {wedding.groomName} &amp; {wedding.brideName}
        </p>
        <p className="font-tech text-[10px] uppercase tracking-[0.35em] text-gold-dim">
          You Are Warmly Invited
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 0.6 : 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-ink-dim"
      >
        <motion.div
          animate={reducedMotion ? {} : { y: [0, 8, 0] }}
          transition={
            reducedMotion
              ? {}
              : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <ChevronDown className="h-6 w-6" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
}
