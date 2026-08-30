import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { YogaClass } from '@/app/scheduleData'
import ClassReservationForm from '@/components/ClassReservationForm'

export type SelectedClass = YogaClass & { date: Date }

export default function ClassReservationDialog({ selectedClass, onClose }: {
  selectedClass: SelectedClass
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const openerRef = useRef(document.activeElement instanceof HTMLElement ? document.activeElement : null)

  useEffect(() => {
    const opener = openerRef.current
    const appRoot = document.getElementById('root')
    const previousOverflow = document.body.style.overflow
    if (appRoot) appRoot.inert = true
    document.body.style.overflow = 'hidden'
    titleRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
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
      opener?.focus()
    }
  }, [onClose])

  return createPortal(
    <div className="booking-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="booking-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="booking-dialog-title">
        <button className="dialog-close" type="button" onClick={onClose} aria-label="Close booking dialog"><X /></button>
        <p className="eyebrow">Reserve your place</p>
        <h2 id="booking-dialog-title" ref={titleRef} tabIndex={-1}>Reserve {selectedClass.name}</h2>
        <dl>
          <div><dt>Date</dt><dd>{selectedClass.date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</dd></div>
          <div><dt>Time</dt><dd>{selectedClass.time} · {selectedClass.duration}</dd></div>
          <div><dt>Location</dt><dd>{selectedClass.place}</dd></div>
          <div><dt>Level</dt><dd>{selectedClass.level}</dd></div>
        </dl>
        <ClassReservationForm selectedClass={selectedClass} />
      </div>
    </div>,
    document.body,
  )
}
