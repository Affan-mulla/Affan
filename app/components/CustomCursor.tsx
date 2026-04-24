"use client";

import { AnimatePresence, motion } from "framer-motion";

type CursorState = {
  x: number;
  y: number;
  visible: boolean;
  label: string;
};

type CustomCursorProps = {
  cursor: CursorState;
  isTouch: boolean;
};

export function CustomCursor({ cursor, isTouch }: CustomCursorProps) {
  return (
    <AnimatePresence>
      {!isTouch && (
        <motion.div
          key="cursor"
          aria-hidden="true"
          className="cursor"
          animate={{
            opacity: cursor.visible ? 1 : 0,
            x: cursor.x,
            y: cursor.y,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.35 }}
        >
          <span className="cursor-dot" />
          <span className="cursor-pill">{cursor.label}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
