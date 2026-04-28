import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import { defaultThemeId, themes } from './theme'

export default function App() {
  const [themeId, setThemeId] = useState(() => localStorage.getItem('web-by-leen-theme') || defaultThemeId)

  useEffect(() => {
    localStorage.setItem('web-by-leen-theme', themeId)
  }, [themeId])

  const theme = themes[themeId] || themes[defaultThemeId]

  return (
    <div style={{ ...theme.colors, minHeight: '100vh', background: 'var(--cream)' }}>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home activeTheme={themeId} onThemeChange={setThemeId} />} />
        <Route path="/about"     element={<About />} />
        <Route path="/services"  element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact"   element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  )
}
