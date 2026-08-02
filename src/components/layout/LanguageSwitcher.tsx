"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  en: "EN",
  fr: "FR",
  es: "ES",
  "pt-BR": "PT",
};

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const t = useTranslations("Nav");
  const activeLocale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("language")} className={className}>
      <ul className="flex items-center gap-3">
        {routing.locales.map((locale) => (
          <li key={locale}>
            <Link
              href={pathname}
              locale={locale}
              aria-current={locale === activeLocale ? "true" : undefined}
              className={
                "font-sans text-caps-label uppercase transition-colors duration-interface ease-out " +
                (locale === activeLocale
                  ? "text-clay"
                  : "text-ivory/40 hover:text-ivory")
              }
            >
              {localeLabels[locale] ?? locale}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
