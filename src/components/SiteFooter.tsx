import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PhoneLink from '@/components/PhoneLink'
import SocialIcon from '@/components/SocialIcon'

export default function SiteFooter({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <footer className="schedule-footer">
        <Link to="/">Annie's Yoga</Link>
        <div className="schedule-footer-contact">
          <span>Strabane & Castlederg</span>
          <PhoneLink>07716 034570</PhoneLink>
          <a href="mailto:anniesyoga@yahoo.ie">anniesyoga@yahoo.ie</a>
        </div>
      </footer>
    )
  }

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/">Annie's Yoga</Link>
        </div>
        <Link className="footer-contact-link" to="/contact">Contact <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <p className="footer-location">Strabane & Castlederg<br />Northern Ireland</p>
        <div className="footer-direct-contact">
          <PhoneLink>07716 034570</PhoneLink>
          <a href="mailto:anniesyoga@yahoo.ie">anniesyoga@yahoo.ie</a>
        </div>
        <nav className="footer-social-links" aria-label="Follow Annie's Yoga">
          <a href="https://www.facebook.com/anniesyoga/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <SocialIcon network="facebook" />
          </a>
          <a href="https://www.instagram.com/anniedeery/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <SocialIcon network="instagram" />
          </a>
        </nav>
      </div>
      <div className="footer-meta">
        <p className="copyright">© {new Date().getFullYear()} Annie's Yoga</p>
      </div>
    </footer>
  )
}
