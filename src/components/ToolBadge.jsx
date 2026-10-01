const dim = {
  lg: 'h-14 w-14 rounded-[18px]',
  md: 'h-11 w-11 rounded-2xl',
}

export default function ToolBadge({ id, className = '', size = 'md' }) {
  const Icon = icons[id]
  return (
    <span
      className={`grid place-items-center shadow-[0_12px_28px_rgba(0,0,0,0.35)] ${dim[size]} ${className}`}
      style={{ background: backgrounds[id] }}
    >
      <Icon />
    </span>
  )
}

const backgrounds = {
  cursor: '#111111',
  claude: '#cc785c',
  github: '#24292f',
  gemini: '#1c1c1c',
  linkedin: '#0a66c2',
  chatgpt: '#10a37f',
}

function CursorIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 4.5 18.2 12.2l-4.6.7 2.9 5.6-2.2 1.1-2.9-5.6-3.2 2.6V4.5Z" fill="white" />
    </svg>
  )
}

function ClaudeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.2 13.4 8l5.6-2.2-2.6 5.4 6.2 1.2-6.2 1.4 2.6 5.4-5.6-2.4L12 22l-1.4-5.8-5.6 2.4 2.6-5.4L1.4 12.4l6.2-1.2L5 5.8 10.6 8 12 2.2Z"
        fill="white"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="white"
        d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.9 9.6.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.4 9.4 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.2 10.2 0 0 0 22 12.2C22 6.6 17.5 2 12 2Z"
      />
    </svg>
  )
}

function GeminiIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#8ab4f8"
        d="M12 1.8c.4 4.2 1.6 6.6 4.8 8.2-3.2 1.4-4.4 3.8-4.8 8.2-.4-4.4-1.6-6.8-4.8-8.2 3.2-1.6 4.4-4 4.8-8.2Z"
      />
      <path fill="#f0c14d" d="M12 8.2c.15 1.5.6 2.4 1.8 3-1.2.5-1.65 1.4-1.8 3-.15-1.6-.6-2.5-1.8-3 1.2-.6 1.65-1.5 1.8-3Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="white"
        d="M4.7 9.2H8V20H4.7V9.2ZM6.3 3.6A2 2 0 1 1 6.3 7.6 2 2 0 0 1 6.3 3.6ZM10.2 9.2h3.1v1.5h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V20H17v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20h-3.1V9.2Z"
      />
    </svg>
  )
}

function ChatGptIcon() {
  const petals = [
    [12, 6.1],
    [17.1, 9.1],
    [17.1, 14.9],
    [12, 17.9],
    [6.9, 14.9],
    [6.9, 9.1],
  ]
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      {petals.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.15" fill="none" stroke="white" strokeWidth="1.35" />
      ))}
    </svg>
  )
}

const icons = {
  cursor: CursorIcon,
  claude: ClaudeIcon,
  github: GitHubIcon,
  gemini: GeminiIcon,
  linkedin: LinkedInIcon,
  chatgpt: ChatGptIcon,
}
