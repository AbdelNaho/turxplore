import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ExternalTextLink } from "@/components/ui/interactive";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t-[0.5px] border-ivory/10 bg-night">
      <div className="mx-auto max-w-content px-3 py-6 tablet:px-5 desktop:px-7 desktop:py-7">
        <div className="grid gap-6 desktop:grid-cols-12">
          <p className="font-serif text-body-standard text-ivory desktop:col-span-6">
            {t("manifesto")}
          </p>

          <div className="flex flex-col gap-2 desktop:col-span-3 desktop:col-start-8">
            <span className="font-sans text-caps-label uppercase text-ivory/40">
              {t("contactLabel")}
            </span>
            <span className="font-serif text-body-standard text-ivory">
              {t("addressLabel")}
            </span>
            <ExternalTextLink href="tel:+212524000000">
              {t("phoneLabel")}
            </ExternalTextLink>
            <ExternalTextLink href="mailto:journeys@turxplore.com">
              {t("emailLabel")}
            </ExternalTextLink>
          </div>

          <div className="flex flex-col gap-2 desktop:col-span-2 desktop:col-start-11">
            <span className="font-sans text-caps-label uppercase text-ivory/40">
              {t("legal")}
            </span>
            <Link href="/legal/privacy" className="font-sans text-interface-body text-ivory">
              {t("privacy")}
            </Link>
            <Link href="/legal/terms" className="font-sans text-interface-body text-ivory">
              {t("terms")}
            </Link>
            <Link href="/legal/imprint" className="font-sans text-interface-body text-ivory">
              {t("imprint")}
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-4 border-t-[0.5px] border-ivory/10 pt-4 tablet:flex-row tablet:items-center">
          <span className="font-serif italic text-caption text-ivory/40">
            {t("colophon")}
          </span>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
