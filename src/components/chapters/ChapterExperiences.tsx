"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const EXP_IMAGES = [
  { number: "I", image: "/images/Photo F.jpg" },
  { number: "II", image: "/images/route-villes-imperiales 2.jpg" },
  { number: "III", image: "/images/route-desert-prive.jpg" },
  { number: "IV", image: "/images/le Maroc a savourer chateaux roslane.png" },
  { number: "V", image: "/images/women imperial.jpg" },
  { number: "VI", image: "/images/Le Maroc a Plusieurs.jpg" },
  { number: "VII", image: "/images/green and horizon.jpg.png" },
  { number: "VIII", image: "/images/voyage-atlantique-sauvage.jpg" },
  { number: "IX", image: "/images/Photo B.jpg" },
  { number: "X", image: "/images/route-family-rooftop 2.jpg" },
  { number: "XI", image: "/images/Jardins secret 2.jpg" },
];

export function ChapterExperiences() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();
  const t = useTranslations("Experiences");

  const experiences = EXP_IMAGES.map((item, i) => ({
    ...item,
    title: t(`exp${i + 1}_title`),
    subtitle: t(`exp${i + 1}_subtitle`),
    composeMessage: t(`exp${i + 1}_compose`),
  }));

  return (
    <section
      ref={sectionRef}
      className="relative bg-encre py-9 desktop:py-10"
      data-theme="dark"
      data-chapter="experiences"
    >
      <div className="absolute left-0 right-0 top-0 flex justify-center">
        <div className="h-px w-8 bg-pierre/20" />
      </div>

      {/* Section title */}
      <div className="mb-6 px-5 desktop:mb-8 desktop:px-7">
        <h2 className="font-serif text-display-feature text-parchment">
          {t("label")}
        </h2>
      </div>

      <div className="flex items-stretch">

        {/* Horizontal scrollable cards */}
        <div
          className="scrollbar-hide flex gap-4 overflow-x-auto px-5 desktop:gap-5 desktop:pl-5 desktop:pr-7"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {experiences.map((exp, i) => (
            <motion.article
              key={exp.number}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex-shrink-0 cursor-pointer"
              style={{
                width: "clamp(260px, 28vw, 380px)",
                scrollSnapAlign: "start",
              }}
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("compose-message", {
                    detail: exp.composeMessage,
                  }),
                );
                const el = document.querySelector('[data-chapter="compose"]');
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[0.25rem]">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, 65vw"
                  className="object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-[1.06]"
                />

                {/* Top gradient — always visible */}
                <div className="absolute inset-0 bg-gradient-to-b from-encre/60 via-encre/10 to-transparent" />

                {/* Bottom gradient — appears on hover for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-encre/70 via-encre/20 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

                {/* Roman numeral — top right */}
                <span className="absolute right-3 top-3 font-sans text-caps-label text-parchment/30 desktop:right-4 desktop:top-4">
                  {exp.number}
                </span>

                {/* Title — top left */}
                <div className="absolute left-5 right-5 top-5 desktop:left-6 desktop:right-6 desktop:top-6">
                  <h3 className="font-serif text-editorial-headline text-parchment">
                    {exp.title}
                  </h3>
                </div>

                {/* Mobile — permanent compact CTA at bottom */}
                <div className="absolute inset-x-0 bottom-0 desktop:hidden">
                  <div className="bg-gradient-to-t from-encre/80 to-transparent px-5 pb-4 pt-8">
                    <span className="block font-sans text-caption leading-snug text-parchment/50">
                      {exp.subtitle}
                    </span>
                    <span className="mt-1 inline-flex items-center gap-1.5 font-sans text-caps-label uppercase tracking-[0.14em] text-parchment/70">
                      {t("cta")}
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-3 w-3" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0L9 4m4 4L9 12" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Desktop — hover reveal strip */}
                <div className="absolute inset-x-0 bottom-0 hidden translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 desktop:block">
                  <div className="border-t border-parchment/10 bg-encre/40 px-6 py-4 backdrop-blur-md">
                    <span className="mb-1 block font-sans text-caption leading-snug text-parchment/60">
                      {exp.subtitle}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-caps-label uppercase tracking-[0.14em] text-parchment/90">
                        {t("cta")}
                      </span>
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="h-3 w-3 -translate-x-1 text-parchment/60 opacity-0 transition-all duration-300 delay-150 group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0L9 4m4 4L9 12" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}

          <div className="w-px flex-shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
