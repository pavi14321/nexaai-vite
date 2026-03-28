/**
 * Loader — reusable loading component
 *
 * Usage:
 *   <Loader />                     — default medium centered
 *   <Loader size="sm" />           — small inline
 *   <Loader size="lg" />           — large fullscreen overlay
 *   <Loader text="Generating…" />  — with label
 *   <Loader overlay />             — blurred overlay on parent
 */
export default function Loader({ size = "md", text = "", overlay = false }) {
  const dims = {
    sm: { ring: "w-5 h-5", border: "border-2", dot: "w-1 h-1" },
    md: { ring: "w-9 h-9", border: "border-2", dot: "w-1.5 h-1.5" },
    lg: { ring: "w-14 h-14", border: "border-[3px]", dot: "w-2 h-2" },
  }[size];

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      {/* Outer ring */}
      <div className="relative" style={{ width: dims.ring.split(" ")[0].replace("w-", "") * 4 + "px", height: dims.ring.split(" ")[1].replace("h-", "") * 4 + "px" }}>
        <div
          className={`${dims.ring} ${dims.border} rounded-full absolute inset-0`}
          style={{
            borderColor: "rgba(124,58,237,0.15)",
            borderTopColor: "#7c3aed",
            animation: "nexa-spin 0.8s linear infinite",
          }}
        />
        <div
          className={`${dims.ring} ${dims.border} rounded-full absolute inset-0`}
          style={{
            borderColor: "transparent",
            borderBottomColor: "#06b6d4",
            animation: "nexa-spin 1.2s linear infinite reverse",
          }}
        />
        {/* Center dot */}
        <div
          className={`${dims.dot} rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          style={{
            background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
            animation: "nexa-pulse 1s ease-in-out infinite",
          }}
        />
      </div>
      {text && (
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "#a78bfa", letterSpacing: "0.12em" }}
        >
          {text}
        </span>
      )}

      <style>{`
        @keyframes nexa-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes nexa-pulse {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.6); }
        }
      `}</style>
    </div>
  );

  if (overlay) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center z-20 rounded-2xl"
        style={{ background: "rgba(8,6,20,0.75)", backdropFilter: "blur(6px)" }}
      >
        {spinner}
      </div>
    );
  }

  return spinner;
}