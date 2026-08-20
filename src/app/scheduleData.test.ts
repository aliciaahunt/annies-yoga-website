import { describe, expect, it } from 'vitest'
import { classesForDate, isChristmasClosure } from '@/app/scheduleData'

describe('weekly schedule data', () => {
  it('returns each day in chronological order', () => {
    const monday = classesForDate(new Date(2026, 7, 17))

    expect(monday.map((item) => item.startMinutes)).toEqual([660, 1080, 1170])
  })

  it.each([
    new Date(2026, 11, 20),
    new Date(2026, 11, 21),
    new Date(2026, 11, 22),
    new Date(2026, 11, 23),
    new Date(2026, 11, 24),
    new Date(2026, 11, 25),
    new Date(2026, 11, 26),
  ])('removes all classes during the 20–26 December 2026 closure on %s', (date) => {
    expect(isChristmasClosure(date)).toBe(true)
    expect(classesForDate(date)).toEqual([])
  })

  it('does not remove classes immediately outside the 2026 closure week', () => {
    expect(isChristmasClosure(new Date(2026, 11, 19))).toBe(false)
    expect(classesForDate(new Date(2026, 11, 19))).not.toHaveLength(0)
    expect(isChristmasClosure(new Date(2026, 11, 27))).toBe(false)
  })

  it.each([new Date(2025, 11, 25), new Date(2025, 11, 26)])(
    'keeps the recurring Christmas Day and Boxing Day closure on %s',
    (date) => {
      expect(isChristmasClosure(date)).toBe(true)
      expect(classesForDate(date)).toEqual([])
    },
  )
})
