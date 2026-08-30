export interface Env {
  ALLOWED_ORIGINS: string
  ALLOWED_TURNSTILE_HOSTNAMES: string
  TURNSTILE_SECRET: string
  EMAIL: {
    send(message: EmailMessage): Promise<{ messageId: string }>
  }
}

type EmailMessage = {
  to: string
  from: { email: string; name: string }
  replyTo: { email: string; name: string }
  subject: string
  text: string
}

type FormKind = 'enquiry' | 'reservation'

const MAX_BODY_BYTES = 16_384
const TURNSTILE_SITEVERIFY_ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const DESTINATION_EMAIL = 'anniesyoga@yahoo.ie'
const SENDER_EMAIL = 'website@anniesyoga.uk'

const commonFields = {
  name: 100,
  email: 254,
  message: 3000,
} as const

const reservationFields = {
  class_name: 100,
  class_date: 100,
  class_time: 50,
  class_duration: 50,
  class_location: 100,
  class_level: 100,
} as const

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') ?? ''
    const allowedOrigins = splitSetting(env.ALLOWED_ORIGINS)
    if (!allowedOrigins.includes(origin)) return json({ success: false, error: 'origin_not_allowed' }, 403)

    const corsHeaders = { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' }
    if (request.method !== 'POST') return json({ success: false, error: 'method_not_allowed' }, 405, corsHeaders)

    const contentType = request.headers.get('Content-Type') ?? ''
    if (!contentType.toLowerCase().startsWith('multipart/form-data;')) {
      return json({ success: false, error: 'invalid_content_type' }, 415, corsHeaders)
    }

    const body = await request.arrayBuffer()
    if (body.byteLength > MAX_BODY_BYTES) return json({ success: false, error: 'request_too_large' }, 413, corsHeaders)

    let submitted: FormData
    try {
      submitted = await new Request(request.url, { method: 'POST', headers: { 'Content-Type': contentType }, body }).formData()
    } catch {
      return json({ success: false, error: 'invalid_form' }, 400, corsHeaders)
    }

    const kind = submitted.get('form_kind')
    if (kind !== 'enquiry' && kind !== 'reservation') {
      return json({ success: false, error: 'invalid_form' }, 400, corsHeaders)
    }

    const fields = validateFields(kind, submitted)
    const token = stringValue(submitted, 'turnstile_token', 2048)
    if (!fields || !token) return json({ success: false, error: 'invalid_form' }, 400, corsHeaders)

    const verification = new FormData()
    verification.set('secret', env.TURNSTILE_SECRET)
    verification.set('response', token)
    verification.set('remoteip', request.headers.get('CF-Connecting-IP') ?? '')
    verification.set('idempotency_key', crypto.randomUUID())

    let verificationResult: { success?: boolean; hostname?: string; action?: string }
    try {
      const response = await fetch(TURNSTILE_SITEVERIFY_ENDPOINT, { method: 'POST', body: verification })
      verificationResult = await response.json()
    } catch {
      return json({ success: false, error: 'verification_unavailable' }, 503, corsHeaders)
    }

    const allowedHostnames = splitSetting(env.ALLOWED_TURNSTILE_HOSTNAMES)
    if (
      verificationResult.success !== true
      || verificationResult.action !== kind
      || !verificationResult.hostname
      || !allowedHostnames.includes(verificationResult.hostname)
    ) {
      return json({ success: false, error: 'verification_failed' }, 403, corsHeaders)
    }

    try {
      await env.EMAIL.send({
        to: DESTINATION_EMAIL,
        from: { email: SENDER_EMAIL, name: "Annie's Yoga website" },
        replyTo: { email: fields.email, name: fields.name },
        subject: subjectFor(kind, fields),
        text: emailBodyFor(kind, fields),
      })
    } catch {
      return json({ success: false, error: 'delivery_failed' }, 502, corsHeaders)
    }

    return json({ success: true }, 200, corsHeaders)
  },
}

function validateFields(kind: FormKind, form: FormData): Record<string, string> | null {
  const limits: Record<string, number> = kind === 'enquiry'
    ? { ...commonFields, enquiry_type: 100 }
    : { ...commonFields, ...reservationFields }
  const fields: Record<string, string> = {}

  for (const [name, maxLength] of Object.entries(limits)) {
    const value = stringValue(form, name, maxLength)
    if (!value) return null
    if (name !== 'message' && /[\r\n]/.test(value)) return null
    fields[name] = value
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return null
  if (kind === 'enquiry' && ![
    'Private classes', 'Studio classes', 'Retreats', 'Gift cards', 'Studio hire', 'Other',
  ].includes(fields.enquiry_type)) return null
  return fields
}

function stringValue(form: FormData, name: string, maxLength: number) {
  const value = form.get(name)
  if (typeof value !== 'string') return null
  const normalized = value.trim()
  return normalized && normalized.length <= maxLength ? normalized : null
}

function subjectFor(kind: FormKind, fields: Record<string, string>) {
  return kind === 'enquiry'
    ? `New ${fields.enquiry_type} enquiry from Annie's Yoga website`
    : `New class reservation request: ${fields.class_name} — ${fields.class_date}`
}

function emailBodyFor(kind: FormKind, fields: Record<string, string>) {
  const lines = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
  ]

  if (kind === 'enquiry') {
    lines.push(`Enquiry type: ${fields.enquiry_type}`)
  } else {
    lines.push(
      `Class: ${fields.class_name}`,
      `Date: ${fields.class_date}`,
      `Time: ${fields.class_time}`,
      `Duration: ${fields.class_duration}`,
      `Location: ${fields.class_location}`,
      `Level: ${fields.class_level}`,
    )
  }

  lines.push('', 'Message:', fields.message)
  return lines.join('\n')
}

function splitSetting(value: string) {
  return value.split(',').map((item) => item.trim()).filter(Boolean)
}

function json(body: object, status: number, headers: Record<string, string> = {}) {
  return Response.json(body, {
    status,
    headers: { ...headers, 'Cache-Control': 'no-store' },
  })
}
