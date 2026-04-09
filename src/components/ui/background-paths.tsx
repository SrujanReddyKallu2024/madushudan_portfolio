"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 52 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
    opacity: 0.07 + i * 0.012,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full scale-[1.12] text-stone-900 mix-blend-multiply dark:text-white dark:mix-blend-screen"
        viewBox="0 0 696 316"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0.3, opacity: path.opacity * 0.9 }}
            animate={{
              pathLength: 1,
              opacity: [path.opacity * 0.7, path.opacity * 1.35, path.opacity * 0.7],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 18 + path.id * 0.28,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

type BackgroundPathsProps = {
  className?: string;
  overlayClassName?: string;
};

export function BackgroundPaths({ className, overlayClassName }: BackgroundPathsProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className={cn("absolute inset-0", overlayClassName)}>
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
    </div>
  );
}
