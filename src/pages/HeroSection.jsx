import { FEATURES } from "../data/constants";

export default function HeroSection({ onSignup, onLogin }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle,#7c3aed,transparent)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle,#06b6d4,transparent)" }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle,#f59e0b,transparent)" }}
        />
      </div>

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
          style={{
            border: "1px solid rgba(124,58,237,0.4)",
            background: "rgba(124,58,237,0.1)",
            color: "#a78bfa",
          }}
        >
          ✦ All-in-One AI Creative Suite
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6">
          Create Anything with
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg,#a78bfa,#67e8f9,#fcd34d)",
            }}
          >
            Artificial Intelligence
          </span>
        </h1>

        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Images. Videos. Content. Chat. Everything you need to create, communicate,
          and captivate — powered by next-generation AI, in one seamless platform.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={onSignup}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white text-base transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(90deg,#7c3aed,#06b6d4)",
              boxShadow: "0 0 40px rgba(124,58,237,0.4)",
            }}
          >
            Start Creating Free →
          </button>
          <button
            onClick={onLogin}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-slate-300 hover:text-white text-base border border-white/10 hover:border-white/20 transition-all duration-200 bg-white/5 hover:bg-white/10"
          >
            Sign In
          </button>
        </div>

        <p className="text-slate-600 text-xs mt-4">
          No credit card required · Free forever plan
        </p>

        {/* Feature cards */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`${f.bg} rounded-2xl border ${f.border} p-4 text-left transition-transform duration-200 hover:scale-105`}
              style={{ backdropFilter: "blur(12px)" }}
            >
              <div className="text-2xl mb-2">{f.icon}</div>
              <p
                className={`text-xs font-bold bg-clip-text text-transparent bg-gradient-to-r ${f.color}`}
              >
                {f.title
                  .replace("AI ", "")
                  .replace(" Creator", "")
                  .replace(" Assistant", "")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
