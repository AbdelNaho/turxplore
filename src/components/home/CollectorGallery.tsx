"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

type Destination = {
  num: string;
  name: string;
  image: string;
  imageAlt: string;
  note: string;
};

const destinations: Destination[] = [
  {
    num: "01",
    name: "Marrakech",
    image: "/images/route-family-rooftop.jpg",
    imageAlt:
      "Deux silhouettes sur un toit-terrasse au coucher du soleil, skyline de Marrakech",
    note: "On ne visite pas Marrakech. On s'y perd, et on finit par se trouver.",
  },
  {
    num: "02",
    name: "Le désert privé",
    image: "/images/hero-sahara.jpg",
    imageAlt: "Grandes dunes dorées du Sahara sous un ciel bleu pur",
    note: "Le silence a une couleur. C'est celle du sable à l'heure dorée.",
  },
  {
    num: "03",
    name: "L'Atlantique sauvage",
    image: "/images/route-cote-atlantique.jpg",
    imageAlt:
      "Forteresse côtière d'Essaouira avec mouette en vol, horizon atlantique",
    note: "Là où le vent ne s'excuse jamais, et la lumière non plus.",
  },
  {
    num: "04",
    name: "Les villes impériales",
    image: "/images/route-villes-imperiales.jpg",
    imageAlt: "Fontaine en zellige mandala ornée d'une lanterne dans un riad impérial",
    note: "Chaque ville impériale porte un empire dans ses murs.",
  },
  {
    num: "05",
    name: "L'héritage andalou",
    image: "/images/voyage-riad-marrakech.jpg",
    imageAlt:
      "Riad vu en plongée, stuc blanc ciselé et zellige au sol, style hispano-mauresque",
    note: "La géométrie, ici, est une forme de prière.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;
const PANEL_COUNT = destinations.length;

export function CollectorGallery() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${-(PANEL_COUNT - 1) * 100}%`],
  );

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section>
      {/* Section heading — scrolls normally before pinning */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9, ease }}
        className="px-6 py-8 text-center desktop:py-9"
      >
        <span className="font-sans text-caps-label uppercase text-pierre2">
          La collection
        </span>
        <h2 className="mt-2 font-serif text-display-section text-encre">
          Cinq pièces, cinq territoires
        </h2>
      </motion.div>

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${PANEL_COUNT * 100}vh` }}
      >
        {/* Sticky viewport */}
        <div className="sticky top-0 h-[100dvh] overflow-hidden">
          {/* Horizontal track */}
          <motion.div
            className="flex h-full"
            style={reduceMotion ? undefined : { x }}
          >
            {destinations.map((dest, i) => (
              <Panel
                key={dest.num}
                dest={dest}
                index={i}
                scrollYProgress={scrollYProgress}
                reduceMotion={!!reduceMotion}
              />
            ))}
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-6 left-1/2 z-30 h-[1.5px] w-28 -translate-x-1/2 bg-parchment/15 desktop:w-36">
            <motion.div
              className="h-full bg-parchment/60 will-change-transform"
              style={reduceMotion ? { width: "20%" } : { width: progressWidth }}
            />
          </div>

          {/* Fixed "La collection" label in corner */}
          <div className="absolute right-5 top-5 z-30 hidden font-sans text-caps-label uppercase text-parchment/25 desktop:block">
            La collection
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({
  dest,
  index,
  scrollYProgress,
  reduceMotion,
}: {
  dest: Destination;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduceMotion: boolean;
}) {
  const panelStart = index / PANEL_COUNT;
  const panelEnd = (index + 1) / PANEL_COUNT;
  const panelMid = (panelStart + panelEnd) / 2;

  const imageScale = useTransform(
    scrollYProgress,
    [panelStart, panelEnd],
    [1.15, 1],
  );

  const titleY = useTransform(
    scrollYProgress,
    [panelStart, panelMid, panelEnd],
    [60, 0, -40],
  );
  const titleOpacity = useTransform(
    scrollYProgress,
    [panelStart, panelStart + 0.04, panelEnd - 0.04, panelEnd],
    [0, 1, 1, 0],
  );

  const noteBlur = useTransform(
    scrollYProgress,
    [panelMid - 0.02, panelMid + 0.04],
    [12, 0],
  );
  const noteFilter = useMotionTemplate`blur(${noteBlur}px)`;
  const noteOpacity = useTransform(
    scrollYProgress,
    [panelMid - 0.02, panelMid + 0.04, panelEnd - 0.04, panelEnd],
    [0, 1, 1, 0],
  );

  return (
    <div
      data-piece={dest.num}
      className="relative h-full w-screen flex-shrink-0 overflow-hidden"
      data-cursor-label="Explorer"
    >
      {/* Full-bleed image with subtle zoom-out */}
      <motion.div
        className="absolute inset-[-8%] will-change-transform"
        style={reduceMotion ? undefined : { scale: imageScale }}
      >
        <Image
          src={dest.image}
          alt={dest.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-encre/40" />
      <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-encre/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-encre/60 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between px-6 py-7 desktop:px-10 desktop:py-9">
        {/* Top: piece number */}
        <div className="flex items-center gap-2">
          <span className="font-sans text-caps-label uppercase text-parchment/50">
            Pièce {dest.num}
          </span>
          <span className="text-parchment/15 desktop:text-body-standard">/</span>
          <span className="font-sans text-caps-label uppercase text-parchment/25">
            05
          </span>
        </div>

        {/* Bottom: destination name + note */}
        <div className="max-w-2xl">
          <motion.h3
            className="font-serif text-display-hero text-parchment will-change-transform"
            style={
              reduceMotion
                ? undefined
                : { y: titleY, opacity: titleOpacity }
            }
          >
            {dest.name}
          </motion.h3>
          <motion.p
            className="mt-3 max-w-lg font-serif text-body-large italic leading-relaxed text-parchment/70 will-change-transform desktop:text-editorial-subhead"
            style={
              reduceMotion
                ? undefined
                : { opacity: noteOpacity, filter: noteFilter }
            }
          >
            {dest.note}
          </motion.p>
        </div>
      </div>

      {/* Panel separator — vertical line on the right edge */}
      {index < PANEL_COUNT - 1 && (
        <div className="absolute right-0 top-[15%] z-20 h-[70%] w-px bg-parchment/10" />
      )}
    </div>
  );
}
