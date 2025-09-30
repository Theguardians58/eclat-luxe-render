import { Fragment } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { useStore } from '@/store/useStore';
import { sampleProducts } from '@/data/products';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQuantity, removeFromCart, cartTotal, cartCount } = useStore();

  const getProduct = (productId: string) => {
    return sampleProducts.find(p => p.id === productId);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="text-left font-serif">
            Shopping Bag ({cartCount})
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Your bag is empty</h3>
            <p className="text-muted-foreground mb-6">
              Discover our beautiful collection of intimate apparel
            </p>
            <Button variant="hero" onClick={() => setCartOpen(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart items */}
            <div className="flex-1 overflow-auto py-6">
              <div className="space-y-6">
                {cart.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;

                  return (
                    <div key={`${item.productId}-${item.size}-${item.color}`} className="flex space-x-4">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-subtle">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {item.color} • {item.size}
                            </p>
                            <p className="mt-1 text-sm font-medium text-foreground">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() => removeFromCart(item.productId, item.size, item.color)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-sm font-medium text-foreground">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cart footer */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex justify-between text-base font-medium">
                <p>Subtotal</p>
                <p>{formatPrice(cartTotal)}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="space-y-3">
                <Button variant="hero" className="w-full" size="lg">
                  Checkout
                </Button>
                <Button 
                  variant="minimal" 
                  className="w-full" 
                  onClick={() => setCartOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}