import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectStage {
  id: number;
  title: string;
  subtitle: string;
  role: string;
  org: string;
  period: string;
  achievements: string[];
  icon: string;
  metrics: { label: string; value: string }[];
}

const stages: ProjectStage[] = [
  {
    id: 1, title: 'COMMUNITY SEED', subtitle: 'Where It All Began',
    role: 'Affiliate & Contributor', org: 'Early Stage', period: '2023 — 2024',
    achievements: ['Started as a contributor and affiliate in Web3 fintech', 'Learned community building from the ground up', 'Built first referral networks and engagement loops', 'Discovered the power of trust-based onboarding'],
    icon: '01', metrics: [{ label: 'Referrals', value: '209+' }, { label: 'Events', value: '500+' }],
  },
  {
    id: 2, title: 'GROWTH ENGINE', subtitle: 'Scaling Communities',
    role: 'Community Manager / Growth Lead', org: 'HostFinance', period: 'Growth Phase',
    achievements: ['Led community growth and retention strategies', 'Built referral systems that drove 200+ active users', 'Developed onboarding flows for fintech products', 'Managed engagement campaigns and ambassador programs'],
    icon: '02', metrics: [{ label: 'Referrals', value: '200+' }, { label: 'Role', value: 'Growth Lead' }],
  },
  {
    id: 3, title: 'EDUCATION FIRST', subtitle: 'Teaching & Onboarding',
    role: 'Co-Lead / Community Manager', org: 'ORBIT / Academia', period: '2023 — 2024',
    achievements: ['Co-led ORBIT program at Ilorin Innovation Hub', 'Managed Academia App learning community', 'Reached 1000+ students through campus onboarding', 'Organized Q&As, AMAs, and educational study groups'],
    icon: '03', metrics: [{ label: 'Students', value: '1000+' }, { label: 'Programs', value: '2' }],
  },
  {
    id: 4, title: 'REAL WORLD IMPACT', subtitle: 'From Digital to Physical',
    role: 'Crypto Adoption Lead', org: 'Various Merchants', period: '2023 — 2024',
    achievements: ['Onboarded 10+ businesses to crypto payments', 'Worked with clothing stores, restaurants, and salons', 'Hosted IRL events connecting product to people', 'Bridged traditional commerce with Web3 finance'],
    icon: '04', metrics: [{ label: 'Businesses', value: '10+' }, { label: 'Sectors', value: '3' }],
  },
  {
    id: 5, title: 'CONTENT ENGINE', subtitle: 'Voice of the Community',
    role: 'X Spaces Host & Content Creator', org: 'Personal Brand', period: '2023 — Present',
    achievements: ['Built @ghostofiyanu presence with engaged followers', 'Hosted regular X Spaces on Web3 trends', 'Created educational content driving fintech adoption', 'Established thought leadership in the African Web3 space'],
    icon: '05', metrics: [{ label: 'Followers', value: '3K+' }, { label: 'Spaces', value: '50+' }],
  },
  {
    id: 6, title: 'STRATEGIC GROWTH', subtitle: 'The Next Level',
    role: 'Web3 Strategist & Partnership Lead', org: 'Freelance', period: '2024 — Present',
    achievements: ['Developed go-to-market strategies for Web3 projects', 'Managed KOL partnerships and influencer campaigns', 'Advised on community structures and growth frameworks', 'Connected projects with strategic collaborators'],
    icon: '06', metrics: [{ label: 'Projects', value: '8+' }, { label: 'KOLs', value: '20+' }],
  },
];

export default function ProofOfWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const currentRotationRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const wheelRadius = isMobile ? 110 : 240;

  const animate = useCallback(() => {
    const targetRotation = -progressRef.current * 360;
    currentRotationRef.current += (targetRotation - currentRotationRef.current) * 0.08;
    if (wheelRef.current) {
      wheelRef.current.style.transform = `translate(-50%, -50%) rotate(${currentRotationRef.current}deg)`;
    }
    const stageIndex = Math.min(stages.length - 1, Math.floor((progressRef.current + 0.5 / stages.length) * stages.length) % stages.length);
    setActiveStage(stageIndex);
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(headingRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top bottom-=10%', toggleActions: 'play none none reverse' },
    });

    const st = ScrollTrigger.create({
      trigger: section, start: 'top top', end: `+=${stages.length * 100}%`,
      pin: true, anticipatePin: 1, scrub: 0.5,
      onUpdate: (self) => { progressRef.current = self.progress; },
    });

    rafRef.current = requestAnimationFrame(animate);
    return () => { st.kill(); cancelAnimationFrame(rafRef.current); };
  }, [animate]);

  return (
    <section id="proof-of-work" ref={sectionRef}
      style={{ background: '#0A0A0F', minHeight: '100dvh', position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '900px', height: '900px',
        background: 'radial-gradient(circle, rgba(200, 255, 46, 0.025) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ maxWidth: '1728px', margin: '0 auto', padding: '4rem 1.5rem 2rem',
        position: 'relative', zIndex: 2, height: '100vh', display: 'flex', flexDirection: 'column' }}>

        <div ref={headingRef} style={{ opacity: 0, flexShrink: 0, marginBottom: isMobile ? '1rem' : '0' }}>
          <div className="font-mono uppercase tracking-widest mb-3"
            style={{ fontSize: '0.625rem', color: '#C8FF2E', letterSpacing: '0.15em' }}>
            The Journey — Proof of Work
          </div>
          <h1 className="font-display uppercase"
            style={{ fontSize: 'clamp(2rem, 5vw, 5rem)', lineHeight: 0.9, letterSpacing: '-0.02em', color: '#F5F5F0' }}>
            Life Cycle
          </h1>
        </div>

        <div style={{
          flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center', justifyContent: 'center', gap: isMobile ? '1.5rem' : '4rem',
          paddingTop: isMobile ? '0.5rem' : '2rem', minHeight: 0, overflow: isMobile ? 'hidden' : 'visible',
        }}>
          {/* Detail Panel */}
          <div style={{ width: isMobile ? '100%' : '380px', flexShrink: 0, order: isMobile ? 0 : 0 }}>
            <StageDetail stage={stages[activeStage]} index={activeStage} total={stages.length} isMobile={isMobile} />
          </div>

          {/* Wheel */}
          <div style={{
            position: 'relative',
            width: `${wheelRadius * 2 + (isMobile ? 20 : 100)}px`,
            height: `${wheelRadius * 2 + (isMobile ? 20 : 100)}px`,
            flexShrink: 0, order: isMobile ? 1 : 0,
          }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C8FF2E" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#C8FF2E" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#C8FF2E" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <circle cx="50%" cy="50%" r={wheelRadius} fill="none" stroke="url(#ringGrad)"
                strokeWidth="1" strokeDasharray="12 6" opacity="0.5" />
              <circle cx="50%" cy="50%" r={wheelRadius * 0.55} fill="none" stroke="#C8FF2E"
                strokeWidth="0.5" opacity="0.12" />
            </svg>

            <div ref={wheelRef} style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0,
              transform: 'translate(-50%, -50%)' }}>
              {stages.map((stage, index) => {
                const angle = (index / stages.length) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * wheelRadius;
                const y = Math.sin(rad) * wheelRadius;
                const isActive = index === activeStage;

                return (
                  <div key={stage.id}>
                    <div style={{ position: 'absolute', left: 0, top: 0,
                      width: `${wheelRadius}px`, height: '1px', transformOrigin: '0 50%',
                      transform: `rotate(${angle}deg)`,
                      background: isActive
                        ? 'linear-gradient(90deg, rgba(200,255,46,0.4), transparent)'
                        : 'linear-gradient(90deg, rgba(90,90,101,0.15), transparent)',
                    }} />
                    <div style={{ position: 'absolute', left: `${x}px`, top: `${y}px`,
                      transform: 'translate(-50%, -50%)', zIndex: isActive ? 10 : 5 }}>
                      <div style={{
                        width: isActive ? (isMobile ? '42px' : '52px') : (isMobile ? '34px' : '40px'),
                        height: isActive ? (isMobile ? '42px' : '52px') : (isMobile ? '34px' : '40px'),
                        borderRadius: '50%',
                        background: isActive ? 'rgba(200, 255, 46, 0.12)' : 'rgba(20, 20, 25, 0.95)',
                        border: isActive ? '2px solid #C8FF2E' : '1px solid rgba(90, 90, 101, 0.35)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: isMobile ? '0.5rem' : '0.625rem',
                        fontWeight: 700, color: isActive ? '#C8FF2E' : '#5A5A65',
                        boxShadow: isActive ? '0 0 20px rgba(200, 255, 46, 0.25), inset 0 0 10px rgba(200, 255, 46, 0.05)' : 'none',
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        letterSpacing: '0.02em',
                      }}>{stage.icon}</div>
                    </div>
                  </div>
                );
              })}

              {/* Center hub */}
              <div style={{ position: 'absolute', left: 0, top: 0,
                transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
                <div style={{ position: 'absolute', width: isMobile ? '50px' : '70px', height: isMobile ? '50px' : '70px',
                  borderRadius: '50%', border: '1px solid rgba(200, 255, 46, 0.2)', animation: 'pulseRing 3s ease-out infinite' }} />
                <div style={{ position: 'absolute', width: isMobile ? '65px' : '90px', height: isMobile ? '65px' : '90px',
                  borderRadius: '50%', border: '1px solid rgba(200, 255, 46, 0.1)', animation: 'pulseRing 3s ease-out 1s infinite' }} />
                <div style={{ width: isMobile ? '44px' : '60px', height: isMobile ? '44px' : '60px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(200, 255, 46, 0.2) 0%, rgba(10, 10, 15, 0.95) 70%)',
                  border: '1px solid rgba(200, 255, 46, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(200, 255, 46, 0.1)' }}>
                  <span className="font-display" style={{ fontSize: '0.5rem', color: '#C8FF2E', letterSpacing: '0.15em', fontWeight: 700 }}>G</span>
                </div>
              </div>

              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ position: 'absolute', left: 0, top: 0, width: '3px', height: '3px',
                  borderRadius: '50%', background: '#C8FF2E', opacity: 0.2 + i * 0.1,
                  boxShadow: '0 0 4px rgba(200, 255, 46, 0.5)',
                  animation: `orbitDot${i} ${8 + i * 3}s linear infinite`,
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* Stage indicators */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexShrink: 0, paddingBottom: '1rem' }}>
          {stages.map((_, i) => (
            <div key={i} style={{ width: i === activeStage ? '24px' : '6px', height: '6px',
              borderRadius: i === activeStage ? '3px' : '50%', background: i === activeStage ? '#C8FF2E' : 'rgba(90, 90, 101, 0.5)',
              transition: 'all 0.4s ease' }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulseRing {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        @keyframes orbitDot0 { from { transform: translate(-50%, -50%) rotate(0deg) translateX(${wheelRadius * 1.1}px); } to { transform: translate(-50%, -50%) rotate(360deg) translateX(${wheelRadius * 1.1}px); } }
        @keyframes orbitDot1 { from { transform: translate(-50%, -50%) rotate(90deg) translateX(${wheelRadius * 1.15}px); } to { transform: translate(-50%, -50%) rotate(450deg) translateX(${wheelRadius * 1.15}px); } }
        @keyframes orbitDot2 { from { transform: translate(-50%, -50%) rotate(180deg) translateX(${wheelRadius * 1.08}px); } to { transform: translate(-50%, -50%) rotate(540deg) translateX(${wheelRadius * 1.08}px); } }
        @keyframes orbitDot3 { from { transform: translate(-50%, -50%) rotate(270deg) translateX(${wheelRadius * 1.2}px); } to { transform: translate(-50%, -50%) rotate(630deg) translateX(${wheelRadius * 1.2}px); } }
      `}</style>
    </section>
  );
}

function StageDetail({ stage, index, total, isMobile }: { stage: ProjectStage; index: number; total: number; isMobile: boolean }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 16, filter: 'blur(6px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power2.out' });
  }, [index]);

  return (
    <div ref={contentRef} style={{
      background: 'rgba(28, 28, 34, 0.5)', border: '1px solid rgba(200, 255, 46, 0.12)',
      borderRadius: '4px', padding: isMobile ? '1rem' : '1.5rem', backdropFilter: 'blur(12px)' }}>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono" style={{ fontSize: '0.5625rem', color: '#C8FF2E', letterSpacing: '0.1em' }}>
            STAGE {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
          </span>
          <div style={{ width: '20px', height: '1px', background: 'rgba(200, 255, 46, 0.25)' }} />
        </div>
        <span className="font-mono" style={{ fontSize: '0.5625rem', color: '#5A5A65' }}>{stage.period}</span>
      </div>

      <div className="font-mono uppercase mb-1" style={{ fontSize: '0.5625rem', color: '#8A8A95', letterSpacing: '0.1em' }}>
        {stage.subtitle}
      </div>

      <h3 className="font-display uppercase" style={{
        fontSize: isMobile ? '1.125rem' : 'clamp(1.125rem, 2vw, 1.5rem)',
        color: '#F5F5F0', lineHeight: 1.1, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
        {stage.title}
      </h3>

      <p className="font-mono mb-3" style={{ fontSize: '0.6875rem', color: '#C8FF2E', letterSpacing: '0.02em', lineHeight: 1.4 }}>
        {stage.role}<span style={{ color: '#5A5A65' }}> @ </span><span style={{ color: '#8A8A95' }}>{stage.org}</span>
      </p>

      <div className="flex gap-4 mb-3">
        {stage.metrics.map((m, i) => (
          <div key={i}>
            <div className="font-display" style={{ fontSize: isMobile ? '1rem' : '1.25rem', color: '#F5F5F0', lineHeight: 1 }}>{m.value}</div>
            <div className="font-mono" style={{ fontSize: '0.5625rem', color: '#5A5A65', letterSpacing: '0.05em', marginTop: '2px' }}>{m.label}</div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(90, 90, 101, 0.2)', paddingTop: '0.75rem' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {stage.achievements.slice(0, isMobile ? 2 : 4).map((achievement, i) => (
            <li key={i} className="font-mono flex items-start gap-2" style={{
              fontSize: isMobile ? '0.6875rem' : '0.75rem', color: '#8A8A95', lineHeight: 1.5, marginBottom: '0.35rem' }}>
              <span style={{ color: '#C8FF2E', fontSize: '0.5rem', lineHeight: '1.125rem', flexShrink: 0 }}></span>
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
