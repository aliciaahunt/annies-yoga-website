import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import PrivateClassesPage from '@/app/PrivateClassesPage'

vi.mock('@hcaptcha/react-hcaptcha', () => ({
  default: () => <div aria-label="Spam check" />,
}))

describe('PrivateClassesPage', () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn(function openDialog(this: HTMLDialogElement) {
      this.setAttribute('open', '')
    })
    HTMLDialogElement.prototype.close = vi.fn(function closeDialog(this: HTMLDialogElement) {
      this.removeAttribute('open')
      this.dispatchEvent(new Event('close'))
    })
  })

  it('presents a focused private tuition offer with individual guidance', () => {
    render(<PrivateClassesPage />, { wrapper: MemoryRouter })

    expect(screen.getByRole('heading', { name: 'Private classes' })).toBeInTheDocument()
    expect(screen.getByAltText('Annie giving individual guidance to a student using wall ropes')).toHaveAttribute(
      'src',
      expect.stringContaining('/images/annie-private-yoga-guidance.jpg'),
    )
    expect(screen.getByRole('heading', { name: 'Yoga that starts with you.' })).toBeInTheDocument()
    expect(screen.getByText('From £40')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Send an enquiry' })).toHaveLength(1)
    expect(screen.getByRole('button', { name: 'Send an enquiry' }).closest('section')).toHaveAccessibleName('Private classes introduction')
    expect(screen.queryByRole('heading', { name: /Not sure what would suit you/i })).not.toBeInTheDocument()
    expect(screen.queryByText('Yoga in schools')).not.toBeInTheDocument()
    expect(screen.queryByText('Teacher training')).not.toBeInTheDocument()
  })

  it('opens a focused private-class enquiry with direct contact alternatives', async () => {
    const user = userEvent.setup()
    render(<PrivateClassesPage />, { wrapper: MemoryRouter })

    const trigger = screen.getByRole('button', { name: 'Send an enquiry' })
    await user.click(trigger)

    const dialog = screen.getByRole('dialog', { name: 'Send Annie an enquiry.' })
    expect(dialog).toBeVisible()
    expect(within(dialog).getByText('Private classes', { selector: '.enquiry-type-summary strong' })).toBeInTheDocument()
    expect(within(dialog).getByText('07716 034570', { exact: true })).toBeVisible()
    expect(within(dialog).queryByRole('link', { name: /07716 034570/ })).not.toBeInTheDocument()
    expect(within(dialog).getByRole('link', { name: /anniesyoga@yahoo.ie/ })).toHaveAttribute('href', 'mailto:anniesyoga@yahoo.ie')

    await user.click(screen.getByRole('button', { name: 'Close enquiry' }))
    expect(dialog).not.toBeVisible()
    expect(trigger).toHaveFocus()
  })
})
