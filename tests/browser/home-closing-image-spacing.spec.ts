import { expect, test } from '@playwright/test'

for (const viewport of [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  test(`Annie and dog image has equal space above and below on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto('')

    const finalCard = page.locator('.offering-cards > :last-child')
    const image = page.getByAltText('Annie practising downward-facing dog with a puppy beside the Donegal coast')
    const footer = page.locator('footer.site-footer')
    const [cardBox, imageBox, footerBox] = await Promise.all([
      finalCard.boundingBox(),
      image.boundingBox(),
      footer.boundingBox(),
    ])

    expect(cardBox).not.toBeNull()
    expect(imageBox).not.toBeNull()
    expect(footerBox).not.toBeNull()

    const spaceAbove = imageBox!.y - (cardBox!.y + cardBox!.height)
    const spaceBelow = footerBox!.y - (imageBox!.y + imageBox!.height)
    expect(Math.abs(spaceAbove - spaceBelow)).toBeLessThanOrEqual(1)
  })
}
