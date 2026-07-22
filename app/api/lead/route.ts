import { z } from "zod";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(160).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  service: z.string().trim().max(160).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  preferredDate: z.string().trim().max(40).optional().or(z.literal("")),
  urgency: z.string().trim().max(40).optional().or(z.literal("")),
  intent: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  source: z.string().trim().max(60).optional().or(z.literal("")),
  locale: z.string().trim().max(8).optional().or(z.literal("")),
  page: z.string().trim().max(400).optional().or(z.literal("")),
  consent: z.string().optional(),
  // honeypot — must stay empty
  company_website: z.string().max(0).optional().or(z.literal("")),
});

type Lead = z.infer<typeof LeadSchema>;

function makeRef() {
  return `KA-${Date.now().toString(36).toUpperCase()}-${Math.floor(
    Math.random() * 1e4,
  )
    .toString()
    .padStart(4, "0")}`;
}

async function sendEmail(lead: Lead, ref: string): Promise<boolean> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_TO_EMAIL } =
    process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return false; // not configured

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const rows: [string, string][] = [
    ["Reference", ref],
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email || "—"],
    ["Business", lead.company || "—"],
    ["Service", lead.service || "—"],
    ["City", lead.city || "—"],
    ["Urgency", lead.urgency || "—"],
    ["Intent", lead.intent || "—"],
    ["Preferred date", lead.preferredDate || "—"],
    ["Message", lead.message || "—"],
    ["Source", lead.source || "—"],
    ["Language", lead.locale || "—"],
    ["Page", lead.page || "—"],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px">
      <h2 style="color:#e8641c;margin:0 0 4px">New KitchenAxis lead</h2>
      <p style="color:#5c6470;margin:0 0 16px">${lead.urgency === "emergency" ? "🚨 EMERGENCY — call back immediately" : "Follow up with this prospect."}</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 10px;border:1px solid #eceef0;background:#f6f7f8;font-weight:bold;white-space:nowrap">${k}</td><td style="padding:6px 10px;border:1px solid #eceef0">${String(v).replace(/</g, "&lt;")}</td></tr>`,
          )
          .join("")}
      </table>
    </div>`;

  await transporter.sendMail({
    from: process.env.LEAD_FROM_EMAIL || `KitchenAxis <${SMTP_USER}>`,
    to: LEAD_TO_EMAIL || SMTP_USER,
    replyTo: lead.email || undefined,
    subject: `${lead.urgency === "emergency" ? "🚨 " : ""}New lead — ${lead.name} (${lead.city || "KSA"}) [${ref}]`,
    html,
  });
  return true;
}

async function appendToSheet(lead: Lead, ref: string): Promise<boolean> {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) return false; // not configured

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: process.env.GOOGLE_SHEET_TOKEN || "",
      ref,
      timestamp: new Date().toISOString(),
      ...lead,
    }),
  });
  return res.ok;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "validation", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  // Honeypot: silently accept & drop bots
  if (parsed.data.company_website) {
    return Response.json({ ok: true, ref: makeRef() });
  }

  const lead = parsed.data;
  const ref = makeRef();

  const results = await Promise.allSettled([
    sendEmail(lead, ref),
    appendToSheet(lead, ref),
  ]);

  const configured = results.map(
    (r) => r.status === "fulfilled" && r.value === true,
  );
  const attempted = results.some((r) => r.status === "rejected") || configured.some(Boolean);
  const anyDelivered = configured.some(Boolean);

  // Log the lead server-side so nothing is lost even if integrations are off.
  console.log(
    `[lead] ${ref} name="${lead.name}" phone="${lead.phone}" source="${lead.source}" delivered=${anyDelivered}`,
  );
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[lead] channel ${i} failed:`, r.reason);
    }
  });

  // If integrations are configured but every one failed, surface an error.
  if (attempted && !anyDelivered) {
    return Response.json(
      { ok: false, error: "delivery_failed", ref },
      { status: 502 },
    );
  }

  return Response.json({ ok: true, ref });
}
