import { describe, expect, it } from 'vitest'
import { classesForDate, isSchedulePaused } from '@/app/scheduleData'

describe('weekly schedule data', () => {
  it('returns each day in chronological order', () => {
    const monday = classesForDate(new Date(2026, 7, 17))

    expect(monday.map((item) => item.startMinutes)).toEqual([660, 1080, 1170])
  })

  it.each([new Date(2026, 11, 20), new Date(2026, 11, 26), new Date(2027, 0, 4)])(
    'removes all classes from 20 December 2026 onwards on %s', (date) => {
    expect(isSchedulePaused(date)).toBe(true)
    expect(classesForDate(date)).toEqual([])
  })

  it('keeps classes before the schedule cutoff', () => {
    expect(isSchedulePaused(new Date(2026, 11, 19))).toBe(false)
    expect(classesForDate(new Date(2026, 11, 19))).not.toHaveLength(0)
  })

  it('moves Tuesday restorative yoga to 4 pm', () => {
    expect(classesForDate(new Date(2026, 8, 15)).find((item) => item.name === 'Restorative Yoga'))
      .toMatchObject({ time: '4:00 pm', startMinutes: 960 })
  })

  it.each([new Date(2026, 8, 12), new Date(2026, 8, 19), new Date(2026, 10, 21)])(
    'removes the regular Saturday class on %s',
    (date) => expect(classesForDate(date)).toEqual([]),
  )

  it('replaces the Saturday class with the workshop on 24 October', () => {
    expect(classesForDate(new Date(2026, 9, 24))).toEqual([
      expect.objectContaining({
        kind: 'workshop',
        name: 'Iyengar Yoga with Aisling Guirke',
        level: 'All abilities welcome',
        time: '10:00 am–4:00 pm',
        price: 60,
      }),
    ])
  })

  it('cancels the Pilates class on Friday 20 November', () => {
    expect(classesForDate(new Date(2026, 10, 20))).toEqual([])
  })
})
