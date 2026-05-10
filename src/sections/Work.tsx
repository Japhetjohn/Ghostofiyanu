import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'SEND FINTECH',
    role: 'Marketing & Community Manager',
    description:
      'Led community engagement campaigns and onboarding strategies for a fintech payments platform. Hosted multiple X Spaces and online events to educate and onboard new users. Drove community conversations that strengthened brand trust and adoption. Built ambassador initiatives and collaborated with influencers to increase platform awareness.',
    image: '/images/proj-send.png',
    metrics: ['15+ X Spaces', '10K+ Engagement', 'Brand Trust'],
    color: '#C8FF2E',
  },
  {
    id: 2,
    title: 'ACADEMIA.EDU',
    role: 'Community Manager & Contributor',
    description:
      'Managed an active learning-focused crypto community, engaging with students and enthusiasts. Organized Q&A sessions, AMAs, and study groups to improve user retention. Supported growth campaigns that improved adoption within university circles.',
    image: '/images/proj-academia.png',
    metrics: ['500+ Students', '40+ Sessions', 'Retention Up'],
    color: '#C8FF2E',
  },
  {
    id: 3,
    title: 'ORBIT ILORIN',
    role: 'Core Lead — ORBIT Program',
    description:
      'Led the ORBIT internship program at Ilorin Innovation Hub, increasing awareness of Web3 and Web2 solutions. Bridged the gap between technology and community through strategic partnerships with IHS Towers, CcHub, and Future Africa.',
    image: '/images/proj-orbit.png',
    metrics: ['50+ Interns', '4 Partners', 'Innovation Hub'],
    color: '#C8FF2E',
  },
  {
    id: 4,
    title: 'IRL ACTIVATIONS',
    role: 'Event Organizer & Onboarding Lead',
    description:
      'Organized 2 large-scale in-person events with 500+ attendees each to educate and onboard users into Web3 and fintech platforms. Successfully onboarded 200+ individuals to a fintech app through IRL activations and physical engagement.',
    image: '/images/proj-irl.png',
    metrics: ['1000+ Attendees', '200+ Onboarded', '2 Mega Events'],
    color: '#C8FF2E',
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Heading entrance
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom-=10%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Each card entrance — alternating left/right
    const triggers: ScrollTrigger[] = [];
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const isEven = index % 2 === 0;
      const xOffset = isEven ? -60 : 60;

      const tween = gsap.fromTo(
        card,
        { opacity: 0, x: xOffset, y: 30 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=5%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative z-10"
      style={{
        background: '#0A0A0F',
        padding: '8rem 0',
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: '1200px',
          padding: '0 1.5rem',
        }}
      >
        {/* Header */}
        <div ref={headingRef} style={{ opacity: 0, marginBottom: '6rem' }}>
          <div
            className="font-mono uppercase tracking-widest mb-3"
            style={{ fontSize: '0.625rem', color: '#C8FF2E', letterSpacing: '0.15em' }}
          >
            Selected Projects
          </div>
          <h1
            className="font-display uppercase"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: '#F5F5F0',
            }}
          >
            The Work
          </h1>
        </div>

        {/* Project cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="project-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: isEven ? '1fr 1fr' : '1fr 1fr',
                  gap: '3rem',
                  alignItems: 'center',
                  opacity: 0,
                }}
              >
                {/* Image side */}
                <div
                  style={{
                    order: isEven ? 0 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Glow behind image */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '70%',
                      height: '70%',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${project.color}15 0%, transparent 70%)`,
                      filter: 'blur(40px)',
                      pointerEvents: 'none',
                    }}
                  />
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      maxWidth: '380px',
                      height: 'auto',
                      objectFit: 'contain',
                      position: 'relative',
                      zIndex: 2,
                      filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
                    }}
                    loading="lazy"
                  />
                </div>

                {/* Content side */}
                <div
                  style={{
                    order: isEven ? 1 : 0,
                    padding: '1rem 0',
                  }}
                >
                  {/* Index number */}
                  <div
                    className="font-mono"
                    style={{
                      fontSize: '0.75rem',
                      color: '#C8FF2E',
                      marginBottom: '1rem',
                      letterSpacing: '0.1em',
                    }}
                  >
                    0{project.id} / 04
                  </div>

                  {/* Title */}
                  <h2
                    className="font-display uppercase"
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                      lineHeight: 1.1,
                      color: '#F5F5F0',
                      marginBottom: '0.5rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {project.title}
                  </h2>

                  {/* Role */}
                  <div
                    className="font-mono"
                    style={{
                      fontSize: '0.75rem',
                      color: '#C8FF2E',
                      marginBottom: '1.5rem',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {project.role}
                  </div>

                  {/* Description */}
                  <p
                    className="font-mono"
                    style={{
                      fontSize: '0.8125rem',
                      lineHeight: 1.7,
                      color: '#8A8A95',
                      marginBottom: '2rem',
                      maxWidth: '440px',
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {project.metrics.map((metric, i) => (
                      <div
                        key={i}
                        className="font-mono"
                        style={{
                          fontSize: '0.6875rem',
                          color: '#F5F5F0',
                          padding: '0.5rem 1rem',
                          border: '1px solid rgba(200, 255, 46, 0.2)',
                          borderRadius: '4px',
                          background: 'rgba(200, 255, 46, 0.04)',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile override */}
      <style>{`
        @media (max-width: 767px) {
          .project-card {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .project-card > div:first-child {
            order: 0 !important;
          }
          .project-card > div:last-child {
            order: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
