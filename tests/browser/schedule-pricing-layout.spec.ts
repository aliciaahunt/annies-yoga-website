import { expect, test, type Page } from '@playwright/test'

async function pricingChoiceSizes(page: Page) {
  const pricing = page.getByRole('region', { name: 'Class pricing' })
  const choices = await Promise.all(
    ['Yoga pricing', 'Pilates pricing'].flatMap((planName) => (
      ['Single class', 'Six-week bundle'].map(async (choiceName) => {
        const plan = pricing.getByRole('article', { name: planName })
        const choice = plan.getByText(choiceName, { exact: true }).locator('..')
        const bounds = await choice.boundingBox()
        expect(bounds, `${planName} ${choiceName} should be visible`).not.toBeNull()
        return bounds!
      })
    )),
  )
  return choices
}

for (const viewport of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  test(`all class pricing choices have identical dimensions on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('schedule')

    const [first, ...choices] = await pricingChoiceSizes(page)
    for (const choice of choices) {
      expect(choice.width).toBeCloseTo(first.width, 0)
      expect(choice.height).toBeCloseTo(first.height, 0)
    }
  })
}
