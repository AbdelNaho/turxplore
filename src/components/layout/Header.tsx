"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Wordmark } from "./Wordmark";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navItems = [
  { href: "/about", key: "atelier" },
  { href: "/destinations", key: "destinations" },
  { href: "/compositions", key: "compositions" },
  { href: "/journal", key: "journal" },
  { href: "/inquire", key: "inquire" },
] as const;

export function Header() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-interface ease-out " +
        (scrolled
          ? "bg-night/90 backdrop-blur-xl border-b-[0.5px] border-ivory/10"
          : "bg-transparent border-b-[0.5px] border-transparent")
      }
    >
      <div
        className={
          "overflow-hidden text-center transition-all duration-interface ease-out " +
          (scrolled ? "max-h-0 opacity-0" : "max-h-8 border-b-[0.5px] border-ivory/5 py-2 opacity-100")
        }
      >
        <span className="font-sans text-caps-label uppercase tracking-[0.3em] text-clay/70">
          {t("kingdom")}
        </span>
      </div>

      <div className="mx-auto flex max-w-content items-center justify-between gap-6 px-3 py-3 tablet:px-5 desktop:px-7 desktop:py-4">
        <Wordmark className="text-ivory" />

        <nav aria-label="Primary" className="hidden nav:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-sans text-interface-label text-ivory/80 border-b border-transparent transition-colors duration-interface ease-out hover:text-clay"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden nav:block">
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className="font-sans text-caps-label uppercase text-ivory nav:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? t("close") : t("menu")}
        </button>
      </div>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="min-h-[100dvh] overflow-y-auto border-t-[0.5px] border-ivory/10 bg-night px-3 py-4 nav:hidden"
        >
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-editorial-headline text-ivory"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher className="mt-6" />
        </div>
      ) : null}
    </header>
  );
}
