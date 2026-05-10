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
  const leftRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const slicesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Entrance
  useEffect(() => {
    gsap.fromTo(headingRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom-=10%', toggleActions: 'play none none reverse' },
    });
  }, []);

  // Glitch slice transition
  const transitionTo = (idx: number) => {
    if (idx === active || isTransitioning) return;
    setPrev(active);
    setIsTransitioning(true);
    setActive(idx);

    const sliceCount = 8;
    const leftEl = leftRef.current;
    if (!leftEl) { setIsTransitioning(false); return; }

    // Create slices of current image that slide away
    const rect = leftEl.getBoundingClientRect();
    const sliceH = rect.height / sliceCount;

    const tl = gsap.timeline({
      onComplete: () => {
        // Clear slices
        slicesRef.current.forEach(s => s?.remove());
        slicesRef.current = [];
        setIsTransitioning(false);
      }
    });

    // Animate out old image with slice effect
    for (let i = 0; i < sliceCount; i++) {
      const slice = document.createElement('div');
      slice.style.cssText = `
        position: absolute;
        left: 0;
        width: 100%;
        height: ${sliceH + 1}px;
        top: ${i * sliceH}px;
        background-image: url(${skills[prev].image});
        background-size: ${rect.width}px ${rect.height}px;
        background-position: 0 -${i * sliceH}px;
        z-index: 10;
        pointer-events: none;
      `;
      leftEl.appendChild(slice);
      slicesRef.current.push(slice);

      const dir = i % 2 === 0 ? -1 : 1;
      tl.to(slice, {
        x: dir * (60 + Math.random() * 40),
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      }, i * 0.02);
    }
  };

  // Auto-cycle
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        setPrev(active);
        setActive((a) => (a + 1) % skills.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [active, isTransitioning]);

  return (
    <section id="skills" ref={sectionRef} className="relative z-10"
      style={{ background: '#0A0A0F', padding: '8rem 0' }}>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div ref={headingRef} style={{ opacity: 0, marginBottom: '4rem' }}>
          <div className="font-mono uppercase" style={{ fontSize: '0.625rem', color: '#C8FF2E', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
            Capabilities
          </div>
          <h1 className="font-display uppercase" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.9, letterSpacing: '-0.02em', color: '#F5F5F0' }}>
            Skills
          </h1>
        </div>

        {/* Split layout */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '1.5rem' : '0',
          minHeight: isMobile ? 'auto' : '500px',
        }}>
          {/* LEFT — Image panel */}
          <div style={{
            width: isMobile ? '100%' : '55%',
            position: 'relative',
            overflow: 'hidden',
            background: '#0A0A0F',
            aspectRatio: isMobile ? '16/10' : 'auto',
            minHeight: isMobile ? '200px' : '500px',
          }} ref={leftRef}>
            {/* Glow */}
            <div style={{
              position: 'absolute',
              inset: '15%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(200, 255, 46, 0.1) 0%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />
            {/* Image */}
            <img
              key={skills[active].id}
              src={skills[active].image}
              alt={skills[active].title}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                zIndex: 2,
                padding: '2rem',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
              }}
              loading="lazy"
            />
            {/* Scanline overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(10,10,15,0.08) 2px, rgba(10,10,15,0.08) 4px)',
              pointerEvents: 'none',
              zIndex: 3,
            }} />
            {/* Stat overlay */}
            <div style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '1.5rem',
              zIndex: 4,
            }}>
              <div className="font-display" style={{ fontSize: '2.5rem', color: '#C8FF2E', lineHeight: 1 }}>
                {skills[active].stat}
              </div>
              <div className="font-mono" style={{ fontSize: '0.5625rem', color: '#5A5A65', letterSpacing: '0.1em' }}>
                {skills[active].statLabel}
              </div>
            </div>
          </div>

          {/* RIGHT — Skill list */}
          <div style={{
            width: isMobile ? '100%' : '45%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: isMobile ? '0' : '3rem',
            gap: '0',
          }}>
            {skills.map((skill, i) => {
              const isActive = i === active;
              return (
                <div
                  key={skill.id}
                  onClick={() => transitionTo(i)}
                  onMouseEnter={() => transitionTo(i)}
                  className="cursor-pointer"
                  style={{
                    padding: isMobile ? '0.875rem 0' : '1.25rem 0',
                    borderBottom: '1px solid rgba(90, 90, 101, 0.12)',
                    transition: 'all 0.4s ease',
                    position: 'relative',
                  }}
                >
                  {/* Hover bg fill */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: isActive ? 'rgba(200, 255, 46, 0.03)' : 'transparent',
                    transition: 'background 0.4s ease',
                    borderRadius: '2px',
                  }} />

                  <div style={{ position: 'relative', zIndex: 2 }}>
                    {/* Title row */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-display uppercase" style={{
                        fontSize: isMobile ? '0.875rem' : 'clamp(0.875rem, 1.5vw, 1.25rem)',
                        lineHeight: 1.1,
                        letterSpacing: '0.02em',
                        color: isActive ? '#C8FF2E' : '#5A5A65',
                        transition: 'color 0.4s ease',
                      }}>
                        {skill.title}
                      </h3>
                      <span className="font-mono" style={{
                        fontSize: '0.625rem',
                        color: isActive ? '#C8FF2E' : '#5A5A65',
                        opacity: isActive ? 1 : 0,
                        transition: 'all 0.4s ease',
                        letterSpacing: '0.05em',
                      }}>
                        {String(skill.id).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Description — expands when active */}
                    <div style={{
                      maxHeight: isActive ? '80px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}>
                      <p className="font-mono" style={{
                        fontSize: '0.75rem',
                        lineHeight: 1.6,
                        color: '#8A8A95',
                        marginTop: '0.75rem',
                        maxWidth: '380px',
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 0.4s ease 0.1s',
                      }}>
                        {skill.description}
                      </p>
                    </div>

                    {/* Active indicator bar */}
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      height: '1px',
                      width: isActive ? '100%' : '0%',
                      background: 'linear-gradient(90deg, #C8FF2E, transparent)',
                      transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile image strip */}
        {isMobile && (
          <div style={{
            display: 'flex',
            gap: '6px',
            marginTop: '1.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
          }}>
            {skills.map((skill, i) => (
              <button
                key={i}
                onClick={() => transitionTo(i)}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 0,
                  border: 'none',
                  background: 'transparent',
                  flexShrink: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  padding: '6px',
                }}
              >
                <img src={skill.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: i === active ? 'none' : 'grayscale(0.5) brightness(0.6)' }} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
