import { useState } from 'react'
import { profile } from '../data'
import { validateContact } from '../validate'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import Spotlight from './Spotlight'

const empty = { name: '', email: '', message: '' }

export default function Contact() {
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  function submit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const values = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
    }
    const next = validateContact(values)
    setErrors(next)
    if (Object.keys(next).length) {
      setSent(false)
      return
    }
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(`Project inquiry from ${values.name.trim()}`)}&body=${encodeURIComponent(`${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`)}`
    window.location.href = href
    setSent(true)
  }

  return (
    <Spotlight id="contact" className="px-5 py-24 md:px-14">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Tell me what you’re building."
            text="A short note is enough. I’ll reply with how I’d approach the work, and whether I’m the right fit."
          />
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="text-white/45">Email</dt>
              <dd>
                <a className="font-medium text-white transition hover:text-[#ff8a3d]" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-white/45">Phone</dt>
              <dd>
                <a className="font-medium text-white transition hover:text-[#ff8a3d]" href={`tel:${profile.phone.replace(/\s/g, '')}`}>
                  {profile.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-white/45">Location</dt>
              <dd className="font-medium">{profile.location}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={80}>
          <form
            onSubmit={submit}
            noValidate
            className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#ff8a3d]/30 md:p-7"
          >
            <Field label="Name" name="name" error={errors.name} autoComplete="name" />
            <Field label="Email" name="email" type="email" error={errors.email} autoComplete="email" />
            <label className="mt-4 block text-sm font-medium">
              Project
              <textarea
                name="message"
                rows={5}
                defaultValue={empty.message}
                className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-normal text-white outline-none transition placeholder:text-white/30 focus:border-[#ff8a3d]/70"
                placeholder="What are you making, and when do you need it?"
              />
              {errors.message ? <span className="mt-1 block text-xs text-[#ffb088]">{errors.message}</span> : null}
            </label>
            <button
              type="submit"
              className="mt-5 w-full rounded-full bg-[#ff6a1a] py-3 font-semibold text-white shadow-[0_12px_30px_rgba(255,106,26,0.3)] transition hover:-translate-y-0.5 hover:bg-[#ff7d33]"
            >
              Send message
            </button>
            {sent ? (
              <p className="mt-3 text-sm text-white/70" role="status">
                Your email app should open with this note. If it doesn’t, write to {profile.email}.
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
      <p className="mx-auto mt-16 max-w-6xl text-sm text-white/35">© {new Date().getFullYear()} {profile.brand}</p>
    </Spotlight>
  )
}

function Field({ label, name, error, type = 'text', autoComplete }) {
  return (
    <label className="mt-4 block text-sm font-medium first:mt-0">
      {label}
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-normal text-white outline-none transition placeholder:text-white/30 focus:border-[#ff8a3d]/70"
      />
      {error ? <span className="mt-1 block text-xs text-[#ffb088]">{error}</span> : null}
    </label>
  )
}
