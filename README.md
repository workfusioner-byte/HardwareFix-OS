<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Framer_Motion-11.x-FF0055?logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
</p>

# 🔧 HardwareFix — One Platform. Every Hardware Fix.

**HardwareFix** is a production-grade, hyperlocal hardware repair and assembly marketplace built with **Next.js 16 (App Router)**, designed to compete with platforms like [Urban Company](https://urbancompany.com). It connects homeowners with verified local technicians for services ranging from TV wall mounting to smart lock installation — with transparent pricing, real-time tracking, and an end-to-end booking flow.
> **Deployed Demo**: https://hardwirefix.netlify.app/
> **Live Demo**: Run locally with `npm run dev` → [http://localhost:3000](http://localhost:3000)

---

## 📸 Screenshots

<img width="1325" height="713" alt="Screenshot 2026-07-06 at 10 37 24 PM" src="https://github.com/user-attachments/assets/0599248d-bff2-4e1b-87e7-a1ca66c59e9f" />
<img width="1318" height="698" alt="Screenshot 2026-07-06 at 10 37 54 PM" src="https://github.com/user-attachments/assets/0f7ac4b7-3200-454d-b59a-1acb783f420a" />


---

## ✨ Features at a Glance

### 🏠 Customer-Facing
- **Smart Search Bar** — Type-ahead suggestions matching services by title or description
- **12 Service Category Cards** — Each with high-quality Unsplash photos, hover animations, and instant routing to dynamic detail pages
- **Dynamic Service Detail Pages** — Template-driven system with 3 service archetypes (Mounting, Assembly, Repair), each with unique:
  - Photo gallery with thumbnails
  - Live price calculator with 3 custom parameters
  - Context-specific add-ons
  - Service-specific inclusions checklist
  - Time slot picker and matched technician widget
- **Before & After Comparison Slider** — Touch/mouse-draggable horizontal image comparison
- **AI Visual Estimator** — Simulated scanner animation on mock damaged hardware photos
- **Interactive India Coverage Map** — Real geographically-accurate SVG outline with 5 clickable metro hubs (Delhi NCR, Mumbai, Pune, Hyderabad, Bengaluru) showing live ops stats
- **Multi-Step Booking Flow** — Address → Review → Payment simulation with coupon codes (try `FIXFIRST` for 15% off), wallet deduction, and confetti celebration
- **FAQ Accordion** — Expandable questions section with smooth animations

### 📍 Customer Dashboard
- **Live Technician Tracking** — Simulated coordinate-based map showing technician movement toward the customer's address
- **Real-Time ETA Counter** — Auto-updating estimated arrival time
- **OTP Verification Widget** — 4-digit OTP displayed for technician arrival verification
- **WhatsApp-Style Chat** — Instant messaging drawer with typing indicators, timestamps, and auto-replies
- **Wallet Balance** — Deductible digital wallet with transaction history

### 🔧 Technician Dashboard
- **Job Queue** — Incoming service requests with accept/reject actions
- **OTP Entry** — Input the customer's OTP to verify arrival
- **Progress Checklist** — Step-by-step repair/assembly checklist with completion tracking
- **Payout Summary** — Earnings breakdown with commission details

### 📊 Admin Dashboard
- **Operations Heatmap** — City-wise demand visualization
- **Revenue Trend Charts** — Interactive SVG line graphs (powered by Recharts)
- **Technician Fleet Stats** — On-duty experts, average response times, satisfaction scores
- **KPI Progress Bars** — Real-time target tracking indicators

### 🎨 Design System
- **Role Switcher** — Floating developer HUD in the bottom-right corner to instantly hop between Customer → Technician → Admin views
- **Responsive Layout** — Fully responsive from mobile to ultrawide
- **Glassmorphism Header** — Sticky navbar with backdrop blur, 80px height
- **5-Column Footer** — Organized links with social icons and attribution

---

## 🎨 Brand Identity & Color Palette

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `--background` | `#FFFFFF` | `#1C130E` | Page background |
| `--card` | `#FFFFFF` | `#2B1E17` | Card surfaces |
| `--text` | `#2E221B` | `#F4EFEA` | Body text |
| `--primary` | `#4E3629` | `#C68B59` | Buttons, CTAs |
| `--border` | `#E8E2D9` | `#433026` | Borders |
| `brand-blue` | `#4E3629` | — | Primary espresso brown |
| `brand-sky` | `#C68B59` | — | Hover/accent caramel tan |
| `brand-navy` | `#2E221B` | — | Headers, deep text |
| `brand-emerald` | `#10B981` | — | Success states |

> The app enforces `color-scheme: light` by default via CSS and the root `<html>` tag to prevent browser auto-dark-mode inversions.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS v4 + CSS custom properties |
| **Animations** | Framer Motion 11.x |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Effects** | canvas-confetti |
| **Fonts** | Inter (sans-serif) + JetBrains Mono (monospace) via `next/font` |
| **State** | React Context API (AppContext) |
| **Routing** | Next.js App Router with dynamic `[id]` segments |

---

## 📁 Project Structure

```
Hardware/
├── public/                          # Static assets
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout — fonts, context providers, color-scheme
│   │   ├── globals.css              # Design tokens, theme variables, scrollbar styles
│   │   ├── page.tsx                 # Landing page — hero, search, 12-card grid, FAQ, map
│   │   ├── booking/
│   │   │   └── page.tsx             # Multi-step checkout — address, review, payment
│   │   ├── services/
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Dynamic detail page — template-driven per service
│   │   └── dashboard/
│   │       ├── customer/
│   │       │   └── page.tsx         # Tracking, chat, OTP, wallet
│   │       ├── technician/
│   │       │   └── page.tsx         # Job queue, OTP verify, checklist, payouts
│   │       └── admin/
│   │           └── page.tsx         # Heatmap, charts, KPIs, fleet management
│   ├── components/
│   │   ├── PageLayout.tsx           # Sticky glass navbar (80px) + 5-column footer
│   │   ├── DevRoleSwitcher.tsx      # Floating role-switcher HUD
│   │   ├── ImageComparisonSlider.tsx # Drag-based before/after image comparison
│   │   ├── InteractiveMap.tsx       # Real India SVG map + clickable city hubs
│   │   ├── SimulatedMap.tsx         # Coordinate-based technician movement tracker
│   │   ├── ChatInterface.tsx        # WhatsApp-style chat drawer with auto-replies
│   │   └── AiEstimate.tsx           # AI visual scanner animation component
│   └── context/
│       └── AppContext.tsx           # Global state — bookings, roles, wallet, chat, tracking
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md                        # ← You are here
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or yarn/pnpm/bun)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/hardwarefix.git
cd hardwarefix

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 🧭 User Flow Walkthrough

Follow this end-to-end flow to experience the full platform:

### 1. Browse & Select a Service
1. Open `http://localhost:3000`
2. Scroll to the **service grid** and click any card (e.g., **Furniture Assembly**)
3. You'll land on a **dynamic detail page** with service-specific parameters

### 2. Configure & Book
4. Adjust the **Live Price Calculator** — change item complexity, materials, add-ons
5. Select a **date and time slot**
6. Click **"Book This Slot"** to enter the checkout flow

### 3. Multi-Step Checkout
7. Review your address (pre-filled) and service summary
8. Enter coupon code **`FIXFIRST`** for a 15% discount
9. Click **"Confirm & Pay"** — wallet deducts, confetti fires! 🎉

### 4. Customer Dashboard
10. You're redirected to the **Customer Portal**
11. Watch the **Live Tracking Map** — a technician dot moves toward your address
12. Open the **Chat Widget** (bottom-right) to message the technician
13. Note the **4-digit OTP** displayed on your dashboard

### 5. Switch to Technician
14. Use the **floating role switcher** (bottom-right corner) → select **Technician**
15. Enter the **OTP code** from the customer dashboard
16. Complete the **repair checklist** step by step

### 6. Admin Overview
17. Switch to **Admin** role via the role switcher
18. View **operations heatmaps**, **revenue trends**, and **fleet KPIs**

---

## 🔌 Dynamic Service Template System

The `/services/[id]` route uses a **template engine** that categorizes all 12 services into 3 archetypes:

| Archetype | Services | Custom Parameters |
|---|---|---|
| **Mounting** | TV Mounting, Curtains & Blinds, Bathroom Hardware, Safety Gates | Wall Material, Device Size, Mounting Height |
| **Assembly** | Furniture Assembly, Office Assembly, Outdoor & Patio | Item Complexity, Item Material, Installation Area |
| **Repair** | Door Repairs, Locks & Latches, Kitchen Hardware, Smart Home, Window Glass | Fix Severity, Door/Frame Material, Parts Inclusion |

Each archetype defines its own:
- 📸 **Gallery images** (3 curated photos)
- ✅ **Inclusions checklist** (5 items)
- 🧩 **Add-ons** (3 per category with independent pricing)
- 💰 **Price calculator parameters** (3 dropdowns with modifiers)

---

## 🗺️ Interactive India Map

The coverage map uses a **geographically accurate SVG outline** of India from the `@svg-maps/india` package (served via jsDelivr CDN). Five metro city hubs are positioned at their true geographic coordinates:

| City | Coordinates (x%, y%) | Technicians |
|---|---|---|
| Delhi NCR | 41%, 28% | 720+ |
| Mumbai | 23%, 59% | 590+ |
| Pune | 27%, 63% | 340+ |
| Hyderabad | 42%, 68% | 480+ |
| Bengaluru | 37%, 81% | 650+ |

Clicking a city updates the right-panel with live operational stats.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Credits & Attribution

- **Photos**: [Unsplash](https://unsplash.com) — free high-resolution photography
- **Icons**: [Lucide](https://lucide.dev) — open-source icon library
- **India Map SVG**: [@svg-maps/india](https://www.npmjs.com/package/@svg-maps/india) — CC BY 4.0
- **Fonts**: [Inter](https://rsms.me/inter/) & [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- **Inspiration**: [Urban Company](https://urbancompany.com) layout patterns

---

<p align="center">
  Built with ☕ espresso-brown pixels and ❤️ by the HardwareFix team.
</p>
