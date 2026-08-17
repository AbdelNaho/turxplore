"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ElementType } from "react";

type TextRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  staggerChar?: number;
  staggerWord?: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function TextReveal({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  staggerChar = 0.028,
  staggerWord = 0.05,
}: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  let globalCharIdx = 0;

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, wi) => {
        const chars = word.split("");
        const startIdx = globalCharIdx;
        globalCharIdx += chars.length;

        return (
          <span key={wi} className="inline-block overflow-hidden" aria-hidden="true">
            {chars.map((char, ci) => (
              <motion.span
                key={ci}
                className="inline-block will-change-transform"
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.6,
                  delay: delay + (startIdx + ci) * staggerChar + wi * staggerWord,
                  ease,
                }}
              >
                {char}
              </motion.span>
            ))}
            {wi < words.length - 1 && " "}
          </span>
        );
      })}
    </Tag>
  );
}
