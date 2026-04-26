"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
  return (
    <motion.section
      id="testimonials"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="space-y-7"
    >
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--color-text-muted)">
          Social Proof
        </p>
        <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          What clients say
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.article
            key={`${testimonial.name}-${index}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.35, delay: index * 0.1 }}
            className="space-y-4 border border-(--color-border) bg-(--color-surface) p-6"
          >
            <div className="flex items-start gap-2">
              <span className="font-display text-4xl leading-none text-(--color-accent)" aria-hidden="true">
                "
              </span>
              <p className="pt-1 text-sm leading-7 text-(--color-text-muted)">{testimonial.quote}</p>
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
    </motion.section>
  );
}
