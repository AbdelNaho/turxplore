"use client";

import { useEffect, useState } from "react";

type ChapterRailProps = {
  labels: string[];
};

/**
 * The signature device: a fixed spine of chapter numerals echoing the
 * brand's own language ("chapters, not days"). Highlights whichever
 * voyage section currently owns the most of the viewport.
 */
export function ChapterRail({ labels }: ChapterRailProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = labels
      .map((_, i) => document.getElementById(`voyage-${i + 1}`))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) {
          const index = sections.indexOf(mostVisible.target as HTMLElement);
          if (index !== -1) setActive(index);
        }
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: "-20% 0px -20% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [labels]);

  return (
    <nav
      aria-label="Voyages"
      className="fixed left-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-5 desktop:flex"
    >
      <div aria-hidden="true" className="h-8 w-px bg-sand-200" />
      {labels.map((label, i) => (
        <a
          key={label}
          href={`#voyage-${i + 1}`}
          aria-current={active === i ? "true" : undefined}
          className={
            "font-serif italic text-body-standard transition-colors duration-editorial ease-out " +
            (active === i ? "text-ochre" : "text-slate-300 hover:text-slate-400")
          }
        >
          {label}
        </a>
      ))}
      <div aria-hidden="true" className="h-8 w-px bg-sand-200" />
    </nav>
  );
}
