import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import TypingText from "@/components/terminal/TypingText.jsx";
import { TYPING_SPEED_MS, TYPING_LINE_DELAY_MS } from "@/data/constants";

export default function TypingSequence({
  lines = [],
  speed = TYPING_SPEED_MS,
  lineDelay = TYPING_LINE_DELAY_MS,
  className = "",
  onComplete,
}) {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);

  // With reduced motion, content shows immediately; signal complete after a brief delay
  useEffect(() => {
    if (reduce && lines.length > 0) {
      const t = setTimeout(() => onComplete?.(), 100);
      return () => clearTimeout(t);
    }
  }, [reduce, lines.length, onComplete]);

  return (
    <div className={`space-y-1 font-mono text-sm text-terminal-green leading-normal ${className}`}>
      {lines.map((line, i) => {
        const isActive = i === current;
        const isDone = i < current;
        const isSegments = Array.isArray(line);

        return (
          <div key={i} className="flex items-center">
            <TypingText
              text={isSegments ? undefined : line}
              segments={isSegments ? line : undefined}
              speed={speed}
              delay={isActive ? lineDelay : 0}
              active={isActive}
              done={isDone}
              onComplete={() => {
                if (isActive && i < lines.length - 1) {
                  setCurrent(i + 1);
                } else if (isActive && i === lines.length - 1) {
                  onComplete?.();
                }
              }}
            />

            {isActive && !reduce && (
              <span className="ml-1 inline-block w-[0.6em] h-[1em] bg-terminal-green cursor-blink" aria-hidden="true" />
            )}
          </div>
        );
      })}
    </div>
  );
}
