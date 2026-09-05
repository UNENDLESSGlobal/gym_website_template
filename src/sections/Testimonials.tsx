import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'JENNIFER MARTINEZ',
    image: '/testimonial-jennifer.jpg',
    quote: 'Lost 30lbs in 3 months. The trainers here don\'t just train you—they transform your mindset. GymFlow changed my life in ways I never imagined possible.',
    result: 'Lost 30 lbs',
  },
  {
    name: 'MICHAEL THOMPSON',
    image: '/testimonial-michael.jpg',
    quote: 'Best decision I ever made. The community keeps me coming back every day. It\'s not just a gym, it\'s a family that supports each other.',
    result: 'Gained 15 lbs muscle',
  },
  {
    name: 'AMANDA FOSTER',
    image: '/testimonial-amanda.jpg',
    quote: 'From couch potato to marathon runner. GymFlow gave me the tools and confidence to completely transform my lifestyle. I\'m forever grateful.',
    result: 'Ran first marathon',
  },
  {
    name: 'CHRIS DELGADO',
    image: '/testimonial-chris.jpg',
    quote: 'The personalized attention is unmatched. These coaches truly care about your success and push you to be your best every single day.',
    result: 'Improved strength 200%',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

      // Quote marks
      const quoteMarks = sectionRef.current?.querySelectorAll('.quote-mark');
      if (quoteMarks) {
        gsap.fromTo(quoteMarks,
          { scale: 0, rotation: -20 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
            delay: 0.2,
          }
        );
      }

      // Carousel entrance
      gsap.fromTo(carouselRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
          delay: 0.3,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + testimonials.length) % testimonials.length);
    
    if (normalizedDiff === 0) {
      return {
        transform: 'translateX(0) scale(1) rotateY(0deg)',
        opacity: 1,
        zIndex: 10,
      };
    } else if (normalizedDiff === 1 || normalizedDiff === -testimonials.length + 1) {
      return {
        transform: 'translateX(80%) scale(0.7) rotateY(-35deg)',
        opacity: 0.6,
        zIndex: 5,
      };
    } else if (normalizedDiff === testimonials.length - 1 || normalizedDiff === -1) {
      return {
        transform: 'translateX(-80%) scale(0.7) rotateY(35deg)',
        opacity: 0.6,
        zIndex: 5,
      };
    }
    return {
      transform: 'translateX(0) scale(0.5)',
      opacity: 0,
      zIndex: 0,
    };
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden bg-black"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block text-orange-500 text-sm font-semibold tracking-widest mb-4">
            SUCCESS STORIES
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white">
            WHAT OUR <span className="text-orange-500">MEMBERS SAY</span>
          </h2>
        </div>

        {/* Carousel */}
        <div 
          ref={carouselRef}
          className="relative max-w-4xl mx-auto"
          style={{ perspective: '1200px' }}
        >
          {/* Quote marks */}
          <Quote className="quote-mark absolute -top-8 -left-4 w-16 h-16 text-orange-500/20 rotate-180" />
          <Quote className="quote-mark absolute -bottom-8 -right-4 w-16 h-16 text-orange-500/20" />

          {/* Cards container */}
          <div className="relative h-[400px] sm:h-[350px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="absolute inset-0 flex items-center justify-center transition-all duration-600"
                style={{
                  ...getCardStyle(index),
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div className="w-full max-w-2xl p-6 sm:p-8 bg-gray-900/80 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-orange-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="text-center sm:text-left">
                      <p className="text-white/80 text-lg leading-relaxed mb-4">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                        <span className="font-display text-xl text-white">
                          {testimonial.name}
                        </span>
                        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-sm rounded-full">
                          {testimonial.result}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrev}
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setActiveIndex(index);
                      setTimeout(() => setIsAnimating(false), 600);
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-orange-500 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
