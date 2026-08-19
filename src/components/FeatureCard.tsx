import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { siteUrl } from '@/lib/siteUrl'

type FeatureCardContent = {
  title: string
  image: string
  imageAlt: string
  details: Array<{ icon: ReactNode; text: string }>
  action: { icon: ReactNode; label: string }
  imagePosition?: string
}

type FeatureCardProps = FeatureCardContent & (
  | { to: string; onClick?: never }
  | { onClick: () => void; to?: never }
)

export default function FeatureCard({
  title,
  image,
  imageAlt,
  details,
  action,
  imagePosition,
  ...interaction
}: FeatureCardProps) {
  const content = (
    <>
      <span className="retreat-journal-card-image">
        <img src={siteUrl(image)} alt={imageAlt} loading="lazy" style={{ objectPosition: imagePosition }} />
      </span>
      <span className="retreat-journal-card-copy">
        <h3>{title}</h3>
        <span className="retreat-journal-card-details">
          {details.map((detail) => (
            <span key={detail.text}>{detail.icon}{detail.text}</span>
          ))}
        </span>
        <span className="retreat-journal-card-action">{action.icon}{action.label}</span>
      </span>
    </>
  )

  const className = 'retreat-journal-card lift-card'

  if (interaction.to !== undefined) {
    return <Link className={className} to={interaction.to}>{content}</Link>
  }

  return <button className={className} onClick={interaction.onClick} type="button">{content}</button>
}
