import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import {
  TERMINAL_DELAY_AFTER_COMPLETE,
  TERMINAL_VERIFY_DELAY,
  PROGRESS_TICK_MIN,
  PROGRESS_TICK_MAX,
} from "@/data/constants";

export function useTerminalLoader(active = true, onComplete) {
  const reduce = useReducedMotion();
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!active) return;

    if (reduce) {
      setPercent(100);
      setDone(true);
      setVerifying(true);
      setVerified(true);
      onComplete?.();
      return;
    }

    if (percent >= 100) {
      setDone(true);

      const verifyTimer = setTimeout(() => {
        setVerifying(true);

        const finishTimer = setTimeout(() => {
          setVerified(true);
          onComplete?.();
        }, TERMINAL_VERIFY_DELAY);

        return () => clearTimeout(finishTimer);
      }, TERMINAL_DELAY_AFTER_COMPLETE);

      return () => clearTimeout(verifyTimer);
    }

    const timeout = setTimeout(() => {
      const jump = Math.floor(Math.random() * 12) + 5;
      setPercent((p) => Math.min(100, p + jump));
    }, PROGRESS_TICK_MIN + Math.random() * (PROGRESS_TICK_MAX - PROGRESS_TICK_MIN));

    return () => clearTimeout(timeout);
  }, [active, percent, reduce, onComplete]);

  const totalBars = 20;
  const filledBars = Math.round((percent / 100) * totalBars);
  const progressBar = "█".repeat(filledBars) + "░".repeat(totalBars - filledBars);

  return { percent, done, verifying, verified, progressBar };
}
