import { useEffect, useRef } from 'react';

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const isTouch = typeof window !== 'undefined' && 'ontouchstart' in window;

  useEffect(() => {
    if (isTouch) return;
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    const handleMouseMove = (e: MouseEvent) => {
      spotlight.style.setProperty('--x', `${e.clientX}px`);
      spotlight.style.setProperty('--y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background:
          'radial-gradient(circle 400px at var(--x, 50%) var(--y, 50%), rgba(200, 255, 46, 0.06), transparent)',
        opacity: 0,
        transition: 'opacity 0.5s ease',
      }}
      id="cursor-spotlight"
    />
  );
}
