import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/collections" element={<Shop />} />
            <Route path="/about" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-serif">About - Coming Soon</h1></div>} />
            <Route path="/size-guide" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-serif">Size Guide - Coming Soon</h1></div>} />
            <Route path="/contact" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-serif">Contact - Coming Soon</h1></div>} />
            <Route path="/wishlist" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-serif">Wishlist - Coming Soon</h1></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
