import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ContactModal from "../components/ContactModal";
import { ContactModalProvider, useContactModal } from "../context/ContactModalContext";

function LayoutContent() {
  const { isOpen, closeModal } = useContactModal();

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
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


