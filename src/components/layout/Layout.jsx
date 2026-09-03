import { lazy, Suspense } from "react";
import { Head } from "vite-react-ssg";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "@/components/layout/Header.jsx";
import Footer from "@/components/layout/Footer.jsx";
import BackToTopButton from "@/components/BackToTopButton.jsx";
import CommandPrompt from "@/components/CommandPrompt.jsx";

import TerminalBackground from "@/components/terminal/TerminalBackground.jsx";
import TerminalGlow from "@/components/terminal/TerminalGlow.jsx";
import ScanlineOverlay from "@/components/terminal/ScanlineOverlay.jsx";

import { ContactModalProvider, useContactModal } from "@/context/ContactModalContext.jsx";

const ContactModal = lazy(() => import("@/components/ContactModal.jsx"));

function LayoutContent() {
  const { isOpen, closeModal } = useContactModal();

  return (
    <>
      {/* Site-wide head defaults. Pages override title/description/canonical and,
          where useful, og:image. Canonical is intentionally omitted here because
          <link> tags are not de-duplicated, so each page sets its own. */}
      <Head>
        <title>console.log(ic) - Smart devs. Clean code.</title>
        <meta
          name="description"
          content="A modern terminal-inspired studio. Smart devs, clean code, logical outcomes."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="console.log(ic)" />
        <meta property="og:title" content="console.log(ic) - Smart devs. Clean code." />
        <meta
          property="og:description"
          content="A small studio shipping fast, reliable web apps and AI automations."
        />
        <meta property="og:url" content="https://consolelogic.net/" />
        <meta property="og:image" content="https://consolelogic.net/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="console.log(ic) - Smart devs. Clean code." />
        <meta
          name="twitter:description"
          content="A small studio shipping fast, reliable web apps and AI automations."
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
      <CommandPrompt />
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
