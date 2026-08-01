"use server";

type SubmitResult = { ok: true } | { ok: false; error: string };

/**
 * Quick-funnel capture — season + intent chips, then email.
 * Sends via Resend when RESEND_API_KEY is configured; otherwise logs
 * server-side and still reports success so the funnel is testable
 * before Phase D's email pipeline is wired up.
 */
export async function submitQuickInquiry(_prevState: SubmitResult | null, formData: FormData): Promise<SubmitResult> {
  const email = String(formData.get("email") ?? "").trim();
  const saison = String(formData.get("saison") ?? "").trim();
  const envie = String(formData.get("envie") ?? "").trim();

  if (!email || !email.includes("@")) {
    return { ok: false, error: "invalid_email" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.INQUIRY_NOTIFICATION_EMAIL;

  if (!apiKey || !notifyTo) {
    console.warn("[inquiry] RESEND_API_KEY / INQUIRY_NOTIFICATION_EMAIL not set — logging only:", {
      email,
      saison,
      envie,
    });
    return { ok: true };
  }

  try {
    const details = [
      `Email: ${email}`,
      saison ? `Saison: ${saison}` : null,
      envie ? `Envie: ${envie}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Turxplore <hello@turxplore.com>",
        to: notifyTo,
        subject: "New inquiry — quick funnel",
        text: `A new visitor began a conversation.\n\n${details}`,
      }),
    });

    if (!response.ok) {
      return { ok: false, error: "send_failed" };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "send_failed" };
  }
}
