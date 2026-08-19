import { useEffect, useState, type ReactNode } from 'react'

const phoneHref = 'tel:+447716034570'
const callCapableQuery = '(hover: none) and (pointer: coarse)'

type PhoneLinkProps = {
  children: ReactNode
  className?: string
}

function canUseCallLink() {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia(callCapableQuery).matches
}

export default function PhoneLink({ children, className }: PhoneLinkProps) {
  const [isCallCapable, setIsCallCapable] = useState(canUseCallLink)

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const query = window.matchMedia(callCapableQuery)
    const updateCapability = () => setIsCallCapable(query.matches)
    updateCapability()
    query.addEventListener('change', updateCapability)
    return () => query.removeEventListener('change', updateCapability)
  }, [])

  const classes = ['phone-link', className].filter(Boolean).join(' ')
  if (!isCallCapable) return <span className={classes}>{children}</span>
  return <a className={classes} href={phoneHref}>{children}</a>
}
