
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const scenes = [
  {
    image: '/images/figure-1.jpg',
    title: 'The complete facility',
    description: 'Explore the waste-to-energy plant from the outside.',
  },
  {
    image: '/images/figure-2.jpg',
    title: 'Behind the outer walls',
    description: 'Discover the equipment hidden inside the facility.',
  },
  {
    image: '/images/figure-3.jpg',
    title: 'Inside the plant',
    description: 'Take a closer look at the enclosed combustion system.',
  },
  {
    image: '/images/figure-4.jpg',
    title: 'The combustion process',
    description: 'Reveal the furnace, burning waste and heat-transfer surfaces.',
  },
  {
    image: '/images/figure-5.jpg',
    title: 'Understanding the physics',
    description: 'Follow combustion, heat transfer and flue-gas pathways.',
  },
]

function App() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray('.scene-image')
      const captions = gsap.utils.toArray('.scene-caption')
      const progress = document.querySelector('.progress-fill')

      // Show only the first scene initially.
      gsap.set(images, { autoAlpha: 0 })
      gsap.set(captions, { autoAlpha: 0, y: 20 })
      gsap.set(images[0], { autoAlpha: 1 })
      gsap.set(captions[0], { autoAlpha: 1, y: 0 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
          pin: stageRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(progress, {
              scaleX: self.progress,
            })
          },
        },
      })

      // Each transition occupies one quarter of the scroll.
      for (let i = 1; i < images.length; i++) {
        const start = i - 1

        timeline.to(captions[i - 1], {
          autoAlpha: 0,
          y: -15,
          duration: 0.2,
        }, start)

        timeline.fromTo(images[i], {
          autoAlpha: 0,
          scale: i === 2 ? 1.12 : 1.04,
        }, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.8,
          ease: 'none',
        }, start + 0.1)

        timeline.to(images[i - 1], {
          autoAlpha: 0,
          duration: 0.8,
        }, start + 0.1)

        timeline.to(captions[i], {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
        }, start + 0.6)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="site">
      <header className="navbar">
        <div className="logo">
           Dig<span>Burn</span>
        </div>
      </header>
      <section className="scroll-section" ref={sectionRef}>
        <div className="visual-stage" ref={stageRef}>
          <div className="scene-container">
            {scenes.map((scene, index) => (
              <div className="scene-image" key={index}>
                <img src={scene.image} alt={scene.title} />
              </div>
            ))}
          </div>

          <div className="text-overlay">
            <p className="eyebrow">
              PHYSICS + DATA + INTELLIGENCE
            </p>
            <h1>Smarter waste-to-energy operations.</h1>

            <div className="caption-container">
              {scenes.map((scene, index) => (
                <div className="scene-caption" key={index}>
                  <h2>{scene.title}</h2>
                  <p>{scene.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-hint">SCROLL TO EXPLORE ↓</div>
          <div className="progress-track">
            <div className="progress-fill" />
          </div>
        </div>
      </section>

      <section className="closing-section">
        <p className="eyebrow">THE DIGBURN CONCEPT</p>
        <h2>From plant measurements to engineering insight.</h2>
        <p>
          Combining industrial data, physical modelling and
          intelligent analysis to better understand combustion,
          heat transfer, fouling and corrosion.
        </p>
        <span className="demo-note">
          Conceptual demonstration — not a live simulation.
        </span>
      </section>
    </main>
  )
}

export default App
