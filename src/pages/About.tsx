import { Info, Package, Settings, Users } from 'lucide-react'
import ThemeTest from '../components/ThemeTest'
import { useMeta } from '../hooks/useMeta'

export default function About() {
  useMeta('About - console.log(ic)', 'Learn about our technology stack and development approach')
  
  const techStack = [
    { name: 'Vite', description: 'Fast build tool and development server' },
    { name: 'React', description: 'A JavaScript library for building user interfaces' },
    { name: 'TypeScript', description: 'Typed superset of JavaScript' },
    { name: 'Tailwind CSS v4', description: 'Utility-first CSS framework' },
    { name: 'React Router', description: 'Declarative routing for React' },
    { name: 'Lucide React', description: 'Beautiful & consistent icon toolkit' },
  ]

  return (
    <div className="px-4 sm:px-0">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <Info className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            About Console Logic
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            A modern React application showcasing best practices and modern tooling.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Technology Stack
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    {tech.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {tech.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Project Structure
          </h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">components/</span>
                </div>
                <div className="flex items-center">
                  <Settings className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">pages/</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">hooks/</span>
                </div>
                <div className="flex items-center">
                  <Settings className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">utils/</span>
                </div>
                <div className="flex items-center">
                  <Settings className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">types/</span>
                </div>
                <div className="flex items-center">
                  <Settings className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">contexts/</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-ink mb-6">
            Theme Token Verification
          </h2>
          <ThemeTest />
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Built with ❤️ using modern web technologies
          </p>
        </div>
      </div>
    </div>
  )
}
