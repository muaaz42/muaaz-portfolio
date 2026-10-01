import About from './components/About'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'

export default function App() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0c0705]">
      <div id="scroller" className="h-full overflow-y-auto">
        <div className="bg-[#d5d0cb] md:p-3.5">
          <div id="hero-frame" className="hero-shell frame flex min-h-svh flex-col overflow-hidden md:min-h-[calc(100svh-1.75rem)] md:rounded-[30px]">
            <Navbar />
            <Hero />
          </div>
        </div>
        <main className="frame">
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </div>
    </div>
  )
}
