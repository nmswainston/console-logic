import { useEffect } from 'react'

/**
 * Custom hook for managing document meta tags
 * @param title - The page title to set
 * @param description - Optional meta description to set
 */
export function useMeta(title: string, description?: string) {
  useEffect(() => {
    // Set document title
    if (title) {
      document.title = title
    }

    // Set meta description if provided
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.setAttribute('name', 'description')
        document.head.appendChild(metaDescription)
      }
      metaDescription.setAttribute('content', description)
    }
  }, [title, description])
}
