import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import BotanicalLeaves from '@/components/BotanicalLeaves'
import FeatureCard from '@/components/FeatureCard'
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
            <h2>See the weekly schedule</h2>
          </div>
          <Link className="button button-light" to="/schedule">Book a class <ArrowRight size={18} /></Link>
        </section>

        <section className="stories-section" id="retreats">
          <div className="section-shell">
            <div className="section-title-row">
              <div><h2>A practice for <em>every season</em></h2></div>
            </div>
            <div className="retreat-journal-cards offering-cards">
              {stories.map((story) => (
                <FeatureCard
                  action={{ icon: <ArrowRight size={17} aria-hidden="true" />, label: story.action }}
                  details={[
                    { icon: <MapPin size={17} aria-hidden="true" />, text: story.location },
                  ]}
                  image={story.image}
                  imageAlt={story.alt}
                  imagePosition={story.imagePosition}
                  key={story.title}
                  title={story.title}
                  to={story.href}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="closing-image-banner">
          <img
            src={siteUrl('/images/annie-yoga-with-dog.jpg')}
            alt="Annie practising downward-facing dog with a puppy beside the Donegal coast"
          />
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}

const stories = [
  { title: 'Weekly classes', image: '/images/weekly-class-triangle.jpg', imagePosition: '78% center', alt: 'A close group of students practising triangle pose together in Annie’s studio', location: 'Strabane & Castlederg', action: 'View classes', href: '/schedule' },
  { title: 'Retreats', image: '/images/retreats/santillan-july-2026/open-air-yoga-pavilion.jpg', imagePosition: 'center', alt: 'Annie seated while retreat guests rest together in the open-air yoga pavilion at Santillan', location: 'Ireland & abroad', action: 'Explore retreats', href: '/retreats' },
  { title: 'Private classes', image: '/images/private-class-guidance.jpg', imagePosition: 'center', alt: 'Annie giving close individual guidance to a student in a supported backbend', location: 'Personalised support', action: 'Discover private classes', href: '/private-classes' },
]
