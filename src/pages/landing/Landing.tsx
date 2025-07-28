import CTASection from "@/features/landing/components/CTASection";
import DemoSection from "@/features/landing/components/DemoSection";
import FeatureSection from "@/features/landing/components/FeatureSection";
import Footer from "@/features/landing/components/Footer";
import Header from "@/features/landing/components/Header";
import HeroSection from "@/features/landing/components/HeroSection";
import Pricing from "@/features/landing/components/Pricing";
import Testimonials from "@/features/landing/components/Testimonials";
import Value from "@/features/landing/components/Value";
import { Box } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router";

export default function LandingPage() {
  const refresh_token = Cookies.get("refresh_token");
  const location = useLocation();
  if (refresh_token) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  return (
    <Box minH="100vh" bg="gray.50">
      <Header />
      <HeroSection />
      <FeatureSection />
      <DemoSection />
      <Testimonials />
      <Value />
      <Pricing />
      <CTASection />
      <Footer />
    </Box>
  );
}
