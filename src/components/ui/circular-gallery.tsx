"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { Route } from "@/content/home";

type CircularGalleryProps = {
  items: Route[];
  hint: string;
  /** Degrees advanced per animation frame while idle. */
  autoRotateSpeed?: number;
};

/**
 * A slow-turning 3D ring of destination cards — auto-rotates continuously
 * rather than hijacking page scroll, so it sits comfortably as one section
 * among others instead of demanding several viewport-heights of its own.
 * Pauses on hover/focus; the radius is measured from the rendered card size
 * so neighboring cards meet edge-to-edge at any viewport width.
 */
export function CircularGallery({ items, hint, autoRotateSpeed = 0.045 }: CircularGalleryProps) {
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(210);
  const stageRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const anglePerItem = 360 / items.length;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const update = () => setRadius(Math.round(stage.offsetWidth / 2 / Math.tan(Math.PI / items.length)));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [items.length]);

  useEffect(() => {
    if (reduceMotion) return;
    const tick = () => {
      if (!pausedRef.current) setRotation((r) => r + autoRotateSpeed);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [autoRotateSpeed, reduceMotion]);

  const step = (direction: 1 | -1) => {
    pausedRef.current = true;
    setRotation((r) => r + direction * anglePerItem);
  };

  return (
    <div>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={items.map((route) => route.name).join(", ")}
        className="relative flex h-[19rem] w-full items-center justify-center tablet:h-[24rem]"
        style={{ perspective: "1800px" }}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onFocus={() => (pausedRef.current = true)}
        onBlur={() => (pausedRef.current = false)}
      >
        <div
          ref={stageRef}
          className="relative h-[180px] w-[240px] tablet:h-[220px] tablet:w-[320px]"
          style={{ transform: `rotateY(${rotation}deg)`, transformStyle: "preserve-3d" }}
        >
          {items.map((route, i) => {
            const itemAngle = i * anglePerItem;
            const relative = (((itemAngle + rotation) % 360) + 360) % 360;
            const normalized = relative > 180 ? 360 - relative : relative;
            const opacity = Math.max(0.2, 1 - normalized / 150);
            const isFront = normalized < anglePerItem / 2;

            return (
              <a
                key={route.name}
                href="#invite"
                aria-label={route.name}
                aria-hidden={!isFront}
                tabIndex={isFront ? 0 : -1}
                className="group absolute inset-0 flex flex-col justify-end overflow-hidden border-[0.5px] border-ivory/10 bg-night2/60 shadow-card"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  opacity,
                  transition: "opacity 0.4s linear",
                }}
              >
                <Image
                  src={route.image}
                  alt={route.imageAlt}
                  fill
                  sizes="320px"
                  className="object-cover brightness-90 saturate-[0.92] transition-transform duration-editorial ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/90 via-night/25 to-transparent" />
                <div className="relative p-4 tablet:p-5">
                  <p className="font-serif text-body-large italic text-ivory">{route.name}</p>
                  <p className="mt-1 font-sans text-interface-body text-ivory/40">{route.subtitle}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          aria-label="Précédent"
          onClick={() => step(-1)}
          className="grid h-11 w-11 place-items-center border-[0.5px] border-clay/25 text-clay transition-colors duration-interface ease-out hover:bg-clay/10 hover:border-clay"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Suivant"
          onClick={() => step(1)}
          className="grid h-11 w-11 place-items-center border-[0.5px] border-clay/25 text-clay transition-colors duration-interface ease-out hover:bg-clay/10 hover:border-clay"
        >
          →
        </button>
        <span className="ml-auto font-sans text-caps-label uppercase text-ivory/20">{hint}</span>
      </div>
    </div>
  );
}
