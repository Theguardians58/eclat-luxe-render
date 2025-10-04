import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { useStore } from '@/store/useStore';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Shop', href: '/shop' },
  { name: 'Collections', href: '/collections' },
  { name: 'About', href: '/about' },
  { name: 'Size Guide', href: '/size-guide' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const location = useLocation();
  const { cartCount, setCartOpen, setSearchOpen, mobileMenuOpen, setMobileMenuOpen } = useStore();
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-soft" 
        : "bg-white/80 backdrop-blur-sm"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-xl lg:text-2xl font-serif font-semibold text-foreground tracking-tight">
              Éclat — Lingerie Fine
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 relative",
                  "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300",
                  "hover:text-primary hover:after:scale-x-100 hover:after:origin-bottom-left",
                  location.pathname === item.href
                    ? "text-primary after:scale-x-100"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="hover:bg-subtle transition-smooth"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="hover:bg-subtle transition-smooth">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCartOpen(true)}
              className="relative hover:bg-subtle transition-smooth"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>

            <Link to={user ? "/account" : "/auth"}>
              <Button variant="ghost" size="icon" className="hover:bg-subtle transition-smooth">
                <User className="h-5 w-5" />
                <span className="sr-only">{user ? "Account" : "Sign In"}</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white/95 backdrop-blur-md">
            <nav className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-4 py-3 text-base font-medium transition-colors",
                    location.pathname === item.href
                      ? "text-primary bg-subtle"
                      : "text-foreground hover:text-primary hover:bg-subtle"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}