import { describe, expect, it } from 'vitest'
import { classesForDate, isChristmasClosure } from '@/app/scheduleData'

describe('weekly schedule data', () => {
  it('returns each day in chronological order', () => {
    const monday = classesForDate(new Date(2026, 7, 17))

    expect(monday.map((item) => item.startMinutes)).toEqual([660, 1080, 1170])
  })

  it.each([
    new Date(2025, 11, 25),
    new Date(2025, 11, 26),
    new Date(2026, 11, 25),
    new Date(2026, 11, 26),
  ])('removes recurring classes on the Christmas closure date %s', (date) => {
    expect(isChristmasClosure(date)).toBe(true)
    expect(classesForDate(date)).toEqual([])
  })

  it('does not remove classes on surrounding dates', () => {
    expect(isChristmasClosure(new Date(2026, 11, 24))).toBe(false)
    expect(classesForDate(new Date(2026, 11, 24))).not.toHaveLength(0)
  })
})
