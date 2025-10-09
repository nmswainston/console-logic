export interface Case {
  id: string
  title: string
  description: string
  category: 'Web' | 'Apps' | 'Branding'
  image: string
  tags: string[]
  link?: string
  featured?: boolean
}

export const cases: Case[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description: 'A modern, scalable e-commerce solution built with React and Node.js, featuring real-time inventory management and seamless payment integration.',
    category: 'Web',
    image: 'https://placehold.co/600x400',
    tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    link: 'https://example.com',
    featured: true
  },
  {
    id: 'mobile-fitness-app',
    title: 'Fitness Tracker App',
    description: 'Cross-platform mobile application for fitness tracking with real-time workout monitoring and social features.',
    category: 'Apps',
    image: 'https://placehold.co/600x400',
    tags: ['React Native', 'Firebase', 'HealthKit'],
    link: 'https://example.com'
  },
  {
    id: 'brand-identity',
    title: 'Tech Startup Branding',
    description: 'Complete brand identity design including logo, color palette, typography, and brand guidelines for a cutting-edge tech startup.',
    category: 'Branding',
    image: 'https://placehold.co/600x400',
    tags: ['Logo Design', 'Brand Guidelines', 'Typography'],
    link: 'https://example.com'
  },
  {
    id: 'dashboard-webapp',
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization dashboard with interactive charts and customizable widgets for business intelligence.',
    category: 'Web',
    image: 'https://placehold.co/600x400',
    tags: ['Vue.js', 'D3.js', 'WebSocket', 'PostgreSQL'],
    link: 'https://example.com'
  },
  {
    id: 'food-delivery-app',
    title: 'Food Delivery App',
    description: 'Mobile application connecting customers with local restaurants, featuring real-time tracking and secure payment processing.',
    category: 'Apps',
    image: 'https://placehold.co/600x400',
    tags: ['Flutter', 'Google Maps', 'Payment Gateway'],
    link: 'https://example.com'
  },
  {
    id: 'restaurant-branding',
    title: 'Restaurant Brand Identity',
    description: 'Complete visual identity for a fine dining restaurant, including menu design, signage, and digital presence.',
    category: 'Branding',
    image: 'https://placehold.co/600x400',
    tags: ['Print Design', 'Menu Design', 'Signage'],
    link: 'https://example.com'
  },
  {
    id: 'cms-platform',
    title: 'Content Management System',
    description: 'Headless CMS with intuitive admin interface and flexible content modeling for modern websites.',
    category: 'Web',
    image: 'https://placehold.co/600x400',
    tags: ['Next.js', 'Strapi', 'GraphQL', 'AWS'],
    link: 'https://example.com'
  },
  {
    id: 'banking-app',
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication and comprehensive financial management features.',
    category: 'Apps',
    image: 'https://placehold.co/600x400',
    tags: ['React Native', 'Biometrics', 'Security', 'API Integration'],
    link: 'https://example.com'
  }
]

export const categories = ['All', 'Web', 'Apps', 'Branding'] as const
export type Category = typeof categories[number]
