import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const pageTitles: Record<string, string> = {
  '/': "Annie's Yoga | Yoga, Pilates & Retreats",
  '/schedule': "Classes | Annie's Yoga",
  '/retreats': "Retreats | Annie's Yoga",
  '/about': "About Annie | Annie's Yoga",
  '/private-classes': "Private Classes | Annie's Yoga",
  '/gift-cards': "Gift Cards | Annie's Yoga",
  '/contact': "Contact | Annie's Yoga",
}

const pageDescriptions: Record<string, string> = {
  '/': "Welcoming yoga and Pilates classes, private sessions and retreats with Annie in Strabane and Castlederg, Northern Ireland.",
  '/schedule': "View Annie's weekly yoga and Pilates class timetable in Strabane and Castlederg.",
  '/retreats': "Explore restorative yoga and Pilates retreats with Annie.",
  '/about': "Meet Annie and discover her welcoming, down-to-earth approach to yoga and Pilates.",
  '/private-classes': "Explore one-to-one and private group yoga sessions shaped around your needs.",
  '/gift-cards': "Arrange a thoughtful Annie's Yoga gift card for yoga and Pilates.",
  '/contact': "Contact Annie about classes, private sessions, retreats and gift cards.",
}

export default function RouteEffects() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    document.title = pageTitles[pathname] ?? "Page not found | Annie's Yoga"
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = pageDescriptions[pathname] ?? "Annie's Yoga in Strabane and Castlederg, Northern Ireland."
    if (navigationType !== 'POP') window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [navigationType, pathname])

  return null
}
