import { useContactModal } from "@/context/ContactModalContext.jsx";
import { getMailtoHref } from "@/data/contact";

/**
 * A contact call to action that is a real link first and a modal second.
 *
 * The href is a mailto: link, so it works with JavaScript off, before
 * hydration, for crawlers, and for anyone who middle-clicks or copies the
 * link. When JavaScript is running, a plain left click is intercepted and
 * opens the existing contact form instead (the nicer path). Modified clicks
 * (ctrl, cmd, shift, alt) and non-primary buttons fall through to the browser.
 *
 * `source` names where the click came from, for the analytics event that
 * openModal records. `subject` pre-fills the email subject for the mailto path.
 */
export default function ContactLink({
  source,
  subject,
  onOpen,
  className,
  children,
  ...rest
}) {
  const { openModal } = useContactModal();

  const handleClick = (e) => {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (onOpen) onOpen();
    openModal(source);
  };

  return (
    <a
      href={getMailtoHref(subject)}
      onClick={handleClick}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
