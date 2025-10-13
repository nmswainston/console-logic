export const contact = {
  email: "consolelogicinfo@gmail.com",
  subject: "Project inquiry from console.logic",
};

export function getMailtoHref() {
  const subject = encodeURIComponent(contact.subject);
  return `mailto:${contact.email}?subject=${subject}`;
}


