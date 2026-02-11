import FloatingOrbs from "./components/effects/FloatingOrbs";
import NoiseOverlay from "./components/effects/NoiseOverlay";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import InsuranceTypes from "./components/sections/InsuranceTypes";
import HowItWorks from "./components/sections/HowItWorks";
import TrustSection from "./components/sections/TrustSection";
import ChatbotEmbed from "./components/sections/ChatbotEmbed";
import FAQ from "./components/sections/FAQ";
import FinalCTA from "./components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <FloatingOrbs />
      <NoiseOverlay />
      <Navbar />
      <main>
        <Hero />
        <InsuranceTypes />
        <HowItWorks />
        <TrustSection />
        <ChatbotEmbed />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
