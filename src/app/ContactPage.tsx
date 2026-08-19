import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import EnquiryForm from '@/components/EnquiryForm'
import PhoneLink from '@/components/PhoneLink'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import SocialIcon from '@/components/SocialIcon'

const locations = [
  {
    name: 'Strabane',
    address: ['5 Church Street', 'Strabane BT82 8BS'],
    mapUrl: 'https://www.google.com/maps?q=5+Church+Street%2C+Strabane+BT82+8BS&z=16&output=embed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=5+Church+Street%2C+Strabane+BT82+8BS',
  },
  {
    name: 'Castlederg',
    address: ['1 Listymore Road, Spamount', 'Castlederg BT81 7JG'],
    mapUrl: 'https://www.google.com/maps?q=1+Listymore+Road%2C+Spamount%2C+Castlederg+BT81+7JG&z=16&output=embed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=1+Listymore+Road%2C+Spamount%2C+Castlederg+BT81+7JG',
  },
]

export default function ContactPage() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0])

  return (
    <div className="contact-page">
      <SiteHeader />

      <main>
        <section className="contact-page-hero">
          <div className="section-shell contact-page-hero-grid">
            <div>
              <h1>Get in touch<br /><em>with Annie.</em></h1>
            </div>
            <p>
              Whether you need help choosing a class or want to ask about private sessions or
              retreats, Annie would love to hear from you.
            </p>
          </div>
        </section>

        <section className="contact-page-details" aria-labelledby="contact-details-heading">
          <div className="section-shell contact-page-details-grid">
            <div className="contact-page-details-intro">
              <h2 id="contact-details-heading">Contact <em>Annie</em></h2>
              <p>Call, email or send a quick enquiry below.</p>
              <dl className="contact-details-list">
                <div>
                  <dt><Phone size={17} aria-hidden="true" /> Phone</dt>
                  <dd><PhoneLink>07716 034570</PhoneLink></dd>
                </div>
                <div>
                  <dt><Mail size={17} aria-hidden="true" /> Email</dt>
                  <dd><a href="mailto:anniesyoga@yahoo.ie">anniesyoga@yahoo.ie</a></dd>
                </div>
                <div className="contact-follow-row">
                  <dt>Follow</dt>
                  <dd className="contact-social-links">
                    <a href="https://www.facebook.com/anniesyoga/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <SocialIcon network="facebook" />
                    </a>
                    <a href="https://www.instagram.com/anniedeery/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <SocialIcon network="instagram" />
                    </a>
                  </dd>
                </div>
              </dl>
              <div className="contact-enquiry-block">
                <h3 id="enquiry-form-heading">Send an enquiry</h3>
                <p>Tell Annie what you’re interested in and she’ll reply as soon as she can.</p>
              </div>
              <EnquiryForm />
              <p className="enquiry-privacy-note">
                Your details are used only to reply to your enquiry and are securely processed by Web3Forms.
              </p>
            </div>

            <div className="contact-location-panel" aria-labelledby="locations-heading">
              <div className="contact-location-header">
                <div>
                  <p className="eyebrow">Class locations</p>
                  <h2 id="locations-heading">Find your <em>class</em></h2>
                </div>
                <div className="location-switcher" aria-label="Choose a class location">
                  {locations.map((location) => (
                    <button
                      className={selectedLocation.name === location.name ? 'is-active' : undefined}
                      type="button"
                      aria-pressed={selectedLocation.name === location.name}
                      onClick={() => setSelectedLocation(location)}
                      key={location.name}
                    >
                      {location.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="selected-location-details">
                <MapPin size={20} aria-hidden="true" />
                <div>
                  <h3>{selectedLocation.name}</h3>
                  <address>{selectedLocation.address.map((line) => <span key={line}>{line}</span>)}</address>
                </div>
                <a href={selectedLocation.directionsUrl}>
                  Get directions <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>

              <iframe
                key={selectedLocation.mapUrl}
                src={selectedLocation.mapUrl}
                title={`Google map showing Annie's Yoga class venue at ${selectedLocation.address.join(', ')}`}
                width="600"
                height="450"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
