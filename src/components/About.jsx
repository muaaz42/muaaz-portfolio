import { about, tools } from '../data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import Spotlight from './Spotlight'
import ToolBadge from './ToolBadge'

export default function About() {
  return (
    <Spotlight id="about" className="px-5 py-24 md:px-14">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <SectionHeading eyebrow={about.eyebrow} title={about.title} text={about.lede} />
          <ul className="mt-8 space-y-3">
            {about.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-white/75">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6a1a]" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2">
          {tools.map((tool, index) => (
            <Reveal key={tool.id} delay={index * 60} className="h-full">
              <article className="group h-full rounded-3xl border border-white/10 bg-white/[0.03] p-4 transition duration-500 ease-out hover:-translate-y-1.5 hover:border-[#ff8a3d]/45 hover:bg-[#ff6a1a]/10 hover:shadow-[0_16px_40px_rgba(255,106,26,0.12)]">
                <ToolBadge id={tool.id} />
                <p className="mt-4 font-semibold">{tool.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/55 transition group-hover:text-white/80">
                  {tool.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Spotlight>
  )
}
