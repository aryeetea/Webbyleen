import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink px-5 py-20 text-softwhite sm:px-6">
      <div className="absolute inset-x-0 top-0 h-56 bg-ink" />
      <div className="relative mx-auto grid max-w-6xl gap-14 border-b border-softwhite/10 pb-14 lg:grid-cols-[1.6fr_0.9fr_0.9fr_1fr]">
        <div>
          <Link to="/" className="inline-block rounded-[20px] bg-softwhite/95 px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.14)]" aria-label="ACE Web Studio home">
            <img src="/logo-ace-main.png" alt="ACE Web Studio" className="h-16 w-auto" />
          </Link>
        </div>

        <div>
          <h4 className="font-display text-xl text-softwhite">Navigate</h4>
          <div className="mt-5 grid gap-3 text-sm uppercase tracking-[0.12em] text-softwhite/58">
            <Link className="transition hover:text-softwhite" to="/">Home</Link>
            <Link className="transition hover:text-softwhite" to="/about">About</Link>
            <Link className="transition hover:text-softwhite" to="/services">Services</Link>
            <Link className="transition hover:text-softwhite" to="/portfolio">Portfolio</Link>
            <Link className="transition hover:text-softwhite" to="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h4 className="font-display text-xl text-softwhite">Packages</h4>
          <div className="mt-5 grid gap-3 text-sm uppercase tracking-[0.08em] text-softwhite/58">
            <Link className="transition hover:text-softwhite" to="/services">Basic</Link>
            <Link className="transition hover:text-softwhite" to="/services">Standard</Link>
            <Link className="transition hover:text-softwhite" to="/services">Premium</Link>
          </div>
        </div>

        <div>
          <h4 className="font-display text-xl text-softwhite">Connect</h4>
          <div className="mt-5 grid gap-3 text-sm uppercase tracking-[0.12em] text-softwhite/58">
            <Link className="transition hover:text-softwhite" to="/contact">Start a Project</Link>
            <Link className="transition hover:text-softwhite" to="/faq">FAQ</Link>
            <a className="text-anywhere transition hover:text-softwhite" href="mailto:aileen.aryeetey@outlook.com">aileen.aryeetey@outlook.com</a>
            <a className="text-anywhere transition hover:text-softwhite" href="mailto:cowusuforkuo@gmail.com">cowusuforkuo@gmail.com</a>
            <span className="text-anywhere text-softwhite/45">Edwina email coming soon</span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col justify-between gap-3 pt-8 text-xs uppercase tracking-[0.14em] text-softwhite/35 sm:flex-row">
        <p>© 2026 ACE Web Studio</p>
        <p>Design-first websites, built from scratch</p>
      </div>
    </footer>
  )
}
