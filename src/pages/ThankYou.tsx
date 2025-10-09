import { CheckCircle, ArrowLeft } from 'lucide-react'
import { useMeta } from '../hooks/useMeta'
import { Link } from 'react-router-dom'

export default function ThankYou() {
  useMeta('Thank You - console.log(ic)', 'Thank you for your message. We\'ll get back to you soon.')

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
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="button-primary"
          >
            Send Another Message
          </Link>
          <Link
            to="/"
            className="button-ghost"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
