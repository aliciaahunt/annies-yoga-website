import { useRef } from 'react'
import { CalendarDays, Images, Mail, MapPin } from 'lucide-react'
import EnquiryDialog, { type EnquiryDialogHandle } from '@/components/EnquiryDialog'
import RetreatPhotoGallery, { type RetreatPhotoGalleryData, type RetreatPhotoGalleryHandle } from '@/components/RetreatPhotoGallery'
import RetreatJournalGallery, { type RetreatJournal } from '@/components/RetreatJournalGallery'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import { siteUrl } from '@/lib/siteUrl'

const retreatImagePath = '/images/retreats/santillan-july-2026'
const novemberRetreatImagePath = '/images/retreats/santillan-november-2025'
const irelandRetreatImagePath = '/images/retreats/ireland-retreats'

const upcomingRetreatGalleries: Record<string, RetreatPhotoGalleryData> = {
  dromantine: {
    title: 'Dromantine Retreat Centre',
    meta: 'A glimpse of retreat life with Annie · Ireland',
    photos: [
      { src: `${irelandRetreatImagePath}/ards-friary-bay.jpg`, alt: 'Annie and retreat guests practising together above a quiet Irish bay' },
      { src: `${irelandRetreatImagePath}/chair-practice-wide.jpg`, alt: 'Retreat guests sharing a supported standing practice with chairs' },
      { src: `${irelandRetreatImagePath}/retreat-community.jpg`, alt: 'Annie with a community of retreat guests after practice' },
      { src: `${irelandRetreatImagePath}/coastal-walk.jpg`, alt: 'Retreat guests enjoying time together outdoors' },
    ],
  },
}

const retreatJournals: RetreatJournal[] = [
  {
    title: 'Summer at Santillán',
    location: 'Spain',
    dates: '5–11 July 2026',
    cover: `${retreatImagePath}/outdoor-group-practice.jpg`,
    coverAlt: 'Retreat guests lying down with their legs raised during an open-air yoga practice',
    photos: [
      { src: `${retreatImagePath}/open-air-yoga-pavilion.jpg`, alt: 'A yoga class resting in the open-air pavilion at Santillán' },
      { src: `${retreatImagePath}/annie-seated-meditation.jpg`, alt: 'Annie seated quietly with eyes closed at the beginning of a retreat practice' },
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
    photos: [
      { src: `${novemberRetreatImagePath}/santillan-gardens.jpg`, alt: 'The landscaped gardens and fountains at Santillán Retreat' },
      { src: `${novemberRetreatImagePath}/outdoor-downward-dog.jpg`, alt: 'Annie practising downward-facing dog in a sunny open-air pavilion at Santillán' },
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
    photos: [
      { src: `${irelandRetreatImagePath}/ards-friary-bay.jpg`, alt: 'Annie and retreat guests sharing a light-hearted standing practice above a quiet Donegal bay' },
      { src: `${irelandRetreatImagePath}/annie-beach-side-angle-pose.jpg`, alt: 'Annie practising extended side angle pose on a sandy beach beside turquoise water' },
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
  const enquiryDialogRef = useRef<EnquiryDialogHandle>(null)
  const photoGalleryRef = useRef<RetreatPhotoGalleryHandle>(null)

  return (
    <div className="retreats-page">
      <SiteHeader />

      <main>
        <EnquiryDialog ref={enquiryDialogRef} />
        <RetreatPhotoGallery ref={photoGalleryRef} />
        <section className="retreats-hero">
          <img
            src={siteUrl(`${retreatImagePath}/open-air-yoga-pavilion.jpg`)}
            alt="A yoga class resting in the open-air pavilion at Santillán Retreat in Spain"
            fetchPriority="high"
          />
          <div className="retreats-hero-shade" aria-hidden="true" />
          <div className="retreats-hero-copy">
            <h1>Yoga <em>retreats</em></h1>
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
              <div>
                <h2 id="upcoming-retreats-heading">Upcoming <em>retreats.</em></h2>
                <p>Choose a restorative weekend close to home or a longer practice-led escape abroad.</p>
              </div>
            </header>

            <div className="retreat-cards">
              <article className="retreat-card lift-card">
                <button aria-label="View photos from Dromantine Retreat Centre" className="retreat-card-image" onClick={() => photoGalleryRef.current?.open(upcomingRetreatGalleries.dromantine)} type="button">
                  <img src={siteUrl('/images/retreats/upcoming/dromantine-retreat-centre.png')} alt="Dromantine Retreat Centre overlooking its lake and autumn parkland" loading="lazy" />
                  <span><Images size={16} aria-hidden="true" /> View 4 photos</span>
                </button>
                <div className="retreat-card-topline"><span>Bookings open</span></div>
                <div className="retreat-card-body">
                  <h3>Dromantine Retreat <span>Centre</span></h3>
                  <div className="retreat-card-meta">
                    <p className="retreat-card-date"><CalendarDays size={17} aria-hidden="true" /><time dateTime="2026-08-21">21–23 August 2026</time></p>
                    <p className="retreat-card-location"><MapPin size={17} aria-hidden="true" /> Newry, Northern Ireland</p>
                  </div>
                  <ul className="retreat-card-details">
                    <li>10 hours of Iyengar yoga</li>
                    <li>Two nights’ ensuite accommodation</li>
                    <li>Breakfast, lunch and dinner included</li>
                    <li>Vegetarian meals, with dietary needs accommodated</li>
                    <li>£395 per person</li>
                    <li>Travel to Dromantine not included</li>
                  </ul>
                </div>
                <button className="button button-dark" onClick={() => enquiryDialogRef.current?.open({ enquiryType: 'Retreats', subject: 'Dromantine Retreat Centre' })} type="button"><Mail size={17} /> Book with Annie</button>
              </article>

            </div>
          </div>
        </section>

        <section className="retreat-journals" aria-labelledby="retreat-journals-heading">
          <div className="section-shell">
            <header className="retreats-section-heading">
              <div>
                <h2 id="retreat-journals-heading">Past <em>Retreats</em></h2>
                <p>A small glimpse into the practice, places and people that shape each retreat.</p>
              </div>
            </header>
            <RetreatJournalGallery journals={retreatJournals} />
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}
