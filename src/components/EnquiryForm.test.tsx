import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import EnquiryForm from '@/components/EnquiryForm'

vi.mock('@/components/TurnstileCheck', () => ({
  default: ({ onTokenChange }: { onTokenChange: (token: string) => void }) => (
    <button type="button" onClick={() => onTokenChange('verified-turnstile-token')}>Complete spam check</button>
  ),
}))

describe('EnquiryForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.stubEnv('VITE_TURNSTILE_SITE_KEY', 'turnstile-site-key')
    vi.stubEnv('VITE_FORMS_ENDPOINT', 'https://forms.example.test/submit')
  })

  it('lets a visitor describe their enquiry with accessible fields and choices', () => {
    render(<EnquiryForm />)

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('autocomplete', 'name')
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('autocomplete', 'email')
    expect(screen.getByRole('textbox', { name: 'Message' })).toBeRequired()

    for (const choice of [
      'Private classes',
      'Studio classes',
      'Retreats',
      'Gift cards',
      'Studio hire',
      'Other',
    ]) {
      expect(screen.getByRole('radio', { name: choice })).toBeInTheDocument()
    }

    expect(screen.getByRole('button', { name: 'Send enquiry' })).toBeInTheDocument()
  })

  it('tells a visitor to complete the spam check before sending', async () => {
    const user = userEvent.setup()
    render(<EnquiryForm />)

    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Alex Murphy')
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'alex@example.com')
    await user.click(screen.getByRole('radio', { name: 'Retreats' }))
    await user.type(screen.getByRole('textbox', { name: 'Message' }), 'Could you tell me about the next retreat?')
    await user.click(screen.getByRole('button', { name: 'Send enquiry' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Please complete the spam check before sending.')
  })

  it('sends the enquiry to Annie and lets the visitor start a fresh message', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    render(<EnquiryForm />)

    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Alex Murphy')
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'alex@example.com')
    await user.click(screen.getByRole('radio', { name: 'Retreats' }))
    await user.type(screen.getByRole('textbox', { name: 'Message' }), 'Could you tell me about the next retreat?')
    await user.click(screen.getByRole('button', { name: 'Complete spam check' }))
    await user.click(screen.getByRole('button', { name: 'Send enquiry' }))

    expect(await screen.findByText('Thanks, Alex. Your enquiry has been sent to Annie.')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledWith('https://forms.example.test/submit', expect.objectContaining({ method: 'POST' }))

    const requestBody = fetchMock.mock.calls[0][1]?.body as FormData
    expect(Object.fromEntries(requestBody.entries())).toEqual({
      email: 'alex@example.com',
      enquiry_type: 'Retreats',
      form_kind: 'enquiry',
      message: 'Could you tell me about the next retreat?',
      name: 'Alex Murphy',
      turnstile_token: 'verified-turnstile-token',
    })

    await user.click(screen.getByRole('button', { name: 'Send another message' }))
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('')
    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveValue('')
  })

  it('keeps the visitor’s message and focuses useful feedback when sending fails', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: false }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    render(<EnquiryForm />)

    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Alex Murphy')
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'alex@example.com')
    await user.click(screen.getByRole('radio', { name: 'Studio classes' }))
    await user.type(screen.getByRole('textbox', { name: 'Message' }), 'Which class would suit a beginner?')
    await user.click(screen.getByRole('button', { name: 'Complete spam check' }))
    await user.click(screen.getByRole('button', { name: 'Send enquiry' }))

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent('Your enquiry could not be sent. Your message is still here, so please try again.')
    expect(alert).toHaveFocus()
    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveValue('Which class would suit a beginner?')
  })

  it.each([
    ['a network failure', () => Promise.reject(new TypeError('Failed to fetch'))],
    [
      'an unsuccessful API response',
      () => Promise.resolve(new Response(JSON.stringify({ success: false }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })),
    ],
  ])('recovers from %s without losing the message', async (_scenario, response) => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockImplementation(response)
    render(<EnquiryForm />)

    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Alex Murphy')
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'alex@example.com')
    await user.click(screen.getByRole('radio', { name: 'Other' }))
    await user.type(screen.getByRole('textbox', { name: 'Message' }), 'I have another question.')
    await user.click(screen.getByRole('button', { name: 'Complete spam check' }))
    await user.click(screen.getByRole('button', { name: 'Send enquiry' }))

    expect(await screen.findByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveValue('I have another question.')
  })

  it('prevents another submission while an enquiry is being sent', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockReturnValue(new Promise(() => {}))
    render(<EnquiryForm />)

    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Alex Murphy')
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'alex@example.com')
    await user.click(screen.getByRole('radio', { name: 'Gift cards' }))
    await user.type(screen.getByRole('textbox', { name: 'Message' }), 'Do you offer gift cards?')
    await user.click(screen.getByRole('button', { name: 'Complete spam check' }))
    await user.click(screen.getByRole('button', { name: 'Send enquiry' }))

    expect(screen.getByRole('button', { name: 'Sending…' })).toBeDisabled()
    expect(globalThis.fetch).toHaveBeenCalledOnce()
  })
})
