import { motion, useReducedMotion } from "framer-motion";
import Container from "./Container";

export default function Section({
  id,
  borderTop = false,
  className = "",
  containerClassName = "",
  children,
}) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.section
      id={id}
      className={`${borderTop ? "border-t border-neutral-900/60" : ""} py-20 sm:py-24 ${className}`.trim()}
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Container className={containerClassName}>{children}</Container>
    </motion.section>
  );
}
