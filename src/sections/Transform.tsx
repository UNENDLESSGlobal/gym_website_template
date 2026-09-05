import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Personalized workout plans',
  'Nutrition coaching included',
  'Progress tracking system',
  '24/7 community support',
];

export default function Transform() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image slide in
      gsap.fromTo(imageRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
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

      // Divider draw down
      gsap.fromTo(dividerRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
          delay: 0.4,
        }
      );

      // Content animations
      if (contentRef.current) {
        const label = contentRef.current.querySelector('.label');
        const headline = contentRef.current.querySelector('.headline');
        const body = contentRef.current.querySelector('.body');
        const cta = contentRef.current.querySelector('.cta');

        gsap.fromTo(label,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none none',
            },
            delay: 0.3,
          }
        );

        if (headline) {
          const words = headline.querySelectorAll('.word');
          gsap.fromTo(words,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                toggleActions: 'play none none none',
              },
              delay: 0.4,
            }
          );
        }

        gsap.fromTo(body,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 55%',
              toggleActions: 'play none none none',
            },
            delay: 0.6,
          }
        );

        gsap.fromTo(cta,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              toggleActions: 'play none none none',
            },
            delay: 0.8,
          }
        );
      }

      // Features stagger slide
      if (featuresRef.current) {
        const items = featuresRef.current.querySelectorAll('li');
        items.forEach((item, index) => {
          gsap.fromTo(item,
            { x: 30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 55%',
                toggleActions: 'play none none none',
              },
              delay: 0.5 + index * 0.1,
            }
          );

          // Checkmark draw
          const check = item.querySelector('.check-icon');
          gsap.fromTo(check,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.3,
              ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 55%',
                toggleActions: 'play none none none',
              },
              delay: 0.7 + index * 0.1,
            }
          );
        });
      }

      // Divider pulse glow
      gsap.to(dividerRef.current, {
        boxShadow: '0 0 30px rgba(255, 107, 53, 0.6)',
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToPricing = () => {
    const element = document.querySelector('#pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="transform"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden bg-black"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          {/* Image Side */}
          <div className="relative">
            <div
              ref={imageRef}
              className="relative aspect-[4/5] rounded-lg overflow-hidden"
            >
              <img
                src="/about-image.jpg"
                alt="Transformation"
                className="w-full h-full object-cover"
              />
              {/* Before/After labels */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded text-white text-sm font-medium">
                BEFORE
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-orange-500 rounded text-white text-sm font-medium">
                AFTER
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            ref={dividerRef}
            className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-orange-500 to-transparent origin-center"
          />

          {/* Content Side */}
          <div ref={contentRef} className="lg:pl-16">
            <span className="label inline-block text-orange-500 text-sm font-semibold tracking-widest mb-4">
              REAL RESULTS
            </span>

            <h2 className="headline font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
              <span className="word inline-block">TRANSFORM</span>{' '}
              <span className="word inline-block">YOUR</span>{' '}
              <span className="word inline-block text-orange-500">BODY</span>
            </h2>

            <p className="body text-white/70 text-lg leading-relaxed mb-8">
              Our proven methodology combines personalized training, nutrition guidance, 
              and unwavering support. The results speak for themselves. Join thousands 
              who have already transformed their lives.
            </p>

            {/* Features */}
            <ul ref={featuresRef} className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="check-icon flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={scrollToPricing}
              className="cta group flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-glow-lg"
            >
              START YOUR TRANSFORMATION
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
