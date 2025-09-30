import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { useStore } from '@/store/useStore';
import { sampleProducts, categories, sizes, colors } from '@/data/products';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export default function Shop() {
  const { filters, setFilters, addToWishlist, isInWishlist, removeFromWishlist } = useStore();
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'newest'>('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = [...sampleProducts];

    // Category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(product => 
        filters.category.includes(product.category) || filters.category.includes('All')
      );
    }

    // Size filter
    if (filters.size.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => filters.size.includes(size))
      );
    }

    // Color filter
    if (filters.color.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => filters.color.includes(color))
      );
    }

    // Price filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
    }

    return filtered;
  }, [filters, sortBy]);

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

  const handleCategoryFilter = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.category, category]
      : filters.category.filter(c => c !== category);
    setFilters({ category: newCategories });
  };

  const handleSizeFilter = (size: string, checked: boolean) => {
    const newSizes = checked
      ? [...filters.size, size]
      : filters.size.filter(s => s !== size);
    setFilters({ size: newSizes });
  };

  const handleColorFilter = (color: string, checked: boolean) => {
    const newColors = checked
      ? [...filters.color, color]
      : filters.color.filter(c => c !== color);
    setFilters({ color: newColors });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-medium text-foreground mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.category.includes(category)}
                onCheckedChange={(checked) => handleCategoryFilter(category, checked as boolean)}
              />
              <label
                htmlFor={`category-${category}`}
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-medium text-foreground mb-3">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {sizes.slice(0, 12).map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={filters.size.includes(size)}
                onCheckedChange={(checked) => handleSizeFilter(size, checked as boolean)}
              />
              <label
                htmlFor={`size-${size}`}
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-medium text-foreground mb-3">Color</h3>
        <div className="space-y-2">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={filters.color.includes(color)}
                onCheckedChange={(checked) => handleColorFilter(color, checked as boolean)}
              />
              <label
                htmlFor={`color-${color}`}
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {color}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium text-foreground mb-3">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => setFilters({ priceRange: value as [number, number] })}
            max={1000}
            min={0}
            step={25}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* In Stock */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="in-stock"
          checked={filters.inStock}
          onCheckedChange={(checked) => setFilters({ inStock: checked as boolean })}
        />
        <label htmlFor="in-stock" className="text-sm text-muted-foreground cursor-pointer">
          In stock only
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl lg:text-4xl font-serif font-light text-foreground tracking-tight">
              Shop Collection
            </h1>
            <p className="text-muted-foreground mt-2">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Filter Toggle (Mobile) */}
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="default" className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your search to find the perfect pieces.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar (Desktop) */}
          <div className="hidden lg:block space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-foreground">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({
                  category: [],
                  size: [],
                  color: [],
                  priceRange: [0, 1000],
                  inStock: false,
                })}
              >
                Clear all
              </Button>
            </div>
            <FilterContent />
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-lg shadow-soft overflow-hidden product-card"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-subtle">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 space-y-2">
                      {product.new && (
                        <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                          New
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded">
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Wishlist */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white backdrop-blur-sm"
                      onClick={() => handleWishlistToggle(product.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isInWishlist(product.id)
                            ? 'fill-current text-red-500'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </Button>
                  </div>

                  <div className="p-4 space-y-3">
                    <Link to={`/product/${product.id}`} className="block space-y-2">
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-current text-yellow-400" />
                          <span className="text-sm text-muted-foreground">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-medium text-foreground">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </Link>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-1">
                        {product.colors.slice(0, 3).map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className={`w-4 h-4 rounded-full border border-border ${
                              color === 'Black' ? 'bg-black' :
                              color === 'White' || color === 'Ivory' ? 'bg-white' :
                              color === 'Navy' || color === 'Deep Navy' ? 'bg-blue-900' :
                              'bg-gray-300'
                            }`}
                          />
                        ))}
                        {product.colors.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{product.colors.length - 3}
                          </span>
                        )}
                      </div>
                      
                      {!product.inStock && (
                        <span className="text-xs text-destructive font-medium">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No products found matching your filters.
                </p>
                <Button
                  variant="minimal"
                  className="mt-4"
                  onClick={() => setFilters({
                    category: [],
                    size: [],
                    color: [],
                    priceRange: [0, 1000],
                    inStock: false,
                  })}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}