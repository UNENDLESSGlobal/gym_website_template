import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  Send
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Classes', href: '#classes' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#footer' },
];

const classLinks = [
  { label: 'Strength Training', href: '#classes' },
  { label: 'HIIT Cardio', href: '#classes' },
  { label: 'Yoga Flow', href: '#classes' },
  { label: 'Boxing', href: '#classes' },
  { label: 'Spin Class', href: '#classes' },
  { label: 'CrossFit', href: '#classes' },
];

const supportLinks = [
  { label: 'FAQ', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Help Center', href: '#' },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

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

      // Content stagger
      if (contentRef.current) {
        const columns = contentRef.current.querySelectorAll('.footer-column');
        gsap.fromTo(columns,
          { y: 30, opacity: 0 },
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
            delay: 0.1,
          }
        );

        // Newsletter
        const newsletter = contentRef.current.querySelector('.newsletter');
        gsap.fromTo(newsletter,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
            delay: 0.5,
          }
        );

        // Social icons
        const socials = contentRef.current.querySelectorAll('.social-icon');
        gsap.fromTo(socials,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            stagger: 0.08,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none none',
            },
            delay: 0.6,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      id="footer"
      ref={sectionRef}
      className="relative pt-24 pb-8 w-full overflow-hidden bg-gray-950"
    >
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div ref={contentRef}>
          {/* Main grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Logo & About */}
            <div className="footer-column">
              <div className="font-display text-3xl mb-4">
                <span className="text-white">GYM</span>
                <span className="text-orange-500">FLOW</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Transform your body, elevate your mind. Join our community of warriors 
                and start your fitness journey today.
              </p>
              
              {/* Contact info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  123 Fitness Street, Downtown
                </div>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <Phone className="w-4 h-4 text-orange-500" />
                  +1 (555) 123-4567
                </div>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <Mail className="w-4 h-4 text-orange-500" />
                  info@gymflow.com
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h4 className="font-display text-lg text-white mb-4">QUICK LINKS</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-white/60 text-sm hover:text-orange-500 transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange-500 transition-all duration-200 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Classes */}
            <div className="footer-column">
              <h4 className="font-display text-lg text-white mb-4">CLASSES</h4>
              <ul className="space-y-2">
                {classLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-white/60 text-sm hover:text-orange-500 transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange-500 transition-all duration-200 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="footer-column">
              <h4 className="font-display text-lg text-white mb-4">SUPPORT</h4>
              <ul className="space-y-2">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white/60 text-sm hover:text-orange-500 transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange-500 transition-all duration-200 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="newsletter p-6 sm:p-8 bg-gray-900/50 border border-white/10 rounded-xl mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h4 className="font-display text-xl text-white mb-2">
                  GET FITNESS TIPS & EXCLUSIVE OFFERS
                </h4>
                <p className="text-white/60 text-sm">
                  Subscribe to our newsletter for weekly workout tips and member-exclusive deals.
                </p>
              </div>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-64 px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                  {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
            {/* Copyright */}
            <p className="text-white/40 text-sm">
              © 2024 GymFlow. All rights reserved.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Youtube, href: '#' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 hover:rotate-[360deg] hover:scale-110 transition-all duration-500"
                >
                  <social.icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
