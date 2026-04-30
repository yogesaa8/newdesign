import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import ScrollToTop from './components/layout/ScrollToTop'

const App = () => {
  return (
    <div className="min-h-screen bg-background text-text-main">
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App
