"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollRevealImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
};

export function ScrollRevealImage({ src, alt, className, imageClassName }: ScrollRevealImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(0% 50% 0% 50% round 1.35rem)", "inset(0% 0% 0% 0% round 1.35rem)"]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(10px)", "blur(0px)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <motion.div ref={ref} className={cn("overflow-hidden", className)} style={{ clipPath, filter }}>
      <motion.img src={src} alt={alt} className={cn("h-full w-full object-cover", imageClassName)} style={{ scale }} />
    </motion.div>
  );
}
