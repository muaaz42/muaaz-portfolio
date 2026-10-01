import { useEffect, useState } from 'react'
import { nav, profile } from '../data'

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const root = document.getElementById('scroller')
    if (!root) return

    const onScroll = () => {
      setScrolled(root.scrollTop > 8)
      const frame = document.getElementById('hero-frame')
      setPastHero(frame ? frame.getBoundingClientRect().bottom < 72 : false)
    }
    onScroll()
    root.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { root, rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )

    nav.forEach((item) => {
      const node = document.getElementById(item.id)
      if (node) observer.observe(node)
    })

    return () => {
      root.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function close() {
    setOpen(false)
  }

  return (
    <>
    <div className="h-[4.75rem] shrink-0" aria-hidden="true" />
    <header
      className={`fixed z-50 px-4 py-4 transition md:px-10 ${
        pastHero
          ? 'inset-x-0 top-0 bg-[#140c08]/80 backdrop-blur-md'
          : `inset-x-0 top-0 md:inset-x-3.5 md:top-3.5 ${scrolled ? 'bg-[#140c08]/75 backdrop-blur-md md:rounded-t-[30px]' : ''}`
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <a href="#home" className="text-base font-extrabold tracking-tight text-white sm:text-lg" onClick={close}>
          {profile.brand}
        </a>

        <nav className="hidden items-center rounded-full border border-white/12 bg-white/[0.04] p-1 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'page' : undefined}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active === item.id ? 'text-[#ff8a3d]' : 'text-white/75 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`${import.meta.env.BASE_URL}Muaaz-Resume.html`}
            download
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-2.5 py-1.5 transition hover:-translate-y-0.5 hover:border-[#ff8a3d]/70"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10">
              <DownloadIcon />
            </span>
            <span className="hidden pr-2 text-left text-xs leading-tight font-semibold sm:block">
              Download
              <br />
              Resume
            </span>
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex w-4 flex-col gap-1">
              <span className="h-0.5 w-full bg-white" />
              <span className="h-0.5 w-full bg-white" />
              <span className="h-0.5 w-full bg-white" />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav className="mt-3 flex flex-col rounded-3xl border border-white/10 bg-[#1a0e09]/95 p-2 lg:hidden" aria-label="Mobile">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={close}
              className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                active === item.id ? 'text-[#ff8a3d]' : 'text-white/80'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
    </>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2.2v7.2M5.2 7.1 8 9.9l2.8-2.8" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.2 12.2h9.6" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
