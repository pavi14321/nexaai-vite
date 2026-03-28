# NexaAI — All-in-One AI Creative Suite

A modern landing page built with **React + Vite + Tailwind CSS**.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🗂️ Project Structure

```
nexaai/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx              ← Entry point
    ├── App.jsx               ← Root component + modal state
    ├── index.css             ← Tailwind + global styles
    │
    ├── components/           ← Reusable layout components
    │   ├── Navbar.jsx
    │   ├── Modal.jsx
    │   └── Footer.jsx
    │
    ├── pages/                ← Page sections (ordered in App.jsx)
    │   ├── HeroSection.jsx
    │   ├── StatsSection.jsx
    │   ├── FeaturesSection.jsx
    │   ├── HowItWorksSection.jsx
    │   ├── TestimonialsSection.jsx
    │   ├── PricingSection.jsx
    │   └── CTABanner.jsx
    │
    ├── data/
    │   └── constants.js      ← All static copy & config data
    │
    └── hooks/
        └── useScrolled.js    ← Custom scroll detection hook
```

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| Vite | 5 | Build tool & dev server |
| Tailwind CSS | 3 | Utility-first styling |
| PostCSS | 8 | CSS processing |

## ✏️ Customisation

- **Copy / content** → `src/data/constants.js`
- **Colors / gradients** → inline `style` props in each component
- **Add a new section** → create in `src/pages/`, import in `App.jsx`
- **Global styles** → `src/index.css`
