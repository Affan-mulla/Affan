"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 12, suffix: "+", label: "Clients worked with" },
  { value: 98, suffix: "%", label: "Satisfaction rate" },
  { value: 3, suffix: "x", label: "Avg. lead increase" },
  { value: 14, suffix: "d", label: "Average delivery" },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target: number, isActive: boolean, duration = 1400): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setCount(0);
      return;
    }

    let frameId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setCount(Math.round(target * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [duration, isActive, target]);

  return count;
}

function StatItem({
  value,
  suffix,
  label,
  isActive,
}: {
  value: number;
  suffix: string;
  label: string;
  isActive: boolean;
}) {
  const count = useCountUp(value, isActive);

  return (
    <div className="bg-(--color-bg) p-6 text-center space-y-1">
      <p className="font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-none tracking-tight">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-(--color-text-muted)">
        {label}
      </p>
    </div>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={sectionRef}
      id="stats"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
        {stats.map((item) => (
          <StatItem
            key={item.label}
            value={item.value}
            suffix={item.suffix}
            label={item.label}
            isActive={isInView}
          />
        ))}
      </div>
    </motion.section>
  );
}
