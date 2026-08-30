import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import TurnstileCheck from '@/components/TurnstileCheck'

const turnstileSpy = vi.fn()

vi.mock('@marsidev/react-turnstile', () => ({
  Turnstile: (props: unknown) => {
    turnstileSpy(props)
    return <div data-testid="turnstile-widget" />
  },
}))

describe('TurnstileCheck', () => {
  beforeEach(() => {
    turnstileSpy.mockClear()
    vi.stubEnv('VITE_TURNSTILE_SITE_KEY', 'public-site-key')
  })

  it('uses a managed widget that stays hidden unless interaction is required', () => {
    render(<TurnstileCheck action="enquiry" onTokenChange={vi.fn()} />)

    expect(screen.getByLabelText('Spam protection')).toContainElement(screen.getByTestId('turnstile-widget'))
    expect(turnstileSpy).toHaveBeenCalledWith(expect.objectContaining({
      siteKey: 'public-site-key',
      options: expect.objectContaining({
        action: 'enquiry',
        appearance: 'interaction-only',
        size: 'flexible',
        theme: 'light',
      }),
    }))
  })

  it('does not load an unusable widget when setup is incomplete', () => {
    vi.stubEnv('VITE_TURNSTILE_SITE_KEY', '')

    const { container } = render(<TurnstileCheck action="reservation" onTokenChange={vi.fn()} />)

    expect(container).toBeEmptyDOMElement()
  })
})
