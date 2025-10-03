import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { categories } from '@/data/products';
import collectionImage from '@/assets/collection-preview.jpg';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const collectionCategories = [
  {
    name: 'Bras & Bralettes',
    description: 'Support meets sophistication in our curated selection',
    href: '/shop?category=bras',
    image: collectionImage,
  },
  {
    name: 'Intimate Sets',
    description: 'Coordinated pieces for effortless elegance',
    href: '/shop?category=sets',
    image: collectionImage,
  },
  {
    name: 'Sleep & Lounge',
    description: 'Luxurious comfort for moments of rest',
    href: '/shop?category=sleep',
    image: collectionImage,
  },
];

function CollectionCard({ collection, index }: { collection: typeof collectionCategories[0], index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <motion.div
      ref={cardRef}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
      whileHover={prefersReducedMotion ? {} : { y: -8 }}
    >
      <Link
        to={collection.href}
        className="group block"
      >
        <div className="relative overflow-hidden rounded-lg bg-white shadow-soft product-card">
          <div className="aspect-[4/5] overflow-hidden">
            <motion.img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover"
              style={{ 
                x: prefersReducedMotion ? 0 : x,
                y: prefersReducedMotion ? 0 : y,
                rotate: prefersReducedMotion ? 0 : rotate,
                scale: 1.1
              }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.2 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="p-6 space-y-3">
            <h3 className="text-xl font-serif font-medium text-foreground group-hover:text-primary transition-colors">
              {collection.name}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {collection.description}
            </p>
            <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform duration-300">
              <span className="text-sm font-medium">Explore Collection</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CollectionPreview() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-subtle/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-foreground tracking-tight">
            Curated Collections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Each collection tells a story of craftsmanship, luxury, and timeless appeal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collectionCategories.map((collection, index) => (
            <CollectionCard key={collection.name} collection={collection} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/collections">
            <Button variant="minimal" size="lg">
              View All Collections
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}