"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type ProcessLineProps = {
  lineProgress: number; // 0->1 from the scroll hook
  totalSteps: number; // 5
  activeIndex: number; // kept for API compatibility
  stepProgress: number[]; // kept for API compatibility
};

function ProcessLine({
  lineProgress,
  totalSteps,
  activeIndex,
  stepProgress,
}: ProcessLineProps) {
  void totalSteps;
  void activeIndex;
  void stepProgress;

  const motionProgress = useMotionValue(lineProgress);

  useEffect(() => {
    motionProgress.set(lineProgress);
  }, [lineProgress, motionProgress]);

  const springProgress = useSpring(motionProgress, {
    stiffness: 60,
    damping: 18,
    mass: 0.8,
  });

  return (
    <div className="relative w-[88%]" style={{ height: "1px" }}>
      <div
        className="absolute left-10 top-2 w-full bg-border"
        style={{ height: "1px" }}
      />

      <motion.div
        className="absolute left-10 top-2 w-full bg-foreground"
        style={{
          height: "1px",
          scaleX: springProgress,
          transformOrigin: "left",
        }}
      />
    </div>
  );
}

export default ProcessLine;
export { ProcessLine };
