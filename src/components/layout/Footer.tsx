import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';

const footerNavigation = {
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'Bras & Bralettes', href: '/shop?category=bras' },
    { name: 'Panties', href: '/shop?category=panties' },
    { name: 'Sleep & Loungewear', href: '/shop?category=sleep' },
    { name: 'Sets', href: '/shop?category=sets' },
  ],
  support: [
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Shipping & Returns', href: '/shipping' },
    { name: 'Care Instructions', href: '/care' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ],
  company: [
    { name: 'About Éclat', href: '/about' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'Careers', href: '/careers' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Twitter', href: '#', icon: Twitter },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-xl font-serif font-semibold text-foreground">
                Éclat — Lingerie Fine
              </h2>
            </Link>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Discover the art of intimate elegance. Each piece in our collection is crafted 
              with meticulous attention to detail, using the finest materials from around the world.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">
                Stay in touch
              </h3>
              <p className="text-sm text-muted-foreground">
                Be the first to know about new collections and exclusive offers.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button variant="hero" size="default">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium text-foreground mb-4">Shop</h3>
              <ul className="space-y-3">
                {footerNavigation.shop.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-4">Support</h3>
              <ul className="space-y-3">
                {footerNavigation.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-4">Company</h3>
              <ul className="space-y-3">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-2">
            <h3 className="font-medium text-foreground mb-4">Follow us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-subtle rounded-md transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Éclat — Lingerie Fine. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}