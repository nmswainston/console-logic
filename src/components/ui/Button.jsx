import { motion, useReducedMotion } from "framer-motion";

const variants = {
  primary: "btn btn-primary",
  ghost: "btn btn-ghost",
};

export default function Button({
  children,
  variant = "primary",
  onClick,
  href,
  className = "",
  as,
  ...props
}) {
  const reduce = useReducedMotion();
  const cn = `${variants[variant] || variants.primary} focus-ring ${className}`.trim();

  const Component = as === "a" || href ? motion.a : motion.button;

  return (
    <Component
      type={Component === motion.button ? "button" : undefined}
      onClick={onClick}
      href={href}
      className={cn}
      whileHover={reduce ? {} : { scale: 1.04 }}
      whileTap={reduce ? {} : { scale: 0.97 }}
      {...props}
    >
      {children}
    </Component>
  );
}
