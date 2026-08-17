"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { BlurReveal } from "@/components/effects/BlurReveal";

export function ChapterEntry() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 1.15],
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -200],
  );
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0, 0.6]);

  const irisClip = useTransform(scrollYProgress, [0.7, 1], [100, 0]);
  const irisRadius = useTransform(
    irisClip,
    (v: number) => `circle(${v}% at 50% 50%)`,
  );

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background image with parallax zoom */}
        <motion.div
          style={{ scale: imageScale }}
          className="absolute inset-0 will-change-transform"
        >
          <motion.div style={{ clipPath: irisRadius }} className="h-full w-full">
            <Image
              src="/images/hero-sahara.jpg"
              alt="Dunes dorées du Sahara marocain"
              fill
              sizes="100vw"
              className="object-cover"
              priority
              quality={90}
            />
          </motion.div>
        </motion.div>

        {/* Dark overlay for readability */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-encre"
        />

        {/* Title block */}
        <motion.div
          style={{ y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-end pb-[15vh]"
        >
          <BlurReveal
            text="TURXPLORE"
            as="h1"
            className="font-serif font-light tracking-[-0.04em] text-parchment"
            style={{
              fontSize: "clamp(3rem, 15vw, 12rem)",
              lineHeight: 1,
            }}
            delay={0.3}
            stagger={0.06}
            triggerOnView={false}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-3 font-sans text-caps-label uppercase tracking-[0.14em] text-parchment/80"
          >
            Morocco, edited.
          </motion.p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-parchment/40"
          />
          <motion.svg
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
            width="12"
            height="7"
            viewBox="0 0 12 7"
            className="text-parchment/40"
          >
            <path
              d="M1 1l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}
