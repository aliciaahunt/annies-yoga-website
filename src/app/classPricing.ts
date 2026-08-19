export type ClassActivity = 'yoga' | 'pilates'

export type ClassPricePlan = {
  activity: ClassActivity
  label: string
  dropInDescription: string
  packageDescription: string
  singleClassPrice: number
  packagePrice: number
}

export const CLASS_PRICE_PLANS: Record<ClassActivity, ClassPricePlan> = {
  yoga: {
    activity: 'yoga',
    label: 'Yoga',
    dropInDescription: 'Pay as you go',
    packageDescription: 'Paid upfront. Use within 6 weeks.',
    singleClassPrice: 12,
    packagePrice: 60,
  },
  pilates: {
    activity: 'pilates',
    label: 'Pilates',
    dropInDescription: 'Pay as you go',
    packageDescription: 'Paid upfront. Use within 6 weeks.',
    singleClassPrice: 10,
    packagePrice: 50,
  },
}
