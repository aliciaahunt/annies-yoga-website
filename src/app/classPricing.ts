export type ClassActivity = 'yoga' | 'pilates'

export type ClassPricePlan = {
  activity: ClassActivity
  label: string
  description: string
  dropInDescription: string
  packageDescription: string
  singleClassPrice: number
  packagePrice: number
}

export const CLASS_PRICE_PLANS: Record<ClassActivity, ClassPricePlan> = {
  yoga: {
    activity: 'yoga',
    label: 'Yoga',
    description: 'Space to move, breathe and reconnect.',
    dropInDescription: 'Come whenever it suits you',
    packageDescription: 'Build a regular weekly practice',
    singleClassPrice: 12,
    packagePrice: 60,
  },
  pilates: {
    activity: 'pilates',
    label: 'Pilates',
    description: 'Thoughtful movement for strength and control.',
    dropInDescription: 'Join a class when it works for you',
    packageDescription: 'Keep your movement consistent',
    singleClassPrice: 10,
    packagePrice: 50,
  },
}

export const CLASS_PACKAGE_TERMS = {
  classCount: 6,
  durationWeeks: 6,
  paymentTiming: 'Paid upfront',
} as const

export function packagePricePerClass(plan: ClassPricePlan) {
  return plan.packagePrice / CLASS_PACKAGE_TERMS.classCount
}
