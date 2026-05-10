import { useEffect, useState } from 'react';
import { getLenis } from '@/hooks/useLenis';

const navItems = [
  { label: 'ABOUT', href: '#about', num: '01' },
  { label: 'POW', href: '#proof-of-work', num: '02' },
  { label: 'WORK', href: '#work', num: '03' },
  { label: 'SKILLS', href: '#skills', num: '04' },
  { label: 'CONTACT', href: '#contact', num: '05' },
];

export default function Navigation() {
  const [active, setActive] = useState('');

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

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(href);
    }
  };

  return (
    <nav
      className="fixed z-50"
      style={{
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <div
        className="flex items-center justify-around w-full py-4 md:py-0 md:justify-end md:gap-8 md:px-12 md:bg-transparent"
        style={{
          background: 'rgba(20, 20, 25, 0.85)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {navItems.map((item) => {
          const isActive = active === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="flex items-center gap-1.5 transition-colors duration-200 md:py-6"
            >
              <span
                className="font-mono text-xs"
                style={{ color: isActive ? '#C8FF2E' : '#5A5A65' }}
              >
                {item.num}
              </span>
              <span
                className="font-mono text-xs uppercase tracking-wider hidden sm:inline"
                style={{
                  color: isActive ? '#F5F5F0' : '#8A8A95',
                }}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
