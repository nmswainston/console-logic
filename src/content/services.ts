export interface Service {
  slug: string;
  title: string;
  blurb: string;
  icon: string; // Lucide icon name
}

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    blurb: "Custom websites and web applications built with modern technologies and best practices.",
    icon: "Code"
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    blurb: "Native and cross-platform mobile applications for iOS and Android devices.",
    icon: "Smartphone"
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    blurb: "Beautiful and intuitive user interfaces that provide exceptional user experiences.",
    icon: "Palette"
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    blurb: "Scalable cloud infrastructure and deployment solutions for your applications.",
    icon: "Cloud"
  },
  {
    slug: "consulting",
    title: "Technical Consulting",
    blurb: "Expert guidance on technology decisions, architecture, and development strategies.",
    icon: "Lightbulb"
  },
  {
    slug: "maintenance",
    title: "Maintenance & Support",
    blurb: "Ongoing maintenance, updates, and technical support for your digital products.",
    icon: "Settings"
  }
];
