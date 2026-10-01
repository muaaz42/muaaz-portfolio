import { jobs } from '../data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import Spotlight from './Spotlight'

export default function Experience() {
  return (
    <Spotlight id="experience" className="px-5 py-24 md:px-14">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Places the work got sharper."
            text="A short path through product teams, client work, and the habits I still use."
          />
        </Reveal>

        <div className="relative mt-14 space-y-4 border-l border-white/10 pl-6 md:pl-8">
          {jobs.map((job, index) => (
            <Reveal key={job.id} delay={index * 70}>
              <article className="group relative rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition duration-500 ease-out hover:-translate-y-1 hover:border-[#ff8a3d]/40 hover:bg-[#ff6a1a]/10 md:p-6">
                <span className="absolute top-7 -left-[1.95rem] h-3 w-3 rounded-full border border-[#ff8a3d] bg-[#1a0c08] transition group-hover:scale-125 group-hover:bg-[#ff6a1a] md:-left-[2.45rem]" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-medium text-[#ff8a3d]">{job.dates}</p>
                  <p className="text-sm text-white/45">{job.company}</p>
                </div>
                <h3 className="mt-2 text-2xl font-bold tracking-tight">{job.role}</h3>
                <p className="mt-2 max-w-2xl text-white/65">{job.summary}</p>
                <ul className="mt-4 grid gap-2 text-sm text-white/55 md:grid-cols-1">
                  {job.points.map((point) => (
                    <li key={point} className="transition group-hover:text-white/80">
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Spotlight>
  )
}
