// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'
import worker, { type Env } from './index'

const emailSendMock = vi.fn().mockResolvedValue({ messageId: 'email-id' })
const env: Env = {
  ALLOWED_ORIGINS: 'https://annies-yoga.example,http://127.0.0.1:4173',
  ALLOWED_TURNSTILE_HOSTNAMES: 'annies-yoga.example,localhost',
  TURNSTILE_SECRET: 'turnstile-secret',
  EMAIL: { send: emailSendMock },
}

afterEach(() => {
  vi.unstubAllGlobals()
  emailSendMock.mockClear()
  emailSendMock.mockResolvedValue({ messageId: 'email-id' })
})

describe('form Worker', () => {
  it('verifies an enquiry and delivers it through the restricted email binding', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(Response.json({ success: true, hostname: 'annies-yoga.example', action: 'enquiry' }))
    vi.stubGlobal('fetch', fetchMock)

    const response = await worker.fetch(request(enquiry()), env)

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ success: true })
    const verification = fetchMock.mock.calls[0][1].body as FormData
    expect(verification.get('secret')).toBe('turnstile-secret')
    expect(verification.get('response')).toBe('valid-token')
    expect(emailSendMock).toHaveBeenCalledWith({
      to: 'anniesyoga@yahoo.ie',
      from: { email: 'website@anniesyoga.uk', name: "Annie's Yoga website" },
      replyTo: { email: 'alex@example.com', name: 'Alex Murphy' },
      subject: "New Retreats enquiry from Annie's Yoga website",
      text: [
        'Name: Alex Murphy',
        'Email: alex@example.com',
        'Enquiry type: Retreats',
        '',
        'Message:',
        'When is the next retreat?',
      ].join('\n'),
    })
  })

  it('forwards the complete reservation contract and preserves its subject', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(Response.json({ success: true, hostname: 'annies-yoga.example', action: 'reservation' }))
    vi.stubGlobal('fetch', fetchMock)
    const form = base('reservation')
    for (const [key, value] of Object.entries({
      class_name: 'Yoga', class_date: 'Monday 17 August 2026', class_time: '11:00 am',
      class_duration: '90 min', class_location: 'Castlederg', class_level: 'All levels welcome',
    })) form.set(key, value)

    const response = await worker.fetch(request(form), env)

    expect(response.status).toBe(200)
    expect(emailSendMock).toHaveBeenCalledWith(expect.objectContaining({
      subject: 'New class reservation request: Yoga — Monday 17 August 2026',
      text: expect.stringContaining('Location: Castlederg'),
    }))
  })

  it.each([
    ['wrong action', { success: true, hostname: 'annies-yoga.example', action: 'reservation' }],
    ['wrong hostname', { success: true, hostname: 'attacker.example', action: 'enquiry' }],
    ['expired, duplicated, or invalid token', { success: false }],
  ])('rejects a Turnstile result with %s', async (_case, result) => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json(result))
    vi.stubGlobal('fetch', fetchMock)

    const response = await worker.fetch(request(enquiry()), env)

    expect(response.status).toBe(403)
    expect(fetchMock).toHaveBeenCalledOnce()
  })

  it('rejects an untrusted origin before verification', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const response = await worker.fetch(request(enquiry(), 'https://attacker.example'), env)

    expect(response.status).toBe(403)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects methods and content types outside its narrow contract', async () => {
    const getResponse = await worker.fetch(new Request('https://forms.example', {
      headers: { Origin: 'https://annies-yoga.example' },
    }), env)
    const jsonResponse = await worker.fetch(new Request('https://forms.example', {
      method: 'POST',
      headers: { Origin: 'https://annies-yoga.example', 'Content-Type': 'application/json' },
      body: '{}',
    }), env)

    expect(getResponse.status).toBe(405)
    expect(jsonResponse.status).toBe(415)
  })

  it('does not claim success when delivery fails', async () => {
    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce(Response.json({ success: true, hostname: 'annies-yoga.example', action: 'enquiry' })))
    emailSendMock.mockRejectedValueOnce(new Error('Email delivery failed'))

    const response = await worker.fetch(request(enquiry()), env)

    expect(response.status).toBe(502)
    expect(await response.json()).toEqual({ success: false, error: 'delivery_failed' })
  })
})

function base(kind: 'enquiry' | 'reservation') {
  const form = new FormData()
  form.set('form_kind', kind)
  form.set('turnstile_token', 'valid-token')
  form.set('name', 'Alex Murphy')
  form.set('email', 'alex@example.com')
  form.set('message', 'Please tell me more.')
  return form
}

function enquiry() {
  const form = base('enquiry')
  form.set('enquiry_type', 'Retreats')
  form.set('message', 'When is the next retreat?')
  return form
}

function request(form: FormData, origin = 'https://annies-yoga.example') {
  return new Request('https://forms.example/submit', { method: 'POST', headers: { Origin: origin }, body: form })
}
