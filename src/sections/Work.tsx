import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'SEND',
    role: 'Ex-Contributor & Affiliate',
    description:
      'Contributed to Send fintech platform as an affiliate and community builder. Hosted large-scale events that drew over 500+ attendees and built a strong referral network driving user adoption across Nigeria.',
    image: '/images/proj-send.png',
    metrics: ['500+ Attendees', '209+ Referrals', 'Ex-Contributor'],
    color: '#C8FF2E',
  },
  {
    id: 2,
    title: 'HOSTFINANCE',
    role: 'Community Manager / Growth Lead',
    description:
      'Led community growth initiatives for HostFinance. Built and managed referral programs, engagement campaigns, and onboarding flows that converted users into active community members and ambassadors.',
    image: null,
    metrics: ['200+ Referrals', 'Growth Lead', 'Community Manager'],
    color: '#C8FF2E',
  },
  {
    id: 3,
    title: 'ORBIT — ILORIN INNOVATION HUB',
    role: 'Co-Lead',
    description:
      'Co-led the ORBIT program at Ilorin Innovation Hub, driving Web3 and Web2 awareness. Organized campus onboarding initiatives reaching over 1,000 students and built strategic partnerships with local innovators.',
    image: '/images/proj-orbit.png',
    metrics: ['1000+ Students', 'Co-Lead', 'Campus Onboarding'],
    color: '#C8FF2E',
  },
  {
    id: 4,
    title: 'ACADEMIA APP',
    role: 'Community Manager',
    description:
      'Managed community operations for Academia App, engaging students and learners. Organized study groups, Q&A sessions, and educational campaigns that improved retention and user engagement within university circles.',
    image: '/images/proj-academia.png',
    metrics: ['Community Manager', 'Education', 'Retention'],
    color: '#C8FF2E',
  },
  {
    id: 5,
    title: 'MERCHANT ONBOARDING',
    role: 'Crypto Adoption Lead',
    description:
      'Onboarded 10+ local businesses including clothing stores, restaurants, and salons to accept crypto payments. Bridged the gap between traditional commerce and Web3 finance through hands-on IRL engagement and education.',
    image: '/images/proj-irl.png',
    metrics: ['10+ Businesses', 'IRL Onboarding', 'Crypto Payments'],
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

  const totalProjects = projects.length;

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
                  {project.image ? (
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
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        maxWidth: '380px',
                        aspectRatio: '1 / 1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        background:
                          'linear-gradient(135deg, rgba(200, 255, 46, 0.03) 0%, rgba(28, 28, 34, 0.6) 100%)',
                        border: '1px solid rgba(200, 255, 46, 0.08)',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >
                      <span
                        className="font-display"
                        style={{
                          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                          color: 'rgba(200, 255, 46, 0.15)',
                          letterSpacing: '-0.05em',
                          lineHeight: 1,
                          fontWeight: 800,
                        }}
                      >
                        HF
                      </span>
                    </div>
                  )}
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
                    0{project.id} / 0{totalProjects}
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
