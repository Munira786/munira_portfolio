import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import { About, Skills } from './sections/About'
import { Contact, Footer } from './sections/Contact'
import { Education, Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Nav } from './sections/Nav'
import { Work } from './sections/Work'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-paper" style={{ scaleX }} />
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#work"
        className="sr-only z-[80] bg-paper px-4 py-2 font-mono text-xs uppercase text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to work
      </a>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
