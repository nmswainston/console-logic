import { lazy, Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "@/components/layout/Header.jsx";
import Footer from "@/components/layout/Footer.jsx";

import { ContactModalProvider, useContactModal } from "@/context/ContactModalContext.jsx";

const ContactModal = lazy(() => import("@/components/ContactModal.jsx"));

function LayoutContent() {
  const { isOpen, closeModal } = useContactModal();

  return (
    <>
      <ScrollRestoration />
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1} className="relative pt-16">
        <Outlet />
      </main>
      <Footer />
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
