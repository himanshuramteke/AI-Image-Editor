import CtaSection from "@/components/cta";
import FeaturesSection from "@/components/features";
import Footer from "@/components/footer";
import HeroSection from "@/components/Hero";
import InteractiveStats from "@/components/interactive-stats";
import PricingSection from "@/components/pricing";

export default function Home() {
  return (
    <div className="pt-36">
      <HeroSection />

      <InteractiveStats />

      <FeaturesSection />

      <PricingSection />

      <CtaSection />

      <Footer />
    </div>
  );
}
