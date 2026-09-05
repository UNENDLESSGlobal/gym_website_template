import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const accentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background fade
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Headline character explode
      if (contentRef.current) {
        const headline = contentRef.current.querySelector('.headline');
        const subheadline = contentRef.current.querySelector('.subheadline');
        const buttons = contentRef.current.querySelectorAll('button');

        if (headline) {
          const chars = headline.querySelectorAll('.char');
          gsap.fromTo(chars,
            { opacity: 0, scale: 0.5, y: 50 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.03,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
              delay: 0.1,
            }
          );
        }

        gsap.fromTo(subheadline,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none none',
            },
            delay: 0.5,
          }
        );

        buttons.forEach((btn, index) => {
          gsap.fromTo(btn,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                toggleActions: 'play none none none',
              },
              delay: 0.7 + index * 0.15,
            }
          );
        });
      }

      // Floating accents
      if (accentsRef.current) {
        const accents = accentsRef.current.querySelectorAll('.accent');
        accents.forEach((accent, index) => {
          gsap.fromTo(accent,
            { opacity: 0, scale: 0.5 },
            {
              opacity: 0.3,
              scale: 1,
              duration: 0.8,
              ease: 'bounce.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
              delay: 0.3 + index * 0.1,
            }
          );

          // Orbit animation
          gsap.to(accent, {
            rotation: 360,
            duration: 20 + index * 5,
            repeat: -1,
            ease: 'none',
            transformOrigin: 'center center',
          });
        });
      }

      // Radial pulse
      const radial = sectionRef.current?.querySelector('.radial-bg');
      if (radial) {
        gsap.to(radial, {
          scale: 1.2,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split headline into characters
  const headlineText = 'READY TO TRANSFORM?';
  const chars = headlineText.split('').map((char, i) => (
    <span key={i} className="char inline-block">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden bg-black"
    >
      {/* Radial background */}
      <div className="radial-bg absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-radial from-orange-500/20 via-orange-500/5 to-transparent" />
      </div>

      {/* Floating accents */}
      <div ref={accentsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="accent absolute top-1/4 left-1/4 w-20 h-20 border border-orange-500/30 rotate-45" />
        <div className="accent absolute top-1/3 right-1/4 w-12 h-12 bg-orange-500/20 rotate-12" />
        <div className="accent absolute bottom-1/4 left-1/3 w-16 h-16 border border-white/10 rotate-45" />
        <div className="accent absolute bottom-1/3 right-1/3 w-8 h-8 bg-white/5 rotate-12" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div 
          ref={contentRef}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          {/* Headline */}
          <h2 className="headline font-display text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
            {chars}
          </h2>

          {/* Subheadline */}
          <p className="subheadline text-white/60 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands who've already changed their lives. Your transformation starts today.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => scrollToSection('#pricing')}
              className="group flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-glow-lg animate-pulse-glow"
            >
              GET STARTED TODAY
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('#footer')}
              className="group flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <MapPin className="w-5 h-5" />
              SCHEDULE A TOUR
            </button>
          </div>

          {/* Location info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/50">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span className="text-sm">123 Fitness Street, Downtown</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/20" />
            <div className="text-sm">
              Open 24/7 for Premium & Elite members
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
