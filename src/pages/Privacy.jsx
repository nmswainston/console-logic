import { Head } from "vite-react-ssg";
import Section from "@/components/Section.jsx";
import { contact } from "@/data/contact";

const EFFECTIVE_DATE = "October 29, 2026";
const TITLE = "Privacy Policy - console.log(ic)";
const DESCRIPTION =
  "How ConsoleLogic LLC handles personal information on consolelogic.net and in its mobile apps on Google Play.";

/**
 * Marks text the site owner still has to fill in. Styled so a placeholder is
 * impossible to miss on screen. Search the codebase for "<Todo" before launch.
 */
function Todo({ children }) {
  return (
    <mark className="rounded border border-accent/50 bg-transparent px-1 font-mono text-sm text-accent">
      [{children}]
    </mark>
  );
}

function Block({ id, title, children }) {
  return (
    <section aria-labelledby={id} className="mt-10">
      <h2 id={id} className="font-display text-2xl leading-snug sm:text-3xl">
        {title}
      </h2>
      <div className="mt-3 space-y-4 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function List({ children }) {
  return <ul className="list-disc space-y-2 pl-6">{children}</ul>;
}

function MailLink() {
  return (
    <a
      href={`mailto:${contact.email}`}
      className="focus-ring text-accent underline underline-offset-4 hover:text-foreground"
    >
      {contact.email}
    </a>
  );
}

export default function Privacy() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://consolelogic.net/privacy" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content="https://consolelogic.net/privacy" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
      </Head>

      <Section>
        <article className="max-w-3xl">
          <p className="section-kicker">Legal</p>
          <h1 className="section-heading">Privacy Policy</h1>
          <p className="mt-4 font-mono text-sm text-muted-foreground">
            Effective date: {EFFECTIVE_DATE}
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            This policy explains what information we collect, why we collect it,
            and what you can do about it. It covers our website,
            consolelogic.net, and the mobile apps we publish on Google Play.
            We try to collect as little as we can.
          </p>

          <Block id="who" title="Who we are">
            <p>
              {contact.legalName} is a company based in {contact.location}. We
              operate under the brand name console.log(ic). In this policy,
              &quot;we&quot;, &quot;us&quot; and &quot;our&quot; mean{" "}
              {contact.legalName}.
            </p>
            <p>
              Questions about this policy or your information can go to{" "}
              <MailLink />.
            </p>
          </Block>

          <Block id="website" title="Our website (consolelogic.net)">
            <h3 className="font-display text-xl text-foreground">
              Information you send us
            </h3>
            <p>
              If you use the contact form, we receive the name, email address,
              subject and message you type in. We use them only to reply to you
              and to discuss the work you asked about. The form is handled by
              our hosting provider, Netlify, which stores submissions for us. If
              you email us directly, we receive your email address and whatever
              you write.
            </p>

            <h3 className="font-display text-xl text-foreground">
              Analytics
            </h3>
            <p>
              We use Umami, a privacy-focused analytics service, to understand
              which pages are visited and which links get clicked. It does not
              use cookies and does not build a profile of you across other
              sites. The data it records includes:
            </p>
            <List>
              <li>The pages you view and the site you came from (referrer).</li>
              <li>
                Your browser, operating system, device type, screen size and
                language.
              </li>
              <li>
                Your approximate location (country, region or city), worked out
                from your IP address. The IP address is used for that estimate
                and is not kept as part of the analytics data.
              </li>
              <li>
                A few interaction events, such as opening the contact form,
                sending it, or clicking a case study or &quot;See live
                site&quot; link (with the project name).
              </li>
            </List>
            <p>
              Analytics requests go through consolelogic.net rather than
              directly from your browser to a third-party domain. You can opt
              out in your current browser by visiting{" "}
              <a
                href="/?analytics=off"
                className="focus-ring text-accent underline underline-offset-4 hover:text-foreground"
              >
                consolelogic.net/?analytics=off
              </a>
              . That saves a small opt-out flag in your browser&apos;s local
              storage, which is the only thing we ever store on your device.
              Clearing your site data removes it.
            </p>

            <h3 className="font-display text-xl text-foreground">
              Hosting and server logs
            </h3>
            <p>
              The site is hosted by Netlify. Like most hosts, Netlify
              processes technical details such as your IP address, the page
              requested and your browser type to deliver the site and keep it
              secure.
            </p>

            <h3 className="font-display text-xl text-foreground">
              What we do not do
            </h3>
            <List>
              <li>We do not use advertising cookies or ad trackers.</li>
              <li>We do not sell your personal information.</li>
              <li>
                We do not load fonts, maps, videos or social widgets from other
                companies. Our fonts are served from our own site.
              </li>
            </List>
          </Block>

          <Block id="apps" title="Our mobile apps on Google Play">
            <p>
              This section applies to apps published by {contact.legalName} on
              Google Play. The details below are specific to each app.
            </p>
            <List>
              <li>
                Apps covered: <Todo>APP NAMES</Todo>
              </li>
              <li>
                Information the apps collect: <Todo>APP DATA COLLECTED</Todo>
              </li>
              <li>
                Why it is collected and how it is used:{" "}
                <Todo>HOW APP DATA IS USED</Todo>
              </li>
              <li>
                Device permissions the apps ask for and why:{" "}
                <Todo>APP PERMISSIONS</Todo>
              </li>
              <li>
                Services inside the apps that receive data (for example
                analytics, crash reporting, ads, sign-in, payments):{" "}
                <Todo>APP THIRD-PARTY SERVICES</Todo>
              </li>
              <li>
                Whether any data is shared with others, and with whom:{" "}
                <Todo>APP DATA SHARING</Todo>
              </li>
              <li>
                How long app data is kept, and how to delete it:{" "}
                <Todo>APP DATA RETENTION AND DELETION</Todo>
              </li>
            </List>
          </Block>

          <Block id="third-parties" title="Third parties">
            <p>
              We rely on a small number of companies to run the website. They
              handle information only to provide their service to us:
            </p>
            <List>
              <li>
                <strong className="text-foreground">Netlify</strong>: hosting
                and contact form storage.
              </li>
              <li>
                <strong className="text-foreground">Umami</strong>: website
                analytics.
              </li>
            </List>
            <p>
              Some pages link to other sites, such as client projects we have
              built and our GitHub profile. Those sites have their own privacy
              practices, which we do not control. Third-party services used
              inside our apps are listed in the apps section above.
            </p>
            <p>
              We may also disclose information if the law requires it, or to
              protect our rights and the safety of others.
            </p>
          </Block>

          <Block id="retention" title="How long we keep information">
            <List>
              <li>
                Contact form messages and emails: kept for{" "}
                <Todo>RETENTION PERIOD, e.g. 12 months</Todo> after our last
                conversation, then deleted. We delete them sooner if you ask.
              </li>
              <li>
                Analytics data: kept in aggregate form by Umami for as long as
                we run the website, and it does not identify you personally.
              </li>
              <li>App data: see the apps section above.</li>
            </List>
          </Block>

          <Block id="children" title="Children's privacy">
            <p>
              Our website and our services are not aimed at children under 13,
              and we do not knowingly collect personal information from them. If
              you believe a child has sent us personal information, email{" "}
              <MailLink /> and we will delete it.
            </p>
            <p>
              Whether our apps are directed to children:{" "}
              <Todo>APP AUDIENCE AND CHILDREN&apos;S DATA STATEMENT</Todo>
            </p>
          </Block>

          <Block id="rights" title="Your choices and rights">
            <p>You can ask us to:</p>
            <List>
              <li>Tell you what personal information we hold about you.</li>
              <li>Correct information that is wrong.</li>
              <li>Delete your information.</li>
            </List>
            <p>
              Depending on where you live, you may have additional rights under
              local law. To make a request, email <MailLink />. We may need to
              confirm it is really you before we act, and we aim to reply within
              30 days.
            </p>
          </Block>

          <Block id="changes" title="Changes to this policy">
            <p>
              If we change this policy, we will post the new version on this
              page and update the effective date at the top.
            </p>
          </Block>

          <Block id="contact" title="Contact us">
            <p>
              {contact.legalName}
              <br />
              {contact.location}
              <br />
              <MailLink />
            </p>
          </Block>
        </article>
      </Section>
    </>
  );
}
