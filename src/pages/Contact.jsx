import { Helmet } from "react-helmet-async";
import Section from "@/components/Section.jsx";
import { useContactModal } from "@/context/ContactModalContext.jsx";

export default function Contact() {
  const { openModal } = useContactModal();

  return (
    <>
      <Helmet>
        <title>Contact — Console Logic</title>
        <meta
          name="description"
          content="Get in touch with Console Logic. Start a conversation about your project."
        />
        <link rel="canonical" href="https://console-logic.dev/contact" />
      </Helmet>
      <Section>
        <div className="max-w-prose">
          <h1 className="font-display text-4xl leading-snug">Let&apos;s talk</h1>
          <p className="mt-3 text-base text-muted-foreground leading-normal">
            Whether you need a new site, a cleaner frontend, or automation that
            quietly does its job, we focus on shipping useful things and keeping
            them easy to live with.
          </p>
          <button
            onClick={openModal}
            className="btn btn-primary mt-6"
          >
            Start a conversation
          </button>
        </div>
      </Section>
    </>
  );
}
