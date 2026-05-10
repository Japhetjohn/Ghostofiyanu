import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const body = bodyRef.current;
    const form = formRef.current;
    if (!section || !heading || !body || !form) return;

    const formFields = form.querySelectorAll('input, textarea, button');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom-=15%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      [heading, body],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
    ).fromTo(
      formFields,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
      },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10"
      style={{
        background: '#0A0A0F',
        padding: 'var(--section-gap, 8rem) 0',
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: '56ch',
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
          Let's Build Something
        </h1>

        <p
          ref={bodyRef}
          className="mt-6 md:mt-8 font-mono text-center"
          style={{
            fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)',
            lineHeight: 1.6,
            color: '#8A8A95',
            opacity: 0,
          }}
        >
          If you're building in Web3 and need someone who can turn a room full of strangers into a
          community of advocates — let's talk.
        </p>

        {submitted ? (
          <div
            className="mt-12 text-center"
            style={{
              padding: '3rem 1.5rem',
              borderRadius: '4px',
              background: 'rgba(200, 255, 46, 0.05)',
              border: '1px solid rgba(200, 255, 46, 0.2)',
            }}
          >
            <div
              className="mx-auto mb-4 flex items-center justify-center"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(200, 255, 46, 0.15)',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C8FF2E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="font-mono text-sm" style={{ color: '#C8FF2E' }}>
              Message sent — Ghost will be in touch
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 mx-auto"
            style={{ maxWidth: '480px' }}
          >
            <div className="mb-5">
              <label
                className="block font-mono text-xs uppercase tracking-wider mb-2"
                style={{ color: '#8A8A95' }}
              >
                Name
              </label>
              <input
                type="text"
                required
                className="w-full outline-none transition-colors duration-200"
                style={{
                  background: '#1C1C22',
                  border: '1px solid rgba(90, 90, 101, 0.4)',
                  borderRadius: '4px',
                  padding: '0.875rem 1rem',
                  color: '#F5F5F0',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.875rem',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#C8FF2E';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(90, 90, 101, 0.4)';
                }}
              />
            </div>

            <div className="mb-5">
              <label
                className="block font-mono text-xs uppercase tracking-wider mb-2"
                style={{ color: '#8A8A95' }}
              >
                Email
              </label>
              <input
                type="email"
                required
                className="w-full outline-none transition-colors duration-200"
                style={{
                  background: '#1C1C22',
                  border: '1px solid rgba(90, 90, 101, 0.4)',
                  borderRadius: '4px',
                  padding: '0.875rem 1rem',
                  color: '#F5F5F0',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.875rem',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#C8FF2E';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(90, 90, 101, 0.4)';
                }}
              />
            </div>

            <div className="mb-6">
              <label
                className="block font-mono text-xs uppercase tracking-wider mb-2"
                style={{ color: '#8A8A95' }}
              >
                Message
              </label>
              <textarea
                required
                rows={4}
                className="w-full outline-none transition-colors duration-200 resize-none"
                style={{
                  background: '#1C1C22',
                  border: '1px solid rgba(90, 90, 101, 0.4)',
                  borderRadius: '4px',
                  padding: '0.875rem 1rem',
                  color: '#F5F5F0',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.875rem',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#C8FF2E';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(90, 90, 101, 0.4)';
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full font-mono uppercase text-sm tracking-wider transition-colors duration-200 cursor-pointer"
              style={{
                background: '#C8FF2E',
                color: '#0A0A0F',
                padding: '1rem 2rem',
                borderRadius: '4px',
                border: 'none',
                fontWeight: 700,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F5F5F0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#C8FF2E';
              }}
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
