import { expect, test } from '@playwright/test'

test('primary pages avoid decorative labels that repeat their adjacent headings', async ({ page }) => {
  const redundantLabelsByPage = {
    '': ['Meet your teacher', 'Find your practice', 'Start where you are'],
    about: ['Meet your teacher', 'Find your practice'],
    contact: ['Start where you are', 'Let’s talk'],
    'private-classes': ['A practice made for you', 'Individual attention', 'Start a conversation'],
    schedule: ['Move with Annie'],
  }

  for (const [path, labels] of Object.entries(redundantLabelsByPage)) {
    await page.goto(path)
    for (const label of labels) {
      await expect(page.getByText(label, { exact: true })).toHaveCount(0)
    }
  }
})
