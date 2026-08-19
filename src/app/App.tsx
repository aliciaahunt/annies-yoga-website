import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  MapPin,
  Phone,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import BotanicalLeaves from '@/components/BotanicalLeaves'
import TeacherCredentials from '@/components/TeacherCredentials'
import { siteUrl } from '@/lib/siteUrl'

export default function App() {
  return (
    <div className="site">
      <SiteHeader />

      <main>
        <section className="hero" id="home">
          <img src={siteUrl('/images/garden-yoga-pose.jpg')} alt="Annie practising yoga in a sunlit garden" />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow light">Yoga · Pilates · Retreats</p>
            <h1 className="home-title">Annie's Yoga</h1>
            <p>Welcoming classes in Strabane and Castlederg, created to help you find more ease in body and mind.</p>
            <Link className="hero-book-button" to="/schedule">
              Book a class <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        <section className="about-section about-section-first" id="about">
          <div className="section-shell about-grid">
            <div className="about-image-wrap">
              <img src={siteUrl('/images/annie-portrait.jpg')} alt="Annie sitting on a yoga mat in a bright studio" />
            </div>
            <div className="about-copy">
              <p className="eyebrow">Meet your teacher</p>
              <h2>Hi, I'm <em>Annie.</em></h2>
              <p className="large-copy">I've been teaching yoga for over 25 years and I love helping people feel stronger, more confident and more comfortable in their bodies.</p>
              <p>My classes in Strabane and Castlederg are friendly, supportive and open to everyone—whether you're completely new to yoga or have been practising for years.</p>
              <TeacherCredentials />
            </div>
          </div>
        </section>

        <section className="botanical-statement" aria-label="Yoga quotation by B.K.S. Iyengar">
          <BotanicalLeaves />
          <blockquote>
            <p>“It is through the alignment of the body that I discovered the alignment of my mind, self, and intelligence.”</p>
            <cite>B.K.S. Iyengar</cite>
          </blockquote>
        </section>

        <section className="booking-banner">
          <div>
            <p className="eyebrow light">Find your practice</p>
            <h2>See the weekly schedule</h2>
          </div>
          <Link className="button button-light" to="/schedule">Book a class <ArrowRight size={18} /></Link>
        </section>

        <section className="stories-section" id="retreats">
          <div className="section-shell">
            <div className="section-title-row">
              <div><p className="eyebrow">Explore</p><h2>A practice for <em>every season</em></h2></div>
              <p>Weekly movement, restorative moments and thoughtful escapes from the everyday.</p>
            </div>
            <div className="story-grid">
              {stories.map((story) => (
                <Link className="story-card" to={story.href} key={story.title}>
                  <img src={story.image} alt={story.alt} style={{ objectPosition: story.imagePosition }} />
                  <span>{story.kicker}</span>
                  <h3>{story.title}</h3>
                  <ArrowDownRight aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="welcome-section">
          <div className="section-shell welcome-grid">
            <p className="eyebrow">Your space to reset</p>
            <div>
              <h2>Come as you are.<br />Leave feeling <em>lighter.</em></h2>
              <p className="large-copy">Annie's Yoga is a warm, down-to-earth space for movement, rest and reconnection. Whether you are brand new or have practised for years, there is room for you here.</p>
              <Link className="text-link" to="/schedule">Find your class <ArrowRight size={17} /></Link>
            </div>
          </div>
        </section>

        <section className="closing-image-banner">
          <img
            src={siteUrl('/images/annie-yoga-with-dog.jpg')}
            alt="Annie practising downward-facing dog with a puppy beside the Donegal coast"
          />
        </section>

        <section className="contact-section" id="contact">
          <div className="section-shell contact-grid">
            <div><p className="eyebrow light">Start where you are</p><h2>Ready to make space <em>for yourself?</em></h2></div>
            <div className="contact-actions">
              <a href="tel:+447716034570"><Phone /><span><small>Call Annie</small>07716 034570</span></a>
              <Link to="/schedule"><CalendarDays /><span><small>Find a class</small>View the timetable</span></Link>
              <p><MapPin /><span><small>Find us</small>Strabane & Castlederg</span></p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

const stories = [
  { kicker: 'Move together', title: 'Weekly classes', image: siteUrl('/images/weekly-class-triangle.jpg'), imagePosition: '78% center', alt: 'A close group of students practising triangle pose together in Annie’s studio', href: '/schedule' },
  { kicker: 'Step away', title: 'Retreats', image: siteUrl('/images/retreat-garden.jpg'), imagePosition: 'center', alt: 'A green and peaceful retreat garden', href: '/retreats' },
  { kicker: 'Made for you', title: 'Private classes', image: siteUrl('/images/private-class-guidance.jpg'), imagePosition: 'center', alt: 'Annie giving close individual guidance to a student in a supported backbend', href: '/private-classes' },
]
