import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Stage {
  id: number;
  title: string;
  subtitle: string;
  role: string;
  org: string;
  period: string;
  achievements: string[];
  metrics: { label: string; value: string }[];
}

const stages: Stage[] = [
  {
    id: 1, title: 'COMMUNITY SEED', subtitle: 'Where It All Began',
    role: 'Affiliate & Contributor', org: 'Early Stage', period: '2023 — 2024',
    achievements: ['Started as a contributor and affiliate in Web3 fintech', 'Learned community building from the ground up', 'Built first referral networks and engagement loops', 'Discovered the power of trust-based onboarding'],
    metrics: [{ label: 'Referrals', value: '209+' }, { label: 'Events', value: '500+' }],
  },
  {
    id: 2, title: 'GROWTH ENGINE', subtitle: 'Scaling Communities',
    role: 'Community Manager / Growth Lead', org: 'HostFinance', period: 'Growth Phase',
    achievements: ['Led community growth and retention strategies', 'Built referral systems that drove 200+ active users', 'Developed onboarding flows for fintech products', 'Managed engagement campaigns and ambassador programs'],
    metrics: [{ label: 'Referrals', value: '200+' }, { label: 'Role', value: 'Growth Lead' }],
  },
  {
    id: 3, title: 'EDUCATION FIRST', subtitle: 'Teaching & Onboarding',
    role: 'Co-Lead / Community Manager', org: 'ORBIT / Academia', period: '2023 — 2024',
    achievements: ['Co-led ORBIT program at Ilorin Innovation Hub', 'Managed Academia App learning community', 'Reached 1000+ students through campus onboarding', 'Organized Q&As, AMAs, and educational study groups'],
    metrics: [{ label: 'Students', value: '1000+' }, { label: 'Programs', value: '2' }],
  },
  {
    id: 4, title: 'REAL WORLD IMPACT', subtitle: 'From Digital to Physical',
    role: 'Crypto Adoption Lead', org: 'Various Merchants', period: '2023 — 2024',
    achievements: ['Onboarded 10+ businesses to crypto payments', 'Worked with clothing stores, restaurants, and salons', 'Hosted IRL events connecting product to people', 'Bridged traditional commerce with Web3 finance'],
    metrics: [{ label: 'Businesses', value: '10+' }, { label: 'Sectors', value: '3' }],
  },
  {
    id: 5, title: 'CONTENT ENGINE', subtitle: 'Voice of the Community',
    role: 'X Spaces Host & Content Creator', org: 'Personal Brand', period: '2023 — Present',
    achievements: ['Built @ghostofiyanu presence with engaged followers', 'Hosted regular X Spaces on Web3 trends', 'Created educational content driving fintech adoption', 'Established thought leadership in the African Web3 space'],
    metrics: [{ label: 'Followers', value: '3K+' }, { label: 'Spaces', value: '50+' }],
  },
  {
    id: 6, title: 'STRATEGIC GROWTH', subtitle: 'The Next Level',
    role: 'Web3 Strategist & Partnership Lead', org: 'Freelance', period: '2024 — Present',
    achievements: ['Developed go-to-market strategies for Web3 projects', 'Managed KOL partnerships and influencer campaigns', 'Advised on community structures and growth frameworks', 'Connected projects with strategic collaborators'],
    metrics: [{ label: 'Projects', value: '8+' }, { label: 'KOLs', value: '20+' }],
  },
];

export default function ProofOfWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const wheelRadius = isMobile ? 110 : 240;

  // Heading entrance
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top bottom-=10%', toggleActions: 'play none none reverse' },
      }
    );
  }, []);

  // Wheel rotation on stage change
  useEffect(() => {
    if (!wheelRef.current) return;
    const targetRotation = -activeStage * (360 / stages.length);
    gsap.to(wheelRef.current, {
      rotation: targetRotation,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, [activeStage]);

  // Card transition on stage change
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 20, filter: 'blur(4px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }
    );
  }, [activeStage]);

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 6000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, []);

  const pauseAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const goToStage = (index: number) => {
    pauseAutoPlay();
    setActiveStage(index);
  };

  const prev = () => goToStage((activeStage - 1 + stages.length) % stages.length);
  const next = () => goToStage((activeStage + 1) % stages.length);

  const stage = stages[activeStage];

  return (
    <section
      id="proof-of-work"
      ref={sectionRef}
      className="relative z-10"
      style={{ background: '#0A0A0F', padding: 'clamp(4rem, 10vw, 8rem) 0' }}
      onMouseEnter={pauseAutoPlay}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(200, 255, 46, 0.02) 0%, transparent 60%)',
        }}
      />

      <div className="mx-auto" style={{ maxWidth: '1200px', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div ref={headingRef} style={{ opacity: 0, marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <div
            className="font-mono uppercase"
            style={{ fontSize: '0.625rem', color: '#C8FF2E', letterSpacing: '0.15em', marginBottom: '0.75rem' }}
          >
            The Journey — Proof of Work
          </div>
          <div className="flex items-end justify-between gap-4">
            <h1
              className="font-display uppercase"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 0.9, letterSpacing: '-0.02em', color: '#F5F5F0' }}
            >
              Life Cycle
            </h1>

            {/* Desktop arrows */}
            <div className="hidden md:flex gap-3">
              <ArrowButton onClick={prev} direction="left" />
              <ArrowButton onClick={next} direction="right" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div
          className="flex flex-col md:flex-row items-center"
          style={{ gap: 'clamp(2rem, 4vw, 4rem)' }}
        >
          {/* Stage Card */}
          <div style={{ width: isMobile ? '100%' : '420px', flexShrink: 0 }}>
            <div
              ref={cardRef}
              style={{
                background: 'rgba(28, 28, 34, 0.5)',
                border: '1px solid rgba(200, 255, 46, 0.12)',
                borderRadius: '12px',
                padding: isMobile ? '1.25rem' : '1.75rem',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Top row: subtitle + period */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono" style={{ fontSize: '0.5625rem', color: '#C8FF2E', letterSpacing: '0.1em' }}>
                    {stage.subtitle}
                  </span>
                  <div style={{ width: '20px', height: '1px', background: 'rgba(200, 255, 46, 0.25)' }} />
                </div>
                <span className="font-mono" style={{ fontSize: '0.5625rem', color: '#5A5A65' }}>
                  {stage.period}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-display uppercase"
                style={{
                  fontSize: isMobile ? '1.25rem' : 'clamp(1.25rem, 2vw, 1.75rem)',
                  color: '#F5F5F0',
                  lineHeight: 1.1,
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {stage.title}
              </h3>

              {/* Role */}
              <p className="font-mono mb-3" style={{ fontSize: '0.6875rem', color: '#C8FF2E', letterSpacing: '0.02em', lineHeight: 1.4 }}>
                {stage.role}
                <span style={{ color: '#5A5A65' }}> @ </span>
                <span style={{ color: '#8A8A95' }}>{stage.org}</span>
              </p>

              {/* Metrics */}
              <div className="flex gap-5 mb-4">
                {stage.metrics.map((m, i) => (
                  <div key={i}>
                    <div className="font-display" style={{ fontSize: isMobile ? '1.125rem' : '1.5rem', color: '#F5F5F0', lineHeight: 1 }}>
                      {m.value}
                    </div>
                    <div className="font-mono" style={{ fontSize: '0.5625rem', color: '#5A5A65', letterSpacing: '0.05em', marginTop: '2px' }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div style={{ borderTop: '1px solid rgba(90, 90, 101, 0.2)', paddingTop: '0.75rem' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {stage.achievements.slice(0, isMobile ? 3 : 4).map((achievement, i) => (
                    <li
                      key={i}
                      className="font-mono flex items-start gap-2"
                      style={{ fontSize: isMobile ? '0.6875rem' : '0.75rem', color: '#8A8A95', lineHeight: 1.6, marginBottom: '0.4rem' }}
                    >
                      <span style={{ color: '#C8FF2E', fontSize: '0.5rem', lineHeight: '1.125rem', flexShrink: 0 }}>●</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mobile arrows */}
            <div className="flex md:hidden items-center justify-center gap-4" style={{ marginTop: '1.5rem' }}>
              <ArrowButton onClick={prev} direction="left" />
              <ArrowButton onClick={next} direction="right" />
            </div>
          </div>

          {/* Wheel */}
          <div className="flex-1 flex items-center justify-center" style={{ minHeight: isMobile ? '280px' : '480px' }}>
            <div
              style={{
                position: 'relative',
                width: `${wheelRadius * 2 + (isMobile ? 20 : 80)}px`,
                height: `${wheelRadius * 2 + (isMobile ? 20 : 80)}px`,
              }}
            >
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C8FF2E" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#C8FF2E" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#C8FF2E" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <circle cx="50%" cy="50%" r={wheelRadius} fill="none" stroke="url(#ringGrad)" strokeWidth="1" strokeDasharray="12 6" opacity="0.5" />
                <circle cx="50%" cy="50%" r={wheelRadius * 0.55} fill="none" stroke="#C8FF2E" strokeWidth="0.5" opacity="0.12" />
              </svg>

              <div
                ref={wheelRef}
                style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0 }}
              >
                {stages.map((s, index) => {
                  const angle = (index / stages.length) * 360 - 90;
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.cos(rad) * wheelRadius;
                  const y = Math.sin(rad) * wheelRadius;
                  const isActive = index === activeStage;

                  return (
                    <div key={s.id}>
                      {/* Spoke */}
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: `${wheelRadius}px`,
                          height: '1px',
                          transformOrigin: '0 50%',
                          transform: `rotate(${angle}deg)`,
                          background: isActive
                            ? 'linear-gradient(90deg, rgba(200,255,46,0.4), transparent)'
                            : 'linear-gradient(90deg, rgba(90,90,101,0.15), transparent)',
                          transition: 'background 0.5s ease',
                        }}
                      />
                      {/* Node */}
                      <button
                        onClick={() => goToStage(index)}
                        className="cursor-pointer"
                        style={{
                          position: 'absolute',
                          left: `${x}px`,
                          top: `${y}px`,
                          transform: 'translate(-50%, -50%)',
                          zIndex: isActive ? 10 : 5,
                          background: 'none',
                          border: 'none',
                          padding: 0,
                        }}
                      >
                        <div
                          style={{
                            width: isActive ? (isMobile ? '42px' : '52px') : (isMobile ? '34px' : '40px'),
                            height: isActive ? (isMobile ? '42px' : '52px') : (isMobile ? '34px' : '40px'),
                            borderRadius: '50%',
                            background: isActive ? 'rgba(200, 255, 46, 0.12)' : 'rgba(20, 20, 25, 0.95)',
                            border: isActive ? '2px solid #C8FF2E' : '1px solid rgba(90, 90, 101, 0.35)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: isMobile ? '0.5rem' : '0.625rem',
                            fontWeight: 700,
                            color: isActive ? '#C8FF2E' : '#5A5A65',
                            boxShadow: isActive ? '0 0 20px rgba(200, 255, 46, 0.25), inset 0 0 10px rgba(200, 255, 46, 0.05)' : 'none',
                            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            letterSpacing: '0.02em',
                          }}
                        >
                          <span
                            style={{
                              width: '4px',
                              height: '4px',
                              borderRadius: '50%',
                              background: isActive ? '#C8FF2E' : '#5A5A65',
                              display: 'inline-block',
                              transition: 'background 0.5s ease',
                            }}
                          />
                        </div>
                      </button>
                    </div>
                  );
                })}

                {/* Center hub */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 20,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      width: isMobile ? '50px' : '70px',
                      height: isMobile ? '50px' : '70px',
                      borderRadius: '50%',
                      border: '1px solid rgba(200, 255, 46, 0.2)',
                      animation: 'pulseRing 3s ease-out infinite',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      width: isMobile ? '65px' : '90px',
                      height: isMobile ? '65px' : '90px',
                      borderRadius: '50%',
                      border: '1px solid rgba(200, 255, 46, 0.1)',
                      animation: 'pulseRing 3s ease-out 1s infinite',
                    }}
                  />
                  <div
                    style={{
                      width: isMobile ? '44px' : '60px',
                      height: isMobile ? '44px' : '60px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(200, 255, 46, 0.2) 0%, rgba(10, 10, 15, 0.95) 70%)',
                      border: '1px solid rgba(200, 255, 46, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 30px rgba(200, 255, 46, 0.1)',
                    }}
                  >
                    <span className="font-display" style={{ fontSize: '0.5rem', color: '#C8FF2E', letterSpacing: '0.15em', fontWeight: 700 }}>
                      G
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2" style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
          {stages.map((_, i) => (
            <button
              key={i}
              onClick={() => goToStage(i)}
              className="cursor-pointer"
              style={{
                width: i === activeStage ? '32px' : '8px',
                height: '8px',
                borderRadius: i === activeStage ? '4px' : '50%',
                background: i === activeStage ? '#C8FF2E' : 'rgba(90, 90, 101, 0.5)',
                border: 'none',
                transition: 'all 0.4s ease',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulseRing {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

function ArrowButton({ onClick, direction }: { onClick: () => void; direction: 'left' | 'right' }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer"
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '1px solid rgba(90, 90, 101, 0.35)',
        background: 'transparent',
        color: '#8A8A95',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#C8FF2E';
        e.currentTarget.style.color = '#C8FF2E';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(90, 90, 101, 0.35)';
        e.currentTarget.style.color = '#8A8A95';
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {direction === 'left' ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
      </svg>
    </button>
  );
}
