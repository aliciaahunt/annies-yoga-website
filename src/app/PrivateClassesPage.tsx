import { useRef } from 'react'
import { Check, Mail } from 'lucide-react'
import EnquiryDialog, { type EnquiryDialogHandle } from '@/components/EnquiryDialog'
import PageHero from '@/components/PageHero'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import { siteUrl } from '@/lib/siteUrl'

const benefits = [
  {
    title: 'Begin with confidence',
    text: 'Learn at your own pace, with time to ask questions and build strong foundations.',
  },
  {
    title: 'Move comfortably',
    text: 'Props and thoughtful adaptations make each movement work for your body and mobility.',
  },
  {
    title: 'Deepen your practice',
    text: 'Explore alignment, technique or a particular area with Annie’s close attention.',
  },
  {
    title: 'Support your wellbeing',
    text: 'Choose a gentle, active or restorative session shaped around what you need that day.',
  },
]

export default function PrivateClassesPage() {
  const enquiryDialogRef = useRef<EnquiryDialogHandle>(null)

  return (
    <div className="private-classes-page">
      <SiteHeader />

      <main>
        <EnquiryDialog ref={enquiryDialogRef} />

        <PageHero
          ariaLabel="Private classes introduction"
          eyebrow="A practice made for you"
          title={<>Private <em>classes</em></>}
        >
          <p className="page-hero-description">Personal, supportive yoga with Annie—at your pace, for your body and your reasons for practising.</p>
          <div className="private-hero-actions">
            <button className="button button-light" onClick={() => enquiryDialogRef.current?.open()} type="button">Send an enquiry <Mail size={17} /></button>
            <p><span>Private classes</span> From £40</p>
          </div>
        </PageHero>

        <section className="private-offerings">
          <div className="section-shell private-offerings-layout">
            <div className="private-offerings-copy">
              <div className="private-offerings-intro">
                <p className="eyebrow">Individual attention</p>
                <h2>Yoga that starts with <em>you.</em></h2>
                <p className="large-copy">Private classes give you more time, space and individual guidance than a weekly group class.</p>
                <p>Annie will listen to what you need and shape each session around your experience, comfort and goals. You do not need to be flexible or experienced—every movement can be adapted.</p>
              </div>
              <div className="private-offerings-grid">
                {benefits.map((benefit) => (
                  <article key={benefit.title}>
                    <Check size={18} aria-hidden="true" />
                    <div>
                      <h3>{benefit.title}</h3>
                      <p>{benefit.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <img
              className="private-guidance-image"
              src={siteUrl('/images/annie-private-yoga-guidance.jpg')}
              alt="Annie giving individual guidance to a student using wall ropes"
            />
          </div>
        </section>

        <section className="private-enquiry">
          <div className="section-shell private-enquiry-grid">
            <div>
              <p className="eyebrow">Start a conversation</p>
              <h2>Not sure what would suit you? <em>Let’s talk.</em></h2>
            </div>
            <div>
              <p>Call Annie for a friendly, no-pressure conversation about what you are looking for.</p>
              <button className="button button-dark" onClick={() => enquiryDialogRef.current?.open()} type="button"><Mail size={17} /> Send an enquiry</button>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}
