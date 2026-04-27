"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseScrollProgressOptions = {
  totalSteps: number;
  scrollPerStep?: number; // px of scroll per step, default 300
};

type UseScrollProgressReturn = {
  wrapperRef: React.RefObject<HTMLDivElement>;
  progress: number; // 0->1 raw scroll progress through entire section
  activeIndex: number; // 0->4 which step is currently active
  lineProgress: number; // 0->1 how far the connecting line is drawn
  stepProgress: number[]; // array of 5 values, each 0->1, per-step reveal amount
  isPinned: boolean; // is the section currently sticky/pinned
};

function makeInitialStepProgress(totalSteps: number): number[] {
  const values = Array.from({ length: totalSteps }, () => 0);
  if (values.length > 0) {
    values[0] = 1;
  }
  return values;
}

export function getWrapperHeight(totalSteps: number, scrollPerStep = 300): string {
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;
  return `${viewportHeight + totalSteps * scrollPerStep}px`;
}

export function useScrollProgress({
  totalSteps,
  scrollPerStep = 300,
}: UseScrollProgressOptions): UseScrollProgressReturn {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<Omit<UseScrollProgressReturn, "wrapperRef">>({
    progress: 0,
    activeIndex: 0,
    lineProgress: 0,
    stepProgress: makeInitialStepProgress(totalSteps),
    isPinned: false,
  });

  const calculate = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const fallbackTotalScrollHeight = Math.max(1, totalSteps * scrollPerStep);
    const totalScrollHeight = Math.max(1, el.offsetHeight - window.innerHeight) || fallbackTotalScrollHeight;

    // Not yet in pin zone
    if (rect.top > 0) {
      setState((prev) => ({
        ...prev,
        progress: 0,
        activeIndex: 0,
        lineProgress: 0,
        stepProgress: makeInitialStepProgress(totalSteps),
        isPinned: false,
      }));
      return;
    }

    // Past pin zone
    if (rect.bottom <= window.innerHeight) {
      setState((prev) => ({
        ...prev,
        progress: 1,
        activeIndex: totalSteps - 1,
        lineProgress: 1,
        stepProgress: Array.from({ length: totalSteps }, () => 1),
        isPinned: false,
      }));
      return;
    }

    // IN the pin zone — this is where animation happens
    const scrolled = Math.abs(rect.top);
    const progress = Math.min(1, Math.max(0, scrolled / totalScrollHeight));

    // Each step gets an equal slice of the progress range
    const stepSize = 1 / totalSteps; // 0.2 each for 5 steps
    const activeIndex = Math.min(totalSteps - 1, Math.floor(progress / stepSize));

    // Per-step reveal: each step gets its own 0->1 value
    // Step i reveals when progress is between i*stepSize and (i+1)*stepSize
    const stepProgress = Array.from({ length: totalSteps }, (_, i) => {
      const stepStart = i * stepSize;
      const stepEnd = (i + 1) * stepSize;
      if (progress < stepStart) return 0;
      if (progress >= stepEnd) return 1;
      return (progress - stepStart) / stepSize;
    });

    // Step 0 is always 1 (shown on entry)
    if (stepProgress.length > 0) {
      stepProgress[0] = 1;
    }

    setState({
      progress,
      activeIndex,
      lineProgress: progress,
      stepProgress,
      isPinned: true,
    });
  }, [scrollPerStep, totalSteps]);

  useEffect(() => {
    window.addEventListener("scroll", calculate, { passive: true });
    calculate(); // run once on mount
    return () => window.removeEventListener("scroll", calculate);
  }, [calculate]);

  return { wrapperRef, ...state };
}
