import { motion } from "framer-motion";
import { Calendar, Clock, Heart, MapPin } from "lucide-react";
import { wedding } from "../data/wedding";

// Measured across MANY scan lines through the frame's transparent
// aperture (not just one lucky center line) — a conservative box that
// stays clear of the corner floral sprays at every row/column within
// it. Keep in sync with /public/florals/frame-blossom.png if that
// file changes.
const APERTURE = { left: "15%", top: "25%", width: "71%", height: "45%" };

// The card's max width only ever matters on wide screens — on mobile
// it's the `vw` value below (plus the section's own padding) that
// actually governs the rendered size. Both were tightened here
// (95vw + px-2 instead of 92vw + px-6) specifically to claw back a bit
// more real pixel width/height for the text on phones, since the
// aperture is a fixed 55%/49% of the card regardless of the card's
// pixel size — the ceiling here is the phone screen itself, not this
// value.
const CARD_MAX_WIDTH = "643px";

// Taller than the frame image's native 800:1200 (2:3) — the <img>
// below fills this box exactly (no object-fit), so it stretches
// vertically to match, trading a small amount of vertical stretch on
// the floral art for real extra height in the aperture (which scales
// with it, since it's positioned in percentages of this same box).
const CARD_ASPECT_RATIO = "962 / 1500";

function HeartDivider() {
  return (
    <div className="flex items-center gap-[2.6cqw] text-gold-dim">
      <span className="h-px w-[10cqw] bg-gold-dim opacity-60" />
      <Heart className="h-[4.4cqw] w-[4.4cqw]" fill="currentColor" strokeWidth={0} />
      <span className="h-px w-[10cqw] bg-gold-dim opacity-60" />
    </div>
  );
}

function DetailStat({ icon: Icon, lines }) {
  return (
    <div className="flex flex-col items-center gap-[0.9cqw] px-[0.9cqw]">
      <Icon className="h-[6.6cqw] w-[6.6cqw] text-gold" strokeWidth={1.5} />
      {lines.map((line) => (
        <p key={line} className="font-serif text-[4.9cqw] leading-[1.3] text-ink">
          {line}
        </p>
      ))}
    </div>
  );
}

/**
 * Scene 3 — the invitation itself. A commissioned watercolor floral
 * frame (public/florals/frame-blossom.png) with the full invitation copy
 * set inside its transparent center, plus a thin gold rule bordering
 * the text area itself (distinct from the floral frame around it).
 * Every size/gap here is tuned tight on purpose to fit the fuller
 * copy without touching the florals; verified against real renders,
 * not just guessed.
 */
export function InvitationCard() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-paper px-2 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[95vw]"
        style={{ aspectRatio: CARD_ASPECT_RATIO, maxWidth: CARD_MAX_WIDTH }}
      >
        <img
          src="/florals/frame-blossom.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full select-none"
        />

        <div
          className="absolute flex items-center justify-center @container"
          style={APERTURE}
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-[2cqw] px-[2cqw] py-[1cqw] text-center">
            <span className="font-tech text-[5.6cqw] uppercase tracking-[0.3em] text-gold-dim">
              You&rsquo;re Invited
            </span>
            <p className="font-serif text-[6.2cqw] italic text-ink-dim">
              to celebrate
            </p>

            <p className="font-heading text-[14cqw] leading-[0.95] text-wax">
              {wedding.groomName} &amp; {wedding.brideName}
            </p>

            <HeartDivider />

            <p className="max-w-[94%] font-serif text-[5.2cqw] leading-[1.4] text-ink">
              Join us for a special evening filled with love, laughter, and
              great company.
            </p>

            <div className="grid w-full grid-cols-3 divide-x divide-gold-dim/30">
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

            <p className="max-w-[90%] font-serif text-[5.6cqw] italic leading-[1.4] text-ink-dim">
              We would be so happy to have you with us.
            </p>

            <HeartDivider />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
