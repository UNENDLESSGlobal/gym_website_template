import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    title: '10 Nutrition Myths Debunked by Science',
    category: 'Nutrition',
    date: 'March 15, 2024',
    image: '/blog-nutrition.jpg',
    featured: true,
  },
  {
    title: 'The Perfect Morning Workout Routine',
    category: 'Training',
    date: 'March 12, 2024',
    image: '/blog-morning.jpg',
    featured: false,
  },
  {
    title: 'How to Stay Motivated: A Trainer\'s Guide',
    category: 'Mindset',
    date: 'March 10, 2024',
    image: '/blog-motivation.jpg',
    featured: false,
  },
];

export default function Blog() {
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
        const cards = cardsRef.current.querySelectorAll('.blog-card');
        
        // Featured card
        gsap.fromTo(cards[0],
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
            delay: 0.1,
          }
        );

        // Other cards
        cards.forEach((card, index) => {
          if (index === 0) return;
          
          gsap.fromTo(card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 65%',
                toggleActions: 'play none none none',
              },
              delay: 0.15 * index,
            }
          );

          // Parallax
          const image = card.querySelector('img');
          gsap.to(image, {
            y: -20,
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
      id="blog"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden bg-black"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <span className="inline-block text-orange-500 text-sm font-semibold tracking-widest mb-4">
              LATEST INSIGHTS
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white">
              FITNESS TIPS <span className="text-orange-500">& STORIES</span>
            </h2>
          </div>
          <button className="mt-4 sm:mt-0 group flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors">
            VIEW ALL ARTICLES
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid lg:grid-cols-2 gap-6"
        >
          {/* Featured post */}
          <div className="blog-card group relative aspect-[4/3] lg:aspect-auto lg:row-span-2 rounded-xl overflow-hidden cursor-pointer">
            <img
              src={posts[0].image}
              alt={posts[0].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="flex items-center gap-4 mb-3">
                <span className="flex items-center gap-1 text-orange-500 text-sm">
                  <Tag className="w-4 h-4" />
                  {posts[0].category}
                </span>
                <span className="flex items-center gap-1 text-white/50 text-sm">
                  <Calendar className="w-4 h-4" />
                  {posts[0].date}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-white mb-4 group-hover:-translate-y-1 transition-transform">
                {posts[0].title}
              </h3>
              <div className="flex items-center gap-2 text-orange-500 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <span className="text-sm font-semibold">Read More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/50 rounded-xl transition-colors duration-300" />
          </div>

          {/* Other posts */}
          {posts.slice(1).map((post, index) => (
            <div
              key={index}
              className="blog-card group relative aspect-[16/9] rounded-xl overflow-hidden cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-center gap-4 mb-2">
                  <span className="flex items-center gap-1 text-orange-500 text-sm">
                    <Tag className="w-4 h-4" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-white/50 text-sm">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-white group-hover:-translate-y-1 transition-transform">
                  {post.title}
                </h3>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/50 rounded-xl transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
