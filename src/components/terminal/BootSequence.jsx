import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoaderLine from "@/components/terminal/LoaderLine.jsx";

export default function BootSequence({ onComplete }) {
  const [showBooting, setShowBooting] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [scrollAway, setScrollAway] = useState(false);

  useEffect(() => {
    setShowBooting(true);

    const t1 = setTimeout(() => setShowVerify(true), 900);     // pause before verifying
    const t2 = setTimeout(() => setShowComplete(true), 2000);  // after blinking
    const t3 = setTimeout(() => setScrollAway(true), 2400);    // scroll away
    const t4 = setTimeout(() => onComplete?.(), 2600);         // start hero typing

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={scrollAway ? { y: -32 } : { y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="font-mono text-sm text-terminal-green absolute top-4 sm:top-6 left-6 leading-normal"
    >
      {showBooting && (
        <div>{`> system booting...`}</div>
      )}

      {showVerify && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.4, 1, 0.4, 1] }}
          transition={{
            duration: 1.4,
            ease: "easeInOut",
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          }}
          className="mt-1"
        >
          verifying integrity...
        </motion.div>
      )}

      {showComplete && (
        <LoaderLine text="boot complete." />
      )}
    </motion.div>
  );
}