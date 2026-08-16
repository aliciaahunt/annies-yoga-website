import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Menu,
  Phone,
  X,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { weeklyClasses, type YogaClass } from './scheduleData'

type SelectedClass = YogaClass & { date: Date }

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function SchedulePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()))
  const [selectedClass, setSelectedClass] = useState<SelectedClass | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const week = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index))

  const chooseClass = (item: YogaClass, date: Date) => {
    setSelectedClass({ ...item, date })
    dialogRef.current?.showModal()
  }

  const closeDialog = () => {
    dialogRef.current?.close()
    setSelectedClass(null)
  }

  return (
    <div className="schedule-page">
      <header className="site-header schedule-header">
        <a className="brand" href="/" aria-label="Annie's Yoga home">
          <span className="brand-flourish" aria-hidden="true">✦</span>
          <span>Annie's Yoga</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="schedule-navigation"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} id="schedule-navigation" aria-label="Main navigation">
          <a className="active" href="/schedule">Classes</a>
          <a href="/#retreats">Retreats</a>
          <a href="/#about">About</a>
          <a href="/private-classes">Private classes</a>
          <a href="/#contact">Contact</a>
          <a className="nav-cta" href="#weekly-schedule">Book a class <ArrowRight size={16} /></a>
        </nav>
      </header>

      <main>
        <section className="schedule-hero">
          <img src="/images/studio-yoga-class.jpg" alt="Annie's students practising yoga together in the studio" />
          <div className="schedule-hero-shade" aria-hidden="true" />
          <div><p className="eyebrow light">Move with Annie</p><h1>Book a <em>class</em></h1></div>
        </section>

        <section className="weekly-schedule" id="weekly-schedule">
          <div className="schedule-shell">
            <div className="schedule-intro">
              <div>
                <p className="eyebrow">Classes in Strabane & Castlederg</p>
                <h2>Weekly Class Schedule</h2>
              </div>
              <p>Choose a class below, then book your place directly with Annie. Classes are welcoming and clearly marked by level.</p>
            </div>

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

            <div className="calendar-grid">
              {week.map((date) => {
                const dayName = DAY_NAMES[date.getDay()]
                const dayClasses = weeklyClasses.filter((item) => item.day === dayName)
                return (
                  <section className={`calendar-day${isSameDay(date, new Date()) ? ' is-today' : ''}`} key={date.toISOString()}>
                    <header>
                      <span>{dayName.slice(0, 3)}</span>
                      <strong>{date.getDate()}</strong>
                      <small>{date.toLocaleDateString('en-GB', { month: 'short' })}</small>
                    </header>
                    <div className="calendar-day-events">
                      {dayClasses.length ? dayClasses.map((item) => (
                        <article className="class-event" key={`${item.name}-${item.time}-${item.place}`}>
                          <time>{item.time}</time>
                          <h3>{item.name}</h3>
                          <p>{item.level}</p>
                          <p><MapPin size={14} />{item.place}</p>
                          <p><Clock3 size={14} />{item.duration}</p>
                          <button type="button" onClick={() => chooseClass(item, date)}>Book <ArrowRight size={14} /></button>
                        </article>
                      )) : <p className="no-classes">No classes</p>}
                    </div>
                  </section>
                )
              })}
            </div>

            <aside className="schedule-help">
              <div><Phone /><div><h3>Need help choosing?</h3><p>Call Annie and she'll help you find the right class.</p></div></div>
              <a href="tel:+447716034570">07716 034570 <ArrowRight size={17} /></a>
            </aside>
          </div>
        </section>
      </main>

      <footer className="schedule-footer">
        <a href="/"><ArrowLeft size={16} /> Back to Annie's Yoga</a>
        <p>Strabane & Castlederg · 07716 034570</p>
      </footer>

      <dialog className="booking-dialog" ref={dialogRef} onClose={() => setSelectedClass(null)}>
        {selectedClass && (
          <div>
            <button className="dialog-close" type="button" onClick={closeDialog} aria-label="Close booking dialog"><X /></button>
            <p className="eyebrow">Reserve your place</p>
            <h2>{selectedClass.name}</h2>
            <dl>
              <div><dt>Date</dt><dd>{selectedClass.date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</dd></div>
              <div><dt>Time</dt><dd>{selectedClass.time} · {selectedClass.duration}</dd></div>
              <div><dt>Location</dt><dd>{selectedClass.place}</dd></div>
              <div><dt>Level</dt><dd>{selectedClass.level}</dd></div>
            </dl>
            <p>Booking is currently handled directly by Annie. Call now and mention the class and date above.</p>
            <a className="button button-dark" href="tel:+447716034570"><Phone size={17} /> Call 07716 034570</a>
          </div>
        )}
      </dialog>
    </div>
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
