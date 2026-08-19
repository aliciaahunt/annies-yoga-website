import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { siteUrl } from '@/lib/siteUrl'

const navigation = [
  { label: 'Retreats', to: '/retreats' },
  { label: 'Contact', to: '/contact' },
]

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const classesMenuRef = useRef<HTMLDetailsElement>(null)

  const closeMenus = () => {
    setMenuOpen(false)
    classesMenuRef.current?.removeAttribute('open')
  }

  useEffect(() => {
    setMenuOpen(false)
    classesMenuRef.current?.removeAttribute('open')
  }, [location.pathname])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        classesMenuRef.current?.removeAttribute('open')
      }
    }
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!classesMenuRef.current?.contains(event.target as Node)) {
        classesMenuRef.current?.removeAttribute('open')
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOnOutsidePointer)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOnOutsidePointer)
    }
  }, [])

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand" to="/" aria-label="Annie's Yoga home" onClick={closeMenus}>
          <img src={siteUrl('/logo.svg')} alt="" aria-hidden="true" />
          <span>Annie's Yoga</span>
        </Link>
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
          <details
            className="classes-menu"
            ref={classesMenuRef}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.removeAttribute('open')
            }}
          >
            <summary className={location.pathname === '/schedule' || location.pathname === '/private-classes' ? 'active' : undefined}>Classes</summary>
            <div className="classes-submenu">
              <NavLink to="/schedule" onClick={closeMenus}>Studio classes</NavLink>
              <NavLink to="/private-classes" onClick={closeMenus}>Private classes</NavLink>
            </div>
          </details>
          {navigation.map((item) => <NavLink key={item.to} to={item.to} onClick={closeMenus}>{item.label}</NavLink>)}
          {location.pathname === '/schedule' ? (
            <a className="nav-cta" href="#weekly-schedule" onClick={closeMenus}>View timetable <ArrowRight size={16} /></a>
          ) : (
            <Link className="nav-cta" to="/schedule" onClick={closeMenus}>Book a class <ArrowRight size={16} /></Link>
          )}
        </nav>
      </div>
    </header>
  )
}
