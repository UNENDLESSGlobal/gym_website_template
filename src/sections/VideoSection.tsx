import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container reveal
      gsap.fromTo(containerRef.current,
        { clipPath: 'inset(50% 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0)',
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Play button pop
      gsap.fromTo(playBtnRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
          delay: 0.6,
        }
      );

      // Parallax
      gsap.to(videoRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Play button scale on scroll
      gsap.to(playBtnRef.current, {
        scale: 1.1,
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

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
  };

  return (
    <section
      id="video"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden bg-black"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div
          ref={containerRef}
          className="relative aspect-video rounded-xl overflow-hidden"
        >
          {/* Video/Image background */}
          <div className="absolute inset-0">
            <img
              ref={videoRef as any}
              src="/video-poster.jpg"
              alt="Gym video"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Animated border frame */}
          <div className="absolute inset-4 border border-white/20 rounded-lg pointer-events-none" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Play button */}
            <button
              ref={playBtnRef}
              onClick={handlePlay}
              className="group relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-orange-500 flex items-center justify-center hover:scale-110 transition-transform duration-300 glow-orange"
            >
              {/* Pulse rings */}
              <span className="absolute inset-0 rounded-full bg-orange-500 animate-pulse-ring" />
              <span className="absolute inset-0 rounded-full bg-orange-500 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
              
              <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="white" />
            </button>

            {/* Text */}
            <h3 className="font-display text-2xl sm:text-3xl text-white mt-6 mb-2">
              WATCH THE JOURNEY
            </h3>
            <p className="text-white/60 text-sm sm:text-base">
              See how we transform lives every day
            </p>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isPlaying && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div 
            className="w-full max-w-5xl aspect-video bg-gray-900 rounded-lg flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <Play className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <p className="text-white/60">Video player would load here</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
