import Section from './Section'

export default function SectionDemo() {
  return (
    <div className="space-y-16">
      {/* Basic Section */}
      <Section
        title="Welcome to Console Logic"
        description="A modern React application built with Vite, TypeScript, and Tailwind CSS. Experience the power of modern web development with our carefully crafted components and utilities."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-surface rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-ink mb-2">Fast Development</h3>
            <p className="text-ink/70">Built with Vite for lightning-fast development and builds.</p>
          </div>
          <div className="p-6 bg-surface rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-ink mb-2">Type Safe</h3>
            <p className="text-ink/70">Full TypeScript support for better development experience.</p>
          </div>
        </div>
      </Section>

      {/* Section with Eyebrow and Kicker */}
      <Section
        eyebrow="Features"
        kicker="Everything you need"
        title="Powerful Development Tools"
        description="Our carefully selected stack provides everything you need to build modern web applications with confidence and efficiency."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-brand-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <h4 className="font-semibold text-ink mb-1">Vite</h4>
            <p className="text-sm text-ink/70">Fast build tool</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-brand-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <h4 className="font-semibold text-ink mb-1">React</h4>
            <p className="text-sm text-ink/70">UI library</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-brand-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <h4 className="font-semibold text-ink mb-1">TypeScript</h4>
            <p className="text-sm text-ink/70">Type safety</p>
          </div>
        </div>
      </Section>

      {/* Section with just title and children */}
      <Section title="Custom Section Component">
        <div className="bg-surface/50 rounded-lg p-8 border border-white/10">
          <h3 className="text-xl font-semibold text-ink mb-4">Section Props</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-ink mb-2">Available Props:</h4>
              <ul className="space-y-1 text-ink/70">
                <li>• <code className="text-brand-600">kicker</code> - Small text above title</li>
                <li>• <code className="text-brand-600">title</code> - Main heading with text-balance</li>
                <li>• <code className="text-brand-600">eyebrow</code> - Small uppercase label</li>
                <li>• <code className="text-brand-600">description</code> - Subdued description text</li>
                <li>• <code className="text-brand-600">children</code> - Custom content</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-ink mb-2">Features:</h4>
              <ul className="space-y-1 text-ink/70">
                <li>• Consistent margin utilities</li>
                <li>• Text balance for better typography</li>
                <li>• Responsive text sizing</li>
                <li>• Custom container utility</li>
                <li>• Theme-aware colors</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
