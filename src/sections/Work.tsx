import { useEffect, useRef, useState } from 'react';
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
    image: '/images/send.png',
    metrics: ['500+ Attendees', '209+ Referrals', 'Ex-Contributor'],
  },
  {
    id: 2,
    title: 'HOSTFINANCE',
    role: 'Community Manager / Growth Lead',
    description:
      'Led community growth initiatives for HostFinance. Built and managed referral programs, engagement campaigns, and onboarding flows that converted users into active community members and ambassadors.',
    image: '/images/hostfi.png',
    metrics: ['200+ Referrals', 'Growth Lead', 'Community Manager'],
  },
  {
    id: 3,
    title: 'ORBIT — ILORIN INNOVATION HUB',
    role: 'Co-Lead',
    description:
      'Co-led the ORBIT program at Ilorin Innovation Hub, driving Web3 and Web2 awareness. Organized campus onboarding initiatives reaching over 1,000 students and built strategic partnerships with local innovators.',
    image: '/images/orbit.png',
    metrics: ['1000+ Students', 'Co-Lead', 'Campus Onboarding'],
  },
  {
    id: 4,
    title: 'ACADEMIA',
    role: 'Community Manager',
    description:
      'Managed community operations for Academia App, engaging students and learners. Organized study groups, Q&A sessions, and educational campaigns that improved retention and user engagement within university circles.',
    image: '/images/Academia-logo-2021.svg',
    metrics: ['Community Manager', 'Education', 'Retention'],
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);

    const currentEl = contentRefs.current[activeIndex];
    const nextEl = contentRefs.current[index];

    if (currentEl) {
      gsap.to(currentEl, {
        opacity: 0,
        y: -20,
        duration: 0.35,
        ease: 'power2.in',
      });
    }

    if (nextEl) {
      gsap.fromTo(
        nextEl,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.2,
          onComplete: () => setIsAnimating(false),
        }
      );
    }

    setActiveIndex(index);
  };

  const nextSlide = () => {
    const next = (activeIndex + 1) % projects.length;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = (activeIndex - 1 + projects.length) % projects.length;
    goToSlide(prev);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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
  }, []);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % projects.length;
        const currentEl = contentRefs.current[prev];
        const nextEl = contentRefs.current[next];

        if (currentEl) {
          gsap.to(currentEl, { opacity: 0, y: -20, duration: 0.35, ease: 'power2.in' });
        }
        if (nextEl) {
          gsap.fromTo(nextEl, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.2 });
        }

        return next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative z-10"
      style={{ background: '#0A0A0F', padding: 'clamp(4rem, 8vw, 8rem) 0' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px', padding: '0 1.5rem' }}>
        {/* Header */}
        <div
          ref={headingRef}
          className="flex items-end justify-between"
          style={{ opacity: 0, marginBottom: 'clamp(2rem, 4vw, 4rem)' }}
        >
          <div>
            <div
              className="font-mono uppercase tracking-widest mb-3"
              style={{ fontSize: '0.625rem', color: '#C8FF2E', letterSpacing: '0.15em' }}
            >
              Selected Projects
            </div>
            <h1
              className="font-display uppercase"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                color: '#F5F5F0',
              }}
            >
              The Work
            </h1>
          </div>

          {/* Navigation arrows */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={prevSlide}
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
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Slideshow card */}
        <div
          style={{
            background: 'rgba(28, 28, 34, 0.3)',
            border: '1px solid rgba(90, 90, 101, 0.12)',
            borderRadius: '12px',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { contentRefs.current[index] = el; }}
              style={{
                display: index === activeIndex ? 'block' : 'none',
                opacity: index === 0 ? 1 : 0,
              }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* Logo */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    flex: '0 0 auto',
                    width: '100%',
                    maxWidth: '300px',
                    minHeight: '180px',
                  }}
                >
                  <div className="relative w-full flex items-center justify-center">
                    <div
                      style={{
                        position: 'absolute',
                        width: '70%',
                        height: '70%',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(200, 255, 46, 0.05) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        pointerEvents: 'none',
                      }}
                    />
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: '100%',
                        maxWidth: '260px',
                        height: 'auto',
                        maxHeight: '220px',
                        objectFit: 'contain',
                        position: 'relative',
                        zIndex: 2,
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1" style={{ minWidth: 0 }}>
                  <h2
                    className="font-display uppercase"
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                      lineHeight: 1.1,
                      color: '#F5F5F0',
                      marginBottom: '0.5rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {project.title}
                  </h2>

                  <div
                    className="font-mono"
                    style={{
                      fontSize: '0.75rem',
                      color: '#C8FF2E',
                      marginBottom: '1.25rem',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {project.role}
                  </div>

                  <p
                    className="font-mono"
                    style={{
                      fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)',
                      lineHeight: 1.7,
                      color: '#8A8A95',
                      marginBottom: '1.5rem',
                      maxWidth: '480px',
                    }}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap" style={{ gap: '0.75rem' }}>
                    {project.metrics.map((metric, i) => (
                      <div
                        key={i}
                        className="font-mono"
                        style={{
                          fontSize: '0.6875rem',
                          color: '#F5F5F0',
                          padding: '0.4rem 0.875rem',
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
            </div>
          ))}
        </div>

        {/* Controls */}
        <div
          className="flex items-center justify-center gap-4"
          style={{ marginTop: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          <button
            onClick={prevSlide}
            className="md:hidden cursor-pointer"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid rgba(90, 90, 101, 0.35)',
              background: 'transparent',
              color: '#8A8A95',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className="cursor-pointer"
                style={{
                  width: i === activeIndex ? '32px' : '8px',
                  height: '8px',
                  borderRadius: i === activeIndex ? '4px' : '50%',
                  background: i === activeIndex ? '#C8FF2E' : 'rgba(90, 90, 101, 0.5)',
                  border: 'none',
                  transition: 'all 0.4s ease',
                }}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="md:hidden cursor-pointer"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid rgba(90, 90, 101, 0.35)',
              background: 'transparent',
              color: '#8A8A95',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
