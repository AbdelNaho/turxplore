"use client";

import {
  useRef,
  useState,
  useCallback,
  type MouseEvent as ReactMouseEvent,
} from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Mark } from "@/components/brand/Mark";

const ease = [0.22, 1, 0.36, 1] as const;

const cards = [
  {
    image: "/images/carte du maroc.jpg",
    alt: "Carte du Royaume, carte stylisée du Maroc dessinée à la main",
    label: "La Carte du Royaume",
    desc: "Une carte dessinée à la main, de Tanger à Merzouga. Chaque route, chaque étape, chaque ville impériale.",
  },
  {
    image: "/images/le carnet secret.jpg",
    alt: "Le Maroc, composé pour vous, couverture du carnet de route Turxplore",
    label: "Le Carnet de route",
    desc: "Votre itinéraire, composé sur mesure. Pour regarder avant de partir, et pour savoir où vous allez.",
  },
] as const;

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMove = useCallback((e: ReactMouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ rotateX: -y * 14, rotateY: x * 14 });
  }, []);

  const handleLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={tilt}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className={className}
      style={{ perspective: 900, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

export function CollectorCartes() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.45], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-encre py-9 desktop:py-10"
    >
      {/* Noise/dot texture on dark bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(var(--color-pierre)) 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Section divider — rotating Mark */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
        className="mb-7 flex justify-center desktop:mb-8"
      >
        <motion.div
          animate={reduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <Mark className="h-5 w-5 text-pierre/30" />
        </motion.div>
      </motion.div>

      {/* Section heading */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.9, ease }}
        className="relative z-10 px-6 text-center"
      >
        <span className="font-sans text-caps-label uppercase text-pierre/50">
          Avant le départ
        </span>
        <h2 className="mt-2 font-serif text-display-section text-parchment">
          Une carte arrive chez vous
        </h2>
        <p className="mx-auto mt-3 max-w-lg font-serif text-body-large leading-relaxed text-parchment/50">
          Chaque voyage Turxplore commence par un envoi postal&nbsp;: une carte
          et un carnet, imprimés et composés à la main. Pour toucher le Maroc
          avant d'y être.
        </p>
      </motion.div>

      {/* Animated line */}
      <div className="relative mx-auto mt-7 max-w-content px-6 desktop:mt-8">
        <motion.div
          className="mx-auto h-px bg-gradient-to-r from-transparent via-pierre/30 to-transparent"
          style={reduceMotion ? { width: "100%" } : { width: lineWidth }}
        />
      </div>

      {/* Cards with 3D mouse-tracking tilt */}
      <div className="relative z-10 mx-auto mt-7 max-w-content px-6 desktop:mt-8">
        <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:gap-7">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.9, delay: i * 0.18, ease }}
            >
              <TiltCard className="cursor-default">
                {/* Card image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  {/* Subtle shine reflection on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-parchment/5 via-transparent to-transparent opacity-0 transition-opacity duration-editorial group-hover:opacity-100" />
                </div>
              </TiltCard>

              {/* Label + description */}
              <div className="mt-4">
                <h3 className="font-sans text-interface-label uppercase tracking-[0.12em] text-pierre">
                  {card.label}
                </h3>
                <p className="mt-1 max-w-sm font-serif text-body-standard leading-relaxed text-parchment/45">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
