import { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useCountdown } from "../hooks/useCountdown";
import { WEDDING_DATE, WEDDING_DAY, WEDDING_YEAR, wedding } from "../data/wedding";
import { BotanicalSprig } from "./BotanicalCorner";

const WEEKDAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

// Built from WEDDING_DATE alone — change the year/month in
// data/wedding.js and the grid, the weekday alignment, and the
// highlighted day all stay correct automatically.
function buildCalendarWeeks(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Mon=0 .. Sun=6

  const cells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function toIcsStamp(date) {
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `T${pad(date.getHours())}${pad(date.getMinutes())}00`
  );
}

// No explicit ceremony length is configured anywhere, so a 4-hour
// block (ceremony + reception) is assumed here as a reasonable
// default for the calendar entry.
const ICS_DURATION_HOURS = 4;

function buildIcsDataUrl() {
  const end = new Date(WEDDING_DATE.getTime() + ICS_DURATION_HOURS * 60 * 60 * 1000);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sealed With Love//Omar & Aya Wedding//EN",
    "BEGIN:VEVENT",
    `UID:omar-aya-wedding-${WEDDING_YEAR}@sealedwithlove`,
    `DTSTAMP:${toIcsStamp(new Date())}`,
    `DTSTART:${toIcsStamp(WEDDING_DATE)}`,
    `DTEND:${toIcsStamp(end)}`,
    `SUMMARY:${wedding.groomName} & ${wedding.brideName}'s Wedding`,
    `LOCATION:${wedding.venueTransliteration}`,
    "DESCRIPTION:We would be so happy to have you with us.",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

function CountdownDisplay({ time }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="whitespace-nowrap font-serif text-[clamp(16px,4.5vw,22px)] text-gold-dim"
    >
      {time.days} days {time.hours} hours {time.minutes} min {time.seconds} sec
    </motion.p>
  );
}

function CalendarHeader() {
  const monthLabel = WEDDING_DATE.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  return (
    <div className="flex flex-col items-center gap-3 pb-4">
      <span className="font-serif text-[clamp(20px,5vw,27px)] italic text-wax">
        {monthLabel}
      </span>
      <span className="h-px w-16 bg-gold-dim/50" />
    </div>
  );
}

function WeekdayHeader() {
  return (
    <div className="grid grid-cols-7">
      {WEEKDAY_LABELS.map((day) => (
        <span
          key={day}
          className="text-center font-tech text-[10px] uppercase tracking-[0.15em] text-ink-dim/60"
        >
          {day}
        </span>
      ))}
    </div>
  );
}

function WeddingDayHeart({ label }) {
  return (
    <div className="relative flex items-center justify-center" role="img" aria-label={label}>
      <Heart
        className="h-[clamp(24px,7vw,30px)] w-[clamp(24px,7vw,30px)] text-wax"
        fill="currentColor"
        strokeWidth={0}
      />
      <span className="absolute font-serif text-[clamp(11px,3vw,14px)] font-medium text-paper">
        {WEDDING_DAY}
      </span>
    </div>
  );
}

function CalendarGrid({ weeks, weddingDayLabel }) {
  return (
    <div className="flex flex-col gap-[clamp(4px,1.5vw,8px)]">
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7">
          {week.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className="flex h-[clamp(28px,8vw,36px)] items-center justify-center"
            >
              {day === WEDDING_DAY ? (
                <WeddingDayHeart label={weddingDayLabel} />
              ) : day ? (
                <span className="font-serif text-[clamp(13px,3.5vw,16px)] text-ink">
                  {day}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function MiniCalendar({ weeks, weddingDayLabel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
      className="w-[min(90vw,420px)] rounded-2xl border border-gold-dim/30 bg-paper-dim px-6 py-6 shadow-[0_14px_35px_-15px_rgba(43,36,28,0.3)] sm:px-8 sm:py-7"
    >
      <CalendarHeader />
      <WeekdayHeader />
      <CalendarGrid weeks={weeks} weddingDayLabel={weddingDayLabel} />
    </motion.div>
  );
}

function AddToCalendarLink({ href }) {
  return (
    <motion.a
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      href={href}
      download="omar-and-aya-wedding.ics"
      className="font-tech text-xs uppercase tracking-[0.3em] text-gold-dim underline decoration-gold-dim/50 underline-offset-4 transition-all duration-300 hover:text-wax hover:decoration-wax/60 hover:underline-offset-[6px]"
    >
      Add to Calendar
    </motion.a>
  );
}

/**
 * Scene 4 — a small stamped postmark label, an elegant single-line
 * countdown, and a compact calendar card with the wedding day held
 * inside a heart. Everything (the countdown target, the calendar's
 * month/year, the highlighted day, and the .ics event) derives from
 * the one WEDDING_DATE constant in data/wedding.js.
 */
export function Countdown() {
  const time = useCountdown(WEDDING_DATE);
  const weeks = useMemo(() => buildCalendarWeeks(WEDDING_DATE), []);
  const icsUrl = useMemo(() => buildIcsDataUrl(), []);
  const weddingDayLabel = `Wedding day, ${WEDDING_DATE.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}`;

  return (
    <section className="relative flex min-h-[55vh] flex-col items-center justify-center bg-paper px-6 py-16 sm:min-h-[60vh]">
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8 md:max-w-lg">
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
          <div className="mt-2 flex items-center gap-3">
            <BotanicalSprig className="h-9 w-32 -scale-x-100 opacity-85" />
            <BotanicalSprig className="h-9 w-32 rotate-180 opacity-85" />
          </div>
        </motion.div>

        <CountdownDisplay time={time} />
        <MiniCalendar weeks={weeks} weddingDayLabel={weddingDayLabel} />
        <AddToCalendarLink href={icsUrl} />
      </div>
    </section>
  );
}
