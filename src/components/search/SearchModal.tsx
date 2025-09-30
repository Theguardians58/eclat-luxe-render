import { useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/store/useStore';
import { sampleProducts } from '@/data/products';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function SearchModal() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query || query.length < 2) return [];
    
    const lowercaseQuery = query.toLowerCase();
    return sampleProducts.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.materials.some(material => material.toLowerCase().includes(lowercaseQuery)) ||
      product.colors.some(color => color.toLowerCase().includes(lowercaseQuery))
    ).slice(0, 6);
  }, [query]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleClose = () => {
    setSearchOpen(false);
    setQuery('');
  };

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0">
        <div className="flex items-center border-b border-border px-6 py-4">
          <Search className="h-5 w-5 text-muted-foreground mr-3" />
          <Input
            type="text"
            placeholder="Search for products, materials, colors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-0 bg-transparent px-0 py-0 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            autoFocus
          />
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {query.length < 2 ? (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">
                Start typing to search our collection
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">
                No products found for "{query}"
              </p>
            </div>
          ) : (
            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-4 px-2">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
              </p>
              <div className="space-y-2">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={handleClose}
                    className="flex items-center space-x-4 p-3 rounded-md hover:bg-subtle transition-colors"
                  >
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-subtle">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-foreground truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {product.category}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm font-medium text-foreground">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}