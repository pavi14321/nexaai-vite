import { useState } from "react";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.64 9.2045C17.64 8.5663 17.5827 7.9527 17.4764 7.3636H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.2045Z" fill="#4285F4"/>
    <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z" fill="#34A853"/>
    <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.5931 3.68182 9C3.68182 8.4069 3.78409 7.83 3.96409 7.29V4.9582H0.957275C0.347727 6.1731 0 7.5477 0 9C0 10.4523 0.347727 11.8269 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
    <path d="M9 3.5795C10.3214 3.5795 11.5077 4.0336 12.4405 4.9255L15.0218 2.344C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.9582L3.96409 7.29C4.67182 5.1627 6.65591 3.5795 9 3.5795Z" fill="#EA4335"/>
  </svg>
);

export default function Modal({ type, onClose, onSwitch, onSuccess }) {
  const [form, setForm]               = useState({ name: "", email: "", password: "" });
  const [loading, setLoading]         = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [done, setDone]               = useState(false);

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Shared success handler — shows the celebration screen, then navigates
  const succeed = () => {
    setDone(true);
    setTimeout(() => {
      if (onSuccess) onSuccess();
    }, 1200);
  };

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      succeed();
    }, 1500);
  };

  const handleGoogle = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      succeed();
    }, 1800);
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
          {/* ── Success screen ── */}
          {done ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {type === "login" ? "Welcome back!" : "You're in!"}
              </h3>
              <p className="text-slate-400 text-sm">Opening your dashboard…</p>
              <div className="mt-6 flex justify-center">
                <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-20" cx="12" cy="12" r="10" stroke="#7c3aed" strokeWidth="4"/>
                  <path className="opacity-80" fill="#7c3aed" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    {type === "login" ? "Sign In" : "Create Account"}
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    {type === "login" ? "Access your AI workspace" : "Start creating for free"}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-500 hover:text-white transition text-xl leading-none"
                >
                  ✕
                </button>
              </div>

              {/* Google Button */}
              <button
                onClick={handleGoogle}
                disabled={googleLoading || loading}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:bg-white/10 active:scale-95 disabled:opacity-60 mb-4"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {googleLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Connecting…
                  </span>
                ) : (
                  <>
                    <GoogleIcon />
                    {type === "login" ? "Sign in with Google" : "Sign up with Google"}
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                <span className="text-slate-600 text-xs font-medium">or continue with email</span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
              </div>

              {/* Form */}
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
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
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
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Password
                    </label>
                    {type === "login" && (
                      <button type="button" className="text-xs text-violet-400 hover:text-violet-300 transition">
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handle}
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-violet-500 transition text-sm"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || googleLoading}
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
                {type === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
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