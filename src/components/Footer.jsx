import { FOOTER_COLUMNS } from "../data/constants";

const SOCIAL_ICONS = [
  { icon: "𝕏", label: "Twitter / X" },
  { icon: "in", label: "LinkedIn" },
  { icon: "▶", label: "YouTube" },
  { icon: "◉", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-white/5 pt-12 pb-8 px-4"
      style={{ background: "rgba(0,0,0,0.4)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white"
                style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)" }}
              >
                N
              </div>
              <span className="text-lg font-extrabold">
                Nexa<span style={{ color: "#7c3aed" }}>AI</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              The all-in-one AI creative platform for the next generation of creators.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white text-sm transition-colors duration-200 no-underline"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">© 2026 NexaAI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {SOCIAL_ICONS.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="text-slate-600 hover:text-white transition-colors duration-200 text-sm no-underline"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
