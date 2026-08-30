import { Turnstile } from '@marsidev/react-turnstile'

type TurnstileCheckProps = {
  action: 'enquiry' | 'reservation'
  onTokenChange: (token: string) => void
}

export default function TurnstileCheck({ action, onTokenChange }: TurnstileCheckProps) {
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

  if (!siteKey) return null

  return (
    <div className="turnstile-check" aria-label="Spam protection">
      <Turnstile
        siteKey={siteKey}
        options={{
          action,
          appearance: 'interaction-only',
          size: 'flexible',
          theme: 'light',
          refreshExpired: 'auto',
        }}
        onSuccess={onTokenChange}
        onExpire={() => onTokenChange('')}
        onError={() => onTokenChange('')}
      />
    </div>
  )
}
