"use client";

import { motion } from "framer-motion";
import { ContactCtaButton } from "../ContactCtaButton";
import type { NavSection } from "../portfolio-data";

type FloatingNavProps = {
  activeSection: string;
  navCollapsed: boolean;
  navSections: NavSection[];
  onCursorLabel: (label: string) => void;
  onThemeToggle: () => void;
  theme: "light" | "dark";
};

export function FloatingNav({
  activeSection,
  navCollapsed,
  navSections,
  onCursorLabel,
  onThemeToggle,
  theme,
}: FloatingNavProps) {
  const isDark = theme === "dark";
  const expandedBackground = isDark
    ? "rgba(17,17,17,0)"
    : "rgba(240,237,229,0)";
  const collapsedBackground = isDark
    ? "rgba(17,17,17,0.92)"
    : "rgba(240,237,229,0.92)";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <motion.nav
        className="pointer-events-auto w-full flex items-center justify-between gap-3 rounded-full border border-(--color-border) bg-(--color-surface)/92 px-4 py-1 shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md"
        animate={{
          maxWidth: navCollapsed ? 920 : "none",
          paddingLeft: navCollapsed ? 14 : 22,
          paddingRight: navCollapsed ? 14 : 22,
          paddingTop: navCollapsed ? 8 : 4,
          paddingBottom: navCollapsed ? 8 : 4,
          y: navCollapsed ? 0 : 12,
          margin: navCollapsed ? "0 auto" : "0",
          backgroundColor: navCollapsed ? collapsedBackground : expandedBackground,
          boxShadow: navCollapsed
            ? "0 4px 24px rgba(0,0,0,0.08)"
            : "0 0 0 rgba(0,0,0,0)",
          borderColor: navCollapsed ? "var(--color-border)" : "rgba(0,0,0,0)",
          backdropFilter: navCollapsed ? "blur(16px)" : "blur(0px)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.6, duration: 2 }}
        aria-label="Primary"
      >
        <a
          href="#home"
          onMouseEnter={() => onCursorLabel("Home")}
          className="font-display text-base font-extrabold tracking-tight"
        >
          Aff4n
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navSections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onMouseEnter={() => onCursorLabel(section.label)}
                aria-current={isActive ? "page" : undefined}
                className="relative rounded-full px-5 py-3 text-xs font-medium uppercase tracking-[0.08em] text-muted transition"
              >
                <span className="relative z-10">{section.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute inset-0 z-0 rounded-full bg-foreground/10"
                    transition={{ type: "spring", bounce: 0.28, duration: 0.5 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onThemeToggle}
            onMouseEnter={() => onCursorLabel("Theme")}
            className="inline-flex items-center gap-1.5 rounded-full border border- px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] border-border hover:bg-foreground hover:text-background"
          >
           <span className="mr-1 text-[15px]">◑ </span>
            {isDark ? "Dark" : "Light"}
          </button>
          <ContactCtaButton
            href="#contact"
            label="Let's Talk"
            cursorLabel="Contact"
            onCursorLabel={onCursorLabel}
            size="compact"
            className="hidden sm:inline-flex"
          />
        </div>
      </motion.nav>
    </div>
  );
}
