import { ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import { siteUrl } from '@/lib/siteUrl'

export default function GiftCardsPage() {
  return (
    <div className="gift-cards-page">
      <SiteHeader />

      <main>
        <section className="gift-cards-hero">
          <img
            src={siteUrl('/images/garden-class-mats.jpg')}
            alt="Yoga mats arranged in a peaceful garden"
          />
          <div className="gift-cards-hero-shade" aria-hidden="true" />
          <div className="gift-cards-hero-copy">
            <p className="eyebrow light">A thoughtful gift</p>
            <h1>Give someone space<br />to move and <em>breathe.</em></h1>
            <p>Ask Annie about a gift card for yoga and Pilates.</p>
            <a className="button button-light" href="tel:+447716034570">
              Ask about gift cards <Phone size={17} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="gift-cards-details">
          <div className="section-shell gift-cards-details-grid">
            <p className="eyebrow">Give the gift of movement</p>
            <div>
              <h2>A little time<br /><em>for themselves.</em></h2>
              <p className="large-copy">
                Annie’s Yoga is a warm, down-to-earth space for movement, rest and reconnection.
                A gift card is a thoughtful way to invite someone to experience it for themselves.
              </p>
              <p>
                Gift cards are currently arranged directly with Annie. Call to talk through what you
                are looking for and ask any questions before you choose.
              </p>
            </div>
          </div>
        </section>

        <section className="gift-cards-contact">
          <div className="section-shell gift-cards-contact-grid">
            <div>
              <p className="eyebrow light">Arrange a gift card</p>
              <h2>Talk to <em>Annie.</em></h2>
            </div>
            <div>
              <p>Call Annie directly to arrange your gift card.</p>
              <a className="button button-light" href="tel:+447716034570">
                Call 07716 034570 <Phone size={17} aria-hidden="true" />
              </a>
              <Link className="gift-cards-secondary-link" to="/contact">
                See all contact details <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
