import { type ReactNode } from 'react'

interface HeroProps {
  title?: string
  description?: string
  children?: ReactNode
  className?: string
}

export default function Hero({ 
  title, 
  description, 
  children, 
  className = '' 
}: HeroProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container">
        <div className="max-w-3xl">
          {/* Title */}
          {title && (
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink text-balance">
                {title}
              </h1>
            </div>
          )}
          
          {/* Description */}
          {description && (
            <div className="mb-8">
              <p className="text-lg text-ink/70 leading-relaxed">
                {description}
              </p>
            </div>
          )}
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="px-6 py-3 bg-brand-600 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 text-white font-medium rounded-2xl transition-all duration-200">
              Get Started
            </button>
            <button className="px-6 py-3 border border-white/15 hover:bg-white/5 text-ink font-medium rounded-2xl transition-all duration-200">
              Learn More
            </button>
          </div>
          
          {/* Children content */}
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
