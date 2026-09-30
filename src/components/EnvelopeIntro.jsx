import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { wedding } from "../data/wedding";
import { BotanicalSprig } from "./BotanicalCorner";

const STAGE = {
  CLOSED: "closed",
  OPENING: "opening",
  WALKING: "walking",
  MEETING: "meeting",
  REVEALED: "revealed",
};

// Real walk-cycle frames (cropped + background-removed from a
// commissioned sprite sheet). 3 of the 5 available poses, evenly
// spaced across the stride, held for longer each.
const OMAR_FRAMES = [1, 3, 5].map((n) => `/photos/walk/omar-walk-${n}.png`);
const AYA_FRAMES = [1, 3, 5].map((n) => `/photos/walk/aya-walk-${n}.png`);
const COUPLE_TOGETHER = "/photos/walk/couple-together.png";

const WALK_DURATION_MS = 2600;
const MEET_HOLD_MS = 1300;
const FRAME_INTERVAL_MS = 420;

/**
 * Scene 1 — the whole concept in miniature. A sealed envelope sits in
 * the dark; the visitor taps it (or scrolls) to open it. The wax seal
 * cracks, the flap swings open, then Omar walks in from the left and
 * Aya from the right (a real walk-cycle, not just a slide), they meet
 * center-stage holding hands, and once they've settled the "You're
 * Invited" letter grows in. Everything after this section is the
 * letter's own pages.
 */
export function EnvelopeIntro() {
  const reducedMotion = useReducedMotion();
  const [stage, setStage] = useState(
    reducedMotion ? STAGE.REVEALED : STAGE.CLOSED
  );
  const [frameIndex, setFrameIndex] = useState(0);

  function open() {
    if (stage !== STAGE.CLOSED) return;
    setStage(STAGE.OPENING);
    if (reducedMotion) {
      window.setTimeout(() => setStage(STAGE.REVEALED), 300);
      return;
    }
    window.setTimeout(() => setStage(STAGE.WALKING), 1050);
    window.setTimeout(
      () => setStage(STAGE.MEETING),
      1050 + WALK_DURATION_MS
    );
    window.setTimeout(
      () => setStage(STAGE.REVEALED),
      1050 + WALK_DURATION_MS + MEET_HOLD_MS
    );
  }

  useEffect(() => {
    if (stage !== STAGE.WALKING) return undefined;
    setFrameIndex(0);
    // Plays the stride once (0 -> last frame) and holds there, rather
    // than wrapping back to frame 0 — looping mid-stride is what read
    // as a "glitch" (a visible snap back to the starting pose).
    const id = window.setInterval(() => {
      setFrameIndex((f) => {
        if (f >= OMAR_FRAMES.length - 1) {
          window.clearInterval(id);
          return f;
        }
        return f + 1;
      });
    }, FRAME_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [stage]);

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
  // The envelope graphic and the dark backdrop both fade away as soon
  // as the couple starts walking in, not only once the letter finally
  // appears — otherwise they'd be walking "through" a still-visible
  // envelope for two extra seconds.
  const isPastOpening = !isClosed && stage !== STAGE.OPENING;
  const isWalking = stage === STAGE.WALKING;
  const isMeeting = stage === STAGE.MEETING;

  return (
    <section
      className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 transition-colors duration-[1600ms] ease-in-out sm:min-h-[90vh]"
      style={{
        backgroundColor: isPastOpening
          ? "var(--color-paper)"
          : "var(--color-envelope)",
      }}
    >
      <div
        className="bg-paper-grain pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[1600ms]"
        style={{ opacity: isPastOpening ? 1 : 0 }}
      />

      <button
        type="button"
        onClick={open}
        aria-label="Open the envelope"
        disabled={!isClosed}
        className="relative flex flex-col items-center gap-6 disabled:cursor-default"
      >
        <div
          className="relative w-[82vw] max-w-[380px]"
          style={{ aspectRatio: "3 / 2", perspective: 1200 }}
        >
          {/* envelope body */}
          <motion.div
            className="absolute inset-0 rounded-sm shadow-2xl"
            style={{
              backgroundColor: "var(--color-paper-dim)",
              border: "1px solid var(--color-gold-dim)",
              boxShadow: "inset 0 0 0 4px var(--color-paper-dim), inset 0 0 0 5px rgba(184,147,90,0.55)",
            }}
            animate={{ opacity: isPastOpening ? 0 : 1 }}
            transition={{ duration: 0.35 }}
          >
            <div
              className="absolute inset-x-0 bottom-0 h-1/2 opacity-[0.07]"
              style={{
                clipPath: "polygon(0 100%, 50% 34%, 100% 100%)",
                backgroundColor: "var(--color-ink)",
              }}
            />
            <BotanicalSprig className="pointer-events-none absolute -left-3 -top-3 h-14 w-24 opacity-90" />
            <BotanicalSprig className="pointer-events-none absolute -bottom-3 -right-3 h-14 w-24 rotate-180 opacity-90" />
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

      {/* Omar walks in from the left, Aya from the right, cycling
          through real walk-cycle frames — then once they arrive they
          swap for a single "holding hands" pose. Centered on the same
          point the letter later grows from, so the couple arriving
          and the letter appearing read as one continuous moment
          instead of a jump between two different screen positions. */}
      {(isWalking || isMeeting) && (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 flex h-52 -translate-y-1/2 items-center justify-center sm:h-60">
          {/* both layers stay mounted the whole time and simply
              crossfade via opacity — no AnimatePresence key-swap, which
              turned out to get stuck mid-animation when the walk->meet
              transition landed on the same tick as other state updates.
              The walking layer fades out quickly and the together pose
              fades in with a short delay (rather than both crossfading
              over the same window) so the two poses never sit at
              similar opacity at once — that overlap was reading as a
              double-exposure "ghost" glitch at the handoff. */}
          <motion.div
            className="absolute inset-0 flex items-end justify-center gap-1"
            animate={{ opacity: isWalking ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={OMAR_FRAMES[frameIndex]}
              alt=""
              aria-hidden="true"
              initial={{ x: "-40vw" }}
              animate={{ x: 0 }}
              transition={{
                duration: WALK_DURATION_MS / 1000,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="h-48 w-auto sm:h-56"
              draggable={false}
            />
            <motion.img
              src={AYA_FRAMES[frameIndex]}
              alt=""
              aria-hidden="true"
              initial={{ x: "40vw" }}
              animate={{ x: 0 }}
              transition={{
                duration: WALK_DURATION_MS / 1000,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="h-44 w-auto sm:h-52"
              draggable={false}
            />
          </motion.div>

          <motion.img
            src={COUPLE_TOGETHER}
            alt={`${wedding.groomName} and ${wedding.brideName}`}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{
              opacity: isMeeting ? 1 : 0,
              scale: isMeeting ? 1 : 0.94,
            }}
            transition={{
              duration: 0.6,
              delay: isMeeting ? 0.25 : 0,
              ease: "easeOut",
            }}
            className="absolute h-52 w-auto sm:h-60"
            draggable={false}
          />
        </div>
      )}

      {/* letter — an independently-sized overlay (not scaled up from
          the small envelope box, which would overflow the viewport on
          mobile) that grows from a tiny point up to its own properly
          capped size, once Omar and Aya have met. Small branch accent,
          not the full frame — at this size (~230px) the big
          commissioned frame reads as too heavy/busy; a light sprig
          suits a card this small. */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 flex w-[86vw] max-w-sm flex-col items-center justify-center gap-3 px-8 py-12 text-center shadow-xl sm:max-w-md"
        style={{
          x: "-50%",
          y: "-50%",
          backgroundColor: "var(--color-paper)",
          border: "1px solid var(--color-gold-dim)",
        }}
        initial={{ scale: 0.12, opacity: 0 }}
        animate={
          isRevealed
            ? { scale: 1, opacity: 1 }
            : { scale: 0.12, opacity: 0 }
        }
        transition={{
          duration: 1.1,
          delay: isRevealed ? 0.2 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <BotanicalSprig className="pointer-events-none absolute -left-3 -top-3 h-14 w-24 opacity-90" />
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
        transition={{ duration: 1, delay: 1.4 }}
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
