import { useEffect, useState } from 'react';
import { getLenis } from '@/hooks/useLenis';

const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'POW', href: '#proof-of-work' },
  { label: 'WORK', href: '#work' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navigation() {
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive('#' + entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(href);
    }
  };

  return (
    <>
      <nav
        className="fixed z-50 hidden md:block"
        style={{ top: 0, left: 0, right: 0 }}
      >
        <div
          className="flex items-center justify-end gap-8 px-12"
          style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
        >
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="nav-link font-mono text-xs uppercase tracking-wider transition-colors duration-200"
                style={{ color: isActive ? '#F5F5F0' : '#8A8A95' }}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed z-50 md:hidden cursor-pointer"
        style={{
          top: '1rem',
          right: '1rem',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(20, 20, 25, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(90, 90, 101, 0.3)',
          borderRadius: '8px',
          color: menuOpen ? '#C8FF2E' : '#F5F5F0',
          transition: 'color 0.3s ease',
        }}
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12h16M4 6h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden"
        style={{
          background: 'rgba(10, 10, 15, 0.97)',
          backdropFilter: 'blur(20px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
        }}
      >
        {navItems.map((item, i) => {
          const isActive = active === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="font-display uppercase"
              style={{
                fontSize: 'clamp(1.5rem, 6vw, 2.5rem)',
                color: isActive ? '#C8FF2E' : '#F5F5F0',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.4s ease ${i * 0.06}s`,
              }}
            >
              {item.label}
            </a>
          );
        })}
      </div>

      <style>{`
        .nav-link:hover { color: #C8FF2E !important; }
      `}</style>
    </>
  );
}
