import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-screen-md px-6 py-20 text-center">
          <h1 className="font-display text-2xl">Something went wrong.</h1>
          <p className="mt-2 text-muted-foreground">Try reloading the page to continue.</p>
          <button className="btn btn-primary mt-6" onClick={() => window.location.reload()}>Reload</button>
        </div>
      )
    }
    return this.props.children
  }
}
