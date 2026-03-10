import { useRef } from "react";

import Section from "@/components/Section.jsx";
import SectionLoader from "@/components/terminal/SectionLoader.jsx";
import ScrollMotion from "@/components/motion/ScrollMotion.jsx";
import ScrollStagger from "@/components/motion/ScrollStagger.jsx";
import TerminalCard from "@/components/terminal/TerminalCard.jsx";

const trustItems = [
    {
        title: "Clear communication",
        text: "You'll always know what's being built, what comes next, and where things stand.",
    },
    {
        title: "Maintainable code",
        text: "Projects are structured to stay clean, readable, and easy to update after launch.",
    },
    {
        title: "Performance-first builds",
        text: "Fast-loading pages, responsive layouts, and thoughtful implementation from the start.",
    },
    {
        title: "Practical problem solving",
        text: "The goal is not extra complexity. It's the simplest solution that actually helps your business.",
    },
];

export default function TrustSection({ waitForReady }) {
    const trustRef = useRef(null);

    return (
        <Section id="trust" borderTop ref={trustRef}>
            <SectionLoader
                label="loading section: trust"
                sectionRef={trustRef}
                waitForReady={waitForReady}
            >
                <ScrollMotion className="section-header" useOpacity={false}>
                    <p className="section-kicker">Why clients hire Console Logic</p>

                    <h2 id="trust-heading" className="section-heading">
                        Built to be clear, fast, and maintainable.
                    </h2>

                    <p className="section-intro">
                        Good work is not just about launch day. It should be easy to understand,
                        easy to use, and easy to maintain long after it goes live.
                    </p>
                </ScrollMotion>

                <ScrollStagger
                    className="section-content section-grid-gap grid sm:grid-cols-2"
                    initiallyVisible
                >
                    {trustItems.map((item) => (
                        <TerminalCard key={item.title}>
                            <h3 className="card-title">{item.title}</h3>
                            <p className="card-text">{item.text}</p>
                        </TerminalCard>
                    ))}
                </ScrollStagger>
            </SectionLoader>
        </Section>
    );
}