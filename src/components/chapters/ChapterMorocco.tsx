"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";
import Image from "next/image";
import { Mark } from "@/components/brand/Mark";

const WORDS = [
  { text: "Lumière", size: "display-hero" as const },
  { text: "Silence", size: "display-hero" as const },
  { text: "Artisanat", size: "display-hero" as const },
];

const IMAGES = [
  {
    src: "/images/voyage-jemaa-elfna-night.jpg",
    alt: "Les souks de Jemaa el-Fna de nuit",
  },
  {
    src: "/images/voyage-hassan-ii-mosque.jpg",
    alt: "Mosquée Hassan II, architecture monumentale",
  },
  {
    src: "/images/voyage-riad-marrakech.jpg",
    alt: "Riad traditionnel vu du ciel",
  },
];

function WordReveal({ word, delay }: { word: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <span ref={ref} className="block overflow-hidden">
      <motion.span
        initial={{ y: "100%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : undefined}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="block will-change-transform"
      >
        {word}
      </motion.span>
    </span>
  );
}

function UnfurlImage({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.div
      ref={ref}
      initial={
        reduceMotion
          ? { opacity: 1 }
          : { opacity: 0, rotateX: 15, y: 60, scale: 0.95 }
      }
      animate={
        inView
          ? { opacity: 1, rotateX: 0, y: 0, scale: 1 }
          : undefined
      }
      transition={{
        duration: 1,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-[1rem]"
      style={{ perspective: 800 }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="object-cover"
      />
    </motion.div>
  );
}

export function ChapterMorocco() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const inkWipe = useTransform(
    scrollYProgress,
    [0, 0.3],
    reduceMotion ? ["0%", "0%"] : ["100%", "0%"],
  );

  return (
    <>
      {/* Ink flood transition */}
      <motion.div
        style={{ y: inkWipe }}
        className="relative z-10 h-0"
      >
        <div className="h-screen w-full bg-encre" />
      </motion.div>

      <section
        ref={containerRef}
        className="relative bg-encre py-9 desktop:py-10"
        data-theme="dark"
      >
        {/* Zellige pattern background */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.03]">
          <motion.div
            animate={reduceMotion ? {} : { rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            <Mark className="h-[80vh] w-[80vh] text-parchment" />
          </motion.div>
        </div>

        {/* Two-column layout */}
        <div className="mx-auto max-w-content px-5 desktop:px-7">
          <div className="grid gap-7 desktop:grid-cols-12 desktop:gap-5">
            {/* Left — Sticky text */}
            <div className="desktop:col-span-5">
              <div className="desktop:sticky desktop:top-[20vh]">
                <span className="mb-4 block font-sans text-caps-label uppercase tracking-[0.14em] text-pierre">
                  Le pays
                </span>

                {WORDS.map((w, i) => (
                  <div key={w.text} className="mb-6 desktop:mb-8">
                    <span className="font-serif text-display-hero text-parchment">
                      <WordReveal word={w.text} delay={i * 0.15} />
                    </span>
                    <p className="mt-2 max-w-[32ch] font-sans text-interface-body text-parchment/60">
                      {w.text === "Lumière"
                        ? "Une lumière qui sculpte chaque surface, transforme chaque ruelle en tableau vivant."
                        : w.text === "Silence"
                          ? "Dans le désert, le silence devient matière. Il enveloppe, il révèle."
                          : "Des mains qui perpétuent des gestes millénaires, du zellige au cuir tannée."}
                    </p>
                  </div>
                ))}

              </div>
            </div>

            {/* Right — Scrolling images */}
            <div className="space-y-6 desktop:col-span-6 desktop:col-start-7 desktop:space-y-7">
              {IMAGES.map((img, i) => (
                <UnfurlImage
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
