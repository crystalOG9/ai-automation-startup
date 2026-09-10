# SPARTAN — AI Business Automation

> **"We don't replace people. We automate the repetitive work around them."**

**SPARTAN** is an early-stage AI automation company focused on identifying repetitive computer-based work inside businesses and engineering custom automations that reduce operational friction while keeping humans firmly in control of critical decisions.

Rather than offering generic, one-size-fits-all software, SPARTAN builds from the ground up: discovering how an organization truly operates, mapping bottlenecks, and engineering workflow-specific automations with strict **Human-in-the-Loop (HITL)** governance.

---

## The Problem: Repetitive Digital Friction

Employees in small, medium, and growing businesses spend hours each day on routine, error-prone digital tasks:

- **Email & Ticket Ingestion**: Reading, categorizing, routing, and answering standard inbound requests.
- **Data Synchronization**: Manually copy-pasting customer, order, and status records across isolated systems.
- **Status & Shipment Verification**: Querying tracking APIs, carrier portals, or ERPs for routine status lookups.
- **Record Updates**: Manually updating spreadsheets, CRMs, ERPs, and internal dashboards.
- **Repetitive Administrative Loops**: Moving data between disconnected tools with zero creative or strategic value.

**Our Mission**: We eliminate repetitive busywork so team members can focus on high-impact problem solving, customer relationships, and critical business judgment.

---

## Architectural Philosophy: Human-in-the-Loop (HITL)

Every automation engineered under the SPARTAN framework follows strict **Human-in-the-Loop** boundaries to eliminate hallucinations, prevent unauthorized actions, and maintain auditability:

```
Inbound Event (Email, Form, API, Webhook)
       ↓
[1] AI Identifies & Validates
       ↓
[2] Information Extraction & Enrichment
       ↓
[3] Business Rules & Policy Evaluation
       ↓
[4] AI Prepares Draft Action & Parameters
       ↓
[5] HUMAN APPROVAL (Gatekeeper: Approve / Edit / Reject)
       ↓
[6] System Executes Verified Action (CRM, ERP, Email, Database)
       ↓
[7] Immutable Audit Logging & Monitoring
```

> **The Gatekeeper Guarantee**: High-stakes decisions—such as financial transactions, customer-impacting communications, refunds, cancellations, and contract updates—must always pass through explicit human authorization before execution.

---

## Key Interactive Features

The SPARTAN platform demonstrates these capabilities through interactive, high-performance UI systems:

### 1. Editable Interactive Workflow Simulation (`AutomationDemo.tsx`)
- **Stage 1: Customer Input** — Fully user-editable customer message interface allowing users to input real-world business scenarios or test custom queries.
- **Stage 2: AI Understands** — Real-time entity extraction, sentiment analysis, and intent classification.
- **Stage 3: Systems Consulted** — Live simulated lookups against Order Systems, Shipping APIs, and CRM history.
- **Stage 4: Gatekeeper Human Approval** — An interactive authorization interface where operators can inspect AI-prepared response parameters, adjust email drafts, and verify actions before execution.
- **Stage 5: System Executes** — Real-time execution feedback showing CRM record updates, carrier notifications, and customer resolution.

### 2. Live Architectural Workflow Network (`WorkflowNetwork.tsx`)
- High-performance HTML5 Canvas rendering of multi-department data ingestion:
  - **Inbound Streams**: Sales, Operations, Support, Finance, and Logistics.
  - **Distributed Ingestion Bus**: Parallel, non-intersecting conduits routing directly into the central AI Automation engine.
  - **Pulse Packet Animation**: Real-time vector laser packets simulating live asynchronous data throughput.
  - **Executive Blueprint Matrix**: Clean architectural dot-grid with subtle proximity illumination, designed for enterprise executive presentations.

### 3. Precision Interaction & 3D Spatial System (`PrecisionCard.tsx` & `PrecisionMouseSystem.tsx`)
- **Zero Blurry Light Blobs**: Replaced soft, unfocused cursor blooms with crisp, disciplined geometric design tokens.
- **3D Parallax Tilt**: Cards feature subtle, physics-based 3D tilt clamped strictly to 3.5° max angle, specular edge sheen, and smooth spring physics.
- **Digital Scanning Focus Reticle**: Hero interface features a dynamic HUD scanning reticle with corner brackets (`┌ ┐ └ ┘`) snapping to nearest UI elements on cursor proximity.
- **Accessibility & Motion Guards**: Automatically disabled on touch/mobile devices via `@media (hover: hover) and (pointer: fine)` and strictly respects `prefers-reduced-motion`.

### 4. Interactive Workflow Assessment & Intake (`CTA.tsx`)
- Interactive discovery and assessment form capturing:
  - Full Name, Work Email, Company Name.
  - Process Frequency and daily routine volume.
  - Integrated Tools (SAP, Tally, Excel/Sheets, CRM, ERP, Gmail, Outlook, etc.).
  - Freeform bottleneck description.
- **Automated Dispatch**: Integrated with **Supabase** for secure lead capture and **Resend** for instant notifications routed directly to `sparten.tech26@gmail.com`.
- **Post-Submission Meeting Scheduling**: After submitting, visitors are prompted with an interactive option to instantly schedule a 15-minute architecture discovery call with the engineering team.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v16 App Router with Turbopack)
- **Library**: [React](https://react.dev/) (v19)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) & HTML5 Canvas API
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend & Database**: [Supabase](https://supabase.com/)
- **Email Infrastructure**: [Resend](https://resend.com/)
- **Hosting & Edge Deployment**: [Vercel](https://vercel.com/)

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── workflow/               # Backend endpoint for workflow lead submission & email dispatch
│   ├── favicon.ico
│   ├── globals.css                 # Design tokens, custom animations, Tailwind CSS v4 setup
│   ├── layout.tsx                  # Root layout, metadata, PrecisionMouseSystem mounting
│   └── page.tsx                    # Main landing page combining all section components
│
├── components/
│   ├── AutomationDemo.tsx          # Multi-stage interactive workflow simulation
│   ├── BackgroundVisuals.tsx       # Subtle ambient gradient backdrops
│   ├── CTA.tsx                     # Workflow assessment intake form & post-submission meeting prompt
│   ├── CoreMessage.tsx             # AI vs Human tasks division showcase
│   ├── CustomerDiscovery.tsx       # Department-by-department automation discovery cards
│   ├── Footer.tsx                  # Footer navigation, contact info, and social links
│   ├── Hero.tsx                    # Hero section with scanning focus reticle & CTA
│   ├── HowItWorks.tsx              # 6-step engagement roadmap cards
│   ├── HumanInTheLoop.tsx          # Architectural governance principles
│   ├── Industries.tsx              # Target enterprise industry verticals
│   ├── InstagramIcon.tsx           # Reusable SVG icon for Instagram branding
│   ├── MainDifferentiator.tsx      # System replacement vs custom workflow automation
│   ├── Navbar.tsx                  # Fixed glass navbar with sliding indicator
│   ├── PrecisionCard.tsx           # Reusable 3D parallax container with specular edge
│   ├── PrecisionMouseSystem.tsx    # Performant requestAnimationFrame pointer tracking
│   ├── ProblemSection.tsx          # Side-by-side comparison: TODAY vs WITH AUTOMATION
│   ├── ROI.tsx                     # Core operational standards & principles
│   ├── Solutions.tsx               # Core automation capabilities and safety features
│   ├── SpartanLogo.tsx             # Brand logo component
│   ├── WhyUs.tsx                   # Enterprise credibility & engineering philosophy
│   └── WorkflowNetwork.tsx         # Canvas architectural workflow data bus diagram
│
└── lib/
    ├── supabase.ts                 # Supabase client configuration
    └── utils.ts                    # Class merging utility (clsx + tailwind-merge)

public/
└── branding/                       # SPARTAN SVG logos and visual assets
```

---

## Getting Started

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

### 3. Configure Environment Variables
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
NOTIFICATION_EMAIL=sparten.tech26@gmail.com
NOTIFICATION_FROM_EMAIL=SPARTAN <onboarding@resend.dev>
```
> ⚠️ **Security Notice**: Never commit `.env.local` or API keys to GitHub.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
```
Tests TypeScript types, compiles Next.js pages with Turbopack, and validates static site generation (SSG).

### 6. Run Production Build Locally
```bash
npm start
```

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|---|:---:|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | — | Supabase project URL for storing assessment form submissions |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | — | Supabase service role key for backend lead insertion |
| `RESEND_API_KEY` | Optional | — | Resend API key for sending confirmation emails |
| `NOTIFICATION_EMAIL` | Optional | `sparten.tech26@gmail.com` | Destination email where new lead notifications are routed |
| `NOTIFICATION_FROM_EMAIL` | Optional | `SPARTAN <onboarding@resend.dev>` | Verified sender address for outbound notifications |

*(The website and interactive demos run completely client-side even if backend environment variables are omitted).*

---

## Deployment

The application is deployed on **Vercel** with automated continuous integration:
- Every push to the `main` branch triggers an automated build and edge deployment.
- **Live URL**: [https://ai-automation-startup.vercel.app/](https://ai-automation-startup.vercel.app/)

---

## Contact & Connect

- **Official Email**: [sparten.tech26@gmail.com](mailto:sparten.tech26@gmail.com)
- **Instagram**: [@sparten.tech](https://www.instagram.com/sparten.tech/)
- **Website**: [https://ai-automation-startup.vercel.app/](https://ai-automation-startup.vercel.app/)

---

## Responsible AI & Operational Safety

SPARTAN adheres to strict operational boundaries:
1. **Zero Black-Box Executions**: All automated decisions require deterministic business rules and structured schema validation.
2. **Explicit Human Gatekeeper**: High-stakes business actions require explicit human sign-off before downstream systems execute.
3. **Least-Privilege System Integration**: Systems connect via read-only access where possible, with minimal write scopes.
4. **Complete Traceability**: Every input, transformation, prompt, and execution step is logged for auditing.
5. **Fail-Safe Graceful Fallback**: Any unexpected error or unconfident model prediction routes directly to a human operator.

---

## Team

- **Piyush & Harshad** — Founders, SPARTAN

---

## License & Disclaimer

SPARTAN is currently in active customer discovery and validation. Features and architecture are continuously refined based on feedback from operating businesses.
