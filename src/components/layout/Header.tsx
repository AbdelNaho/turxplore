"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Wordmark } from "./Wordmark";

const pieces = [
  { num: "01", place: "Marrakech" },
  { num: "02", place: "Le désert privé" },
  { num: "03", place: "L'Atlantique sauvage" },
  { num: "04", place: "Les villes impériales" },
  { num: "05", place: "L'héritage andalou" },
] as const;

export function Header() {
  const [current, setCurrent] = useState<(typeof pieces)[number] | null>(null);
  const [onDark, setOnDark] = useState(false);

  const checkDarkSection = useCallback(() => {
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
  }, []);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-piece]"),
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const num = visible.target.getAttribute("data-piece");
          const match = pieces.find((p) => p.num === num);
          if (match) setCurrent(match);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-15% 0px -15% 0px" },
    );
    targets.forEach((t) => observer.observe(t));

    window.addEventListener("scroll", checkDarkSection, { passive: true });
    checkDarkSection();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkDarkSection);
    };
  }, [checkDarkSection]);

  const textColor = onDark ? "text-parchment" : "text-encre";
  const metaColor = onDark ? "text-parchment/50" : "text-pierre2";
  const dotColor = onDark ? "text-parchment/20" : "text-encre/30";

  return (
    <>
      <motion.div
        className="fixed left-3 top-3 z-50 tablet:left-5 tablet:top-5 desktop:left-7 desktop:top-7"
        animate={{ color: onDark ? "rgb(240 234 216)" : "rgb(31 27 21)" }}
        transition={{ duration: 0.4 }}
      >
        <Wordmark className={textColor} />
      </motion.div>

      {current ? (
        <motion.div
          className="fixed bottom-3 left-3 z-50 flex items-baseline gap-2 font-sans text-caption tablet:bottom-5 tablet:left-5 desktop:bottom-7 desktop:left-7"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className={metaColor}>{current.num}</span>
          <span className={dotColor}>·</span>
          <span className={metaColor}>{current.place}</span>
        </motion.div>
      ) : null}
    </>
  );
}
