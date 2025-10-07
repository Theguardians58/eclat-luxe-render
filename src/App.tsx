import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { useUserTracking } from "./hooks/useUserTracking";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import SizeGuide from "./pages/SizeGuide";
import Wishlist from "./pages/Wishlist";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Welcome from "./pages/Welcome";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Sustainability from "./pages/Sustainability";
import Careers from "./pages/Careers";
import FAQ from "./pages/FAQ";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  useUserTracking();
  return null;
};

const App = () => {
  const [shouldShowWelcome, setShouldShowWelcome] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    setShouldShowWelcome(!hasVisited);
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          {shouldShowWelcome ? (
            <Welcome />
          ) : (
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/collections" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/size-guide" element={<SizeGuide />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/account" element={<Account />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/sustainability" element={<Sustainability />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
