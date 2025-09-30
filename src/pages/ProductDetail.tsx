import { useState, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Star, Plus, Minus, ShoppingBag, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { useStore } from '@/store/useStore';
import { sampleProducts } from '@/data/products';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Lazy load 3D viewer for performance
const ProductViewer3D = lazy(() => import('@/components/product/ProductViewer3D'));

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = sampleProducts.find(p => p.id === id);
  
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useStore();
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [view3D, setView3D] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-serif">Product not found</h1>
          <Link to="/shop">
            <Button variant="hero">Return to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    
    addToCart({
      productId: product.id,
      size: selectedSize,
      color: selectedColor,
      price: product.price,
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const canAddToCart = selectedSize && selectedColor && product.inStock;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/shop" className="hover:text-foreground transition-colors">
            Shop
          </Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-foreground transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Images / 3D Viewer */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-subtle rounded-lg overflow-hidden">
              {view3D ? (
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center bg-subtle">
                    <div className="text-center space-y-2">
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-sm text-muted-foreground">Loading 3D viewer...</p>
                    </div>
                  </div>
                }>
                  <ProductViewer3D className="w-full h-full" />
                </Suspense>
              ) : (
                <img
                  src={product.images[currentImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Image Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setView3D(false);
                  }}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                    currentImageIndex === index && !view3D
                      ? 'border-primary'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
              
              {/* 3D View Button */}
              <button
                onClick={() => setView3D(true)}
                className={`flex-shrink-0 w-20 h-20 rounded-md border-2 transition-colors flex items-center justify-center ${
                  view3D
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-muted-foreground bg-subtle'
                }`}
              >
                <RotateCcw className="h-6 w-6 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h1 className="text-3xl lg:text-4xl font-serif font-light text-foreground tracking-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 fill-current text-yellow-400" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleWishlistToggle}
                  className="flex-shrink-0"
                >
                  <Heart
                    className={`h-6 w-6 ${
                      isInWishlist(product.id)
                        ? 'fill-current text-red-500'
                        : 'text-muted-foreground'
                    }`}
                  />
                </Button>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-serif font-medium text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Badges */}
              <div className="flex items-center space-x-2">
                {product.new && <Badge variant="default">New</Badge>}
                {product.originalPrice && <Badge variant="destructive">Sale</Badge>}
                {!product.inStock && <Badge variant="secondary">Out of Stock</Badge>}
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Materials */}
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Materials</h3>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material) => (
                  <Badge key={material} variant="outline">
                    {material}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Size</h3>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-md border transition-colors ${
                      selectedColor === color
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={!canAddToCart}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {!product.inStock ? 'Out of Stock' : 'Add to Bag'}
              </Button>
              
              {(!selectedSize || !selectedColor) && product.inStock && (
                <p className="text-sm text-muted-foreground text-center">
                  Please select size and color
                </p>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders over $200</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Secure Payment</p>
                  <p className="text-xs text-muted-foreground">SSL protected</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">30-day policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="care">Care Guide</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-8 space-y-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-serif font-medium">Product Details</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-medium mb-2">Available Sizes</h4>
                    <p className="text-muted-foreground">{product.sizes.join(', ')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Available Colors</h4>
                    <p className="text-muted-foreground">{product.colors.join(', ')}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="care" className="mt-8">
              <div className="prose max-w-none">
                <h3 className="text-lg font-serif font-medium">Care Instructions</h3>
                <ul className="space-y-2 text-muted-foreground mt-4">
                  <li>• Hand wash in cold water with gentle detergent</li>
                  <li>• Do not bleach or use fabric softener</li>
                  <li>• Lay flat to dry away from direct sunlight</li>
                  <li>• Store in a cool, dry place</li>
                  <li>• Professional cleaning recommended for best results</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Reviews feature coming soon.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}