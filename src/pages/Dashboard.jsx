import { useState, useEffect, useRef } from "react";

/* ─── Loader (inlined — no separate file needed) ────────────── */
function Loader({ size = "md", text = "", overlay = false }) {
  const dims = {
    sm: { w: "20px", h: "20px", border: "2px", dot: "4px" },
    md: { w: "36px", h: "36px", border: "2px", dot: "6px" },
    lg: { w: "56px", h: "56px", border: "3px", dot: "8px" },
  }[size];

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative" style={{ width: dims.w, height: dims.h }}>
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `${dims.border} solid rgba(124,58,237,0.15)`,
            borderTopColor: "#7c3aed",
            animation: "nexa-spin 0.8s linear infinite",
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `${dims.border} solid transparent`,
            borderBottomColor: "#06b6d4",
            animation: "nexa-spin 1.2s linear infinite reverse",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: dims.dot,
            height: dims.dot,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
            animation: "nexa-pulse 1s ease-in-out infinite",
          }}
        />
      </div>
      {text && (
        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#a78bfa" }}>
          {text}
        </span>
      )}
      <style>{`
        @keyframes nexa-spin { to { transform: rotate(360deg); } }
        @keyframes nexa-pulse {
          0%,100% { opacity:1; transform:translate(-50%,-50%) scale(1); }
          50%      { opacity:.4; transform:translate(-50%,-50%) scale(.55); }
        }
      `}</style>
    </div>
  );

  if (overlay) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-20 rounded-2xl"
        style={{ background: "rgba(8,6,20,0.75)", backdropFilter: "blur(6px)" }}>
        {spinner}
      </div>
    );
  }
  return spinner;
}

/* ─── palette constants ────────────────────────────────────── */
const G  = "linear-gradient(90deg,#7c3aed,#06b6d4)";
const G2 = "linear-gradient(135deg,#7c3aed,#06b6d4)";

/* ─── mock user ─────────────────────────────────────────────── */
const USER = {
  name: "Praveen Kumar",
  email: "praveen@nexaai.com",
  avatar: "PK",
  plan: "Pro",
  joined: "Jan 2025",
};

/* ─── mock data ─────────────────────────────────────────────── */
const CREDITS = {
  images: { used: 340, total: 999 },
  videos: { used: 47,  total: 100 },
  words:  { used: 82400, total: null },
  chat:   { used: 1204,  total: null },
};

const RECENT_IMAGES = [
  { id: 1, prompt: "Cyberpunk city at dusk, neon rain",      style: "Cinematic",     time: "2 min ago"  },
  { id: 2, prompt: "Abstract fluid art, violet and cyan",    style: "Abstract",      time: "1 hr ago"   },
  { id: 3, prompt: "Portrait of a samurai in fog",           style: "Photorealistic",time: "3 hr ago"   },
  { id: 4, prompt: "Futuristic dashboard UI concept",        style: "Concept Art",   time: "Yesterday"  },
];

const RECENT_VIDEOS = [
  { id: 1, title: "Product Launch Teaser",  duration: "0:24", status: "ready",      time: "30 min ago" },
  { id: 2, title: "Cinematic Travel Reel",  duration: "0:58", status: "ready",      time: "2 hr ago"   },
  { id: 3, title: "Brand Story Short",      duration: "1:12", status: "processing", time: "3 hr ago"   },
];

const ACTIVITY = [
  { icon: "🎨", label: "Generated 4 images",          time: "Today 10:22 AM"   },
  { icon: "🎬", label: "Created video clip",           time: "Today 9:45 AM"    },
  { icon: "✍️", label: "Wrote 2,400 words",            time: "Today 9:00 AM"    },
  { icon: "💬", label: "Chat session — 18 messages",   time: "Yesterday 8:30 PM"},
  { icon: "⬆️", label: "Upgraded to Pro plan",         time: "Mar 15, 2025"     },
];

const TOOLS = [
  { key: "overview", label: "Overview",      icon: "◈" },
  { key: "images",   label: "Image Studio",  icon: "🎨" },
  { key: "videos",   label: "Video Studio",  icon: "🎬" },
  { key: "content",  label: "Content AI",    icon: "✍️" },
  { key: "chat",     label: "AI Chat",       icon: "💬" },
  { key: "credits",  label: "Credits",       icon: "⚡" },
  { key: "profile",  label: "Profile",       icon: "👤" },
];

/* ─── StatCard ───────────────────────────────────────────────── */
function StatCard({ label, value, sub, color, delay = 0 }) {
  return (
    <div className="rounded-2xl p-5 border border-white/8 relative overflow-hidden"
      style={{ background: "rgba(255,255,255,0.03)", animation: `fadeUp 0.5s ease ${delay}ms both` }}>
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 blur-2xl pointer-events-none"
        style={{ background: color }} />
      <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">{label}</p>
      <p className="text-3xl font-black text-white">{value}</p>
      {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
    </div>
  );
}

/* ─── CreditBar ──────────────────────────────────────────────── */
function CreditBar({ label, used, total, color }) {
  const pct = total ? Math.round((used / total) * 100) : null;
  return (
    <div className="mb-5">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-slate-400 font-semibold">{label}</span>
        <span className="text-slate-500">
          {used.toLocaleString()} {total ? `/ ${total.toLocaleString()}` : "(unlimited)"}
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: pct ? `${pct}%` : "100%", background: pct ? color : "rgba(124,58,237,0.2)" }} />
      </div>
    </div>
  );
}

/* ─── SECTION: Overview ─────────────────────────────────────── */
function OverviewSection({ setActive }) {
  return (
    <div style={{ animation: "fadeUp 0.4s ease both" }}>
      <div className="mb-8">
        <h2 className="text-2xl font-black text-white mb-1">Good morning, {USER.name.split(" ")[0]} 👋</h2>
        <p className="text-slate-500 text-sm">Here's what's happening with your creative workspace.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Images Created" value="340"  sub="This month"    color="#7c3aed" delay={0}   />
        <StatCard label="Videos Created" value="47"   sub="This month"    color="#06b6d4" delay={80}  />
        <StatCard label="Words Written"  value="82K"  sub="Unlimited plan" color="#f59e0b" delay={160} />
        <StatCard label="Chat Messages"  value="1.2K" sub="All time"      color="#10b981" delay={240} />
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Create</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "New Image",     icon: "🎨", key: "images",  color: "from-violet-500/20 to-fuchsia-500/10", border: "border-violet-500/25" },
            { label: "New Video",     icon: "🎬", key: "videos",  color: "from-cyan-500/20 to-blue-500/10",      border: "border-cyan-500/25"   },
            { label: "Write Content", icon: "✍️", key: "content", color: "from-amber-500/20 to-orange-500/10",   border: "border-amber-500/25"  },
            { label: "Ask AI",        icon: "💬", key: "chat",    color: "from-emerald-500/20 to-teal-500/10",   border: "border-emerald-500/25"},
          ].map((t) => (
            <button key={t.key} onClick={() => setActive(t.key)}
              className={`rounded-2xl p-5 border ${t.border} bg-gradient-to-br ${t.color} text-left hover:scale-105 transition-all duration-200 active:scale-95`}>
              <div className="text-3xl mb-2">{t.icon}</div>
              <p className="text-sm font-bold text-white">{t.label}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Recent Activity</h3>
        <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
          {ACTIVITY.map((a, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors">
              <span className="text-xl">{a.icon}</span>
              <div className="flex-1"><p className="text-sm text-white font-medium">{a.label}</p></div>
              <p className="text-xs text-slate-600">{a.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION: Image Studio ──────────────────────────────────── */
function ImageSection() {
  const [prompt, setPrompt]       = useState("");
  const [style, setStyle]         = useState("Cinematic");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated]   = useState(false);

  const STYLES = ["Cinematic","Abstract","Photorealistic","Anime","Concept Art","Watercolor"];
  const GALLERY_GRADIENTS = [
    "linear-gradient(135deg,#1e0a3e,#0a1030,#3a1060)",
    "linear-gradient(135deg,#0a2040,#062030,#104060)",
    "linear-gradient(135deg,#2a0a10,#1a0520,#400a30)",
    "linear-gradient(135deg,#0a3020,#052015,#103040)",
  ];

  const generate = () => {
    if (!prompt.trim()) return;
    setGenerating(true); setGenerated(false);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 2500);
  };

  return (
    <div style={{ animation: "fadeUp 0.4s ease both" }}>
      <h2 className="text-2xl font-black text-white mb-1">Image Studio</h2>
      <p className="text-slate-500 text-sm mb-7">Generate breathtaking visuals from text prompts.</p>

      <div className="rounded-2xl border border-violet-500/25 p-6 mb-8" style={{ background: "rgba(124,58,237,0.06)" }}>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your image… e.g. 'A neon-lit Tokyo alley in heavy rain, cinematic bokeh'"
          rows={3} className="w-full rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-violet-500 transition text-sm resize-none mb-4"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
        <div className="flex flex-wrap gap-2 mb-4">
          {STYLES.map((s) => (
            <button key={s} onClick={() => setStyle(s)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
              style={style === s
                ? { background: G, color: "#fff" }
                : { background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }}>
              {s}
            </button>
          ))}
        </div>
        <button onClick={generate} disabled={generating || !prompt.trim()}
          className="px-8 py-3 rounded-xl font-bold text-white text-sm transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 flex items-center gap-3"
          style={{ background: G }}>
          {generating ? <><Loader size="sm" /> Generating…</> : "✦ Generate Image"}
        </button>
      </div>

      {generating && (
        <div className="rounded-2xl border border-white/10 flex items-center justify-center mb-8"
          style={{ height: 260, background: "rgba(255,255,255,0.02)" }}>
          <Loader size="lg" text="Generating your image…" />
        </div>
      )}

      {generated && !generating && (
        <div className="rounded-2xl border border-violet-500/30 mb-8 overflow-hidden" style={{ animation: "fadeUp 0.4s ease both" }}>
          <div className="relative flex items-center justify-center" style={{ height: 260, background: "linear-gradient(135deg,#1e0a3e,#0a1030,#3a1060)" }}>
            <div className="text-center">
              <div className="text-5xl mb-2">🎨</div>
              <p className="text-slate-400 text-sm">"{prompt.slice(0,50)}{prompt.length>50?"…":""}"</p>
              <p className="text-xs text-slate-600 mt-1">Style: {style}</p>
            </div>
          </div>
          <div className="flex gap-3 p-4" style={{ background: "rgba(0,0,0,0.3)" }}>
            <button className="px-4 py-2 rounded-lg text-xs font-bold text-white hover:opacity-80 transition" style={{ background: G }}>⬇ Download</button>
            <button className="px-4 py-2 rounded-lg text-xs font-bold text-slate-300 border border-white/10 hover:bg-white/5 transition">↗ Share</button>
            <button onClick={() => { setGenerated(false); generate(); }}
              className="px-4 py-2 rounded-lg text-xs font-bold text-slate-300 border border-white/10 hover:bg-white/5 transition">🔁 Regenerate</button>
          </div>
        </div>
      )}

      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Recent Generations</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {RECENT_IMAGES.map((img, i) => (
          <div key={img.id} className="rounded-2xl border border-white/8 overflow-hidden hover:border-violet-500/30 transition-colors group">
            <div className="relative h-36" style={{ background: GALLERY_GRADIENTS[i] }}>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(0,0,0,0.5)" }}>
                <button className="px-4 py-2 rounded-lg text-xs font-bold text-white" style={{ background: G }}>View</button>
              </div>
            </div>
            <div className="px-4 py-3" style={{ background: "rgba(255,255,255,0.02)" }}>
              <p className="text-xs text-white font-semibold truncate">{img.prompt}</p>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-600">{img.style}</span>
                <span className="text-xs text-slate-600">{img.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SECTION: Video Studio ──────────────────────────────────── */
function VideoSection() {
  const [script, setScript]       = useState("");
  const [processing, setProcessing] = useState(false);
  const [done, setDone]           = useState(false);

  const create = () => {
    if (!script.trim()) return;
    setProcessing(true); setDone(false);
    setTimeout(() => { setProcessing(false); setDone(true); }, 3000);
  };

  return (
    <div style={{ animation: "fadeUp 0.4s ease both" }}>
      <h2 className="text-2xl font-black text-white mb-1">Video Studio</h2>
      <p className="text-slate-500 text-sm mb-7">Turn scripts and prompts into cinematic AI videos.</p>

      <div className="rounded-2xl border border-cyan-500/25 p-6 mb-8" style={{ background: "rgba(6,182,212,0.05)" }}>
        <textarea value={script} onChange={(e) => setScript(e.target.value)}
          placeholder="Describe your video or paste a script…"
          rows={4} className="w-full rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-cyan-500 transition text-sm resize-none mb-4"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
        <div className="flex flex-wrap gap-3 mb-4">
          {["16:9 Landscape","9:16 Portrait","1:1 Square"].map((r) => (
            <button key={r} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 border border-white/10 hover:border-cyan-500/40 hover:text-cyan-300 transition">{r}</button>
          ))}
        </div>
        <button onClick={create} disabled={processing || !script.trim()}
          className="px-8 py-3 rounded-xl font-bold text-white text-sm transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 flex items-center gap-3"
          style={{ background: "linear-gradient(90deg,#06b6d4,#3b82f6)" }}>
          {processing ? <><Loader size="sm" /> Creating Video…</> : "🎬 Create Video"}
        </button>
      </div>

      {processing && (
        <div className="rounded-2xl border border-white/10 flex items-center justify-center mb-8" style={{ height: 220, background: "rgba(255,255,255,0.02)" }}>
          <Loader size="lg" text="Rendering your video…" />
        </div>
      )}

      {done && !processing && (
        <div className="rounded-2xl border border-cyan-500/30 mb-8 overflow-hidden" style={{ animation: "fadeUp 0.4s ease both" }}>
          <div className="relative flex items-center justify-center" style={{ height: 220, background: "linear-gradient(135deg,#0a2040,#062030,#104060)" }}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background: "rgba(6,182,212,0.2)", border: "2px solid rgba(6,182,212,0.4)" }}>
                <span className="text-2xl">▶</span>
              </div>
              <p className="text-slate-400 text-sm">Video ready · 0:28</p>
            </div>
          </div>
          <div className="flex gap-3 p-4" style={{ background: "rgba(0,0,0,0.3)" }}>
            <button className="px-4 py-2 rounded-lg text-xs font-bold text-white hover:opacity-80 transition" style={{ background: "linear-gradient(90deg,#06b6d4,#3b82f6)" }}>⬇ Download HD</button>
            <button className="px-4 py-2 rounded-lg text-xs font-bold text-slate-300 border border-white/10 hover:bg-white/5 transition">↗ Share</button>
          </div>
        </div>
      )}

      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Recent Videos</h3>
      <div className="space-y-3">
        {RECENT_VIDEOS.map((v) => (
          <div key={v.id} className="flex items-center gap-4 rounded-2xl border border-white/8 px-5 py-4 hover:border-cyan-500/20 transition-colors" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#0a2040,#104060)" }}>
              <span className="text-lg">🎬</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">{v.title}</p>
              <p className="text-xs text-slate-600">{v.duration} · {v.time}</p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${v.status === "ready" ? "text-emerald-400 bg-emerald-400/10" : "text-amber-400 bg-amber-400/10"}`}>
              {v.status === "ready" ? "✓ Ready" : "⟳ Processing"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SECTION: Content AI ────────────────────────────────────── */
function ContentSection() {
  const [topic, setTopic]   = useState("");
  const [type, setType]     = useState("Blog Post");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const TYPES = ["Blog Post","Social Caption","Ad Copy","Email","SEO Article"];
  const SAMPLE = `# The Future of AI-Powered Creativity\n\nArtificial intelligence is no longer a tool reserved for tech giants. Today, independent creators are harnessing the same power…\n\n## Why AI Changes Everything\n\nSpeed, scale, and consistency — the three pillars that once required entire teams can now flow from a single creator.\n\n[Continue reading…]`;

  const generate = () => {
    if (!topic.trim()) return;
    setLoading(true); setOutput("");
    setTimeout(() => { setLoading(false); setOutput(SAMPLE); }, 2000);
  };

  return (
    <div style={{ animation: "fadeUp 0.4s ease both" }}>
      <h2 className="text-2xl font-black text-white mb-1">Content AI</h2>
      <p className="text-slate-500 text-sm mb-7">Create blogs, captions, ad copy, and more in seconds.</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-amber-500/25 p-6" style={{ background: "rgba(245,158,11,0.05)" }}>
          <div className="flex flex-wrap gap-2 mb-4">
            {TYPES.map((t) => (
              <button key={t} onClick={() => setType(t)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={type === t
                  ? { background: "linear-gradient(90deg,#f59e0b,#ef4444)", color: "#fff" }
                  : { background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }}>
                {t}
              </button>
            ))}
          </div>
          <input value={topic} onChange={(e) => setTopic(e.target.value)}
            placeholder={`Topic for your ${type}…`}
            className="w-full rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-amber-500 transition text-sm mb-4"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
          <button onClick={generate} disabled={loading || !topic.trim()}
            className="w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all"
            style={{ background: "linear-gradient(90deg,#f59e0b,#ef4444)" }}>
            {loading ? <><Loader size="sm" /> Writing…</> : "✍️ Generate Content"}
          </button>
        </div>

        <div className="rounded-2xl border border-white/8 p-6 relative min-h-[240px]" style={{ background: "rgba(255,255,255,0.02)" }}>
          {loading && <Loader overlay text="Writing content…" />}
          {!output && !loading && (
            <div className="h-full flex items-center justify-center text-slate-600 text-sm">Your generated content will appear here…</div>
          )}
          {output && !loading && (
            <div style={{ animation: "fadeUp 0.4s ease both" }}>
              <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line mb-4">{output}</div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white hover:opacity-80 transition" style={{ background: "linear-gradient(90deg,#f59e0b,#ef4444)" }}>⬇ Export</button>
                <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 border border-white/10 hover:bg-white/5 transition">📋 Copy</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION: AI Chat ───────────────────────────────────────── */
function ChatSection() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hey! I'm your NexaAI assistant. Ask me anything — brainstorm ideas, debug code, explain concepts, or just have a conversation." },
  ]);
  const [input, setInput]     = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef             = useRef(null);

  const send = () => {
    if (!input.trim() || thinking) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages((m) => [...m, { role: "ai", text: `Great question about "${userMsg.slice(0,40)}…"! I'd suggest exploring the core concepts first, then building from there. Want me to go deeper on any specific aspect?` }]);
    }, 1800);
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, thinking]);

  return (
    <div style={{ animation: "fadeUp 0.4s ease both" }}>
      <h2 className="text-2xl font-black text-white mb-1">AI Chat</h2>
      <p className="text-slate-500 text-sm mb-5">Your 24/7 intelligent companion.</p>

      <div className="rounded-2xl border border-emerald-500/20 flex flex-col overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", minHeight: 440 }}>
        <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ maxHeight: 360 }}>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-xs sm:max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed"
                style={m.role === "user"
                  ? { background: G2, color: "#fff" }
                  : { background: "rgba(255,255,255,0.06)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.1)" }}>
                {m.text}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl flex items-center gap-2"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Loader size="sm" />
                <span className="text-xs text-slate-500">Thinking…</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-white/8 p-4 flex gap-3">
          <input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask anything…"
            className="flex-1 rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-emerald-500 transition text-sm"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
          <button onClick={send} disabled={thinking || !input.trim()}
            className="px-5 py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 active:scale-95 disabled:opacity-40 transition-all"
            style={{ background: "linear-gradient(90deg,#10b981,#06b6d4)" }}>↑</button>
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION: Credits ───────────────────────────────────────── */
function CreditsSection() {
  return (
    <div style={{ animation: "fadeUp 0.4s ease both" }}>
      <h2 className="text-2xl font-black text-white mb-1">Credits & Usage</h2>
      <p className="text-slate-500 text-sm mb-7">Track your monthly usage across all tools.</p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-2xl border border-white/8 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
          <h3 className="text-sm font-bold text-white mb-5">Monthly Usage</h3>
          <CreditBar label="AI Images"     used={CREDITS.images.used} total={CREDITS.images.total} color="linear-gradient(90deg,#7c3aed,#a855f7)" />
          <CreditBar label="Video Clips"   used={CREDITS.videos.used} total={CREDITS.videos.total} color="linear-gradient(90deg,#06b6d4,#3b82f6)" />
          <CreditBar label="Words Written" used={CREDITS.words.used}  total={CREDITS.words.total}  color="linear-gradient(90deg,#f59e0b,#ef4444)" />
          <CreditBar label="Chat Messages" used={CREDITS.chat.used}   total={CREDITS.chat.total}   color="linear-gradient(90deg,#10b981,#06b6d4)" />
          <p className="text-xs text-slate-600 mt-4">Resets on April 1, 2026</p>
        </div>

        <div className="rounded-2xl border border-violet-500/30 p-6" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.1),rgba(6,182,212,0.05))" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Current Plan</p>
              <p className="text-2xl font-black text-white mt-1">Pro</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-white">$19</p>
              <p className="text-xs text-slate-500">/ month</p>
            </div>
          </div>
          <ul className="space-y-2 mb-5">
            {["Unlimited AI images","100 video clips/mo","Unlimited content","Priority support","HD exports"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                <span className="text-emerald-400">✓</span>{f}
              </li>
            ))}
          </ul>
          <button className="w-full py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition" style={{ background: G }}>
            Upgrade to Team →
          </button>
        </div>
      </div>

      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Billing History</h3>
      <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
        {[
          { date: "Mar 1, 2026", desc: "Pro Plan", amount: "$19.00" },
          { date: "Feb 1, 2026", desc: "Pro Plan", amount: "$19.00" },
          { date: "Jan 1, 2026", desc: "Pro Plan", amount: "$19.00" },
        ].map((b, i) => (
          <div key={i} className="flex items-center px-5 py-4 border-b border-white/5 last:border-0">
            <div className="flex-1">
              <p className="text-sm text-white font-medium">{b.desc}</p>
              <p className="text-xs text-slate-600">{b.date}</p>
            </div>
            <span className="text-sm text-white font-bold mr-4">{b.amount}</span>
            <span className="text-xs font-bold px-2 py-1 rounded-full text-emerald-400 bg-emerald-400/10">Paid</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SECTION: Profile ───────────────────────────────────────── */
function ProfileSection() {
  const [form, setForm]   = useState({ name: USER.name, email: USER.email, bio: "Full-stack developer & AI enthusiast based in Bangalore." });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);

  const save = () => {
    setSaving(true); setSaved(false);
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500); }, 1500);
  };

  return (
    <div style={{ animation: "fadeUp 0.4s ease both" }}>
      <h2 className="text-2xl font-black text-white mb-1">Profile</h2>
      <p className="text-slate-500 text-sm mb-7">Manage your account details and preferences.</p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/8 p-6 flex flex-col items-center text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-white mb-4" style={{ background: G2 }}>
            {USER.avatar}
          </div>
          <p className="text-white font-bold">{USER.name}</p>
          <p className="text-slate-500 text-xs mb-1">{USER.email}</p>
          <span className="mt-2 text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(124,58,237,0.2)", color: "#a78bfa" }}>
            {USER.plan} Plan
          </span>
          <p className="text-xs text-slate-600 mt-3">Member since {USER.joined}</p>
          <button className="mt-4 w-full py-2.5 rounded-xl text-xs font-bold border border-white/10 text-slate-300 hover:bg-white/5 transition">
            Change Avatar
          </button>
        </div>

        <div className="md:col-span-2 rounded-2xl border border-white/8 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
          <h3 className="text-sm font-bold text-white mb-5">Account Details</h3>
          <div className="space-y-4">
            {[{ label: "Full Name", key: "name", type: "text" }, { label: "Email Address", key: "email", type: "email" }].map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">{f.label}</label>
                <input type={f.type} value={form[f.key]} onChange={(e) => setForm((v) => ({ ...v, [f.key]: e.target.value }))}
                  className="w-full rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-violet-500 transition text-sm"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Bio</label>
              <textarea rows={3} value={form.bio} onChange={(e) => setForm((v) => ({ ...v, bio: e.target.value }))}
                className="w-full rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-violet-500 transition text-sm resize-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <button onClick={save} disabled={saving}
              className="px-6 py-2.5 rounded-xl font-bold text-white text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all"
              style={{ background: G }}>
              {saving ? <><Loader size="sm" /> Saving…</> : "Save Changes"}
            </button>
            {saved && <span className="text-emerald-400 text-xs font-semibold">✓ Saved!</span>}
          </div>

          <div className="mt-8 pt-6 border-t border-white/8">
            <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3">Danger Zone</h4>
            <button className="px-4 py-2 rounded-xl text-xs font-bold text-red-400 border border-red-400/20 hover:bg-red-400/5 transition">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN DASHBOARD ─────────────────────────────────────────── */
export default function Dashboard({ onLogout }) {
  const [active, setActive]       = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [switching, setSwitching]   = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPageLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleNav = (key) => {
    if (key === active) return;
    setSwitching(true);
    setSidebarOpen(false);
    setTimeout(() => { setActive(key); setSwitching(false); }, 300);
  };

  const renderSection = () => {
    if (switching) return (
      <div className="flex items-center justify-center h-64">
        <Loader size="lg" text="Loading…" />
      </div>
    );
    switch (active) {
      case "overview": return <OverviewSection setActive={handleNav} />;
      case "images":   return <ImageSection />;
      case "videos":   return <VideoSection />;
      case "content":  return <ContentSection />;
      case "chat":     return <ChatSection />;
      case "credits":  return <CreditsSection />;
      case "profile":  return <ProfileSection />;
      default:         return <OverviewSection setActive={handleNav} />;
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#080614" }}>
        <div className="text-center">
          <div className="flex items-center gap-2 justify-center mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black text-white" style={{ background: G2 }}>N</div>
            <span className="text-2xl font-extrabold tracking-tight text-white">Nexa<span style={{ color: "#7c3aed" }}>AI</span></span>
          </div>
          <Loader size="lg" text="Loading your workspace…" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#080614", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 md:hidden"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 w-64 flex flex-col transition-transform duration-300 md:translate-x-0 md:static md:z-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "rgba(8,6,20,0.98)", borderRight: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 h-16 border-b border-white/5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: G2 }}>N</div>
          <span className="text-lg font-extrabold tracking-tight text-white">Nexa<span style={{ color: "#7c3aed" }}>AI</span></span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {TOOLS.map((t) => (
            <button key={t.key} onClick={() => handleNav(t.key)}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left"
              style={active === t.key
                ? { background: "rgba(124,58,237,0.2)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.3)" }
                : { color: "#64748b", border: "1px solid transparent" }}>
              <span className="text-base">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>

        {/* User footer */}
        <div className="px-3 pb-4 border-t border-white/5 pt-4 flex-shrink-0">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl mb-2" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0" style={{ background: G2 }}>{USER.avatar}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{USER.name}</p>
              <p className="text-xs text-slate-600 truncate">{USER.plan} Plan</p>
            </div>
          </div>
          <button onClick={onLogout}
            className="w-full py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-red-400 hover:bg-red-400/5 transition-all duration-150">
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="flex items-center justify-between px-5 h-16 border-b border-white/5 flex-shrink-0"
          style={{ background: "rgba(8,6,20,0.8)", backdropFilter: "blur(16px)" }}>
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-lg border border-white/10 text-slate-400 hover:text-white transition"
              onClick={() => setSidebarOpen(true)}>☰</button>
            <h1 className="text-sm font-bold text-slate-300 hidden sm:block">
              {TOOLS.find((t) => t.key === active)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold"
              style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.25)" }}>
              ⚡ {CREDITS.images.total - CREDITS.images.used} imgs left
            </div>
            <button onClick={() => handleNav("profile")}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white hover:opacity-80 transition"
              style={{ background: G2 }}>
              {USER.avatar}
            </button>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-8">
          <div className="max-w-5xl mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}