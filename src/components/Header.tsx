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
        href="#main"
        className="skip-link"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-surface/80 border-b border-white/10">
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link 
                to="/" 
                className="text-xl font-bold text-ink hover:text-ink/80 transition-colors focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-brand-600"
                aria-label="Console Logic - Home"
              >
                Console Logic
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav 
              className="hidden md:flex items-center space-x-8" 
              role="navigation" 
              aria-label="Primary"
            >
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-brand-600 ${
                      isActive
                        ? 'border-brand-600 text-ink'
                        : 'border-transparent text-ink/70 hover:border-ink/30 hover:text-ink'
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
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">{isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
                <input
                  type="checkbox"
                  aria-controls="mobile-menu"
                  aria-expanded={isMobileMenuOpen}
                  checked={isMobileMenuOpen}
                  onChange={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-brand-600"
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
            aria-label="Primary"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-white/10">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-2 text-base font-medium rounded-2xl transition-colors focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-brand-600 ${
                      isActive
                        ? 'bg-brand-600/10 text-brand-600'
                        : 'text-ink/70 hover:bg-ink/5 hover:text-ink'
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
      <main id="main" className="flex-1">
        {children}
      </main>
    </>
  )
}
