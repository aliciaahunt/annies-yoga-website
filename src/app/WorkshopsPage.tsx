import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import { useState } from 'react'
import { autumnWorkshop, workshopDate } from './workshopsData'
import ClassReservationDialog, { type SelectedClass } from '@/components/ClassReservationDialog'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import { siteUrl } from '@/lib/siteUrl'

const eventStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: autumnWorkshop.name,
  startDate: '2026-10-24T10:00:00+01:00',
  endDate: '2026-10-24T16:00:00+01:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  description: autumnWorkshop.description,
  location: {
    '@type': 'Place',
    name: "Annie's Yoga",
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Christ Church, 22 Bowling Grn',
      addressLocality: 'Strabane',
      postalCode: 'BT82 8BW',
      addressCountry: 'GB',
    },
  },
  organizer: { '@type': 'Organization', name: "Annie's Yoga", url: 'https://anniesyoga.uk/' },
  performer: [
    { '@type': 'Person', name: 'Aisling Guirke' },
    { '@type': 'Person', name: 'Annie McGowan' },
  ],
  offers: {
    '@type': 'Offer',
    url: 'https://anniesyoga.uk/workshops',
    price: autumnWorkshop.price,
    priceCurrency: 'GBP',
    availability: 'https://schema.org/InStock',
  },
}

export default function WorkshopsPage() {
  const [selectedClass, setSelectedClass] = useState<SelectedClass | null>(null)

  const requestPlace = () => setSelectedClass({ ...autumnWorkshop, date: workshopDate(autumnWorkshop) })

  return (
    <div className="workshops-page">
      <SiteHeader />

      <main>
        <section className="retreats-hero workshops-hero" aria-label="Yoga workshops introduction">
          <img
            src={siteUrl('/images/wall-yoga-class.jpg')}
            alt="An Iyengar yoga class turning toward the studio wall"
            fetchPriority="high"
          />
          <div className="retreats-hero-shade" aria-hidden="true" />
          <div className="retreats-hero-copy">
            <h1>Yoga <em>workshops</em></h1>
          </div>
        </section>

        <section className="retreat-rhythm" aria-labelledby="workshop-rhythm-heading">
          <div className="section-shell retreat-rhythm-inner">
            <h2 id="workshop-rhythm-heading">A day to deepen your practice</h2>
            <p>Workshops offer more time than a weekly class to explore poses in detail, ask questions and receive thoughtful, individual guidance.</p>
          </div>
        </section>

        <section className="retreats-upcoming workshops-upcoming" aria-labelledby="upcoming-workshops-heading">
          <div className="section-shell">
            <header className="retreats-section-heading">
              <div>
                <h2 id="upcoming-workshops-heading">Upcoming <em>workshops.</em></h2>
              </div>
            </header>

            <div className="retreat-cards workshop-cards">
              <article className="retreat-card lift-card workshop-card workshop-card-featured">
                <button className="retreat-card-image" type="button" onClick={requestPlace} aria-label={`View details for ${autumnWorkshop.name}`}>
                  <img src={siteUrl('/images/aisling-guirke-workshop.jpg')} alt="Aisling Guirke guiding students during an Iyengar yoga workshop" loading="lazy" />
                  <span>View workshop <ArrowRight size={16} aria-hidden="true" /></span>
                </button>
                <div className="retreat-card-topline"><span>Bookings open</span></div>
                <div className="workshop-card-content">
                  <div className="retreat-card-body">
                    <p className="workshop-teacher-qualification">{autumnWorkshop.teacherQualification}</p>
                    <h3>{autumnWorkshop.name}</h3>
                    <p className="workshop-teacher-introduction">{autumnWorkshop.teacherIntroduction}</p>
                    <div className="retreat-card-meta">
                      <p className="retreat-card-date"><CalendarDays size={17} aria-hidden="true" /><time dateTime={autumnWorkshop.eventDate}>{autumnWorkshop.displayDate}</time></p>
                      <p className="retreat-card-location"><MapPin size={17} aria-hidden="true" />{autumnWorkshop.address.join(', ')}</p>
                    </div>
                    <ul className="retreat-card-details">
                      <li>{autumnWorkshop.level}</li>
                      <li>{autumnWorkshop.time}, with morning and afternoon practice</li>
                      <li>Guided by Aisling and Annie</li>
                      <li>Drinks and light refreshments included.</li>
                      <li>Please bring your own lunch.</li>
                      <li>£{autumnWorkshop.price} per person</li>
                      <li>Payment is required at the time of booking. Please contact Annie to arrange your preferred payment method.</li>
                    </ul>
                  </div>
                  <button className="button button-dark" type="button" onClick={requestPlace}>
                    Request a place <ArrowRight size={17} aria-hidden="true" />
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }} />
      {selectedClass && <ClassReservationDialog selectedClass={selectedClass} onClose={() => setSelectedClass(null)} />}
    </div>
  )
}
