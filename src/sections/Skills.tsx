import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    title: 'Web3 Marketing',
    desc: 'Strategic marketing for blockchain and fintech. Token launches, protocol positioning, and growth campaigns that cut through the noise.',
    stat: '25+',
    statLabel: 'Campaigns',
  },
  {
    title: 'Community Growth',
    desc: 'Building thriving communities from zero. Onboarding flows, engagement loops, and retention strategies that turn lurkers into believers.',
    stat: '10+',
    statLabel: 'Communities',
  },
  {
    title: 'IRL Events',
    desc: 'Large-scale physical events bridging digital and real-world adoption. Screens to handshakes.',
    stat: '12+',
    statLabel: 'Events',
  },
  {
    title: 'KOL Management',
    desc: 'KOL programs that align influencer voices with brand narratives. Vetting, outreach, and campaigns across X and Telegram.',
    stat: '30+',
    statLabel: 'KOLs',
  },
  {
    title: 'Content Engine',
    desc: 'Hosting and producing live audio content. X Spaces programming, AMA coordination, and serialized content that builds authority.',
    stat: '50+',
    statLabel: 'Spaces',
  },
  {
    title: 'Partnerships',
    desc: 'Alliance building between projects, protocols, and communities. Deal flow, partnership frameworks, and co-marketing initiatives.',
    stat: '15+',
    statLabel: 'Partnerships',
  },
];

const getCardOrigin = (i: number) => {
  const pattern = i % 4;
  if (pattern === 0) return { x: -80, y: 0 };   // from left
  if (pattern === 1) return { x: 80, y: 0 };    // from right
  if (pattern === 2) return { x: 0, y: 80 };    // from bottom
  return { x: 0, y: -80 };                      // from top
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom-=10%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const origin = getCardOrigin(i);
        gsap.fromTo(
          card,
          { opacity: 0, x: origin.x, y: origin.y },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: (i % 3) * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=5%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-10"
      style={{ background: '#0A0A0F', padding: 'clamp(4rem, 8vw, 8rem) 0' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px', padding: '0 1.5rem' }}>
        <div ref={headingRef} style={{ opacity: 0, marginBottom: 'clamp(2rem, 4vw, 4rem)' }}>
          <div
            className="font-mono uppercase"
            style={{ fontSize: '0.625rem', color: '#C8FF2E', letterSpacing: '0.15em', marginBottom: '0.75rem' }}
          >
            Capabilities
          </div>
          <h1
            className="font-display uppercase"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 0.9, letterSpacing: '-0.02em', color: '#F5F5F0' }}
          >
            Skills
          </h1>
        </div>

        <div className="skills-grid">
          {skills.map((skill, i) => (
            <div
              key={skill.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="skill-card"
              style={{
                opacity: 0,
                padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                background: 'rgba(28, 28, 34, 0.3)',
                border: '1px solid rgba(90, 90, 101, 0.15)',
                borderRadius: '8px',
                transition: 'border-color 0.3s ease, background 0.3s ease',
                cursor: 'default',
              }}
            >
              <div className="flex items-start justify-between gap-3" style={{ marginBottom: '0.75rem' }}>
                <h3
                  className="font-display uppercase"
                  style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)', lineHeight: 1.2, letterSpacing: '0.02em', color: '#F5F5F0' }}
                >
                  {skill.title}
                </h3>
                <div className="flex items-baseline gap-1 flex-shrink-0">
                  <span className="font-display" style={{ fontSize: '1.25rem', color: '#C8FF2E', lineHeight: 1 }}>
                    {skill.stat}
                  </span>
                  <span className="font-mono" style={{ fontSize: '0.5625rem', color: '#5A5A65', letterSpacing: '0.1em' }}>
                    {skill.statLabel}
                  </span>
                </div>
              </div>

              <p className="font-mono" style={{ fontSize: '0.75rem', lineHeight: 1.6, color: '#8A8A95' }}>
                {skill.desc}
              </p>

              <div
                style={{
                  marginTop: '1rem',
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(200, 255, 46, 0.15), transparent)',
                  transition: 'background 0.3s ease',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }
        @media (min-width: 1024px) {
          .skills-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.25rem;
          }
        }
        .skill-card:hover {
          border-color: rgba(200, 255, 46, 0.25) !important;
          background: rgba(28, 28, 34, 0.5) !important;
        }
        .skill-card:hover h3 {
          color: #C8FF2E !important;
        }
        .skill-card:hover div[style*="gradient"] {
          background: linear-gradient(90deg, rgba(200, 255, 46, 0.4), transparent) !important;
        }
      `}</style>
    </section>
  );
}
