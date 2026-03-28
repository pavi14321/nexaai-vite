import { useState } from "react";

export default function Modal({ type, onClose, onSwitch }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handle = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        style={{ background: "linear-gradient(135deg,#0f0c1a 0%,#12101f 100%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent bar */}
        <div
          className="h-1 w-full"
          style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4,#f59e0b)" }}
        />

        <div className="p-8">
          {done ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {type === "login" ? "Welcome back!" : "You're in!"}
              </h3>
              <p className="text-slate-400">Redirecting to your dashboard…</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    {type === "login" ? "Sign In" : "Create Account"}
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    {type === "login"
                      ? "Access your AI workspace"
                      : "Start creating for free"}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-500 hover:text-white transition text-xl leading-none"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={submit} className="space-y-4">
                {type === "signup" && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handle}
                      required
                      placeholder="Jane Doe"
                      className="w-full rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-violet-500 transition text-sm"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handle}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-violet-500 transition text-sm"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handle}
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-violet-500 transition text-sm"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-bold text-white text-sm tracking-wide transition-all duration-200 hover:opacity-90 active:scale-95 mt-2 disabled:opacity-60"
                  style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)" }}
                >
                  {loading
                    ? "Please wait…"
                    : type === "login"
                    ? "Sign In →"
                    : "Create Account →"}
                </button>
              </form>

              <p className="text-center text-slate-500 text-sm mt-5">
                {type === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={onSwitch}
                  className="text-violet-400 hover:text-violet-300 font-semibold transition"
                >
                  {type === "login" ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
