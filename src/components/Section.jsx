import { forwardRef } from "react";
import Container from "@/components/layout/Container.jsx";

const Section = forwardRef(function Section(
  { id, borderTop = false, className = "", containerClassName = "", children },
  ref
) {
  return (
    <section
      ref={ref}
      id={id}
      className={`relative ${borderTop ? "border-t border-border" : ""} section-shell ${className}`.trim()}
    >
      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  );
});

export default Section;
