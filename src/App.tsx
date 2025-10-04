// src/App.tsx

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import SizeGuide from "./pages/SizeGuide";
import Wishlist from "./pages/Wishlist";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

import { ConsentBanner } from "./components/tracking/ConsentBanner";
import { useAutoSync } from "./hooks/useAutoSync";
import { trackingService } from "./services/trackingService";

const queryClient = new QueryClient();

const App = () => {
  const [consentGiven, setConsentGiven] = useState(false);

  // On mount: check stored consent and initialize tracking
  useEffect(() => {
    const stored = localStorage.getItem("eclat-consent");
    if (stored) {
      const consents = JSON.parse(stored);
      setConsentGiven(true);

      // Record previous consents in database if needed
      trackingService.recordConsent("analytics", consents.analytics);
      trackingService.recordConsent("location", consents.location);

      // Initial session tracking
      trackingService.trackUserSession({
        requestLocation: consents.location,
        pageUrl: window.location.href,
        referrer: document.referrer,
      });
    }
  }, []);

  // Start automatic background syncing after consent
  if (consentGiven) {
    useAutoSync(); 
  }

  // Handle consent acceptance from banner
  const handleConsent = (consents: { location: boolean; analytics: boolean }) => {
    localStorage.setItem("eclat-consent", JSON.stringify(consents));
    setConsentGiven(true);

    trackingService.recordConsent("analytics", consents.analytics);
    trackingService.recordConsent("location", consents.location);

    trackingService.trackUserSession({
      requestLocation: consents.location,
      pageUrl: window.location.href,
      referrer: document.referrer,
    });
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
          {!consentGiven && <ConsentBanner onConsentGiven={handleConsent} />}
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
        
