"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useMemo, useRef, useState } from "react";

type ScrollHighlightTextProps = {
  paragraphs: string[];
  className?: string;
  paragraphClassName?: string;
};

export function ScrollHighlightText({
  paragraphs,
  className,
  paragraphClassName,
}: ScrollHighlightTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wordsByParagraph = useMemo(
    () => paragraphs.map((paragraph) => paragraph.trim().split(/\s+/).filter(Boolean)),
    [paragraphs],
  );
  const paragraphStartIndices = useMemo(() => {
    const starts: number[] = [];
    let runningIndex = 0;

    for (const words of wordsByParagraph) {
      starts.push(runningIndex);
      runningIndex += words.length;
    }

    return starts;
  }, [wordsByParagraph]);
  const totalWords = useMemo(
    () => wordsByParagraph.reduce((count, words) => count + words.length, 0),
    [wordsByParagraph],
  );
  const [activeWordIndex, setActiveWordIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start 0.8", "end 0.7"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (totalWords === 0) {
      setActiveWordIndex(-1);
      return;
    }

    const nextIndex = Math.min(
      totalWords - 1,
      Math.max(-1, Math.floor(latest * (totalWords + 1)) - 1),
    );
    setActiveWordIndex((prev) => (prev === nextIndex ? prev : nextIndex));
  });

  return (
    <div ref={wrapperRef} className={className}>
      {wordsByParagraph.map((words, paragraphIndex) => (
        <p key={paragraphIndex} className={paragraphClassName}>
          {words.map((word, wordIndex) => {
            const globalWordIndex = paragraphStartIndices[paragraphIndex] + wordIndex;

            return (
              <motion.span
                key={`${word}-${globalWordIndex}`}
                initial={false}
                animate={{
                  color:
                    globalWordIndex <= activeWordIndex
                      ? "var(--color-text)"
                      : "var(--color-text-muted)",
                  opacity: globalWordIndex <= activeWordIndex ? 1 : 0.38,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={wordIndex === words.length - 1 ? "inline" : "mr-[0.32em] inline"}
              >
                {word}
              </motion.span>
            );
          })}
        </p>
      ))}
    </div>
  );
}