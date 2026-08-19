import type { ReactNode } from 'react'
import { siteUrl } from '@/lib/siteUrl'

type PageHeroProps = {
  ariaLabel: string
  eyebrow: string
  title: ReactNode
  image?: {
    src: string
    alt: string
    position?: string
  }
  children?: ReactNode
}

export default function PageHero({ ariaLabel, eyebrow, title, image, children }: PageHeroProps) {
  return (
    <section aria-label={ariaLabel} className={`page-hero ${image ? 'page-hero-image' : 'page-hero-solid'}`}>
      {image && (
        <img src={siteUrl(image.src)} alt={image.alt} style={{ objectPosition: image.position }} />
      )}
      {image && <div className="page-hero-shade" aria-hidden="true" />}
      <div className="page-hero-content">
        <p className="eyebrow light">{eyebrow}</p>
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  )
}
