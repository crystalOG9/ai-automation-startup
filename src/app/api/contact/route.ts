import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase";
import { Resend } from "resend";

const contactSchema = z.object({
  workflow: z.string().min(1, "Workflow category is required"),
  workflowDetail: z.string().optional(),
  tools: z.array(z.string()).min(1, "At least one tool must be selected"),
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("A valid work email is required"),
  company: z.string().min(2, "Company name is required"),
  teamSize: z.string().min(1, "Team size is required"),
  roiMetrics: z
    .object({
      teamMembers: z.number().optional(),
      weeklyHours: z.number().optional(),
      hourlyRate: z.number().optional(),
      annualHoursSaved: z.number().optional(),
      annualCostSavings: z.number().optional(),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const parseResult = contactSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Validation failed";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parseResult.data;
    const ticketId = `SPN-${Math.floor(10000 + Math.random() * 90000)}`;
    const timestamp = new Date().toISOString();

    // 1. Persist to Supabase if configured
    try {
      const supabase = getSupabaseServerClient();
      await supabase.from("leads").insert([
        {
          name: data.name,
          email: data.email,
          company: data.company,
          process_description: `Workflow: ${data.workflow} | Detail: ${data.workflowDetail || "None"}`,
          tools: data.tools,
          frequency: data.teamSize,
          created_at: timestamp,
        },
      ]);
    } catch (dbError) {
      console.warn("Supabase lead storage skipped or unavailable:", dbError);
    }

    // 2. Dispatch email notification via Resend if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const contactEmail = process.env.CONTACT_EMAIL || "sparten.tech26@gmail.com";

        await resend.emails.send({
          from: "SPARTAN Intake <onboarding@resend.dev>",
          to: contactEmail,
          subject: `[New Lead - ${ticketId}] ${data.company} - ${data.workflow}`,
          html: `
            <div style="font-family: sans-serif; background-color: #030712; color: #f8fafc; padding: 24px; border-radius: 12px;">
              <h2 style="color: #60a5fa; margin-top: 0;">New Workflow Assessment Request</h2>
              <p><strong>Ticket ID:</strong> ${ticketId}</p>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #93c5fd;">${data.email}</a></p>
              <p><strong>Company:</strong> ${data.company} (${data.teamSize})</p>
              <p><strong>Workflow Category:</strong> ${data.workflow}</p>
              ${data.workflowDetail ? `<p><strong>Details:</strong> ${data.workflowDetail}</p>` : ""}
              <p><strong>Current Tech Stack:</strong> ${data.tools.join(", ")}</p>
              ${
                data.roiMetrics?.annualCostSavings
                  ? `<p><strong>Projected Savings:</strong> $${data.roiMetrics.annualCostSavings.toLocaleString()} / year (~${data.roiMetrics.annualHoursSaved?.toLocaleString()} hours)</p>`
                  : ""
              }
              <hr style="border: 1px solid #1e293b; margin: 20px 0;" />
              <p style="font-size: 12px; color: #94a3b8;">Dispatched via SPARTAN Intake Engine</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.warn("Resend email dispatch skipped or unavailable:", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      ticketId,
      timestamp,
      message: "Workflow assessment received. Architecture review dispatched.",
    });
  } catch (err: unknown) {
    console.error("API /contact error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing intake." },
      { status: 500 }
    );
  }
}
