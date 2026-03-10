import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { TYPING_SPEED_MS } from "@/data/constants";

export default function TypingText({
  text,
  segments,
  speed = TYPING_SPEED_MS,
  delay = 0,
  onComplete = () => {},
  className = "",
  active = false,
  done = false,
}) {
  const reduce = useReducedMotion();
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const fullText = segments
    ? segments.map((s) => (typeof s === "string" ? s : s.text)).join("")
    : text;

  const [displayed, setDisplayed] = useState(
    reduce || done ? fullText : active ? "" : ""
  );

  useEffect(() => {
    if (reduce) return;

    if (done) {
      setDisplayed(fullText);
      return;
    }

    if (!active) {
      setDisplayed("");
      return;
    }

    let interval;
    let index = 0;

    const start = () => {
      interval = setInterval(() => {
        index++;
        setDisplayed(fullText.slice(0, index));

        if (index === fullText.length) {
          clearInterval(interval);
          onCompleteRef.current();
        }
      }, speed);
    };

    const timer = setTimeout(start, delay);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [fullText, speed, delay, reduce, active, done]);

  function renderContent() {
    if (!segments) {
      return (
        <span className={`inline-block whitespace-nowrap font-mono text-terminal-green ${className}`}>
          {displayed}
        </span>
      );
    }
    let pos = 0;
    return (
      <span className={`inline-block whitespace-nowrap font-mono ${className}`}>
        {segments.map((seg, i) => {
          const segText = typeof seg === "string" ? seg : seg.text;
          const segClass = typeof seg === "string" ? "text-terminal-green" : (seg.className ?? "text-terminal-green");
          const end = pos + segText.length;
          const visible = displayed.length > pos ? displayed.slice(pos, Math.min(displayed.length, end)) : "";
          pos = end;
          return visible ? (
            <span key={i} className={segClass}>{visible}</span>
          ) : null;
        })}
      </span>
    );
  }

  return renderContent();
}
