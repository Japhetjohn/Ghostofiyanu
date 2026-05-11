import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { DissolvingHelix } from '@/lib/DissolvingHelix';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const helixRef = useRef<DissolvingHelix | null>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const helix = new DissolvingHelix(canvasContainerRef.current);
    helixRef.current = helix;

    // Hero text entrance with blur-to-focus
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      captionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, filter: 'blur(20px)', scale: 0.8 },
        { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.5, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        statsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );

    // Canvas lifecycle — fade out when scrolled past hero
    ScrollTrigger.create({
      trigger: heroTextRef.current,
      start: 'bottom top',
      end: 'bottom top',
      onLeave: () => {
        helix.pause();
        const spotlight = document.getElementById('cursor-spotlight');
        if (spotlight) spotlight.style.opacity = '1';
      },
      onEnterBack: () => {
        helix.resume();
        const spotlight = document.getElementById('cursor-spotlight');
        if (spotlight) spotlight.style.opacity = '0';
      },
    });

    return () => {
      helix.destroy();
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === heroTextRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        position: 'relative',
        height: '100svh',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* WebGL Canvas Container */}
      <div
        ref={canvasContainerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />

      {/* Hero Content: Text + Avatar */}
      <div
        ref={heroTextRef}
        className="hero-content relative z-10 w-full"
        style={{
          padding: '0 1.5rem 15vh',
          maxWidth: '1728px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '2rem',
        }}
      >
        {/* Text Column */}
        <div className="hero-text-col" style={{ maxWidth: '48ch', flexShrink: 0 }}>
          <div
            ref={captionRef}
            className="font-mono text-xs md:text-sm uppercase tracking-widest mb-4"
            style={{ color: '#C8FF2E', opacity: 0 }}
          >
            Web3 Strategist &amp; Community Builder
          </div>
          <h1
            ref={titleRef}
            className="font-display uppercase"
            style={{
              fontSize: 'clamp(3rem, 10vw, 9rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: '#F5F5F0',
              opacity: 0,
              textShadow: '0 0 40px rgba(10, 10, 15, 0.8)',
            }}
          >
            Ghost
          </h1>
          <p
            ref={subtitleRef}
            className="mt-6 md:mt-8 font-mono"
            style={{
              fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)',
              lineHeight: 1.6,
              color: '#8A8A95',
              opacity: 0,
            }}
          >
            Building Web3 ecosystems that last. I lead communities, run events, and turn strangers
            into believers.
          </p>
          <a
            ref={ctaRef}
            href="#contact"
            className="inline-block mt-8 font-mono text-sm uppercase tracking-wider transition-colors duration-200 hover:underline"
            style={{ color: '#C8FF2E', opacity: 0 }}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get in touch
          </a>

          {/* Stats strip */}
          <div
            ref={statsRef}
            className="hero-stats"
            style={{
              marginTop: '2.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              opacity: 0,
            }}
          >
            {[
              { value: '500+', label: 'Event Attendees' },
              { value: '409+', label: 'Referrals' },
              { value: '1000+', label: 'Students' },
              { value: '10+', label: 'Businesses' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-display"
                  style={{
                    fontSize: '1.25rem',
                    color: '#C8FF2E',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="font-mono uppercase"
                  style={{
                    fontSize: '0.5625rem',
                    color: '#5A5A65',
                    letterSpacing: '0.1em',
                    marginTop: '0.25rem',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar Image */}
        <div
          className="hero-avatar"
          style={{
            position: 'relative',
            width: 'clamp(180px, 28vw, 380px)',
            height: 'clamp(200px, 32vw, 440px)',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            opacity: 0,
            animation: 'fadeInAvatar 1.2s ease-out 1.5s forwards',
          }}
        >
          {/* Radial glow behind avatar */}
          <div
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120%',
              height: '80%',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(200, 255, 46, 0.08) 0%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
              animation: 'glowPulse 4s ease-in-out infinite',
            }}
          />
          <img
            src="/images/ghost-hero.png"
            alt="Ghost"
            className="hero-avatar-img"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              position: 'relative',
              zIndex: 2,
              filter: 'drop-shadow(0 0 60px rgba(200, 255, 46, 0.1))',
              animation: 'floatAvatar 6s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeInAvatar {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.1); }
        }
        @keyframes floatAvatar {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @media (max-width: 767px) {
          .hero-section {
            min-height: 100svh !important;
            height: auto !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .hero-content {
            padding: 6rem 1.25rem 6rem !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 1.5rem !important;
            height: auto !important;
          }
          .hero-text-col {
            text-align: center !important;
            align-items: center !important;
            display: flex !important;
            flex-direction: column !important;
            max-width: 100% !important;
          }
          .hero-stats {
            justify-content: center !important;
            gap: 1.5rem !important;
            margin-top: 2rem !important;
          }
          .hero-avatar {
            width: 200px !important;
            height: 220px !important;
            opacity: 1 !important;
            animation: none !important;
            transform: none !important;
            order: -1 !important;
          }
          .hero-avatar-img {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
