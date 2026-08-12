"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Route } from "@/content/home";

type CircularGalleryProps = {
  items: Route[];
  hint: string;
};

/**
 * A 3D ring of destination cards, turned only by the prev/next controls —
 * no auto-play, per the design system's ban on auto-advancing carousels.
 * The radius is measured from the rendered card size so neighboring cards
 * meet edge-to-edge at any viewport width.
 */
export function CircularGallery({ items, hint }: CircularGalleryProps) {
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(210);
  const stageRef = useRef<HTMLDivElement>(null);
  const anglePerItem = 360 / items.length;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    // 1.9x the edge-to-edge minimum: opens the ring into a wide fan (deep
    // perspective, side cards turned well past three-quarter view) rather
    // than a tight drum where neighbors sit almost flat against each other.
    const update = () => setRadius(Math.round((stage.offsetWidth / 2 / Math.tan(Math.PI / items.length)) * 1.9));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [items.length]);

  const step = (direction: 1 | -1) => {
    setRotation((r) => r + direction * anglePerItem);
  };

  return (
    <div>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={items.map((route) => route.name).join(", ")}
        className="relative flex h-[26rem] w-full items-center justify-center tablet:h-[30rem]"
        style={{ perspective: "1100px" }}
      >
        <div
          ref={stageRef}
          className="relative h-[300px] w-[220px] tablet:h-[360px] tablet:w-[260px]"
          style={{ transform: `rotateY(${rotation}deg)`, transformStyle: "preserve-3d" }}
        >
          {items.map((route, i) => {
            const itemAngle = i * anglePerItem;
            const relative = (((itemAngle + rotation) % 360) + 360) % 360;
            const normalized = relative > 180 ? 360 - relative : relative;
            const opacity = Math.max(0.15, 1 - normalized / 130);
            const isFront = normalized < anglePerItem / 2;

            return (
              <a
                key={route.name}
                href="#invite"
                aria-label={route.name}
                aria-hidden={!isFront}
                tabIndex={isFront ? 0 : -1}
                className="group absolute inset-0 flex flex-col justify-end overflow-hidden rounded-[14px] border-[0.5px] border-pierre/50 bg-parchment2 [backface-visibility:hidden]"
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
                  sizes="260px"
                  className="object-cover brightness-90 saturate-[0.92] transition-transform duration-editorial ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-encre/95 via-encre/30 to-transparent" />
                <div className="relative p-5">
                  <p className="font-serif text-editorial-subhead italic text-parchment">{route.name}</p>
                  <p className="mt-1.5 font-sans text-interface-body text-parchment/60">{route.subtitle}</p>
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
          className="grid h-11 w-11 place-items-center border-[0.5px] border-pierre text-encre transition-colors duration-interface ease-out hover:bg-pierre/15 hover:border-encre"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Suivant"
          onClick={() => step(1)}
          className="grid h-11 w-11 place-items-center border-[0.5px] border-pierre text-encre transition-colors duration-interface ease-out hover:bg-pierre/15 hover:border-encre"
        >
          →
        </button>
        <span className="ml-auto font-sans text-caps-label uppercase text-pierre2">{hint}</span>
      </div>
    </div>
  );
}
