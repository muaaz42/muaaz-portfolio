import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cursor } from '../cursor'
import { profile, testimonial } from '../data'
import { useNarrow } from '../useNarrow'
import Spotlight from './Spotlight'
import ToolBadge from './ToolBadge'

// Full circle around the portrait — even sequence on the outermost orbit line
const ORBIT_LOGOS = ['cursor', 'shopify', 'claude', 'gemini', 'chatgpt', 'linkedin', 'github']

function badgesOnOuterOrbit(ids, { startDeg = -90, radius = 50 } = {}) {
  return ids.map((id, i) => {
    const deg = startDeg + (i / ids.length) * 360
    const rad = (deg * Math.PI) / 180
    return {
      id,
      left: 50 + radius * Math.cos(rad),
      top: 50 + radius * Math.sin(rad),
      delay: `${(i * 0.12).toFixed(2)}s`,
      depth: 10 + (i % 4) * 3,
    }
  })
}

const desktopBadges = badgesOnOuterOrbit(ORBIT_LOGOS, { startDeg: -90, radius: 50 })
const narrowBadges = badgesOnOuterOrbit(ORBIT_LOGOS, { startDeg: -90, radius: 50 })

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const narrow = useNarrow()
  const reduce = useReducedMotion()
  const badges = narrow ? narrowBadges : desktopBadges
  const figureRef = useRef(null)

  useEffect(() => {
    const points = badges.map(() => ({ x: 0, y: 0 }))
    const figure = { x: 0, r: 0 }
    let frame = 0

    const tick = () => {
      badges.forEach((badge, index) => {
        const node = document.getElementById(`badge-${badge.id}`)
        if (!node) return
        const tx = -cursor.x * badge.depth
        const ty = cursor.y * badge.depth * 0.4
        points[index].x += (tx - points[index].x) * 0.08
        points[index].y += (ty - points[index].y) * 0.08
        // Keep badge centered on the orbit point + parallax offset
        node.style.transform = `translate(-50%, -50%) translate3d(${points[index].x.toFixed(2)}px, ${points[index].y.toFixed(2)}px, 0)`
      })
      const node = figureRef.current
      if (node) {
        figure.x += (cursor.x * -18 - figure.x) * 0.07
        figure.r += (cursor.x * 4 - figure.r) * 0.07
        node.style.transform = `translate3d(${figure.x.toFixed(2)}px, 0, 0) rotate(${figure.r.toFixed(2)}deg)`
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [badges])

  function track(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    cursor.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    cursor.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
  }

  function reset() {
    cursor.x = 0
    cursor.y = 0
  }

  return (
    <Spotlight
      id="home"
      onMouseMove={track}
      onMouseLeave={reset}
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className={narrow ? 'pointer-events-none relative order-2 h-[540px]' : 'pointer-events-none absolute inset-0'}>
        <div
          className="orbit orbit-outer"
          style={
            narrow
              ? { width: '92%', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }
              : { width: 'min(540px, 44vw)', right: '3%', top: '52%', transform: 'translateY(-50%)' }
          }
        >
          {/* Inner rings only — logos sit in sequence on the outermost ring */}
          <i style={{ inset: '14%' }} />
          <i style={{ inset: '28%' }} />

          {badges.map((badge) => (
            <div
              key={badge.id}
              id={`badge-${badge.id}`}
              className="orbit-badge pointer-events-auto absolute z-10"
              style={{ left: `${badge.left}%`, top: `${badge.top}%` }}
            >
              <div
                className="float-y hover:scale-110"
                style={{
                  animationDelay: badge.delay,
                  animationDuration: `${6.5 + badge.depth * 0.08}s`,
                }}
              >
                <ToolBadge id={badge.id} size="lg" />
              </div>
            </div>
          ))}
        </div>
        <div
          ref={figureRef}
          className={
            narrow
              ? 'absolute inset-x-[8%] bottom-[4%] top-[8%] flex items-end justify-center'
              : 'absolute right-[8%] bottom-[12%] top-[12%] flex w-[min(360px,30vw)] items-center justify-center'
          }
        >
          <img
            src={`${import.meta.env.BASE_URL}character.png?v=17`}
            alt="Portrait of Muaaz"
            className="character-float h-auto max-h-full w-full max-w-none object-contain object-bottom opacity-100"
            draggable="false"
          />
        </div>
      </div>

      <motion.div
        className="relative z-10 flex w-full flex-1 flex-col justify-between px-5 py-6 md:px-14 lg:max-w-[600px] lg:py-8"
        initial={reduce ? false : 'hidden'}
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        <div>
          <motion.p variants={rise} className="text-2xl font-medium text-white/90 md:text-[1.7rem]">
            {profile.greeting} <span className="font-semibold text-[#ff7a2e]">{profile.name}</span>
          </motion.p>
          <motion.h1
            variants={rise}
            className="mt-3 text-[clamp(2.7rem,5vw,5.15rem)] leading-[0.95] font-extrabold tracking-[-0.045em] lg:whitespace-nowrap"
          >
            {profile.headline}
          </motion.h1>
          <motion.p variants={rise} className="mt-5 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
            {profile.summary}
          </motion.p>
          <motion.div variants={rise} className="mt-8 flex items-center gap-3">
            <a
              href="#contact"
              className="rounded-full bg-[#ff6a1a] px-6 py-3 text-base font-semibold text-white shadow-[0_12px_32px_rgba(255,106,26,0.38)] transition hover:-translate-y-0.5 hover:bg-[#ff7d33] hover:shadow-[0_16px_40px_rgba(255,106,26,0.5)]"
            >
              Hire Me
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label={`Email ${profile.name}`}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white transition hover:-translate-y-0.5 hover:border-[#ff8a3d] hover:text-[#ff8a3d]"
            >
              <MailIcon />
            </a>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-[#25D366] transition hover:-translate-y-0.5 hover:border-[#25D366]/70"
            >
              <WhatsAppIcon />
            </a>
          </motion.div>
        </div>

        <motion.figure
          variants={rise}
          className="mt-10 max-w-sm rounded-[28px] border border-white/12 bg-white/[0.06] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl"
        >
          <QuoteIcon />
          <blockquote className="mt-2 text-sm leading-relaxed text-white/85">{testimonial.quote}</blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#ffb088] to-[#c2410c] text-xs font-bold text-[#2a120c]">
              {testimonial.initials}
            </span>
            <span>
              <span className="block text-sm font-semibold">{testimonial.name}</span>
              <span className="block text-xs text-white/55">{testimonial.role}</span>
            </span>
          </figcaption>
        </motion.figure>
      </motion.div>
    </Spotlight>
  )
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2" y="3.5" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 5.5 9 10l6-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function QuoteIcon() {
  return (
    <svg width="28" height="22" viewBox="0 0 28 22" fill="none" aria-hidden="true">
      <path d="M11 2c-4 2.2-7 6.2-7 11h5c0-2.6 1.2-4 3-4V2zm12 0c-4 2.2-7 6.2-7 11h5c0-2.6 1.2-4 3-4V2z" fill="white" fillOpacity="0.9" />
    </svg>
  )
}
