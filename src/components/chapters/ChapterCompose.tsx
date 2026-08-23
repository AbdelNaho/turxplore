"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useTranslations } from "next-intl";

type Channel = null | "whatsapp" | "email";

function TadelaktBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let W = 0;
    let H = 0;
    let raf = 0;

    const resize = () => {
      W = canvas.width = parent.offsetWidth;
      H = canvas.height = parent.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 14;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      r: Math.random() * 0.8 + 0.3,
      vx: (Math.random() - 0.5) * 0.08,
      vy: -(Math.random() * 0.06 + 0.015),
      a: Math.random() * 0.07 + 0.02,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.005;
      for (const p of pts) {
        p.x += p.vx + Math.sin(t + p.phase) * 0.05;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = H + 10;
          p.x = Math.random() * W;
        }
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        const f = p.a * (0.55 + 0.45 * Math.sin(t * 1.3 + p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,234,216,${f})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 20% 30%, #2E2820, #1F1B15)",
          animation: "tadelakt-a 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 120% at 75% 65%, #2A2520, transparent 70%)",
          animation: "tadelakt-b 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 130% 100% at 40% 50%, rgba(46,40,32,.5), transparent 70%)",
          animation: "tadelakt-breathe 14s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 25% 35%, rgba(78,46,60,.06), transparent 65%)",
          animation: "tadelakt-glow 35s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0 animate-[tadelakt-breathe_20s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse 35% 50% at 72% 55%, rgba(240,234,216,.015), transparent 55%)",
          opacity: 0.4,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(31,27,21,.45) 100%)",
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
}

export function ChapterCompose() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState<Channel>(null);
  const reduceMotion = useReducedMotion();
  const t = useTranslations("Compose");

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail) setMessage(detail);
    };
    window.addEventListener("compose-message", handler);
    return () => window.removeEventListener("compose-message", handler);
  }, []);

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

  const whatsappUrl = `https://wa.me/212697047692?text=${encodeURIComponent(
    message || t("defaultWhatsapp"),
  )}`;

  return (
    <section ref={sectionRef} className="relative" data-chapter="compose">
      <motion.div
        style={{ clipPath: diamondClip }}
        className="relative bg-encre"
        data-theme="dark"
      >
        <TadelaktBackground />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="/images/lesprit turxplore.jpg"
            alt=""
            className="h-full w-full object-cover opacity-[0.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-encre/50 via-encre/30 to-encre/70" />
        </div>

        <div className="relative mx-auto max-w-content px-5 desktop:px-7">
          <div className="pt-10 desktop:pt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-reading text-center"
            >
              <h2 className="font-serif text-display-hero text-parchment">
                {t("heading")}{" "}
                <em className="italic">{t("headingEmphasis")}</em>
              </h2>
              <p className="mt-4 font-serif text-body-large leading-relaxed text-parchment/50">
                {t("manifesto")}
              </p>
            </motion.div>
          </div>

          <div className="flex min-h-[50vh] flex-col items-center justify-center pb-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.9,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 w-full max-w-reading"
            >
              <div className="relative">
                {message && (
                  <span className="mb-1 block text-left font-serif text-caption italic text-parchment/30">
                    {t("placeholder")}
                  </span>
                )}
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("placeholder")}
                  rows={4}
                  className="w-full resize-none border-b border-parchment/20 bg-transparent pb-3 pt-2 font-serif text-body-standard text-parchment placeholder:text-parchment/30 outline-none transition-colors duration-200 focus:border-aubergine/40"
                />
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {channel === null && (
                <motion.div
                  key="channel-choice"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    delay: 1.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-5 flex flex-col gap-3 tablet:flex-row tablet:gap-4"
                >
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-parchment/30 px-5 py-3 font-sans text-interface-label uppercase tracking-[0.14em] text-parchment transition-all duration-200 hover:border-parchment/60 hover:bg-parchment/5"
                  >
                    <WhatsAppIcon />
                    WhatsApp
                  </a>
                  <motion.button
                    onClick={() => setChannel("email")}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-aubergine px-5 py-3 font-sans text-interface-label uppercase tracking-[0.14em] text-parchment transition-colors duration-200 hover:bg-aubergine2"
                  >
                    <EmailIcon />
                    Email
                  </motion.button>
                </motion.div>
              )}

              {channel === "email" && (
                <motion.div
                  key="email-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 24,
                  }}
                  className="mt-5 w-full max-w-reading"
                >
                  <form
                    className="space-y-4"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <FloatingInput
                      label={t("yourName")}
                      name="name"
                      type="text"
                    />
                    <FloatingInput
                      label={t("yourEmail")}
                      name="email"
                      type="email"
                    />

                    <div className="flex items-center justify-between pt-3">
                      <button
                        type="button"
                        onClick={() => setChannel(null)}
                        className="font-sans text-interface-body text-parchment/40 transition-colors duration-200 hover:text-parchment/70"
                      >
                        {t("back")}
                      </button>
                      <motion.button
                        type="submit"
                        whileHover={reduceMotion ? {} : { scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="rounded-full bg-aubergine px-5 py-2 font-sans text-interface-label uppercase tracking-[0.14em] text-parchment transition-colors duration-200 hover:bg-aubergine2"
                      >
                        {t("send")}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
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

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}
