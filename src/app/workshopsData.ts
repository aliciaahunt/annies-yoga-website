import type { Workshop } from './scheduleData'

export const autumnWorkshop: Workshop = {
  kind: 'workshop',
  slug: 'iyengar-yoga-aisling-guirke',
  activity: 'yoga',
  day: 'Saturday',
  name: 'Iyengar Yoga with Aisling Guirke',
  eventDate: '2026-10-24',
  displayDate: 'Saturday 24 October 2026',
  time: '10:00 am–4:00 pm',
  startMinutes: 10 * 60,
  level: 'All abilities welcome',
  place: 'Strabane',
  address: ['Christ Church', '22 Bowling Grn', 'Strabane BT82 8BW'],
  duration: 'All day',
  durationMinutes: 6 * 60,
  price: 60,
  description: 'Join Aisling and Annie for a full day of Iyengar Yoga, with morning and afternoon practice guided for people of all abilities. Drinks and light refreshments are included; please bring your own lunch.',
  teacherQualification: 'Aisling Guirke · Level 3 Iyengar Yoga teacher',
  teacherIntroduction: 'One of Ireland’s most senior Iyengar Yoga teachers, Aisling brings decades of experience and a warm, encouraging approach. Together, Aisling and Annie will guide the day with clarity and care, helping each student work thoughtfully at a level suited to their practice.',
  sessions: [
    { label: 'Morning yoga', time: '10:00 am–1:00 pm' },
    { label: 'Lunch break', time: '1:00–2:00 pm' },
    { label: 'Afternoon yoga', time: '2:00–4:00 pm' },
  ],
}

export const workshops = [autumnWorkshop] as const

export function workshopDate(workshop: Workshop) {
  const [year, month, day] = workshop.eventDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}
