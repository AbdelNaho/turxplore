"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";
import Image from "next/image";

const EXPERIENCES = [
  {
    number: "01",
    title: "Dunes & Silence",
    description: "Bivouacs privés sous les étoiles du Sahara",
    image: "/images/hero-sahara.jpg",
  },
  {
    number: "02",
    title: "Médinas Vivantes",
    description: "Artisans, souks et lumières nocturnes",
    image: "/images/voyage-jemaa-elfna-night.jpg",
  },
  {
    number: "03",
    title: "Pierre & Lumière",
    description: "Architecture sacrée et géométries infinies",
    image: "/images/voyage-hassan-ii-mosque.jpg",
  },
  {
    number: "04",
    title: "Terrasses Privées",
    description: "Couchers de soleil et tables dressées sur les toits",
    image: "/images/route-family-rooftop.jpg",
  },
  {
    number: "05",
    title: "L'Atlantique Sauvage",
    description: "Côtes brutes, vent et forteresses portugaises",
    image: "/images/voyage-atlantique-sauvage.jpg",
  },
  {
    number: "06",
    title: "Riads & Jardins",
    description: "Patios secrets et jardins parfumés",
    image: "/images/voyage-riad-marrakech.jpg",
  },
];

export function ChapterExperiences() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  const activeImage =
    activeIdx !== null
      ? EXPERIENCES[activeIdx].image
      : "/images/voyage-atlantique-sauvage.jpg";

  return (
    <section
      ref={sectionRef}
      className="relative bg-parchment py-9 desktop:py-10"
    >
      <div className="mx-auto max-w-content px-5 desktop:px-7">
        <span className="mb-6 block font-sans text-caps-label uppercase tracking-[0.14em] text-pierre2">
          Les expériences
        </span>

        <div className="grid gap-6 desktop:grid-cols-12 desktop:gap-5">
          {/* Left — Interactive list */}
          <div className="desktop:col-span-6">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.number}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
                className="group cursor-pointer border-b border-pierre/30 py-4 desktop:py-5"
                data-cursor-label={exp.title}
              >
                <div className="flex items-baseline gap-4">
                  <motion.span
                    animate={{
                      color:
                        activeIdx === i
                          ? "rgb(var(--color-aubergine))"
                          : "rgb(var(--color-pierre))",
                    }}
                    transition={{ duration: 0.3 }}
                    className="font-sans text-caps-label tabular-nums"
                  >
                    {exp.number}
                  </motion.span>
                  <motion.h3
                    animate={{
                      x: activeIdx === i && !reduceMotion ? 12 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    }}
                    className="font-serif text-editorial-headline text-encre"
                  >
                    {exp.title}
                  </motion.h3>
                </div>
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={
                    activeIdx === i
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden pl-[calc(2ch+32px)] font-sans text-interface-body text-encre2"
                >
                  {exp.description}
                </motion.p>
              </motion.div>
            ))}
          </div>

          {/* Right — Image preview */}
          <div className="hidden desktop:col-span-5 desktop:col-start-8 desktop:block">
            <div className="sticky top-[15vh]">
              <div className="relative h-[70vh] overflow-hidden rounded-[1rem]">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, filter: "blur(8px)", scale: 1.04 }}
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    exit={{ opacity: 0, filter: "blur(8px)", scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeImage}
                      alt={
                        activeIdx !== null
                          ? EXPERIENCES[activeIdx].title
                          : "Morocco"
                      }
                      fill
                      sizes="45vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Aubergine accent line */}
                <motion.div
                  animate={{
                    scaleX: activeIdx !== null ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-aubergine"
                />
              </div>
            </div>
          </div>

          {/* Mobile — show active image inline */}
          <div className="desktop:hidden">
            <AnimatePresence mode="popLayout">
              {activeIdx !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "50vh" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative overflow-hidden rounded-[1rem]"
                >
                  <Image
                    src={EXPERIENCES[activeIdx].image}
                    alt={EXPERIENCES[activeIdx].title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
