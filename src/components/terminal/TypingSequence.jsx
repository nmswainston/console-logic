import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import TypingText from "@/components/terminal/TypingText.jsx";
import { TYPING_SPEED_MS, TYPING_LINE_DELAY_MS } from "@/data/constants";

export default function TypingSequence({
  lines = [],
  speed = TYPING_SPEED_MS,
  lineDelay = TYPING_LINE_DELAY_MS,
  className = "",
}) {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);

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
                }
              }}
            />

            {isActive && !reduce && (
              <span
                className="ml-1 inline-block w-[0.6em] h-[1em] bg-terminal-green [animation:blink_1s_steps(2,_start)_infinite]"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
