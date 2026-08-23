"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function SectionOuverture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 1.08],
  );

  const img2Opacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);

  const dateOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.18, 0.5, 0.6],
    [0, 1, 1, 0],
  );
  const dateY = useTransform(
    scrollYProgress,
    [0.08, 0.18],
    reduceMotion ? [0, 0] : [20, 0],
  );

  const titleOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.28, 0.5, 0.6],
    [0, 1, 1, 0],
  );
  const titleY = useTransform(
    scrollYProgress,
    [0.18, 0.28],
    reduceMotion ? [0, 0] : [30, 0],
  );

  const bodyOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.5, 0.6],
    [0, 1, 1, 0],
  );
  const bodyY = useTransform(
    scrollYProgress,
    [0.3, 0.4],
    reduceMotion ? [0, 0] : [20, 0],
  );

  const ctaOpacity = useTransform(scrollYProgress, [0.7, 0.82], [0, 1]);
  const ctaY = useTransform(
    scrollYProgress,
    [0.7, 0.82],
    reduceMotion ? [0, 0] : [16, 0],
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh]"
      data-chapter="ouverture"
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden bg-encre"
        data-theme="dark"
      >
        <motion.div
          style={{ scale: imageScale }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/images/Photo W.jpg"
            alt="Silhouette sous un bab marocain, contre-jour doré"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          style={{ opacity: img2Opacity }}
          className="absolute inset-0"
        >
          <Image
            src="/images/Photo A.jpg"
            alt="Femmes berbères préparant l'huile d'argan"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-encre/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-5">
          <motion.span
            style={{ opacity: dateOpacity, y: dateY }}
            className="font-sans text-caps-label uppercase tracking-[0.14em] text-pierre will-change-[opacity,transform]"
          >
            XIIe siècle · aujourd&apos;hui
          </motion.span>

          <motion.h2
            style={{ opacity: titleOpacity, y: titleY }}
            className="mt-4 text-center font-serif text-display-feature text-parchment will-change-[opacity,transform]"
          >
            Un pays qui se compose
          </motion.h2>

          <motion.p
            style={{ opacity: bodyOpacity, y: bodyY }}
            className="mt-3 max-w-[44ch] text-center font-serif text-body-large italic text-parchment/60 will-change-[opacity,transform]"
          >
            comme un livre dont on n&apos;a jamais fini d&apos;écrire les
            chapitres.
          </motion.p>
        </div>

        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute bottom-[15vh] left-0 right-0 flex justify-center will-change-[opacity,transform]"
        >
          <Link
            href="/ouverture"
            className="group font-sans text-interface-label text-parchment/60 transition-colors duration-300 hover:text-parchment"
          >
            Lire l&apos;Ouverture
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
