"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ContactCtaButton } from "../ContactCtaButton";
import { serviceTiers } from "../portfolio-data";
import Border from "../Border";
import type { CurrencyInfo } from "../hooks/useCurrency";
import { useCurrency } from "../hooks/useCurrency";

const PRICES: Record<"USD" | "GBP" | "INR", Record<string, string>> = {
  USD: { Starter: "$499", Growth: "$1,199", Premium: "$2,199" },
  GBP: { Starter: "£399", Growth: "£949", Premium: "£1,749" },
  INR: { Starter: "₹5,000", Growth: "₹10,000", Premium: "₹20,000" },
};

function getPriceLabel(
  tierName: string,
  currency: CurrencyInfo,
  isLoading: boolean,
): string {
  if (isLoading) return "Loading...";
  const tierPrices = PRICES[currency.code];
  const price = tierPrices?.[tierName] ?? PRICES.USD[tierName];
  return tierName === "Premium" ? `${price}+` : price;
}


function ServiceCard({
  index,
  isSectionInView,
  tier,
  currency,
}: {
  index: number;
  isSectionInView: boolean;
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
            {getPriceLabel(tier.name, currency, currency.isLoading)}
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
          href="https://www.cal.eu/affan/15min?overlayCalendar=true"
          label="Get Started"
          size="compact"
          cursorLabel="Contact"
          target="_blank"
          rel="noopener noreferrer"
          ariaLabel="Book a free discovery call (opens in new tab)"
        />
      </div>
    </motion.article>
  );
}

export function ServicesSection() {
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
        <h2 className="font-display text-[clamp(2.2rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          What I build
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {serviceTiers.map((tier, index) => (
          <ServiceCard
            key={tier.name}
            index={index}
            isSectionInView={isSectionInView}
            tier={tier}
            currency={currency}
          />
        ))}
      </div>
    </motion.section>
  );
}
