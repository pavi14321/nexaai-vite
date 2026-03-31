import { FEATURES } from "../data/constants";
import { useTheme } from "../context/ThemeContext";

export default function HeroSection({ onSignup, onLogin }) {
  const { isDark } = useTheme();

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden"
      style={{ background: isDark ? "#080614" : "#f1f0f7" }}>

      {/* Glow blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle,#7c3aed,transparent)", opacity: isDark ? 0.2 : 0.12 }} />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle,#06b6d4,transparent)", opacity: isDark ? 0.15 : 0.1 }} />
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle,#f59e0b,transparent)", opacity: isDark ? 0.1 : 0.07 }} />
      </div>

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(${isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)"} 1px,transparent 1px),linear-gradient(90deg,${isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)"} 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

      <div className="relative max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
          style={{
            border: "1px solid rgba(124,58,237,0.4)",
            background: "rgba(124,58,237,0.1)",
            color: "#a78bfa",
          }}>
          ✦ All-in-One AI Creative Suite
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6"
          style={{ color: isDark ? "#fff" : "#0f0c1a" }}>
          Create Anything with
          <br />
          <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg,#a78bfa,#67e8f9,#fcd34d)" }}>
            Artificial Intelligence
          </span>
        </h1>

        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: isDark ? "#94a3b8" : "#4b5563" }}>
          Images. Videos. Content. Chat. Everything you need to create, communicate,
          and captivate — powered by next-generation AI, in one seamless platform.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button onClick={onSignup}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white text-base transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)", boxShadow: "0 0 40px rgba(124,58,237,0.4)" }}>
            Start Creating Free →
          </button>
          <button onClick={onLogin}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.8)",
              border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.1)",
              color: isDark ? "#cbd5e1" : "#374151",
            }}>
            Sign In
          </button>
        </div>

        <p className="text-xs mt-4" style={{ color: isDark ? "#334155" : "#9ca3af" }}>
          No credit card required · Free forever plan
        </p>

        {/* Feature preview cards */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {FEATURES.map((f) => (
            <div key={f.title}
              className={`rounded-2xl border p-4 text-left transition-transform duration-200 hover:scale-105`}
              style={{
                background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
                backdropFilter: "blur(12px)",
              }}>
              <div className="text-2xl mb-2">{f.icon}</div>
              <p className={`text-xs font-bold bg-clip-text text-transparent bg-gradient-to-r ${f.color}`}>
                {f.title.replace("AI ","").replace(" Creator","").replace(" Assistant","")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}