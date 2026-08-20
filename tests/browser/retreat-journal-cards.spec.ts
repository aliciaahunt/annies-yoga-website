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

test('hovering the upcoming retreat enlarges the complete card as one unit', async ({ page }) => {
  await page.goto('retreats')

  for (const heading of ['Dromantine Retreat Centre']) {
    const card = page.locator('.retreat-card').filter({ has: page.getByRole('heading', { name: heading }) })
    const image = card.locator('.retreat-card-image > img')
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

    await page.mouse.move(0, 0)
  }
})

test('the upcoming retreat presents four concise details', async ({ page }) => {
  await page.goto('retreats')

  for (const heading of ['Dromantine Retreat Centre']) {
    const card = page.locator('.retreat-card').filter({ has: page.getByRole('heading', { name: heading }) })
    const details = card.getByRole('list').getByRole('listitem')
    await expect(details).toHaveCount(4)
    await expect(details.first()).toContainText('Iyengar yoga')
    await expect(details.nth(1)).toContainText('accommodation')
    await expect(details.nth(3)).toContainText('per person')
  }
})

test('the upcoming retreat clearly shows booking status and included meals', async ({ page }) => {
  await page.goto('retreats')

  const dromantine = page.locator('.retreat-card').filter({ has: page.getByRole('heading', { name: 'Dromantine Retreat Centre' }) })
  await expect(dromantine.getByText('Bookings open', { exact: true })).toBeVisible()
  await expect(dromantine.getByText('Breakfast, lunch and dinner included', { exact: true })).toBeVisible()
  await expect(dromantine.getByText('Travel to Dromantine not included', { exact: true })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Locanda della Quercia Calante' })).toHaveCount(0)
})

test('each upcoming retreat can start a retreat-specific booking enquiry', async ({ page }) => {
  await page.goto('retreats')

  for (const retreat of ['Dromantine Retreat Centre']) {
    const card = page.locator('.retreat-card').filter({ has: page.getByRole('heading', { name: retreat }) })
    const bookButton = card.getByRole('button', { name: 'Book with Annie' })

    await expect(bookButton).toBeVisible()
    await bookButton.click()

    const dialog = page.getByRole('dialog', { name: `Enquire about ${retreat}` })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText('Retreats', { exact: true })).toBeVisible()
    await expect(dialog.getByText(retreat, { exact: true })).toBeVisible()
    await dialog.getByRole('button', { name: 'Close enquiry' }).click()
    await expect(bookButton).toBeFocused()
  }
})

test('each upcoming retreat opens its own multi-photo retreat gallery', async ({ page }) => {
  await page.goto('retreats')

  for (const retreat of ['Dromantine Retreat Centre']) {
    const card = page.locator('.retreat-card').filter({ has: page.getByRole('heading', { name: retreat }) })
    const viewPhotos = card.getByRole('button', { name: `View photos from ${retreat}` })

    await expect(viewPhotos).toBeVisible()
    await viewPhotos.click()

    const viewer = page.getByRole('dialog', { name: `${retreat} photo gallery` })
    await expect(viewer).toBeVisible()
    await expect(viewer.getByText(/1 \/ [2-9]/)).toBeVisible()
    await viewer.getByRole('button', { name: 'Next photograph' }).click()
    await expect(viewer.getByText(/2 \/ [2-9]/)).toBeVisible()
    await viewer.getByRole('button', { name: 'Close photo gallery' }).click()
    await expect(viewPhotos).toBeFocused()
  }
})

test('upcoming retreats share a card colour and lifted cards use the same subtle shadow', async ({ page }) => {
  await page.goto('retreats')

  const upcomingCards = page.locator('.retreat-card')
  const firstBackground = await upcomingCards.nth(0).evaluate((card) => getComputedStyle(card).backgroundColor)
  const secondBackground = await upcomingCards.nth(1).evaluate((card) => getComputedStyle(card).backgroundColor)
  expect(secondBackground).toBe(firstBackground)

  const upcomingShadow = await upcomingCards.nth(0).evaluate((card) => getComputedStyle(card).boxShadow)
  const journalShadow = await page.getByRole('button', { name: /Summer at Santillán/ })
    .evaluate((card) => getComputedStyle(card).boxShadow)
  expect(upcomingShadow).toBe('rgba(45, 57, 48, 0.14) 0px 4px 14px 0px')
  expect(journalShadow).toBe(upcomingShadow)
})

test('upcoming retreat cards share an aligned four-by-three editorial layout', async ({ page }) => {
  await page.goto('retreats')

  const cards = page.locator('.retreat-card')
  const firstCard = await cards.nth(0).boundingBox()
  const secondCard = await cards.nth(1).boundingBox()
  const firstMedia = await cards.nth(0).locator('.retreat-card-image').boundingBox()
  const secondMedia = await cards.nth(1).locator('.retreat-card-image').boundingBox()
  const firstFacts = await cards.nth(0).getByRole('list').boundingBox()
  const secondFacts = await cards.nth(1).getByRole('list').boundingBox()
  const firstAction = await cards.nth(0).getByRole('button', { name: 'Book with Annie' }).boundingBox()
  const secondAction = await cards.nth(1).getByRole('button', { name: 'Book with Annie' }).boundingBox()

  expect(firstCard).not.toBeNull()
  expect(secondCard).not.toBeNull()
  expect(firstCard!.height).toBeCloseTo(secondCard!.height, 0)
  expect(firstMedia!.width / firstMedia!.height).toBeCloseTo(4 / 3, 1)
  expect(secondMedia!.width / secondMedia!.height).toBeCloseTo(4 / 3, 1)
  expect(firstFacts!.y).toBeCloseTo(secondFacts!.y, 0)
  expect(firstAction!.y).toBeCloseTo(secondAction!.y, 0)
})

test('upcoming retreat cards retain matching proportions and actions on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('retreats')

  const cards = page.locator('.retreat-card')
  const firstCard = await cards.nth(0).boundingBox()
  const secondCard = await cards.nth(1).boundingBox()
  const firstAction = await cards.nth(0).getByRole('button', { name: 'Book with Annie' }).boundingBox()
  const secondAction = await cards.nth(1).getByRole('button', { name: 'Book with Annie' }).boundingBox()

  expect(firstCard).not.toBeNull()
  expect(secondCard).not.toBeNull()
  expect(firstCard!.height).toBeCloseTo(secondCard!.height, 0)
  expect(firstAction!.width).toBeCloseTo(firstCard!.width - 40, 0)
  expect(secondAction!.width).toBeCloseTo(secondCard!.width - 40, 0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390)
})

test('the pointer hand remains consistent across every upcoming retreat card surface', async ({ page }) => {
  await page.goto('retreats')

  for (const card of await page.locator('.retreat-card').all()) {
    for (const surface of [
      card,
      card.locator('.retreat-card-image'),
      card.getByRole('list'),
      card.getByRole('button', { name: 'Book with Annie' }),
    ]) {
      await expect(surface).toHaveCSS('cursor', 'pointer')
    }
  }
})

test('retreat details remain readable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('retreats')

  for (const card of await page.locator('.retreat-card').all()) {
    const details = card.getByRole('list').getByRole('listitem')
    await expect(details).toHaveCount(6)
    for (const detail of await details.all()) await expect(detail).toBeVisible()
  }
})
