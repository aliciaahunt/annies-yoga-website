import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import RetreatsPage from '@/app/RetreatsPage'

vi.mock('@hcaptcha/react-hcaptcha', () => ({
  default: () => <div aria-label="Spam check" />,
}))

describe('retreats page ending', () => {
  it('ends with the footer instead of repeating retreat contact details', () => {
    render(<RetreatsPage />, { wrapper: MemoryRouter })

    expect(screen.queryByRole('heading', { name: /Come away/i })).not.toBeInTheDocument()
  })
})

describe('upcoming retreat details', () => {
  it('presents Dromantine as the only upcoming retreat with six concise bullet points', () => {
    render(<RetreatsPage />, { wrapper: MemoryRouter })

    const expectedDetails = {
      'Dromantine Retreat Centre': [
        '10 hours of Iyengar yoga',
        'Two nights’ ensuite accommodation',
        'Breakfast, lunch and dinner included',
        'Vegetarian meals, with dietary needs accommodated',
        '£395 per person',
        'Travel to Dromantine not included',
      ],
    }

    for (const [retreat, details] of Object.entries(expectedDetails)) {
      const card = screen.getByRole('heading', { name: retreat }).closest('article')
      expect(card).not.toBeNull()
      if (!card) throw new Error(`${retreat} card was not found`)

      const list = within(card).getByRole('list')
      expect(within(list).getAllByRole('listitem')).toHaveLength(6)
      expect(within(list).getAllByRole('listitem').map((item) => item.textContent)).toEqual(details)
    }

    expect(screen.queryByRole('heading', { name: 'Included' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Not included' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Locanda della Quercia Calante' })).not.toBeInTheDocument()
  })
})
