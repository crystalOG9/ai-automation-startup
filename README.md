# SPARTAN — Custom Automation Systems & Engineering Studio

> **"A small technical team building custom automation systems for businesses that are tired of doing the same thing 500 times."**

**SPARTAN** is a boutique automation and software engineering studio. Rather than selling generic, rigid SaaS templates, SPARTAN engineers custom automation systems directly around how your business actually operates — eliminating routine digital busywork, integrating existing software tools, and keeping humans firmly in control of critical decisions.

---

## What SPARTAN Does

Most businesses lose hundreds of hours each month to routine computer tasks that nobody wants to do:
- Copying data back and forth between WhatsApp, Excel, CRMs, and ERPs.
- Manually sorting, classifying, and extracting line items from incoming invoices and emails.
- Repetitive customer order status lookups and tracking updates.
- Routine multi-sheet data reconciliations and audit checks.

**Our Approach**:
1. **Understand the process first**: We map your actual operational steps before touching code.
2. **Automate what makes sense**: No over-engineering. If a simple script or API webhook solves it, we build that.
3. **Integrate existing systems**: Zero forced software migrations. We build alongside your current tools (SAP, Tally, Excel, Gmail, WhatsApp, Zoho, etc.).
4. **Human-in-the-Loop**: Strict policy gates ensure high-stakes approvals, payments, and sensitive client messages always pass through human sign-off.

---

## Multi-Page Architecture

SPARTAN is architected as a modern, high-performance multi-page company website:

| Route | Purpose & Key Features |
|---|---|
| **`/` (Home)** | Studio overview, interactive 3D hero experience, core principles, selected build highlights, verified stats, and direct workflow assessment. |
| **`/work`** | **"Stuff We've Actually Built"** — Deep-dive into real in-house builds, prototypes, multi-system pipeline engines, and inbound triage gateways. |
| **`/services`** | **"What We Build"** — Detailed breakdown across Web Interfaces, Backend APIs, Custom Automations, Enterprise Integrations, and Pragmatic AI. |
| **`/about`** | **"Who We Are"** — Studio philosophy (*"How We Think"*), core engineering creed, and the team. |
| **`/contact`** | **"Show Us The Work You Hate Doing"** — Interactive workflow intake form capturing process frequency, software tools, and manual bottlenecks. |
| **`/api/workflow`** | Secure backend API route validating intake submissions, persisting to **Supabase**, and alerting via **Resend**. |

---

## Interactive UI & Component Engineering

The platform integrates custom motion engineering and curated open-source components:

- **Cinematic Logo Intro Animation**: Powered by the **React Bits `<StrokeText />`** component with GSAP outline drawing and white wipe reveal, layered on top of an undulating **React Bits `<Silk />`** WebGL shader in dusty metallic gray (`#7B7481`).
- **Gooey Global Navigation**: Powered by the **React Bits `<GooeyNav />`** component, featuring an SVG alpha color matrix (`feGaussianBlur` + `feColorMatrix`) for fluid, liquid-droplet route switching with 100% transparent backdrop blending.
- **Interactive Workflow Simulation (`AutomationDemo.tsx`)**: An interactive 5-stage editable workflow simulator demonstrating real-time message intake, AI entity extraction, multi-system querying, human approval gatekeeping, and automated execution.
- **Precision Mouse & 3D Spatial System**: Custom RAF pointer tracking, dynamic focus reticles, and 3D card tilt with specular edge sheens.
- **Responsive Mobile Navigation**: Clean slide-down navigation drawer with instant client-side route transitions.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router + Turbopack)
- **Library**: [React](https://react.dev/) 19
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5 (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **3D & WebGL**: [Three.js](https://threejs.org/) & [@react-three/fiber](https://r3f.docs.pmnd.rs/)
- **Animation**: [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [Supabase](https://supabase.com/) (`workflow_submissions` table)
- **Email Infrastructure**: [Resend](https://resend.com/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## Team

Three people. A suspicious amount of work:

1. **Harshad** — Founder · Automation
2. **Piyush** — Web · Backend · APIs · Automation
3. **Samar** — HR · Marketing

---

## Getting Started Locally

### Prerequisites
- Node.js 18.18+ or 20+
- npm, pnpm, or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/crystalOG9/ai-automation-startup.git
cd ai-automation-startup
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create `.env.local` in the project root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
NOTIFICATION_EMAIL=sparten.tech26@gmail.com
NOTIFICATION_FROM_EMAIL=SPARTAN <onboarding@resend.dev>
```
*(The front-end and interactive demos run completely client-side even if backend environment variables are omitted).*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
```

---

## Contact & Direct Channels

- **Email**: [sparten.tech26@gmail.com](mailto:sparten.tech26@gmail.com)
- **Instagram**: [@spartantech.ai](https://www.instagram.com/spartantech.ai/)
- **Website**: [https://ai-automation-startup.vercel.app/](https://ai-automation-startup.vercel.app/)
