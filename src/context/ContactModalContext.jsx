import { createContext, useContext, useState } from "react";
import { track } from "@/lib/analytics.js";

const ContactModalContext = createContext();

export function ContactModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  // Every contact CTA on the site funnels through here, so this is the single
  // place that records the intent. Callers name where the click came from.
  const openModal = (source) => {
    // Handlers must wrap this (onClick={() => openModal("hero")}); passing it
    // straight to onClick would hand a React event in as the source, so only
    // a real string is trusted.
    track("contact-modal-open", {
      source: typeof source === "string" ? source : "unknown",
    });
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  return (
    <ContactModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (context === undefined) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }
  return context;
}
