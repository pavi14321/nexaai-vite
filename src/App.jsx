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

// Dashboard
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [modal, setModal] = useState(null);   // "login" | "signup" | null
  const [loggedIn, setLoggedIn] = useState(false);

  const openLogin  = () => setModal("login");
  const openSignup = () => setModal("signup");
  const closeModal = () => setModal(null);
  const switchModal = () => setModal((m) => (m === "login" ? "signup" : "login"));

  // Called by Modal when auth succeeds
  const handleAuthSuccess = () => {
    setModal(null);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  // ── Dashboard view ────────────────────────────────────────
  if (loggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  // ── Landing page view ─────────────────────────────────────
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
        <Modal
          type={modal}
          onClose={closeModal}
          onSwitch={switchModal}
          onSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
}