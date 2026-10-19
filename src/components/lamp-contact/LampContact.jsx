import { useCallback, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ContactForm from './ContactForm'
import Lamp from './Lamp'

export default function LampContact() {
  const [isOn, setIsOn] = useState(false)
  const [flicker, setFlicker] = useState(false)
  const [hintSeen, setHintSeen] = useState(false)
  const reduce = useReducedMotion()
  const toggling = useRef(false)

  const toggle = useCallback(() => {
    if (toggling.current) return
    toggling.current = true
    setHintSeen(true)

    setIsOn((prev) => {
      const next = !prev
      if (next && !reduce) {
        setFlicker(true)
        window.setTimeout(() => setFlicker(false), 200)
      } else {
        setFlicker(false)
      }
      return next
    })

    window.setTimeout(() => {
      toggling.current = false
    }, 450)
  }, [reduce])

  return (
    <section
      id="contact"
      className="lamp-contact relative min-h-svh overflow-hidden"
      data-lamp={isOn ? 'on' : 'off'}
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          background: flicker
            ? 'radial-gradient(ellipse at 28% 35%, #2a1808 0%, #0a0604 55%, #000 100%)'
            : isOn
              ? 'radial-gradient(ellipse at 28% 30%, #3a2410 0%, #1a1008 42%, #0c0805 78%, #050302 100%)'
              : 'radial-gradient(ellipse at 50% 40%, #0a0806 0%, #000 70%)',
        }}
        transition={{
          duration: flicker ? 0.08 : isOn ? 0.6 : 0.4,
          ease: 'easeOut',
        }}
      />

      {/* Ambient warm wash when on */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={false}
        animate={{ opacity: isOn && !flicker ? 1 : 0 }}
        transition={{ duration: isOn ? 0.65 : 0.4 }}
        style={{
          background:
            'radial-gradient(680px 420px at 22% 40%, rgba(255,150,50,0.18), transparent 60%)',
        }}
      />

      <div className="relative z-[1] mx-auto grid min-h-svh max-w-6xl items-center gap-8 px-5 py-20 md:px-14 lg:grid-cols-2 lg:gap-12">
        <Lamp isOn={isOn && !flicker} onToggle={toggle} showHint={!hintSeen && !isOn} />

        {/* Reserve space so form appearance doesn't shift layout */}
        <div className="flex min-h-[420px] items-center justify-center lg:justify-end">
          <ContactForm isOn={isOn && !flicker} />
        </div>
      </div>

    </section>
  )
}
