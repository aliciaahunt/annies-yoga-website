export default function SocialIcon({ network }: { network: 'facebook' | 'instagram' }) {
  if (network === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.2 8.2V6.7c0-.7.5-.9.9-.9h2.3V2.1L14.2 2c-3.5 0-4.3 2.1-4.3 4.3v1.9H7.7v4.1h2.2V22h4.3v-9.7h2.9l.5-4.1h-3.4Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.7" r="1" className="social-icon-dot" />
    </svg>
  )
}
