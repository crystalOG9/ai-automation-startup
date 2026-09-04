# SPARTAN — AI Business Automation

> **"We don't replace people. We automate the repetitive work around them."**

**SPARTAN** is an early-stage AI automation company focused on identifying repetitive computer-based work inside businesses and designing custom automations that reduce manual workload while keeping humans in control of important decisions.

Rather than building a generic, one-size-fits-all software tool, SPARTAN approaches automation from the ground up: understanding how an individual business actually operates, mapping its real-world bottlenecks, and engineering workflow-specific solutions.

---

## The Problem

Employees in small and medium businesses spend significant portions of their workdays on repetitive digital tasks, including:

- Reading, categorizing, and sorting incoming customer and operational emails
- Copying and syncing information across disconnected systems
- Categorizing and routing inbound requests
- Checking order, shipment, and status information manually
- Preparing routine, templated responses
- Updating spreadsheets, CRMs, and ERP records
- Processing routine operational requests
- Separating orders or service requests into distinct categories
- Performing repetitive data entry, copy-pasting, and validation

The goal is **not to replace employees**. The goal is to eliminate repetitive digital friction so team members can focus on higher-value problem solving, customer relationships, and critical business judgments.

---

## Our Approach

Every business operates with unique software, approval processes, operational rules, and constraints. SPARTAN employs a **workflow-first methodology**:

1. **Talk to the business** — Conduct discovery conversations with business owners and team members.
2. **Understand the actual workflow** — Observe and document the day-to-day process as it really happens.
3. **Map every step** — Create a clear step-by-step map of the current digital operational flow.
4. **Identify repetitive/manual steps** — Pinpoint where time is lost to routine copy-pasting, classification, or data entry.
5. **Identify what can safely be automated** — Isolate structured, deterministic, and rule-based tasks suitable for automation.
6. **Identify what should remain human-controlled** — Define clear boundaries where human expertise, judgment, and oversight are essential.
7. **Build a small custom automation** — Implement a focused, lightweight automation prototype for the specific bottleneck.
8. **Test it with the business** — Validate the automation alongside real users in a safe, controlled setting.
9. **Measure before vs after** — Quantify tangible improvements in turnaround time, error rates, and manual hours.
10. **Improve and expand only if valuable** — Refine the system or explore adjacent workflows only after proving measurable ROI.

---

## Human-in-the-Loop Architecture

Automations built under this framework follow a strict **Human-in-the-Loop (HITL)** architecture to prevent hallucinations, mistakes, and unauthorized actions:

```
AI identifies
    ↓
AI validates / extracts
    ↓
AI prepares draft action
    ↓
Human reviews / approves / edits / rejects
    ↓
System executes approved action
    ↓
Result is logged for auditability
```

Critical operational actions—such as financial transactions, customer-impacting communications, refunds, cancellations, and contract changes—must always pass through explicit human review and approval before execution.

---

## Example Workflow

The following diagram illustrates an example architecture for customer support and order operations. *(Note: This is an architectural model illustrating the concept, not a claim of active production deployment).*

Customer Email → AI Classification → Information Extraction → Business Rules → Human Approval → System Action → Logging

---

## Core Principles

- **Workflow-Specific**: Automation is engineered around a company's real process rather than forcing the business into rigid, generic templates.
- **Human-Controlled**: Humans retain full authority over critical business decisions, exceptions, and approvals.
- **System-Integrated**: Solutions connect to existing software ecosystems—spreadsheets, email inboxes, CRMs, ERPs, and custom databases—without requiring disruptive platform migrations.
- **Measurable**: Every automation is assessed with clear operational metrics such as processing time, error frequency, response delays, and manual hours saved.

---

## Why SPARTAN Is Different

Different companies face distinct bottlenecks. By focusing on workflow discovery before writing code, SPARTAN builds targeted, practical automations that solve real operational friction instead of introducing complex software nobody uses. We don't start by building a generic AI product and asking businesses to adapt to it — we start with the business, understand its workflow, and then determine what should be automated.

---

## Current Project Status

- **Status**: Early-Stage / Customer Discovery

*Note: SPARTAN is in active customer discovery and validation. We do not have existing customers, production deployments, enterprise readiness, or live revenue yet.*

---

## Customer Discovery

We are actively meeting with business owners and operators to study repetitive daily workflows, employee time consumption, bottlenecks, error-prone manual processes, existing software stacks, high-impact automation opportunities, and target metrics for measurable business impact.

Our priority is deep learning and problem validation before scaling development.

---

## Validation Roadmap

Idea → Problem → Business Conversation → Real Workflow → MVP → Pilot → Measurement → Case Study → Payment

Real proof comes from verified business utility and measured operational results, not unverified website claims.

---

## Technology

The website and interactive workflow demonstrations in this repository are built with:

- **Framework**: [Next.js](https://nextjs.org/) (v16 App Router)
- **Library**: [React](https://react.org/) (v19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Supabase](https://supabase.com/) (waitlist storage)
- **Email**: [Resend](https://resend.com/) (transactional emails)
- **Utilities**: `clsx`, `tailwind-merge`

---

## Project Structure

```
src/
├── app/                # Next.js App Router (layout, globals, page, API routes)
│   └── api/            # Backend API routes (workflow demo, waitlist)
├── components/         # Modular UI, presentation components, and sections
└── lib/                # Shared utilities (Supabase client, utils)

public/
└── branding/           # Brand assets (SPARTAN logo)
```

---

## Running Locally

Ensure you have Node.js installed.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the project root (never commit this file):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   RESEND_API_KEY=your_resend_api_key
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Run code linting:**
   ```bash
   npm run lint
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Start production server locally:**
   ```bash
   npm start
   ```

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous public key |
| `RESEND_API_KEY` | Resend API key for transactional emails |

> ⚠️ **Never commit `.env.local` or any secret keys to this repository.**

---

## Deployment

The frontend web application is deployed and hosted on **Vercel** as a Next.js application. Deployments are triggered automatically on pushes to the `main` branch.

---

## Roadmap

- Phase 1: Customer Discovery
- Phase 2: Problem Selection
- Phase 3: MVP Development
- Phase 4: Pilot Testing
- Phase 5: Measurement
- Phase 6: Case Study
- Phase 7: Expansion

---

## Responsible Automation

SPARTAN adheres to clear ethical and operational guidelines when designing automations. High-stakes decisions always require explicit human verification. Systems only request permissions strictly required to perform the intended task. Sensitive credentials are never exposed in client code. Actions performed by automated systems are logged with full traceability. Workflows are designed with fail-safes allowing manual execution if an unexpected condition occurs.

---

## Team

Piyush & Harshad

---

## Website

- [https://ai-automation-startup.vercel.app/](https://ai-automation-startup.vercel.app/)

---

## Important Disclaimer

SPARTAN is currently in the customer-discovery and validation stage. Features, architecture, and automation approaches may evolve based on feedback and real operational data gathered from businesses.
