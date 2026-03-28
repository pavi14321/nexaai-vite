import { PRICING_PLANS } from "../data/constants";

export default function PricingSection({ onSignup }) {
  return (
    <section
      id="pricing"
      className="py-20 px-4"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-black mb-4">Simple Pricing</h2>
        <p className="text-slate-400 mb-12">Start free. Scale when you're ready.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className="rounded-2xl p-6 border transition-transform duration-300 hover:scale-105 flex flex-col"
              style={{
                background: plan.highlight
                  ? "linear-gradient(135deg,rgba(124,58,237,0.2),rgba(6,182,212,0.1))"
                  : "rgba(255,255,255,0.03)",
                border: plan.highlight
                  ? "1px solid rgba(124,58,237,0.5)"
                  : "1px solid rgba(255,255,255,0.08)",
                boxShadow: plan.highlight
                  ? "0 0 40px rgba(124,58,237,0.2)"
                  : "none",
              }}
            >
              {plan.highlight && (
                <div className="text-xs font-bold text-violet-300 uppercase tracking-widest mb-2">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-black mb-1">{plan.name}</h3>
              <div className="text-4xl font-black mb-0.5">{plan.price}</div>
              <div className="text-slate-500 text-xs mb-6">{plan.period}</div>

              <ul className="space-y-2 mb-6 text-left flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-emerald-400 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={onSignup}
                className="w-full py-3 rounded-xl font-bold text-sm transition-opacity duration-200 hover:opacity-90 mt-auto"
                style={
                  plan.highlight
                    ? {
                        background: "linear-gradient(90deg,#7c3aed,#06b6d4)",
                        color: "#fff",
                      }
                    : {
                        background: "rgba(255,255,255,0.08)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }
                }
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
