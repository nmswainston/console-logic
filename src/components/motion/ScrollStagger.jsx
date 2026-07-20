import { useMemo } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useScrollMotion } from "@/hooks/useScrollMotion";
import { STAGGER_CHILDREN } from "@/data/constants";

/** Container never gets opacity - only children (cards, blocks) do. */
const OPACITY_CLAMP = { clamp: true };

export default function ScrollStagger({
  children,
  stagger = STAGGER_CHILDREN,
  className = "",
  yRange,
  offset,
  targetRef,
  /** When true (e.g. inside SectionLoader), skip scroll-based opacity so content is visible when revealed */
  initiallyVisible = false,
}) {
  const reduce = useReducedMotion();
  const { ref, scrollYProgress, y } = useScrollMotion({
    yRange,
    offset,
    targetRef,
    useOpacity: false,
  });

  const childCount = Array.isArray(children) ? children.length : 1;

  const style = useMemo(() => ({ y }), [y]);

  return (
    <motion.div ref={ref} style={style} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <StaggerChild
              key={i}
              index={i}
              total={childCount}
              stagger={stagger}
              scrollYProgress={scrollYProgress}
              reduce={reduce}
              initiallyVisible={initiallyVisible}
            >
              {child}
            </StaggerChild>
          ))
        : children}
    </motion.div>
  );
}

function StaggerChild({ children, index, total, stagger, scrollYProgress, reduce, initiallyVisible }) {
  const staggerSpan = Math.min(0.2, Math.max(STAGGER_CHILDREN, stagger * total));
  const start = Math.min(0.5, index * stagger);
  const end = start + staggerSpan;
  const skipScrollEffects = reduce || initiallyVisible;
  const childOpacity = useTransform(
    scrollYProgress,
    [0, start, end, 1],
    skipScrollEffects ? [1, 1, 1, 1] : [0, 0, 1, 1],
    OPACITY_CLAMP
  );
  const childY = useTransform(
    scrollYProgress,
    [0, start, end, 1],
    skipScrollEffects ? [0, 0, 0, 0] : [16, 16, 0, 0]
  );

  const childStyle = useMemo(
    () => ({ opacity: childOpacity, y: childY }),
    [childOpacity, childY]
  );

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <motion.div style={childStyle}>
      {children}
    </motion.div>
  );
}
