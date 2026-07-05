import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import Index from "./pages/Index.tsx";
import Products from "./pages/Products.tsx";

import ProductDetail from "./pages/ProductDetail.tsx";
import Materials from "./pages/Materials.tsx";
import Projects from "./pages/Projects.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import About from "./pages/About.tsx";
import Craft from "./pages/Craft.tsx";
import Faq from "./pages/Faq.tsx";
import Contact from "./pages/Contact.tsx";
import Legal from "./pages/Legal.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminPages from "./admin/AdminPages";
import AdminBlog from "./admin/AdminBlog";
import AdminProducts from "./admin/AdminProducts";
import AdminFaq from "./admin/AdminFaq";
import AdminAuthors from "./admin/AdminAuthors";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            
            <Route path="/materials" element={<Materials />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/savoir-faire" element={<Craft />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="pages" element={<AdminPages />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="faq" element={<AdminFaq />} />
              <Route path="authors" element={<AdminAuthors />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppButton />
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
