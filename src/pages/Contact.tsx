import { useState, useEffect } from 'react'
import { Mail, User, MessageSquare, CheckCircle } from 'lucide-react'
import { useMeta } from '../hooks/useMeta'

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  useMeta('Contact - console.log(ic)', 'Get in touch with us for your next project or any questions you might have')

  useEffect(() => {
    // Check for success state from URL params or query string
    const urlParams = new URLSearchParams(window.location.search)
    const isSuccess = urlParams.get('success') === 'true' || 
                     window.location.pathname.includes('thank-you')
    
    if (isSuccess) {
      setIsSubmitted(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      // Submit to Netlify
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      })

      if (response.ok) {
        // Redirect to success page or add success param
        window.location.href = '/contact?success=true'
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting the form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-surface rounded-lg p-8 shadow-lg border border-white/10">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-ink mb-4">
            Thank You!
          </h1>
          <p className="text-lg text-ink/70 mb-6">
            Your message has been sent successfully. We'll get back to you soon.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false)
              window.history.replaceState({}, '', '/contact')
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus-visible"
          >
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Mail className="mx-auto h-12 w-12 text-brand-600 mb-4" />
        <h1 className="text-3xl font-bold text-ink mb-4">
          Get In Touch
        </h1>
        <p className="text-lg text-ink/70">
          Have a question or want to work together? We'd love to hear from you.
        </p>
      </div>

      <div className="bg-surface rounded-lg p-8 shadow-lg border border-white/10">
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Hidden form name field for Netlify */}
          <input type="hidden" name="form-name" value="contact" />
          
          {/* Honeypot field for spam protection */}
          <div className="hidden">
            <label>
              Don't fill this out if you're human: 
              <input name="bot-field" />
            </label>
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
              <User className="inline h-4 w-4 mr-2" />
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-white/20 rounded-md shadow-sm bg-white/5 text-ink placeholder-ink/50 focus-visible"
              placeholder="Your full name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
              <Mail className="inline h-4 w-4 mr-2" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-white/20 rounded-md shadow-sm bg-white/5 text-ink placeholder-ink/50 focus-visible"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
              <MessageSquare className="inline h-4 w-4 mr-2" />
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="w-full px-3 py-2 border border-white/20 rounded-md shadow-sm bg-white/5 text-ink placeholder-ink/50 focus-visible resize-vertical"
              placeholder="Tell us about your project or question..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus-visible disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Additional Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-ink/60">
          We typically respond within 24 hours. For urgent matters, please call us directly.
        </p>
      </div>
    </div>
  )
}
