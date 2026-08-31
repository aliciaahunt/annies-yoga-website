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
    expect(await response.json()).toEqual({ success: true, reference: expect.stringMatching(/^[A-Z0-9]{8}$/) })
    const verification = fetchMock.mock.calls[0][1].body as FormData
    expect(verification.get('secret')).toBe('turnstile-secret')
    expect(verification.get('response')).toBe('valid-token')
    expect(emailSendMock).toHaveBeenCalledWith(expect.objectContaining({
      to: 'anniesyoga@yahoo.ie',
      from: { email: 'website@anniesyoga.uk', name: "Annie's Yoga website" },
      replyTo: { email: 'alex@example.com', name: 'Alex Murphy' },
      subject: expect.stringMatching(/^New Retreats enquiry from Alex Murphy — Ref [A-Z0-9]{8}$/),
      text: expect.stringMatching(/^Reference: [A-Z0-9]{8}\nName: Alex Murphy\nEmail: alex@example.com\nEnquiry type: Retreats\n\nMessage:\nWhen is the next retreat\?$/),
    }))
  })

  it('forwards the complete reservation contract and preserves its subject', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(Response.json({ success: true, hostname: 'annies-yoga.example', action: 'reservation' }))
    vi.stubGlobal('fetch', fetchMock)
    const form = base('reservation')
    form.set('event_kind', 'class')
    for (const [key, value] of Object.entries({
      class_name: 'Yoga', class_date: 'Monday 17 August 2026', class_time: '11:00 am',
      class_duration: '90 min', class_location: 'Castlederg', class_level: 'All levels welcome',
    })) form.set(key, value)

    const response = await worker.fetch(request(form), env)

    expect(response.status).toBe(200)
    expect(emailSendMock).toHaveBeenCalledWith(expect.objectContaining({
      subject: expect.stringMatching(/^New class reservation from Alex Murphy: Yoga — Ref [A-Z0-9]{8}$/),
      text: expect.stringContaining('Location: Castlederg'),
    }))
  })

  it('treats reservations from the previous website bundle as class bookings', async () => {
    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce(Response.json({ success: true, hostname: 'annies-yoga.example', action: 'reservation' })))
    const form = base('reservation')
    form.delete('event_kind')
    for (const [key, value] of Object.entries({
      class_name: 'Pilates', class_date: 'Tuesday 18 August 2026', class_time: '6:00 pm',
      class_duration: '60 min', class_location: 'Strabane', class_level: 'All levels welcome',
    })) form.set(key, value)

    const response = await worker.fetch(request(form), env)

    expect(response.status).toBe(200)
    expect(emailSendMock).toHaveBeenCalledWith(expect.objectContaining({
      text: expect.stringContaining('Booking type: Class'),
    }))
  })

  it('identifies a workshop booking distinctly and gives it a traceable reference', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(Response.json({ success: true, hostname: 'annies-yoga.example', action: 'reservation' }))
    vi.stubGlobal('fetch', fetchMock)
    const form = base('reservation')
    for (const [key, value] of Object.entries({
      event_kind: 'workshop', class_name: 'Iyengar Yoga with Aisling Guirke',
      class_date: 'Saturday 24 October 2026', class_time: '10:00 am–4:00 pm',
      class_duration: 'All day', class_location: 'Strabane', class_level: 'All abilities welcome',
    })) form.set(key, value)

    const response = await worker.fetch(request(form), env)
    const result = await response.json() as { reference?: string }

    expect(result.reference).toMatch(/^[A-Z0-9]{8}$/)
    expect(emailSendMock).toHaveBeenCalledWith(expect.objectContaining({
      subject: expect.stringMatching(/^New workshop booking from Alex Murphy: Iyengar Yoga with Aisling Guirke — Ref [A-Z0-9]{8}$/),
      text: expect.stringContaining('Booking type: Workshop'),
    }))
  })

  it('preserves the named retreat and gives the enquiry a traceable reference', async () => {
    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce(Response.json({ success: true, hostname: 'annies-yoga.example', action: 'enquiry' })))
    const form = enquiry()
    form.set('enquiry_subject', 'The Blue Haven weekend retreat')

    const response = await worker.fetch(request(form), env)
    const result = await response.json() as { reference?: string }

    expect(result.reference).toMatch(/^[A-Z0-9]{8}$/)
    expect(emailSendMock).toHaveBeenCalledWith(expect.objectContaining({
      subject: expect.stringMatching(/^New retreat enquiry from Alex Murphy: The Blue Haven weekend retreat — Ref [A-Z0-9]{8}$/),
      text: expect.stringContaining('Retreat: The Blue Haven weekend retreat'),
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
  if (kind === 'reservation') form.set('event_kind', 'class')
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
