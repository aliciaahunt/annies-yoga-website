import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import EnquiryDialog, { type EnquiryDialogHandle } from '@/components/EnquiryDialog'
import { locandaImagePath } from '@/app/locandaRetreatData'
import { siteUrl } from '@/lib/siteUrl'

export default function ItalyRetreatPage() {
  const enquiry = useRef<EnquiryDialogHandle>(null)
  const book = () => enquiry.current?.open({ enquiryType: 'Retreats', subject: 'Locanda, Italy retreat — 17–23 July 2027' })
  const photo = (file: string) => siteUrl(`${locandaImagePath}/${file}.jpg`)

  return (
    <div className="italy-page">
      <SiteHeader />
      <main>
        <EnquiryDialog ref={enquiry} />
        <section className="italy-hero">
          <img src={photo('house')} alt="Locanda’s stone house and garden terrace in the evening light" fetchPriority="high" />
          <div className="italy-hero-content section-shell">
            <Link className="italy-back" to="/retreats"><ArrowLeft size={16} /> All retreats</Link>
            <p className="italy-eyebrow">17–23 July 2027 · Locanda, Italy</p>
            <h1>A little space.<br /><em>A summer in Italy.</em></h1>
          </div>
        </section>

        <section className="italy-stay section-shell" aria-labelledby="italy-stay-heading">
          <header><p className="italy-eyebrow">Beyond the mat</p><h2 id="italy-stay-heading">Make yourself <em>at home.</em></h2></header>
          <div className="italy-stay-grid">
            <article><img src={photo('yoga-classes')} alt="Locanda’s wooden-beamed yoga studio set up with mats, bolsters and wall ropes" loading="lazy" /><h3>Yoga with Annie</h3><p>Enjoy 25 hours of yoga with Annie. Practise in two fully equipped indoor yoga studios or the outdoor pavilion, each with views over the gardens.</p></article>
            <article><img src={photo('meals-together')} alt="Trays of pizza topped with tomatoes, mozzarella and fresh basil" loading="lazy" /><h3>Meals together</h3><p>Enjoy Italian cuisine made with fresh, local and organic ingredients, with three meals each day included in your stay. Vegan and vegetarian options, along with other dietary requirements, can be catered for on request.</p></article>
            <article><img src={photo('relaxing-venue')} alt="A stone path beneath climbing plants and purple flowers leading to Locanda’s pool" loading="lazy" /><h3>Time to relax</h3><p>Spend your free time by the pool or find a quiet spot in the gardens.</p></article>
          </div>
        </section>

        <section className="italy-booking" id="rooms" aria-labelledby="italy-rooms-heading">
          <div className="italy-rooms-layout section-shell">
            <img className="italy-room-photo" src={photo('shared-bedroom')} alt="Twin beds in a Locanda bedroom with exposed wooden beams" loading="lazy" />
            <div>
              <header><h2 id="italy-rooms-heading">Rooms &amp; prices</h2><p>All rooms are en-suite and feature air conditioning.</p></header>
              <dl className="italy-room-prices">
                {[['Triple room', '€1,250'], ['Twin room', '€1,350'], ['Single room', '€1,750']].map(([title, price]) => (
                  <div key={title}><dt>{title}</dt><dd>{price}</dd></div>
                ))}
              </dl>
              <p className="italy-price-note">Prices per person for the retreat.</p>
              <div className="italy-booking-action">
                <p>A non-refundable €250 deposit secures your booking.</p>
                <button className="button button-dark" type="button" onClick={book}>Book with Annie <ArrowRight size={17} /></button>
                <a className="italy-payment-link" href="#italy-payment-details" onClick={() => { document.querySelector<HTMLDetailsElement>('#italy-payment-details')?.setAttribute('open', '') }}>View payment details</a>
              </div>
            </div>
          </div>
        </section>

        <section className="italy-questions section-shell" aria-labelledby="italy-questions-heading">
          <div><p className="italy-eyebrow">Before you come</p><h2 id="italy-questions-heading">A few practical<br /><em>details.</em></h2></div>
          <div>
            <details><summary>What will the yoga programme be like?</summary><p>Contact Annie for the planned programme and to discuss your yoga experience, access needs or any questions about taking part.</p></details>
            <details><summary>Can I discuss dietary requirements?</summary><p>Three meals per day are included. Please let Annie know about any dietary requirements before booking so she can check these with the venue.</p></details>
            <details><summary>What is there to explore in the area?</summary><p>In your free time, explore Orvieto or the striking hilltop village of Civita di Bagnoregio. For a relaxing day out, discover the thermal springs of San Casciano dei Bagni or the historic stone pools of Bagno Vignoni.</p></details>
            <details><summary>Are there treatments available at Locanda?</summary><p>A range of massages and holistic therapies are available to book during your stay. Treatments are charged separately and are not included in the retreat price. Ask Annie for more details and availability.</p></details>
            <details><summary>What are the check-in and check-out times?</summary><p>Check-in is from 14:00 on arrival day. Please check out by 10:00 on departure day.</p></details>
            <details><summary>How do I get to Locanda?</summary><p>If you’re flying, Rome Fiumicino is the best airport to arrive at. Aim for a morning arrival so we can help arrange a shared transfer with a private taxi company. The cost is approximately €350 per vehicle each way, with space for up to six people.</p><p>If you prefer to travel by train, take a train from Rome to Orvieto, where we can arrange a taxi to collect you from the station. Allow around €15 for the train and €50 for the taxi.</p><p>You can also drive your own car or hire one at the airport. The journey from Rome Fiumicino takes around two hours and is fairly straightforward.</p><p>Contact Annie for further travel details and help coordinating your arrival. All prices are approximate.</p></details>
            <details id="italy-payment-details"><summary>What is the payment schedule?</summary><p>A non-refundable €250 deposit is required at booking. 50% of the total retreat price must be paid six months before the retreat, with the remaining balance due four weeks before.</p></details>
            <details><summary>What if my plans change?</summary><p>The €250 booking deposit is non-refundable. Please ask Annie for the full cancellation terms before confirming your place.</p></details>
          </div>
        </section>
        <div className="italy-closing-photo"><img src={photo('italian-sunset')} alt="Golden evening light over an Italian hilltop village and distant mountains" loading="lazy" /></div>
      </main>
      <SiteFooter />
    </div>
  )
}
