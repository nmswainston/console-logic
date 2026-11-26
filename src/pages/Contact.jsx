import { Head } from "vite-react-ssg";
import Section from "@/components/Section.jsx";
import ContactForm from "@/components/ContactForm.jsx";
import { contact } from "@/data/contact";

const TITLE = "Start a project - console.log(ic)";
const DESCRIPTION =
  "Tell console.log(ic) about the website or web app you want to build.";
const URL = "https://consolelogic.net/contact";

/**
 * The contact form on a page of its own.
 *
 * Every "Start a project" and "Let's talk" link points here, so this is the
 * page a visitor reaches with JavaScript off, before the site has hydrated,
 * or from an ad. It is the same ContactForm the modal uses, so a sent message
 * records the same Umami event and the same Google Ads conversion.
 */
export default function Contact() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={URL} />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
      </Head>

      <Section>
        <div className="mx-auto max-w-xl">
          <p className="section-kicker">Contact</p>
          <h1 className="section-heading">Start a project</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Tell us what you want to build and what it needs to do, and
            we&apos;ll reply by email.
          </p>

          <div className="mt-8 rounded-lg border border-border bg-elevated p-6 shadow-md">
            <ContactForm />
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Prefer email? Write to{" "}
            <a
              href={`mailto:${contact.email}`}
              className="focus-ring text-accent underline underline-offset-4 hover:text-foreground"
            >
              {contact.email}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
