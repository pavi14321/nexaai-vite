import { useState, useRef, useEffect } from "react";

/* ─── Google Icon ─────────────────────────────────────────── */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2045C17.64 8.5663 17.5827 7.9527 17.4764 7.3636H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.2045Z" fill="#4285F4"/>
    <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z" fill="#34A853"/>
    <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.5931 3.68182 9C3.68182 8.4069 3.78409 7.83 3.96409 7.29V4.9582H0.957275C0.347727 6.1731 0 7.5477 0 9C0 10.4523 0.347727 11.8269 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
    <path d="M9 3.5795C10.3214 3.5795 11.5077 4.0336 12.4405 4.9255L15.0218 2.344C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.9582L3.96409 7.29C4.67182 5.1627 6.65591 3.5795 9 3.5795Z" fill="#EA4335"/>
  </svg>
);

/* ─── Spinner ─────────────────────────────────────────────── */
const Spin = () => (
  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
  </svg>
);

/* ─── OTP 6-box Input ─────────────────────────────────────── */
function OTPInput({ value, onChange, hasError }) {
  const inputs = useRef([]);

  const handleChange = (i, e) => {
    const val = e.target.value.replace(/\D/, "").slice(-1);
    const arr = (value + "      ").slice(0, 6).split("");
    arr[i] = val;
    onChange(arr.join("").trimEnd());
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace") {
      const arr = (value + "      ").slice(0, 6).split("");
      if (!arr[i] || arr[i] === " ") {
        if (i > 0) {
          inputs.current[i - 1]?.focus();
          arr[i - 1] = "";
          onChange(arr.join("").trimEnd());
        }
      } else {
        arr[i] = "";
        onChange(arr.join("").trimEnd());
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center my-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="text-center text-xl font-black text-white rounded-xl outline-none transition-all duration-200"
          style={{
            width: "44px",
            height: "52px",
            background: "rgba(255,255,255,0.06)",
            border: hasError
              ? "2px solid #ef4444"
              : value[i]
              ? "2px solid #7c3aed"
              : "1px solid rgba(255,255,255,0.15)",
            boxShadow: value[i] && !hasError ? "0 0 10px rgba(124,58,237,0.35)" : "none",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Password Strength ───────────────────────────────────── */
function PasswordStrength({ password }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#ef4444", "#f59e0b", "#06b6d4", "#10b981"];
  if (!password) return null;
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1,2,3,4].map((n) => (
          <div key={n} className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{ background: n <= score ? colors[score] : "rgba(255,255,255,0.1)" }} />
        ))}
      </div>
      <p className="text-xs font-semibold" style={{ color: colors[score] }}>{labels[score]}</p>
    </div>
  );
}

/* ─── Shared sub-components ───────────────────────────────── */
const AccentBar = () => (
  <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4,#f59e0b)" }} />
);

function ModalHeader({ title, sub, onClose, onBack }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-3">
        {onBack && (
          <button onClick={onBack}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition flex-shrink-0 text-lg">
            ←
          </button>
        )}
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">{title}</h2>
          {sub && <p className="text-slate-400 text-sm mt-0.5">{sub}</p>}
        </div>
      </div>
      <button onClick={onClose} className="text-slate-500 hover:text-white transition text-xl leading-none ml-2 flex-shrink-0 mt-0.5">✕</button>
    </div>
  );
}

function InputField({ label, name, type, value, onChange, placeholder, hint, children }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
        {hint}
      </div>
      <input name={name} type={type || "text"} value={value} onChange={onChange}
        required placeholder={placeholder}
        className="w-full rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-violet-500 transition text-sm"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
      />
      {children}
    </div>
  );
}

function PrimaryBtn({ loading, disabled, label, onClick, type = "submit" }) {
  return (
    <button type={type} onClick={onClick} disabled={loading || disabled}
      className="w-full py-3 rounded-xl font-bold text-white text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-95 mt-2 disabled:opacity-50"
      style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)" }}>
      {loading ? <><Spin /> Please wait…</> : label}
    </button>
  );
}

function SwitchLink({ question, action, onClick }) {
  return (
    <p className="text-center text-slate-500 text-sm mt-5">
      {question}{" "}
      <button onClick={onClick} className="text-violet-400 hover:text-violet-300 font-semibold transition">{action}</button>
    </p>
  );
}

function GoogleButton({ loading, disabled, onClick, label }) {
  return (
    <button onClick={onClick} disabled={loading || disabled} type="button"
      className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:bg-white/10 active:scale-95 disabled:opacity-60 mb-4"
      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
      {loading ? <span className="flex items-center gap-2"><Spin /> Connecting…</span> : <><GoogleIcon />{label}</>}
    </button>
  );
}

function EmailDivider() {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
      <span className="text-slate-600 text-xs font-medium">or continue with email</span>
      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MODAL COMPONENT
════════════════════════════════════════════════════════════ */
export default function Modal({ type: initialType, onClose, onSwitch, onSuccess }) {
  // screens: login | signup | verify-email | forgot-email | forgot-otp | new-password | done | done-nored
  const [screen, setScreen] = useState(initialType);
  const [form, setForm]   = useState({ name: "", email: "", password: "", confirm: "" });
  const [otp, setOtp]     = useState("");
  const [loading, setLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [otpErr, setOtpErr]   = useState(false);
  const [resend, setResend]   = useState(0);
  const [showPw, setShowPw]   = useState(false);
  const [showCf, setShowCf]   = useState(false);
  const [doneMsg, setDoneMsg] = useState({ title: "", sub: "" });

  const setF = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Resend countdown
  useEffect(() => {
    if (resend <= 0) return;
    const t = setTimeout(() => setResend((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resend]);

  const fireOTP = () => { setResend(30); setOtp(""); setOtpErr(false); };

  // ── Helpers ─────────────────────────────────────────────
  const succeed = (title, sub, redirect = true) => {
    setDoneMsg({ title, sub });
    setScreen(redirect ? "done" : "done-nored");
    if (redirect) setTimeout(() => onSuccess?.(), 1400);
  };

  const verifyOTP = (onOk) => {
    if (otp.replace(/\s/g,"").length < 6) { setOtpErr(true); return; }
    setOtpErr(false); setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Demo: correct code = 123456
      if (otp.replace(/\s/g,"") === "123456") onOk();
      else setOtpErr(true);
    }, 1000);
  };

  // ── SCREENS ─────────────────────────────────────────────

  if (screen === "done") return (
    <ModalWrap onClose={onClose}>
      <div className="text-center py-10">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-white mb-2">{doneMsg.title}</h3>
        <p className="text-slate-400 text-sm">{doneMsg.sub}</p>
        <div className="mt-6 flex justify-center">
          <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="#7c3aed" strokeWidth="4"/>
            <path className="opacity-80" fill="#7c3aed" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
        </div>
      </div>
    </ModalWrap>
  );

  if (screen === "done-nored") return (
    <ModalWrap onClose={onClose}>
      <div className="text-center py-8">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-white mb-2">{doneMsg.title}</h3>
        <p className="text-slate-400 text-sm mb-6">{doneMsg.sub}</p>
        <button onClick={() => { setForm((f) => ({...f, password:"", confirm:""})); setScreen("login"); }}
          className="px-8 py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 active:scale-95 transition-all"
          style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)" }}>
          Sign In Now →
        </button>
      </div>
    </ModalWrap>
  );

  /* ── LOGIN ─────────────────────────────────────────────── */
  if (screen === "login") return (
    <ModalWrap onClose={onClose}>
      <ModalHeader title="Sign In" sub="Access your AI workspace" onClose={onClose} />
      <GoogleButton loading={gLoading} disabled={loading} label="Sign in with Google" onClick={() => {
        setGLoading(true);
        setTimeout(() => { setGLoading(false); succeed("Welcome back!", "Opening your dashboard…"); }, 1800);
      }} />
      <EmailDivider />
      <form onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); succeed("Welcome back!", "Opening your dashboard…"); }, 1500); }} className="space-y-4">
        <InputField label="Email" name="email" type="email" value={form.email} onChange={setF} placeholder="you@example.com" />
        <InputField label="Password" name="password" type={showPw ? "text" : "password"} value={form.password} onChange={setF} placeholder="••••••••"
          hint={<button type="button" onClick={() => setShowPw(!showPw)} className="text-xs text-slate-500 hover:text-slate-300 transition">{showPw ? "Hide" : "Show"}</button>}>
          <div className="flex justify-end mt-1.5">
            <button type="button" onClick={() => setScreen("forgot-email")}
              className="text-xs text-violet-400 hover:text-violet-300 font-semibold transition">
              Forgot password?
            </button>
          </div>
        </InputField>
        <PrimaryBtn loading={loading} disabled={gLoading} label="Sign In →" />
      </form>
      <SwitchLink question="Don't have an account?" action="Sign Up" onClick={() => { setScreen("signup"); onSwitch?.(); }} />
    </ModalWrap>
  );

  /* ── SIGNUP ────────────────────────────────────────────── */
  if (screen === "signup") return (
    <ModalWrap onClose={onClose}>
      <ModalHeader title="Create Account" sub="Start creating for free" onClose={onClose} />
      <GoogleButton loading={gLoading} disabled={loading} label="Sign up with Google" onClick={() => {
        setGLoading(true);
        setTimeout(() => { setGLoading(false); succeed("You're in!", "Opening your dashboard…"); }, 1800);
      }} />
      <EmailDivider />
      <form onSubmit={(e) => {
        e.preventDefault();
        if (form.password !== form.confirm) return;
        setLoading(true);
        setTimeout(() => { setLoading(false); fireOTP(); setScreen("verify-email"); }, 1200);
      }} className="space-y-4">
        <InputField label="Full Name" name="name" value={form.name} onChange={setF} placeholder="Jane Doe" />
        <InputField label="Email" name="email" type="email" value={form.email} onChange={setF} placeholder="you@example.com" />
        <InputField label="Password" name="password" type={showPw ? "text" : "password"} value={form.password} onChange={setF} placeholder="Min 8 characters"
          hint={<button type="button" onClick={() => setShowPw(!showPw)} className="text-xs text-slate-500 hover:text-slate-300 transition">{showPw ? "Hide" : "Show"}</button>}>
          <PasswordStrength password={form.password} />
        </InputField>
        <InputField label="Confirm Password" name="confirm" type={showCf ? "text" : "password"} value={form.confirm} onChange={setF} placeholder="Re-enter password"
          hint={<button type="button" onClick={() => setShowCf(!showCf)} className="text-xs text-slate-500 hover:text-slate-300 transition">{showCf ? "Hide" : "Show"}</button>}>
          {form.confirm && form.password !== form.confirm && <p className="text-xs text-red-400 mt-1">Passwords do not match</p>}
          {form.confirm && form.password === form.confirm && form.confirm.length > 0 && <p className="text-xs text-emerald-400 mt-1">✓ Passwords match</p>}
        </InputField>
        <PrimaryBtn loading={loading} disabled={gLoading || form.password !== form.confirm || form.password.length < 8} label="Create Account →" />
      </form>
      <SwitchLink question="Already have an account?" action="Sign In" onClick={() => { setScreen("login"); onSwitch?.(); }} />
    </ModalWrap>
  );

  /* ── VERIFY EMAIL OTP ──────────────────────────────────── */
  if (screen === "verify-email") return (
    <ModalWrap onClose={onClose}>
      <ModalHeader title="Verify Your Email" onClose={onClose} onBack={() => setScreen("signup")}
        sub={<>Code sent to <span className="text-violet-400 font-semibold">{form.email || "your email"}</span></>} />
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-3xl mb-2"
          style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}>📧</div>
        <p className="text-slate-500 text-xs">Enter the 6-digit code below</p>
        <p className="text-slate-600 text-xs mt-1">(Demo: enter <span className="text-violet-400 font-mono font-bold">123456</span>)</p>
      </div>
      <OTPInput value={otp} onChange={(v) => { setOtp(v); setOtpErr(false); }} hasError={otpErr} />
      {otpErr && <p className="text-center text-red-400 text-xs -mt-3 mb-3">Incorrect code — please try again</p>}
      <PrimaryBtn loading={loading} disabled={otp.replace(/\s/g,"").length < 6} label="Verify & Continue →" type="button"
        onClick={() => verifyOTP(() => succeed("Account Created! 🎉", "Your email is verified. Opening dashboard…"))} />
      <ResendRow resend={resend} onClick={fireOTP} />
    </ModalWrap>
  );

  /* ── FORGOT — enter email ──────────────────────────────── */
  if (screen === "forgot-email") return (
    <ModalWrap onClose={onClose}>
      <ModalHeader title="Forgot Password?" sub="Enter your email and we'll send a reset code" onClose={onClose} onBack={() => setScreen("login")} />
      <div className="text-center mb-5">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-3xl"
          style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)" }}>🔐</div>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => { setLoading(false); fireOTP(); setScreen("forgot-otp"); }, 1200);
      }} className="space-y-4">
        <InputField label="Email Address" name="email" type="email" value={form.email} onChange={setF} placeholder="you@example.com" />
        <PrimaryBtn loading={loading} label="Send Reset Code →" />
      </form>
      <SwitchLink question="Remember your password?" action="Sign In" onClick={() => setScreen("login")} />
    </ModalWrap>
  );

  /* ── FORGOT — verify OTP ───────────────────────────────── */
  if (screen === "forgot-otp") return (
    <ModalWrap onClose={onClose}>
      <ModalHeader title="Check Your Email" onClose={onClose} onBack={() => setScreen("forgot-email")}
        sub={<>Reset code sent to <span className="text-violet-400 font-semibold">{form.email}</span></>} />
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-3xl mb-2"
          style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.3)" }}>🔑</div>
        <p className="text-slate-500 text-xs">Enter the 6-digit code to reset your password</p>
        <p className="text-slate-600 text-xs mt-1">(Demo: enter <span className="text-violet-400 font-mono font-bold">123456</span>)</p>
      </div>
      <OTPInput value={otp} onChange={(v) => { setOtp(v); setOtpErr(false); }} hasError={otpErr} />
      {otpErr && <p className="text-center text-red-400 text-xs -mt-3 mb-3">Incorrect code — please try again</p>}
      <PrimaryBtn loading={loading} disabled={otp.replace(/\s/g,"").length < 6} label="Verify Code →" type="button"
        onClick={() => verifyOTP(() => { setForm((f) => ({...f, password:"", confirm:""})); setScreen("new-password"); })} />
      <ResendRow resend={resend} onClick={fireOTP} />
    </ModalWrap>
  );

  /* ── NEW PASSWORD ──────────────────────────────────────── */
  if (screen === "new-password") return (
    <ModalWrap onClose={onClose}>
      <ModalHeader title="Set New Password" sub="Choose a strong new password" onClose={onClose} />
      <div className="text-center mb-5">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-3xl"
          style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)" }}>🛡️</div>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (form.password !== form.confirm) return;
        setLoading(true);
        setTimeout(() => { setLoading(false); succeed("Password Updated!", "You can now sign in with your new password.", false); }, 1200);
      }} className="space-y-4">
        <InputField label="New Password" name="password" type={showPw ? "text" : "password"} value={form.password} onChange={setF} placeholder="Min 8 characters"
          hint={<button type="button" onClick={() => setShowPw(!showPw)} className="text-xs text-slate-500 hover:text-slate-300 transition">{showPw ? "Hide" : "Show"}</button>}>
          <PasswordStrength password={form.password} />
        </InputField>
        <InputField label="Confirm New Password" name="confirm" type={showCf ? "text" : "password"} value={form.confirm} onChange={setF} placeholder="Re-enter new password"
          hint={<button type="button" onClick={() => setShowCf(!showCf)} className="text-xs text-slate-500 hover:text-slate-300 transition">{showCf ? "Hide" : "Show"}</button>}>
          {form.confirm && form.password !== form.confirm && <p className="text-xs text-red-400 mt-1">Passwords do not match</p>}
          {form.confirm && form.password === form.confirm && form.confirm.length > 0 && <p className="text-xs text-emerald-400 mt-1">✓ Passwords match</p>}
        </InputField>
        <PrimaryBtn loading={loading} disabled={form.password !== form.confirm || form.password.length < 8} label="Update Password →" />
      </form>
    </ModalWrap>
  );

  return null;
}

/* ─── Resend row ──────────────────────────────────────────── */
function ResendRow({ resend, onClick }) {
  return (
    <div className="text-center mt-4">
      <p className="text-slate-500 text-xs">
        Didn't receive the code?{" "}
        <button onClick={onClick} disabled={resend > 0}
          className="font-semibold transition"
          style={{ color: resend > 0 ? "#475569" : "#a78bfa" }}>
          {resend > 0 ? `Resend in ${resend}s` : "Resend Code"}
        </button>
      </p>
    </div>
  );
}

/* ─── Modal wrapper ───────────────────────────────────────── */
function ModalWrap({ onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}>
      <div className="w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        style={{ background: "linear-gradient(135deg,#0f0c1a 0%,#12101f 100%)" }}
        onClick={(e) => e.stopPropagation()}>
        <AccentBar />
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}