import { lazy, Suspense, useEffect } from "react";
import { Head } from "vite-react-ssg";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "@/components/layout/Header.jsx";
import Footer from "@/components/layout/Footer.jsx";
import BackToTopButton from "@/components/BackToTopButton.jsx";

import TerminalBackground from "@/components/terminal/TerminalBackground.jsx";
import TerminalGlow from "@/components/terminal/TerminalGlow.jsx";
import ScanlineOverlay from "@/components/terminal/ScanlineOverlay.jsx";

import { ContactModalProvider, useContactModal } from "@/context/ContactModalContext.jsx";
import { applyAnalyticsPreference } from "@/lib/analytics.js";

const ContactModal = lazy(() => import("@/components/ContactModal.jsx"));

function LayoutContent() {
  const { isOpen, closeModal } = useContactModal();

  // Runs once per page load rather than per route: the opt-out is a one-shot
  // switch, and the URL it arrives on is the landing URL.
  useEffect(() => {
    applyAnalyticsPreference();
  }, []);

  return (
    <>
      {/* Site-wide head defaults. Pages override title/description/canonical and,
          where useful, og:image. Canonical is intentionally omitted here because
          <link> tags are not de-duplicated, so each page sets its own. */}
      <Head>
        <title>console.log(ic) - Websites and web apps for small businesses</title>
        <meta
          name="description"
          content="console.log(ic) is a small web studio in Avondale, Arizona. We build fast websites, web apps and automations for small businesses."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="console.log(ic)" />
        <meta property="og:title" content="console.log(ic) - Websites and web apps for small businesses" />
        <meta
          property="og:description"
          content="console.log(ic) is a small web studio in Avondale, Arizona. We build fast websites, web apps and automations for small businesses."
        />
        <meta property="og:url" content="https://consolelogic.net/" />
        <meta property="og:image" content="https://consolelogic.net/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="console.log(ic) - Websites and web apps for small businesses" />
        <meta
          name="twitter:description"
          content="console.log(ic) is a small web studio in Avondale, Arizona. We build fast websites, web apps and automations for small businesses."
        />
        <meta name="twitter:image" content="https://consolelogic.net/og.png" />
      </Head>

      {/* Global terminal animation layers (fixed, behind all content) */}
      <TerminalBackground />
      <TerminalGlow />
      <ScanlineOverlay />

      <ScrollRestoration />
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1} className="relative">
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
      {isOpen && (
        <Suspense fallback={null}>
          <ContactModal isOpen={isOpen} onClose={closeModal} />
        </Suspense>
      )}
    </>
  );
}

export default function Layout() {
  return (
    <ContactModalProvider>
      <LayoutContent />
    </ContactModalProvider>
  );
}
