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

type CollectorPieceProps = {
  pieceNum: string;
  place: string;
  image: string;
  imageAlt: string;
  note?: string;
  align?: "left" | "right";
};

export function CollectorPiece({
  pieceNum,
  place,
  image,
  imageAlt,
  note,
  align = "left",
}: CollectorPieceProps) {
  const reduceMotion = useReducedMotion();
  const isRight = align === "right";

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- Image: clip-path reveal from centered rectangle → full bleed ---
  const clipInset = useTransform(scrollYProgress, [0.05, 0.45], [30, 0]);
  const clipRadius = useTransform(scrollYProgress, [0.05, 0.35], [16, 0]);
  const clipPath = useMotionTemplate`inset(${clipInset}% round ${clipRadius}px)`;

  // --- Image: continuous slow zoom ---
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.5]);

  // --- Title: blur-reveal on parchment, dissolves as photo covers ---
  const titleOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.1, 0.3, 0.42],
    [0, 1, 1, 0],
  );
  const titleBlur = useTransform(scrollYProgress, [0.0, 0.12], [16, 0]);
  const titleFilter = useMotionTemplate`blur(${titleBlur}px)`;
  const titleY = useTransform(
    scrollYProgress,
    [0.0, 0.1, 0.3, 0.42],
    [50, 0, 0, -40],
  );

  // --- Label: appears just before title ---
  const labelOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.08, 0.28, 0.38],
    [0, 1, 1, 0],
  );

  // --- Vignette: fades in as photo expands ---
  const vignetteOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);

  // --- Note: blur-reveal against full photo (Phase 3) ---
  const noteOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.62, 0.78, 0.88],
    [0, 1, 1, 0],
  );
  const noteBlur = useTransform(scrollYProgress, [0.5, 0.62], [10, 0]);
  const noteFilter = useMotionTemplate`blur(${noteBlur}px)`;
  const noteY = useTransform(scrollYProgress, [0.5, 0.62], [30, 0]);

  // --- Exit fog: dissolves into parchment ---
  const fogOpacity = useTransform(scrollYProgress, [0.82, 0.98], [0, 1]);

  const textAlign = isRight
    ? "desktop:items-end desktop:pr-[10vw] desktop:text-right"
    : "desktop:items-start desktop:pl-[10vw] desktop:text-left";

  return (
    <div ref={containerRef} className="relative h-[280vh]">
      <section
        id={`piece-${pieceNum}`}
        data-piece={pieceNum}
        className="sticky top-0 min-h-[100dvh] overflow-hidden"
      >
        {/* Photo — clip-path cinematic reveal + zoom */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={
            reduceMotion
              ? undefined
              : { clipPath, scale: imageScale }
          }
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="100vw"
            loading="eager"
            className="object-cover"
          />
        </motion.div>

        {/* Aubergine vignette — intensifies as photo fills viewport */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={reduceMotion ? undefined : { opacity: vignetteOpacity }}
        >
          <div className="absolute inset-0 bg-aubergine2/30 mix-blend-multiply" />
          <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-aubergine2/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-aubergine2/50 to-transparent" />
        </motion.div>

        {/* Title — lives on parchment, dissolves as photo overtakes */}
        <div
          className={
            "absolute inset-0 z-10 flex flex-col justify-center px-6 items-center text-center " +
            textAlign
          }
        >
          <motion.span
            className="block font-sans text-caps-label uppercase text-encre/40"
            style={
              reduceMotion
                ? undefined
                : { opacity: labelOpacity }
            }
          >
            Pièce {pieceNum}
          </motion.span>
          <motion.h2
            className="mt-2 font-serif text-display-hero text-encre"
            style={
              reduceMotion
                ? undefined
                : {
                    opacity: titleOpacity,
                    filter: titleFilter,
                    y: titleY,
                  }
            }
          >
            {place}
          </motion.h2>
        </div>

        {/* Note — reveals against full-bleed photo */}
        {note && (
          <motion.div
            className={
              "absolute bottom-[14%] z-10 flex w-full justify-center px-6 " +
              (isRight
                ? "desktop:justify-end desktop:pr-[10vw]"
                : "desktop:justify-start desktop:pl-[10vw]")
            }
            style={
              reduceMotion
                ? undefined
                : {
                    opacity: noteOpacity,
                    filter: noteFilter,
                    y: noteY,
                  }
            }
          >
            <p className="max-w-md text-center font-serif text-body-large italic leading-relaxed text-parchment/90 desktop:text-left">
              {note}
            </p>
          </motion.div>
        )}

        {/* Exit fog — dissolves into parchment for next piece */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[40%] bg-gradient-to-t from-parchment via-parchment/80 to-transparent"
          style={reduceMotion ? undefined : { opacity: fogOpacity }}
        />
      </section>
    </div>
  );
}
