import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const shardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background zoom and fade
      gsap.fromTo(bgRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }
      );

      // Headline animation - word by word
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        gsap.fromTo(words,
          { clipPath: 'inset(0 100% 0 0)', x: -50, opacity: 0 },
          { 
            clipPath: 'inset(0 0% 0 0)', 
            x: 0, 
            opacity: 1, 
            duration: 0.8, 
            stagger: 0.12, 
            ease: 'power3.out',
            delay: 0.4
          }
        );
      }

      // Subheadline fade + blur
      gsap.fromTo(subheadlineRef.current,
        { opacity: 0, filter: 'blur(10px)' },
        { opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out', delay: 0.8 }
      );

      // CTA buttons
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('button');
        gsap.fromTo(buttons[0],
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)', delay: 1 }
        );
        gsap.fromTo(buttons[1],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', delay: 1.1 }
        );
      }

      // Floating shards
      if (shardsRef.current) {
        const shards = shardsRef.current.querySelectorAll('.shard');
        gsap.fromTo(shards,
          { opacity: 0, scale: 0.5 },
          { 
            opacity: 0.6, 
            scale: 1, 
            duration: 1, 
            stagger: 0.1, 
            ease: 'bounce.out',
            delay: 0.6
          }
        );

        // Continuous floating animation
        shards.forEach((shard, i) => {
          gsap.to(shard, {
            y: `+=${20 + i * 5}`,
            rotation: `+=${5 + i * 2}`,
            duration: 3 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        });
      }

      // Scroll-triggered parallax
      gsap.to(bgRef.current, {
        y: -100,
        scale: 1.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.to(contentRef.current, {
        y: -50,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/hero-bg.jpg"
          alt="Fitness training"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      {/* Floating geometric shards */}
      <div ref={shardsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="shard absolute top-20 right-20 w-16 h-16 border-2 border-orange-500/30 rotate-45" />
        <div className="shard absolute top-40 right-40 w-8 h-8 bg-orange-500/20 rotate-12" />
        <div className="shard absolute bottom-40 right-60 w-12 h-12 border border-white/20 rotate-45" />
        <div className="shard absolute top-1/3 right-1/4 w-6 h-6 bg-white/10 rotate-45" />
        <div className="shard absolute bottom-1/4 right-1/3 w-10 h-10 border-2 border-orange-500/20 rotate-12" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-24"
      >
        <div className="max-w-4xl">
          {/* Label */}
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 bg-orange-500/20 border border-orange-500/40 text-orange-400 text-sm font-medium tracking-wider rounded-full">
              ELITE FITNESS STUDIO
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-none mb-6"
          >
            <span className="word inline-block">FORGE</span>{' '}
            <span className="word inline-block">YOUR</span>{' '}
            <span className="word inline-block text-orange-500">LEGACY</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-lg sm:text-xl text-white/70 max-w-xl mb-10 leading-relaxed"
          >
            Elite fitness training that transforms bodies and minds. 
            Join our community of warriors and unlock your full potential.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection('#pricing')}
              className="group flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-glow-lg"
            >
              START YOUR JOURNEY
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('#classes')}
              className="group flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <Play className="w-5 h-5" />
              VIEW CLASSES
            </button>
          </div>
        </div>
      </div>

      {/* Energy rings */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-orange-500/50 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </section>
  );
}
