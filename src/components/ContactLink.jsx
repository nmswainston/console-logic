import { useLocation } from "react-router-dom";
import { useContactModal } from "@/context/ContactModalContext.jsx";
import { CONTACT_PATH } from "@/data/contact";

/**
 * A contact call to action that is a real link first and a modal second.
 *
 * The href points at the /contact page, which holds the same form on a page
 * of its own. That page works with JavaScript off, before hydration, for
 * crawlers, for anyone who middle-clicks or copies the link, and as the
 * landing page for an ad. When JavaScript is running, a plain left click is
 * intercepted and opens the contact form in a modal instead, so the visitor
 * never leaves the page they were reading. Modified clicks (ctrl, cmd,
 * shift, alt) and non-primary buttons fall through to the browser.
 *
 * On /contact itself the modal would be a second copy of the form already on
 * screen, so a click there moves focus to the form's first field instead.
 *
 * `source` names where the click came from, for the analytics event that
 * openModal records.
 */
export default function ContactLink({
  source,
  onOpen,
  className,
  children,
  ...rest
}) {
  const { openModal } = useContactModal();
  const { pathname } = useLocation();

  const handleClick = (e) => {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (onOpen) onOpen();
    if (pathname === CONTACT_PATH) {
      document.getElementById("name")?.focus();
      return;
    }
    openModal(source);
  };

  return (
    <a href={CONTACT_PATH} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
