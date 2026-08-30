import { expect, test } from '@playwright/test'

test.use({
  hasTouch: true,
  isMobile: true,
  viewport: { width: 390, height: 844 },
})

const classDestinations = [
  { link: 'Studio classes', path: '/schedule', heading: /class schedule/i },
  { link: 'Private classes', path: '/private-classes', heading: /private classes/i },
]

for (const destination of classDestinations) {
  test(`mobile Classes menu navigates to ${destination.link}`, async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Open menu' }).tap()
    await page.getByText('Classes', { exact: true }).tap()
    await page.getByRole('link', { name: destination.link, exact: true }).tap()

    await expect(page).toHaveURL(destination.path)
    await expect(page.getByRole('heading', { name: destination.heading }).first()).toBeVisible()
  })
}
