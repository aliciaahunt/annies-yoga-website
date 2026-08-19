/// <reference types="node" />

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import AboutPage from '@/app/AboutPage'
import App from '@/app/App'
import ContactPage from '@/app/ContactPage'
import PrivateClassesPage from '@/app/PrivateClassesPage'
import RetreatsPage from '@/app/RetreatsPage'
import SchedulePage from '@/app/SchedulePage'

const componentStyles = readFileSync(resolve(process.cwd(), 'src/styles/components.css'), 'utf8')

vi.mock('@hcaptcha/react-hcaptcha', () => ({
  default: () => <div aria-label="Spam check" />,
}))

let productionStyles: HTMLStyleElement

beforeAll(() => {
  const surfaceSelectors = [
    '.site-footer',
    '.contact-section',
    '.weekly-schedule',
    '.private-enquiry',
    '.retreats-enquiry',
    '.about-page-next-step',
    '.contact-page-details',
  ]
  const surfaceStyles = surfaceSelectors.map((selector) => {
    const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const rule = componentStyles.match(new RegExp(`^${escapedSelector}\\s*\\{[^}]+\\}`, 'm'))?.[0]
    if (!rule) throw new Error(`Missing production surface rule for ${selector}`)
    return rule
  }).join('\n')

  productionStyles = document.createElement('style')
  productionStyles.textContent = surfaceStyles
    .replaceAll('var(--cream)', '#f2efe5')
    .replaceAll('var(--paper)', '#faf8f2')
    .replaceAll('var(--sage)', '#aebaa3')
    .replaceAll('var(--moss)', '#53634b')
    .replaceAll('var(--moss-deep)', '#46583f')
    .replaceAll('var(--forest)', '#233329')
    .replaceAll('var(--ink)', '#1f2c24')
    .replaceAll('var(--muted)', '#657066')
    .replaceAll('var(--line)', 'rgba(35, 51, 41, 0.18)')
  document.head.append(productionStyles)
})

afterAll(() => productionStyles?.remove())

const primaryPages = [
  ['Home', App],
  ['Studio Classes', SchedulePage],
  ['Private Classes', PrivateClassesPage],
  ['Retreats', RetreatsPage],
  ['About', AboutPage],
  ['Contact', ContactPage],
] as const

describe('footer contrast', () => {
  it('visually separates the footer from the final content section on every primary page', () => {
    primaryPages.forEach(([pageName, Page]) => {
      const { container, unmount } = render(<Page />, { wrapper: MemoryRouter })
      const finalSection = container.querySelector('main > section:last-child')
      const footer = container.querySelector('footer.site-footer')

      expect(finalSection, `${pageName} should have a final content section`).not.toBeNull()
      expect(footer, `${pageName} should have a standard footer`).not.toBeNull()
      expect.soft(
        getComputedStyle(footer!).backgroundColor,
        `${pageName} footer should contrast with its final content section`,
      ).not.toBe(getComputedStyle(finalSection!).backgroundColor)

      unmount()
    })
  })
})
