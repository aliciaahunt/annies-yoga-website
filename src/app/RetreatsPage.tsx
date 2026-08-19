import { CalendarDays, MapPin, Phone } from 'lucide-react'
import RetreatJournalGallery, { type RetreatJournal } from '@/components/RetreatJournalGallery'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import { siteUrl } from '@/lib/siteUrl'

const retreatImagePath = '/images/retreats/santillan-july-2026'
const novemberRetreatImagePath = '/images/retreats/santillan-november-2025'
const irelandRetreatImagePath = '/images/retreats/ireland-retreats'

const retreatJournals: RetreatJournal[] = [
  {
    title: 'Summer at Santillán',
    location: 'Spain',
    dates: '5–11 July 2026',
    cover: `${retreatImagePath}/open-air-yoga-pavilion.jpg`,
    coverAlt: 'An open-air yoga class overlooking the Andalusian hills',
    description: 'Practice, shared tables and long summer days.',
    photos: [
      { src: `${retreatImagePath}/open-air-yoga-pavilion.jpg`, alt: 'A yoga class resting in the open-air pavilion at Santillán' },
      { src: `${retreatImagePath}/outdoor-group-practice.jpg`, alt: 'Retreat guests practising with yoga belts in the open-air pavilion overlooking the sea' },
      { src: `${retreatImagePath}/iyengar-practice.jpg`, alt: 'Annie guiding a student during an Iyengar yoga practice' },
      { src: `${retreatImagePath}/retreat-group.jpg`, alt: 'The July 2026 retreat group gathered in the open-air pavilion' },
      { src: '/images/retreat-lunch-spread.jpg', alt: 'A colourful spread of salads and shared dishes at Santillán Retreat' },
      { src: `${retreatImagePath}/santillan-villa.jpg`, alt: 'Santillán Retreat set among the Andalusian hills overlooking the sea' },
      { src: `${retreatImagePath}/dining-terrace.jpg`, alt: 'The shaded dining terrace at Santillán Retreat' },
      { src: `${retreatImagePath}/mediterranean-coast.jpg`, alt: 'Clear Mediterranean water on a retreat day out' },
    ],
  },
  {
    title: 'Autumn at Santillán',
    location: 'Spain',
    dates: '16–22 November 2025',
    cover: `${retreatImagePath}/santillan-villa.jpg`,
    coverAlt: 'Santillán Retreat set among the Andalusian hills overlooking the sea',
    description: 'Attentive practice, golden evenings and time together.',
    photos: [
      { src: `${novemberRetreatImagePath}/santillan-gardens.jpg`, alt: 'The landscaped gardens and fountains at Santillán Retreat' },
      { src: `${novemberRetreatImagePath}/quiet-yoga-studio.jpg`, alt: 'The Santillán yoga studio prepared for a quiet morning practice' },
      { src: `${novemberRetreatImagePath}/inversion-practice.jpg`, alt: 'Retreat guests practising supported inversions together in the yoga studio' },
      { src: `${novemberRetreatImagePath}/group-warrior-practice.jpg`, alt: 'The autumn retreat group practising Warrior pose together in the yoga studio' },
      { src: `${novemberRetreatImagePath}/guided-practice.jpg`, alt: 'Annie offering individual guidance during an Iyengar yoga class' },
      { src: `${novemberRetreatImagePath}/individual-guidance.jpg`, alt: 'Annie giving individual seated guidance to a retreat guest' },
      { src: `${novemberRetreatImagePath}/shared-dinner.jpg`, alt: 'The autumn retreat group gathered around the table for dinner' },
      { src: `${novemberRetreatImagePath}/sunset-practice.jpg`, alt: 'A retreat guest practising triangle pose as the sun sets over the hills' },
    ],
  },
  {
    title: 'Retreats in Ireland',
    location: 'Ireland',
    dates: 'Across the years',
    cover: `${irelandRetreatImagePath}/ards-friary-bay.jpg`,
    coverAlt: 'Annie and retreat guests practising together above a quiet Donegal bay',
    description: 'Restorative weekends at Ards Friary, the Waterfront Hotel and Drumalis.',
    photos: [
      { src: `${irelandRetreatImagePath}/ards-friary-bay.jpg`, alt: 'Annie and retreat guests sharing a light-hearted standing practice above a quiet Donegal bay' },
      { src: `${irelandRetreatImagePath}/chair-practice-wide.jpg`, alt: 'Retreat guests practising a supported standing pose with chairs' },
      { src: `${irelandRetreatImagePath}/retreat-community.jpg`, alt: 'Annie with a large group of retreat guests after their practice' },
      { src: `${irelandRetreatImagePath}/sheltered-donegal-beach.jpg`, alt: 'A quiet sandy beach sheltered by the green Donegal coastline' },
      { src: `${irelandRetreatImagePath}/coastal-yoga.jpg`, alt: 'A playful yoga practice with a puppy beside the Atlantic coast' },
      { src: `${irelandRetreatImagePath}/drumalis-retreat-group.jpg`, alt: 'Annie and retreat guests gathered together at Drumalis' },
      { src: `${irelandRetreatImagePath}/chair-practice.jpg`, alt: 'Retreat guests exploring a supported standing pose together' },
      { src: `${irelandRetreatImagePath}/rocky-donegal-cove.jpg`, alt: 'Clear water and a small sandy cove along the rocky Donegal coast' },
      { src: `${irelandRetreatImagePath}/coastal-walk.jpg`, alt: 'A group of retreat guests enjoying time outdoors among the dunes' },
      { src: `${irelandRetreatImagePath}/practice-group.jpg`, alt: 'A retreat group relaxing together at the end of a yoga session' },
    ],
  },
]

export default function RetreatsPage() {
  return (
    <div className="retreats-page">
      <SiteHeader />

      <main>
        <section className="retreats-hero">
          <img
            src={siteUrl(`${retreatImagePath}/open-air-yoga-pavilion.jpg`)}
            alt="A yoga class resting in the open-air pavilion at Santillán Retreat in Spain"
            fetchPriority="high"
          />
          <div className="retreats-hero-shade" aria-hidden="true" />
          <div className="retreats-hero-copy">
            <p className="eyebrow light">Ireland &amp; further afield</p>
            <h1>Yoga <em>retreats</em></h1>
            <p>Thoughtful practice, nourishing food and beautiful surroundings—with time to properly step away.</p>
          </div>
        </section>

        <section className="retreat-rhythm" aria-labelledby="retreat-rhythm-heading">
          <div className="section-shell retreat-rhythm-inner">
            <h2 id="retreat-rhythm-heading">A retreat with Annie</h2>
            <p>Iyengar practice <span aria-hidden="true">·</span> restorative places <span aria-hidden="true">·</span> nourishing meals <span aria-hidden="true">·</span> space to pause</p>
          </div>
        </section>

        <section className="retreats-upcoming" aria-labelledby="upcoming-retreats-heading">
          <div className="section-shell">
            <header className="retreats-section-heading">
              <p className="eyebrow">Now booking</p>
              <div>
                <h2 id="upcoming-retreats-heading">Upcoming <em>retreats.</em></h2>
                <p>Choose a restorative weekend close to home or a longer practice-led escape abroad.</p>
              </div>
            </header>

            <div className="retreat-cards">
              <article className="retreat-card retreat-card-featured">
                <div className="retreat-card-image" aria-hidden="true">
                  <img src={siteUrl(`${irelandRetreatImagePath}/ards-friary-bay.jpg`)} alt="" loading="lazy" />
                </div>
                <div className="retreat-card-topline"><span>Ireland</span><span>All inclusive</span></div>
                <div className="retreat-card-body">
                  <p className="retreat-card-date"><CalendarDays size={17} /><time dateTime="2026-08-21">21–23 August 2026</time></p>
                  <h3>Dromantine Retreat Centre</h3>
                  <p className="retreat-card-location"><MapPin size={16} /> Newry, Northern Ireland</p>
                  <dl>
                    <div><dt>Practice</dt><dd>10 hours of Iyengar yoga</dd></div>
                    <div><dt>Stay</dt><dd>Two nights, meals included</dd></div>
                    <div><dt>Price</dt><dd>£395 per person</dd></div>
                  </dl>
                </div>
                <a className="button button-dark" href="tel:+447716034570"><Phone size={17} /> Book with Annie</a>
              </article>

              <article className="retreat-card">
                <div className="retreat-card-image" aria-hidden="true">
                  <img src={siteUrl(`${novemberRetreatImagePath}/santillan-gardens.jpg`)} alt="" loading="lazy" />
                </div>
                <div className="retreat-card-topline"><span>Italy</span><span>Bookings open</span></div>
                <div className="retreat-card-body">
                  <p className="retreat-card-date"><CalendarDays size={17} /><time dateTime="2027-07-17">17–23 July 2027</time></p>
                  <h3>Locanda della Quercia Calante</h3>
                  <p className="retreat-card-location"><MapPin size={16} /> Umbria, Italy</p>
                  <p className="retreat-card-copy">A longer summer retreat shaped around daily practice, time outdoors and space to settle into a slower rhythm.</p>
                </div>
                <a className="button button-outline" href="tel:+447716034570"><Phone size={17} /> Ask Annie for details</a>
              </article>
            </div>
          </div>
        </section>

        <section className="retreat-journals" aria-labelledby="retreat-journals-heading">
          <div className="section-shell">
            <header className="retreats-section-heading">
              <p className="eyebrow">Past retreats</p>
              <div>
                <h2 id="retreat-journals-heading">Retreat <em>journals.</em></h2>
                <p>A small glimpse into the practice, places and people that shape each retreat.</p>
              </div>
            </header>
            <RetreatJournalGallery journals={retreatJournals} />
          </div>
        </section>

        <section className="retreats-enquiry">
          <div className="section-shell retreats-enquiry-grid">
            <div><p className="eyebrow">Plan your time away</p><h2>Come away<br /><em>with Annie.</em></h2></div>
            <div><p>Places can be booked directly with Annie. Call to check availability, ask about the retreat that suits you, or hear about future Ireland and overseas dates.</p><a className="button button-dark" href="tel:+447716034570"><Phone size={17} /> Call 07716 034570</a></div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
