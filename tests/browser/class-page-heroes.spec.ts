import { expect, test } from '@playwright/test'

test('studio and private class pages use the same desktop hero height', async ({ page }) => {
  await page.goto('schedule')
  const studioHero = page.getByRole('region', { name: 'Studio classes introduction' })
  const studioHeight = (await studioHero.boundingBox())?.height

  await page.goto('private-classes')
  const privateHero = page.getByRole('region', { name: 'Private classes introduction' })
  const privateHeight = (await privateHero.boundingBox())?.height

  expect(studioHeight).toBeGreaterThan(0)
  expect(privateHeight).toBe(studioHeight)
})

test('an externally mounted captcha challenge appears above the private enquiry', async ({ page }) => {
  await page.goto('private-classes')
  await page.getByRole('button', { name: 'Send an enquiry' }).first().click()

  const hitElementId = await page.evaluate(() => {
    const challenge = document.createElement('div')
    challenge.id = 'simulated-hcaptcha-challenge'
    Object.assign(challenge.style, {
      position: 'fixed',
      inset: '200px auto auto 400px',
      width: '520px',
      height: '400px',
      zIndex: '2147483647',
    })
    document.body.append(challenge)

    return document.elementFromPoint(660, 400)?.id
  })

  expect(hitElementId).toBe('simulated-hcaptcha-challenge')
})
