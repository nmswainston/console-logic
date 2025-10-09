import { type ReactNode, useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Info, Briefcase, Mail, Menu, X } from 'lucide-react'

interface HeaderProps {
  children?: ReactNode
}

export default function Header({ children }: HeaderProps) {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuToggleRef = useRef<HTMLLabelElement>(null)

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Work', href: '/work', icon: Briefcase },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Mail },
  ]

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) &&
          mobileMenuToggleRef.current && !mobileMenuToggleRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-white/10">
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link 
                to="/" 
                className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors focus-visible"
                aria-label="Console Logic - Home"
              >
                Console Logic
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav 
              className="hidden md:flex items-center space-x-8" 
              role="navigation" 
              aria-label="Main navigation"
            >
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors focus-visible ${
                      isActive
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="w-4 h-4 mr-2" aria-hidden="true" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <label 
                ref={mobileMenuToggleRef}
                className="mobile-menu-toggle focus-visible"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">{isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
                <input
                  type="checkbox"
                  aria-controls="mobile-menu"
                  aria-expanded={isMobileMenuOpen}
                  checked={isMobileMenuOpen}
                  onChange={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="focus-visible"
                />
                <Menu className={`menu-icon block h-6 w-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`} aria-hidden="true" />
                <X className={`close-icon h-6 w-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`} aria-hidden="true" />
              </label>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav 
            ref={mobileMenuRef}
            id="mobile-menu"
            className={`mobile-menu ${isMobileMenuOpen ? 'block' : 'hidden'}`}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors focus-visible ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="w-5 h-5 mr-3" aria-hidden="true" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      </header>

      {/* Main content wrapper with id for skip link */}
      <main id="main-content" className="flex-1">
        {children}
      </main>
    </>
  )
}
