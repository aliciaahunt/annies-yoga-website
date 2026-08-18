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
            <h1 className="home-title">Stronger in body.<br /><em>Calmer in mind.</em></h1>
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
              <p className="large-copy">I believe movement should feel supportive, never intimidating. My classes are clear, friendly and grounded in helping you feel better in your own body.</p>
              <p>From weekly yoga and Pilates to restorative sessions and sun-filled retreats, every offering is an invitation to slow down and reconnect.</p>
              <Link className="text-link" to="/about">Meet Annie <ArrowRight size={17} /></Link>
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
                  <img src={story.image} alt={story.alt} />
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

        <section className="gallery-strip" aria-label="Life at Annie's Yoga">
          {gallery.map((photo) => <img key={photo.src} src={photo.src} alt={photo.alt} />)}
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

function BotanicalLeaves() {
  return (
    <svg className="botanical-leaves" viewBox="0 0 1200 520" aria-hidden="true">
      <g className="leaf-branch branch-one"><path d="M92 520C104 369 171 211 326 51" /><path d="M158 360C105 330 75 285 64 231M194 292C248 264 279 221 287 169M123 428C76 405 51 370 39 331" /><ellipse cx="68" cy="227" rx="20" ry="56" transform="rotate(-38 68 227)" /><ellipse cx="290" cy="166" rx="20" ry="58" transform="rotate(40 290 166)" /><ellipse cx="38" cy="328" rx="18" ry="50" transform="rotate(-40 38 328)" /></g>
      <g className="leaf-branch branch-two"><path d="M1120 520C1104 365 1038 216 886 55" /><path d="M1053 356C1104 326 1135 281 1145 227M1017 289C962 260 933 216 925 165M1088 427C1135 402 1161 367 1171 327" /><ellipse cx="1143" cy="224" rx="20" ry="56" transform="rotate(38 1143 224)" /><ellipse cx="922" cy="162" rx="20" ry="58" transform="rotate(-40 922 162)" /><ellipse cx="1172" cy="324" rx="18" ry="50" transform="rotate(40 1172 324)" /></g>
    </svg>
  )
}

const stories = [
  { kicker: 'Move together', title: 'Weekly classes', image: siteUrl('/images/studio-yoga-class.jpg'), alt: 'A yoga class practising together in a studio', href: '/schedule' },
  { kicker: 'Step away', title: 'Retreats', image: siteUrl('/images/retreat-garden.jpg'), alt: 'A green and peaceful retreat garden', href: '/retreats' },
  { kicker: 'Made for you', title: 'Private classes', image: siteUrl('/images/studio-seated-yoga.jpg'), alt: 'A seated yoga class moving gently together', href: '/private-classes' },
]

const gallery = [
  { src: siteUrl('/images/garden-class-mats.jpg'), alt: 'Yoga mats ready for an outdoor class' },
  { src: siteUrl('/images/class-group-smiling.jpg'), alt: 'A smiling yoga class together' },
  { src: siteUrl('/images/retreat-lunch-spread.jpg'), alt: 'A colourful lunch at a yoga retreat' },
  { src: siteUrl('/images/ireland-retreat-beach-panorama.jpg'), alt: 'A wide beach beside the sea in Ireland' },
]
