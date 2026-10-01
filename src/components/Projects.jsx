import { useEffect, useRef } from 'react'
import { projects } from '../data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import Spotlight from './Spotlight'

export default function Projects() {
  return (
    <Spotlight id="projects" className="px-5 py-24 md:px-14">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Selected work."
            text="Three products where the interface had to earn its place. Hover a card to look around it."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3 [perspective:1200px]">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 80}>
              <TiltCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </Spotlight>
  )
}

function TiltCard({ project }) {
  const ref = useRef(null)
  const target = useRef({ x: 0, y: 0, lift: 0 })

  useEffect(() => {
    const current = { x: 0, y: 0, lift: 0 }
    let frame = 0
    const tick = () => {
      const node = ref.current
      if (node) {
        current.x += (target.current.x - current.x) * 0.12
        current.y += (target.current.y - current.y) * 0.12
        current.lift += (target.current.lift - current.lift) * 0.12
        node.style.transform = `rotateX(${current.y.toFixed(2)}deg) rotateY(${current.x.toFixed(2)}deg) translateY(${current.lift.toFixed(2)}px)`
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  function move(event) {
    const rect = ref.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    target.current = { x: x * 8, y: -y * 6, lift: -6 }
  }

  function leave() {
    target.current = { x: 0, y: 0, lift: 0 }
  }

  return (
    <article
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className="group tilt-card h-full rounded-[28px] border border-white/10 bg-white/[0.03] p-3 hover:border-[#ff8a3d]/45 hover:shadow-[0_20px_50px_rgba(255,106,26,0.12)]"
    >
      <Mock variant={project.variant} name={project.name} />
      <div className="px-3 pt-4 pb-3">
        <div className="flex items-center justify-between text-xs tracking-wide text-white/45 uppercase">
          <span>{project.tag}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="mt-2 text-2xl font-bold tracking-tight">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <li key={tool} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/70">
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function Mock({ variant, name }) {
  return (
    <div className="overflow-hidden rounded-[22px] bg-[#1a0d08]">
      <div className="flex items-center gap-1.5 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span className="ml-2 text-xs text-white/40">{name}</span>
      </div>
      <div className="h-40 px-4 pb-4 transition duration-500 group-hover:scale-[1.03]">
        {variant === 'finance' ? <Finance /> : null}
        {variant === 'wellness' ? <Wellness /> : null}
        {variant === 'retail' ? <Retail /> : null}
      </div>
    </div>
  )
}

function Finance() {
  const bars = [40, 70, 48, 88, 62, 96, 74]
  return (
    <div className="flex h-full items-end gap-2 rounded-2xl bg-gradient-to-br from-[#2a140c] to-[#120804] p-4">
      {bars.map((height) => (
        <span
          key={height}
          className="flex-1 rounded-t-md bg-gradient-to-t from-[#ff6a1a] to-[#ffc49a]"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  )
}

function Wellness() {
  return (
    <div className="grid h-full content-center gap-2 rounded-2xl bg-gradient-to-br from-[#3a2218] to-[#1a0d08] p-4">
      <div className="h-3 w-24 rounded-full bg-[#ff8a3d]/80" />
      <div className="h-8 rounded-xl bg-white/10" />
      <div className="h-8 rounded-xl bg-white/6" />
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <span className="block h-full w-2/3 rounded-full bg-[#ff6a1a]" />
      </div>
    </div>
  )
}

function Retail() {
  return (
    <div className="grid h-full grid-cols-2 gap-2">
      {['#ff8a3d', '#c2410c', '#f3c2a4', '#7c2d12'].map((color) => (
        <span key={color} className="rounded-xl" style={{ background: color }} />
      ))}
    </div>
  )
}
