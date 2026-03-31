import { useState } from "react";
import { NAV_LINKS } from "../data/constants";
import { useScrolled } from "../hooks/useScrolled";
import { useTheme } from "../context/ThemeContext";

/* ── Toggle icon ── */
function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative w-14 h-7 rounded-full transition-all duration-300 flex items-center px-1 flex-shrink-0"
      style={{
        background: isDark
          ? "rgba(124,58,237,0.3)"
          : "rgba(99,102,241,0.15)",
        border: isDark
          ? "1px solid rgba(124,58,237,0.5)"
          : "1px solid rgba(99,102,241,0.35)",
      }}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 text-xs select-none" style={{ fontSize: "11px" }}>🌙</span>
      <span className="absolute right-1.5 text-xs select-none" style={{ fontSize: "11px" }}>☀️</span>

      {/* Thumb */}
      <span
        className="relative z-10 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-black shadow-md transition-all duration-300"
        style={{
          background: isDark
            ? "linear-gradient(135deg,#7c3aed,#06b6d4)"
            : "linear-gradient(135deg,#f59e0b,#ef4444)",
          transform: isDark ? "translateX(0px)" : "translateX(28px)",
        }}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}

export default function Navbar({ onLogin, onSignup }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled  = useScrolled(30);
  const { isDark } = useTheme();

  const handleLogin  = () => { onLogin();  setMenuOpen(false); };
  const handleSignup = () => { onSignup(); setMenuOpen(false); };

  const bg     = isDark ? "rgba(8,6,20,0.92)"  : "rgba(255,255,255,0.92)";
  const border = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const linkC  = isDark ? "#94a3b8" : "#4b5563";
  const mobileBg = isDark ? "rgba(8,6,20,0.97)" : "rgba(255,255,255,0.97)";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? bg : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${border}` : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 no-underline">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white"
            style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)" }}>N</div>
          <span className="text-xl font-extrabold tracking-tight" style={{ color: isDark ? "#fff" : "#0f0c1a" }}>
            Nexa<span style={{ color: "#7c3aed" }}>AI</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href}
              className="text-sm font-medium transition-colors duration-200 no-underline hover:text-violet-500"
              style={{ color: linkC }}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <button onClick={onLogin}
            className="px-4 py-2 text-sm font-semibold transition-colors duration-200"
            style={{ color: isDark ? "#cbd5e1" : "#374151" }}>
            Sign In
          </button>
          <button onClick={onSignup}
            className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-opacity duration-200 hover:opacity-90"
            style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)" }}>
            Get Started
          </button>
        </div>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
          {["", "", ""].map((_, i) => (
            <span key={i}
              className="block h-0.5 w-6 transition-all duration-300"
              style={{
                background: isDark ? "#fff" : "#1f2937",
                transform: menuOpen
                  ? i === 0 ? "rotate(45deg) translate(3px,6px)"
                  : i === 1 ? "scaleX(0)"
                  : "rotate(-45deg) translate(3px,-6px)"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-4 py-5 space-y-3"
          style={{ background: mobileBg, borderColor: border }}>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              className="block font-medium py-1 transition-colors duration-200 no-underline hover:text-violet-500"
              style={{ color: linkC }}>
              {l.label}
            </a>
          ))}

          {/* Theme toggle in mobile */}
          <div className="flex items-center gap-3 py-2 border-t" style={{ borderColor: border }}>
            <span className="text-sm font-semibold" style={{ color: linkC }}>
              {isDark ? "Dark Mode" : "Light Mode"}
            </span>
            <ThemeToggle />
          </div>

          <div className="flex flex-col gap-2 border-t pt-3" style={{ borderColor: border }}>
            <button onClick={handleLogin}
              className="w-full py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200"
              style={{ border: `1px solid ${border}`, color: isDark ? "#fff" : "#374151", background: "transparent" }}>
              Sign In
            </button>
            <button onClick={handleSignup}
              className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-opacity duration-200 hover:opacity-90"
              style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)" }}>
              Get Started Free
            </button>
          </div>
        </div>
      )}
    </header>
  );
}