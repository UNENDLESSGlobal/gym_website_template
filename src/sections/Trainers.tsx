import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trainers = [
  {
    name: 'MARCUS STEEL',
    role: 'Head Coach / Strength Specialist',
    image: '/trainer-marcus.jpg',
    bio: '15+ years of experience in strength training and bodybuilding. Former competitive powerlifter.',
  },
  {
    name: 'ELENA RODRIGUEZ',
    role: 'Yoga Master / Flexibility Expert',
    image: '/trainer-elena.jpg',
    bio: 'Certified yoga instructor with expertise in Vinyasa and Hatha yoga. 10+ years teaching.',
  },
  {
    name: 'JAMES "THE BEAST" COLLINS',
    role: 'Boxing Coach / HIIT Trainer',
    image: '/trainer-james.jpg',
    bio: 'Former professional boxer with 50+ fights. Specializes in combat sports and high-intensity training.',
  },
  {
    name: 'SARAH CHEN',
    role: 'Nutritionist / CrossFit Coach',
    image: '/trainer-sarah.jpg',
    bio: 'Registered dietitian and CrossFit Level 2 trainer. Helps clients achieve optimal performance.',
  },
  {
    name: 'DAVID OKONKWO',
    role: 'Personal Training Lead',
    image: '/trainer-david.jpg',
    bio: 'Master personal trainer with expertise in functional movement and injury prevention.',
  },
];

export default function Trainers() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        );
      }

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.trainer-card');
        cards.forEach((card, index) => {
          // Entrance animation
          gsap.fromTo(card,
            { scale: 0.9, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
              delay: index * 0.12,
            }
          );

          // Image reveal
          const image = card.querySelector('.card-image');
          gsap.fromTo(image,
            { clipPath: 'inset(100% 0 0 0)' },
            {
              clipPath: 'inset(0% 0 0 0)',
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: index * 0.12 + 0.1,
            }
          );

          // Parallax on scroll
          gsap.to(image, {
            y: -20,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          });

          // Floating animation
          gsap.to(card, {
            y: -8,
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="trainers"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden bg-black"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block text-orange-500 text-sm font-semibold tracking-widest mb-4">
            EXPERT COACHES
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            MEET YOUR <span className="text-orange-500">TRAINERS</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            World-class professionals dedicated to your success. Each trainer brings unique expertise and passion.
          </p>
        </div>

        {/* Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="trainer-card group relative"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-900">
                {/* Image */}
                <div className="card-image absolute inset-0">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <h3 className="font-display text-xl text-white mb-1">
                    {trainer.name}
                  </h3>
                  <p className="text-orange-500 text-xs font-medium mb-2">
                    {trainer.role}
                  </p>
                  <p className="text-white/60 text-sm mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {trainer.bio}
                  </p>

                  {/* Social icons */}
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors">
                      <Instagram className="w-4 h-4 text-white" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors">
                      <Twitter className="w-4 h-4 text-white" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors">
                      <Linkedin className="w-4 h-4 text-white" />
                    </a>
                  </div>
                </div>

                {/* Border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/50 rounded-lg transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
