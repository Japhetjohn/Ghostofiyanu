import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    label: 'X (Twitter)',
    href: 'https://x.com/ghostofiyanu',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/2349123065926',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: 'https://t.me/ghostofiyanu',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:ghostofiyanu@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
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
        className="relative"
        style={{
          maxWidth: '1728px',
          margin: '0 auto',
          padding: '3rem 1.5rem 2rem',
          overflow: 'hidden',
        }}
      >
        {/* Ghost image — blends into background on the right */}
        <div
          className="pointer-events-none hidden md:block"
          style={{
            position: 'absolute',
            right: '-2rem',
            bottom: '-2rem',
            width: '320px',
            height: '360px',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.15) 0%, transparent 85%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.15) 0%, transparent 85%)',
          }}
        >
          <img
            src="/images/ghost-hero.png"
            alt="Ghost"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom right',
              opacity: 0.25,
            }}
          />
        </div>

        {/* Brand row */}
        <div
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
          style={{ marginBottom: '3rem', position: 'relative', zIndex: 2 }}
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
              className="font-mono mt-2"
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
          <div className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="group"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid rgba(90, 90, 101, 0.35)',
                  color: '#8A8A95',
                  background: 'transparent',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C8FF2E';
                  e.currentTarget.style.color = '#C8FF2E';
                  e.currentTarget.style.background = 'rgba(200, 255, 46, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(90, 90, 101, 0.35)';
                  e.currentTarget.style.color = '#8A8A95';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {s.icon}
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
