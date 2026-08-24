import { render, screen } from '@testing-library/react'
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

describe('upcoming retreats', () => {
  it('presents a clear temporary message without an outdated retreat or booking action', () => {
    render(<RetreatsPage />, { wrapper: MemoryRouter })

    expect(screen.getByRole('heading', { name: 'New retreats are on the way.' })).toBeInTheDocument()
    expect(screen.getByText('Details will be shared here as soon as the next dates are confirmed.')).toBeInTheDocument()
    expect(screen.queryByText(/Dromantine/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Book with Annie' })).not.toBeInTheDocument()
  })
})
