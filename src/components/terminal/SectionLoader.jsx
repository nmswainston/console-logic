import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import TypingText from "@/components/terminal/TypingText.jsx";
import LoaderLine from "@/components/terminal/LoaderLine.jsx";
import { TYPING_SPEED_MS } from "@/data/constants";

// Snappy terminal pacing — total reveal time ~550ms after trigger
const PROGRESS_INTERVAL_MS = 4;  // reaches 100% in ~80ms
const PROGRESS_INCREMENT = 5;    // 20 steps to 100%
const VERIFY_DELAY = 80;         // pause before verifying
const LOADED_DELAY = 300;        // brief flash before content reveal
const REVEAL_DELAY = 80;         // pause before content reveal

// Trigger once the section top clears the bottom ~120px of the viewport
const IN_VIEW_MARGIN = "0px 0px -120px 0px";

// Hydration detector: false during SSG/hydration, true afterwards
const subscribeNoop = () => () => {};
const getTrue = () => true;
const getFalse = () => false;

// Hero-matched easing + stagger
const revealParent = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.1,
      staggerChildren: 0.06,
    },
  },
};

const revealChild = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function SectionLoader({
  label = "loading section",
  sectionRef,
  children,
}) {
  const reduce = useReducedMotion();
  const fallbackRef = useRef(null);
  const [displayPercent, setDisplayPercent] = useState(0);
  const [showVerify, setShowVerify] = useState(false);
  const [showLoaded, setShowLoaded] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  // Static HTML (SSG + hydration render) shows the real content so crawlers
  // and no-JS visitors see it; the loader takes over once hydration finishes.
  const hydrated = useSyncExternalStore(subscribeNoop, getTrue, getFalse);

  // IntersectionObserver trigger — latches on first entry, no scroll
  // subscription left running after the section reveals.
  const inView = useInView(sectionRef ?? fallbackRef, {
    once: true,
    margin: IN_VIEW_MARGIN,
  });

  const isActive = inView;

  // Timer-driven progress bar (slow terminal)
  useEffect(() => {
    if (!isActive) return;

    let p = 0;
    const interval = setInterval(() => {
      p += PROGRESS_INCREMENT;
      setDisplayPercent(Math.min(p, 100));
      if (p >= 100) clearInterval(interval);
    }, PROGRESS_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isActive]);

  // After 100%, show verifying → then loaded
  useEffect(() => {
    if (displayPercent < 100) return;

    const t1 = setTimeout(() => setShowVerify(true), VERIFY_DELAY);
    const t2 = setTimeout(() => setShowLoaded(true), LOADED_DELAY);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [displayPercent]);

  // After loaded, reveal content
  useEffect(() => {
    if (showLoaded) {
      const t = setTimeout(() => setHasRevealed(true), REVEAL_DELAY);
      return () => clearTimeout(t);
    }
  }, [showLoaded]);

  // Reduced motion: skip the loader theater entirely. Pre-hydration render
  // must match the server output, so it also shows the plain content.
  // Without a sectionRef the observer has no target, so degrade the same way.
  if (reduce || !hydrated || !sectionRef) {
    return <>{children}</>;
  }

  // Smooth staggered reveal (hero-matched)
  if (hasRevealed) {
    return (
      <motion.div variants={revealParent} initial="hidden" animate="visible">
        {Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div key={i} variants={revealChild}>
                {child}
              </motion.div>
            ))
          : <motion.div variants={revealChild}>{children}</motion.div>}
      </motion.div>
    );
  }

  return (
    <div className="font-mono text-sm text-terminal-green leading-normal">
      <TypingText text={`> ${label}...`} speed={TYPING_SPEED_MS} active />

      <div className="mt-1 flex items-center gap-2">
        <span className="text-terminal-green/80">[</span>
        <div className="h-[6px] min-w-[10rem] w-40 shrink-0 overflow-hidden rounded bg-elevated">
          <motion.div
            className="h-full bg-terminal-green"
            style={{ width: `${displayPercent}%` }}
          />
        </div>
        <span className="text-terminal-green/80">]</span>
        <span className="tabular-nums">{displayPercent}%</span>
      </div>

      {showVerify && <BlinkingVerify text="verifying integrity..." />}
      {showLoaded && <LoaderLine text="section loaded." />}
    </div>
  );
}

// Terminal-style blinking verify line
function BlinkingVerify({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0.4, 1, 0.4, 1],
      }}
      transition={{
        duration: 1.4,
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      }}
      className="font-mono text-terminal-green mt-1"
    >
      {text}
    </motion.div>
  );
}
