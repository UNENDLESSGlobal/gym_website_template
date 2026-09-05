import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: 'HOME', href: '#hero' },
  { label: 'CLASSES', href: '#classes' },
  { label: 'TRAINERS', href: '#trainers' },
  { label: 'PRICING', href: '#pricing' },
  { label: 'BLOG', href: '#blog' },
  { label: 'CONTACT', href: '#footer' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline({ delay: 0.2 });
    
    tl.fromTo(logoRef.current, 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );

    if (itemsRef.current) {
      const items = itemsRef.current.querySelectorAll('a');
      tl.fromTo(items,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
        '-=0.3'
      );
    }

    tl.fromTo(ctaRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' },
      '-=0.2'
    );
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            ref={logoRef}
            className={`font-display text-2xl sm:text-3xl tracking-wider transition-transform duration-500 ${
              isScrolled ? 'scale-100' : 'scale-110'
            }`}
          >
            <span className="text-white">GYM</span>
            <span className="text-orange-500">FLOW</span>
          </div>

          {/* Desktop Navigation */}
          <div 
            ref={itemsRef}
            className="hidden lg:flex items-center gap-8"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="relative text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full group-hover:left-0" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <button
            ref={ctaRef}
            onClick={() => scrollToSection('#pricing')}
            className="hidden lg:block px-6 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-glow"
          >
            JOIN NOW
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="block text-lg font-medium text-white/80 hover:text-orange-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => scrollToSection('#pricing')}
            className="w-full mt-4 px-6 py-3 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition-colors"
          >
            JOIN NOW
          </button>
        </div>
      </div>
    </nav>
  );
}
