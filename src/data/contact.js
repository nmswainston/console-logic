export const contact = {
  email: "contact@consolelogic.net",
  subject: "Project inquiry from consolelogic.net",
  legalName: "ConsoleLogic LLC",
  location: "Avondale, Arizona",
};

// The page that holds the contact form. Every contact call to action links here.
export const CONTACT_PATH = "/contact";

export function getMailtoHref(subject = contact.subject) {
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;
}
