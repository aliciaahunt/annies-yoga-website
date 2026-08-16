import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  Gift,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  X,
} from 'lucide-react'
import { useState } from 'react'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site">
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-flourish" aria-hidden="true">✦</span>
          <span>Annie's Yoga</span>
        </a>
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
        <nav
          className={`site-nav${menuOpen ? ' is-open' : ''}`}
          id="site-navigation"
          aria-label="Main navigation"
        >
          <a href="/schedule" onClick={closeMenu}>Classes</a>
          <a href="#retreats" onClick={closeMenu}>Retreats</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#gift-cards" onClick={closeMenu}>Gift cards</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-cta" href="/schedule" onClick={closeMenu}>
            Book a class <ArrowDownRight size={16} />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <img src="/images/garden-yoga-pose.jpg" alt="Annie practising yoga in a sunlit garden" />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow light">Yoga · Pilates · Retreats</p>
            <h1>Move gently.<br /><em>Feel deeply.</em></h1>
            <p>Welcoming classes in Strabane and Castlederg, created to help you find more ease in body and mind.</p>
            <a className="circle-link" href="/schedule" aria-label="Explore Annie's classes">
              <ArrowDownRight />
            </a>
          </div>
        </section>

        <section className="welcome-section">
          <div className="section-shell welcome-grid">
            <p className="eyebrow">Your space to reset</p>
            <div>
              <h2>Come as you are.<br />Leave feeling <em>lighter.</em></h2>
              <p className="large-copy">Annie's Yoga is a warm, down-to-earth space for movement, rest and reconnection. Whether you are brand new or have practised for years, there is room for you here.</p>
              <a className="text-link" href="#about">Meet Annie <ArrowRight size={17} /></a>
            </div>
          </div>
        </section>

        <section className="botanical-statement" aria-label="Annie's approach to yoga">
          <BotanicalLeaves />
          <p>Yoga isn't about perfect poses.<br />It's about how you <em>feel.</em></p>
        </section>

        <section className="booking-banner">
          <div>
            <p className="eyebrow light">Find your practice</p>
            <h2>See the weekly schedule</h2>
          </div>
          <a className="button button-light" href="/schedule">Book a class <ArrowRight size={18} /></a>
        </section>

        <section className="stories-section" id="retreats">
          <div className="section-shell">
            <div className="section-title-row">
              <div><p className="eyebrow">Explore</p><h2>A practice for <em>every season</em></h2></div>
              <p>Weekly movement, restorative moments and thoughtful escapes from the everyday.</p>
            </div>
            <div className="story-grid">
              {stories.map((story) => (
                <a className="story-card" href={story.href} key={story.title}>
                  <img src={story.image} alt={story.alt} />
                  <span>{story.kicker}</span>
                  <h3>{story.title}</h3>
                  <ArrowDownRight aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="feature-pair" id="gift-cards">
          <article className="feature-card gift-card">
            <Gift size={28} />
            <p className="eyebrow">Give a little calm</p>
            <h2>Gift cards</h2>
            <p>A thoughtful gift for someone who could use time to move, breathe and reset.</p>
            <a className="button button-dark" href="tel:+447716034570">Ask Annie <ArrowRight size={18} /></a>
          </article>
          <article className="feature-card private-card">
            <Sparkles size={28} />
            <p className="eyebrow light">Made for you</p>
            <h2>Private sessions</h2>
            <p>One-to-one and group sessions, sports recovery, yoga for MS, anxiety and schools.</p>
            <a className="button button-light" href="tel:+447716034570">Enquire <ArrowRight size={18} /></a>
          </article>
        </section>

        <section className="about-section" id="about">
          <div className="section-shell about-grid">
            <div className="about-image-wrap">
              <img src="/images/annie-portrait.jpg" alt="Annie sitting on a yoga mat in a bright studio" />
              <span>Move · Breathe · Be</span>
            </div>
            <div className="about-copy">
              <p className="eyebrow">Meet your teacher</p>
              <h2>Hi, I'm <em>Annie.</em></h2>
              <p className="large-copy">I believe movement should feel supportive, never intimidating. My classes are clear, friendly and grounded in helping you feel better in your own body.</p>
              <p>From weekly yoga and Pilates to restorative sessions and sun-filled retreats, every offering is an invitation to slow down and reconnect.</p>
              <a className="text-link" href="tel:+447716034570">Get in touch <ArrowRight size={17} /></a>
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
              <a href="/schedule"><CalendarDays /><span><small>Find a class</small>View the timetable</span></a>
              <p><MapPin /><span><small>Find us</small>Strabane & Castlederg</span></p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><span>Annie's Yoga</span><p>Movement for real life.</p></div>
        <div><h3>Explore</h3><a href="/schedule">Classes</a><a href="#retreats">Retreats</a><a href="#about">About Annie</a></div>
        <div><h3>Useful</h3><a href="#gift-cards">Gift cards</a><a href="/schedule">Schedule</a><a href="#contact">Contact</a></div>
        <div><h3>Visit</h3><p>Strabane & Castlederg<br />Northern Ireland</p><a href="tel:+447716034570">07716 034570</a></div>
        <p className="copyright">© {new Date().getFullYear()} Annie's Yoga</p>
      </footer>
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
  { kicker: 'Move together', title: 'Weekly classes', image: '/images/studio-yoga-class.jpg', alt: 'A yoga class practising together in a studio', href: '/schedule' },
  { kicker: 'Step away', title: 'Retreats', image: '/images/retreat-garden.jpg', alt: 'A green and peaceful retreat garden', href: '#retreats' },
  { kicker: 'A little more ease', title: 'Rest & restore', image: '/images/studio-seated-yoga.jpg', alt: 'A seated yoga class moving gently together', href: '#contact' },
]

const gallery = [
  { src: '/images/garden-class-mats.jpg', alt: 'Yoga mats ready for an outdoor class' },
  { src: '/images/class-group-smiling.jpg', alt: 'A smiling yoga class together' },
  { src: '/images/retreat-lunch-spread.jpg', alt: 'A colourful lunch at a yoga retreat' },
  { src: '/images/ireland-retreat-beach-panorama.jpg', alt: 'A wide beach beside the sea in Ireland' },
]
