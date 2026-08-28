import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { readFileSync } from 'node:fs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import SchedulePage from '@/app/SchedulePage'

vi.mock('@hcaptcha/react-hcaptcha', () => ({
  default: ({ onVerify }: { onVerify: (token: string) => void }) => (
    <button type="button" onClick={() => onVerify('verified-captcha-token')}>Complete captcha</button>
  ),
}))

describe('SchedulePage reservations', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'form-access-key')
    vi.setSystemTime(new Date(2026, 7, 16, 12))
    HTMLDialogElement.prototype.showModal = vi.fn(function openDialog(this: HTMLDialogElement) {
      this.setAttribute('open', '')
    })
    HTMLDialogElement.prototype.close = vi.fn(function closeDialog(this: HTMLDialogElement) {
      this.removeAttribute('open')
      this.dispatchEvent(new Event('close'))
    })
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('reserves enough title line height for letters with descenders', () => {
    const css = readFileSync('src/styles/components.css', 'utf8')
    const titleRule = css.match(/\.class-event h3 \{([^}]+)\}/)?.[1]

    expect(titleRule).toMatch(/line-height:\s*1\.1[5-9]/)
  })

  it('keeps class pricing focused on the Yoga and Pilates options', () => {
    render(<SchedulePage />, { wrapper: MemoryRouter })

    const pricing = screen.getByRole('region', { name: 'Class pricing' })
    expect(within(pricing).getByRole('heading', { name: 'Yoga' })).toBeInTheDocument()
    expect(within(pricing).getByRole('heading', { name: 'Pilates' })).toBeInTheDocument()
    expect(within(pricing).queryByText('Come along when it suits you, or settle into a regular six-week practice.')).not.toBeInTheDocument()
    expect(within(pricing).queryByText('Space to move, breathe and reconnect.')).not.toBeInTheDocument()
    expect(within(pricing).queryByText('Thoughtful movement for strength and control.')).not.toBeInTheDocument()
    expect(within(pricing).queryByText('01')).not.toBeInTheDocument()
    expect(within(pricing).queryByText('02')).not.toBeInTheDocument()
  })

  it('omits decorative branches and the class-selection help card', () => {
    render(<SchedulePage />, { wrapper: MemoryRouter })

    const pricing = screen.getByRole('region', { name: 'Class pricing' })
    expect(pricing.querySelector('svg')).not.toBeInTheDocument()
    expect(screen.queryByText('Need help choosing?')).not.toBeInTheDocument()
  })

  it('shows all seven days on a proportional time grid with consistent class cards', () => {
    render(<SchedulePage />, { wrapper: MemoryRouter })

    const pricing = screen.getByRole('region', { name: 'Class pricing' })
    const yogaPricing = within(pricing).getByRole('article', { name: 'Yoga pricing' })
    const pilatesPricing = within(pricing).getByRole('article', { name: 'Pilates pricing' })
    expect(within(yogaPricing).getByText('£12')).toBeInTheDocument()
    expect(within(yogaPricing).getByText('£60')).toBeInTheDocument()
    expect(within(yogaPricing).getByText('Single class')).toBeInTheDocument()
    expect(within(yogaPricing).getByText('Six-week bundle')).toBeInTheDocument()
    expect(within(pilatesPricing).getByText('£10')).toBeInTheDocument()
    expect(within(pilatesPricing).getByText('£50')).toBeInTheDocument()
    expect(within(pilatesPricing).getByText('Single class')).toBeInTheDocument()
    expect(within(pilatesPricing).getByText('Six-week bundle')).toBeInTheDocument()
    expect(pricing).toHaveTextContent('Paid upfront')
    expect(screen.getByLabelText('Morning, Sunday 16 August')).toHaveTextContent('No classes')
    expect(screen.getByLabelText('Morning, Saturday 22 August')).toHaveTextContent('9:00 am')
    expect(screen.getByText('No classes scheduled 12:45–4:00 pm')).toBeInTheDocument()

    const restorativeCard = screen.getByRole('heading', { name: 'Restorative Yoga' }).closest('article')
    const regularYogaCard = screen.getAllByRole('heading', { name: 'Yoga' })
      .map((heading) => heading.closest('article'))
      .find((article) => article?.classList.contains('class-event'))
    const pilatesCard = screen.getAllByRole('heading', { name: 'Pilates' })
      .map((heading) => heading.closest('article'))
      .find((article) => article?.classList.contains('class-event'))
    expect(restorativeCard).toHaveClass('class-event', 'is-positioned')
    expect(regularYogaCard).toHaveClass('class-event', 'is-positioned')
    expect(restorativeCard).toHaveStyle({ '--event-top': '0px' })
    expect(restorativeCard).toHaveTextContent('Beginners')
    expect(restorativeCard?.closest('[data-time-band]')).toHaveAttribute('data-time-band', 'evening')
    expect(pilatesCard).toHaveClass('class-event-pilates')
    expect(regularYogaCard).toHaveClass('class-event-yoga')
  })

  it('shows the October workshop as a tall block spanning the daytime schedule', () => {
    vi.setSystemTime(new Date(2026, 9, 18, 12))
    render(<SchedulePage />, { wrapper: MemoryRouter })

    const workshopBlock = screen.getAllByRole('heading', { name: 'Yoga Workshop' })
      .map((heading) => heading.closest('article'))
      .find((article) => article?.classList.contains('workshop-schedule-block'))

    expect(workshopBlock).toBeInTheDocument()
    expect(workshopBlock?.parentElement).toHaveClass('workshop-schedule-overlay')
    expect(workshopBlock?.parentElement).toHaveStyle({
      '--workshop-column': '7',
      '--workshop-offset': '126px',
    })
    expect(workshopBlock).toHaveTextContent('10:00 am–4:00 pm')
    expect(workshopBlock).toHaveTextContent('Yoga 10–1 · Lunch 1–2 · Yoga 2–4')
  })

  it('uses a focused day chooser on small screens', async () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    const user = userEvent.setup()
    render(<SchedulePage />, { wrapper: MemoryRouter })

    expect(screen.getByLabelText('Sunday 16 August')).toHaveTextContent('0 classes')
    await user.click(screen.getByRole('button', { name: 'Select Monday 17 August' }))

    expect(screen.getByLabelText('Monday 17 August')).toHaveTextContent('3 classes')
    expect(screen.getAllByRole('button', { name: 'Book' })).toHaveLength(3)
  })

  it('opens a reservation form with the selected class and pricing information', async () => {
    const user = userEvent.setup()
    render(<SchedulePage />, { wrapper: MemoryRouter })

    await user.click(screen.getAllByRole('button', { name: 'Book' })[0])

    const dialog = screen.getByRole('dialog', { name: 'Reserve Yoga' })
    expect(dialog).toHaveTextContent('Monday 17 August')
    expect(dialog).toHaveTextContent('11:00 am · 90 min')
    expect(dialog).toHaveTextContent('Castlederg')
    expect(within(dialog).getByLabelText('Class pricing')).toHaveTextContent('£12 per class')
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeRequired()
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeRequired()
    const message = screen.getByRole('textbox', { name: /Anything Annie should know/ })
    expect(message).toBeRequired()
    expect(message).toHaveAccessibleDescription(/tell Annie if you’d like to arrange the £60 six-week package or if this booking is one of your existing six classes/)
  })

  it('shows Pilates pricing when reserving a Pilates class', async () => {
    const user = userEvent.setup()
    render(<SchedulePage />, { wrapper: MemoryRouter })

    const pilatesCard = screen.getAllByRole('heading', { name: 'Pilates' })
      .map((heading) => heading.closest('article'))
      .find((article) => article?.classList.contains('class-event'))
    await user.click(within(pilatesCard as HTMLElement).getByRole('button', { name: 'Book' }))

    const dialog = screen.getByRole('dialog', { name: 'Reserve Pilates' })
    expect(within(dialog).getByLabelText('Class pricing')).toHaveTextContent('£10 per class')
    expect(within(dialog).getByLabelText('Class pricing')).toHaveTextContent('£50 six-week package')
    expect(within(dialog).getByRole('textbox', { name: /Anything Annie should know/ }))
      .toHaveAccessibleDescription(/£50 six-week package/)
  })

  it('sends the selected class and visitor details as a reservation request', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    render(<SchedulePage />, { wrapper: MemoryRouter })

    await user.click(screen.getAllByRole('button', { name: 'Book' })[0])
    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Alex Murphy')
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'alex@example.com')
    await user.type(screen.getByRole('textbox', { name: /Anything Annie should know/ }), 'I have a wrist injury.')
    await user.click(screen.getByRole('button', { name: 'Complete captcha' }))
    await user.click(screen.getByRole('button', { name: 'Request reservation' }))

    expect(await screen.findByText('Thanks, Alex. Your reservation request has been sent to Annie.')).toBeInTheDocument()
    expect(screen.getByText('Your place is not confirmed until Annie replies.')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledWith('https://api.web3forms.com/submit', expect.objectContaining({ method: 'POST' }))

    const requestBody = fetchMock.mock.calls[0][1]?.body as FormData
    expect(Object.fromEntries(requestBody.entries())).toEqual({
      access_key: 'form-access-key',
      class_date: 'Monday 17 August 2026',
      class_duration: '90 min',
      class_level: 'All levels welcome',
      class_location: 'Castlederg',
      class_name: 'Yoga',
      class_time: '11:00 am',
      email: 'alex@example.com',
      from_name: "Annie's Yoga website",
      'h-captcha-response': 'verified-captcha-token',
      message: 'I have a wrist injury.',
      name: 'Alex Murphy',
      subject: 'New class reservation request: Yoga — Monday 17 August 2026',
    })
  })

  it('preserves the request and offers direct contact when online reservations are unavailable', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', '')
    const user = userEvent.setup()
    render(<SchedulePage />, { wrapper: MemoryRouter })

    await user.click(screen.getAllByRole('button', { name: 'Book' })[0])
    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Alex Murphy')
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'alex@example.com')
    await user.type(screen.getByRole('textbox', { name: /Anything Annie should know/ }), 'Please reserve a place near the front.')
    await user.click(screen.getByRole('button', { name: 'Complete captcha' }))
    await user.click(screen.getByRole('button', { name: 'Request reservation' }))

    const alert = screen.getByRole('alert')
    expect(alert).toHaveFocus()
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('Alex Murphy')
    expect(screen.getByRole('textbox', { name: /Anything Annie should know/ })).toHaveValue('Please reserve a place near the front.')
    expect(screen.getByRole('link', { name: 'Email Annie' })).toHaveAttribute('href', 'mailto:anniesyoga@yahoo.ie')
    expect(screen.getByText('Call Annie', { exact: true })).toBeVisible()
    expect(screen.queryByRole('link', { name: 'Call Annie' })).not.toBeInTheDocument()
  })

  it.each([
    ['a network failure', () => Promise.reject(new TypeError('Failed to fetch'))],
    [
      'a provider rejection',
      () => Promise.resolve(new Response(JSON.stringify({ success: false }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      })),
    ],
  ])('keeps the reservation recoverable after %s', async (_scenario, response) => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(response)
    const user = userEvent.setup()
    render(<SchedulePage />, { wrapper: MemoryRouter })

    await user.click(screen.getAllByRole('button', { name: 'Book' })[0])
    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Alex Murphy')
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'alex@example.com')
    await user.type(screen.getByRole('textbox', { name: /Anything Annie should know/ }), 'I am new to yoga.')
    await user.click(screen.getByRole('button', { name: 'Complete captcha' }))
    await user.click(screen.getByRole('button', { name: 'Request reservation' }))

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent('Annie has not received your request.')
    expect(alert).toHaveFocus()
    expect(screen.getByRole('textbox', { name: /Anything Annie should know/ })).toHaveValue('I am new to yoga.')
    expect(screen.getByRole('link', { name: 'Email Annie' })).toBeInTheDocument()
  })

  it('closes the reservation dialog without sending anything', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.spyOn(globalThis, 'fetch')
    render(<SchedulePage />, { wrapper: MemoryRouter })

    await user.click(screen.getAllByRole('button', { name: 'Book' })[0])
    expect(screen.getByRole('dialog', { name: 'Reserve Yoga' })).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Close booking dialog' }))

    expect(screen.queryByRole('dialog', { name: 'Reserve Yoga' })).not.toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
    expect(screen.getByRole('heading', { name: 'Weekly Class Schedule' })).toBeInTheDocument()
  })

  it('closes the reservation dialog when the visitor clicks the blurred backdrop', async () => {
    const user = userEvent.setup()
    render(<SchedulePage />, { wrapper: MemoryRouter })

    await user.click(screen.getAllByRole('button', { name: 'Book' })[0])
    const dialog = screen.getByRole('dialog', { name: 'Reserve Yoga' })

    await user.click(dialog)

    expect(screen.queryByRole('dialog', { name: 'Reserve Yoga' })).not.toBeInTheDocument()
  })
})
