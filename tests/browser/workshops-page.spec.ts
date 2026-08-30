import { expect, test } from '@playwright/test'

test('workshop details lead to the reservation flow', async ({ page }) => {
  await page.goto('workshops')

  await expect(page.getByRole('heading', { name: 'Iyengar Yoga with Aisling Guirke' })).toBeVisible()
  await expect(page.getByText('All abilities welcome')).toBeVisible()
  await expect(page.getByText(/Together, Aisling and Annie will guide the day/)).toBeVisible()
  await expect(page.getByText('Please bring your own lunch.', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Request a place' }).click()
  await expect(page.getByRole('dialog', { name: 'Reserve Iyengar Yoga with Aisling Guirke' })).toBeVisible()
})

test('workshop page remains within the mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('workshops')

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }))
  expect(dimensions.content).toBe(dimensions.viewport)
  await expect(page.getByRole('button', { name: 'Request a place' })).toBeVisible()
})
