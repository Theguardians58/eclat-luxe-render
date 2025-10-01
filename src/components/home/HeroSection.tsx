import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import heroBackground from '@/assets/hero-background.gif';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const offsetX = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const offsetY = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero">
        <motion.img
          src={heroBackground}
          alt="Éclat Lingerie Collection"
          className="w-full h-full object-cover opacity-60"
          style={{
            x: offsetX,
            y: offsetY,
            scale: 1.1,
          }}
        />
        <div className="absolute inset-0 bg-white/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-foreground tracking-tight text-balance animate-fade-in">
            Éclat — Lingerie Fine
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up text-balance">
            Discover the art of intimate elegance. Each piece in our collection is crafted 
            with meticulous attention to detail, using the finest materials from around the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-scale-in">
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
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}