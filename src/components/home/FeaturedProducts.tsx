import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { sampleProducts } from '@/data/products';
import { useStore } from '@/store/useStore';
import featuredImage from '@/assets/featured-products.jpg';

export default function FeaturedProducts() {
  const { addToWishlist, isInWishlist, removeFromWishlist } = useStore();
  
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
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative group">
            <div className="aspect-square overflow-hidden rounded-lg bg-subtle shadow-soft">
              <img
                src={featuredImage}
                alt="Featured Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-serif font-light text-foreground tracking-tight">
                Featured Collection
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Discover our most coveted pieces, each one a testament to 
                timeless elegance and exceptional craftsmanship.
              </p>
            </div>

            {/* Product Grid */}
            <div className="space-y-6">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-subtle transition-colors product-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
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
                </div>
              ))}
            </div>

            <Link to="/shop">
              <Button variant="premium" size="lg" className="w-full sm:w-auto">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}