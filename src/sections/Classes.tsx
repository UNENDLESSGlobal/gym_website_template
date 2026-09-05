import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const classes = [
  {
    title: 'STRENGTH TRAINING',
    description: 'Build power, sculpt muscle',
    image: '/class-strength.jpg',
  },
  {
    title: 'HIIT CARDIO',
    description: 'Maximum burn, minimum time',
    image: '/class-hiit.jpg',
  },
  {
    title: 'YOGA FLOW',
    description: 'Find your center, build flexibility',
    image: '/class-yoga.jpg',
  },
  {
    title: 'BOXING',
    description: 'Unleash your inner fighter',
    image: '/class-boxing.jpg',
  },
  {
    title: 'SPIN CLASS',
    description: 'Ride to the rhythm',
    image: '/class-spin.jpg',
  },
  {
    title: 'CROSSFIT',
    description: 'Functional fitness at its finest',
    image: '/class-crossfit.jpg',
  },
];

export default function Classes() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const label = headerRef.current.querySelector('.label');
        const headline = headerRef.current.querySelector('.headline');
        const subheadline = headerRef.current.querySelector('.subheadline');

        gsap.fromTo(label,
          { opacity: 0, letterSpacing: '0.5em' },
          {
            opacity: 1,
            letterSpacing: '0.2em',
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        );

        gsap.fromTo(headline,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            }
          }
        );

        gsap.fromTo(subheadline,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            }
          }
        );
      }

      // Cards stagger rise
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.class-card');
        cards.forEach((card, index) => {
          gsap.fromTo(card,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
              delay: index * 0.1,
            }
          );

          // Parallax effect - odd cards slower, even cards faster
          const speed = index % 2 === 0 ? 0.8 : 1.2;
          gsap.to(card, {
            y: -30 * speed,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="classes"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden bg-black"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="label inline-block text-orange-500 text-sm font-semibold tracking-widest mb-4">
            OUR CLASSES
          </span>
          <h2 className="headline font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            PUSH YOUR <span className="text-orange-500">LIMITS</span>
          </h2>
          <p className="subheadline text-white/60 text-lg max-w-2xl mx-auto">
            Expertly crafted programs for every fitness level. Find the perfect class to match your goals.
          </p>
        </div>

        {/* Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {classes.map((classItem, index) => (
            <div
              key={index}
              className="class-card group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <img
                src={classItem.image}
                alt={classItem.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Orange tint on hover */}
              <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/20 transition-colors duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="font-display text-2xl sm:text-3xl text-white mb-1 group-hover:-translate-y-2 transition-transform duration-300">
                  {classItem.title}
                </h3>
                <p className="text-white/70 text-sm mb-4 group-hover:-translate-y-2 transition-transform duration-300 delay-75">
                  {classItem.description}
                </p>
                <div className="flex items-center gap-2 text-orange-500 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  <span className="text-sm font-semibold">Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/50 rounded-lg transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
