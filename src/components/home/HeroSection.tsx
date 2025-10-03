import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import heroBackground from '@/assets/hero-background.gif';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const offsetX = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const offsetY = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <motion.div 
        className="absolute inset-0 gradient-hero"
        style={{ y: prefersReducedMotion ? 0 : scrollY }}
      >
        <motion.img
          src={heroBackground}
          alt="Éclat Lingerie Collection"
          className="w-full h-full object-cover opacity-60"
          style={{
            x: prefersReducedMotion ? 0 : offsetX,
            y: prefersReducedMotion ? 0 : offsetY,
            scale: 1.1,
          }}
        />
        <div className="absolute inset-0 bg-white/20" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 text-center"
        style={{ opacity: prefersReducedMotion ? 1 : opacity }}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-foreground tracking-tight text-balance"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Éclat — Lingerie Fine
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Discover the art of intimate elegance. Each piece in our collection is crafted 
            with meticulous attention to detail, using the finest materials from around the world.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link to="/shop">
              <Button variant="hero" size="xl" className="group">
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="minimal" size="xl">
                Our Story
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}