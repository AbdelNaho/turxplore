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

const SPREADS = [
  {
    epoch: "I",
    title: "Les Berbères & la terre",
    text: "Avant les dynasties, avant les routes, il y avait la terre. Les Berbères l'ont habitée comme on habite un silence. Avec patience, avec les mains.",
    mainImage: { src: "/images/Photo A.jpg", alt: "Femmes berbères préparant l'huile d'argan" },
    detailImage: { src: "/images/Photo B.jpg", alt: "Kasbah de pisé dans la vallée de l'Atlas" },
  },
  {
    epoch: "II",
    title: "Les dynasties & la géométrie",
    text: "Les Almohades ont tracé dans la pierre ce que les Berbères portaient en eux : l'ordre caché du monde. Chaque carreau de zellige est une preuve mathématique de la beauté.",
    mainImage: { src: "/images/Photo C.jpg", alt: "Zellige marocain, motif géométrique en gros plan" },
    detailImage: { src: "/images/Photo D.jpg", alt: "Cour intérieure de medersa, stuc et zellige" },
  },
  {
    epoch: "III",
    title: "Les routes & les échanges",
    text: "Le Maroc n'a jamais été un pays fermé. Les épices arrivent du Sud, les idées de l'Est, les techniques du Nord. Chaque ruelle de médina est un carrefour.",
    mainImage: { src: "/images/Photo E.jpg", alt: "Épices en pyramides au souk, curcuma et paprika" },
    detailImage: { src: "/images/Photo F.jpg", alt: "Femmes sous une arche de médina, Marrakech" },
  },
  {
    epoch: "IV",
    title: "Le Maroc d'aujourd'hui",
    text: "Ce qui reste quand les touristes partent : les toits, les gestes, le thé versé de haut. Un pays qui ne se montre qu'à ceux qui prennent le temps.",
    mainImage: { src: "/images/Photo G.jpg", alt: "Toits de la médina de Fès, vue dense et ocre" },
    detailImage: { src: "/images/Photo H.jpg", alt: "Verre de thé à la menthe, motifs dorés" },
  },
];

function TextReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const words = text.split(" ");

  return (
    <p ref={ref} className="font-serif text-body-large leading-relaxed text-parchment/70">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.025,
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

function ParallaxImage({
  src,
  alt,
  className,
  sizes = "100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-30, 30],
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [1, 1, 1] : [1.08, 1, 1.02],
  );

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`overflow-hidden ${className ?? ""}`}
    >
      <motion.div style={{ y, scale }} className="h-full w-full will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      </motion.div>
    </motion.div>
  );
}

function Spread({
  spread,
  index,
}: {
  spread: (typeof SPREADS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="py-7 desktop:py-9">
      {/* Epoch number + title */}
      <div className="mb-6 desktop:mb-7">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-2 block font-serif text-display-hero italic text-aubergine/40"
          style={{ fontSize: "clamp(4rem, 10vw, 8rem)", lineHeight: 0.85 }}
        >
          {spread.epoch}
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-display-feature italic text-parchment"
        >
          {spread.title}
        </motion.h3>
      </div>

      {/* Main image + text — alternating layout */}
      <div className="grid gap-5 desktop:grid-cols-12 desktop:gap-5">
        <div className={`${isEven ? "desktop:col-span-7" : "desktop:col-span-7 desktop:col-start-6"}`}>
          <ParallaxImage
            src={spread.mainImage.src}
            alt={spread.mainImage.alt}
            className="relative aspect-[3/2] w-full rounded-[0.25rem]"
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
        </div>
        <div className={`flex items-end ${isEven ? "desktop:col-span-4 desktop:col-start-9" : "desktop:col-span-4 desktop:col-start-1 desktop:row-start-1"}`}>
          <div className="max-w-[36ch]">
            <TextReveal text={spread.text} delay={0.2} />
          </div>
        </div>
      </div>

      {/* Detail image — offset, smaller */}
      <div className={`mt-5 ${isEven ? "ml-auto w-[65%] desktop:w-[45%]" : "mr-auto w-[65%] desktop:w-[45%]"}`}>
        <ParallaxImage
          src={spread.detailImage.src}
          alt={spread.detailImage.alt}
          className="relative aspect-[4/5] w-full rounded-[0.25rem]"
          sizes="(min-width: 1024px) 40vw, 65vw"
        />
      </div>
    </div>
  );
}

export function ChapterMorocco() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress: inkProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const inkWipe = useTransform(
    inkProgress,
    [0, 0.3],
    reduceMotion ? ["0%", "0%"] : ["100%", "0%"],
  );

  const { scrollYProgress: coverScroll } = useScroll({
    target: coverRef,
    offset: ["start start", "end start"],
  });

  const coverScale = useTransform(
    coverScroll,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 1.15],
  );

  const coverOverlay = useTransform(coverScroll, [0, 0.8], [0.3, 0.7]);

  return (
    <>
      {/* Ink flood transition — tighter */}
      <motion.div style={{ y: inkWipe }} className="relative z-10 h-0">
        <div className="h-[50vh] w-full bg-encre" />
      </motion.div>

      <section
        ref={containerRef}
        className="relative bg-encre"
        data-theme="dark"
        data-chapter="morocco"
      >
        {/* Subtle zellige watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.02]">
          <motion.div
            animate={reduceMotion ? {} : { rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            <Mark className="h-[80vh] w-[80vh] text-parchment" />
          </motion.div>
        </div>

        {/* COVER — Full-bleed bab silhouette */}
        <div ref={coverRef} className="relative h-screen overflow-hidden">
          <motion.div
            style={{ scale: coverScale }}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src="/images/Photo W.jpg"
              alt="Silhouette sous un bab marocain, contre-jour doré"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </motion.div>
          <motion.div
            style={{ opacity: coverOverlay }}
            className="absolute inset-0 bg-encre"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-3 font-sans text-caps-label uppercase tracking-[0.14em] text-pierre"
            >
              Chapitre III
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-display-hero text-parchment"
            >
              Le Pays
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-4 h-px w-16 origin-center bg-pierre/50"
            />
          </div>
        </div>

        {/* SPREADS — The four epochs */}
        <div className="mx-auto max-w-content px-5 desktop:px-7">
          {/* Editorial intro */}
          <div className="flex justify-center py-8 desktop:py-9">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-[48ch] text-center font-serif text-body-large italic leading-relaxed text-parchment/50"
            >
              Un pays ne se visite pas. Il se lit. Voici quatre chapitres
              d'un livre que personne n'a jamais fini d'écrire.
            </motion.p>
          </div>

          {/* Hairline separator */}
          <div className="mx-auto h-px w-8 bg-pierre/20" />

          {SPREADS.map((spread, i) => (
            <Spread key={spread.epoch} spread={spread} index={i} />
          ))}

          {/* Closing mark */}
          <div className="flex flex-col items-center py-8 desktop:py-9">
            <motion.div
              animate={reduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <Mark className="h-6 w-6 text-pierre/30" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
