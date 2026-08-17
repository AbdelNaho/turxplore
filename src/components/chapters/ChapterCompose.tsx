"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { BlurReveal } from "@/components/effects/BlurReveal";
import { Magnetic } from "@/components/effects/Magnetic";

export function ChapterCompose() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formOpen, setFormOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"],
  });

  const diamondClip = useTransform(
    scrollYProgress,
    [0, 0.6],
    reduceMotion
      ? ["inset(0%)"]
      : [
          "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
          "polygon(50% -50%, 150% 50%, 50% 150%, -50% 50%)",
        ],
  );

  return (
    <section ref={sectionRef} className="relative">
      {/* Diamond clip transition */}
      <motion.div
        style={{ clipPath: diamondClip }}
        className="relative bg-encre py-10 desktop:py-10"
        data-theme="dark"
      >
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06]">
          <Image
            src="/images/route-cote-atlantique.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover blur-[40px]"
            aria-hidden="true"
          />
        </div>

        <div className="relative mx-auto max-w-content px-5 desktop:px-7">
          <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
            <BlurReveal
              text="Composer"
              as="h2"
              className="font-serif text-display-hero text-parchment"
              delay={0.2}
              stagger={0.05}
              mode="char"
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-4 font-serif text-body-large italic text-parchment/60"
            >
              Chaque voyage commence par une conversation.
            </motion.p>

            {/* CTA Button */}
            {!formOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 1.2,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8"
              >
                <Magnetic strength={0.25}>
                  <motion.button
                    onClick={() => setFormOpen(true)}
                    whileHover={reduceMotion ? {} : { scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-full bg-aubergine px-5 py-3 font-serif text-editorial-headline text-parchment transition-[letter-spacing] duration-300 hover:tracking-[0.04em]"
                  >
                    Écrire
                  </motion.button>
                </Magnetic>
              </motion.div>
            )}

            {/* Contact form */}
            <motion.div
              initial={false}
              animate={
                formOpen
                  ? { opacity: 1, y: 0, height: "auto" }
                  : { opacity: 0, y: 40, height: 0 }
              }
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 24,
              }}
              className="mt-8 w-full max-w-reading overflow-hidden"
            >
              <form
                className="space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <FloatingInput label="Votre nom" name="name" type="text" />
                <FloatingInput label="Votre email" name="email" type="email" />
                <FloatingTextarea
                  label="Parlez-nous de votre voyage rêvé"
                  name="message"
                />

                <div className="flex justify-center pt-3">
                  <Magnetic strength={0.2}>
                    <motion.button
                      type="submit"
                      whileHover={reduceMotion ? {} : { scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="rounded-full bg-aubergine px-5 py-2 font-sans text-interface-label uppercase tracking-[0.14em] text-parchment transition-colors duration-200 hover:bg-aubergine2"
                    >
                      Envoyer
                    </motion.button>
                  </Magnetic>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function FloatingInput({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <motion.label
        animate={{
          y: isActive ? -20 : 0,
          scale: isActive ? 0.85 : 1,
          opacity: isActive ? 0.6 : 0.4,
        }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute left-0 top-3 origin-left font-sans text-interface-body text-parchment"
      >
        {label}
      </motion.label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full border-b border-parchment/20 bg-transparent pb-2 pt-3 font-sans text-interface-body text-parchment outline-none transition-colors duration-200 focus:border-parchment/50"
      />
    </div>
  );
}

function FloatingTextarea({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <motion.label
        animate={{
          y: isActive ? -20 : 0,
          scale: isActive ? 0.85 : 1,
          opacity: isActive ? 0.6 : 0.4,
        }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute left-0 top-3 origin-left font-sans text-interface-body text-parchment"
      >
        {label}
      </motion.label>
      <textarea
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4}
        className="w-full resize-none border-b border-parchment/20 bg-transparent pb-2 pt-3 font-sans text-interface-body text-parchment outline-none transition-colors duration-200 focus:border-parchment/50"
      />
    </div>
  );
}
