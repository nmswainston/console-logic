import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "@/components/layout/Header.jsx";
import Footer from "@/components/layout/Footer.jsx";

import ContactModal from "@/components/ContactModal.jsx";
import { ContactModalProvider, useContactModal } from "@/context/ContactModalContext.jsx";

function LayoutContent() {
  const { isOpen, closeModal } = useContactModal();

  return (
    <>
      <ScrollRestoration />
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1} className="pt-16">
        <Outlet />
      </main>
      <Footer />
      <ContactModal isOpen={isOpen} onClose={closeModal} />
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
