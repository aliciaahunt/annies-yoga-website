import { expect, test } from '@playwright/test'

test('the retreats page uses clear headings without redundant promotional labels', async ({ page }) => {
  await page.goto('retreats')

  await expect(page.getByRole('heading', { level: 1, name: 'Yoga retreats' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Past Retreats' })).toBeVisible()
  await expect(page.getByText('Ireland & further afield', { exact: true })).toHaveCount(0)
  await expect(page.getByText(/Thoughtful practice, nourishing food/)).toHaveCount(0)
  await expect(page.getByText('Past retreats', { exact: true })).toHaveCount(0)
})

test('each past retreat card prioritises its title, date, location, and unobscured journal action', async ({ page }) => {
  await page.goto('retreats')

  const card = page.getByRole('button', { name: /Summer at Santillán/ })
  await expect(card.getByRole('heading', { level: 3, name: 'Summer at Santillán' })).toBeVisible()
  await expect(card.getByText('5–11 July 2026', { exact: true })).toBeVisible()
  await expect(card.getByText('Spain', { exact: true })).toBeVisible()
  await expect(card.getByText('Practice, shared tables and long summer days.', { exact: true })).toHaveCount(0)

  const imageBox = await card.locator('.retreat-journal-card-image').boundingBox()
  const action = card.getByText('View journal', { exact: true })
  const actionBox = await action.boundingBox()
  expect(imageBox).not.toBeNull()
  expect(actionBox).not.toBeNull()
  expect(actionBox!.y).toBeGreaterThanOrEqual(imageBox!.y + imageBox!.height)
  await expect(card.getByText('5–11 July 2026', { exact: true })).toHaveCSS('font-size', '16px')
  await expect(card.getByText('Spain', { exact: true })).toHaveCSS('font-size', '16px')
})

test('opening a retreat journal presents an inset photo viewer', async ({ page }) => {
  await page.goto('retreats')

  await page.getByRole('button', { name: /Summer at Santillán/ }).click()

  const viewer = page.getByRole('dialog', { name: 'Summer at Santillán photo journal' })
  await expect(viewer).toBeVisible()
  const box = await viewer.boundingBox()
  expect(box).not.toBeNull()
  expect(box!.x).toBeGreaterThanOrEqual(24)
  expect(box!.y).toBeGreaterThanOrEqual(24)
  expect(box!.x + box!.width).toBeLessThanOrEqual(1416)
  expect(box!.y + box!.height).toBeLessThanOrEqual(876)
})

test('a retreat journal shows the complete photo without horizontal scrolling on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('retreats')

  await page.getByRole('button', { name: /Summer at Santillán/ }).click()

  const viewer = page.getByRole('dialog', { name: 'Summer at Santillán photo journal' })
  const photo = viewer.getByAltText('A yoga class resting in the open-air pavilion at Santillán')

  await expect(viewer).toBeVisible()
  await expect(photo).toBeVisible()
  await expect(viewer.getByLabel('Choose a photograph')).toBeHidden()
  await expect(viewer.getByRole('button', { name: 'Previous photograph' })).toBeVisible()
  await expect(viewer.getByRole('button', { name: 'Next photograph' })).toBeVisible()

  const layout = await viewer.evaluate((dialog) => {
    const image = dialog.querySelector('.retreat-gallery-stage > img')!
    const dialogBounds = dialog.getBoundingClientRect()
    const imageBounds = image.getBoundingClientRect()

    return {
      hasHorizontalOverflow: dialog.scrollWidth > dialog.clientWidth,
      imageFitsHorizontally:
        imageBounds.left >= dialogBounds.left && imageBounds.right <= dialogBounds.right,
    }
  })

  expect(layout).toEqual({
    hasHorizontalOverflow: false,
    imageFitsHorizontally: true,
  })
})

test('the margin around an open retreat journal shows the blurred retreats page', async ({ page }) => {
  await page.goto('retreats')

  await page.getByRole('button', { name: /Summer at Santillán/ }).click()

  const backdropStyles = await page.getByRole('dialog').evaluate((dialog) => {
    const styles = getComputedStyle(dialog, '::backdrop')
    return {
      backdropFilter: styles.backdropFilter,
      backgroundColor: styles.backgroundColor,
    }
  })
  expect(backdropStyles.backdropFilter).toBe('blur(8px)')
  expect(backdropStyles.backgroundColor).toBe('rgba(12, 15, 12, 0.28)')
})

test('clicking the margin around a retreat journal returns to the retreats page', async ({ page }) => {
  await page.goto('retreats')

  await page.getByRole('button', { name: /Summer at Santillán/ }).click()
  const viewer = page.getByRole('dialog', { name: 'Summer at Santillán photo journal' })
  await expect(viewer).toBeVisible()

  await page.mouse.click(12, 12)

  await expect(viewer).not.toBeVisible()
  await expect(page.getByRole('heading', { name: 'Past Retreats' })).toBeVisible()
})

test('hovering a retreat journal enlarges the complete card as one unit', async ({ page }) => {
  await page.goto('retreats')

  const card = page.getByRole('button', { name: /Summer at Santillán/ })
  const image = card.locator('.retreat-journal-card-image > img')

  const cardBeforeHover = await card.boundingBox()
  const imageBeforeHover = await image.boundingBox()
  expect(cardBeforeHover).not.toBeNull()
  expect(imageBeforeHover).not.toBeNull()

  await card.hover()

  await expect.poll(async () => (await card.boundingBox())?.width).toBeGreaterThan(cardBeforeHover!.width * 1.02)

  const cardAfterHover = await card.boundingBox()
  const imageAfterHover = await image.boundingBox()
  expect(cardAfterHover).not.toBeNull()
  expect(imageAfterHover).not.toBeNull()
  expect(Math.abs(
    imageAfterHover!.width / cardAfterHover!.width - imageBeforeHover!.width / cardBeforeHover!.width,
  )).toBeLessThan(0.002)
  await expect(image).toHaveCSS('transform', 'none')
})

test('upcoming retreats show a clear temporary message without stale booking details', async ({ page }) => {
  await page.goto('retreats')

  await expect(page.getByRole('heading', { level: 3, name: 'New retreats are on the way.' })).toBeVisible()
  await expect(page.getByText('Details will be shared here as soon as the next dates are confirmed.')).toBeVisible()
  await expect(page.getByText(/Dromantine/i)).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Book with Annie' })).toHaveCount(0)
  await expect(page.locator('.retreat-card')).toHaveCount(0)
})

test('the upcoming-retreat message fills the content width on desktop', async ({ page }) => {
  await page.goto('retreats')

  const section = page.locator('.retreats-upcoming .section-shell')
  const message = page.locator('.retreats-empty-state')
  const sectionBox = await section.boundingBox()
  const messageBox = await message.boundingBox()

  expect(sectionBox).not.toBeNull()
  expect(messageBox).not.toBeNull()
  expect(messageBox!.width).toBeCloseTo(sectionBox!.width, 0)
  await expect(message).toHaveCSS('cursor', 'auto')
})

test('the upcoming-retreat message remains readable without overflow on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('retreats')

  const message = page.locator('.retreats-empty-state')
  await expect(message).toBeVisible()
  await expect(message.getByRole('heading', { name: 'New retreats are on the way.' })).toHaveCSS('font-size', '34px')
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390)
})
