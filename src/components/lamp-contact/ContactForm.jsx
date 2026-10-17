import { useState } from 'react'
import { motion } from 'framer-motion'
import { validateContact } from '../../validate'

const empty = { name: '', email: '', phone: '', message: '' }

export default function ContactForm({ isOn }) {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [serverMessage, setServerMessage] = useState('')

  function update(field) {
    return (event) => {
      const next = event.target.value
      setValues((prev) => ({ ...prev, [field]: next }))
      if (errors[field]) {
        setErrors((prev) => {
          const copy = { ...prev }
          delete copy[field]
          return copy
        })
      }
    }
  }

  async function submit(event) {
    event.preventDefault()
    const next = validateContact(values)
    setErrors(next)
    if (Object.keys(next).length) {
      setStatus('idle')
      return
    }

    setStatus('loading')
    setServerMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          message: values.message.trim(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Could not send your message.')
      }
      setStatus('success')
      setServerMessage(data.message || 'Message sent — I will get back to you soon.')
      setValues(empty)
    } catch (err) {
      setStatus('error')
      setServerMessage(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <div
      className="relative w-full max-w-lg"
      aria-hidden={!isOn}
      inert={!isOn ? true : undefined}
    >
      <motion.div
        initial={false}
        animate={
          isOn
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 20 }
        }
        transition={{ duration: 0.6, delay: isOn ? 0.25 : 0, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[20px] border border-[#ffc878]/20 bg-[rgba(20,12,8,0.55)] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8"
      >
        <p className="text-[0.7rem] font-semibold tracking-[0.28em] text-[#c9a24a] uppercase">
          Get in touch
        </p>
        <h2 className="font-display mt-3 text-3xl leading-tight text-[#fff8f0] md:text-[2.15rem]">
          Let&apos;s build something together
        </h2>

        <form onSubmit={submit} noValidate className="mt-7 space-y-4">
          <Field
            label="Name"
            name="name"
            value={values.name}
            onChange={update('name')}
            error={errors.name}
            autoComplete="name"
            disabled={!isOn || status === 'loading'}
          />
          <Field
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={update('email')}
            error={errors.email}
            autoComplete="email"
            disabled={!isOn || status === 'loading'}
          />
          <Field
            label="Phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={update('phone')}
            error={errors.phone}
            autoComplete="tel"
            optional
            disabled={!isOn || status === 'loading'}
          />
          <label className="block text-sm font-medium text-white/80">
            Message
            <textarea
              name="message"
              rows={4}
              value={values.message}
              onChange={update('message')}
              disabled={!isOn || status === 'loading'}
              tabIndex={isOn ? 0 : -1}
              className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-black/25 px-4 py-3 font-normal text-white outline-none transition placeholder:text-white/30 focus:border-[#ffc878]/60"
              placeholder="What are you making, and when do you need it?"
            />
            {errors.message ? (
              <span className="mt-1 block text-xs text-[#ffb088]">{errors.message}</span>
            ) : null}
          </label>

          <button
            type="submit"
            disabled={!isOn || status === 'loading'}
            tabIndex={isOn ? 0 : -1}
            className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#e8a030] via-[#f0c060] to-[#e8b040] py-3.5 text-base font-semibold text-[#1a1008] shadow-[0_12px_28px_rgba(232,160,48,0.28)] transition hover:brightness-105 disabled:cursor-wait disabled:opacity-70"
          >
            {status === 'loading' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'success' ? (
            <p className="text-sm text-[#c9e8a8]" role="status">
              {serverMessage}
            </p>
          ) : null}
          {status === 'error' ? (
            <p className="text-sm text-[#ffb088]" role="alert">
              {serverMessage}
            </p>
          ) : null}
        </form>
      </motion.div>
    </div>
  )
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  autoComplete,
  optional,
  disabled,
}) {
  return (
    <label className="block text-sm font-medium text-white/80">
      {label}
      {optional ? <span className="ml-1 font-normal text-white/35">(optional)</span> : null}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 font-normal text-white outline-none transition placeholder:text-white/30 focus:border-[#ffc878]/60"
      />
      {error ? <span className="mt-1 block text-xs text-[#ffb088]">{error}</span> : null}
    </label>
  )
}
