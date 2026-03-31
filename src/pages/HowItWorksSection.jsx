import { HOW_IT_WORKS } from "../data/constants";
import { useTheme } from "../context/ThemeContext";

export default function HowItWorksSection() {
  const { isDark } = useTheme();
  return (
    <section className="py-20 px-4"
      style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-black mb-12"
          style={{ color: isDark ? "#fff" : "#0f0c1a" }}>
          Up and running in{" "}
          <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg,#fcd34d,#f59e0b)" }}>3 steps</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((s) => (
            <div key={s.step} className="relative">
              <div className="text-6xl font-black opacity-10 absolute -top-3 left-1/2 -translate-x-1/2 select-none pointer-events-none"
                style={{ color: "#7c3aed" }}>{s.step}</div>
              <div className="relative rounded-2xl p-6"
                style={{
                  background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.85)",
                  border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
                  boxShadow: isDark ? "none" : "0 2px 12px rgba(0,0,0,0.05)",
                }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white mb-4 mx-auto"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)" }}>{s.step}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: isDark ? "#fff" : "#0f0c1a" }}>{s.title}</h3>
                <p className="text-sm" style={{ color: isDark ? "#94a3b8" : "#4b5563" }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}