export const projects = [
  {
    slug: "portfolio",
    title: "Portfolio",
    tag: "Website",
    link: "https://www.nmswainston.com",
    thumb: "/projects/nmswainston.png",
    description: "Many portfolios become hard to maintain over time. Built with clean architecture so it stays fast and simple to update.",
    overview: "A personal portfolio site designed for long-term maintainability. Clean architecture and minimal dependencies keep it fast and straightforward to update.",
    problem: "Portfolios often accumulate technical debt. Over time, dependencies age, build tools change, and what started simple becomes a maintenance burden.",
    approach: "Designed with a lean stack and clear separation of concerns. Content lives in structured data; styling uses design tokens. No CMS overhead, just files that are easy to edit.",
    outcome: "A site that loads quickly, stays easy to update, and won't require a rewrite when tooling evolves.",
    techStack: ["React", "Vite", "Tailwind CSS"],
  },
  {
    slug: "litchfield-perk",
    title: "Litchfield Perk",
    tag: "Marketing site",
    link: "https://www.litchfieldperk.com/",
    thumb: "/projects/litchfield-perk.png",
    description: "Local coffee shop needed a web presence that worked on phones. Mobile-first site surfaces hours, location, and menu. No algorithm required.",
    overview: "A mobile-first marketing site for a local coffee shop. Surfaces hours, location, and menu so customers can find what they need without digging.",
    problem: "The shop had no web presence. Customers couldn't easily find hours, location, or menu. Word of mouth and paper flyers weren't enough.",
    approach: "Mobile-first design with clear hierarchy. Hours and location above the fold; menu and contact info one tap away. Simple, fast, and easy to update.",
    outcome: "A lightweight site that works well on phones and desktops. The owner can update content without technical help.",
    techStack: ["HTML", "CSS", "JavaScript"],
  },
  {
    slug: "garfias-mountain-glass-art",
    title: "Garfias Mountain Glass Art",
    tag: "Artist storefront",
    link: "https://garfiasmountainglassart.com/",
    thumb: "/projects/garfias-mountain-glass-art.png",
    description:
      "A stained glass artist with 30 years of work needed a home for it online. Brand site pairs her story with a gallery, shop categories, and custom orders.",
    overview:
      "A storefront and brand site for an Arizona stained glass studio. Presents the artist's story, gallery, and shop categories, and routes buyers to Etsy listings and custom order requests.",
    problem:
      "Thirty years of handmade stained glass lived only in marketplace listings and social posts. There was no single place that told the artist's story, showed the range of work, and made custom orders easy to request.",
    approach:
      "A warm, photography-forward design that matches the work: desert landscapes, handmade texture, and light. Clear paths to shop by category, browse the gallery, ask about custom pieces, and join the email list.",
    outcome:
      "One link that represents the studio. Buyers can browse categories and reach Etsy or the custom order form in a tap, and the artist has a brand home that grows with her work.",
    techStack: ["React", "Vite", "Etsy storefront"],
  },
  {
    slug: "relay",
    title: "Relay",
    tag: "Internal tool",
    link: "https://relay-clientops.netlify.app/login",
    thumb: "/projects/relay.png",
    description: "Client ops were scattered across spreadsheets and email. Centralized app tracks status and next steps so teams spend less time switching tools.",
    overview: "An internal client operations tool that centralizes status tracking and next steps. Reduces context-switching between spreadsheets and email.",
    problem: "Client ops lived in spreadsheets, email threads, and ad-hoc notes. Teams wasted time hunting for status and duplicating updates across tools.",
    approach: "Single source of truth for client status. Clear views for active work, next steps, and history. Role-based access so teams see what they need.",
    outcome: "Less time switching tools, fewer missed follow-ups, and a shared view of client work across the team.",
    techStack: ["React", "Netlify", "Supabase"],
  },
  {
    slug: "dwellpath",
    title: "Dwellpath",
    tag: "Internal tool",
    link: "https://dwellpath-demo.netlify.app/",
    thumb: "/projects/dwellpath.png",
    description: "Snowbird residents risk double taxation when residency is unclear. Tool records days in each location so they can prove residency and avoid overpaying.",
    overview: "A residency-tracking tool for snowbird residents. Records days in each location to support residency claims and avoid double taxation.",
    problem: "Snowbird residents split time between states. Unclear residency records can trigger double taxation or audits. Manual tracking is error-prone.",
    approach: "Simple day-by-day logging with location tags. Exportable records for tax professionals. Clear summaries of time spent in each jurisdiction.",
    outcome: "Residents can prove residency with documented records. Fewer surprises at tax time and less stress about audits.",
    techStack: ["React", "Netlify", "Supabase"],
  },
  {
    slug: "stacys-40th",
    title: "Stacy's 40th",
    tag: "Event site",
    link: "https://www.stacys40thfiesta.com/",
    thumb: "/projects/stacys40thfiesta.png",
    description: "Birthday party needed a simple way to collect RSVPs and share details. Single-page site replaces paper invites and group texts.",
    overview: "A single-page event site for a 40th birthday party. Collects RSVPs and shares details without paper invites or scattered group texts.",
    problem: "Paper invites get lost; group texts become noisy. The host needed one place to share details and collect RSVPs without extra apps.",
    approach: "Single-page design with event details, RSVP form, and optional photo gallery. Mobile-friendly so guests can respond from their phones.",
    outcome: "Clean RSVP tracking and a single link to share. No app downloads or account signups required.",
    techStack: ["HTML", "CSS", "JavaScript", "Netlify Forms"],
  },
  {
    slug: "signal-over-noise",
    title: "Signal Over Noise",
    tag: "Product concept",
    link: "https://signalovernoise.netlify.app/",
    thumb: "/projects/signal-over-noise.png",
    description: "AI learning content is noisy and hype-heavy. This concept filters it into actionable skills so learners know what to focus on.",
    overview: "A product concept that filters AI learning content into actionable skills. Helps learners cut through hype and focus on what matters.",
    problem: "AI learning content is overwhelming. Hype, repetition, and unclear paths make it hard to know what to learn and in what order.",
    approach: "Skill-based organization with clear progression. Content tagged by level and outcome. Learners see a path instead of a feed.",
    outcome: "A working prototype that demonstrates the concept. Validates the approach before full build.",
    techStack: ["React", "Netlify", "Static content"],
  },
  {
    slug: "neural-vault",
    title: "Neural Vault",
    tag: "Product concept",
    link: "https://neural-vault.netlify.app/",
    thumb: "/projects/neural-vault.png",
    description: "Notes and ideas get lost across apps. This concept turns them into a searchable knowledge base where connections stay visible.",
    overview: "A product concept for a searchable knowledge base. Notes and ideas stay connected instead of scattered across apps.",
    problem: "Notes live in multiple apps. Ideas get lost. Connections between thoughts are hard to see. Search helps, but structure doesn't.",
    approach: "Graph-based note storage with visible connections. Search plus browse by relationship. Export and sync with existing tools.",
    outcome: "A prototype that shows how connected notes could work. Used to validate interest before investing in full product.",
    techStack: ["React", "Netlify", "Graph data model"],
  },
  {
    slug: "mini-saas-starter",
    title: "Mini SaaS Starter Kit",
    tag: "Frontend build",
    link: "https://mini-saas-template.netlify.app/",
    thumb: "/projects/mini-saas-starter.png",
    description: "New SaaS products waste weeks on auth, billing, and tenancy. This starter ships with those patterns built in so teams can focus on the product.",
    overview: "A frontend starter kit for new SaaS products. Auth, billing, and tenancy patterns built in so teams can focus on the product.",
    problem: "New SaaS products spend weeks on auth, billing, and multi-tenancy before writing product code. Boilerplate is repetitive and error-prone.",
    approach: "Pre-built patterns for auth flows, subscription billing, and tenant isolation. Clean abstractions so teams can customize without rewriting.",
    outcome: "Teams ship product features faster. Less time on plumbing, more time on what makes the product unique.",
    techStack: ["React", "Vite", "Tailwind", "Stripe", "Supabase"],
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getAdjacentProjects(slug) {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  };
}
