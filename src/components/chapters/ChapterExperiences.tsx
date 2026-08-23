"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Mark } from "@/components/brand/Mark";

const EXPERIENCES = [
  {
    number: "I",
    title: "Médinas Vivantes",
    subtitle: "Ruelles, artisans, murmures.",
    image: "/images/Photo F.jpg",
    composeMessage: "Bonjour, je rêve de me perdre dans les médinas du Maroc, entre ruelles, artisans et murmures. Pouvons-nous en parler ?",
  },
  {
    number: "II",
    title: "Pierres & Lumières",
    subtitle: "Géométrie, silence, lumière.",
    image: "/images/route-villes-imperiales 2.jpg",
    composeMessage: "Bonjour, je souhaite découvrir le patrimoine architectural du Maroc — géométrie, silence et lumière. Composons ensemble.",
  },
  {
    number: "III",
    title: "Routes du Sud",
    subtitle: "Dunes, caravanes, étoiles.",
    image: "/images/route-desert-prive.jpg",
    composeMessage: "Bonjour, je rêve d'une aventure dans le sud marocain, entre dunes, caravanes et nuits étoilées.",
  },
  {
    number: "IV",
    title: "Le Maroc à Savourer",
    subtitle: "Bien-être, saveurs, art de vivre.",
    image: "/images/le Maroc a savourer chateaux roslane.png",
    composeMessage: "Bonjour, je souhaite vivre une expérience gastronomique et bien-être au Maroc. Parlons-en.",
  },
  {
    number: "V",
    title: "Le Maroc Entre Nous",
    subtitle: "Intimité, douceur, à deux.",
    image: "/images/women imperial.jpg",
    composeMessage: "Bonjour, nous aimerions un voyage en amoureux au Maroc — intimité, douceur et moments à deux.",
  },
  {
    number: "VI",
    title: "Le Maroc à Plusieurs",
    subtitle: "Amis, famille, partage.",
    image: "/images/Le Maroc a Plusieurs.jpg",
    composeMessage: "Bonjour, nous souhaitons organiser un voyage en groupe au Maroc — amis, famille et partage.",
  },
  {
    number: "VII",
    title: "Greens & Horizons",
    subtitle: "Golf, parcours, évasion.",
    image: "/images/green and horizon.jpg.png",
    composeMessage: "Bonjour, je suis intéressé par un séjour golf au Maroc — parcours d'exception et horizons.",
  },
  {
    number: "VIII",
    title: "L'Atlantique Sauvage",
    subtitle: "Embruns, forteresses, liberté.",
    image: "/images/voyage-atlantique-sauvage.jpg",
    composeMessage: "Bonjour, j'aimerais explorer la côte atlantique marocaine — embruns, forteresses et liberté.",
  },
  {
    number: "IX",
    title: "Terres de Montagne",
    subtitle: "Kasbahs, pisé, silence.",
    image: "/images/Photo B.jpg",
    composeMessage: "Bonjour, je rêve d'explorer les montagnes du Maroc, ses kasbahs et ses villages de pisé.",
  },
  {
    number: "X",
    title: "L'Art de Vivre",
    subtitle: "Tables, terrasses, crépuscule.",
    image: "/images/route-family-rooftop 2.jpg",
    composeMessage: "Bonjour, je souhaite vivre l'art de vivre marocain — tables, terrasses et crépuscules.",
  },
  {
    number: "XI",
    title: "Jardins Secrets",
    subtitle: "Patios, parfums, fontaines.",
    image: "/images/Jardins secret 2.jpg",
    composeMessage: "Bonjour, j'aimerais découvrir les jardins secrets du Maroc — patios, parfums et fontaines.",
  },
];

export function ChapterExperiences() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();

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

      {/* Mobile title */}
      <div className="mb-6 px-5 desktop:hidden">
        <span className="font-sans text-caps-label uppercase tracking-[0.14em] text-pierre2/60">
          Les expériences
        </span>
        <h2 className="mt-2 font-serif text-display-section text-parchment">
          Compositions
        </h2>
      </div>

      <div className="flex items-stretch">
        {/* Title column — desktop only */}
        <div className="hidden desktop:flex desktop:w-[420px] desktop:flex-shrink-0 desktop:flex-col desktop:justify-center desktop:pl-7 xl:w-[480px]">
          <div className="relative">
            <motion.div
              animate={reduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              className="absolute -left-3 -top-6 opacity-[0.03]"
            >
              <Mark className="h-[180px] w-[180px] text-parchment" />
            </motion.div>

            <span className="relative font-sans text-caps-label uppercase tracking-[0.14em] text-pierre2/60">
              Les expériences
            </span>
            <h2 className="relative mt-3 font-serif text-display-feature text-parchment">
              Compositions
            </h2>
            <p className="relative mt-3 max-w-[26ch] font-serif text-body-standard italic text-parchment/40">
              Chaque voyage est une composition sur mesure.
            </p>
          </div>
        </div>

        {/* Horizontal scrollable cards */}
        <div
          className="scrollbar-hide flex gap-4 overflow-x-auto px-5 desktop:gap-5 desktop:pl-5 desktop:pr-7"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {EXPERIENCES.map((exp, i) => (
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
                width: "clamp(240px, 25vw, 340px)",
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
                      Explorer
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
                        Explorer
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
