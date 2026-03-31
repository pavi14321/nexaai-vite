import { useTheme } from "../context/ThemeContext";

export default function CTABanner({ onSignup }) {
  const { isDark } = useTheme();
  return (
    <section className="py-20 px-4" style={{ background: isDark ? "#080614" : "#f1f0f7" }}>
      <div className="max-w-4xl mx-auto rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden"
        style={{
          background: isDark
            ? "linear-gradient(135deg,#1a0a3e 0%,#0a1e3e 100%)"
            : "linear-gradient(135deg,#ede9fe 0%,#dbeafe 100%)",
          border: isDark ? "1px solid rgba(124,58,237,0.3)" : "1px solid rgba(124,58,237,0.2)",
          boxShadow: isDark ? "none" : "0 8px 40px rgba(124,58,237,0.12)",
        }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 0%,#7c3aed,transparent 60%)" }} />

        <h2 className="relative text-3xl sm:text-4xl font-black mb-4"
          style={{ color: isDark ? "#fff" : "#1e1b4b" }}>
          Ready to create the future?
        </h2>
        <p className="relative mb-8 max-w-lg mx-auto leading-relaxed"
          style={{ color: isDark ? "#94a3b8" : "#4338ca" }}>
          Join half a million creators using NexaAI to build, grow, and captivate.
        </p>
        <button onClick={onSignup}
          className="relative px-10 py-4 rounded-2xl font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 text-base"
          style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)", boxShadow: "0 0 40px rgba(124,58,237,0.4)" }}>
          Get Started for Free →
        </button>
        <p className="relative text-xs mt-4" style={{ color: isDark ? "#475569" : "#6d28d9" }}>
          No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}