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
  ...props
}) {
  const reduce = useReducedMotion();
  const cn = `${variants[variant] || variants.primary} ${className}`.trim();

  if (href) {
    return (
      <motion.a
        href={href}
        className={cn}
        whileHover={reduce ? {} : { scale: 1.04 }}
        whileTap={reduce ? {} : { scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn}
      whileHover={reduce ? {} : { scale: 1.04 }}
      whileTap={reduce ? {} : { scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
