import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoaderLine from "@/components/terminal/LoaderLine.jsx";
import { OPACITY_TRANSITION } from "@/data/constants";

export default function BootSequence({ onComplete }) {
  const [showVerify, setShowVerify] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [scrollAway, setScrollAway] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowVerify(true), 900);     // pause before verifying
    const t2 = setTimeout(() => setShowComplete(true), 2000);  // after blinking
    const t3 = setTimeout(() => setScrollAway(true), 2400);    // scroll away + fade out
    const t4 = setTimeout(() => onComplete?.(), 2600);         // start hero typing
    const t5 = setTimeout(() => setHidden(true), 2700);       // unmount after fade (250ms transition)

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={scrollAway ? { y: -32, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={OPACITY_TRANSITION}
      className="font-mono text-[13px] sm:text-sm md:text-base text-terminal-green absolute top-4 sm:top-6 left-6 leading-normal pointer-events-none"
    >
      <div>{`> system booting...`}</div>

      {showVerify && <LoaderLine text="verifying integrity..." className="mt-1" />}

      {showComplete && <LoaderLine text="boot complete." className="mt-1" />}
    </motion.div>
  );
}