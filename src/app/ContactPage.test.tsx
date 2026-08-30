import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import ContactPage from '@/app/ContactPage'

vi.mock('@hcaptcha/react-hcaptcha', () => ({
  default: () => <div aria-label="Spam check" />,
}))

describe('ContactPage', () => {
  it('presents direct contact and the enquiry form beside the class locations', () => {
    render(<ContactPage />, { wrapper: MemoryRouter })

    const formHeading = screen.getByRole('heading', { name: 'Send an enquiry' })
    const locationsHeading = screen.getByRole('heading', { name: 'Find your class' })

    expect(screen.getAllByRole('link', { name: 'anniesyoga@yahoo.ie' })).toHaveLength(2)
    screen.getAllByRole('link', { name: 'anniesyoga@yahoo.ie' }).forEach((link) => {
      expect(link).toHaveAttribute('href', 'mailto:anniesyoga@yahoo.ie')
    })
    expect(screen.getByRole('form', { name: 'Send an enquiry' })).toBeInTheDocument()
    expect(formHeading.compareDocumentPosition(locationsHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })
})
