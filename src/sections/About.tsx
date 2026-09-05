import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Award, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Users, value: '15K+', label: 'MEMBERS TRANSFORMED' },
  { icon: Award, value: '50+', label: 'EXPERT TRAINERS' },
  { icon: Clock, value: '25', label: 'YEARS OF EXCELLENCE' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label typewriter effect
      gsap.fromTo(labelRef.current,
        { opacity: 0, width: 0 },
        {
          opacity: 1,
          width: 'auto',
          duration: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Headline word reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        gsap.fromTo(words,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            }
          }
        );
      }

      // Body text
      gsap.fromTo(bodyRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Image reveal
      gsap.fromTo(imageRef.current,
        { clipPath: 'inset(50% 50% 50% 50%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Stats stagger pop
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-item');
        gsap.fromTo(statItems,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.15,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      }

      // SVG line draw
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          }
        });
      }

      // Image parallax
      gsap.to(imageRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden bg-black"
    >
      {/* Decorative SVG line */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <path
          ref={lineRef}
          d="M0,400 Q300,200 600,400 T1200,400"
          fill="none"
          stroke="#FF6B35"
          strokeWidth="2"
          opacity="0.3"
        />
      </svg>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            {/* Label */}
            <span
              ref={labelRef}
              className="inline-block text-orange-500 text-sm font-semibold tracking-widest mb-4"
            >
              ABOUT GYMFLOW
            </span>

            {/* Headline */}
            <h2
              ref={headlineRef}
              className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6"
            >
              <span className="word inline-block">WHERE</span>{' '}
              <span className="word inline-block">DEDICATION</span>{' '}
              <span className="word inline-block">MEETS</span>{' '}
              <span className="word inline-block text-orange-500">RESULTS</span>
            </h2>

            {/* Body */}
            <p
              ref={bodyRef}
              className="text-white/70 text-lg leading-relaxed mb-10"
            >
              We're not just a gym—we're a community of warriors pushing boundaries. 
              Our state-of-the-art facility combines cutting-edge equipment with expert 
              coaching to deliver transformations that last. Every workout is designed 
              to challenge you, every trainer is dedicated to your success, and every 
              member becomes part of our family.
            </p>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-item group p-4 sm:p-6 bg-gray-900/50 border border-white/10 rounded-lg hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <stat.icon className="w-6 h-6 text-orange-500 mb-3" />
                  <div className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-1 group-hover:scale-105 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/50 tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div
              ref={imageRef}
              className="relative aspect-[4/5] rounded-lg overflow-hidden"
            >
              <img
                src="/about-image.jpg"
                alt="Fitness training"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 p-4 sm:p-6 bg-orange-500 rounded-lg shadow-glow">
              <div className="font-display text-3xl sm:text-4xl text-white">4.9</div>
              <div className="text-white/80 text-sm">Member Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
