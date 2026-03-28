import { HOW_IT_WORKS } from "../data/constants";

export default function HowItWorksSection() {
  return (
    <section
      className="py-20 px-4"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-black mb-12">
          Up and running in{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg,#fcd34d,#f59e0b)" }}
          >
            3 steps
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((s) => (
            <div key={s.step} className="relative">
              {/* Background step number */}
              <div
                className="text-6xl font-black opacity-10 absolute -top-3 left-1/2 -translate-x-1/2 select-none pointer-events-none"
                style={{ color: "#7c3aed" }}
              >
                {s.step}
              </div>
              <div
                className="relative rounded-2xl p-6 border border-white/10"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white mb-4 mx-auto"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)" }}
                >
                  {s.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
