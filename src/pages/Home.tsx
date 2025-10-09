import { useState } from 'react'
import { Terminal, Code, Zap } from 'lucide-react'
import Section from '../components/Section'
import SectionDemo from '../components/SectionDemo'
import { useMeta } from '../hooks/useMeta'

export default function Home() {
  const [count, setCount] = useState(0)
  
  useMeta('console.log(ic) - Home', 'Creative digital solutions and web development services')

  const features = [
    {
      icon: Terminal,
      title: 'Console Logic',
      description: 'Powerful console utilities and debugging tools for developers.',
    },
    {
      icon: Code,
      title: 'TypeScript Ready',
      description: 'Built with TypeScript for type safety and better development experience.',
    },
    {
      icon: Zap,
      title: 'Fast & Modern',
      description: 'Built with Vite and React for lightning-fast development and builds.',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <Section
        title="Welcome to Console Logic"
        description="A modern React application built with Vite, TypeScript, and Tailwind CSS. Experience the power of modern web development with our carefully crafted components and utilities."
      >
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500">
            <button onClick={() => setCount((count) => count + 1)}>
              Count is {count}
            </button>
          </div>
          <p className="mt-2 text-sm text-ink/70">
            Click the button to test React state management
          </p>
        </div>
      </Section>

      {/* Features Section */}
      <Section
        eyebrow="Features"
        kicker="Everything you need"
        title="Powerful Development Tools"
        description="Our carefully selected stack provides everything you need to build modern web applications with confidence and efficiency."
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="pt-6"
              >
                <div className="flow-root bg-surface rounded-lg px-6 pb-8 shadow border border-white/10">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-brand-600 rounded-md shadow-lg">
                        <Icon className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-ink tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-5 text-base text-ink/70">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Test utilities */}
      <Section title="Theme Token Verification">
        <div className="mb-8 p-4 bg-surface text-ink rounded-lg border border-white/10">
          <p className="text-sm">Testing utilities: bg-surface, text-ink, and bg-brand-600 work!</p>
        </div>
      </Section>

      {/* Section Demo */}
      <SectionDemo />
    </div>
  )
}
