import { useTranslations } from "next-intl";
import { ExternalTextLink } from "@/components/ui/interactive";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t-[0.5px] border-pierre/50 bg-parchment">
      <div className="mx-auto max-w-content px-3 py-6 tablet:px-5 desktop:px-7 desktop:py-7">
        <div className="grid gap-6 desktop:grid-cols-12">
          <p className="font-serif text-body-standard text-encre desktop:col-span-6">
            {t("manifesto")}
          </p>

          <div className="flex flex-col gap-2 desktop:col-span-5 desktop:col-start-8">
            <span className="font-sans text-caps-label uppercase text-pierre2">
              {t("contactLabel")}
            </span>
            <span className="font-serif text-body-standard text-encre">
              {t("addressLabel")}
            </span>
            <ExternalTextLink href="tel:+212697047692">
              {t("phoneLabel")}
            </ExternalTextLink>
            <ExternalTextLink href="mailto:journeys@turxplore.com">
              {t("emailLabel")}
            </ExternalTextLink>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-4 border-t-[0.5px] border-pierre/50 pt-4 tablet:flex-row tablet:items-center">
          <span className="font-serif italic text-caption text-pierre2">
            {t("colophon")}
          </span>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
