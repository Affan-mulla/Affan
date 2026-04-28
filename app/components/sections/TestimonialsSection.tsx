"use client";

import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "../portfolio-data";

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [maxDrag, setMaxDrag] = useState(0);
  const [dragEnabled, setDragEnabled] = useState(false);
  const x = useMotionValue(0);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const progressPercent = useTransform(x, (latest) => {
    if (maxDrag <= 0) {
      return 0;
    }

    const percent = Math.min(100, Math.max(0, ((-latest) / maxDrag) * 100));
    return percent;
  });
  const progressScale = useTransform(progressPercent, (value) => value / 100);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const updatePointer = () => setIsTouchDevice(mediaQuery.matches);

    updatePointer();
    mediaQuery.addEventListener("change", updatePointer);

    return () => mediaQuery.removeEventListener("change", updatePointer);
  }, []);

  useEffect(() => {
    if (!carouselRef.current || !constraintsRef.current) {
      return;
    }

    const calculateDragDistance = () => {
      if (!carouselRef.current || !constraintsRef.current) {
        return;
      }

      const distance = Math.max(0, carouselRef.current.scrollWidth - constraintsRef.current.clientWidth);
      setMaxDrag(distance);
      x.set(0);
    };

    calculateDragDistance();
    window.addEventListener("resize", calculateDragDistance);

    return () => window.removeEventListener("resize", calculateDragDistance);
  }, [testimonials.length, x]);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const totalDelay = (testimonials.length - 1) * 100 + 400;
    const timer = window.setTimeout(() => setDragEnabled(true), totalDelay);

    return () => window.clearTimeout(timer);
  }, [isInView, testimonials.length]);

  return (
    <motion.section
      ref={sectionRef}
      id="testimonials"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="space-y-7"
    >
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          Social Proof
        </p>
        <h2 className="font-display sm:text-[clamp(2.5rem,8vw,6rem)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          What clients say
        </h2>
      </div>

      {isTouchDevice ? (
        <div
          className="flex gap-4 overflow-x-auto pb-2"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={`${testimonial.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.1 }}
              className="min-w-[84%] space-y-4 border border-border bg-(--color-surface) p-6"
            >
              <div className="flex items-start gap-2">
                <span className="font-display text-4xl leading-none text-(--color-accent)" aria-hidden="true">
                  "
                </span>
                <p className="pt-1 text-sm leading-7 text-muted">{testimonial.quote}</p>
              </div>

              <div className="flex items-center gap-3">
                {testimonial.avatar ? (
                  <Image
                    src={testimonial.avatar}
                    alt={`${testimonial.name} avatar`}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-surface-2) text-xs font-bold">
                    {getInitials(testimonial.name)}
                  </span>
                )}
                <div>
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted">
                    {testimonial.role}
                    {testimonial.company ? `, ${testimonial.company}` : ""}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <div ref={constraintsRef} className="relative overflow-hidden">
          <motion.div
            ref={carouselRef}
            className="flex cursor-grab select-none gap-4 active:cursor-grabbing"
            drag={dragEnabled ? "x" : false}
            dragConstraints={constraintsRef}
            dragElastic={0.05}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 35 }}
            whileDrag={{ scale: 0.98 }}
            style={{ x }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={`${testimonial.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
                className="min-w-85 space-y-4 border border-border bg-(--color-surface) p-6"
              >
                <div className="flex items-start gap-2">
                  <span className="font-display text-4xl leading-none text-(--color-accent)" aria-hidden="true">
                    "
                  </span>
                  <p className="pt-1 text-sm leading-7 text-muted">{testimonial.quote}</p>
                </div>

                <div className="flex items-center gap-3">
                  {testimonial.avatar ? (
                    <Image
                      src={testimonial.avatar}
                      alt={`${testimonial.name} avatar`}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-surface-2) text-xs font-bold">
                      {getInitials(testimonial.name)}
                    </span>
                  )}
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted">
                      {testimonial.role}
                      {testimonial.company ? `, ${testimonial.company}` : ""}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <div className="mt-4 h-0.5 w-full bg-border">
            <motion.div
              className="h-0.5 w-full origin-left bg-foreground"
              style={{ scaleX: progressScale }}
            />
          </div>
        </div>
      )}
    </motion.section>
  );
}
