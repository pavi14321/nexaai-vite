import { useState } from "react";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

// Page Sections
import HeroSection from "./pages/HeroSection";
import StatsSection from "./pages/StatsSection";
import FeaturesSection from "./pages/FeaturesSection";
import HowItWorksSection from "./pages/HowItWorksSection";
import TestimonialsSection from "./pages/TestimonialsSection";
import PricingSection from "./pages/PricingSection";
import CTABanner from "./pages/CTABanner";

export default function App() {
  const [modal, setModal] = useState(null); // "login" | "signup" | null

  const openLogin  = () => setModal("login");
  const openSignup = () => setModal("signup");
  const closeModal = () => setModal(null);
  const switchModal = () => setModal((m) => (m === "login" ? "signup" : "login"));

  return (
    <>
      <Navbar onLogin={openLogin} onSignup={openSignup} />

      <main>
        <HeroSection    onSignup={openSignup} onLogin={openLogin} />
        <StatsSection />
        <FeaturesSection onSignup={openSignup} />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection  onSignup={openSignup} />
        <CTABanner       onSignup={openSignup} />
      </main>

      <Footer />

      {modal && (
        <Modal type={modal} onClose={closeModal} onSwitch={switchModal} />
      )}
    </>
  );
}
