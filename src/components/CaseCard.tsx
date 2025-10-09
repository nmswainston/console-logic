import { type Case } from '../content/cases'
import { ExternalLink } from 'lucide-react'

interface CaseCardProps {
  case: Case
}

export default function CaseCard({ case: caseItem }: CaseCardProps) {
  return (
    <article className="group relative card overflow-hidden hover:shadow-md transition-shadow duration-200 fade-in">
      {/* Image */}
      <div className="aspect-video bg-ink/5">
        <img
          src={caseItem.image}
          alt={caseItem.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        {caseItem.featured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-2xl text-xs font-medium bg-brand-600 text-white">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="mb-2">
          <span className="inline-flex items-center px-2 py-1 rounded-2xl text-xs font-medium bg-ink/10 text-ink/80">
            {caseItem.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-ink mb-2 group-hover:text-brand-600 transition-colors">
          {caseItem.title}
        </h3>

        {/* Description */}
        <p className="text-ink/70 text-sm mb-4 line-clamp-3">
          {caseItem.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {caseItem.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-2xl text-xs font-medium bg-ink/5 text-ink/70"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        {caseItem.link && (
          <a
            href={caseItem.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-brand-600"
            aria-label={`View ${caseItem.title} project (opens in new tab)`}
          >
            View Project
            <ExternalLink className="ml-1 h-3 w-3" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}
