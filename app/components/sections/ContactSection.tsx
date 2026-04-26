"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { createPortal } from "react-dom";
import { useCallback, useState, type ReactNode } from "react";
import Image from "next/image";

type ContactSectionProps = {
  onCursorLabel: (label: string) => void;
};

type SocialProfileCard = {
  id: "linkedin" | "instagram" | "twitter" | "github";
  label: string;
  href: string;
  cursorLabel: string;
  platform: string;
  handle: string;
  name: string;
  bio: string;
  accent: string;
  banner?: string;
  avatar: string;
  icon: ReactNode;
  ctaLabel: string;
  theme: "light" | "dark" | "instagram";
};

const CARD_WIDTH = 320;
const CARD_HEIGHT = 248;
const CARD_OFFSET = 10;
const CARD_GUTTER = 12;

function clamp(value: number, min: number, max: number) {
  if (max <= min) {
    return min;
  }

  return Math.min(max, Math.max(min, value));
}

function positionCard(clientX: number, clientY: number) {
  const maxX = Math.max(
    CARD_GUTTER,
    window.innerWidth - CARD_WIDTH - CARD_GUTTER,
  );
  const maxY = Math.max(
    CARD_GUTTER,
    window.innerHeight - CARD_HEIGHT - CARD_GUTTER,
  );

  const fitsRight =
    clientX + CARD_OFFSET + CARD_WIDTH <= window.innerWidth - CARD_GUTTER;
  const fitsBottom =
    clientY + CARD_OFFSET + CARD_HEIGHT <= window.innerHeight - CARD_GUTTER;

  const x = fitsRight
    ? clientX + CARD_OFFSET
    : clientX - CARD_WIDTH - CARD_OFFSET;
  const y = fitsBottom
    ? clientY + CARD_OFFSET
    : clientY - CARD_HEIGHT - CARD_OFFSET;

  return {
    x: clamp(x, CARD_GUTTER, maxX),
    y: clamp(y, CARD_GUTTER, maxY),
  };
}

const socialProfiles: SocialProfileCard[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/affan-mulla-544341321/",
    cursorLabel: "LinkedIn",
    platform: "LinkedIn",
    handle: "affan-mulla-544341321",
    name: "Affan Mulla",
    bio: "Product designer focused on clarity, conversion, and high-trust client-facing work.",
    accent: "#0A66C2",
    banner:
      "https://pbs.twimg.com/profile_banners/1794432856040599552/1769402162/1080x360",
    avatar: "https://pbs.twimg.com/profile_images/2015644864675737601/m8438SjA_400x400.jpg",
    ctaLabel: "Connect",
    theme: "light",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="16"
        height="16"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"
        />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/aff4n_7",
    cursorLabel: "Instagram",
    platform: "Instagram",
    handle: "aff4n_7",
    name: "Affan Mulla",
    bio: "Portfolio visuals, motion snippets, and behind-the-scenes design process.",
    accent: "#E1306C",
    avatar: "https://pbs.twimg.com/profile_images/2015644864675737601/m8438SjA_400x400.jpg",
    ctaLabel: "Follow",
    theme: "instagram",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="16"
        height="16"
        viewBox="0 0 256 256"
      >
        <path
          fill="currentColor"
          d="M160 128a32 32 0 1 1-32-32a32.1 32.1 0 0 1 32 32Zm68-44v88a56 56 0 0 1-56 56H84a56 56 0 0 1-56-56V84a56 56 0 0 1 56-56h88a56 56 0 0 1 56 56Zm-52 44a48 48 0 1 0-48 48a48 48 0 0 0 48-48Zm16-52a12 12 0 1 0-12 12a12 12 0 0 0 12-12Z"
        />
      </svg>
    ),
  },
  {
    id: "twitter",
    label: "Twitter",
    href: "https://x.com/_aff4n_",
    cursorLabel: "Twitter",
    platform: "X",
    handle: "@_aff4n_",
    name: "Affan Mulla",
    bio: "Short updates, web product notes, and design opinions from active client work.",
    accent: "#1D9BF0",
    banner:
      "https://pbs.twimg.com/profile_banners/1794432856040599552/1769402162/1080x360",
    avatar: "https://pbs.twimg.com/profile_images/2015644864675737601/m8438SjA_400x400.jpg",
    ctaLabel: "Follow",
    theme: "dark",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="16"
        height="16"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M21.543 7.104c.015.211.015.423.015.636c0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041a4.93 4.93 0 0 1-4.6-3.42a4.9 4.9 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.9 4.9 0 0 0 2.235.616A4.93 4.93 0 0 1 1.67 3.148a13.98 13.98 0 0 0 10.15 5.144a4.929 4.929 0 0 1 8.39-4.49a9.9 9.9 0 0 0 3.128-1.196a4.94 4.94 0 0 1-2.165 2.724A9.8 9.8 0 0 0 24 4.555a10 10 0 0 1-2.457 2.549"
        />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Affan-mulla",
    cursorLabel: "GitHub",
    platform: "GitHub",
    handle: "Affan-mulla",
    name: "Affan Mulla",
    bio: "Code, shipped interfaces, and practical front-end experiments for client products.",
    accent: "#111827",
    avatar: "https://avatars.githubusercontent.com/u/161614493?v=4",
    ctaLabel: "Sponsor",
    theme: "dark",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="16"
        height="16"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
        />
      </svg>
    ),
  },
];

function SocialHoverCard({
  profile,
  x,
  y,
}: {
  profile: SocialProfileCard;
  x: MotionValue<number>;
  y: MotionValue<number>;
}) {
  const isDark = profile.theme === "dark";

  const card = (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      style={{ x, y, position: "fixed" }}
      className="pointer-events-none z-50"
    >
      <div className="w-80 overflow-hidden border border-border shadow-[0_20px_60px_rgba(0,0,0,0.22)] bg-background">
        {
          profile.banner && (
            <Image src={profile.banner} width={320} height={80} alt="Banner" className="h-20 object-cover" style={{ background: profile.banner }} />
          )
        }
        <div className="relative p-4">
          <div className={`flex items-end gap-3 ${profile.banner ? "-mt-10" : ""}`}>
            <div>
              <Image 
                src={profile.avatar}
                alt={`${profile.name} avatar`}
                width={48}
                height={48}
                className="h-16 w-16 rounded-full border-4 border-background object-cover"
                style={{ background: profile.accent }}
              />
            </div>
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{profile.name}</p>
            <p
              style={{
                color: isDark ? "#94a3b8" : "var(--color-text-muted)",
              }}
              className="truncate text-xs"
            >
              {profile.id !== "linkedin" && profile.handle}
            </p>
          </div>
          <p
            style={{ color: isDark ? "#cbd5e1" : "var(--color-text-muted)" }}
            className="mt-2 text-sm leading-5"
          >
            {profile.bio}
          </p>

          <p className="mt-3 text-xs text-muted">
            View {profile.handle} on {profile.platform}
          </p>
        </div>
      </div>
    </motion.div>
  );

  return createPortal(card, document.body);
}

function SocialLinkCard({
  profile,
  isActive,
  onActivate,
  onDeactivate,
  onCursorLabel,
}: {
  profile: SocialProfileCard;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  onCursorLabel: (label: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 380, damping: 34, mass: 0.35 });
  const smoothY = useSpring(rawY, { stiffness: 380, damping: 34, mass: 0.35 });
  const portalTarget = typeof document === "undefined" ? null : document.body;

  const setCardPosition = useCallback(
    (clientX: number, clientY: number) => {
      const { x, y } = positionCard(clientX, clientY);
      rawX.set(x);
      rawY.set(y - 50);
    },
    [rawX, rawY],
  );

  return (
    <div className="relative inline-flex">
      <a
        href={profile.href}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={(event) => {
          onCursorLabel(profile.cursorLabel);
          onActivate();
          setIsHovered(true);
          setCardPosition(event.clientX, event.clientY);
        }}
        onMouseMove={(event) => {
          if (!isActive) {
            return;
          }

          setCardPosition(event.clientX, event.clientY);
        }}
        onMouseLeave={() => {
          onDeactivate();
          setIsHovered(false);
        }}
        onFocus={(event) => {
          onCursorLabel(profile.cursorLabel);
          onActivate();
          setIsHovered(true);
          const rect = event.currentTarget.getBoundingClientRect();
          setCardPosition(rect.right, rect.top + rect.height / 2);
        }}
        onBlur={() => {
          onDeactivate();
          setIsHovered(false);
        }}
        className="inline-flex items-center gap-2 bg-foreground px-2 py-1 text-xs text-background transition-colors duration-200 hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2"
      >
        <motion.span className="relative inline-flex h-4 w-4 items-center justify-center overflow-hidden">
          <motion.span
            initial={{ y: 0 }}
            animate={{ y: isHovered ? "-100%" : "0%" }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="absolute"
          >
            {profile.icon}
          </motion.span>
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: isHovered ? "0%" : "100%" }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="absolute"
          >
            {profile.icon}
          </motion.span>
        </motion.span>
        {profile.label}
      </a>

      <AnimatePresence>
        {isActive && portalTarget ? (
          <SocialHoverCard profile={profile} x={smoothX} y={smoothY} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function ContactSection({ onCursorLabel }: ContactSectionProps) {
  const [isTalkHovered, setIsTalkHovered] = useState(false);
  const [activeSocial, setActiveSocial] = useState<string | null>(null);

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="space-y-10 border-b border-border pb-12 pt-4"
    >
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
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
            <span
              className="relative inline-flex h-[1em] w-[1em] overflow-hidden"
              aria-hidden="true"
            >
              <motion.span
                animate={
                  isTalkHovered
                    ? { y: [8, 0, -8], x: [-8, 0, 8], opacity: [0, 1, 0] }
                    : { y: 0, x: 0, opacity: 1 }
                }
                transition={
                  isTalkHovered
                    ? {
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut" as const,
                      }
                    : { duration: 0.2 }
                }
                className="absolute left-0 top-0 inline-flex"
              >
                ?
              </motion.span>
            </span>
          </motion.a>
        </h2>
      </div>

      <div className="grid gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="space-y-1 text-[1.05rem] text-muted">
          <p>affanmulla077@gmail.com</p>
          <p>Gujarat, India</p>
        </div>

        <div className="flex flex-wrap items-center divide-x-2 text-xs font-semibold uppercase tracking-widest text-muted">
          {socialProfiles.map((profile) => (
            <SocialLinkCard
              key={profile.id}
              profile={profile}
              isActive={activeSocial === profile.id}
              onActivate={() => setActiveSocial(profile.id)}
              onDeactivate={() =>
                setActiveSocial((current) =>
                  current === profile.id ? null : current,
                )
              }
              onCursorLabel={onCursorLabel}
            />
          ))}
        </div>
      </div>

      <p className="pt-6 text-center text-sm text-muted">
        © {new Date().getFullYear()} Affan Mulla - Freelance Product Designer
      </p>
    </motion.section>
  );
}
