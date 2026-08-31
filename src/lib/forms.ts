export type FormKind = 'enquiry' | 'reservation'

export function formsAreConfigured() {
  return Boolean(import.meta.env.VITE_FORMS_ENDPOINT && import.meta.env.VITE_TURNSTILE_SITE_KEY)
}

export async function submitProtectedForm(kind: FormKind, fields: FormData, turnstileToken: string) {
  const endpoint = import.meta.env.VITE_FORMS_ENDPOINT
  if (!endpoint) throw new Error('Form endpoint is not configured')

  fields.set('form_kind', kind)
  fields.set('turnstile_token', turnstileToken)

  const response = await fetch(endpoint, { method: 'POST', body: fields })
  const result = await response.json().catch(() => null) as { success?: boolean; reference?: string } | null
  if (!response.ok || result?.success !== true) throw new Error('Form submission was rejected')
  return { reference: result.reference ?? '' }
}
