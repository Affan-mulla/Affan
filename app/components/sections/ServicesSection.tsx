"use client";

import { motion } from "framer-motion";
import { ContactCtaButton } from "../ContactCtaButton";
import { serviceTiers } from "../portfolio-data";

type ServicesSectionProps = {
  onCursorLabel: (label: string) => void;
};

export function ServicesSection({ onCursorLabel }: ServicesSectionProps) {
  return (
    <motion.section
      id="services"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="space-y-7"
    >
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--color-text-muted)">
          Services
        </p>
        <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          What I build
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {serviceTiers.map((tier, index) => (
          <motion.article
            key={tier.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className={`space-y-5 border border-(--color-border) p-6 ${
              tier.featured ? "bg-(--color-surface-2)" : "bg-(--color-surface)"
            }`}
          >
            <div className="space-y-2">
              {tier.featured ? (
                <span className="inline-flex rounded-full border border-(--color-border) px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-(--color-text-muted)">
                  Most popular
                </span>
              ) : null}
              <h3 className="text-2xl font-bold tracking-tight">{tier.name}</h3>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-(--color-text-muted)">
                {tier.price}
              </p>
              <p className="text-sm leading-7 text-(--color-text-muted)">{tier.description}</p>
            </div>

            <ul className="space-y-2">
              {tier.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-(--color-text-muted)">
                  <span aria-hidden="true">{"\u2713"}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <ContactCtaButton
              href="#contact"
              label={tier.cta}
              size="compact"
              cursorLabel="Contact"
              onCursorLabel={onCursorLabel}
            />
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
