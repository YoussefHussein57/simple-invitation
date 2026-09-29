import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MUTE_KEY = "sealed-with-love-audio-muted";
const TRACK_SRC = "/audio/enlivening.mp3";
const TARGET_VOLUME = 0.5;
const FADE_MS = 2400;

function fadeVolume(audio, to, ms) {
  const from = audio.volume;
  const start = performance.now();
  function step(now) {
    const t = Math.min(1, (now - start) / ms);
    audio.volume = from + (to - from) * t;
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/**
 * Background music — "Enlivening" by Pufino (freetouse.com), looped
 * softly under the whole letter. Starts on the visitor's first
 * scroll/tap/keypress (browsers block audible autoplay before a real
 * gesture) and can be muted anytime via the floating toggle;
 * preference persists in localStorage. Styled to sit comfortably over
 * both the dark envelope/seal scenes and the cream paper scenes.
 */
export function AmbientScore() {
  const audioRef = useRef(null);
  const startedRef = useRef(false);
  const mutedRef = useRef(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(() => {
    try {
      return window.localStorage.getItem(MUTE_KEY) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    const audio = new Audio(TRACK_SRC);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audioRef.current = audio;

    const controller = new AbortController();

    const begin = (event) => {
      if (startedRef.current || !audioRef.current) return;
      // Let the toggle button own its own click — otherwise a tap on
      // it both starts playback here AND toggles mute in onClick,
      // starting it muted on the very first tap.
      if (event?.target?.closest?.("[data-audio-toggle]")) return;
      startedRef.current = true;
      audioRef.current
        .play()
        .then(() => {
          if (!mutedRef.current) fadeVolume(audioRef.current, TARGET_VOLUME, FADE_MS);
        })
        .catch(() => {
          // Autoplay was blocked for some reason — the toggle button
          // still works as a manual fallback.
          startedRef.current = false;
        });
      setStarted(true);
      controller.abort();
    };

    const opts = { once: true, passive: true, signal: controller.signal };
    window.addEventListener("wheel", begin, opts);
    window.addEventListener("touchstart", begin, opts);
    window.addEventListener("pointerdown", begin, opts);
    window.addEventListener("keydown", begin, opts);

    return () => {
      controller.abort();
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!startedRef.current) {
      startedRef.current = true;
      audio
        .play()
        .then(() => fadeVolume(audio, TARGET_VOLUME, FADE_MS))
        .catch(() => {
          startedRef.current = false;
        });
      setStarted(true);
      return;
    }
    const next = !mutedRef.current;
    setMuted(next);
    try {
      window.localStorage.setItem(MUTE_KEY, next ? "1" : "0");
    } catch {
      // localStorage unavailable — preference just won't persist.
    }
    fadeVolume(audio, next ? 0 : TARGET_VOLUME, 500);
  }

  const showMuted = muted || !started;

  return (
    <button
      type="button"
      data-audio-toggle
      onClick={toggle}
      aria-label={showMuted ? "Play background music" : "Mute background music"}
      aria-pressed={!showMuted}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold-dim/50 bg-paper/85 text-wax shadow-md backdrop-blur-sm transition-colors hover:border-wax"
    >
      {showMuted ? (
        <VolumeX className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Volume2 className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
