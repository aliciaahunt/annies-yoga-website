export type YogaClass = {
  day: string
  name: string
  time: string
  level: string
  place: string
  duration: string
}

export const weeklyClasses: YogaClass[] = [
  { day: 'Monday', name: 'Yoga', time: '11:00 am', level: 'All levels welcome', place: 'Castlederg', duration: '60 min' },
  { day: 'Monday', name: 'Pilates', time: '6:00 pm', level: 'Beginners', place: 'Strabane', duration: '60 min' },
  { day: 'Monday', name: 'Yoga', time: '7:30 pm', level: 'All levels welcome', place: 'Castlederg', duration: '60 min' },
  { day: 'Tuesday', name: 'Yoga', time: '10:00 am', level: 'Beginners', place: 'Strabane', duration: '60 min' },
  { day: 'Tuesday', name: 'Restorative Yoga', time: '4:30 pm', level: 'Beginners', place: 'Strabane', duration: '60 min' },
  { day: 'Tuesday', name: 'Yoga', time: '6:00 pm', level: 'Mixed ability', place: 'Strabane', duration: '60 min' },
  { day: 'Wednesday', name: 'Pilates', time: '6:15 pm', level: 'Beginners', place: 'Strabane', duration: '60 min' },
  { day: 'Wednesday', name: 'Pilates', time: '7:30 pm', level: 'Mixed ability', place: 'Strabane', duration: '60 min' },
  { day: 'Thursday', name: 'Pilates', time: '10:00 am', level: 'Beginners', place: 'Strabane', duration: '60 min' },
  { day: 'Thursday', name: 'Yoga', time: '11:15 am', level: 'Beginners', place: 'Strabane', duration: '60 min' },
  { day: 'Thursday', name: 'Yoga', time: '6:00 pm', level: 'Mixed ability', place: 'Strabane', duration: '60 min' },
  { day: 'Thursday', name: 'Yoga', time: '7:30 pm', level: 'Beginners', place: 'Strabane', duration: '60 min' },
  { day: 'Friday', name: 'Pilates', time: '10:00 am', level: 'All levels welcome', place: 'Castlederg', duration: '60 min' },
  { day: 'Saturday', name: 'Yoga', time: '9:00 am', level: 'Beginners welcome', place: 'Strabane', duration: '60 min' },
]
