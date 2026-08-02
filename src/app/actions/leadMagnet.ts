"use server";

type SubmitResult = { ok: true } | { ok: false; error: string };

const MAGNETS = {
  carnet: {
    file: "turxplore-carnet-du-maroc.pdf",
    label: "Le Carnet du Maroc",
  },
  cartes: {
    file: "turxplore-cartes-medinas.pdf",
    label: "Cartes & Médinas",
  },
} as const;

type MagnetKey = keyof typeof MAGNETS;

function isMagnetKey(value: string): value is MagnetKey {
  return value === "carnet" || value === "cartes";
}

/**
 * Lead-magnet capture — visitor leaves an email, receives a download link
 * for the requested PDF, and the advisor is notified of the new lead.
 * Sends via Resend when RESEND_API_KEY is configured; otherwise logs
 * server-side and still reports success so the funnel is testable
 * before the email pipeline is wired up.
 */
export async function sendLeadMagnet(_prevState: SubmitResult | null, formData: FormData): Promise<SubmitResult> {
  const email = String(formData.get("email") ?? "").trim();
  const magnetKey = String(formData.get("magnet") ?? "").trim();

  if (!email || !email.includes("@")) {
    return { ok: false, error: "invalid_email" };
  }
  if (!isMagnetKey(magnetKey)) {
    return { ok: false, error: "invalid_magnet" };
  }

  const magnet = MAGNETS[magnetKey];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://turxplore.com";
  const downloadUrl = `${siteUrl}/downloads/${magnet.file}`;

  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.INQUIRY_NOTIFICATION_EMAIL;

  if (!apiKey) {
    console.warn("[leadMagnet] RESEND_API_KEY not set — logging only:", { email, magnet: magnetKey });
    return { ok: true };
  }

  try {
    const visitorEmail = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Turxplore <hello@turxplore.com>",
        to: email,
        subject: `${magnet.label} — votre document Turxplore`,
        text: `Voici votre document : ${downloadUrl}\n\nTurxplore compose des voyages à travers le Maroc avec ceux qui le connaissent de l'intérieur.`,
        html: `<p>Voici votre document : <a href="${downloadUrl}">${magnet.label}</a></p><p>Turxplore compose des voyages à travers le Maroc avec ceux qui le connaissent de l'intérieur.</p>`,
      }),
    });

    if (!visitorEmail.ok) {
      return { ok: false, error: "send_failed" };
    }

    if (notifyTo) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Turxplore <hello@turxplore.com>",
          to: notifyTo,
          subject: "New lead — lead magnet download",
          text: `A visitor requested "${magnet.label}".\n\nEmail: ${email}`,
        }),
      });
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "send_failed" };
  }
}
