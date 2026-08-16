import {
  CalendarDays,
  ChevronDown,
  Flower2,
  Leaf,
  MapPin,
  PersonStanding,
  Phone,
  Sparkles,
  Sunrise,
  Waves,
} from 'lucide-react'

export default function App() {
  return (
    <div className="site">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Annie's Yoga home">
          <span className="brand-mark">AY</span>
          <span>Annie's Yoga</span>
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#timetable">Timetable</a>
          <a href="#retreats">Retreats</a>
          <a href="#photos">Photos</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow">Strabane, Castlederg and retreat yoga</p>
            <h1>Annie's Yoga</h1>
            <p className="hero-copy">
              Friendly yoga and Pilates classes for moving well, breathing
              deeply, and leaving class feeling lighter.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#timetable">
                <CalendarDays size={18} aria-hidden="true" />
                View timetable
              </a>
              <a className="button button-light" href="#contact">
                <Phone size={18} aria-hidden="true" />
                Contact Annie
              </a>
            </div>
          </div>
        </section>

        <section className="intro-section" aria-labelledby="welcome-title">
          <div className="section-inner intro-grid">
            <div>
              <p className="eyebrow">Welcome</p>
              <h2 id="welcome-title">
                A calm place to stretch, breathe, and come back to yourself.
              </h2>
            </div>
            <p className="intro-text">
              Annie's Yoga offers weekly yoga and Pilates in Strabane and
              Castlederg, restorative sessions, private bookings, and sunny
              retreat time. Classes are welcoming, clear, and suitable whether
              you are brand new or have practised for years.
            </p>
            <img
              className="intro-photo"
              src="/images/annie-portrait.jpg"
              alt="Annie sitting on a yoga mat in a bright room"
            />
          </div>
        </section>

        <section className="offer-section" aria-label="What Annie offers">
          <div className="section-inner offer-grid">
            <article className="offer-card">
              <Sunrise size={24} aria-hidden="true" />
              <h3>Yoga classes</h3>
              <p>Steady, friendly classes for beginners and mixed ability groups.</p>
            </article>
            <article className="offer-card">
              <Waves size={24} aria-hidden="true" />
              <h3>Pilates</h3>
              <p>Beginner and mixed ability sessions in Strabane and Castlederg.</p>
            </article>
            <article className="offer-card">
              <Sparkles size={24} aria-hidden="true" />
              <h3>Retreats</h3>
              <p>Peaceful time away with yoga, rest, shared food, and sunshine.</p>
            </article>
          </div>
        </section>

        <section className="timetable-section" id="timetable">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Classes</p>
              <h2>Summer timetable</h2>
              <p>
                Current summer classes in Strabane and Castlederg. To book,
                call Annie's Yoga on 07716034570.
              </p>
            </div>

            <div className="schedule-board">
              <div className="schedule-list" aria-label="Summer class timetable">
                {scheduleDays.map((group) => (
                  <section className="schedule-day-group" key={group.day}>
                    <h3 className="schedule-day">{group.day}</h3>
                    <div className="schedule-day-classes">
                      {group.items.map((item) => (
                        <article
                          className="schedule-row"
                          key={`${item.day}-${item.name}-${item.time}`}
                        >
                          <div className="schedule-class-title">
                            <span
                              className={`schedule-icon schedule-icon-${item.kind}`}
                              aria-hidden="true"
                            >
                              <ClassIcon kind={item.kind} />
                            </span>
                            <div>
                              <h4>{item.name}</h4>
                              {item.level ? (
                                <p className="schedule-level">{item.level}</p>
                              ) : null}
                            </div>
                          </div>
                          <p>{item.time}</p>
                          <p>{item.place}</p>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            <div className="booking-strip">
              <h3>Also taking bookings for</h3>
              <ul>
                {bookings.map((booking) => (
                  <li key={booking}>{booking}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="retreat-section" id="retreats">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Retreats</p>
              <h2>Retreat photo albums</h2>
              <p>
                Retreat moments from Santillan, Malaga and a peaceful Ireland
                retreat, grouped so each retreat stays together.
              </p>
            </div>

            <div className="retreat-grid">
              {retreatAlbums.map((retreat) => (
                <details className="retreat-card" key={retreat.title}>
                  <summary>
                    <img src={retreat.cover} alt={retreat.coverAlt} />
                    <div>
                      <p className="retreat-date">{retreat.date}</p>
                      <h3>{retreat.title}</h3>
                      <p>{retreat.description}</p>
                      <span className="retreat-photo-count">
                        {retreat.photos.length} photos
                        <ChevronDown size={18} aria-hidden="true" />
                      </span>
                    </div>
                  </summary>
                  <div className="retreat-photo-grid">
                    {retreat.photos.map((photo) => (
                      <img key={photo.src} src={photo.src} alt={photo.alt} />
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="quote-section">
          <div className="section-inner quote-inner">
            <Leaf size={28} aria-hidden="true" />
            <blockquote>"Let the breath lead, and the body will follow."</blockquote>
          </div>
        </section>

        <section className="photos-section" id="photos">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Photos</p>
              <h2>Class moments</h2>
              <p>
                Real class spaces, wall work, studio practice, and outdoor
                movement with Annie.
              </p>
            </div>

            <div className="photo-grid">
              {photos.map((photo) => (
                <img key={photo.src} src={photo.src} alt={photo.alt} />
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-inner contact-grid">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Ask about classes, private sessions, or retreats.</h2>
              <p>
                The booking part is kept simple: call Annie directly to book or
                ask a question.
              </p>
            </div>

            <div className="contact-panel">
              <a href="tel:+447716034570">
                <Phone size={22} aria-hidden="true" />
                <span>
                  <strong>Call Annie's Yoga</strong>
                  07716034570
                </span>
              </a>
              <a href="#timetable">
                <CalendarDays size={22} aria-hidden="true" />
                <span>
                  <strong>Summer timetable</strong>
                  Yoga and Pilates classes from Monday to Saturday
                </span>
              </a>
              <p>
                <MapPin size={22} aria-hidden="true" />
                <span>
                  <strong>Class locations</strong>
                  Strabane and Castlederg
                </span>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Annie's Yoga</p>
        <div>
          <a href="#timetable">Timetable</a>
          <a href="#retreats">Retreats</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </div>
  )
}

const classes = [
  {
    day: 'Monday',
    name: 'Yoga',
    time: '11am',
    level: '',
    place: 'Castlederg',
    kind: 'yoga',
  },
  {
    day: 'Monday',
    name: 'Pilates',
    time: '6pm',
    level: 'Beginners',
    place: 'Strabane',
    kind: 'pilates',
  },
  {
    day: 'Monday',
    name: 'Yoga',
    time: '7.30pm',
    level: 'Suitable for everyone',
    place: 'Castlederg',
    kind: 'yoga',
  },
  {
    day: 'Tuesday',
    name: 'Yoga',
    time: '10am',
    level: 'Beginners',
    place: 'Strabane',
    kind: 'yoga',
  },
  {
    day: 'Tuesday',
    name: 'Restorative Yoga',
    time: '4.30pm',
    level: 'Beginners',
    place: 'Strabane',
    kind: 'restorative',
  },
  {
    day: 'Tuesday',
    name: 'Yoga',
    time: '6pm',
    level: 'Mixed ability - new time',
    place: 'Strabane',
    kind: 'yoga',
  },
  {
    day: 'Wednesday',
    name: 'Pilates',
    time: '6.15pm',
    level: 'Beginners',
    place: 'Strabane',
    kind: 'pilates',
  },
  {
    day: 'Wednesday',
    name: 'Pilates',
    time: '7.30pm',
    level: 'Mixed ability',
    place: 'Strabane',
    kind: 'pilates',
  },
  {
    day: 'Thursday',
    name: 'Pilates',
    time: '10am',
    level: 'Beginners',
    place: 'Strabane',
    kind: 'pilates',
  },
  {
    day: 'Thursday',
    name: 'Yoga',
    time: '11.15am',
    level: 'Beginners',
    place: 'Strabane',
    kind: 'yoga',
  },
  {
    day: 'Thursday',
    name: 'Yoga',
    time: '6pm',
    level: 'Mixed ability',
    place: 'Strabane',
    kind: 'yoga',
  },
  {
    day: 'Thursday',
    name: 'Yoga',
    time: '7.30pm',
    level: 'Beginners',
    place: 'Strabane',
    kind: 'yoga',
  },
  {
    day: 'Friday',
    name: 'Pilates',
    time: '10am',
    level: 'Suitable for everyone',
    place: 'Castlederg',
    kind: 'pilates',
  },
  {
    day: 'Saturday',
    name: 'Yoga',
    time: '9am',
    level: 'Suitable for beginners',
    place: 'Strabane',
    kind: 'yoga',
  },
] satisfies ClassItem[]

type ClassKind = 'yoga' | 'pilates' | 'restorative'

type ClassItem = {
  day: string
  name: string
  time: string
  level: string
  place: string
  kind: ClassKind
}

const scheduleDays = classes.reduce<{ day: string; items: ClassItem[] }[]>(
  (groups, item) => {
    const group = groups.find((entry) => entry.day === item.day)

    if (group) {
      group.items.push(item)
    } else {
      groups.push({ day: item.day, items: [item] })
    }

    return groups
  },
  [],
)

function ClassIcon({ kind }: { kind: ClassKind }) {
  if (kind === 'pilates') {
    return <PersonStanding size={22} />
  }

  if (kind === 'restorative') {
    return <Leaf size={22} />
  }

  return <Flower2 size={22} />
}

const bookings = [
  "1-2-1's",
  'Group sessions',
  'Sports recovery',
  'Yoga for MS',
  'Yoga for anxiety',
  'Yoga in school',
  'Teacher training',
]

const retreatAlbums = [
  {
    date: '5th-11th July 2026',
    title: 'Santillan, Malaga retreat',
    description:
      'A 25-hour retreat with yoga, rest, sunshine, and time to fully step away.',
    cover: '/images/santillan-retreat-villa.jpg',
    coverAlt: 'Santillan retreat building in Malaga surrounded by gardens',
    photos: [
      {
        src: '/images/santillan-retreat-villa.jpg',
        alt: 'Santillan retreat building in Malaga surrounded by gardens',
      },
      {
        src: '/images/malaga-retreat-view.jpg',
        alt: 'Santillan retreat building in Malaga with sea views',
      },
      {
        src: '/images/retreat-garden.jpg',
        alt: 'Sunny retreat garden with fountains and plants',
      },
      {
        src: '/images/retreat-studio-ready.jpg',
        alt: 'Yoga mats and props laid out in a large retreat studio',
      },
      {
        src: '/images/retreat-class.jpg',
        alt: 'Group yoga class sitting on mats in a bright retreat studio',
      },
      {
        src: '/images/retreat-lunch-spread.jpg',
        alt: 'Colourful retreat lunch with salads and olives',
      },
      {
        src: '/images/retreat-buffet.jpg',
        alt: 'Retreat buffet table with salads, grains, and warm dishes',
      },
      {
        src: '/images/retreat-doorway.jpg',
        alt: 'A peaceful retreat doorway with a garlanded statue and candle',
      },
    ],
  },
  {
    date: 'Ireland retreat',
    title: 'Coastal Ireland retreat',
    description:
      'Beach views, a welcoming hotel, restful rooms, and hearty retreat food.',
    cover: '/images/ireland-retreat-beach-panorama.jpg',
    coverAlt: 'Wide sandy beach and blue sea at the Ireland retreat',
    photos: [
      {
        src: '/images/ireland-retreat-beach-panorama.jpg',
        alt: 'Wide sandy beach and blue sea at the Ireland retreat',
      },
      {
        src: '/images/ireland-retreat-beach-aerial.jpg',
        alt: 'Aerial view of a sandy beach and turquoise water in Ireland',
      },
      {
        src: '/images/ireland-retreat-hotel.jpg',
        alt: 'Ireland retreat hotel exterior with purple flowers',
      },
      {
        src: '/images/ireland-retreat-bedroom.jpg',
        alt: 'Calm retreat bedroom with tea tray on the bed',
      },
      {
        src: '/images/ireland-retreat-meal.jpg',
        alt: 'Retreat meal with roast dinner and gravy',
      },
    ],
  },
]

const photos = [
  {
    src: '/images/wall-yoga-class.jpg',
    alt: 'Yoga class using wall ropes and chairs',
  },
  {
    src: '/images/studio-yoga-class.jpg',
    alt: 'Studio yoga class practising downward dog',
  },
  {
    src: '/images/garden-yoga-square.jpg',
    alt: 'Annie practising yoga outdoors in a sunny garden',
  },
  {
    src: '/images/class-yoga-props.jpg',
    alt: 'Yoga blocks and strap in a basket',
  },
  {
    src: '/images/garden-class-mats.jpg',
    alt: 'Outdoor yoga mats set up on grass',
  },
  {
    src: '/images/studio-seated-yoga.jpg',
    alt: 'Yoga class seated on mats with arms raised',
  },
  {
    src: '/images/class-group-smiling.jpg',
    alt: 'Smiling yoga class group with arms raised',
  },
]
