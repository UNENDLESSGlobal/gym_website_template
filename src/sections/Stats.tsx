import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 15000, suffix: '+', label: 'ACTIVE MEMBERS' },
  { value: 50, suffix: '+', label: 'EXPERT TRAINERS' },
  { value: 100, suffix: '+', label: 'WEEKLY CLASSES' },
  { value: 98, suffix: '%', label: 'SUCCESS RATE' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 90%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 2;
        const startTime = Date.now();
        const endValue = value;

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / (duration * 1000), 1);
          
          // Ease out
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.floor(easeProgress * endValue);
          
          setCount(currentValue);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      },
    });

    return () => trigger.kill();
  }, [value]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K';
    }
    return num.toString();
  };

  return (
    <span ref={counterRef}>
      {value >= 1000 ? formatNumber(count) : count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background slide in
      gsap.fromTo(sectionRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Labels fade slide
      if (contentRef.current) {
        const labels = contentRef.current.querySelectorAll('.stat-label');
        gsap.fromTo(labels,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            delay: 0.4,
          }
        );
      }

      // Lines draw
      const lines = sectionRef.current?.querySelectorAll('.connector-line');
      if (lines) {
        gsap.fromTo(lines,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
            delay: 0.6,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative py-16 lg:py-24 w-full overflow-hidden bg-gray-900"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 animate-shimmer" />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div 
          ref={contentRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
        >
          {stats.map((stat, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < stats.length - 1 && (
                <div className="connector-line hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-orange-500/50 to-transparent origin-left" />
              )}

              <div className="text-center">
                <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-2 animate-pulse">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="stat-label text-xs sm:text-sm text-white/50 tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
