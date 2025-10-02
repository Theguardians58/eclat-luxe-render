import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import { sampleProducts } from '@/data/products';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const wishlistProducts = wishlist
    .map((item) => sampleProducts.find((p) => p.id === item.productId))
    .filter(Boolean);

  const handleAddToCart = (productId: string) => {
    const product = sampleProducts.find((p) => p.id === productId);
    if (product) {
      addToCart({
        productId,
        size: product.sizes[0],
        color: product.colors[0],
        price: product.price,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-foreground mb-2">Your Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-foreground mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Save your favorite items to your wishlist
            </p>
            <Link to="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((product) => (
              <Card key={product!.id} className="group relative overflow-hidden">
                <button
                  onClick={() => removeFromWishlist(product!.id)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <X className="h-4 w-4 text-foreground" />
                </button>

                <Link to={`/product/${product!.id}`}>
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={product!.images[0]}
                      alt={product!.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <CardContent className="p-4 space-y-3">
                  <Link to={`/product/${product!.id}`}>
                    <h3 className="font-serif text-lg text-foreground hover:text-primary transition-colors">
                      {product!.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-foreground">
                        ${product!.price.toFixed(2)}
                      </p>
                      {product!.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          ${product!.originalPrice.toFixed(2)}
                        </p>
                      )}
                    </div>

                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product!.id)}
                      className="gap-2"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>

                  {!product!.inStock && (
                    <p className="text-sm text-destructive">Out of stock</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
