"use client";

const items = [
  "Websites",
  "Landing Pages",
  "Local SEO",
  "Next.js",
  "Restaurant Sites",
  "Booking Systems",
  "Google Business",
  "E-commerce",
  "Tailwind CSS",
  "Mobile-First",
  "Framer Motion",
  "Performance Optimisation",
];

const loopItems = [...items, ...items];

export function MarqueeSection() {
  return (
    <section className="overflow-hidden border-y border-(--color-border) py-3 select-none">
      <div className="marquee relative w-full">
        <div className="marquee-track flex w-max">
          {loopItems.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="inline-flex items-center gap-8 px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-(--color-text-muted)"
            >
              <span>{item}</span>
              <span className="text-[8px] opacity-50">{"\u2726"}</span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee-scroll 32s linear infinite;
          will-change: transform;
        }

        .marquee:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
}
