"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Mark } from "@/components/brand/Mark";

const CHAPTERS = [
  { id: "entry", label: "Accueil" },
  { id: "experiences", label: "Les Expériences" },
  { id: "house", label: "La Casa" },
  { id: "compose", label: "Composer" },
  { id: "ressources", label: "Ressources" },
];

export function PoinconNav() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const rotation = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 360],
  );

  useEffect(() => {
    const sections = CHAPTERS.map((c) =>
      document.querySelector(`[data-chapter="${c.id}"]`),
    ).filter(Boolean) as Element[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target);
            if (idx !== -1) {
              setActive(idx);
              setVisible(idx > 0);
            }
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  if (reduceMotion) return null;

  const isDark = active === 1 || active === 3;

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 desktop:flex"
      aria-label="Navigation chapitres"
    >
      <motion.div style={{ rotate: rotation }}>
        <Mark
          className={`h-5 w-5 transition-colors duration-300 ${
            isDark ? "text-parchment/60" : "text-pierre"
          }`}
        />
      </motion.div>

      <div className="mt-2 flex flex-col items-center gap-2">
        {CHAPTERS.map((chapter, i) => (
          <button
            key={chapter.id}
            onClick={() => {
              const el = document.querySelector(
                `[data-chapter="${chapter.id}"]`,
              );
              if (!el) return;
              el.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center justify-center p-1"
            aria-label={chapter.label}
          >
            <motion.div
              animate={{
                scale: active === i ? 1.5 : 1,
                opacity: active === i ? 1 : 0.4,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={`h-[5px] w-[5px] rounded-full transition-colors duration-300 ${
                active === i
                  ? isDark
                    ? "bg-parchment"
                    : "bg-aubergine"
                  : isDark
                    ? "bg-parchment/40"
                    : "bg-pierre"
              }`}
            />
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
