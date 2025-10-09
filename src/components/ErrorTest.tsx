import React, { useState } from 'react'

const ErrorTest: React.FC = () => {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    // This will trigger the error boundary
    throw new Error('This is a test error to demonstrate the error boundary!')
  }

  return (
    <div className="p-4 border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-700 rounded-lg">
      <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
        Error Boundary Test
      </h3>
      <p className="text-yellow-700 dark:text-yellow-300 mb-4">
        Click the button below to trigger an error and test the error boundary component.
      </p>
      <button
        onClick={() => setShouldError(true)}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
      >
        Trigger Error
      </button>
    </div>
  )
}

export default ErrorTest
