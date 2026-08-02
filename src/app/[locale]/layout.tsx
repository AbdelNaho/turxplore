import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { fraunces, outfit } from "@/lib/fonts";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

export const viewport: Viewport = {
  themeColor: "#1A120D",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const localePaths: Record<string, string> = { en: "/", fr: "/fr", es: "/es", "pt-BR": "/pt-BR" };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Footer" });
  return {
    metadataBase: new URL("https://turxplore.com"),
    title: {
      default: "Turxplore — Morocco, Privately.",
      template: "%s — Turxplore",
    },
    description: t("manifesto"),
    alternates: {
      canonical: localePaths[locale],
      languages: localePaths,
    },
    openGraph: {
      title: "Turxplore — Morocco, Privately.",
      description: t("manifesto"),
      siteName: "Turxplore",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Turxplore — Morocco, Privately.",
      description: t("manifesto"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${fraunces.variable} ${outfit.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-night text-ivory antialiased">
        <NextIntlClientProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-night focus:px-3 focus:py-2 focus:font-sans focus:text-interface-label focus:text-ivory"
          >
            Skip to content
          </a>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
