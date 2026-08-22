"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";

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
    reduceMotion ? [1, 1] : [1, 1.12],
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -150],
  );
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [0, 0, 0.5],
  );
  const irisClip = useTransform(scrollYProgress, [0.7, 1], [100, 0]);
  const irisRadius = useTransform(
    irisClip,
    (v: number) => `circle(${v}% at 50% 50%)`,
  );
  const lineScaleX = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh]"
      data-chapter="entry"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute" style={{ inset: "-20px" }}>
          <motion.div
            style={{ scale: imageScale }}
            className="h-full w-full will-change-transform"
          >
            <motion.div
              style={{ clipPath: irisRadius }}
              className="relative h-full w-full"
            >
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
        </div>

        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-encre"
        />

        <motion.div
          style={{ y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-end pb-[15vh]"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-serif font-light tracking-[-0.04em] text-parchment"
            style={{
              fontSize: "clamp(3rem, 15vw, 12rem)",
              lineHeight: 1,
            }}
          >
            turxplore
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-3 font-sans text-caps-label uppercase tracking-[0.14em] text-parchment/80"
          >
            Morocco, edited.
          </motion.p>
        </motion.div>

        <motion.div
          style={{ scaleX: lineScaleX }}
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-parchment/30"
        />
      </div>
    </section>
  );
}
