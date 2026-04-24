"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type ContactSectionProps = {
  onCursorLabel: (label: string) => void;
};

export function ContactSection({ onCursorLabel }: ContactSectionProps) {
  const [isTalkHovered, setIsTalkHovered] = useState(false);

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="space-y-10 border-b border-(--color-border) pb-12 pt-4"
    >
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--color-text-muted)">
          Get in Touch
        </p>
        <h2 className="font-display text-[clamp(3.1rem,11vw,9rem)] font-extrabold leading-35 tracking-tighter">
          <span className="block">Say hi!</span>
          <motion.a
            href="https://www.cal.eu/affan/15min?overlayCalendar=true"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => onCursorLabel("Book Call")}
            onHoverStart={() => setIsTalkHovered(true)}
            onHoverEnd={() => setIsTalkHovered(false)}
            onFocus={() => {
              onCursorLabel("Book Call");
              setIsTalkHovered(true);
            }}
            onBlur={() => setIsTalkHovered(false)}
            className="group inline-flex items-center gap-2 rounded-sm transition-colors duration-300 hover:text-(--color-accent) focus-visible:text-(--color-accent) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2"
          >
            <span className="relative block">
              Let&apos;s talk
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </span>
            <span className="relative inline-flex h-[1em] w-[1em] overflow-hidden" aria-hidden="true">
              <motion.span
                animate={
                  isTalkHovered
                    ? { y: [8, 0, -8], x: [-8, 0, 8], opacity: [0, 1, 0] }
                    : { y: 0, x: 0, opacity: 1 }
                }
                transition={
                  isTalkHovered
                    ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" as const }
                    : { duration: 0.2 }
                }
                className="absolute left-0 top-0 inline-flex"
              >
                ↗
              </motion.span>
            </span>
          </motion.a>
        </h2>
      </div>

      <div className="grid gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="space-y-1 text-[1.05rem] text-(--color-text-muted)">
          <p>affanmulla077@gmail.com</p>
          <p>Gujarat, India</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-widest text-(--color-text-muted)">
          <a href="mailto:affanmulla077@gmail.com" onMouseEnter={() => onCursorLabel("Email")}>
            Email
          </a>
          <a
            href="https://instagram.com/aff4n_7"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => onCursorLabel("Instagram")}
          >
            Instagram
          </a>
          <a
            href="https://x.com/_aff4n_"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => onCursorLabel("X")}
          >
            X / Twitter
          </a>
        </div>
      </div>

      <p className="pt-6 text-center text-sm text-(--color-text-muted)">
        © {new Date().getFullYear()} Affan Mulla · Freelance Product Designer
      </p>
    </motion.section>
  );
}
