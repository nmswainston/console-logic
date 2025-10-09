import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <Layout>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </ErrorBoundary>
      </Layout>
    </Router>
  )
}

export default App
