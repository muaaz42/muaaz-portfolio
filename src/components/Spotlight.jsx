import { useRef } from 'react'

export default function Spotlight({ id, className = '', onMouseMove, onMouseLeave, children }) {
  const ref = useRef(null)

  function move(event) {
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    ref.current.style.setProperty('--my', `${event.clientY - rect.top}px`)
    onMouseMove?.(event)
  }

  return (
    <section id={id} ref={ref} onMouseMove={move} onMouseLeave={onMouseLeave} className={`spotlight ${className}`}>
      {children}
    </section>
  )
}
