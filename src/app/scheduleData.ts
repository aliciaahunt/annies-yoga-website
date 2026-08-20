export type YogaClass = {
  activity: 'yoga' | 'pilates'
  day: string
  name: string
  time: string
  startMinutes: number
  level: string
  place: string
  duration: string
  durationMinutes: number
}

export const weeklyClasses: YogaClass[] = [
  { activity: 'yoga', day: 'Monday', name: 'Yoga', time: '11:00 am', startMinutes: 11 * 60, level: 'All levels welcome', place: 'Castlederg', duration: '90 min', durationMinutes: 90 },
  { activity: 'pilates', day: 'Monday', name: 'Pilates', time: '6:00 pm', startMinutes: 18 * 60, level: 'Beginners', place: 'Strabane', duration: '60 min', durationMinutes: 60 },
  { activity: 'yoga', day: 'Monday', name: 'Yoga', time: '7:30 pm', startMinutes: 19 * 60 + 30, level: 'All levels welcome', place: 'Castlederg', duration: '90 min', durationMinutes: 90 },
  { activity: 'yoga', day: 'Tuesday', name: 'Yoga', time: '10:00 am', startMinutes: 10 * 60, level: 'Beginners', place: 'Strabane', duration: '90 min', durationMinutes: 90 },
  { activity: 'yoga', day: 'Tuesday', name: 'Restorative Yoga', time: '4:30 pm', startMinutes: 16 * 60 + 30, level: 'Beginners', place: 'Strabane', duration: '90 min', durationMinutes: 90 },
  { activity: 'yoga', day: 'Tuesday', name: 'Yoga', time: '6:00 pm', startMinutes: 18 * 60, level: 'Mixed ability', place: 'Strabane', duration: '90 min', durationMinutes: 90 },
  { activity: 'pilates', day: 'Wednesday', name: 'Pilates', time: '6:15 pm', startMinutes: 18 * 60 + 15, level: 'Beginners', place: 'Strabane', duration: '60 min', durationMinutes: 60 },
  { activity: 'pilates', day: 'Wednesday', name: 'Pilates', time: '7:30 pm', startMinutes: 19 * 60 + 30, level: 'Mixed ability', place: 'Strabane', duration: '60 min', durationMinutes: 60 },
  { activity: 'pilates', day: 'Thursday', name: 'Pilates', time: '10:00 am', startMinutes: 10 * 60, level: 'Beginners', place: 'Strabane', duration: '60 min', durationMinutes: 60 },
  { activity: 'yoga', day: 'Thursday', name: 'Yoga', time: '11:15 am', startMinutes: 11 * 60 + 15, level: 'Beginners', place: 'Strabane', duration: '90 min', durationMinutes: 90 },
  { activity: 'yoga', day: 'Thursday', name: 'Yoga', time: '6:00 pm', startMinutes: 18 * 60, level: 'Mixed ability', place: 'Strabane', duration: '90 min', durationMinutes: 90 },
  { activity: 'yoga', day: 'Thursday', name: 'Yoga', time: '7:30 pm', startMinutes: 19 * 60 + 30, level: 'Beginners', place: 'Strabane', duration: '90 min', durationMinutes: 90 },
  { activity: 'pilates', day: 'Friday', name: 'Pilates', time: '10:00 am', startMinutes: 10 * 60, level: 'All levels welcome', place: 'Castlederg', duration: '60 min', durationMinutes: 60 },
  { activity: 'yoga', day: 'Saturday', name: 'Yoga', time: '9:00 am', startMinutes: 9 * 60, level: 'Beginners welcome', place: 'Strabane', duration: '90 min', durationMinutes: 90 },
]

export function classesForDate(date: Date) {
  if (isChristmasClosure(date)) return []

  const dayName = date.toLocaleDateString('en-GB', { weekday: 'long' })
  return weeklyClasses
    .filter((item) => item.day === dayName)
    .toSorted((first, second) => first.startMinutes - second.startMinutes)
}

export function isChristmasClosure(date: Date) {
  if (date.getMonth() !== 11) return false

  const dayOfMonth = date.getDate()
  const isChristmasDayOrBoxingDay = dayOfMonth === 25 || dayOfMonth === 26
  const isExtended2026Closure = date.getFullYear() === 2026 && dayOfMonth >= 20 && dayOfMonth <= 24

  return isChristmasDayOrBoxingDay || isExtended2026Closure
}
