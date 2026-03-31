import { FEATURES } from "../data/constants";
import { useTheme } from "../context/ThemeContext";

export default function FeaturesSection({ onSignup }) {
  const { isDark } = useTheme();
  return (
    <section id="features" className="py-24 px-4"
      style={{ background: isDark ? "#080614" : "#f1f0f7" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4"
            style={{ color: isDark ? "#fff" : "#0f0c1a" }}>
            One Platform,{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#a78bfa,#67e8f9)" }}>
              Infinite Creativity
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-lg" style={{ color: isDark ? "#94a3b8" : "#4b5563" }}>
            Stop switching between tools. NexaAI brings every creative superpower under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title}
              className="rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{
                background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.85)",
                border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
                backdropFilter: "blur(12px)",
                boxShadow: isDark ? "none" : "0 2px 16px rgba(0,0,0,0.06)",
              }}>
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className={`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${f.color} mb-2`}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: isDark ? "#94a3b8" : "#4b5563" }}>{f.desc}</p>
              <div className="mt-4">
                <button onClick={onSignup}
                  className={`text-xs font-semibold bg-clip-text text-transparent bg-gradient-to-r ${f.color} hover:underline`}>
                  Try it free →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}