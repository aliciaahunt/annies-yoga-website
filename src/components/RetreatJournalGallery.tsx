import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Images, X } from 'lucide-react'
import { siteUrl } from '@/lib/siteUrl'

export type RetreatJournal = {
  title: string
  location: string
  dates: string
  cover: string
  coverAlt: string
  description: string
  photos: Array<{ src: string; alt: string }>
}

type RetreatJournalGalleryProps = {
  journals: RetreatJournal[]
}

export default function RetreatJournalGallery({ journals }: RetreatJournalGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [activeJournal, setActiveJournal] = useState<RetreatJournal | null>(null)
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  const closeGallery = () => dialogRef.current?.close()

  const openGallery = (journal: RetreatJournal) => {
    setActiveJournal(journal)
    setActivePhotoIndex(0)
    dialogRef.current?.showModal()
  }

  const showPreviousPhoto = () => {
    if (!activeJournal) return
    setActivePhotoIndex((current) => (current - 1 + activeJournal.photos.length) % activeJournal.photos.length)
  }

  const showNextPhoto = () => {
    if (!activeJournal) return
    setActivePhotoIndex((current) => (current + 1) % activeJournal.photos.length)
  }

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!dialog.open) return
      if (event.key === 'ArrowLeft') showPreviousPhoto()
      if (event.key === 'ArrowRight') showNextPhoto()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const activePhoto = activeJournal?.photos[activePhotoIndex]

  return (
    <>
      <div className="retreat-journal-cards">
        {journals.map((journal) => (
          <button className="retreat-journal-card" key={journal.title} onClick={() => openGallery(journal)} type="button">
            <span className="retreat-journal-card-image">
              <img src={siteUrl(journal.cover)} alt={journal.coverAlt} loading="lazy" />
              <span className="retreat-journal-card-action"><Images size={16} /> View journal</span>
            </span>
            <span className="retreat-journal-card-copy">
              <span>{journal.dates} · {journal.location}</span>
              <strong>{journal.title}</strong>
              <span>{journal.description}</span>
            </span>
          </button>
        ))}
      </div>

      <dialog
        aria-label={activeJournal ? `${activeJournal.title} photo journal` : 'Retreat photo journal'}
        className="retreat-gallery-dialog"
        onClick={(event) => { if (event.target === event.currentTarget) closeGallery() }}
        ref={dialogRef}
      >
        {activeJournal && activePhoto && (
          <div className="retreat-gallery-shell">
            <header>
              <div>
                <p>{activeJournal.dates} · {activeJournal.location}</p>
                <h3>{activeJournal.title}</h3>
              </div>
              <button aria-label="Close photo journal" onClick={closeGallery} type="button"><X /></button>
            </header>

            <div className="retreat-gallery-stage">
              <button aria-label="Previous photograph" onClick={showPreviousPhoto} type="button"><ArrowLeft /></button>
              <img src={siteUrl(activePhoto.src)} alt={activePhoto.alt} />
              <button aria-label="Next photograph" onClick={showNextPhoto} type="button"><ArrowRight /></button>
            </div>

            <footer>
              <div className="retreat-gallery-thumbnails" aria-label="Choose a photograph">
                {activeJournal.photos.map((photo, index) => (
                  <button
                    aria-label={`View photograph ${index + 1}`}
                    aria-pressed={index === activePhotoIndex}
                    key={photo.src}
                    onClick={() => setActivePhotoIndex(index)}
                    type="button"
                  >
                    <img src={siteUrl(photo.src)} alt="" />
                  </button>
                ))}
              </div>
              <span>{activePhotoIndex + 1} / {activeJournal.photos.length}</span>
            </footer>
          </div>
        )}
      </dialog>
    </>
  )
}
