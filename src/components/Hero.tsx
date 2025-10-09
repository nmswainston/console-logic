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
        <div className="max-w-3xl fade-in">
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
            <button className="button-primary">
              Get Started
            </button>
            <button className="button-ghost">
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
