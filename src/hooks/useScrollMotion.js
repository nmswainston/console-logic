import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { SCROLL_OFFSET, SCROLL_Y_RANGE } from "@/data/constants";

/** Opacity fades in only, never out. Use clamped [0, 0.15] -> [0, 1] by default. */
const OPACITY_CLAMP = { clamp: true };

export function useScrollMotion({
  offset = SCROLL_OFFSET,
  yRange = SCROLL_Y_RANGE,
  opacityRange = [0, 1],
  opacityInputRange = [0, 0.15],
  scaleRange = null,
  rotateXRange = null,
  rotateYRange = null,
  targetRef = null,
  /** Set false to skip opacity (e.g. for large containers). */
  useOpacity = true,
} = {}) {
  const ref = useRef(null);
  const scrollTarget = targetRef ?? ref;

  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset,
  });

  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const opacity = useOpacity
    ? useTransform(
        scrollYProgress,
        opacityInputRange,
        opacityRange,
        OPACITY_CLAMP
      )
    : null;
  const scale = scaleRange
    ? useTransform(scrollYProgress, [0, 1], scaleRange)
    : null;
  const rotateX = rotateXRange
    ? useTransform(scrollYProgress, [0, 1], rotateXRange)
    : null;
  const rotateY = rotateYRange
    ? useTransform(scrollYProgress, [0, 1], rotateYRange)
    : null;

  return {
    ref: targetRef ? null : ref,
    y,
    opacity,
    scale,
    rotateX,
    rotateY,
    scrollYProgress,
  };
}
