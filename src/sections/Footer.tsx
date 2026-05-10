import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { label: 'X (Twitter)', href: 'https://x.com/ghostofiyanu' },
  { label: 'WhatsApp', href: 'https://wa.me/2349123065926' },
  { label: 'Telegram', href: 'https://t.me/ghostofiyanu' },
  { label: 'Email', href: 'mailto:ghostofiyanu@gmail.com' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    gsap.fromTo(
      el.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom-=5%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative z-10"
      style={{ background: '#0A0A0F' }}
    >
      {/* Top lime accent line */}
      <div
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, #C8FF2E 30%, #C8FF2E 70%, transparent 100%)',
          opacity: 0.3,
        }}
      />

      {/* Back to top */}
      <div style={{ maxWidth: '1728px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingTop: '1.5rem',
          }}
        >
          <button
            onClick={scrollToTop}
            className="font-mono uppercase cursor-pointer group"
            style={{
              fontSize: '0.625rem',
              color: '#5A5A65',
              letterSpacing: '0.15em',
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'color 0.3s ease',
              padding: '0.5rem 0',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#C8FF2E';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#5A5A65';
            }}
          >
            Back to top
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              <path d="M6 10V2M6 2L2 6M6 2L10 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main footer content */}
      <div
        ref={contentRef}
        style={{
          maxWidth: '1728px',
          margin: '0 auto',
          padding: '3rem 1.5rem 2rem',
        }}
      >
        {/* Brand row */}
        <div
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
          style={{ marginBottom: '3rem' }}
        >
          <div>
            <h2
              className="font-display uppercase"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                color: '#F5F5F0',
              }}
            >
              Ghost
            </h2>
            <p
              className="font-mono mt-3"
              style={{
                fontSize: '0.8125rem',
                color: '#8A8A95',
                letterSpacing: '0.02em',
              }}
            >
              Web3 Strategist &amp; Community Builder
            </p>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono uppercase relative group"
                style={{
                  fontSize: '0.75rem',
                  color: '#8A8A95',
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  paddingBottom: '2px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#C8FF2E';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#8A8A95';
                }}
              >
                {s.label}
                <span
                  className="absolute bottom-0 left-0 h-px bg-[#C8FF2E] transition-all duration-300 ease-out"
                  style={{ width: '0%' }}
                  onTransitionEnd={() => {}}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'rgba(90, 90, 101, 0.15)',
            marginBottom: '1.5rem',
          }}
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="font-mono"
            style={{
              fontSize: '0.625rem',
              color: '#5A5A65',
              letterSpacing: '0.05em',
            }}
          >
            Built with intention. Designed to convert.
          </span>

          <span
            className="font-mono"
            style={{
              fontSize: '0.625rem',
              color: '#5A5A65',
              letterSpacing: '0.05em',
            }}
          >
            &copy; 2026 Ghost. All rights reserved.
          </span>
        </div>
      </div>

      {/* Bottom lime glow line */}
      <div
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(200, 255, 46, 0.3) 50%, transparent 100%)',
        }}
      />
    </footer>
  );
}
