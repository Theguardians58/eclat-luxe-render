import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import SearchModal from '@/components/search/SearchModal';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-20">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <SearchModal />
    </div>
  );
}