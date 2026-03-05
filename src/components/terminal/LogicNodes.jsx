import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_SMOOTH } from "@/data/constants";

const NODE_TRANSITION = {
  duration: 3,
  repeat: Infinity,
  ease: EASE_SMOOTH,
};

export default function LogicNodes() {
  const reduce = useReducedMotion();

  const nodes = useMemo(
    () => [
      { top: "20%", left: "65%" },
      { top: "40%", left: "30%" },
      { top: "70%", left: "80%" },
      { top: "55%", left: "15%" },
    ],
    []
  );

  const animateProps = useMemo(
    () => (reduce ? {} : { opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }),
    [reduce]
  );

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ opacity: 1 }}
    >
      {nodes.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-terminal-green"
          style={pos}
          animate={animateProps}
          transition={{ ...NODE_TRANSITION, delay: i * 0.8 }}
        />
      ))}
    </motion.div>
  );
}
