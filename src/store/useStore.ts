import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: string[];
  sizes: string[];
  materials: string[];
  description: string;
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
  featured?: boolean;
  new?: boolean;
}

export interface CartItem {
  productId: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: Date;
}

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  
  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // UI State
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  
  // Filters
  filters: {
    category: string[];
    size: string[];
    color: string[];
    priceRange: [number, number];
    inStock: boolean;
  };
  setFilters: (filters: Partial<StoreState['filters']>) => void;
  resetFilters: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],
      addToCart: (item) => {
        const { cart } = get();
        const existingItem = cart.find(
          (cartItem) =>
            cartItem.productId === item.productId &&
            cartItem.size === item.size &&
            cartItem.color === item.color
        );

        if (existingItem) {
          set({
            cart: cart.map((cartItem) =>
              cartItem.productId === item.productId &&
              cartItem.size === item.size &&
              cartItem.color === item.color
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            ),
          });
        } else {
          set({
            cart: [...cart, { ...item, quantity: 1 }],
          });
        }
      },
      removeFromCart: (productId, size, color) => {
        set({
          cart: get().cart.filter(
            (item) =>
              !(item.productId === productId && item.size === size && item.color === color)
          ),
        });
      },
      updateQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, size, color);
          return;
        }

        set({
          cart: get().cart.map((item) =>
            item.productId === productId && item.size === size && item.color === color
              ? { ...item, quantity }
              : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
      get cartTotal() {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      get cartCount() {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Wishlist state
      wishlist: [],
      addToWishlist: (productId) => {
        const { wishlist } = get();
        if (!wishlist.find((item) => item.productId === productId)) {
          set({
            wishlist: [...wishlist, { productId, addedAt: new Date() }],
          });
        }
      },
      removeFromWishlist: (productId) => {
        set({
          wishlist: get().wishlist.filter((item) => item.productId !== productId),
        });
      },
      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item.productId === productId);
      },

      // UI state
      cartOpen: false,
      setCartOpen: (open) => set({ cartOpen: open }),
      searchOpen: false,
      setSearchOpen: (open) => set({ searchOpen: open }),
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

      // Filters
      filters: {
        category: [],
        size: [],
        color: [],
        priceRange: [0, 1000],
        inStock: false,
      },
      setFilters: (newFilters) => {
        set({
          filters: { ...get().filters, ...newFilters },
        });
      },
      resetFilters: () => {
        set({
          filters: {
            category: [],
            size: [],
            color: [],
            priceRange: [0, 1000],
            inStock: false,
          },
        });
      },
    }),
    {
      name: 'eclat-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
      }),
    }
  )
);