export default function CTABanner({ onSignup }) {
  return (
    <section className="py-20 px-4">
      <div
        className="max-w-4xl mx-auto rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#1a0a3e 0%,#0a1e3e 100%)",
          border: "1px solid rgba(124,58,237,0.3)",
        }}
      >
        {/* Glow overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(circle at 50% 0%,#7c3aed,transparent 60%)",
          }}
        />

        <h2 className="relative text-3xl sm:text-4xl font-black mb-4">
          Ready to create the future?
        </h2>
        <p className="relative text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
          Join half a million creators using NexaAI to build, grow, and captivate.
        </p>
        <button
          onClick={onSignup}
          className="relative px-10 py-4 rounded-2xl font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 text-base"
          style={{
            background: "linear-gradient(90deg,#7c3aed,#06b6d4)",
            boxShadow: "0 0 40px rgba(124,58,237,0.5)",
          }}
        >
          Get Started for Free →
        </button>

        <p className="relative text-slate-600 text-xs mt-4">
          No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}
