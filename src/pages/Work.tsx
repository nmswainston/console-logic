import { useState, useMemo } from 'react'
import { cases, categories, type Category } from '../content/cases'
import CaseCard from '../components/CaseCard'
import { useMeta } from '../hooks/useMeta'

export default function Work() {
  const [activeFilter, setActiveFilter] = useState<Category>('All')
  
  useMeta('Our Work - console.log(ic)', 'Explore our portfolio of successful projects across web development, mobile apps, and branding')

  const filteredCases = useMemo(() => {
    if (activeFilter === 'All') {
      return cases
    }
    return cases.filter(caseItem => caseItem.category === activeFilter)
  }, [activeFilter])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Our Work
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our portfolio of successful projects across web development, mobile apps, and branding.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeFilter === category
                ? 'bg-brand-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-pressed={activeFilter === category}
            aria-label={`Filter by ${category}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="mb-8">
        <p className="text-sm text-gray-600">
          Showing {filteredCases.length} {filteredCases.length === 1 ? 'project' : 'projects'}
          {activeFilter !== 'All' && ` in ${activeFilter}`}
        </p>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCases.map((caseItem) => (
          <CaseCard key={caseItem.id} case={caseItem} />
        ))}
      </div>

      {/* Empty State */}
      {filteredCases.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No projects found
          </h3>
          <p className="text-gray-600">
            No projects match the selected filter. Try selecting a different category.
          </p>
        </div>
      )}
    </div>
  )
}
