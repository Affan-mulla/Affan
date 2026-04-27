import React from "react";
import { motion } from "framer-motion";

const borderClass = "pointer-events-none absolute h-2 w-2 border-foreground transition-all duration-300 ease-in-out group-hover:h-4 group-hover:w-4 z-10 ";
const Border = () => {
  return (
    <>
      <motion.span
        className={borderClass + " top-0 left-0 border-t border-l"}
      />
      <motion.span
        className={borderClass + " right-0 top-0 border-t border-r"}
      />
      <motion.span
        className={borderClass + " left-0 bottom-0 border-b border-l"}
      />
      <motion.span
        className={borderClass + " right-0 bottom-0 border-b border-r"}
      />
    </>
  );
};

export default Border;
