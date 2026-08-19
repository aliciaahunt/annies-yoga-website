import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Phone, X } from 'lucide-react'
import EnquiryForm from '@/components/EnquiryForm'

export type EnquiryDialogHandle = {
  open: () => void
}

const EnquiryDialog = forwardRef<EnquiryDialogHandle>(function EnquiryDialog(_, forwardedRef) {
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  useImperativeHandle(forwardedRef, () => ({
    open() {
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
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

  return createPortal(
    <div className="enquiry-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeDialog() }}>
      <div
        aria-labelledby="private-enquiry-title"
        aria-modal="true"
        className="enquiry-dialog"
        ref={panelRef}
        role="dialog"
      >
        <div className="enquiry-dialog-shell">
        <header>
          <div>
            <p className="eyebrow">Private classes</p>
            <h2 id="private-enquiry-title" ref={titleRef} tabIndex={-1}>Send Annie an <em>enquiry.</em></h2>
            <p>Tell Annie a little about what you’re looking for and she’ll get back to you as soon as she can.</p>
          </div>
          <button aria-label="Close enquiry" onClick={closeDialog} type="button"><X /></button>
        </header>

        <div className="enquiry-dialog-contact" aria-label="Contact Annie directly">
          <a href="tel:+447716034570"><Phone size={17} /><span><small>Call Annie</small>07716 034570</span></a>
          <a href="mailto:anniesyoga@yahoo.ie"><Mail size={17} /><span><small>Email Annie</small>anniesyoga@yahoo.ie</span></a>
        </div>

        <EnquiryForm defaultEnquiryType="Private classes" lockEnquiryType />

        <footer>
          <p>Your details are used only to reply to your enquiry and are securely processed by Web3Forms.</p>
          <Link to="/contact" onClick={closeDialog}>View all contact details <ArrowRight size={15} /></Link>
        </footer>
        </div>
      </div>
    </div>,
    document.body,
  )
})

export default EnquiryDialog
