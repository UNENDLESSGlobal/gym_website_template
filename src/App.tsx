import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Import sections
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Classes from './sections/Classes';
import Transform from './sections/Transform';
import Trainers from './sections/Trainers';
import VideoSection from './sections/VideoSection';
import Stats from './sections/Stats';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import Blog from './sections/Blog';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Page load animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    // Initialize scroll-triggered animations
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger after all content is loaded
      ScrollTrigger.refresh();
    }, mainRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <div 
      ref={mainRef}
      className={`relative min-h-screen bg-black text-white transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Classes />
        <Transform />
        <Trainers />
        <VideoSection />
        <Stats />
        <Testimonials />
        <Pricing />
        <Blog />
        <CTA />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
