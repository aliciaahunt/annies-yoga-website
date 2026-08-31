import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Phone, X } from 'lucide-react'
import EnquiryForm from '@/components/EnquiryForm'
import PhoneLink from '@/components/PhoneLink'

export type EnquiryDialogHandle = {
  open: (context?: EnquiryDialogContext) => void
}

type EnquiryDialogContext = {
  enquiryType: 'Private classes' | 'Retreats'
  subject?: string
}

const EnquiryDialog = forwardRef<EnquiryDialogHandle>(function EnquiryDialog(_, forwardedRef) {
  const [isOpen, setIsOpen] = useState(false)
  const [context, setContext] = useState<EnquiryDialogContext>({ enquiryType: 'Private classes' })
  const panelRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  useImperativeHandle(forwardedRef, () => ({
    open(nextContext = { enquiryType: 'Private classes' }) {
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      setContext(nextContext)
      setIsOpen(true)
    },
  }))

  const closeDialog = () => setIsOpen(false)

  useEffect(() => {
    if (!isOpen) return

    const appRoot = document.getElementById('root')
    const previousOverflow = document.body.style.overflow
    if (appRoot) appRoot.inert = true
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => titleRef.current?.focus())

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeDialog()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (appRoot) appRoot.inert = false
      document.body.style.overflow = previousOverflow
      openerRef.current?.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  const isRetreat = context.enquiryType === 'Retreats'
  const dialogLabel = isRetreat && context.subject ? `Enquire about ${context.subject}` : 'Send Annie an enquiry.'

  return createPortal(
    <div className="enquiry-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeDialog() }}>
      <div
        aria-label={dialogLabel}
        aria-modal="true"
        className="enquiry-dialog"
        ref={panelRef}
        role="dialog"
      >
        <div className="enquiry-dialog-shell">
        <header>
          <div>
            <p className="eyebrow">{isRetreat ? 'Retreat booking' : 'Private classes'}</p>
            <h2 ref={titleRef} tabIndex={-1}>{isRetreat ? <>Enquire about <em><span>{context.subject}</span>.</em></> : <>Send Annie an <em>enquiry.</em></>}</h2>
            <p>Tell Annie a little about what you’re looking for and she’ll get back to you as soon as she can.</p>
          </div>
          <button aria-label="Close enquiry" onClick={closeDialog} type="button"><X /></button>
        </header>

        <div className="enquiry-dialog-contact" aria-label="Contact Annie directly">
          <PhoneLink><Phone size={17} /><span><small>Call Annie</small>07716 034570</span></PhoneLink>
          <a href="mailto:anniesyoga@yahoo.ie"><Mail size={17} /><span><small>Email Annie</small>anniesyoga@yahoo.ie</span></a>
        </div>

        <EnquiryForm
          key={`${context.enquiryType}-${context.subject ?? ''}`}
          defaultEnquiryType={context.enquiryType}
          enquirySubject={context.subject}
          lockEnquiryType
        />

        <footer>
          <p>Your details are used only to reply to your enquiry and are protected by Cloudflare.</p>
          <Link to="/contact" onClick={closeDialog}>View all contact details <ArrowRight size={15} /></Link>
        </footer>
        </div>
      </div>
    </div>,
    document.body,
  )
})

export default EnquiryDialog
