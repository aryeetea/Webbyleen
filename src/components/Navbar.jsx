import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const links = [
  { to: '/',          label: 'Home' },
  { to: '/about',     label: 'About' },
  { to: '/services',  label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          Web By <span>Leen</span>
        </Link>
        <ul className={styles.links}>
          {links.map(l => (
            <li key={l.to}>
              <Link to={l.to} className={pathname === l.to ? styles.active : ''}>
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/services" className={styles.cta}>Shop Packages</Link>
          </li>
        </ul>
        <button className={styles.hamburger} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div className={styles.mobile}>
          {[...links, { to: '/contact', label: 'Contact' }].map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
        </div>
      )}
    </nav>
  )
}
