import { STATS } from "../data/constants";

export default function StatsSection() {
  return (
    <section
      className="py-12 border-y border-white/5"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {STATS.map((s) => (
          <div key={s.label}>
            <div
              className="text-3xl sm:text-4xl font-black bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#a78bfa,#67e8f9)" }}
            >
              {s.value}
            </div>
            <div className="text-slate-500 text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
