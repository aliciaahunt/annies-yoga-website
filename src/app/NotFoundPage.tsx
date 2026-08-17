import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'

export default function NotFoundPage() {
  return (
    <div className="simple-page">
      <SiteHeader />
      <main className="not-found section-shell">
        <p className="eyebrow">Page not found</p>
        <h1>Let's get you back<br /><em>on the mat.</em></h1>
        <p>The page you were looking for does not exist or may have moved.</p>
        <Link className="button button-dark" to="/">Return home <ArrowRight size={17} /></Link>
      </main>
      <SiteFooter compact />
    </div>
  )
}
