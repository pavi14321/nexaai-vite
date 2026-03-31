import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

import HeroSection from "./pages/HeroSection";
import StatsSection from "./pages/StatsSection";
import FeaturesSection from "./pages/FeaturesSection";
import HowItWorksSection from "./pages/HowItWorksSection";
import TestimonialsSection from "./pages/TestimonialsSection";
import PricingSection from "./pages/PricingSection";
import CTABanner from "./pages/CTABanner";
import Dashboard from "./pages/Dashboard";

function AppContent() {
  const [modal, setModal]   = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const openLogin   = () => setModal("login");
  const openSignup  = () => setModal("signup");
  const closeModal  = () => setModal(null);
  const switchModal = () => setModal((m) => (m === "login" ? "signup" : "login"));

  const handleAuthSuccess = () => { setModal(null); setLoggedIn(true); };
  const handleLogout      = () => setLoggedIn(false);

  if (loggedIn) return <Dashboard onLogout={handleLogout} />;

  return (
    <>
      <Navbar onLogin={openLogin} onSignup={openSignup} />
      <main>
        <HeroSection     onSignup={openSignup} onLogin={openLogin} />
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

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}