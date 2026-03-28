export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export const FEATURES = [
  {
    icon: "🎨",
    title: "AI Image Creator",
    desc: "Generate breathtaking visuals from a single line of text. Portraits, landscapes, abstract art — your imagination is the only limit.",
    color: "from-violet-500 to-fuchsia-500",
    bg: "bg-violet-950/40",
    border: "border-violet-500/30",
  },
  {
    icon: "🎬",
    title: "AI Video Creator",
    desc: "Transform scripts and prompts into cinematic short videos with motion, transitions, and AI-powered scene generation.",
    color: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-950/40",
    border: "border-cyan-500/30",
  },
  {
    icon: "✍️",
    title: "Content Creator",
    desc: "Blog posts, social captions, ad copy, SEO content — produce weeks of publishing-ready content in minutes.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-950/40",
    border: "border-amber-500/30",
  },
  {
    icon: "💬",
    title: "AI Chat Assistant",
    desc: "Your 24/7 intelligent companion — brainstorm, debug code, answer questions, and have natural conversations.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-950/40",
    border: "border-emerald-500/30",
  },
];

export const STATS = [
  { value: "10M+", label: "Assets Created" },
  { value: "500K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9★", label: "User Rating" },
];

export const TESTIMONIALS = [
  {
    name: "Priya S.",
    role: "Indie Creator",
    text: "NexaAI cut my content production time by 80%. I can't imagine going back.",
    avatar: "PS",
  },
  {
    name: "Rahul M.",
    role: "Marketing Lead",
    text: "The image generator is insane. Our ad CTR jumped 3x after switching.",
    avatar: "RM",
  },
  {
    name: "Sofia L.",
    role: "Filmmaker",
    text: "Video drafts in minutes instead of days. This changes everything for small studios.",
    avatar: "SL",
  },
];

export const PRICING_PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["50 AI images/mo", "10 video clips/mo", "5K words/mo", "Basic chat"],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    features: [
      "Unlimited images",
      "100 video clips/mo",
      "Unlimited content",
      "Priority chat",
      "HD exports",
    ],
    cta: "Go Pro",
    highlight: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "per month",
    features: [
      "Everything in Pro",
      "5 seats included",
      "Shared workspace",
      "API access",
      "Dedicated support",
    ],
    cta: "Start Team",
    highlight: false,
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Create Account",
    desc: "Sign up free — no card needed. Choose your plan anytime.",
  },
  {
    step: "02",
    title: "Pick Your Tool",
    desc: "Image, video, content, or chat. Pick the power you need.",
  },
  {
    step: "03",
    title: "Create & Export",
    desc: "Generate in seconds. Download, share, or publish instantly.",
  },
];

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: ["Image Creator", "Video Creator", "Content AI", "Chat Assistant"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Press"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
  },
];
