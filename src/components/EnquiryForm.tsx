import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useEffect, useRef, useState, type FormEvent } from 'react'

const WEB3FORMS_HCAPTCHA_SITE_KEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2'

const enquiryTypes = [
  'Private classes',
  'Studio classes',
  'Retreats',
  'Gift cards',
  'Studio hire',
  'Other',
]

type EnquiryFormProps = {
  defaultEnquiryType?: string
  lockEnquiryType?: boolean
}

export default function EnquiryForm({ defaultEnquiryType, lockEnquiryType = false }: EnquiryFormProps) {
  const [captchaToken, setCaptchaToken] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [visitorName, setVisitorName] = useState('')
  const errorRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (error) errorRef.current?.focus()
  }, [error])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!captchaToken) {
      setError('Please complete the spam check before sending.')
      return
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      setError('The enquiry form is not available right now. Please email or call Annie instead.')
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name'))
    const enquiryType = String(formData.get('enquiry_type'))

    formData.set('access_key', accessKey)
    formData.set('subject', `New ${enquiryType} enquiry from Annie's Yoga website`)
    formData.set('from_name', "Annie's Yoga website")
    formData.set('h-captcha-response', captchaToken)

    setError('')
    setStatus('submitting')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const result = await response.json() as { success?: boolean }

      if (!response.ok || result.success !== true) {
        throw new Error('Web3Forms rejected the enquiry')
      }

      setVisitorName(name.trim().split(/\s+/)[0] || 'there')
      setStatus('success')
      setCaptchaToken('')
      form.reset()
    } catch {
      setError('Your enquiry could not be sent. Your message is still here, so please try again.')
      setStatus('idle')
    }
  }

  if (status === 'success') {
    return (
      <div className="enquiry-form-success" role="status">
        <h3>Message sent</h3>
        <p>Thanks, {visitorName}. Your enquiry has been sent to Annie.</p>
        <button className="button button-dark" type="button" onClick={() => setStatus('idle')}>
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form className="enquiry-form" aria-label="Send an enquiry" onSubmit={handleSubmit}>
      <div className="enquiry-form-personal">
        <div className="enquiry-form-field">
          <label htmlFor="enquiry-name">Name</label>
          <input id="enquiry-name" name="name" type="text" autoComplete="name" maxLength={100} required />
        </div>

        <div className="enquiry-form-field">
          <label htmlFor="enquiry-email">Email</label>
          <input id="enquiry-email" name="email" type="email" autoComplete="email" maxLength={254} required />
        </div>
      </div>

      {lockEnquiryType && defaultEnquiryType ? (
        <div className="enquiry-type-summary">
          <span>Enquiry about</span>
          <strong>{defaultEnquiryType}</strong>
          <input type="hidden" name="enquiry_type" value={defaultEnquiryType} />
        </div>
      ) : (
        <fieldset className="enquiry-type-fieldset">
          <legend>What can Annie help with?</legend>
          <div className="enquiry-type-options">
            {enquiryTypes.map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="enquiry_type"
                  value={type}
                  defaultChecked={type === defaultEnquiryType}
                  required
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="enquiry-form-field">
        <label htmlFor="enquiry-message">Message</label>
        <textarea id="enquiry-message" name="message" rows={5} maxLength={3000} required />
      </div>

      <div className="enquiry-form-actions">
        <HCaptcha
          sitekey={WEB3FORMS_HCAPTCHA_SITE_KEY}
          reCaptchaCompat={false}
          onVerify={(token) => {
            setCaptchaToken(token)
            setError('')
          }}
          onExpire={() => setCaptchaToken('')}
          onError={() => setCaptchaToken('')}
        />
        <button className="button button-dark" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
        </button>
      </div>
      <div className="enquiry-form-status" aria-live="polite">
        {error && <p ref={errorRef} role="alert" tabIndex={-1}>{error}</p>}
      </div>
    </form>
  )
}
