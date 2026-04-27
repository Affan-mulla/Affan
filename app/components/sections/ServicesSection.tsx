"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ContactCtaButton } from "../ContactCtaButton";
import { serviceTiers } from "../portfolio-data";
import Border from "../Border";
import type { CurrencyInfo } from "../hooks/useCurrency";
import { useCurrency } from "../hooks/useCurrency";

type ServicesSectionProps = {
  onCursorLabel: (label: string) => void;
};

const packagePricesByCurrency: Record<
  string,
  { Starter: number; Growth: number; Premium: number }
> = {
  USD: { Starter: 500, Growth: 1200, Premium: 2000 },
  GBP: { Starter: 500, Growth: 1200, Premium: 2000 },
  INR: { Starter: 5000, Growth: 8000, Premium: 15000 },
};

function getPackagePriceLabel(
  tierName: (typeof serviceTiers)[number]["name"],
  currency: CurrencyInfo,
): string {
  const currencyPrices = packagePricesByCurrency[currency.code] ?? packagePricesByCurrency.USD;
  const amount = currencyPrices[tierName as keyof typeof currencyPrices];
  const formattedAmount = new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    maximumFractionDigits: 0,
  }).format(amount);

  return tierName === "Premium" ? `${formattedAmount}+` : formattedAmount;
}


function ServiceCard({
  index,
  isSectionInView,
  onCursorLabel,
  tier,
  currency,
}: {
  index: number;
  isSectionInView: boolean;
  onCursorLabel: (label: string) => void;
  tier: (typeof serviceTiers)[number];
  currency: ReturnType<typeof useCurrency>;
}) {
  const cardRef = useRef<HTMLElement | null>(null);
  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={isSectionInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.97 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
      className={`group relative overflow-hidden border border-border p-6  ${
        tier.featured ? "bg-(--color-surface-2)" : "bg-(--color-surface)"
      }`}
    >
      <Border/>
      <div className="relative z-10 space-y-5">
        <div className="space-y-2">
          {tier.featured ? (
            <motion.span className="inline-flex rounded-full border  px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted"
            aria-label="Most popular service tier"
            
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              Most popular
            </motion.span>
          ) : null}
          <h3 className="text-2xl font-bold tracking-tight">{tier.name}</h3>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">
            {currency.isLoading ? (
              <>
                <span className="block h-4 w-16 animate-pulse rounded bg-border" aria-hidden="true" />
                <span className="sr-only">Loading price</span>
              </>
            ) : (
              getPackagePriceLabel(tier.name, currency)
            )}
          </p>
          <p className="text-sm leading-7 text-muted">{tier.description}</p>
        </div>

        <ul className="space-y-2">
          {tier.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-muted">
              <span className="h-4 w-4">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ph" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.2 104.2 0 0 0 128 24Zm49.5 85.8l-58.6 56a8.1 8.1 0 0 1-5.6 2.2a7.7 7.7 0 0 1-5.5-2.2l-29.3-28a8 8 0 1 1 11-11.6l23.8 22.7l53.2-50.7a8 8 0 0 1 11 11.6Z"></path></svg>
              </span>
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
      </div>
    </motion.article>
  );
}

export function ServicesSection({ onCursorLabel }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const currency = useCurrency();

  return (
    <motion.section
      ref={sectionRef}
      id="services"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="space-y-7"
    >
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          Services
        </p>
        <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          What I build
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {serviceTiers.map((tier, index) => (
          <ServiceCard
            key={tier.name}
            index={index}
            isSectionInView={isSectionInView}
            onCursorLabel={onCursorLabel}
            tier={tier}
            currency={currency}
          />
        ))}
      </div>
    </motion.section>
  );
}
