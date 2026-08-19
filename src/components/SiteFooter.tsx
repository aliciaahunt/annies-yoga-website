import { Link } from 'react-router-dom'
import SocialIcon from '@/components/SocialIcon'

export default function SiteFooter({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <footer className="schedule-footer">
        <Link to="/">Annie's Yoga</Link>
        <div className="schedule-footer-contact">
          <span>Strabane & Castlederg</span>
          <a href="tel:+447716034570">07716 034570</a>
          <a href="mailto:anniesyoga@yahoo.ie">anniesyoga@yahoo.ie</a>
        </div>
      </footer>
    )
  }

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link to="/">Annie's Yoga</Link>
        <p>Movement for real life.</p>
      </div>
      <div><h3>Explore</h3><Link to="/schedule">Classes</Link><Link to="/retreats">Retreats</Link><Link to="/about">About Annie</Link></div>
      <div><h3>Useful</h3><Link to="/private-classes">Private classes</Link><Link to="/contact">Contact</Link></div>
      <div className="footer-contact">
        <h3>Contact</h3>
        <p>Strabane & Castlederg<br />Northern Ireland</p>
        <a href="tel:+447716034570">07716 034570</a>
        <a href="mailto:anniesyoga@yahoo.ie">anniesyoga@yahoo.ie</a>
        <nav className="footer-social-links" aria-label="Follow Annie's Yoga">
          <a href="https://www.facebook.com/anniesyoga/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <SocialIcon network="facebook" />
          </a>
          <a href="https://www.instagram.com/anniedeery/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <SocialIcon network="instagram" />
          </a>
        </nav>
      </div>
      <p className="copyright">© {new Date().getFullYear()} Annie's Yoga</p>
    </footer>
  )
}
