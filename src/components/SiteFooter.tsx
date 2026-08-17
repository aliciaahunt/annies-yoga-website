import { Link } from 'react-router-dom'

export default function SiteFooter({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <footer className="schedule-footer">
        <Link to="/">Annie's Yoga</Link>
        <p>Strabane & Castlederg · <a href="tel:+447716034570">07716 034570</a></p>
      </footer>
    )
  }

  return (
    <footer className="site-footer">
      <div className="footer-brand"><Link to="/">Annie's Yoga</Link><p>Movement for real life.</p></div>
      <div><h3>Explore</h3><Link to="/schedule">Classes</Link><Link to="/retreats">Retreats</Link><Link to="/about">About Annie</Link></div>
      <div><h3>Useful</h3><Link to="/private-classes">Private classes</Link><Link to="/contact">Contact</Link></div>
      <div><h3>Visit</h3><p>Strabane & Castlederg<br />Northern Ireland</p><a href="tel:+447716034570">07716 034570</a></div>
      <p className="copyright">© {new Date().getFullYear()} Annie's Yoga</p>
    </footer>
  )
}
