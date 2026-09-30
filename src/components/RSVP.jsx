import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { wedding } from "../data/wedding";
import { BotanicalCorner } from "./BotanicalCorner";

const STORAGE_KEY = "sealed-with-love-rsvp";

function loadResponse() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Scene 7 — a real vintage reply card. Fill-in-the-blank name line,
 * a guest count, and two tickable choices standing in for a yes/no.
 * Persists to localStorage so a reload doesn't lose the response.
 */
export function RSVP() {
  const [response, setResponse] = useState(() => loadResponse());
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [attending, setAttending] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !attending) return;

    const entry = {
      name: name.trim(),
      guests: Math.max(1, Number(guests) || 1),
      attending,
      submittedAt: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
    } catch {
      // localStorage unavailable — still show the confirmation in-session
    }
    setResponse(entry);
  }

  const canSubmit = name.trim().length > 0 && attending !== null;

  return (
    <section className="relative flex min-h-[55vh] flex-col items-center justify-center bg-paper-grain bg-paper px-6 py-16 sm:min-h-[60vh]">
      <div className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative border-2 border-gold-dim/40 bg-paper px-7 py-10 shadow-[0_14px_35px_-15px_rgba(43,36,28,0.3)] sm:px-10 sm:py-12"
        >
          <BotanicalCorner className="pointer-events-none absolute -left-3 -top-3 h-24 w-24 opacity-90 sm:h-28 sm:w-28" />
          <BotanicalCorner
            flip
            className="pointer-events-none absolute -bottom-3 -right-3 h-24 w-24 opacity-90 sm:h-28 sm:w-28"
          />

          <AnimatePresence mode="wait">
            {response ? (
              <Confirmation key="confirmation" response={response} />
            ) : (
              <Form
                key="form"
                name={name}
                setName={setName}
                guests={guests}
                setGuests={setGuests}
                attending={attending}
                setAttending={setAttending}
                canSubmit={canSubmit}
                onSubmit={handleSubmit}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Form({
  name,
  setName,
  guests,
  setGuests,
  attending,
  setAttending,
  canSubmit,
  onSubmit,
}) {
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={onSubmit}
      className="flex flex-col gap-8"
    >
      <div className="flex flex-col items-center gap-1.5 text-center">
        <span className="font-tech text-xs uppercase tracking-[0.4em] text-gold-dim">
          Kindly Reply
        </span>
        <div className="mt-2 h-px w-12 bg-gold-dim opacity-50" />
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-tech text-xs uppercase tracking-[0.25em] text-ink-dim">
          Your Name
        </span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Write your name here"
          className="min-h-11 border-0 border-b border-ink-dim/40 bg-transparent px-1 py-2 font-serif text-lg text-ink placeholder:text-ink-dim/40 focus:border-wax focus:outline-none"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-tech text-xs uppercase tracking-[0.25em] text-ink-dim">
          Number Of Guests
        </span>
        <input
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="min-h-11 w-24 border-0 border-b border-ink-dim/40 bg-transparent px-1 py-2 font-serif text-lg text-ink focus:border-wax focus:outline-none"
        />
      </label>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 font-tech text-xs uppercase tracking-[0.25em] text-ink-dim">
          Attending?
        </legend>

        <RsvpChoice
          checked={attending === "yes"}
          onSelect={() => setAttending("yes")}
          label="Joyfully Accepts"
        />
        <RsvpChoice
          checked={attending === "no"}
          onSelect={() => setAttending("no")}
          label="Regretfully Declines"
        />
      </fieldset>

      <button
        type="submit"
        disabled={!canSubmit}
        className="min-h-11 bg-wax font-tech text-xs uppercase tracking-[0.3em] text-paper transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
      >
        Seal My Reply
      </button>
    </motion.form>
  );
}

function RsvpChoice({ checked, onSelect, label }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={checked}
      className="flex min-h-11 items-center gap-3 text-left"
    >
      <span
        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 transition-colors ${
          checked ? "border-wax bg-wax" : "border-ink-dim/50 bg-transparent"
        }`}
      >
        {checked && <Check className="h-4 w-4 text-paper" strokeWidth={3} />}
      </span>
      <span className="font-serif text-lg text-ink">{label}</span>
    </button>
  );
}

function Confirmation({ response }) {
  if (response.attending === "yes") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-5 text-center"
      >
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="flex h-20 w-20 items-center justify-center rounded-full shadow-lg"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, var(--color-wax-bright), var(--color-wax) 70%)",
          }}
        >
          <span className="font-tech text-[10px] uppercase tracking-[0.15em] text-paper">
            Confirmed
          </span>
        </motion.div>
        <p className="font-serif text-xl text-ink">
          With joy, {response.name}
        </p>
        <p className="max-w-xs font-serif text-base text-ink-dim">
          We can&rsquo;t wait to celebrate with you on {wedding.date}.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-4 text-center"
    >
      <p className="font-serif text-xl text-ink">Thank you for letting us know,</p>
      <p className="font-serif text-lg text-ink-dim">{response.name}.</p>
      <p className="max-w-xs font-serif text-base text-ink-dim">
        You will be missed on {wedding.date}.
      </p>
    </motion.div>
  );
}
