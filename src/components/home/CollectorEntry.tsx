"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Mark } from "@/components/brand/Mark";
import { TextReveal } from "@/components/effects/TextReveal";

const ease = [0.22, 1, 0.36, 1] as const;

export function CollectorEntry() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.45]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.28], [0, -70]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.9], [0.22, 0.75]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[160vh]">
      <section className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* Jemaa el-Fna night — deep zoom parallax */}
        <motion.div
          className="absolute inset-[-14%] will-change-transform"
          style={reduceMotion ? undefined : { scale: imageScale, y: imageY }}
        >
          <Image
            src="/images/voyage-jemaa-elfna-night.jpg"
            alt="Place Jemaa el-Fna de nuit, lumières chaudes et Koutoubia illuminée"
            fill
            sizes="140vw"
            priority
            className="object-cover object-center"
          />
        </motion.div>

        {/* Progressive dark overlay */}
        <motion.div
          className="absolute inset-0 bg-encre"
          style={reduceMotion ? { opacity: 0.28 } : { opacity: overlayOpacity }}
        />

        {/* Bottom gradient → parchment */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[38%] bg-gradient-to-t from-parchment via-parchment/70 to-transparent" />

        {/* Hero text — character-by-character reveal */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
          style={reduceMotion ? undefined : { opacity: textOpacity, y: textY }}
        >
          {/* Rotating zellige mark */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.4, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.4, delay: 0.1, ease }}
          >
            <motion.div
              animate={reduceMotion ? {} : { rotate: 360 }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Mark className="mx-auto mb-5 h-7 w-7 text-parchment/35" />
            </motion.div>
          </motion.div>

          {/* "Royaume du Maroc" — cut reveal */}
          <div className="overflow-hidden">
            <motion.span
              initial={reduceMotion ? false : { y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="block font-sans text-caps-label uppercase text-parchment/40"
            >
              Royaume du Maroc
            </motion.span>
          </div>

          {/* Title — character stagger */}
          <h1 className="mt-4">
            <TextReveal
              text="Le Maroc,"
              as="span"
              className="block font-serif text-display-hero text-parchment"
              delay={0.7}
            />
            <TextReveal
              text="composé pour vous."
              as="span"
              className="block font-serif text-display-hero italic text-pierre"
              delay={1.05}
            />
          </h1>

          {/* Subtitle — smooth entrance */}
          <div className="mt-5 overflow-hidden">
            <motion.p
              initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.9, ease }}
              className="max-w-md font-serif text-body-large leading-relaxed text-parchment/60"
            >
              Un carnet de route avant le voyage&nbsp;— pour regarder, et pour
              savoir.
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll cue — delayed appearance */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
          style={reduceMotion ? undefined : { opacity: scrollCueOpacity }}
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
          >
            <motion.div
              animate={reduceMotion ? {} : { y: [0, 8, 0] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-2"
            >
              <span className="font-sans text-caption uppercase tracking-[0.24em] text-encre/45">
                Défiler
              </span>
              <svg
                width="12"
                height="20"
                viewBox="0 0 12 20"
                fill="none"
                className="text-encre/35"
              >
                <path
                  d="M6 2v16m0 0 4.5-4.5M6 18 1.5 13.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
