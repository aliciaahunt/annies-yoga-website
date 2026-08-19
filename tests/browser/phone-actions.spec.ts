import { devices, expect, test } from '@playwright/test'

const iPhone = devices['iPhone 13']

test('desktop visitors see Annie’s phone details without clickable call links', async ({ page }) => {
  for (const path of ['', 'about', 'contact', 'private-classes', 'retreats', 'schedule']) {
    await page.goto(path)
    await expect(page.getByText('07716 034570', { exact: true }).first()).toBeVisible()
    await expect(page.locator('a[href="tel:+447716034570"]')).toHaveCount(0)
  }
})

test('desktop contact actions align their icons and text in consistent columns', async ({ page }) => {
  await page.goto('')

  const actions = page.locator('.contact-actions > *')
  await expect(actions).toHaveCount(3)

  const iconPositions = await actions.locator('svg').evaluateAll((icons) =>
    icons.map((icon) => icon.getBoundingClientRect().x),
  )
  const textPositions = await actions.locator(':scope > span').evaluateAll((labels) =>
    labels.map((label) => label.getBoundingClientRect().x),
  )

  expect(new Set(iconPositions.map(Math.round)).size).toBe(1)
  expect(new Set(textPositions.map(Math.round)).size).toBe(1)
})

test.describe('on a mobile phone', () => {
  test.use({
    deviceScaleFactor: iPhone.deviceScaleFactor,
    hasTouch: iPhone.hasTouch,
    isMobile: iPhone.isMobile,
    userAgent: iPhone.userAgent,
    viewport: iPhone.viewport,
  })

  test('Annie’s phone actions are working call links throughout the website', async ({ page }) => {
    for (const path of ['', 'about', 'contact', 'private-classes', 'retreats', 'schedule']) {
      await page.goto(path)
      const callLinks = page.locator('a[href="tel:+447716034570"]')
      await expect(callLinks.first()).toBeVisible()
      expect(await callLinks.count()).toBeGreaterThan(0)
    }
  })
})
