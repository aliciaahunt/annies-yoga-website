import { ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import TeacherCredentials from '@/components/TeacherCredentials'
import { siteUrl } from '@/lib/siteUrl'

export default function AboutPage() {
  return (
    <div className="about-page">
      <SiteHeader />

      <main>
        <section className="about-page-hero">
          <div className="section-shell about-page-hero-grid">
            <div className="about-page-portrait">
              <img
                src={siteUrl('/images/annie-portrait.jpg')}
                alt="Annie sitting on a yoga mat in a bright studio"
              />
            </div>
            <div className="about-page-intro">
              <p className="eyebrow">Meet your teacher</p>
              <h1>Hi, I’m <em>Annie.</em></h1>
              <p className="large-copy">
                I’ve been teaching yoga for over 25 years and I’m a qualified Level 2 Iyengar Yoga teacher,
                with additional training in STOTT Pilates and specialist areas of practice.
              </p>
              <p>
                I love helping people feel stronger, more confident and more comfortable in their
                bodies. My classes are friendly, supportive and open to everyone—whether you’re
                completely new to yoga or have been practising for years.
              </p>
              <TeacherCredentials />
            </div>
          </div>
        </section>

        <section className="about-page-approach">
          <div className="section-shell about-page-approach-grid">
            <p className="eyebrow light">Annie’s approach</p>
            <div>
              <h2>Movement for <em>real life.</em></h2>
              <p className="large-copy">
                From weekly yoga and Pilates to restorative sessions and sun-filled retreats, every
                offering is an invitation to slow down and reconnect.
              </p>
              <p>
                Whether you are brand new or have practised for years, there is room for you here.
                Come as you are and move at a pace that feels right for you.
              </p>
            </div>
          </div>
        </section>

        <section className="about-page-next-step">
          <div className="section-shell about-page-next-step-grid">
            <div>
              <p className="eyebrow">Find your practice</p>
              <h2>Ready to move <em>with Annie?</em></h2>
            </div>
            <div>
              <p>Explore the weekly timetable or get in touch if you would like help choosing a class.</p>
              <div className="about-page-actions">
                <Link className="button button-dark" to="/schedule">
                  View classes <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a className="text-link" href="tel:+447716034570">
                  Call Annie <Phone size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
