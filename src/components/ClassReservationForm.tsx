import HCaptcha from '@hcaptcha/react-hcaptcha'
import PhoneLink from '@/components/PhoneLink'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { CLASS_PRICE_PLANS } from '@/app/classPricing'
import type { YogaClass } from '@/app/scheduleData'

const WEB3FORMS_HCAPTCHA_SITE_KEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2'

type ClassReservationFormProps = {
  selectedClass: YogaClass & { date: Date }
}

export default function ClassReservationForm({ selectedClass }: ClassReservationFormProps) {
  const [captchaToken, setCaptchaToken] = useState('')
  const [error, setError] = useState('')
  const [showFallback, setShowFallback] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [visitorName, setVisitorName] = useState('')
  const errorRef = useRef<HTMLParagraphElement>(null)
  const classDate = formatReservationDate(selectedClass.date)
  const pricePlan = CLASS_PRICE_PLANS[selectedClass.activity]

  useEffect(() => {
    if (error) errorRef.current?.focus()
  }, [error])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!captchaToken) {
      setError('Please complete the spam check before requesting your place.')
      setShowFallback(false)
      return
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      setError('Online reservations are not available right now. Please email or call Annie instead.')
      setShowFallback(true)
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name'))

    formData.set('access_key', accessKey)
    formData.set('subject', `New class reservation request: ${selectedClass.name} — ${classDate}`)
    formData.set('from_name', "Annie's Yoga website")
    formData.set('h-captcha-response', captchaToken)
    formData.set('class_name', selectedClass.name)
    formData.set('class_date', classDate)
    formData.set('class_time', selectedClass.time)
    formData.set('class_duration', selectedClass.duration)
    formData.set('class_location', selectedClass.place)
    formData.set('class_level', selectedClass.level)

    setError('')
    setShowFallback(false)
    setStatus('submitting')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const result = await response.json() as { success?: boolean }

      if (!response.ok || result.success !== true) throw new Error('Web3Forms rejected the reservation')

      setVisitorName(name.trim().split(/\s+/)[0] || 'there')
      setStatus('success')
      setCaptchaToken('')
      form.reset()
    } catch {
      setError('Annie has not received your request. Your details are still here, so please try again or contact her directly.')
      setShowFallback(true)
      setStatus('idle')
    }
  }

  if (status === 'success') {
    return (
      <div className="reservation-success" role="status">
        <h3>Request sent</h3>
        <p>Thanks, {visitorName}. Your reservation request has been sent to Annie.</p>
        <strong>Your place is not confirmed until Annie replies.</strong>
      </div>
    )
  }

  return (
    <form className="reservation-form" aria-label={`Request a place in ${selectedClass.name}`} onSubmit={handleSubmit}>
      <aside className="reservation-pricing" aria-label={selectedClass.kind === 'workshop' ? 'Workshop pricing' : 'Class pricing'}>
        {selectedClass.kind === 'workshop' ? (
          <><strong>Workshop price</strong><span>£{selectedClass.price} including refreshments</span></>
        ) : (
          <><strong>{pricePlan.label} pricing</strong><span>£{pricePlan.singleClassPrice} per class</span><span>£{pricePlan.packagePrice} six-week package</span></>
        )}
      </aside>
      <div className="enquiry-form-personal">
        <div className="enquiry-form-field">
          <label htmlFor="reservation-name">Name</label>
          <input id="reservation-name" name="name" type="text" autoComplete="name" maxLength={100} required />
        </div>
        <div className="enquiry-form-field">
          <label htmlFor="reservation-email">Email</label>
          <input id="reservation-email" name="email" type="email" autoComplete="email" maxLength={254} required />
        </div>
      </div>
      {selectedClass.kind !== 'workshop' && (
        <aside className="reservation-offer-guidance" id="reservation-offer-guidance">
          <strong>Using a six-week package?</strong>
          <p>In your message, tell Annie if you’d like to arrange the £{pricePlan.packagePrice} six-week package or if this booking is one of your existing six classes.</p>
        </aside>
      )}
      <div className="enquiry-form-field">
        <label htmlFor="reservation-message">Anything Annie should know?</label>
        <textarea id="reservation-message" name="message" rows={4} maxLength={3000} aria-describedby={selectedClass.kind === 'workshop' ? undefined : 'reservation-offer-guidance'} required />
      </div>
      <div className="reservation-form-actions">
        <HCaptcha
          sitekey={WEB3FORMS_HCAPTCHA_SITE_KEY}
          reCaptchaCompat={false}
          onVerify={(token) => {
            setCaptchaToken(token)
            setError('')
            setShowFallback(false)
          }}
          onExpire={() => setCaptchaToken('')}
          onError={() => setCaptchaToken('')}
        />
        <button className="button button-dark" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Request reservation'}
        </button>
      </div>
      <div className="enquiry-form-status" aria-live="polite">
        {error && (
          <div>
            <p ref={errorRef} role="alert" tabIndex={-1}>{error}</p>
            {showFallback && (
              <nav className="reservation-fallback-links" aria-label="Contact Annie directly">
                <a href="mailto:anniesyoga@yahoo.ie">Email Annie</a>
                <PhoneLink>Call Annie</PhoneLink>
              </nav>
            )}
          </div>
        )}
      </div>
      <p className="reservation-privacy-note">Your details are used only to respond to this reservation request.</p>
    </form>
  )
}

function formatReservationDate(date: Date) {
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' })
  const calendarDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  return `${weekday} ${calendarDate}`
}
