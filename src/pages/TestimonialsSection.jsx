import { PRICING_PLANS } from "../data/constants";
import { useTheme } from "../context/ThemeContext";

export default function PricingSection({ onSignup }) {
  const { isDark } = useTheme();
  return (
    <section id="pricing" className="py-20 px-4"
      style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-black mb-4"
          style={{ color: isDark ? "#fff" : "#0f0c1a" }}>Simple Pricing</h2>
        <p className="mb-12" style={{ color: isDark ? "#94a3b8" : "#4b5563" }}>Start free. Scale when you're ready.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRICING_PLANS.map((plan) => (
            <div key={plan.name}
              className="rounded-2xl p-6 transition-transform duration-300 hover:scale-105 flex flex-col"
              style={plan.highlight
                ? {
                    background: isDark
                      ? "linear-gradient(135deg,rgba(124,58,237,0.2),rgba(6,182,212,0.1))"
                      : "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(6,182,212,0.05))",
                    border: "1px solid rgba(124,58,237,0.45)",
                    boxShadow: isDark ? "0 0 40px rgba(124,58,237,0.2)" : "0 4px 30px rgba(124,58,237,0.15)",
                  }
                : {
                    background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.85)",
                    border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                    boxShadow: isDark ? "none" : "0 2px 12px rgba(0,0,0,0.05)",
                  }
              }>
              {plan.highlight && (
                <div className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-2">Most Popular</div>
              )}
              <h3 className="text-xl font-black mb-1" style={{ color: isDark ? "#fff" : "#0f0c1a" }}>{plan.name}</h3>
              <div className="text-4xl font-black mb-0.5" style={{ color: isDark ? "#fff" : "#0f0c1a" }}>{plan.price}</div>
              <div className="text-xs mb-6" style={{ color: isDark ? "#64748b" : "#9ca3af" }}>{plan.period}</div>

              <ul className="space-y-2 mb-6 text-left flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className="text-emerald-400 flex-shrink-0">✓</span>
                    <span style={{ color: isDark ? "#cbd5e1" : "#374151" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <button onClick={onSignup}
                className="w-full py-3 rounded-xl font-bold text-sm transition-opacity duration-200 hover:opacity-90 mt-auto"
                style={plan.highlight
                  ? { background: "linear-gradient(90deg,#7c3aed,#06b6d4)", color: "#fff" }
                  : {
                      background: isDark ? "rgba(255,255,255,0.08)" : "rgba(124,58,237,0.1)",
                      color: isDark ? "#fff" : "#7c3aed",
                      border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(124,58,237,0.2)",
                    }
                }>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}