import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '@/app/App'

describe('homepage offerings', () => {
  it('ends with the footer instead of repeating contact details', () => {
    render(<App />, { wrapper: MemoryRouter })

    expect(screen.queryByRole('heading', { name: /Ready to make space for yourself/i })).not.toBeInTheDocument()
  })

  it('presents three complete linked cards using the retreat-journal presentation', () => {
    render(<App />, { wrapper: MemoryRouter })

    const offerings = [
      { name: 'Weekly classes', href: '/schedule' },
      { name: 'Retreats', href: '/retreats' },
      { name: 'Private classes', href: '/private-classes' },
    ]

    for (const offering of offerings) {
      const card = screen.getByRole('heading', { name: offering.name }).closest('a')
      expect(card).not.toBeNull()
      if (!card) throw new Error(`${offering.name} card is not linked`)
      expect(card).toHaveAttribute('href', offering.href)
      expect(card).toHaveClass('retreat-journal-card')
      expect(within(card).getByRole('heading', { name: offering.name })).toBeInTheDocument()
      expect(within(card).getByRole('img')).toBeInTheDocument()
    }

    expect(screen.getByRole('img', {
      name: 'Annie seated while retreat guests rest together in the open-air yoga pavilion at Santillan',
    })).toHaveAttribute('src', expect.stringContaining('/images/retreats/santillan-july-2026/open-air-yoga-pavilion.jpg'))
  })

  it('moves directly from the offering cards to the closing image', () => {
    render(<App />, { wrapper: MemoryRouter })

    expect(screen.queryByText('Weekly movement, restorative moments and thoughtful escapes from the everyday.')).not.toBeInTheDocument()
    expect(screen.queryByText('Your space to reset')).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /Come as you are.*Leave feeling lighter/i })).not.toBeInTheDocument()
    expect(screen.queryByText(/Annie's Yoga is a warm, down-to-earth space/)).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Find your class' })).not.toBeInTheDocument()

    const offeringsSection = screen.getByRole('heading', { name: 'A practice for every season' }).closest('section')
    const closingImage = screen.getByAltText('Annie practising downward-facing dog with a puppy beside the Donegal coast')
    expect(offeringsSection?.nextElementSibling).toContainElement(closingImage)
  })
})
