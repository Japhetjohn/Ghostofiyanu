import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom-=5%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-10"
      style={{ background: '#0A0A0F' }}
    >
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(90, 90, 101, 0.2) 50%, transparent 100%)',
        }}
      />

      <div
        ref={contentRef}
        className="mx-auto text-center"
        style={{
          maxWidth: '1728px',
          padding: '1.5rem',
          opacity: 0,
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: '0.625rem',
            color: '#5A5A65',
            letterSpacing: '0.05em',
          }}
        >
          &copy; 2026
        </span>
      </div>
    </footer>
  );
}
