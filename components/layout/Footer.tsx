import { company } from '@/data/company'
import { navigationLinks } from '@/data/navigation'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-ink">
      <div className="container mx-auto py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* Brand */}
          <div>
            <span className="font-display text-xl font-bold text-white tracking-tight">
              THE BIG 3
            </span>
            <p className="mt-1 text-body-sm text-white/40">{company.tagline}</p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-8 gap-y-3" role="list">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-body-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <p className="text-body-sm text-white/30 shrink-0">
            © {year} {company.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
