import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navigation = [
  { label: 'Gift cards', to: '/gift-cards' },
  { label: 'Classes', to: '/schedule' },
  { label: 'Retreats', to: '/retreats' },
  { label: 'About', to: '/about' },
  { label: 'Private classes', to: '/private-classes' },
  { label: 'Contact', to: '/contact' },
]

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setMenuOpen(false), [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Annie's Yoga home" onClick={() => setMenuOpen(false)}>Annie's Yoga</Link>
      <button
        className="menu-button"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
      <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} id="site-navigation" aria-label="Main navigation">
        {navigation.map((item) => <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>{item.label}</NavLink>)}
        {location.pathname === '/schedule' ? (
          <a className="nav-cta" href="#weekly-schedule" onClick={() => setMenuOpen(false)}>View timetable <ArrowRight size={16} /></a>
        ) : (
          <Link className="nav-cta" to="/schedule" onClick={() => setMenuOpen(false)}>Book a class <ArrowRight size={16} /></Link>
        )}
      </nav>
    </header>
  )
}
