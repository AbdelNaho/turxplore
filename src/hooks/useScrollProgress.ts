"use client";

import { useRef } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";

type ScrollProgressOptions = {
  offset?: [string, string];
};

export function useScrollProgress(
  options: ScrollProgressOptions = {},
): {
  ref: React.RefObject<HTMLElement | null>;
  progress: MotionValue<number>;
} {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: (options.offset as [string, string]) ?? ["start end", "end start"],
  });

  return { ref, progress: scrollYProgress };
}

export function useParallaxValue(
  progress: MotionValue<number>,
  range: [number, number],
): MotionValue<number> {
  return useTransform(progress, [0, 1], range);
}
