import { expect, test } from '@playwright/test'

const mobileViewport = { width: 390, height: 844 }
const gutter = 42

const pages = [
  { path: '', selectors: ['.hero-content', '.stories-section > .section-shell'] },
  { path: 'schedule', selectors: ['.page-hero-content', '.schedule-shell'] },
  { path: 'retreats', selectors: ['.retreats-hero-copy', '.retreats-upcoming > .section-shell'] },
  { path: 'private-classes', selectors: ['.page-hero-content', '.private-offerings > .section-shell'] },
  { path: 'about', selectors: ['.about-page-hero > .section-shell', '.about-page-approach > .section-shell'] },
  { path: 'contact', selectors: ['.contact-page-hero > .section-shell', '.contact-page-details > .section-shell'] },
]

test('all mobile content uses the same site-wide gutter', async ({ page }) => {
  await page.setViewportSize(mobileViewport)

  for (const route of pages) {
    await page.goto(route.path)

    const selectors = ['.site-header-inner', ...route.selectors]
    for (const selector of selectors) {
      const bounds = await page.locator(selector).boundingBox()
      expect(bounds, `${route.path || 'home'} ${selector} should be visible`).not.toBeNull()
      expect(bounds?.x, `${route.path || 'home'} ${selector} left gutter`).toBe(gutter)
      expect(bounds?.width, `${route.path || 'home'} ${selector} right gutter`).toBe(mobileViewport.width - (gutter * 2))
    }

    await expect(page.locator('.footer-brand')).toHaveCSS('margin-left', '0px')
    expect((await page.locator('.footer-brand').boundingBox())?.x, `${route.path || 'home'} footer gutter`).toBe(gutter)
  }
})
