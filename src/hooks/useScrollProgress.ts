"use client";

import { useRef } from "react";
import {
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

type ScrollProgressOptions = {
  offset?: Parameters<typeof useScroll>[0] extends { offset?: infer O } ? O : never;
};

export function useScrollProgress(
  options: ScrollProgressOptions = {},
): {
  ref: React.RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options.offset ?? ["start end", "end start"],
  });

  return { ref, progress: scrollYProgress };
}

export function useParallaxValue(
  progress: MotionValue<number>,
  range: [number, number],
): MotionValue<number> {
  return useTransform(progress, [0, 1], range);
}
