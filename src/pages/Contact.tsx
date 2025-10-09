import { useState, useEffect } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import { useMeta } from '../hooks/useMeta'

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  
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
        // Redirect to thank-you page
        window.location.href = '/thank-you'
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting the form. Please try again.')
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
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-brand-600"
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
          className="space-y-4"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden"><label>Don't fill this out: <input name="bot-field" /></label></p>
          <label className="block">Name<input name="name" required className="block w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2"/></label>
          <label className="block">Email<input name="email" type="email" required className="block w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2"/></label>
          <label className="block">Message<textarea name="message" rows={6} required className="block w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2"/></label>
          <button className="button-primary">Send</button>
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
