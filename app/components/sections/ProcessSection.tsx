"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";

const steps = [
  {
    number: "01",
    name: "Discovery",
    week: "Week 0",
    description:
      "We align on your goals, audience, and what makes you the right choice for your ideal client. One focused call, a shared brief.",
    deliverable: "Deliverable - shared brief + positioning statement",
  },
  {
    number: "02",
    name: "Wireframe",
    week: "Week 1",
    description:
      "I map out the page structure and content hierarchy before any visual decisions. You approve the blueprint first.",
    deliverable: "Deliverable - lo-fi wireframe in Figma",
  },
  {
    number: "03",
    name: "Design",
    week: "Week 1-2",
    description:
      "High-fidelity Figma designs with your actual content. Motion and interaction details specified at this stage.",
    deliverable: "Deliverable - full design file + motion spec",
  },
  {
    number: "04",
    name: "Build",
    week: "Week 2-3",
    description:
      "Next.js + Tailwind + Framer Motion. Pixel-perfect from Figma. You get a staging URL before launch.",
    deliverable: "Deliverable - live staging URL + Lighthouse score",
  },
  {
    number: "05",
    name: "Launch",
    week: "Week 3",
    description:
      "Domain, Vercel deploy, SEO config, analytics. Plus 14 days of post-launch support included.",
    deliverable: "Deliverable - live site + 14-day support window",
  },
];

type Step = (typeof steps)[number];

export function ProcessSection() {
  const prefersReduced = useReducedMotion() ?? false;
  const desktopScrollRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const maxIndex = steps.length - 1;

  const { scrollYProgress } = useScroll({
    target: desktopScrollRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      maxIndex,
      Math.max(0, Math.floor(latest * steps.length)),
    );

    setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
  });

  const desktopScrollHeight = `${steps.length * 90}vh`;

  return (
    <div id="process" className="relative">
      <section className="relative px-4 py-12 sm:px-8 md:hidden">
        <div className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            My Process
          </p>
          <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
            How it works
          </h2>
        </div>

        <div className="relative border-l border-border pl-8">
          <div className="space-y-6">
            {steps.map((step) => (
              <article key={step.number} className="relative space-y-2">
                <span className="absolute left-[-2.07rem] top-1.5 h-2 w-2 rounded-full bg-(--color-foreground)" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-(--color-accent)">
                  {step.number}
                </p>
                <p className="text-base font-bold tracking-tight">
                  {step.name}
                </p>
                <p className="text-xs text-muted">{step.week}</p>
                <p className="text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
                <div className="inline-flex w-fit items-center gap-1.5 border border-border px-2.5 py-1">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-(--color-accent)" />
                  <span className="text-[10px] font-medium text-muted">
                    {step.deliverable}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {prefersReduced ? (
        <section className="relative hidden w-full px-8 py-14 md:block">
          <div className="mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              My Process
            </p>
            <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
              How it works
            </h2>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {steps.map((step) => (
              <article key={step.number} className="space-y-2">
                <p className="text-[clamp(2.4rem,4vw,3.5rem)] font-display font-extrabold leading-none tracking-tight text-muted/40">
                  {step.number}
                </p>
                <p className="text-sm font-bold tracking-tight">{step.name}</p>
                <p className="text-xs text-muted">{step.week}</p>
                <p className="text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
                <div className="inline-flex w-fit items-center gap-1.5 border border-border px-2.5 py-1">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-(--color-accent)" />
                  <span className="text-[10px] font-medium text-muted">
                    {step.deliverable}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section
          ref={desktopScrollRef}
          className="relative hidden md:block"
          style={{ height: desktopScrollHeight }}
        >
          <div className="sticky top-0 flex h-fit flex-col overflow-hidden px-8 py-14">
            <div className="mb-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                My Process
              </p>
              <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
                How it works
              </h2>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-x-30 top-9 h-px -translate-y-1/2 bg-border z-10" />
              <motion.div
                className="pointer-events-none absolute inset-x-30 top-9 h-px -translate-y-1/2 origin-left bg-accent z-10"
                style={{ scaleX: scrollYProgress }}
              />
              {/* Step Indicators */}
              <div className="relative grid grid-cols-5 gap-4 z-20">
                {steps.map((step, index) => {
                  const isActive = activeIndex === index;
                  const isComplete = index < activeIndex;

                  return (
                    <div
                      key={`${step.number}-indicator`}
                      className="flex justify-center"
                    >
                      <motion.span
                        animate={{
                          // opacity: isActive ? 1 : isComplete ? 0.7 : 0.35,
                          color: isActive
                            ? "var(--color-foreground)"
                            : isComplete
                              ? "var(--color-foreground)/60"
                              : "var(--color-muted)",
                          scale: isActive ? 1 : 0.9,
                        }}
                        transition={{
                          duration: 0.24,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`relative z-10 px-2 text-[clamp(2.4rem,4.2vw,4.6rem)] font-display font-extrabold leading-none tracking-tight bg-background ${
                          isActive
                            ? "text-foreground"
                            : isComplete
                              ? "text-foreground/60"
                              : "text-muted"
                        }`}
                      >
                        {step.number}
                      </motion.span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Article */}
            <div className="mt-10 flex-1 overflow-hidden">
              <div className="grid h-fit grid-cols-5 gap-4">
                {steps.map((step, index) => {
                  const isActive = activeIndex === index;
                  const isComplete = index < activeIndex;

                  return (
                    <motion.article
                      key={`${step.number}-panel`}
                      animate={{
                        opacity: isActive ? 1 : isComplete ? 0.8 : 0,
                        y: isActive || isComplete ? 0 : 20,
                      }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-3"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-(--color-accent)">
                        {step.week}
                      </p>
                      <h3 className="text-[clamp(1.15rem,1.8vw,1.6rem)] font-bold leading-tight tracking-tight">
                        {step.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted">
                        {step.description}
                      </p>
                      <div className="inline-flex w-fit items-center gap-1.5 border border-border px-2.5 py-1">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-(--color-accent)" />
                        <span className="text-[10px] font-medium text-muted">
                          {step.deliverable}
                        </span>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
