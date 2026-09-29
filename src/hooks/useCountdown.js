import { useEffect, useState } from "react";

function diff(target) {
  const now = new Date().getTime();
  const distance = target.getTime() - now;
  const clamped = Math.max(distance, 0);

  return {
    total: clamped,
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
    complete: distance <= 0,
  };
}

export function useCountdown(targetDate) {
  const [time, setTime] = useState(() => diff(targetDate));

  useEffect(() => {
    const interval = setInterval(() => setTime(diff(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return time;
}
