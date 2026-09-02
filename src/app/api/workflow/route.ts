import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { Resend } from "resend";

interface WorkflowPayload {
  name?: string;
  email?: string;
  company?: string;
  frequency?: string;
  tools?: string[];
  process?: string;
}

export async function POST(req: NextRequest) {
  try {
    let body: WorkflowPayload;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const { name, email, company, frequency, tools = [], process: processDesc } = body;

    // 1. Validation
    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();
    const trimmedCompany = company?.trim();
    const trimmedFrequency = frequency?.trim();
    const trimmedProcess = processDesc?.trim();

    if (!trimmedName) {
      return NextResponse.json(
        { error: "Full Name is required." },
        { status: 400 }
      );
    }

    if (!trimmedEmail) {
      return NextResponse.json(
        { error: "Work Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid work email address." },
        { status: 400 }
      );
    }

    if (!trimmedCompany) {
      return NextResponse.json(
        { error: "Company Name is required." },
        { status: 400 }
      );
    }

    if (!trimmedFrequency) {
      return NextResponse.json(
        { error: "Process Frequency is required." },
        { status: 400 }
      );
    }

    if (!trimmedProcess) {
      return NextResponse.json(
        { error: "Workflow Description is required." },
        { status: 400 }
      );
    }

    const cleanedTools = Array.isArray(tools)
      ? tools.map((t) => String(t).trim()).filter(Boolean)
      : [];

    const submissionTime = new Date().toISOString();

    // 2. Store in Supabase
    const supabase = getSupabaseServerClient();
    const { error: dbError } = await supabase
      .from("workflow_submissions")
      .insert([
        {
          name: trimmedName,
          email: trimmedEmail,
          company: trimmedCompany,
          frequency: trimmedFrequency,
          tools: cleanedTools,
          process: trimmedProcess,
        },
      ]);

    if (dbError) {
      console.error("[Supabase Error]", dbError);
      return NextResponse.json(
        { error: `Database error: ${dbError.message}` },
        { status: 500 }
      );
    }

    // 3. Optional Resend Email Notification
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (resendApiKey && notificationEmail) {
      try {
        const resend = new Resend(resendApiKey);
        const fromEmail =
          process.env.NOTIFICATION_FROM_EMAIL || "Flowzen <onboarding@resend.dev>";

        const toolsDisplay =
          cleanedTools.length > 0 ? cleanedTools.join(", ") : "None specified";

        await resend.emails.send({
          from: fromEmail,
          to: notificationEmail,
          subject: `⚡ New Workflow Assessment Request: ${trimmedCompany}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #0f172a; padding: 20px 24px; color: #ffffff;">
                <h2 style="margin: 0; font-size: 20px;">New Workflow Assessment Request</h2>
                <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">Flowzen Lead Capture</p>
              </div>
              <div style="padding: 24px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; width: 140px; font-weight: 600;">Full Name:</td>
                    <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${trimmedName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Work Email:</td>
                    <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${trimmedEmail}" style="color: #2563eb;">${trimmedEmail}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Company Name:</td>
                    <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${trimmedCompany}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Process Frequency:</td>
                    <td style="padding: 8px 0; color: #0f172a;">${trimmedFrequency}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Tools / Systems:</td>
                    <td style="padding: 8px 0; color: #0f172a;">${toolsDisplay}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Submission Time:</td>
                    <td style="padding: 8px 0; color: #0f172a;">${submissionTime}</td>
                  </tr>
                </table>
                <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-radius: 6px; border-left: 4px solid #2563eb;">
                  <strong style="display: block; font-size: 13px; color: #475569; margin-bottom: 6px;">Workflow Description:</strong>
                  <p style="margin: 0; font-size: 14px; white-space: pre-wrap; color: #0f172a;">${trimmedProcess}</p>
                </div>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("[Resend Notification Error]", emailErr);
        // We log the error but still return success since the submission was safely saved to DB
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Workflow assessment request submitted successfully.",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    let errorMsg = "Internal server error";
    if (err instanceof Error) {
      if (err.message.includes("fetch failed") || err.message.includes("ENOTFOUND")) {
        errorMsg =
          "Cannot connect to Supabase. Please verify your SUPABASE_URL in .env.local.";
      } else {
        errorMsg = err.message;
      }
    }
    console.error("[API Error]", err);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
