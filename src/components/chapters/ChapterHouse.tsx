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

function ManifestoReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="font-serif text-body-large leading-relaxed text-encre"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.4,
            delay: i * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block will-change-[opacity,transform]"
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </p>
  );
}

export function ChapterHouse() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.5],
    reduceMotion ? [1, 1] : [1.3, 1],
  );

  return (
    <section className="bg-parchment">
      {/* Hero image with zoom-out */}
      <div ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/images/voyage-riad-marrakech.jpg"
            alt="Riad marocain vu du ciel, architecture traditionnelle"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-encre/30" />

        {/* Title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-serif text-display-hero text-parchment"
          >
            La Maison
          </motion.h2>
        </div>
      </div>

      {/* Manifesto text */}
      <div className="mx-auto max-w-reading px-5 py-9 desktop:py-10">
        {/* Zellige mark */}
        <div className="mb-6 flex justify-center">
          <motion.div
            animate={reduceMotion ? {} : { rotate: 360 }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Mark className="h-8 w-8 text-pierre" />
          </motion.div>
        </div>

        <ManifestoReveal text="Turxplore n'est pas une agence de voyage. C'est un regard. Une manière de lire le Maroc à travers ses silences autant que ses éclats." />

        <div className="my-6 h-px w-full bg-pierre/30" />

        <ManifestoReveal text="Nous composons des itinéraires comme on compose un livre : chaque chapitre a son rythme, sa lumière, ses personnages. Le désert ne ressemble pas à la médina. L'Atlantique ne parle pas comme l'Atlas." />

        <div className="my-6 h-px w-full bg-pierre/30" />

        <ManifestoReveal text="Chaque voyage est une édition limitée. Pas de catalogue, pas de circuit. Un dialogue entre vos envies et notre connaissance intime du territoire." />
      </div>
    </section>
  );
}
