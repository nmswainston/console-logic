import { type ReactNode } from 'react'

interface SectionProps {
  kicker?: string
  title?: string
  eyebrow?: string
  description?: string
  children?: ReactNode
  className?: string
}

export default function Section({ 
  kicker, 
  title, 
  eyebrow, 
  description, 
  children, 
  className = '' 
}: SectionProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          {eyebrow && (
            <div className="mb-4">
              <span className="text-sm font-medium text-ink/70 uppercase tracking-wider">
                {eyebrow}
              </span>
            </div>
          )}
          
          {/* Kicker */}
          {kicker && (
            <div className="mb-2">
              <p className="text-lg text-ink/80 font-medium">
                {kicker}
              </p>
            </div>
          )}
          
          {/* Title */}
          {title && (
            <div className="mb-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink text-balance">
                {title}
              </h2>
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
          
          {/* Children content */}
          {children && (
            <div>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
