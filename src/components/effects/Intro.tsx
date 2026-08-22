"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mark } from "@/components/brand/Mark";

const ease = [0.22, 1, 0.36, 1] as const;

export function Intro() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"mark" | "reveal" | "done">(
    reduceMotion ? "done" : "mark",
  );

  useEffect(() => {
    if (reduceMotion) return;

    const t1 = setTimeout(() => setPhase("reveal"), 1400);
    const t2 = setTimeout(() => setPhase("done"), 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (phase !== "done") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-[150] flex items-center justify-center bg-parchment"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        {/* Zellige Mark — entrance + rotation + scale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
          animate={
            phase === "mark"
              ? { opacity: 1, scale: 1, rotate: 0 }
              : { opacity: 0, scale: 2.5, rotate: 90 }
          }
          transition={
            phase === "mark"
              ? { duration: 1.2, ease }
              : { duration: 0.7, ease }
          }
        >
          <Mark className="h-12 w-12 text-encre/70" />
        </motion.div>

        {/* Subtle brand name flash */}
        <motion.span
          className="absolute bottom-[38%] font-sans text-caps-label uppercase tracking-[0.3em] text-encre/20"
          initial={{ opacity: 0 }}
          animate={
            phase === "mark"
              ? { opacity: 1 }
              : { opacity: 0, y: -20 }
          }
          transition={{ duration: 0.6, delay: phase === "mark" ? 0.6 : 0, ease }}
        >
          Turxplore
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
}
