import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { siteUrl } from '@/lib/siteUrl'

export type RetreatPhotoGalleryData = {
  title: string
  meta: string
  photos: Array<{ src: string; alt: string }>
}

export type RetreatPhotoGalleryHandle = {
  open: (gallery: RetreatPhotoGalleryData) => void
}

const RetreatPhotoGallery = forwardRef<RetreatPhotoGalleryHandle>(function RetreatPhotoGallery(_, forwardedRef) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [gallery, setGallery] = useState<RetreatPhotoGalleryData | null>(null)
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  useImperativeHandle(forwardedRef, () => ({
    open(nextGallery) {
      setGallery(nextGallery)
      setActivePhotoIndex(0)
      dialogRef.current?.showModal()
    },
  }))

  const showPreviousPhoto = () => {
    if (!gallery) return
    setActivePhotoIndex((current) => (current - 1 + gallery.photos.length) % gallery.photos.length)
  }

  const showNextPhoto = () => {
    if (!gallery) return
    setActivePhotoIndex((current) => (current + 1) % gallery.photos.length)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!dialogRef.current?.open) return
      if (event.key === 'ArrowLeft') showPreviousPhoto()
      if (event.key === 'ArrowRight') showNextPhoto()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const activePhoto = gallery?.photos[activePhotoIndex]

  return (
    <dialog
      aria-label={gallery ? `${gallery.title} photo gallery` : 'Retreat photo gallery'}
      className="retreat-gallery-dialog"
      onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close() }}
      ref={dialogRef}
    >
      {gallery && activePhoto && (
        <div className="retreat-gallery-shell">
          <header>
            <div><p>{gallery.meta}</p><h3>{gallery.title}</h3></div>
            <button aria-label="Close photo gallery" onClick={() => dialogRef.current?.close()} type="button"><X /></button>
          </header>
          <div className="retreat-gallery-stage">
            <button aria-label="Previous photograph" onClick={showPreviousPhoto} type="button"><ArrowLeft /></button>
            <img src={siteUrl(activePhoto.src)} alt={activePhoto.alt} />
            <button aria-label="Next photograph" onClick={showNextPhoto} type="button"><ArrowRight /></button>
          </div>
          <footer>
            <div className="retreat-gallery-thumbnails" aria-label="Choose a photograph">
              {gallery.photos.map((photo, index) => (
                <button aria-label={`View photograph ${index + 1}`} aria-pressed={index === activePhotoIndex} key={photo.src} onClick={() => setActivePhotoIndex(index)} type="button">
                  <img src={siteUrl(photo.src)} alt="" loading="lazy" />
                </button>
              ))}
            </div>
            <span>{activePhotoIndex + 1} / {gallery.photos.length}</span>
          </footer>
        </div>
      )}
    </dialog>
  )
})

export default RetreatPhotoGallery
