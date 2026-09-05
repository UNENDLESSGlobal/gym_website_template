import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'BASIC',
    price: 29,
    period: 'month',
    description: 'Essential gym access for beginners',
    features: [
      'Gym access (6AM - 10PM)',
      'Basic equipment usage',
      'Locker room access',
      'Free Wi-Fi',
      'Mobile app access',
    ],
    popular: false,
  },
  {
    name: 'PREMIUM',
    price: 79,
    period: 'month',
    description: 'Most Popular - Classes + training',
    features: [
      '24/7 gym access',
      'All equipment usage',
      'Unlimited group classes',
      '2 PT sessions/month',
      'Nutrition consultation',
      'Sauna & steam room',
      'Guest passes (2/month)',
    ],
    popular: true,
  },
  {
    name: 'ELITE',
    price: 149,
    period: 'month',
    description: 'All-inclusive experience',
    features: [
      'Everything in Premium',
      'Unlimited PT sessions',
      'Personal locker',
      'Priority class booking',
      'Recovery suite access',
      'Monthly body composition',
      'VIP events access',
    ],
    popular: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
        const cards = cardsRef.current.querySelectorAll('.pricing-card');
        cards.forEach((card, index) => {
          const yOffset = index === 1 ? -30 : -10;
          
          gsap.fromTo(card,
            { y: 60 + Math.abs(yOffset), opacity: 0 },
            {
              y: yOffset,
              opacity: 1,
              duration: 0.6 + index * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
              delay: 0.1 + index * 0.1,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden bg-black"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block text-orange-500 text-sm font-semibold tracking-widest mb-4">
            MEMBERSHIP PLANS
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            INVEST IN <span className="text-orange-500">YOURSELF</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Flexible plans for every fitness journey. Choose the plan that fits your goals.
          </p>
        </div>

        {/* Cards */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          onMouseMove={handleMouseMove}
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card relative p-6 sm:p-8 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                plan.popular 
                  ? 'bg-gradient-to-b from-orange-500/20 to-gray-900 border-2 border-orange-500/50' 
                  : 'bg-gray-900/50 border border-white/10 hover:border-white/30'
              }`}
              style={{
                transform: `translateY(${index === 1 ? '-20px' : '0'})`,
              }}
            >
              {/* Spotlight effect */}
              {!plan.popular && (
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 107, 53, 0.15), transparent 40%)`,
                  }}
                />
              )}

              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-500 text-white text-xs font-semibold rounded-b-lg flex items-center gap-1">
                  <Star className="w-3 h-3" fill="white" />
                  MOST POPULAR
                </div>
              )}

              {/* Plan name */}
              <h3 className="font-display text-2xl text-white mb-2">{plan.name}</h3>
              <p className="text-white/50 text-sm mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-8">
                <span className="font-display text-5xl text-white">${plan.price}</span>
                <span className="text-white/50">/{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-orange-500' : 'text-white/50'}`} />
                    <span className="text-white/70 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 group ${
                  plan.popular
                    ? 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-glow'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                GET STARTED
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
