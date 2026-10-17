import { useCallback, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const DUST = [
  { x: 38, y: 58, s: 1.2, d: 0 },
  { x: 48, y: 66, s: 0.9, d: 0.4 },
  { x: 55, y: 72, s: 1.4, d: 0.8 },
  { x: 42, y: 78, s: 1.0, d: 1.2 },
  { x: 60, y: 62, s: 0.8, d: 0.2 },
  { x: 52, y: 84, s: 1.1, d: 1.6 },
  { x: 45, y: 70, s: 0.7, d: 0.6 },
  { x: 57, y: 76, s: 1.3, d: 1.0 },
]

export default function Lamp({ isOn, onToggle, showHint }) {
  const reduce = useReducedMotion()
  const [pullY, setPullY] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startY = useRef(0)
  const draggingRef = useRef(false)
  const pulled = useRef(false)
  const didDragToggle = useRef(false)

  const animatePull = useCallback(() => {
    if (reduce) {
      onToggle()
      return
    }
    setPullY(26)
    window.setTimeout(() => setPullY(0), 220)
    window.setTimeout(() => onToggle(), 100)
  }, [onToggle, reduce])

  function onPointerDown(event) {
    // Do not preventDefault here — it blocks the click event in many browsers.
    event.currentTarget.setPointerCapture(event.pointerId)
    startY.current = event.clientY
    pulled.current = false
    didDragToggle.current = false
    draggingRef.current = true
    setDragging(true)
  }

  function onPointerMove(event) {
    if (!draggingRef.current) return
    const dy = Math.max(0, Math.min(40, event.clientY - startY.current))
    setPullY(dy)
    if (dy > 18) pulled.current = true
  }

  function onPointerUp() {
    if (!draggingRef.current) return
    draggingRef.current = false
    setDragging(false)
    if (pulled.current) {
      didDragToggle.current = true
      onToggle()
      setPullY(0)
      return
    }
    // Tap / short press: spring the cord and toggle
    setPullY(0)
    animatePull()
    didDragToggle.current = true
  }

  function onClick() {
    // Handled in pointerup so we don't double-toggle
    if (didDragToggle.current) {
      didDragToggle.current = false
    }
  }

  function onKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      animatePull()
    }
  }

  return (
    <div className="lamp-stage relative mx-auto flex h-full min-h-[320px] w-full max-w-[320px] flex-col items-center justify-end md:min-h-[520px] md:max-w-[380px]">
      <motion.div
        className="pointer-events-none absolute inset-x-[-20%] bottom-0 h-[55%] rounded-[50%] blur-2xl"
        initial={false}
        animate={{
          opacity: isOn ? 1 : 0,
          background: isOn
            ? 'radial-gradient(ellipse at 50% 20%, rgba(255,170,70,0.45), rgba(255,120,30,0.12) 45%, transparent 70%)'
            : 'transparent',
        }}
        transition={{ duration: isOn ? 0.6 : 0.4, ease: 'easeOut' }}
      />

      {/* Positioning context = exact SVG box so the cord hit target lines up */}
      <div className="relative z-[2] w-full">
        <svg
          viewBox="0 0 200 420"
          className="pointer-events-none relative h-auto w-full max-h-[70vh]"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="shadeGlow" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#ffe0a8" stopOpacity={isOn ? 1 : 0} />
              <stop offset="55%" stopColor="#ffb056" stopOpacity={isOn ? 0.95 : 0} />
              <stop offset="100%" stopColor="#c45a12" stopOpacity={isOn ? 0.55 : 0} />
            </radialGradient>
            <linearGradient id="poleGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="45%" stopColor="#3a3a3a" />
              <stop offset="100%" stopColor="#141414" />
            </linearGradient>
            <radialGradient id="coneGrad" cx="50%" cy="0%" r="80%">
              <stop offset="0%" stopColor="rgba(255,190,90,0.55)" />
              <stop offset="40%" stopColor="rgba(255,140,40,0.22)" />
              <stop offset="100%" stopColor="rgba(255,120,30,0)" />
            </radialGradient>
            <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.path
            d="M78 118 L122 118 L175 400 L25 400 Z"
            fill="url(#coneGrad)"
            initial={false}
            animate={{ opacity: isOn ? 1 : 0 }}
            transition={{ duration: isOn ? 0.65 : 0.4 }}
            style={{ filter: 'blur(2px)' }}
          />

          {DUST.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x + 50}
              cy={p.y * 3.6}
              r={p.s}
              fill="rgba(255,240,210,0.85)"
              initial={false}
              animate={
                isOn && !reduce
                  ? { opacity: [0.15, 0.7, 0.2], y: [0, -10, -4] }
                  : { opacity: 0, y: 0 }
              }
              transition={
                isOn && !reduce
                  ? { duration: 3.2 + p.d, repeat: Infinity, ease: 'easeInOut', delay: p.d }
                  : { duration: 0.3 }
              }
            />
          ))}

          <ellipse cx="100" cy="398" rx="48" ry="8" fill="#0e0e0e" />
          <ellipse cx="100" cy="392" rx="42" ry="7" fill="#1c1c1c" stroke="#2a2a2a" strokeWidth="1" />
          <ellipse cx="100" cy="388" rx="18" ry="4" fill="#c9a24a" opacity="0.85" />

          <rect x="97" y="130" width="6" height="258" rx="2" fill="url(#poleGrad)" />
          <rect x="93" y="248" width="14" height="5" rx="2" fill="#c9a24a" />
          <rect x="94" y="249" width="12" height="2" rx="1" fill="#e8c878" opacity="0.7" />

          <rect x="94" y="118" width="12" height="14" rx="2" fill="#222" />
          <motion.ellipse
            cx="100"
            cy="128"
            rx="7"
            ry="8"
            initial={false}
            animate={{
              fill: isOn ? '#ffe9b8' : '#2a2a2a',
              filter: isOn ? 'url(#softGlow)' : undefined,
            }}
            transition={{ duration: 0.35 }}
          />

          <path
            d="M62 70 L138 70 L128 118 L72 118 Z"
            fill={isOn ? 'url(#shadeGlow)' : '#222'}
            stroke={isOn ? '#f0c878' : '#333'}
            strokeWidth="1"
          />
          <path
            d="M66 74 L134 74 L126 112 L74 112 Z"
            fill={isOn ? 'rgba(255,220,160,0.35)' : 'rgba(255,255,255,0.03)'}
          />
          <ellipse cx="100" cy="70" rx="38" ry="5" fill={isOn ? '#e8c090' : '#1a1a1a'} />
          <path
            d="M72 118 Q100 124 128 118"
            fill="none"
            stroke={isOn ? '#ffc878' : '#2e2e2e'}
            strokeWidth="2"
          />

          <line
            x1="118"
            y1="118"
            x2="118"
            y2={168 + pullY}
            stroke="#d4c4a0"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <g
            style={{
              transform: `translateY(${pullY}px)`,
              transition: dragging
                ? 'none'
                : 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <ellipse cx="118" cy="174" rx="5" ry="7" fill="#c9a24a" />
            <ellipse cx="118" cy="172" rx="3.2" ry="2.8" fill="#e8c878" opacity="0.75" />
          </g>
        </svg>

        {/* Cord hit target — mapped to SVG viewBox (200×420) */}
        <button
          type="button"
          aria-label="Toggle lamp"
          aria-pressed={isOn}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="absolute z-20 touch-none rounded-full border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
          style={{
            left: 'calc(118 / 200 * 100%)',
            top: 'calc(110 / 420 * 100%)',
            width: 48,
            height: 'calc(90 / 420 * 100%)',
            transform: 'translateX(-50%)',
            cursor: dragging ? 'grabbing' : 'grab',
          }}
        />
      </div>

      {showHint ? (
        <motion.p
          className="lamp-hint pointer-events-none mt-3 text-center text-xs tracking-[0.22em] text-[#c9a24a]/80 uppercase"
          initial={{ opacity: 0.45 }}
          animate={reduce ? { opacity: 0.7 } : { opacity: [0.35, 0.9, 0.35] }}
          transition={reduce ? {} : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          Pull the cord
        </motion.p>
      ) : null}
    </div>
  )
}
