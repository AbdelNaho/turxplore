"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Wordmark } from "./Wordmark";
import { Mark } from "@/components/brand/Mark";

const NAV_KEYS = [
  { id: "experiences", key: "navExperiences" },
  { id: "house", key: "navHouse" },
  { id: "compose", key: "navCompose" },
] as const;

export function Header() {
  const t = useTranslations("Nav");
  const [onDark, setOnDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const checkSection = useCallback(() => {
    const headerY = 40;
    const els = document.elementsFromPoint(window.innerWidth / 2, headerY);
    const dark = els.some((el) => {
      const bg = getComputedStyle(el).backgroundColor;
      if (!bg || bg === "rgba(0, 0, 0, 0)" || bg === "transparent") return false;
      const match = bg.match(/\d+/g);
      if (!match) return false;
      const [r, g, b] = match.map(Number);
      return (r + g + b) / 3 < 80;
    });
    setOnDark(dark);
    setScrolled(window.scrollY > window.innerHeight * 0.8);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", checkSection, { passive: true });
    checkSection();
    return () => window.removeEventListener("scroll", checkSection);
  }, [checkSection]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navigateToChapter = (id: string) => {
    const el = document.querySelector(`[data-chapter="${id}"]`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const light = onDark || menuOpen;
  const bgClass =
    !menuOpen && scrolled && !onDark
      ? "bg-parchment/80 backdrop-blur-md border-b border-pierre/20"
      : "";

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${bgClass}`}
      >
        <div className="flex items-center justify-between px-3 py-3 tablet:px-5 desktop:px-7">
          <motion.div
            animate={{
              color: light ? "rgb(240 234 216)" : "rgb(31 27 21)",
            }}
            transition={{ duration: 0.4 }}
          >
            <Wordmark />
          </motion.div>

          {/* Desktop nav — 3 items */}
          <nav className="hidden items-center gap-6 nav:flex">
            {NAV_KEYS.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToChapter(item.id)}
                className={`font-sans text-interface-label transition-colors duration-300 ${
                  light
                    ? "text-parchment/70 hover:text-parchment"
                    : "text-encre/70 hover:text-encre"
                }`}
              >
                {t(item.key)}
              </button>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`font-serif text-interface-label uppercase tracking-[0.14em] transition-colors duration-300 nav:hidden ${
              light ? "text-parchment" : "text-encre"
            }`}
            aria-label={menuOpen ? t("close") : t("menu")}
          >
            {menuOpen ? t("close") : t("menu")}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex items-center bg-encre"
          >
            <div className="mx-auto w-full max-w-content px-5 py-9 desktop:px-7">
              <nav className="flex flex-col gap-5">
                {NAV_KEYS.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.2 + i * 0.08,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => navigateToChapter(item.id)}
                    className="group text-left"
                  >
                    <span className="font-serif text-display-feature text-parchment transition-colors duration-200 group-hover:text-parchment/70">
                      {t(item.key)}
                    </span>
                  </motion.button>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-8 flex items-center gap-3 border-t border-parchment/10 pt-5"
              >
                <Mark className="h-4 w-4 text-pierre" />
                <span className="font-sans text-interface-body text-parchment/40">
                  Morocco, edited.
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
