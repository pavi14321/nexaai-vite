import { STATS } from "../data/constants";
import { useTheme } from "../context/ThemeContext";

export default function StatsSection() {
  const { isDark } = useTheme();
  return (
    <section className="py-12"
      style={{
        background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.5)",
        borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}`,
        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}`,
      }}>
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="text-3xl sm:text-4xl font-black bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#a78bfa,#67e8f9)" }}>{s.value}</div>
            <div className="text-sm mt-1" style={{ color: isDark ? "#64748b" : "#6b7280" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}