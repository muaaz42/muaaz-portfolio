import { profile } from '../data'

const footerNav = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact us' },
]

const socials = [
  { id: 'whatsapp', label: 'WhatsApp', href: profile.whatsapp, Icon: WhatsAppIcon },
  { id: 'instagram', label: 'Instagram', href: profile.instagram, Icon: InstagramIcon },
  { id: 'web', label: 'Website', href: profile.website || '#home', Icon: GlobeIcon },
  { id: 'linkedin', label: 'LinkedIn', href: profile.linkedin, Icon: LinkedInIcon },
]

export default function Footer() {
  return (
    <footer className="relative px-4 pb-6 pt-2 md:px-6 md:pb-8">
      <div className="footer-panel relative overflow-hidden rounded-[28px] border border-white/8 px-8 py-10 md:rounded-[36px] md:px-14 md:py-14">
        <div className="relative z-[2] flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <nav aria-label="Footer" className="flex flex-col gap-3 md:gap-4">
            {footerNav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-base font-medium text-white/90 transition hover:text-[#ff8a3d] md:text-lg"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-6 md:items-end">
            <div className="flex items-center gap-5">
              {socials
                .filter((s) => s.href)
                .map(({ id, label, href, Icon }) => (
                  <a
                    key={id}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                    aria-label={label}
                    className="text-white/85 transition hover:text-[#ff8a3d]"
                  >
                    <Icon />
                  </a>
                ))}
            </div>

            <div className="space-y-1.5 text-left text-sm text-white/80 md:text-right md:text-[0.95rem]">
              <p>
                <a className="transition hover:text-[#ff8a3d]" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </p>
              <p>
                <a
                  className="transition hover:text-[#ff8a3d]"
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  {profile.phone}
                </a>
              </p>
              <p className="text-white/45">{profile.location}</p>
            </div>
          </div>
        </div>

        {/* Giant name watermark — large, sharp HD type */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[-0.18em] z-[1] select-none overflow-hidden text-center"
          aria-hidden="true"
        >
          <span className="footer-name block font-extrabold tracking-[-0.055em] text-[clamp(6.5rem,28vw,16rem)] leading-none">
            {profile.name}
          </span>
        </div>
      </div>
    </footer>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.8 2.8 4.2 6 4.2 9s-1.4 6.2-4.2 9c-2.8-2.8-4.2-6-4.2-9s1.4-6.2 4.2-9z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S.02 4.88.02 3.5 1.14 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8.5h4.6V23H.2V8.5zM8.34 8.5h4.4v1.98h.06c.61-1.16 2.11-2.38 4.35-2.38 4.65 0 5.51 3.06 5.51 7.04V23h-4.6v-6.62c0-1.58-.03-3.61-2.2-3.61-2.2 0-2.54 1.72-2.54 3.5V23h-4.58V8.5z" />
    </svg>
  )
}
