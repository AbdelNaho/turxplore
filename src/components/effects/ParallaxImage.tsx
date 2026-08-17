"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scale?: [number, number];
  kenBurns?: boolean;
};

export function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.15,
  scale: scaleRange,
  kenBurns = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [`-${speed * 100}%`, `${speed * 100}%`],
  );

  const imgScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : (scaleRange ?? [1, 1]),
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y, scale: imgScale }} className="h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className={`object-cover ${kenBurns && !reduceMotion ? "animate-ken-burns" : ""}`}
          priority={false}
        />
      </motion.div>
    </div>
  );
}
