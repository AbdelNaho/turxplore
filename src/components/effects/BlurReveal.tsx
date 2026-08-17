"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, type ElementType, type CSSProperties } from "react";

type BlurRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  stagger?: number;
  mode?: "char" | "word";
  triggerOnView?: boolean;
};

export function BlurReveal({
  text,
  as: Tag = "span",
  className,
  style,
  delay = 0,
  stagger = 0.04,
  mode = "char",
  triggerOnView = true,
}: BlurRevealProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const shouldAnimate = triggerOnView ? inView : true;

  if (reduceMotion) {
    return <Tag className={className} style={style}>{text}</Tag>;
  }

  const units = mode === "char" ? text.split("") : text.split(" ");

  return (
    <Tag className={className} style={style} aria-label={text} ref={ref}>
      {units.map((unit, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-[filter,opacity,transform]"
          initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
          animate={
            shouldAnimate
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : undefined
          }
          transition={{
            duration: 0.5,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {unit === " " ? " " : unit}
          {mode === "word" && i < units.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
