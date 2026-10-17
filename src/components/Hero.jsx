import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cursor } from '../cursor'
import { profile, testimonial } from '../data'
import { useNarrow } from '../useNarrow'
import Spotlight from './Spotlight'
import ToolBadge from './ToolBadge'

const desktopBadges = [
  { id: 'cursor', style: { left: '54%', top: '18%' }, delay: '0s', depth: 18 },
  { id: 'claude', style: { right: '1.5%', top: '12%', left: 'auto' }, delay: '0.4s', depth: 6 },
  { id: 'github', style: { left: '46%', top: '42%' }, delay: '0.8s', depth: 22 },
  { id: 'gemini', style: { right: '1%', top: '52%', left: 'auto' }, delay: '0.2s', depth: 14 },
  { id: 'linkedin', style: { left: '50%', top: '68%' }, delay: '1.1s', depth: 16 },
  { id: 'chatgpt', style: { left: '58%', top: '82%' }, delay: '0.6s', depth: 10 },
]

const narrowBadges = [
  { id: 'cursor', style: { left: '8%', top: '12%' }, delay: '0s', depth: 12 },
  { id: 'claude', style: { right: '2%', top: '16%', left: 'auto' }, delay: '0.4s', depth: 8 },
  { id: 'github', style: { left: '4%', top: '42%' }, delay: '0.8s', depth: 14 },
  { id: 'gemini', style: { left: '76%', top: '38%' }, delay: '0.2s', depth: 12 },
  { id: 'linkedin', style: { left: '10%', top: '72%' }, delay: '1.1s', depth: 10 },
  { id: 'chatgpt', style: { left: '70%', top: '70%' }, delay: '0.6s', depth: 8 },
]

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
        node.style.transform = `translate3d(${points[index].x.toFixed(2)}px, ${points[index].y.toFixed(2)}px, 0)`
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
          className="orbit"
          style={
            narrow
              ? { width: '86%', left: '50%', top: '52%', transform: 'translate(-50%, -50%)' }
              : { width: 'min(560px, 44vw)', right: '4%', top: '56%', transform: 'translateY(-50%)' }
          }
        >
          <i style={{ inset: '12%' }} />
          <i style={{ inset: '24%' }} />
        </div>
        <div
          ref={figureRef}
          className={
            narrow
              ? 'absolute inset-x-0 bottom-0 flex h-[88%] items-end justify-center'
              : 'absolute right-[4%] bottom-[6%] top-[10%] flex w-[min(420px,36vw)] items-center justify-center'
          }
        >
          <img
            src={`${import.meta.env.BASE_URL}character.png?v=16`}
            alt="Portrait of Muaaz"
            className="character-float h-auto max-h-full w-full max-w-none object-contain object-bottom opacity-100"
            draggable="false"
          />
        </div>
        {badges.map((badge) => (
          <div
            key={badge.id}
            id={`badge-${badge.id}`}
            className="pointer-events-auto absolute z-10"
            style={badge.style}
          >
            <div className="float-y hover:scale-110" style={{ animationDelay: badge.delay, animationDuration: `${6.5 + badge.depth * 0.08}s` }}>
              <ToolBadge id={badge.id} size="lg" />
            </div>
          </div>
        ))}
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

function QuoteIcon() {
  return (
    <svg width="28" height="22" viewBox="0 0 28 22" fill="none" aria-hidden="true">
      <path d="M11 2c-4 2.2-7 6.2-7 11h5c0-2.6 1.2-4 3-4V2zm12 0c-4 2.2-7 6.2-7 11h5c0-2.6 1.2-4 3-4V2z" fill="white" fillOpacity="0.9" />
    </svg>
  )
}
