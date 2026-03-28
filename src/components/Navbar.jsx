import { useState } from "react";
import { NAV_LINKS } from "../data/constants";
import { useScrolled } from "../hooks/useScrolled";

export default function Navbar({ onLogin, onSignup }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(30);

  const handleLogin = () => {
    onLogin();
    setMenuOpen(false);
  };
  const handleSignup = () => {
    onSignup();
    setMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8,6,20,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 no-underline">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white"
            style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)" }}
          >
            N
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            Nexa<span style={{ color: "#7c3aed" }}>AI</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200 no-underline"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleLogin}
            className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
          >
            Sign In
          </button>
          <button
            onClick={handleSignup}
            className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-opacity duration-200 hover:opacity-90"
            style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)" }}
          >
            Get Started
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-white/10 px-4 py-5 space-y-3"
          style={{ background: "rgba(8,6,20,0.97)" }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block text-slate-300 hover:text-white font-medium py-1 transition-colors duration-200 no-underline"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2 border-t border-white/10">
            <button
              onClick={handleLogin}
              className="w-full py-2.5 rounded-xl border border-white/10 text-sm font-semibold text-white hover:bg-white/5 transition-colors duration-200"
            >
              Sign In
            </button>
            <button
              onClick={handleSignup}
              className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-opacity duration-200 hover:opacity-90"
              style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)" }}
            >
              Get Started Free
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
