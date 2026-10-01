export default function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold tracking-[0.22em] text-[#ff8a3d] uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-extrabold tracking-[-0.04em] text-white md:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-relaxed text-white/65 md:text-lg">{text}</p> : null}
    </div>
  )
}
