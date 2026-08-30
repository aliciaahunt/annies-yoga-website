import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import RetreatsPage from '@/app/RetreatsPage'

vi.mock('@hcaptcha/react-hcaptcha', () => ({
  default: () => <div aria-label="Spam check" />,
}))

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function openDialog(this: HTMLDialogElement) {
    this.setAttribute('open', '')
  })
})

describe('retreats page ending', () => {
  it('ends with the footer instead of repeating retreat contact details', () => {
    render(<RetreatsPage />, { wrapper: MemoryRouter })

    expect(screen.queryByRole('heading', { name: /Come away/i })).not.toBeInTheDocument()
    expect(screen.queryByText('A small glimpse into the practice, places and people that shape each retreat.')).not.toBeInTheDocument()
  })
})

describe('upcoming retreats', () => {
  it('presents the Blue Haven weekend retreat and accommodation prices', () => {
    render(<RetreatsPage />, { wrapper: MemoryRouter })

    expect(screen.getByRole('heading', { name: 'The Blue Haven' })).toBeInTheDocument()
    expect(screen.getByText('October 23–25, 2025')).toBeInTheDocument()
    expect(screen.getByText('10 hours of Iyengar yoga included')).toBeInTheDocument()
    expect(screen.getByText('Friday scones, all Saturday meals, and Sunday breakfast and lunch included')).toBeInTheDocument()
    expect(screen.getByText('Shared accommodation: €395 per person')).toBeInTheDocument()
    expect(screen.getByText('Single accommodation: €480 per person')).toBeInTheDocument()
    expect(screen.getByText('A €100 deposit is required at the time of booking. The remaining balance is due no later than 24 hours before the retreat begins.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'View photos from The Blue Haven' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'A sweeping view over the beach and Donegal Bay near The Blue Haven' })).toHaveAttribute(
      'src',
      expect.stringContaining('/images/retreats/upcoming/blue-haven/donegal-bay-view.png'),
    )
    expect(screen.getByText('View 5 photos')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Book with Annie' })).toBeInTheDocument()
  })

  it('shows the high-resolution sea-view dining room photograph in the Blue Haven gallery', async () => {
    const user = userEvent.setup()
    render(<RetreatsPage />, { wrapper: MemoryRouter })

    await user.click(screen.getByRole('button', { name: 'View photos from The Blue Haven' }))
    await user.click(screen.getByRole('button', { name: 'View photograph 5' }))

    expect(screen.getByRole('img', { name: 'The sea-view dining room at The Blue Haven' })).toHaveAttribute(
      'src',
      expect.stringContaining('/images/retreats/upcoming/blue-haven/sea-view-dining-room.png'),
    )
  })
})
