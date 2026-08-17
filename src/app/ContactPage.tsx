import { CalendarDays, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'

export default function ContactPage() {
  return (
    <div className="contact-page">
      <SiteHeader />

      <main>
        <section className="contact-page-hero">
          <div className="section-shell contact-page-hero-grid">
            <div>
              <p className="eyebrow light">Start where you are</p>
              <h1>Get in touch<br /><em>with Annie.</em></h1>
            </div>
            <p>
              Whether you need help choosing a class or want to ask about private sessions, retreats
              or gift cards, Annie would love to hear from you.
            </p>
          </div>
        </section>

        <section className="contact-page-options" aria-labelledby="contact-options-heading">
          <div className="section-shell">
            <p className="eyebrow">Let’s talk</p>
            <h2 id="contact-options-heading">How can Annie <em>help?</em></h2>
            <div className="contact-page-options-grid">
              <article>
                <Phone aria-hidden="true" />
                <h3>Call Annie</h3>
                <p>Have a friendly conversation about what you are looking for.</p>
                <a className="text-link" href="tel:+447716034570">07716 034570</a>
              </article>
              <article>
                <Mail aria-hidden="true" />
                <h3>Email Annie</h3>
                <p>Send Annie a message and she will get back to you as soon as she can.</p>
                <a className="text-link" href="mailto:anniesyoga@yahoo.ie">anniesyoga@yahoo.ie</a>
              </article>
              <article>
                <CalendarDays aria-hidden="true" />
                <h3>Find a class</h3>
                <p>View the weekly timetable and choose a class that feels right for you.</p>
                <Link className="text-link" to="/schedule">View the timetable</Link>
              </article>
              <article>
                <MapPin aria-hidden="true" />
                <h3>Where to find us</h3>
                <p>Annie’s classes take place in Strabane and Castlederg.</p>
                <span className="contact-page-location">Strabane &amp; Castlederg</span>
              </article>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
