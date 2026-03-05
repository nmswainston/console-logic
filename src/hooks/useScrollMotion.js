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
  const opacityTransform = useTransform(
    scrollYProgress,
    opacityInputRange,
    useOpacity ? opacityRange : [0, 0],
    OPACITY_CLAMP
  );
  const scaleTransform = useTransform(
    scrollYProgress,
    [0, 1],
    scaleRange ?? [1, 1]
  );
  const rotateXTransform = useTransform(
    scrollYProgress,
    [0, 1],
    rotateXRange ?? [0, 0]
  );
  const rotateYTransform = useTransform(
    scrollYProgress,
    [0, 1],
    rotateYRange ?? [0, 0]
  );

  const opacity = useOpacity ? opacityTransform : null;
  const scale = scaleRange ? scaleTransform : null;
  const rotateX = rotateXRange ? rotateXTransform : null;
  const rotateY = rotateYRange ? rotateYTransform : null;

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
