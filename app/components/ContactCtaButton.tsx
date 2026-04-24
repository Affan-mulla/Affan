"use client";

import { motion, type Variants } from "framer-motion";

type ContactCtaButtonProps = {
  ariaLabel?: string;
  className?: string;
  cursorLabel?: string;
  href: string;
  label: string;
  onCursorLabel?: (label: string) => void;
  rel?: string;
  size?: "default" | "compact";
  target?: string;
};

const buttonFillVariants: Variants = {
  rest: { x: "-102%" },
  hover: {
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const buttonContentVariants: Variants = {
  rest: { color: "var(--color-foreground)" },
  hover: {
    color: "var(--color-background)",
    transition: { duration: 0.24, ease: "easeOut" },
  },
};

const arrowSweepVariants: Variants = {
  rest: { x: 0, opacity: 1, color: "var(--color-foreground  )" },
  hover: {
    x: [0, 150, 190],
    opacity: [1, 1, 0],
    color: "var(--color-foreground)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      times: [0, 0.78, 1],
    },
  },
};

const phoneIconVariants: Variants = {
  rest: { x: -8, opacity: 0, rotate: -8, scale: 0.9 },
  hover: {
    x: [-8, 0, 0],
    opacity: [0, 0, 1],
    rotate: [-8, 0, -5, 3, 0],
    scale: [0.9, 1.04, 1],
    transition: {
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1],
      x: {  times: [0, 0.58, 1] },
      opacity: { times: [0, 0.58, 1] },
      rotate: {  times: [0, 0.28, 0.54, 0.78, 1] },
      scale: {  times: [0, 0.62, 1] },
    },
  },
};

export function ContactCtaButton({
  ariaLabel,
  className,
  cursorLabel,
  href,
  label,
  onCursorLabel,
  rel,
  size = "default",
  target,
}: ContactCtaButtonProps) {
  const sizeClasses = size === "compact"
    ? "px-3 py-1.5 text-[11px]"
    : "px-4 py-2 text-xs";

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => onCursorLabel?.(cursorLabel ?? label)}
      
      className={`relative inline-flex items-center overflow-hidden rounded-full border border-border bg-(--color-surface) ${sizeClasses} font-display font-semibold uppercase tracking-[0.08em] shadow-[0_0_0_1px_var(--color-border)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className ?? ""}`}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-foreground"
        variants={buttonFillVariants}
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 z-20 inline-flex -translate-y-1/2 items-center justify-center"
        variants={arrowSweepVariants}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
        >
          <path
            d="M2 12H19M19 12L14 7M19 12L14 17"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.span>
      <motion.span className="relative z-10 inline-flex items-center gap-2" variants={buttonContentVariants}>
        <span className="inline-flex h-4.5 w-4.5 items-center justify-center overflow-hidden" aria-hidden="true">
          <motion.span variants={phoneIconVariants} className="inline-flex origin-[30%_70%] items-center justify-center">
           <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ph" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M144.27 45.93a8 8 0 0 1 9.8-5.66a86.22 86.22 0 0 1 61.66 61.66a8 8 0 0 1-5.66 9.8a8.2 8.2 0 0 1-2.07.27a8 8 0 0 1-7.73-5.93a70.35 70.35 0 0 0-50.33-50.34a8 8 0 0 1-5.67-9.8m-2.33 41.8c13.79 3.68 22.65 12.55 26.33 26.34A8 8 0 0 0 176 120a8.2 8.2 0 0 0 2.07-.27a8 8 0 0 0 5.66-9.8c-5.12-19.16-18.5-32.54-37.66-37.66a8 8 0 1 0-4.13 15.46m72.43 78.73l-47.11-21.11l-.13-.06a16 16 0 0 0-15.17 1.4a8 8 0 0 0-.75.56L126.87 168c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16 16 0 0 0 1.32-15.06v-.12L89.54 41.64a16 16 0 0 0-16.62-9.52A56.26 56.26 0 0 0 24 88c0 79.4 64.6 144 144 144a56.26 56.26 0 0 0 55.88-48.92a16 16 0 0 0-9.51-16.62"></path></svg>
          </motion.span>
        </span>
        <span>{label}</span>
      </motion.span>
    </motion.a>
  );
}
