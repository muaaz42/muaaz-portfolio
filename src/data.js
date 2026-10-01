export const profile = {
  name: 'Muaaz',
  brand: 'Muaaz Portfolio',
  role: 'UI/UX Designer',
  email: 'malangmuaaz5@gmail.com',
  phone: '+9247 2100 798',
  location: 'Available worldwide',
  greeting: 'Hey, I am',
  headline: 'UI/UX Designer',
  summary:
    'I design clear, human interfaces — products people understand quickly and enjoy coming back to.',
}

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export const testimonial = {
  quote:
    'Muaaz has a sharp eye for what people actually do. The product finally feels calm, clear, and easy to trust.',
  name: 'Lena Ortiz',
  role: 'Founder, Harbor',
  initials: 'LO',
}

export const about = {
  eyebrow: 'About',
  title: 'Design that feels obvious in the best way.',
  lede: 'I partner with founders and product teams to turn rough ideas into interfaces with a point of view — researched, systematic, and pleasant to use.',
  points: [
    'Product strategy through polished UI',
    'Design systems teams can actually keep',
    'Prototypes that make decisions faster',
  ],
}

export const tools = [
  { id: 'cursor', name: 'Cursor', detail: 'Where I design, build, and refine the interface.' },
  { id: 'claude', name: 'Claude', detail: 'Writing, critique, and thinking through the flow.' },
  { id: 'github', name: 'GitHub', detail: 'Repos, reviews, and shipping the work.' },
  { id: 'gemini', name: 'Gemini', detail: 'Research and exploring directions quickly.' },
  { id: 'linkedin', name: 'LinkedIn', detail: 'The public home for the work and the people.' },
  { id: 'chatgpt', name: 'ChatGPT', detail: 'Drafts, variants, and fast exploration.' },
]

export const jobs = [
  {
    id: 'atelier',
    dates: '2023 — Now',
    role: 'Senior UI/UX Designer',
    company: 'Atelier North',
    summary: 'Lead designer for early-stage product teams. I own the path from research to a shipped interface.',
    points: [
      'Shaped onboarding, billing, and empty states for a multi-product suite.',
      'Built a token-based system so engineering stopped redrawing the same components.',
      'Facilitated weekly design critiques with founders in the room.',
    ],
  },
  {
    id: 'kindred',
    dates: '2021 — 2023',
    role: 'Product Designer',
    company: 'Kindred Digital',
    summary: 'Designed mobile and web flows for health and education clients.',
    points: [
      'Mapped service blueprints before drawing a single screen.',
      'Paired with engineers during build so spacing and states survived handoff.',
      'Ran moderated tests and folded the findings into the next sprint.',
    ],
  },
  {
    id: 'studio',
    dates: '2019 — 2021',
    role: 'Visual Designer',
    company: 'Independent studio',
    summary: 'Brand and interface work for small teams who needed a public face and a usable product.',
    points: [
      'Delivered identities, marketing sites, and first-version app UI.',
      'Learned to cut scope without making the work feel thin.',
    ],
  },
]

export const projects = [
  {
    id: 'harbor',
    name: 'Harbor',
    year: '2025',
    tag: 'Finance',
    summary: 'A personal finance app that replaces dashboards full of charts with one calm next step.',
    tools: ['Research', 'UI', 'Design system'],
    variant: 'finance',
  },
  {
    id: 'luma',
    name: 'Luma',
    year: '2024',
    tag: 'Wellness',
    summary: 'Booking for independent studios — fewer taps, clearer policies, a schedule people trust.',
    tools: ['Flows', 'Mobile', 'Prototype'],
    variant: 'wellness',
  },
  {
    id: 'fieldnote',
    name: 'Fieldnote',
    year: '2024',
    tag: 'Retail',
    summary: 'An outdoor shop that lets people compare gear without a grid of identical cards.',
    tools: ['Art direction', 'Web', 'Content'],
    variant: 'retail',
  },
]
