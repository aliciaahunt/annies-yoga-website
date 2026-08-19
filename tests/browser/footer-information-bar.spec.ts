import { expect, test, type Locator, type Page } from '@playwright/test'

function footerContent(page: Page) {
  const footer = page.locator('footer.site-footer')
  return {
    footer,
    brand: footer.getByRole('link', { name: "Annie's Yoga" }),
    contact: footer.getByRole('link', { name: 'Contact' }),
    location: footer.getByText(/Strabane & Castlederg/),
    phone: footer.getByText('07716 034570', { exact: true }),
    email: footer.getByRole('link', { name: 'anniesyoga@yahoo.ie' }),
    social: footer.getByRole('navigation', { name: "Follow Annie's Yoga" }),
    copyright: footer.getByText(/© \d{4} Annie's Yoga/),
  }
}

async function topOf(locator: Locator) {
  const bounds = await locator.boundingBox()
  expect(bounds).not.toBeNull()
  return bounds!.y
}

test('footer presents a compact desktop contact information bar', async ({ page }) => {
  await page.goto('')
  const content = footerContent(page)

  await expect(content.contact).toHaveAttribute('href', '/annies-yoga-website/contact')
  await expect(content.email).toHaveAttribute('href', 'mailto:anniesyoga@yahoo.ie')
  await expect(content.footer.getByRole('link', { name: 'Facebook' })).toHaveAttribute('href', 'https://www.facebook.com/anniesyoga/')
  await expect(content.footer.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', 'https://www.instagram.com/anniedeery/')
  await expect(content.footer).toHaveCSS('background-color', 'rgb(35, 51, 41)')
  for (const item of [content.brand, content.contact, content.location, content.phone, content.email, content.social, content.copyright]) {
    await expect(item).toHaveCSS('color', 'rgb(255, 255, 255)')
  }

  const rowTops = await Promise.all([
    content.brand,
    content.contact,
    content.location,
    content.phone,
    content.social,
  ].map(topOf))
  expect(Math.max(...rowTops) - Math.min(...rowTops)).toBeLessThanOrEqual(8)

  const socialBounds = await content.social.boundingBox()
  const copyrightTop = await topOf(content.copyright)
  expect(copyrightTop).toBeGreaterThan(socialBounds!.y + socialBounds!.height)
})

test('footer stacks the same information within the mobile gutter', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('')
  const content = footerContent(page)
  const groups = [content.brand, content.contact, content.location, content.phone, content.social, content.copyright]

  const bounds = await Promise.all(groups.map((group) => group.boundingBox()))
  for (const box of bounds) {
    expect(box).not.toBeNull()
    expect(box!.x).toBe(42)
  }
  for (let index = 1; index < bounds.length; index += 1) {
    expect(bounds[index]!.y).toBeGreaterThan(bounds[index - 1]!.y)
  }
})
