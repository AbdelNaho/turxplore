"use server";

type SubmitResult = { ok: true } | { ok: false; error: string };

const MAGNETS = {
  carnet: { file: "turxplore-carnet-du-maroc" },
  cartes: { file: "turxplore-cartes-medinas" },
} as const;

type MagnetKey = keyof typeof MAGNETS;

function isMagnetKey(value: string): value is MagnetKey {
  return value === "carnet" || value === "cartes";
}

// Every site locale now has its own PDF; the file suffix matches the
// locale exactly (fr, en, es, pt-BR).
const FILE_LOCALE: Record<string, "fr" | "en" | "es" | "pt-BR"> = {
  fr: "fr",
  en: "en",
  es: "es",
  "pt-BR": "pt-BR",
};

const EMAIL_COPY = {
  fr: {
    label: { carnet: "Le Carnet du Maroc", cartes: "Cartes & Médinas" },
    subject: (label: string) => `${label} · votre document Turxplore`,
    body: (label: string, url: string) =>
      `Voici votre document : ${url}\n\nTurxplore compose des voyages à travers le Maroc avec ceux qui le connaissent de l'intérieur.`,
    html: (label: string, url: string) =>
      `<p>Voici votre document : <a href="${url}">${label}</a></p><p>Turxplore compose des voyages à travers le Maroc avec ceux qui le connaissent de l'intérieur.</p>`,
  },
  en: {
    label: { carnet: "The Morocco Notebook", cartes: "Maps & Medinas" },
    subject: (label: string) => `${label} · your Turxplore document`,
    body: (label: string, url: string) =>
      `Here is your document: ${url}\n\nTurxplore composes journeys through Morocco with those who know it from within.`,
    html: (label: string, url: string) =>
      `<p>Here is your document: <a href="${url}">${label}</a></p><p>Turxplore composes journeys through Morocco with those who know it from within.</p>`,
  },
  es: {
    label: { carnet: "El Cuaderno de Marruecos", cartes: "Mapas y Medinas" },
    subject: (label: string) => `${label} · su documento Turxplore`,
    body: (label: string, url: string) =>
      `Aquí tiene su documento: ${url}\n\nTurxplore compone viajes por Marruecos junto a quienes lo conocen desde dentro.`,
    html: (label: string, url: string) =>
      `<p>Aquí tiene su documento: <a href="${url}">${label}</a></p><p>Turxplore compone viajes por Marruecos junto a quienes lo conocen desde dentro.</p>`,
  },
  "pt-BR": {
    label: { carnet: "O Caderno do Marrocos", cartes: "Mapas e Medinas" },
    subject: (label: string) => `${label} · seu documento Turxplore`,
    body: (label: string, url: string) =>
      `Aqui está o seu documento: ${url}\n\nA Turxplore compõe viagens por Marrocos com quem o conhece por dentro.`,
    html: (label: string, url: string) =>
      `<p>Aqui está o seu documento: <a href="${url}">${label}</a></p><p>A Turxplore compõe viagens por Marrocos com quem o conhece por dentro.</p>`,
  },
} as const;

/**
 * Lead-magnet capture — visitor leaves an email, receives a download link
 * for the requested PDF in their site language, and the advisor is
 * notified of the new lead. Sends via Resend when RESEND_API_KEY is
 * configured; otherwise logs server-side and still reports success so the
 * funnel is testable before the email pipeline is wired up.
 */
export async function sendLeadMagnet(_prevState: SubmitResult | null, formData: FormData): Promise<SubmitResult> {
  const email = String(formData.get("email") ?? "").trim();
  const magnetKey = String(formData.get("magnet") ?? "").trim();
  const locale = String(formData.get("locale") ?? "en").trim();

  if (!email || !email.includes("@")) {
    return { ok: false, error: "invalid_email" };
  }
  if (!isMagnetKey(magnetKey)) {
    return { ok: false, error: "invalid_magnet" };
  }

  const fileLocale = FILE_LOCALE[locale] ?? "en";
  const copy = EMAIL_COPY[fileLocale];
  const label = copy.label[magnetKey];
  const magnet = MAGNETS[magnetKey];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://turxplore.com";
  const downloadUrl = `${siteUrl}/downloads/${magnet.file}-${fileLocale}.pdf`;

  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.INQUIRY_NOTIFICATION_EMAIL;

  if (!apiKey) {
    console.warn("[leadMagnet] RESEND_API_KEY not set — logging only:", { email, magnet: magnetKey, locale: fileLocale });
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
        from: "Turxplore <journeys@turxplore.com>",
        to: email,
        subject: copy.subject(label),
        text: copy.body(label, downloadUrl),
        html: copy.html(label, downloadUrl),
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
          from: "Turxplore <journeys@turxplore.com>",
          to: notifyTo,
          subject: "New lead · lead magnet download",
          text: `A visitor requested "${label}" (${fileLocale}).\n\nEmail: ${email}`,
        }),
      });
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "send_failed" };
  }
}
