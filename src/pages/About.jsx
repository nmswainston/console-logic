import { Helmet } from "react-helmet-async";
import Section from "../components/Section";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — Console Logic</title>
        <meta
          name="description"
          content="Console Logic is a small studio focused on clean UX and clean code."
        />
        <link rel="canonical" href="https://console-logic.dev/about" />
      </Helmet>
      <Section>
        <h1 className="font-display text-3xl">About</h1>
        <p className="mt-3 max-w-prose text-muted-foreground">
          Console Logic is a small studio focused on clean UX and clean code.
          We ship pragmatic web apps and automations with a focus on speed,
          clarity, and maintainability.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          <li className="card">
            <h3 className="card-title">What we do</h3>
            <p className="card-text">UI engineering, APIs, and thoughtful automation.</p>
          </li>
          <li className="card">
            <h3 className="card-title">Stack</h3>
            <p className="card-text">React, Node, Tailwind, and friendly tooling.</p>
          </li>
        </ul>
      </Section>
    </>
  );
}


