import { CalendarDays, MapPin, Phone } from 'lucide-react'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import { siteUrl } from '@/lib/siteUrl'

const retreatMoments = [
  { src: siteUrl('/images/retreat-class.jpg'), alt: 'A peaceful group yoga class on retreat' },
  { src: siteUrl('/images/retreat-lunch-spread.jpg'), alt: 'A colourful shared lunch on retreat' },
  { src: siteUrl('/images/ireland-retreat-beach-panorama.jpg'), alt: 'A wide, quiet beach on the Irish coast' },
]

export default function RetreatsPage() {
  return (
    <div className="retreats-page">
      <SiteHeader />

      <main>
        <section className="retreats-hero">
          <img src={siteUrl('/images/ireland-retreat-beach-aerial.jpg')} alt="A beautiful coastal landscape beside an Annie's Yoga retreat" />
          <div className="retreats-hero-shade" aria-hidden="true" />
          <div className="retreats-hero-copy">
            <p className="eyebrow light">Time to breathe</p>
            <h1>Yoga <em>retreats</em></h1>
            <p>Step away from the everyday for thoughtful movement, nourishing food and plenty of room to rest.</p>
          </div>
        </section>

        <section className="retreats-intro">
          <div className="section-shell retreats-intro-grid">
            <p className="eyebrow">A gentler pace</p>
            <div>
              <h2>Space to move, rest<br />and <em>reconnect.</em></h2>
              <p className="large-copy">Annie's retreats bring people together in beautiful places for yoga, Pilates, good food and unhurried time away.</p>
              <p>Each retreat is welcoming and down to earth. Come on your own or with a friend, and take part at a pace that feels right for you.</p>
            </div>
          </div>
        </section>

        <section className="retreats-feature">
          <img src={siteUrl('/images/santillan-retreat-villa.jpg')} alt="The peaceful villa and pool at a yoga retreat" />
          <div>
            <p className="eyebrow light">What to expect</p>
            <h2>A little more room<br />for <em>yourself.</em></h2>
            <ul>
              <li><CalendarDays /> Daily yoga and Pilates sessions</li>
              <li><MapPin /> Beautiful, restorative surroundings</li>
              <li><span aria-hidden="true">✦</span> Nourishing meals and time to unwind</li>
            </ul>
          </div>
        </section>

        <section className="retreats-gallery section-shell" aria-label="Moments from Annie's retreats">
          {retreatMoments.map((moment) => <img key={moment.src} src={moment.src} alt={moment.alt} />)}
        </section>

        <section className="retreats-enquiry">
          <div className="section-shell retreats-enquiry-grid">
            <div><p className="eyebrow">Upcoming retreats</p><h2>Come away<br /><em>with Annie.</em></h2></div>
            <div><p>New retreat dates and destinations are shared as soon as they are confirmed. Call Annie to ask what is coming up or to register your interest.</p><a className="button button-dark" href="tel:+447716034570"><Phone size={17} /> Call 07716 034570</a></div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
