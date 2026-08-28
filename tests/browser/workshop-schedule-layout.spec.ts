import { expect, test } from '@playwright/test'

test('the workshop does not resize or displace the weekly timetable', async ({ page }) => {
  await page.clock.setFixedTime(new Date(2026, 7, 28, 12))
  await page.goto('schedule')

  const morningBand = page.locator('[data-time-band="morning"]')
  const normalBandBounds = await morningBand.boundingBox()
  const normalDayBounds = await morningBand.locator('.timetable-day').nth(1).boundingBox()
  expect(normalBandBounds).not.toBeNull()
  expect(normalDayBounds).not.toBeNull()

  const nextWeek = page.getByRole('button', { name: 'Next week' })
  for (let index = 0; index < 8; index += 1) await nextWeek.click()
  await expect(page.getByText('18 – 24 Oct 2026')).toBeVisible()

  const workshopBandBounds = await morningBand.boundingBox()
  const workshopWeekDayBounds = await morningBand.locator('.timetable-day').nth(1).boundingBox()
  expect(workshopBandBounds).not.toBeNull()
  expect(workshopWeekDayBounds).not.toBeNull()
  expect(workshopBandBounds!.height).toBeCloseTo(normalBandBounds!.height, 0)
  expect(workshopBandBounds!.width).toBeCloseTo(normalBandBounds!.width, 0)
  expect(workshopWeekDayBounds!.width).toBeCloseTo(normalDayBounds!.width, 0)
  await expect(page.locator('.workshop-schedule-block')).toBeVisible()
})
