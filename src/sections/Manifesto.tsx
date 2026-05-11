import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = [headingRef.current, p1Ref.current, p2Ref.current];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom-=15%',
        end: 'top center+=10%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      elements,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10"
      style={{
        background: '#0A0A0F',
        padding: '10rem 0 var(--section-gap, 8rem)',
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: '64ch',
          padding: '0 1.5rem',
        }}
      >
        <h1
          ref={headingRef}
          className="font-display text-center uppercase"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.01em',
            color: '#F5F5F0',
            opacity: 0,
          }}
        >
          From Strangers to Believers
        </h1>

        <p
          ref={p1Ref}
          className="mt-8 md:mt-12 font-mono text-center"
          style={{
            fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)',
            lineHeight: 1.6,
            color: '#8A8A95',
            opacity: 0,
          }}
        >
          I don't just manage communities — I architect them. From IRL activations that onboarded
          200+ users to leading innovation hub programs at Orbit Ilorin, I build ecosystems where
          people feel ownership.
        </p>

        <p
          ref={p2Ref}
          className="mt-6 font-mono text-center"
          style={{
            fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)',
            lineHeight: 1.6,
            color: '#8A8A95',
            opacity: 0,
          }}
        >
          Every touchpoint is intentional. Every voice matters. Ghost isn't a name — it's the
          standard: invisible infrastructure, visible results.
        </p>

        <div
          className="font-mono text-center"
          style={{
            marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
            padding: 'clamp(1rem, 2vw, 1.5rem)',
            border: '1px solid rgba(200, 255, 46, 0.12)',
            borderRadius: '8px',
            background: 'rgba(200, 255, 46, 0.03)',
          }}
        >
          <div
            className="font-mono uppercase"
            style={{
              fontSize: '0.625rem',
              color: '#C8FF2E',
              letterSpacing: '0.15em',
              marginBottom: '0.5rem',
            }}
          >
            Merchant Onboarding
          </div>
          <p
            style={{
              fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
              lineHeight: 1.6,
              color: '#8A8A95',
            }}
          >
            Onboarded 10+ local businesses — clothing stores, restaurants, salons — to accept crypto payments. Bridging traditional commerce and Web3 finance through hands-on IRL engagement and education.
          </p>
        </div>
      </div>
    </section>
  );
}
