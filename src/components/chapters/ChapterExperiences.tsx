"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Mark } from "@/components/brand/Mark";

const EXPERIENCES = [
  {
    number: "01",
    title: "Médinas Vivantes",
    subtitle: "Ruelles, artisans et murmures derrière les portes peintes.",
    image: "/images/Photo F.jpg",
  },
  {
    number: "02",
    title: "Pierres & Lumières",
    subtitle: "Où la géométrie devient prière.",
    image: "/images/route-villes-imperiales.jpg",
  },
  {
    number: "03",
    title: "L'Atlantique Sauvage",
    subtitle: "Forteresses, embruns et horizons sans fin.",
    image: "/images/voyage-atlantique-sauvage.jpg",
  },
  {
    number: "04",
    title: "Terres de Montagne",
    subtitle: "Kasbahs de pisé et silences de l'Atlas.",
    image: "/images/Photo B.jpg",
  },
  {
    number: "05",
    title: "Routes du Sud",
    subtitle: "Dunes, caravanes et nuits sous les étoiles.",
    image: "/images/route-desert-prive.jpg",
  },
  {
    number: "06",
    title: "L'Art de Vivre",
    subtitle: "Tables dressées, terrasses et couchers de soleil.",
    image: "/images/route-family-rooftop.jpg",
  },
  {
    number: "07",
    title: "Jardins Secrets",
    subtitle: "Patios parfumés et fontaines oubliées.",
    image: "/images/voyage-jemaa-elfna-night.jpg",
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
        <div className="hidden desktop:flex desktop:w-[340px] desktop:flex-shrink-0 desktop:flex-col desktop:justify-center desktop:pl-7 xl:w-[400px]">
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
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[0.25rem]">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, 65vw"
                  className="object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-[1.06]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-encre/80 via-encre/20 to-transparent" />

                <span className="absolute right-5 top-5 font-sans text-caps-label text-parchment/30">
                  {exp.number}
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-5 desktop:p-6">
                  <h3 className="font-serif text-editorial-headline text-parchment">
                    {exp.title}
                  </h3>
                  <p className="mt-1 font-sans text-interface-body leading-snug text-parchment/50">
                    {exp.subtitle}
                  </p>

                  <div className="mt-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="inline-block border border-parchment/30 px-4 py-2 font-sans text-caps-label uppercase tracking-[0.14em] text-parchment transition-colors duration-300 group-hover:border-parchment/60">
                      Parlons-en
                    </span>
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
