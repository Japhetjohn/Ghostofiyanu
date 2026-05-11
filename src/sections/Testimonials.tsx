import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Adeola M.',
    role: 'Event Attendee',
    text: 'Ghost hosted the Send event I attended in Ilorin. Over 500 people showed up and the energy was unreal. He knows how to move a crowd from curious to committed.',
  },
  {
    id: 2,
    name: 'Tunde K.',
    role: 'Store Owner',
    text: 'I run a clothing store in Ilorin. Ghost walked me through accepting crypto payments step by step. Now I process payments faster and my customers love it.',
  },
  {
    id: 3,
    name: 'Sarah O.',
    role: 'Student, UNILORIN',
    text: 'The ORBIT campus onboarding changed how I see Web3. Ghost made it simple, relatable, and actually fun. Over 1000 students showed up across the sessions.',
  },
  {
    id: 4,
    name: 'Emmanuel J.',
    role: 'Startup Founder',
    text: 'We brought Ghost on to lead community growth for our fintech app. Within weeks, referral numbers jumped. His approach is systematic but never feels robotic.',
  },
  {
    id: 5,
    name: 'Chidi N.',
    role: 'Restaurant Manager',
    text: 'I was skeptical about crypto for my restaurant. Ghost onboarded me and my staff in one afternoon. Now we take stablecoin payments regularly. Game changer.',
  },
  {
    id: 6,
    name: 'Fatima B.',
    role: 'Community Member',
    text: 'Ghost does not just build communities — he architects them. Every touchpoint feels intentional. From X Spaces to IRL meetups, the consistency is unmatched.',
  },
];

const topRow = testimonials.slice(0, 3);
const bottomRow = testimonials.slice(3, 6);

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div
      className="testimonial-card flex-shrink-0"
      style={{
        width: 'clamp(280px, 85vw, 380px)',
        padding: 'clamp(1rem, 3vw, 1.5rem)',
        background: 'rgba(28, 28, 34, 0.5)',
        border: '1px solid rgba(90, 90, 101, 0.2)',
        borderRadius: '8px',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ marginBottom: '0.75rem' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 11H6C6 8.79086 7.79086 7 10 7V5C6.68629 5 4 7.68629 4 11V19H10V11ZM20 11H16C16 8.79086 17.7909 7 20 7V5C16.6863 5 14 7.68629 14 11V19H20V11Z" fill="rgba(200, 255, 46, 0.3)" />
        </svg>
      </div>
      <p
        className="font-mono"
        style={{
          fontSize: 'clamp(0.75rem, 2.5vw, 0.8125rem)',
          lineHeight: 1.7,
          color: '#8A8A95',
          marginBottom: '1rem',
        }}
      >
        {testimonial.text}
      </p>
      <div className="flex items-center gap-3">
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(200, 255, 46, 0.15), rgba(90, 90, 101, 0.3))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#C8FF2E',
            fontFamily: 'var(--font-display)',
            flexShrink: 0,
          }}
        >
          {testimonial.name.charAt(0)}
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            className="font-mono"
            style={{
              fontSize: '0.75rem',
              color: '#F5F5F0',
              fontWeight: 600,
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {testimonial.name}
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: '0.625rem',
              color: '#5A5A65',
              letterSpacing: '0.05em',
            }}
          >
            {testimonial.role}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative z-10 overflow-hidden"
      style={{ background: '#0A0A0F', padding: 'clamp(4rem, 10vw, 8rem) 0' }}
    >
      {/* Header */}
      <div
        ref={headingRef}
        className="mx-auto"
        style={{ maxWidth: '1200px', padding: '0 1.5rem', opacity: 0, marginBottom: 'clamp(2rem, 5vw, 4rem)' }}
      >
        <div
          className="font-mono uppercase tracking-widest mb-3"
          style={{ fontSize: '0.625rem', color: '#C8FF2E', letterSpacing: '0.15em' }}
        >
          Voices
        </div>
        <h1
          className="font-display uppercase"
          style={{
            fontSize: 'clamp(2rem, 5vw, 5rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            color: '#F5F5F0',
          }}
        >
          Testimonials
        </h1>
      </div>

      {/* Top row — slides RIGHT */}
      <div
        className="testimonials-marquee-top"
        style={{
          display: 'flex',
          gap: 'clamp(0.75rem, 2vw, 1.5rem)',
          marginBottom: 'clamp(0.75rem, 2vw, 1.5rem)',
          width: 'max-content',
        }}
      >
        {[...topRow, ...topRow, ...topRow, ...topRow].map((t, i) => (
          <TestimonialCard key={`top-${t.id}-${i}`} testimonial={t} />
        ))}
      </div>

      {/* Bottom row — slides LEFT */}
      <div
        className="testimonials-marquee-bottom"
        style={{
          display: 'flex',
          gap: 'clamp(0.75rem, 2vw, 1.5rem)',
          width: 'max-content',
        }}
      >
        {[...bottomRow, ...bottomRow, ...bottomRow, ...bottomRow].map((t, i) => (
          <TestimonialCard key={`bottom-${t.id}-${i}`} testimonial={t} />
        ))}
      </div>

      {/* Edge fade gradients */}
      <div
        className="edge-fade-left pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: 'clamp(60px, 10vw, 120px)',
          background: 'linear-gradient(to right, #0A0A0F, transparent)',
          zIndex: 2,
        }}
      />
      <div
        className="edge-fade-right pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'clamp(60px, 10vw, 120px)',
          background: 'linear-gradient(to left, #0A0A0F, transparent)',
          zIndex: 2,
        }}
      />

      <style>{`
        @keyframes marqueeRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeLeft {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .testimonials-marquee-top {
          animation: marqueeRight 30s linear infinite;
        }
        .testimonials-marquee-bottom {
          animation: marqueeLeft 35s linear infinite;
        }
        .testimonials-marquee-top:hover,
        .testimonials-marquee-bottom:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
