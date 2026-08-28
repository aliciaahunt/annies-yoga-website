import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { CLASS_PRICE_PLANS } from './classPricing'
import { autumnWorkshop, classesForDate, isSchedulePaused, type YogaClass } from './scheduleData'
import ClassReservationForm from '@/components/ClassReservationForm'
import PageHero from '@/components/PageHero'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'

type SelectedClass = YogaClass & { date: Date }

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const HOUR_HEIGHT = 84
const MOBILE_BREAKPOINT = '(max-width: 700px)'
const TIME_BANDS = [
  { id: 'morning', label: 'Morning', startMinutes: 8 * 60 + 30, endMinutes: 12 * 60 + 45 },
  { id: 'evening', label: 'Evening', startMinutes: 16 * 60, endMinutes: 21 * 60 + 15 },
] as const

export default function SchedulePage() {
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()))
  const [selectedDayIndex, setSelectedDayIndex] = useState(() => new Date().getDay())
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT)
  const [selectedClass, setSelectedClass] = useState<SelectedClass | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const dialogTitleRef = useRef<HTMLHeadingElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const week = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index))

  const chooseClass = (item: YogaClass, date: Date) => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setSelectedClass({ ...item, date })
  }

  const closeDialog = () => setSelectedClass(null)

  useEffect(() => {
    if (!selectedClass) return

    const appRoot = document.getElementById('root')
    const previousOverflow = document.body.style.overflow
    if (appRoot) appRoot.inert = true
    document.body.style.overflow = 'hidden'
    dialogTitleRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeDialog()
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
      openerRef.current?.focus()
    }
  }, [selectedClass])

  return (
    <div className="schedule-page">
      <SiteHeader />

      <main>
        <PageHero
          ariaLabel="Studio classes introduction"
          image={{
            src: '/images/studio-yoga-class.jpg',
            alt: "Annie's students practising yoga together in the studio",
            position: 'center 44%',
          }}
          title={<>Book a <em>class</em></>}
        />

        <section className="weekly-schedule" id="weekly-schedule">
          <div className="schedule-shell">
            <div className="schedule-intro">
              <div>
                <p className="eyebrow">Classes in Strabane & Castlederg</p>
                <h2>Weekly Class Schedule</h2>
              </div>
              <p>Choose a class below and send Annie a reservation request. Classes are welcoming and clearly marked by level.</p>
            </div>

            <aside className="workshop-notice" aria-labelledby="autumn-workshop-title">
              <div className="workshop-notice-copy">
                <p className="eyebrow">Featured workshop</p>
                <h3 id="autumn-workshop-title">{autumnWorkshop.name}</h3>
                <p>{autumnWorkshop.description}</p>
              </div>
              <div className="workshop-notice-details" aria-label="Workshop details">
                <span><CalendarDays size={14} aria-hidden="true" />24 October 2026</span>
                <span><Clock3 size={14} aria-hidden="true" />{autumnWorkshop.time}</span>
                <span><MapPin size={14} aria-hidden="true" />{autumnWorkshop.place}</span>
                <strong>£{autumnWorkshop.price}</strong>
              </div>
              <button className="button button-dark" type="button" onClick={() => chooseClass(autumnWorkshop, new Date(2026, 9, 24))}>
                Request a place <ArrowRight size={16} aria-hidden="true" />
              </button>
            </aside>

            <section className="schedule-pricing" aria-label="Class pricing">
              <header className="schedule-pricing-heading">
                <h3>Class Pricing</h3>
              </header>
              <div className="schedule-pricing-plans">
                {Object.values(CLASS_PRICE_PLANS).map((plan) => (
                  <article className={`schedule-price-plan schedule-price-plan-${plan.activity}`} aria-label={`${plan.label} pricing`} key={plan.activity}>
                    <header>
                      <h4>{plan.label}</h4>
                    </header>
                    <dl>
                      <div className="schedule-price-choice">
                        <dt>Single class</dt>
                        <dd><strong>£{plan.singleClassPrice}</strong><span>per class</span></dd>
                        <p>{plan.dropInDescription}</p>
                      </div>
                      <div className="schedule-price-choice is-package">
                        <dt>Six-week bundle</dt>
                        <dd><strong>£{plan.packagePrice}</strong><span>for six classes</span></dd>
                        <p>{plan.packageDescription}</p>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>

            <div className="week-controls" aria-label="Schedule week controls">
              <button type="button" onClick={() => setWeekStart(addDays(weekStart, -7))} aria-label="Previous week"><ChevronLeft /></button>
              <div aria-live="polite">
                <CalendarDays size={18} />
                <strong>{formatWeekRange(weekStart)}</strong>
              </div>
              <button type="button" onClick={() => setWeekStart(addDays(weekStart, 7))} aria-label="Next week"><ChevronRight /></button>
              {!isSameDay(weekStart, startOfWeek(new Date())) && (
                <button className="today-button" type="button" onClick={() => setWeekStart(startOfWeek(new Date()))}>This week</button>
              )}
            </div>

            {isMobile ? (
              <MobileSchedule
                week={week}
                selectedDayIndex={selectedDayIndex}
                onSelectDay={setSelectedDayIndex}
                onChooseClass={chooseClass}
              />
            ) : <DesktopSchedule week={week} onChooseClass={chooseClass} />}

          </div>
        </section>
      </main>

      <SiteFooter />

      {selectedClass && createPortal(
        <div className="booking-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeDialog() }}>
          <div className="booking-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="booking-dialog-title">
            <button className="dialog-close" type="button" onClick={closeDialog} aria-label="Close booking dialog"><X /></button>
            <p className="eyebrow">Reserve your place</p>
            <h2 id="booking-dialog-title" ref={dialogTitleRef} tabIndex={-1}>Reserve {selectedClass.name}</h2>
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
      )}
    </div>
  )
}

type ScheduleProps = {
  week: Date[]
  onChooseClass: (item: YogaClass, date: Date) => void
}

function DesktopSchedule({ week, onChooseClass }: ScheduleProps) {
  return (
    <div className="timetable-scroll" tabIndex={0} aria-label="Weekly class timetable. Scroll horizontally to see every day.">
      <div className="timetable">
        <div className="timetable-corner" aria-hidden="true"><Clock3 size={17} /><span>Time</span></div>
        <div className="timetable-days">
          {week.map((date) => <DayHeader date={date} key={date.toISOString()} />)}
        </div>
        <TimetableBand band={TIME_BANDS[0]} week={week} onChooseClass={onChooseClass} showEmptyState showWorkshop />
        <div className="timetable-break-label" aria-hidden="true"><span>Break</span></div>
        <div className="timetable-break">
          <span aria-hidden="true" />
          <p>Afternoon break <small>No classes scheduled 12:45–4:00 pm</small></p>
          <span aria-hidden="true" />
        </div>
        <TimetableBand band={TIME_BANDS[1]} week={week} onChooseClass={onChooseClass} />
      </div>
    </div>
  )
}

type TimeBand = (typeof TIME_BANDS)[number]

type TimetableBandProps = ScheduleProps & {
  band: TimeBand
  showEmptyState?: boolean
  showWorkshop?: boolean
}

function TimetableBand({ band, week, onChooseClass, showEmptyState = false, showWorkshop = false }: TimetableBandProps) {
  const canvasHeight = ((band.endMinutes - band.startMinutes) / 60) * HOUR_HEIGHT
  const firstHour = Math.ceil(band.startMinutes / 60)
  const lastHour = Math.floor(band.endMinutes / 60)
  const markers = Array.from({ length: lastHour - firstHour + 1 }, (_, index) => firstHour + index)
  const bandStyle = { '--time-band-height': `${canvasHeight}px` } as CSSProperties
  const workshopDayIndex = showWorkshop
    ? week.findIndex((date) => classesForDate(date).some((item) => item.kind === 'workshop'))
    : -1

  return (
    <>
      <div className="time-axis" style={bandStyle} aria-hidden="true">
        {markers.map((hour) => (
          <span
            className={hour * 60 === band.startMinutes ? 'is-band-start' : undefined}
            key={hour}
            style={{ top: `${((hour * 60 - band.startMinutes) / 60) * HOUR_HEIGHT}px` }}
          >
            {formatHour(hour)}
          </span>
        ))}
      </div>
      <div className="timetable-canvas" data-time-band={band.id} style={bandStyle}>
        <div className="hour-lines" aria-hidden="true">
          {markers.map((hour) => (
            <span key={hour} style={{ top: `${((hour * 60 - band.startMinutes) / 60) * HOUR_HEIGHT}px` }} />
          ))}
        </div>
        {week.map((date) => {
          const allDayClasses = classesForDate(date)
          const bandClasses = allDayClasses.filter(
            (item) => item.kind !== 'workshop' && item.startMinutes >= band.startMinutes && item.startMinutes < band.endMinutes,
          )
          return (
            <section
              className={`timetable-day${isSameDay(date, new Date()) ? ' is-today' : ''}`}
              aria-label={`${band.label}, ${formatFullDate(date)}`}
              key={date.toISOString()}
            >
              {bandClasses.map((item) => (
                <ClassCard
                  item={item}
                  date={date}
                  positionFromMinutes={band.startMinutes}
                  onChooseClass={onChooseClass}
                  key={`${item.name}-${item.time}-${item.place}`}
                />
              ))}
              {showEmptyState && !allDayClasses.length && (
                <p className="no-classes">{isSchedulePaused(date) ? 'Schedule paused' : 'No classes'}</p>
              )}
            </section>
          )
        })}
        {workshopDayIndex >= 0 && (
          <WorkshopScheduleBlock
            date={week[workshopDayIndex]}
            dayIndex={workshopDayIndex}
            onChooseClass={onChooseClass}
          />
        )}
      </div>
    </>
  )
}

function WorkshopScheduleBlock({ date, dayIndex, onChooseClass }: {
  date: Date
  dayIndex: number
  onChooseClass: (item: YogaClass, date: Date) => void
}) {
  const morningOffset = ((autumnWorkshop.startMinutes - TIME_BANDS[0].startMinutes) / 60) * HOUR_HEIGHT
  const style = {
    '--workshop-column': dayIndex + 1,
    '--workshop-offset': `${morningOffset}px`,
  } as CSSProperties

  return (
    <div className="workshop-schedule-overlay" style={style}>
      <article className="workshop-schedule-block">
        <div>
          <time>{autumnWorkshop.time}</time>
          <span>£{autumnWorkshop.price}</span>
        </div>
        <h3>{autumnWorkshop.name}</h3>
        <p>{autumnWorkshop.level}</p>
        <small>{autumnWorkshop.sessions.map((session) => `${session.label} ${session.time}`).join(' · ')}</small>
        <button type="button" onClick={() => onChooseClass(autumnWorkshop, date)}>
          Request a place <ArrowRight size={13} aria-hidden="true" />
        </button>
      </article>
    </div>
  )
}

type MobileScheduleProps = ScheduleProps & {
  selectedDayIndex: number
  onSelectDay: (index: number) => void
}

function MobileSchedule({ week, selectedDayIndex, onSelectDay, onChooseClass }: MobileScheduleProps) {
  const date = week[selectedDayIndex]
  const dayClasses = classesForDate(date)

  return (
    <div className="mobile-schedule">
      <nav className="mobile-day-tabs" aria-label="Choose a day">
        {week.map((day, index) => (
          <button
            className={`${index === selectedDayIndex ? 'is-active' : ''}${isSameDay(day, new Date()) ? ' is-today' : ''}`}
            type="button"
            aria-label={`Select ${formatFullDate(day)}`}
            aria-pressed={index === selectedDayIndex}
            onClick={() => onSelectDay(index)}
            key={day.toISOString()}
          >
            <span>{DAY_NAMES[day.getDay()].slice(0, 3)}</span>
            <strong>{day.getDate()}</strong>
          </button>
        ))}
      </nav>
      <section className="mobile-day-schedule" aria-label={formatFullDate(date)}>
        <header><h3>{formatFullDate(date)}</h3><span>{dayClasses.length} {dayClasses.length === 1 ? 'class' : 'classes'}</span></header>
        <div className="mobile-class-list">
          {dayClasses.map((item) => (
            <ClassCard item={item} date={date} onChooseClass={onChooseClass} key={`${item.name}-${item.time}-${item.place}`} />
          ))}
          {!dayClasses.length && <p className="mobile-no-classes">{isSchedulePaused(date) ? 'No classes scheduled from 20 December.' : 'No classes scheduled.'}</p>}
        </div>
      </section>
    </div>
  )
}

function DayHeader({ date }: { date: Date }) {
  return (
    <div className={isSameDay(date, new Date()) ? 'is-today' : undefined}>
      <span>{DAY_NAMES[date.getDay()].slice(0, 3)}</span>
      <strong>{date.getDate()}</strong>
      <small>{date.toLocaleDateString('en-GB', { month: 'short' })}</small>
    </div>
  )
}

type ClassCardProps = {
  item: YogaClass
  date: Date
  positionFromMinutes?: number
  onChooseClass: (item: YogaClass, date: Date) => void
}

function ClassCard({ item, date, positionFromMinutes, onChooseClass }: ClassCardProps) {
  const positioned = positionFromMinutes !== undefined
  const classType = item.name.toLowerCase().includes('pilates') ? 'pilates' : 'yoga'
  const style = positioned
    ? { '--event-top': `${((item.startMinutes - positionFromMinutes) / 60) * HOUR_HEIGHT}px` } as CSSProperties
    : undefined

  return (
    <article className={`class-event class-event-${classType}${positioned ? ' is-positioned' : ''}`} style={style}>
      <div className="class-event-topline"><time>{item.time}</time><span className="level-badge">{item.level}</span></div>
      <h3>{item.name}</h3>
      <div className="class-event-details">
        <span><MapPin size={13} aria-hidden="true" />{item.place}</span>
        <span><Clock3 size={13} aria-hidden="true" />{item.duration}</span>
      </div>
      <button type="button" onClick={() => onChooseClass(item, date)}>
        Book <ArrowRight size={13} aria-hidden="true" />
      </button>
    </article>
  )
}

function startOfWeek(date: Date) {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  result.setDate(result.getDate() - result.getDay())
  return result
}

function addDays(date: Date, days: number) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function isSameDay(first: Date, second: Date) {
  return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate()
}

function formatWeekRange(start: Date) {
  const end = addDays(start, 6)
  const startText = start.toLocaleDateString('en-GB', { day: 'numeric', month: start.getMonth() === end.getMonth() ? undefined : 'short' })
  const endText = end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  return `${startText} – ${endText}`
}

function formatHour(hour: number) {
  if (hour === 12) return '12 pm'
  return hour > 12 ? `${hour - 12} pm` : `${hour} am`
}

function formatFullDate(date: Date) {
  return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window.matchMedia === 'function' && window.matchMedia(query).matches)

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const mediaQuery = window.matchMedia(query)
    const updateMatch = () => setMatches(mediaQuery.matches)
    updateMatch()
    mediaQuery.addEventListener('change', updateMatch)
    return () => mediaQuery.removeEventListener('change', updateMatch)
  }, [query])

  return matches
}
