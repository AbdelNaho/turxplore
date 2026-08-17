"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";

const JOURNEYS = [
  {
    number: "01",
    title: "Le Désert Privé",
    subtitle: "Silence, étoiles et dunes infinies",
    image: "/images/route-desert-prive.jpg",
  },
  {
    number: "02",
    title: "La Côte Atlantique",
    subtitle: "Forteresses et embruns sauvages",
    image: "/images/route-cote-atlantique.jpg",
  },
  {
    number: "03",
    title: "Les Villes Impériales",
    subtitle: "Zellige, fontaines et palais cachés",
    image: "/images/route-villes-imperiales.jpg",
  },
  {
    number: "04",
    title: "L'Héritage Andalou",
    subtitle: "Ruelles blanches et jardins secrets",
    image: "/images/route-heritage-andalou.jpg",
  },
  {
    number: "05",
    title: "Le Rooftop Familial",
    subtitle: "Terrasses privées, couchers de soleil",
    image: "/images/route-family-rooftop.jpg",
  },
];

export function ChapterJourneys() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["0%", `-${(JOURNEYS.length - 1) * 100}%`],
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      Math.floor(v * JOURNEYS.length),
      JOURNEYS.length - 1,
    );
    if (idx !== activeIndex) setActiveIndex(idx);
  });

  return (
    <section ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-parchment">
        {/* Section header */}
        <div className="absolute left-5 top-8 z-10 desktop:left-7">
          <span className="font-sans text-caps-label uppercase tracking-[0.14em] text-pierre2">
            Les itinéraires
          </span>
        </div>

        {/* Horizontal track */}
        <motion.div
          style={{ x }}
          className="flex h-full will-change-transform"
        >
          {JOURNEYS.map((journey, i) => (
            <JourneyFrame
              key={journey.number}
              journey={journey}
              isActive={i === activeIndex}
              index={i}
            />
          ))}
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={activeIndex}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-serif text-editorial-headline text-encre"
            >
              {JOURNEYS[activeIndex].number}
            </motion.span>
          </AnimatePresence>
          <span className="font-sans text-caps-label text-pierre2">
            / {String(JOURNEYS.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}

function JourneyFrame({
  journey,
  isActive,
  index,
}: {
  journey: (typeof JOURNEYS)[number];
  isActive: boolean;
  index: number;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: cy * -8, y: cx * 8 });
  };

  return (
    <div className="flex h-full w-screen flex-shrink-0 items-center justify-center px-5 desktop:px-7">
      <motion.div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative h-[70vh] w-full max-w-[1200px] overflow-hidden rounded-[2rem]"
        style={{ perspective: 800, transformStyle: "preserve-3d" }}
      >
        <Image
          src={journey.image}
          alt={journey.title}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-[8000ms] ease-linear"
          style={{
            transform: isActive ? "scale(1.08)" : "scale(1)",
          }}
          priority={index < 2}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-encre/60 via-transparent to-transparent" />

        {/* Frame number — top left, clipped */}
        <span
          className="absolute -left-2 -top-4 font-serif font-light text-parchment/20 select-none"
          style={{ fontSize: "clamp(6rem, 15vw, 14rem)", lineHeight: 1 }}
        >
          {journey.number}
        </span>

        {/* Title — bottom right */}
        <div className="absolute bottom-8 right-8 text-right desktop:bottom-10 desktop:right-10">
          <motion.h3
            initial={{ y: 30, opacity: 0 }}
            animate={isActive ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-display-feature text-parchment"
          >
            {journey.title}
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-2 font-sans text-interface-body text-parchment/70"
          >
            {journey.subtitle}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
