import { useState } from "react";

export default function ContactForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const form = e.target;
      const formData = new FormData(form);
      
      // Submit to Netlify Forms
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Close modal after a short delay
        setTimeout(() => {
          if (onClose) onClose();
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form 
        name="contact" 
        method="POST" 
        data-netlify="true" 
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit} 
        className="space-y-4"
      >
        {/* Hidden honeypot field for spam protection */}
        <input type="hidden" name="form-name" value="contact" />
        <div style={{ display: 'none' }}>
          <label>
            Don't fill this out if you're human: <input name="bot-field" />
          </label>
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-terminal-green focus:border-transparent"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-terminal-green focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-terminal-green focus:border-transparent"
            placeholder="What can we help you with?"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-terminal-green focus:border-transparent resize-none"
            placeholder="Tell us about your project..."
          />
        </div>

        {submitStatus === "success" && (
          <div className="p-3 bg-green-100 border border-green-300 rounded-lg text-green-800 text-sm">
            ✓ Thanks! Your message has been sent successfully.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-3 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm">
            ✗ Something went wrong. Please try again or email us directly.
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary flex-1"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
