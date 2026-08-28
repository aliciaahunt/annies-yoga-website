type BaseYogaClass = {
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

export type Workshop = BaseYogaClass & {
  kind: 'workshop'
  price: number
  description: string
  sessions: readonly { label: string; time: string }[]
}

export type YogaClass = (BaseYogaClass & { kind: 'class' }) | Workshop

export const weeklyClasses: YogaClass[] = [
  { kind: 'class', activity: 'yoga', day: 'Monday', name: 'Yoga', time: '11:00 am', startMinutes: 11 * 60, level: 'All levels welcome', place: 'Castlederg', duration: '90 min', durationMinutes: 90 },
  { kind: 'class', activity: 'pilates', day: 'Monday', name: 'Pilates', time: '6:00 pm', startMinutes: 18 * 60, level: 'Beginners', place: 'Strabane', duration: '60 min', durationMinutes: 60 },
  { kind: 'class', activity: 'yoga', day: 'Monday', name: 'Yoga', time: '7:30 pm', startMinutes: 19 * 60 + 30, level: 'All levels welcome', place: 'Castlederg', duration: '90 min', durationMinutes: 90 },
  { kind: 'class', activity: 'yoga', day: 'Tuesday', name: 'Yoga', time: '10:00 am', startMinutes: 10 * 60, level: 'Beginners', place: 'Strabane', duration: '90 min', durationMinutes: 90 },
  { kind: 'class', activity: 'yoga', day: 'Tuesday', name: 'Restorative Yoga', time: '4:00 pm', startMinutes: 16 * 60, level: 'Beginners', place: 'Strabane', duration: '90 min', durationMinutes: 90 },
  { kind: 'class', activity: 'yoga', day: 'Tuesday', name: 'Yoga', time: '6:00 pm', startMinutes: 18 * 60, level: 'Mixed ability', place: 'Strabane', duration: '90 min', durationMinutes: 90 },
  { kind: 'class', activity: 'pilates', day: 'Wednesday', name: 'Pilates', time: '6:15 pm', startMinutes: 18 * 60 + 15, level: 'Beginners', place: 'Strabane', duration: '60 min', durationMinutes: 60 },
  { kind: 'class', activity: 'pilates', day: 'Wednesday', name: 'Pilates', time: '7:30 pm', startMinutes: 19 * 60 + 30, level: 'Mixed ability', place: 'Strabane', duration: '60 min', durationMinutes: 60 },
  { kind: 'class', activity: 'pilates', day: 'Thursday', name: 'Pilates', time: '10:00 am', startMinutes: 10 * 60, level: 'Beginners', place: 'Strabane', duration: '60 min', durationMinutes: 60 },
  { kind: 'class', activity: 'yoga', day: 'Thursday', name: 'Yoga', time: '11:15 am', startMinutes: 11 * 60 + 15, level: 'Beginners', place: 'Strabane', duration: '90 min', durationMinutes: 90 },
  { kind: 'class', activity: 'yoga', day: 'Thursday', name: 'Yoga', time: '6:00 pm', startMinutes: 18 * 60, level: 'Mixed ability', place: 'Strabane', duration: '90 min', durationMinutes: 90 },
  { kind: 'class', activity: 'yoga', day: 'Thursday', name: 'Yoga', time: '7:30 pm', startMinutes: 19 * 60 + 30, level: 'Beginners', place: 'Strabane', duration: '90 min', durationMinutes: 90 },
  { kind: 'class', activity: 'pilates', day: 'Friday', name: 'Pilates', time: '10:00 am', startMinutes: 10 * 60, level: 'All levels welcome', place: 'Castlederg', duration: '60 min', durationMinutes: 60 },
  { kind: 'class', activity: 'yoga', day: 'Saturday', name: 'Yoga', time: '9:00 am', startMinutes: 9 * 60, level: 'Beginners welcome', place: 'Strabane', duration: '90 min', durationMinutes: 90 },
]

export const autumnWorkshop: Workshop = {
  kind: 'workshop', activity: 'yoga', day: 'Saturday', name: 'Iyengar Yoga with Aisling Guirke', time: '10:00 am–4:00 pm',
  startMinutes: 10 * 60, level: 'Level 3 – General Yoga', place: 'Strabane', duration: 'All day',
  durationMinutes: 6 * 60, price: 60,
  description: 'Join Aisling for a Level 3 general Iyengar Yoga workshop, with morning and afternoon practice sessions. Drinks and light refreshments are included; please bring your own lunch.',
  sessions: [
    { label: 'Morning yoga', time: '10:00 am–1:00 pm' },
    { label: 'Lunch break', time: '1:00–2:00 pm' },
    { label: 'Afternoon yoga', time: '2:00–4:00 pm' },
  ],
}

const SATURDAY_CLASS_EXCEPTIONS = new Set(['2026-09-12', '2026-09-19', '2026-10-24', '2026-11-21'])
const CLASS_CANCELLATIONS = new Set(['2026-11-20'])

export function classesForDate(date: Date) {
  if (isSchedulePaused(date)) return []

  const dateKey = formatDateKey(date)
  if (dateKey === '2026-10-24') return [autumnWorkshop]
  if (CLASS_CANCELLATIONS.has(dateKey)) return []

  const dayName = date.toLocaleDateString('en-GB', { weekday: 'long' })
  return weeklyClasses
    .filter((item) => item.day === dayName && !SATURDAY_CLASS_EXCEPTIONS.has(dateKey))
    .toSorted((first, second) => first.startMinutes - second.startMinutes)
}

export function isSchedulePaused(date: Date) {
  return date >= new Date(2026, 11, 20)
}

function formatDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
