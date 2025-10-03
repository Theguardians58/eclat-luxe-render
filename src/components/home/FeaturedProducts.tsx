import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { sampleProducts } from '@/data/products';
import { useStore } from '@/store/useStore';
import featuredImage from '@/assets/featured-products.jpg';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export default function FeaturedProducts() {
  const prefersReducedMotion = useReducedMotion();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  
  const featuredProducts = sampleProducts.filter(product => product.featured).slice(0, 3);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleWishlistToggle = (productId: string) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <section ref={containerRef} className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div 
            className="relative group overflow-hidden"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="aspect-square overflow-hidden rounded-lg bg-subtle shadow-soft">
              <motion.img
                src={featuredImage}
                alt="Featured Collection"
                className="w-full h-full object-cover"
                style={{ 
                  x: prefersReducedMotion ? 0 : x,
                  scale: 1.1
                }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.15 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            className="space-y-8"
            style={{ y: prefersReducedMotion ? 0 : y }}
          >
            <motion.div 
              className="space-y-4"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-light text-foreground tracking-tight">
                Featured Collection
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Discover our most coveted pieces, each one a testament to 
                timeless elegance and exceptional craftsmanship.
              </p>
            </motion.div>

            {/* Product Grid */}
            <div className="space-y-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-subtle transition-colors product-card"
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02, x: 4 }}
                >
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-subtle">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${product.id}`}
                      className="block group"
                    >
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-current text-yellow-400" />
                          <span className="text-sm text-muted-foreground">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="font-medium text-foreground">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleWishlistToggle(product.id)}
                    className="flex-shrink-0"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isInWishlist(product.id)
                          ? 'fill-current text-red-500'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </Button>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/shop">
                <Button variant="premium" size="lg" className="w-full sm:w-auto">
                  View All Products
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}