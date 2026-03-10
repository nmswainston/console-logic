import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import TypingText from "@/components/terminal/TypingText.jsx";
import LoaderLine from "@/components/terminal/LoaderLine.jsx";
import {
  TYPING_SPEED_MS,
  SECTION_LOADER_OFFSET,
  SECTION_LOADER_OFFSET_LAST,
} from "@/data/constants";

// Slow terminal pacing
const PROGRESS_INTERVAL_MS = 14; // ~1.4s to reach 100%
const PROGRESS_INCREMENT = 1;    // slow, readable
const VERIFY_DELAY = 250;        // pause before verifying
const LOADED_DELAY = 1750;       // blink time before "section loaded."
const REVEAL_DELAY = 200;        // pause before content reveal

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
  isLastSection = false,
  offset,
  waitForReady,
}) {
  const [isActive, setIsActive] = useState(false);
  const [displayPercent, setDisplayPercent] = useState(0);
  const [showVerify, setShowVerify] = useState(false);
  const [showLoaded, setShowLoaded] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  const resolvedOffset =
    offset ?? (isLastSection ? SECTION_LOADER_OFFSET_LAST : SECTION_LOADER_OFFSET);

  const { scrollYProgress } = useScroll({
    target: sectionRef ?? undefined,
    offset: resolvedOffset,
  });

  // Scroll triggers the loader (but loader itself is timed)
  // If waitForReady is set, don't start until it's true (e.g. after hero finishes)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const ready = waitForReady === undefined || waitForReady === true;
    if (!isActive && v > 0.15 && ready) setIsActive(true);
  });

  // When waitForReady becomes true, check if we should activate (user may have scrolled already)
  useEffect(() => {
    if (waitForReady && scrollYProgress.get() > 0.15) {
      setIsActive(true);
    }
  }, [waitForReady]);

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