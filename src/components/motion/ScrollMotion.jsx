import { useMemo } from "react";
import { motion } from "framer-motion";
import { useScrollMotion } from "@/hooks/useScrollMotion";

export default function ScrollMotion({
  children,
  yRange,
  opacityRange,
  opacityInputRange,
  scaleRange,
  rotateXRange,
  rotateYRange,
  offset,
  targetRef,
  useOpacity = true,
  className = "",
}) {
  const { ref, y, opacity, scale, rotateX, rotateY } = useScrollMotion({
    yRange,
    opacityRange,
    opacityInputRange,
    scaleRange,
    rotateXRange,
    rotateYRange,
    offset,
    targetRef,
    useOpacity,
  });

  const style = useMemo(
    () => ({
      y,
      ...(opacity && { opacity }),
      ...(scale && { scale }),
      ...(rotateX && { rotateX }),
      ...(rotateY && { rotateY }),
    }),
    [y, opacity, scale, rotateX, rotateY]
  );

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  );
}
