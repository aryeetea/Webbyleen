import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'

const AboutUs = lazy(() => import('./pages/AboutUs'))
const Services = lazy(() => import('./pages/Services'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Admin = lazy(() => import('./pages/Admin'))
const Contact = lazy(() => import('./pages/Contact'))
const Faq = lazy(() => import('./pages/Faq'))
const Checkout = lazy(() => import('./pages/Checkout'))
const CheckoutSuccess = lazy(() => import('./pages/CheckoutSuccess'))
const CheckoutCancel = lazy(() => import('./pages/CheckoutCancel'))
const StudioPage = lazy(() => import('./pages/StudioPage'))

function RouteFallback() {
  return (
    <div className="px-4 pb-16 pt-36 sm:px-6 sm:pt-40">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-warmbrown/12 bg-softwhite p-8 text-center shadow-[0_24px_56px_rgba(17,17,16,0.06)]">
        <div className="text-[0.72rem] uppercase tracking-[0.24em] text-warmbrown">Loading</div>
        <p className="mt-4 text-[1rem] leading-8 text-ink/62">Preparing the page...</p>
      </div>
    </div>
  )
}

export default function App() {
  const { pathname } = useLocation()
  const isStudioRoute = pathname.startsWith('/studio')
  const showFooter = !isStudioRoute

  if (isStudioRoute) {
    return (
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/studio/*" element={<StudioPage />} />
        </Routes>
      </Suspense>
    )
  }

  return (
    <div className="page-frame min-h-screen bg-cream text-ink">
      <ScrollToTop />
      <Navbar />
      <main className="relative">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/about"     element={<AboutUs />} />
            <Route path="/services"  element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/admin"     element={<Admin />} />
            <Route path="/checkout"  element={<Checkout />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/checkout/cancel" element={<CheckoutCancel />} />
            <Route path="/orders"    element={<Navigate to="/checkout" replace />} />
            <Route path="/faq"       element={<Faq />} />
            <Route path="/contact"   element={<Contact />} />
            <Route path="/studio/*"  element={<StudioPage />} />
          </Routes>
        </Suspense>
      </main>
      {showFooter && <Footer />}
    </div>
  )
}
