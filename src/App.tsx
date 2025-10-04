import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/layout/Layout";
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
import { ConsentBanner } from "./components/tracking/ConsentBanner";
import { trackingService } from "./services/trackingService";

const queryClient = new QueryClient();

const App = () => {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem('eclat-consent');
    if (consent) {
      setConsentGiven(true);
      initializeTracking(JSON.parse(consent));
    }
  }, []);

  const initializeTracking = async (consents: { location: boolean; analytics: boolean }) => {
    if (consents.analytics) {
      await trackingService.trackUserSession({
        requestLocation: consents.location,
        pageUrl: window.location.href,
        referrer: document.referrer,
      });
    }
  };

  const handleConsentGiven = (consents: { location: boolean; analytics: boolean }) => {
    setConsentGiven(true);
    initializeTracking(consents);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/size-guide" element={<SizeGuide />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          <Toaster />
          <Sonner />
          {!consentGiven && <ConsentBanner onConsentGiven={handleConsentGiven} />}
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
                                         
