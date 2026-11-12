/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — edit this file to update the portfolio content.
 * ─────────────────────────────────────────────────────────────
 *
 *  Anything left as an empty string ('') is hidden on the live site.
 *  While running `npm run dev` the empty fields show a dashed
 *  "configure me" hint instead, so you can see what's missing.
 */

export const site = {
  name: 'Munira Bhabarawala',
  firstName: 'Munira',
  initials: 'MB',
  title: 'Software Engineer | React Developer',
  designation: 'Software Engineer / React Developer',

  links: {
    github: 'https://github.com/Munira786',
    linkedin: 'https://www.linkedin.com/in/munira-bhabarawala',
    /** No "mailto:" prefix */
    email: 'bhabarawalamunira@gmail.com',
    /** PDF lives in /public */
    resume: '/Munira_Bhabarawala_Resume.pdf',
  },
}

export type ProjectVisual = 'workflow' | 'audit' | 'pending'

export interface Project {
  id: string
  name: string
  /** One line shown under the name */
  tagline: string
  description: string
  highlights: string[]
  stack: string[]
  repo?: string
  demo?: string
  /** Short context line, e.g. "Hackathon MVP · team of 2" */
  context?: string
  /** Meta rows shown beside the preview */
  domain?: string
  kind?: string
  /** Vertical side label, e.g. "Flagship" → "Project 01 — Flagship" */
  label?: string
  visual: ProjectVisual
  /** false = details not yet documented; rendered as a compact "case study pending" entry */
  documented: boolean
}

export const projects: Project[] = [
  {
    id: 'ai-workflow-builder',
    name: 'AI Workflow Builder',
    tagline: 'Visual, node-based builder for AI pipelines',
    description:
      'An AI-powered visual workflow builder for creating, connecting and executing automated pipelines on a node-based canvas. Pipelines are saved per account and run in background workers, while the editor shows each node move live from pending to running to succeeded or failed.',
    highlights: [
      'Drag-and-drop editor built with React Flow: users construct AI pipelines by connecting nodes on a graph',
      'Reusable BaseNode architecture that cuts code duplication and makes new node types simple to add',
      'Dynamic variable detection in Text nodes: {{variables}} are found with regular expressions and become input handles automatically',
      'FastAPI backend APIs that analyse pipeline structure and validate workflows as Directed Acyclic Graphs (DAGs)',
      'Input, Text, LLM and Output nodes execute; API, Database, Email, Filter and Math nodes extend the component-based node system',
      'LLM node calls Claude through the Anthropic API; runs are queued on Redis/RQ workers and executed in topological order',
      'JWT authentication, PostgreSQL with SQLAlchemy and Alembic, Docker Compose and GitHub Actions CI',
    ],
    stack: [
      'React',
      'JavaScript',
      'React Flow',
      'Zustand',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Redis / RQ',
      'REST APIs',
      'Claude API',
      'Docker',
      'GitHub Actions',
    ],
    repo: 'https://github.com/Munira786/AI_Workflow_Builder',
    domain: 'AI · workflow automation',
    kind: 'Visual node-based pipeline builder',
    label: 'Flagship',
    context: 'Full-stack · React frontend, FastAPI backend, background workers',
    visual: 'workflow',
    documented: true,
  },
  {
    id: 'ayushma-pre-audit',
    name: 'Ayushman Pre-Audit System',
    tagline: 'AI-based claim pre-audit for Ayushman Bharat (PM-JAY)',
    description:
      'An AI-based pre-audit tool that flags potentially invalid or incomplete medical insurance claims under the Ayushman Bharat scheme before they are submitted. It catches the errors that commonly get claims rejected or delayed: wrong package codes, billing above policy limits and missing documents.',
    highlights: [
      'NLP techniques parse and analyse unstructured claim documents, reducing manual review overhead',
      'Extracts medical severity from clinical notes (e.g. % TBSA for burn cases) and maps it to the matching PM-JAY package code',
      'Validates package code, billing limits and required documents',
      'Produces a structured pre-audit report (CLEAN, PARTIAL_APPROVAL or REVIEW_REQUIRED) with reasons',
      'Interactive Streamlit dashboard so reviewers can assess flagged claims efficiently',
      'Ships with test claim sets that exercise each outcome',
    ],
    stack: ['Python', 'Streamlit', 'NLP', 'pandas', 'sentence-transformers'],
    repo: 'https://github.com/Munira786/Ayushma---Preaudit',
    context: 'In active development · began as a hackathon MVP with a teammate',
    domain: 'Healthcare · insurance claims',
    kind: 'Pre-audit assistant',
    label: 'Applied AI',
    visual: 'audit',
    documented: true,
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Frontend Development', items: ['React', 'Next.js', 'JavaScript', 'HTML', 'CSS', 'React Flow'] },
  { group: 'Backend Development', items: ['Python', 'FastAPI', 'Node.js', 'Java', 'REST APIs'] },
  { group: 'Databases', items: ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB'] },
  { group: 'AI / ML', items: ['NLP', 'Scikit-learn', 'Streamlit'] },
  { group: 'Tools & Development', items: ['Git', 'GitHub', 'API Integration', 'Workflow Development'] },
]

export interface Experience {
  org: string
  role: string
  /** Leave '' until you want dates shown */
  period: string
  location?: string
  summary: string
  points: string[]
  stack: string[]
  repo?: string
}

export const experience: Experience[] = [
  {
    org: 'Golden Magic Electronics',
    role: 'Website Development Intern',
    period: 'May 2026 — Jun 2026',
    location: 'Remote · Dubai, UAE',
    summary:
      'Developed and enhanced the business website for an IT infrastructure, CCTV and networking solutions provider, delivering frontend features independently in a remote, client-facing role.',
    points: [
      'Built a seven-page React single-page app (Home, Services, Products, About, Careers, Blog, Contact) with React Router',
      'Focused on responsive design, navigation and user experience, optimising layouts for desktop and mobile',
      'Added glassmorphism design elements and scroll-triggered animations for an enterprise-grade look',
      'Reusable component set (navigation, cards, buttons, footer) and a product listing with cart state in React Context',
      'Per-page SEO (meta tags, Open Graph, Twitter cards, JSON-LD) with a Vite build deployed on Netlify',
    ],
    stack: ['React', 'Vite', 'React Router', 'JavaScript', 'CSS', 'Netlify'],
    repo: 'https://github.com/Munira786/golden-magic-electronics',
  },
  {
    org: 'CSRBOX',
    role: 'Data Analytics Intern',
    period: 'Jun 2024 — Aug 2024',
    location: 'Remote · India',
    summary: 'Prepared and analysed datasets, and turned the findings into visual insights for stakeholders.',
    points: [
      'Cleaned, preprocessed and transformed datasets using Python, SQL and Excel for analysis workflows',
      'Performed exploratory data analysis (EDA) and applied statistical methods to extract business insights',
      'Built interactive data visualisations and dashboards to communicate insights to stakeholders',
      'Attended expert-led masterclasses on real-world data applications and industry analytics practice',
    ],
    stack: ['Python', 'SQL', 'Excel', 'EDA', 'Data visualisation'],
  },
]

/**
 * More roles, programmes or open-source contributions.
 * They appear under "Additional experience" automatically.
 */
export const additionalExperience: Experience[] = [
  {
    org: 'Accenture',
    role: 'Virtual Experience Programme — SDLC',
    period: 'Nov 2023 · 1 month',
    location: 'Remote · India',
    summary: 'A structured programme on the software development life cycle.',
    points: [
      'Evaluated Agile vs. Waterfall methodologies and applied the findings to simulated project-management scenarios',
      'Designed and debugged Python algorithms in a structured SDLC context',
    ],
    stack: ['Python', 'Agile', 'SDLC'],
  },
]

export interface EducationEntry {
  school: string
  affiliation?: string
  degree: string
  field: string
  period: string
  location: string
  grade?: string
}

export const education: EducationEntry[] = [
  {
    school: 'G H Patel College of Engineering & Technology (GCET)',
    affiliation: 'CVM University',
    degree: 'Bachelor of Engineering (B.E.)',
    field: 'Computer Engineering',
    period: 'Aug 2024 — Present',
    location: 'Anand, India',
    grade: 'CGPA 8.59 (through semester 6)',
  },
  {
    school: 'Government Polytechnic College',
    affiliation: 'GTU',
    degree: 'Diploma',
    field: 'Computer Engineering',
    period: 'Oct 2022 — Jun 2024',
    location: 'Dahod, India',
    grade: 'CGPA 8.75',
  },
]
