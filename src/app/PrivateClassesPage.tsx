import { Check, Phone } from 'lucide-react'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import { siteUrl } from '@/lib/siteUrl'

const offerings = [
  {
    title: 'One-to-one yoga',
    text: 'Individual guidance shaped around your experience, mobility, goals and preferred pace.',
  },
  {
    title: 'Private group sessions',
    text: 'A welcoming class for friends, families, community groups or colleagues to enjoy together.',
  },
  {
    title: 'Sports recovery',
    text: 'Thoughtful mobility and recovery work to support active bodies between training sessions.',
  },
  {
    title: 'Specialist support',
    text: 'Adapted sessions for people living with MS or anxiety, with space to move safely and comfortably.',
  },
  {
    title: 'Yoga in schools',
    text: 'Age-appropriate movement and breathing sessions created for pupils and school communities.',
  },
  {
    title: 'Teacher training',
    text: 'Focused support and guidance for teachers who want to deepen their knowledge and practice.',
  },
]

export default function PrivateClassesPage() {
  return (
    <div className="private-classes-page">
      <SiteHeader />

      <main>
        <section className="private-hero">
          <div className="private-hero-copy">
            <p className="eyebrow light">A practice made for you</p>
            <h1>Private <em>classes</em></h1>
            <p>Personal, supportive yoga with Annie—at your pace, for your body and your reasons for practising.</p>
            <a className="button button-light" href="tel:+447716034570">Talk to Annie <Phone size={17} /></a>
          </div>
          <img src={siteUrl('/images/studio-seated-yoga.jpg')} alt="A calm seated yoga practice with Annie" />
        </section>

        <section className="private-intro">
          <div className="section-shell private-intro-grid">
            <p className="eyebrow">Individual attention</p>
            <div>
              <h2>Yoga that starts with <em>you.</em></h2>
              <p className="large-copy">Private classes give you more time, space and individual guidance than a weekly group class. Annie will listen to what you need and shape each session around your experience, comfort and goals.</p>
              <p>You do not need to be flexible or experienced. Sessions can be gentle, active, restorative or a mixture—and every movement can be adapted.</p>
            </div>
          </div>
        </section>

        <section className="private-offerings">
          <div className="section-shell">
            <div className="private-offerings-heading">
              <p className="eyebrow light">Ways to practise</p>
              <h2>What Annie offers</h2>
            </div>
            <div className="private-offerings-grid">
              {offerings.map((offering) => (
                <article key={offering.title}>
                  <Check size={18} aria-hidden="true" />
                  <h3>{offering.title}</h3>
                  <p>{offering.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="private-enquiry">
          <div className="section-shell private-enquiry-grid">
            <div>
              <p className="eyebrow">Start a conversation</p>
              <h2>Not sure what would suit you?</h2>
            </div>
            <div>
              <p>Call Annie for a friendly, no-pressure conversation about what you are looking for. She can suggest the most suitable kind of session and answer any questions.</p>
              <a className="button button-dark" href="tel:+447716034570"><Phone size={17} /> Call 07716 034570</a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
