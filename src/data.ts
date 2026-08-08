export type Project = {
  title: string
  description: string
  tags: string[]
  link: string
  accent: string
}

export type ExperienceItem = {
  role: string
  company: string
  period: string
  summary: string
}

export type SkillGroup = {
  category: string
  items: string[]
}

export const profile = {
  name: 'Dana M. Fields',
  initials: 'DMF',
  role: 'Full-Stack Engineer & Product Designer',
  tagline:
    'I design and build thoughtful digital products — from pixel to production.',
  location: 'San Francisco, CA',
  email: 'hello@danafields.dev',
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
    { label: 'Dribbble', href: 'https://dribbble.com/' },
  ],
  about:
    "I'm a full-stack engineer and designer with a decade of experience shipping polished web applications. I care deeply about craft: fast interfaces, accessible components, and code that other engineers enjoy reading. When I'm not building, you'll find me sketching UI concepts or contributing to open source.",
}

export const stats = [
  { value: '10+', label: 'Years shipping' },
  { value: '40+', label: 'Products launched' },
  { value: '1.2M', label: 'Users reached' },
]

export const skills: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'PostgreSQL', 'GraphQL', 'Redis', 'Netlify Functions'],
  },
  {
    category: 'Design',
    items: ['Figma', 'Design Systems', 'Prototyping', 'Accessibility'],
  },
]

export const projects: Project[] = [
  {
    title: 'Aurora Analytics',
    description:
      'A real-time analytics dashboard handling millions of events per day with sub-second query latency.',
    tags: ['React', 'GraphQL', 'PostgreSQL'],
    link: '#',
    accent: '#7c3aed',
  },
  {
    title: 'Drift Design System',
    description:
      'An open-source component library and design tokens pipeline adopted across a dozen product teams.',
    tags: ['TypeScript', 'Storybook', 'a11y'],
    link: '#',
    accent: '#22d3ee',
  },
  {
    title: 'Trailhead',
    description:
      'A trip-planning app with offline-first maps and collaborative itineraries for 200k+ travelers.',
    tags: ['React Native', 'Node.js', 'Redis'],
    link: '#',
    accent: '#f472b6',
  },
  {
    title: 'Lumen CMS',
    description:
      'A headless content platform with a block-based editor and instant preview deployments.',
    tags: ['Vite', 'Netlify', 'Serverless'],
    link: '#',
    accent: '#34d399',
  },
]

export const experience: ExperienceItem[] = [
  {
    role: 'Principal Engineer',
    company: 'Northwind Labs',
    period: '2021 — Present',
    summary:
      'Lead architecture for the core product platform and mentor a team of eight engineers.',
  },
  {
    role: 'Senior Product Engineer',
    company: 'Bright Studio',
    period: '2017 — 2021',
    summary:
      'Owned the design system and front-end architecture powering four flagship applications.',
  },
  {
    role: 'Software Engineer',
    company: 'Cobalt & Co.',
    period: '2014 — 2017',
    summary:
      'Built customer-facing features and internal tooling for a fast-growing fintech startup.',
  },
]
