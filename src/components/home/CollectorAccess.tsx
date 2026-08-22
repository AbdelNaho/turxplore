"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { TextReveal } from "@/components/effects/TextReveal";
import { Magnetic } from "@/components/effects/Magnetic";

const ease = [0.22, 1, 0.36, 1] as const;

type CollectorAccessProps = {
  email: string;
};

export function CollectorAccess({ email }: CollectorAccessProps) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85svh] overflow-hidden"
    >
      {/* Barques bleues — warm invitation */}
      <motion.div
        className="absolute inset-[-8%]"
        style={
          reduceMotion
            ? undefined
            : { scale: imageScale, opacity: imageOpacity }
        }
      >
        <Image
          src="/images/voyage-atlantique-sauvage.jpg"
          alt="Barques bleues d'Essaouira au coucher du soleil, citadelle en arrière-plan"
          fill
          sizes="115vw"
          className="object-cover"
        />
      </motion.div>

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-encre/55" />

      {/* Top gradient from previous section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-encre to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[85svh] flex-col items-center justify-center px-6 py-9 text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-5"
        >
          {/* Label */}
          <div className="overflow-hidden">
            <motion.span
              initial={reduceMotion ? false : { y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="block font-sans text-caps-label uppercase text-parchment/35"
            >
              L'invitation
            </motion.span>
          </div>

          {/* Heading — character reveal */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <TextReveal
              text="Votre itinéraire n'existe pas encore."
              as="h2"
              className="max-w-xl font-serif text-display-feature text-parchment"
              delay={0.3}
              staggerChar={0.022}
              staggerWord={0.04}
            />
          </motion.div>

          {/* Subtext */}
          <div className="overflow-hidden">
            <motion.p
              initial={reduceMotion ? false : { y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9, ease }}
              className="max-w-md font-serif text-body-large leading-relaxed text-parchment/55"
            >
              Dites-nous le Maroc que vous cherchez. Nous vous enverrons une
              carte dessinée à la main.
            </motion.p>
          </div>

          {/* CTA — magnetic attraction effect */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 1.3, ease }}
            className="mt-2"
          >
            <Magnetic strength={0.4}>
              <a
                href={`mailto:${email}`}
                className="group inline-flex items-baseline gap-2 border-b border-parchment/30 pb-1.5 font-sans text-interface-label uppercase tracking-[0.16em] text-parchment transition-all duration-editorial hover:border-parchment hover:gap-4"
              >
                Écrire à l'éditrice
                <span
                  className="transition-transform duration-editorial group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
