import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import WorkshopsPage from '@/app/WorkshopsPage'

vi.mock('@/components/TurnstileCheck', () => ({
  default: ({ onTokenChange }: { onTokenChange: (token: string) => void }) => (
    <button type="button" onClick={() => onTokenChange('verified-token')}>Complete spam check</button>
  ),
}))

describe('WorkshopsPage', () => {
  it('presents the confirmed workshop in a retreat-style card', () => {
    const { container } = render(<WorkshopsPage />, { wrapper: MemoryRouter })

    expect(screen.getByRole('heading', { name: 'Yoga workshops' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'A day to deepen your practice' })).toBeInTheDocument()
    expect(screen.getByText(/Workshops offer more time/)).toHaveTextContent('Workshops offer more time than a weekly class to explore poses in detail, ask questions and receive thoughtful, individual guidance.')
    expect(screen.getByRole('heading', { name: 'Upcoming workshops.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Iyengar Yoga with Aisling Guirke' })).toBeInTheDocument()
    expect(screen.getByText('Saturday 24 October 2026')).toBeInTheDocument()
    expect(screen.getByText('Aisling Guirke · Level 3 Iyengar Yoga teacher')).toBeInTheDocument()
    expect(screen.getByText(/One of Ireland’s most senior Iyengar Yoga teachers/)).toHaveTextContent(/Together, Aisling and Annie will guide the day/)
    expect(screen.getByText('All abilities welcome')).toBeInTheDocument()
    expect(screen.getByText('Guided by Aisling and Annie')).toBeInTheDocument()
    expect(screen.getByText('Please bring your own lunch.')).toBeInTheDocument()
    expect(screen.getByText('Drinks and light refreshments included.')).toBeInTheDocument()
    expect(screen.getByText('Christ Church, 22 Bowling Grn, Strabane BT82 8BW')).toBeInTheDocument()
    expect(screen.getByText('Payment is required at the time of booking. Please contact Annie to arrange your preferred payment method.')).toBeInTheDocument()
    expect(screen.getByRole('list')).toHaveTextContent('10:00 am–4:00 pm, with morning and afternoon practice')
    expect(screen.getByRole('button', { name: 'View details for Iyengar Yoga with Aisling Guirke' })).toBeInTheDocument()
    expect(container.querySelector('script[type="application/ld+json"]')).toHaveTextContent('EventScheduled')
  })

  it('opens the shared workshop reservation flow', async () => {
    const user = userEvent.setup()
    render(<WorkshopsPage />, { wrapper: MemoryRouter })

    await user.click(screen.getByRole('button', { name: 'Request a place' }))

    const dialog = screen.getByRole('dialog', { name: 'Reserve Iyengar Yoga with Aisling Guirke' })
    expect(dialog).toHaveTextContent('Saturday 24 October')
    expect(dialog).toHaveTextContent('All abilities welcome')
    expect(within(dialog).getByLabelText('Workshop pricing')).toHaveTextContent('£65 including refreshments')
  })

  it('adds Workshops to the primary navigation', () => {
    render(<WorkshopsPage />, { wrapper: MemoryRouter })

    expect(screen.getByRole('link', { name: 'Workshops' })).toHaveAttribute('href', '/workshops')
  })
})
