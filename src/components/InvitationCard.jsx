import { motion } from "framer-motion";
import { Calendar, Clock, Heart, MapPin } from "lucide-react";
import { wedding } from "../data/wedding";

// Measured across MANY scan lines through the frame's aperture (not
// just one lucky center line, which happened to pass through the
// widest bulge and made the earlier box asymmetric/left-skewed). This
// is a symmetric, conservative box that stays clear of the florals at
// every row within it. Keep in sync with
// /public/florals/frame-full.png if that file changes.
const APERTURE = { left: "22.5%", top: "27%", width: "55%", height: "49%" };

// The card's max width is a single fixed value (no sm:/md: growth) on
// purpose: text sizes below are tuned to fit this exact aperture size.
// A viewport-breakpoint text jump (sm:text-X) with a card that DOESN'T
// grow past ~380px regardless of viewport was the previous bug — text
// got bigger on desktop while the card/aperture stayed the same
// physical size, so it overflowed past the florals. Widening the card
// itself (rather than re-adding responsive text) keeps the two in sync
// at every screen size, since it's a plain vw-based value the whole
// way up.
const CARD_MAX_WIDTH = "460px";

function HeartDivider() {
  return (
    <div className="flex items-center gap-1.5 text-gold-dim">
      <span className="h-px w-5 bg-gold-dim opacity-60" />
      <Heart className="h-2 w-2" fill="currentColor" strokeWidth={0} />
      <span className="h-px w-5 bg-gold-dim opacity-60" />
    </div>
  );
}

function DetailStat({ icon: Icon, lines }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-0.5 px-0.5">
      <Icon className="h-2.5 w-2.5 text-gold" strokeWidth={1.5} />
      {lines.map((line) => (
        <p key={line} className="font-serif text-[8px] leading-tight text-ink">
          {line}
        </p>
      ))}
    </div>
  );
}

/**
 * Scene 3 — the invitation itself. A commissioned watercolor floral
 * frame (public/florals/frame-full.png) with the full invitation copy
 * set inside its transparent center, plus a thin gold rule bordering
 * the text area itself (distinct from the floral frame around it).
 * Every size/gap here is tuned tight on purpose to fit the fuller
 * copy without touching the florals; verified against real renders,
 * not just guessed.
 */
export function InvitationCard() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-paper px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[90vw]"
        style={{ aspectRatio: "900 / 1260", maxWidth: CARD_MAX_WIDTH }}
      >
        <img
          src="/florals/frame-full.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full select-none"
        />

        <div className="absolute flex items-center justify-center" style={APERTURE}>
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 px-4 py-3 text-center">
            <span className="font-tech text-[8px] uppercase tracking-[0.3em] text-gold-dim">
              You&rsquo;re Invited
            </span>
            <p className="-mt-1 font-serif text-[10px] italic text-ink-dim">
              to celebrate
            </p>

            <p className="font-heading text-2xl leading-none text-wax">
              {wedding.groomName} &amp; {wedding.brideName}
            </p>

            <HeartDivider />

            <p className="max-w-[92%] font-serif text-[9px] leading-snug text-ink">
              Join us for a special evening filled with love, good food, and
              great company.
            </p>

            <div className="flex w-full items-start divide-x divide-gold-dim/30 pt-1">
              <DetailStat
                icon={Calendar}
                lines={[wedding.dayLabel, wedding.dayMonthLabel]}
              />
              <DetailStat icon={Clock} lines={[wedding.timeLabel]} />
              <DetailStat
                icon={MapPin}
                lines={[wedding.venueTransliteration]}
              />
            </div>

            <p className="max-w-[88%] pt-1 font-serif text-[9px] italic leading-snug text-ink-dim">
              We would be so happy to have you with us.
            </p>

            <HeartDivider />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
