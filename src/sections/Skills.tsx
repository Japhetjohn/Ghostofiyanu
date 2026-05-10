import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  id: number;
  title: string;
  description: string;
  image: string;
  stat: string;
  statLabel: string;
}

const skills: Skill[] = [
  { id: 1, title: 'WEB3 MARKETING', description: 'Strategic marketing for blockchain and fintech. Token launches, protocol positioning, and growth campaigns that cut through the noise.', image: '/images/skill-marketing.png', stat: '25+', statLabel: 'Campaigns' },
  { id: 2, title: 'COMMUNITY GROWTH', description: 'Building thriving communities from zero. Onboarding flows, engagement loops, and retention strategies that turn lurkers into believers.', image: '/images/skill-community.png', stat: '10+', statLabel: 'Communities' },
  { id: 3, title: 'IRL EVENTS', description: 'Large-scale physical events bridging digital and real-world adoption. 500+ attendees, 200+ onboarded — screens to handshakes.', image: '/images/skill-events.png', stat: '12+', statLabel: 'Events' },
  { id: 4, title: 'KOL MANAGEMENT', description: 'KOL programs that align influencer voices with brand narratives. Vetting, outreach, and campaigns across X and Telegram.', image: '/images/skill-kol.png', stat: '30+', statLabel: 'KOLs' },
  { id: 5, title: 'CONTENT ENGINE', description: 'Hosting and producing live audio content. X Spaces programming, AMA coordination, and serialized content that builds authority.', image: '/images/skill-content.png', stat: '50+', statLabel: 'Spaces' },
  { id: 6, title: 'PARTNERSHIPS', description: 'Alliance building between projects, protocols, and communities. Deal flow, partnership frameworks, and co-marketing initiatives.', image: '/images/skill-partnerships.png', stat: '15+', statLabel: 'Partnerships' },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom-=10%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards staggered entrance with blur-to-focus
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=5%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Stat counter animation
      statsRef.current.forEach((stat, i) => {
        if (!stat) return;
        const target = skills[i].stat;
        const match = target.match(/(\d+)/);
        if (!match) return;
        const numValue = parseInt(match[1], 10);
        const suffix = target.replace(/\d+/, '');
        const obj = { val: 0 };

        gsap.to(obj, {
          val: numValue,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stat,
            start: 'top bottom-=5%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: () => {
            stat.textContent = Math.floor(obj.val) + suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-10"
      style={{ background: '#0A0A0F', padding: '8rem 0' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div ref={headingRef} style={{ opacity: 0, marginBottom: '4rem' }}>
          <div
            className="font-mono uppercase"
            style={{
              fontSize: '0.625rem',
              color: '#C8FF2E',
              letterSpacing: '0.15em',
              marginBottom: '0.75rem',
            }}
          >
            Capabilities
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
            Skills
          </h1>
        </div>

        {/* Skill Grid */}
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <div
              key={skill.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="skill-card"
              style={{
                position: 'relative',
                opacity: 0,
                padding: isMobile ? '1.5rem 0' : '2rem 1.5rem',
                cursor: 'default',
              }}
            >
              {/* Scan line sweep */}
              <div
                className="scan-line"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background:
                    'linear-gradient(90deg, transparent, rgba(200, 255, 46, 0.03), transparent)',
                  pointerEvents: 'none',
                  transition: 'left 0.8s ease',
                  zIndex: 1,
                }}
              />

              {/* Radial glow behind image */}
              <div
                className="skill-glow"
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60%',
                  height: '40%',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(200, 255, 46, 0.06) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  pointerEvents: 'none',
                  opacity: 0,
                  transition: 'opacity 0.5s ease',
                }}
              />

              {/* Image */}
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  zIndex: 2,
                }}
              >
                <img
                  src={skill.image}
                  alt={skill.title}
                  className="skill-image"
                  style={{
                    width: '70%',
                    height: '70%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), filter 0.6s ease',
                  }}
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                {/* Title row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                  }}
                >
                  <h3
                    className="skill-title font-display uppercase"
                    style={{
                      fontSize: isMobile
                        ? '0.875rem'
                        : 'clamp(0.75rem, 1.1vw, 1rem)',
                      lineHeight: 1.1,
                      letterSpacing: '0.02em',
                      color: '#F5F5F0',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {skill.title}
                  </h3>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.625rem',
                      color: '#5A5A65',
                      letterSpacing: '0.05em',
                      flexShrink: 0,
                      marginLeft: '0.75rem',
                    }}
                  >
                    {String(skill.id).padStart(2, '0')}
                  </span>
                </div>

                {/* Description */}
                <p
                  className="font-mono"
                  style={{
                    fontSize: '0.75rem',
                    lineHeight: 1.6,
                    color: '#8A8A95',
                    marginBottom: '1.25rem',
                    maxWidth: '340px',
                  }}
                >
                  {skill.description}
                </p>

                {/* Stat + line */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.4rem',
                    }}
                  >
                    <span
                      ref={(el) => { statsRef.current[i] = el; }}
                      className="font-display"
                      style={{
                        fontSize: '1.75rem',
                        color: '#C8FF2E',
                        lineHeight: 1,
                      }}
                    >
                      {skill.stat}
                    </span>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '0.5625rem',
                        color: '#5A5A65',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {skill.statLabel}
                    </span>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: '1px',
                      background:
                        'linear-gradient(90deg, rgba(90, 90, 101, 0.3), transparent)',
                    }}
                  />
                </div>
              </div>

              {/* Corner brackets on hover */}
              <div
                className="corner-brackets"
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  zIndex: 3,
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '12px',
                    height: '12px',
                    borderTop: '1px solid rgba(200, 255, 46, 0.35)',
                    borderLeft: '1px solid rgba(200, 255, 46, 0.35)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '12px',
                    height: '12px',
                    borderTop: '1px solid rgba(200, 255, 46, 0.35)',
                    borderRight: '1px solid rgba(200, 255, 46, 0.35)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '12px',
                    height: '12px',
                    borderBottom: '1px solid rgba(200, 255, 46, 0.35)',
                    borderLeft: '1px solid rgba(200, 255, 46, 0.35)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '12px',
                    height: '12px',
                    borderBottom: '1px solid rgba(200, 255, 46, 0.35)',
                    borderRight: '1px solid rgba(200, 255, 46, 0.35)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }
        @media (min-width: 1200px) {
          .skills-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .skill-card:hover .scan-line {
          left: 100% !important;
        }
        .skill-card:hover .skill-glow {
          opacity: 1 !important;
        }
        .skill-card:hover .skill-image {
          transform: scale(1.06) !important;
          filter: drop-shadow(0 20px 40px rgba(200, 255, 46, 0.12)) !important;
        }
        .skill-card:hover .skill-title {
          color: #C8FF2E !important;
        }
        .skill-card:hover .corner-brackets {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
