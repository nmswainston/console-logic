export const contact = {
  email: "contact@consolelogic.net",
  subject: "Project inquiry from consolelogic.net",
  legalName: "ConsoleLogic LLC",
  location: "Avondale, Arizona",
};

export function getMailtoHref(subject = contact.subject) {
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;
}
