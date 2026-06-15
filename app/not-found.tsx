import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-white">
      <div className="text-center px-6">
        <p className="text-label text-brand-purple uppercase tracking-widest mb-4">404</p>
        <h1 className="font-display text-display-lg text-brand-ink mb-4">
          Page not found
        </h1>
        <p className="text-body-lg text-brand-ink-muted mb-10">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-brand-purple text-white font-medium hover:bg-brand-ink transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
