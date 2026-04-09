"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GalleryPanel {
  title: string;
  subtitle: string;
  bodyLeft: string;
  bodyRight: string;
  cta: string;
  image: string;
  chips: string[];
  tone?: "light" | "dark";
}

interface ScrollGalleryProps {
  panels: GalleryPanel[];
  className?: string;
}

function SkillsPanel({ panel, index, reducedMotion }: { panel: GalleryPanel; index: number; reducedMotion: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [36, -26]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "8%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.14]);
  const panelNumber = String(index + 1).padStart(2, "0");
  const isDarkPanel = panel.tone === "dark";
  const textTone = isDarkPanel ? "text-zinc-50" : "text-zinc-950";
  const mutedTone = isDarkPanel ? "text-zinc-300/80" : "text-zinc-600";
  const borderTone = isDarkPanel ? "border-zinc-200/20" : "border-zinc-700/20";
  const chipTone = isDarkPanel
    ? "border-zinc-100/25 bg-zinc-950/35 text-zinc-200"
    : "border-zinc-900/15 bg-zinc-100/70 text-zinc-700";

  return (
    <section
      ref={ref}
      className={cn(
        "relative min-h-[132vh] px-4 py-4 sm:px-6",
        isDarkPanel ? "bg-zinc-700" : "bg-zinc-100",
      )}
    >
      <div className={cn("top-3 h-[calc(100vh-1.5rem)]", reducedMotion ? "relative" : "sticky")}>
        <article
          className={cn(
            "mx-auto flex h-full max-w-[1800px] flex-col rounded-[1.25rem] border p-4 shadow-[0_30px_80px_rgba(0,0,0,0.08)] sm:p-6",
            textTone,
            borderTone,
            isDarkPanel ? "bg-zinc-800" : "bg-zinc-50",
          )}
        >
          <header className="grid grid-cols-[1fr_auto] gap-4">
            <motion.h3
              style={reducedMotion ? undefined : { y: headingY }}
              className="text-[clamp(2.8rem,11vw,8.7rem)] font-semibold leading-[0.85] tracking-[-0.04em]"
            >
              {panel.title.split("\n").map((line) => (
                <span key={`${panelNumber}-${line}`} className="block">
                  {line}
                </span>
              ))}
            </motion.h3>
            <p className={cn("text-[clamp(3rem,8vw,8.1rem)] font-semibold leading-none tracking-[-0.03em]", mutedTone)}>
              {panelNumber}
            </p>
          </header>

          <div className={cn("mt-5 flex-1 border-t pt-4", borderTone)}>
            <div className="grid h-full gap-5 lg:grid-cols-[0.78fr_0.88fr_1.14fr] lg:gap-8">
              <div className="space-y-4">
                <p className={cn("text-sm font-medium", mutedTone)}>Approach</p>
                <p className={cn("text-sm leading-7", mutedTone)}>{panel.subtitle}</p>

                <div className="flex flex-wrap gap-2">
                  {panel.chips.map((chip) => (
                    <span
                      key={`${panelNumber}-${chip}`}
                      className={cn("rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em]", chipTone)}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className={cn("space-y-4 text-[clamp(1rem,1.25vw,1.55rem)] leading-[1.25]", mutedTone)}>
                <p>{panel.bodyLeft}</p>
                <p>{panel.bodyRight}</p>
                <div className={cn("inline-flex border-b pb-1 pt-4 text-lg font-medium", borderTone)}>
                  {panel.cta}
                </div>
              </div>

              <div className="relative h-[34vh] min-h-[240px] overflow-hidden rounded-[1.1rem] border border-black/10 lg:h-full">
                <motion.img
                  src={panel.image}
                  alt={panel.title.replace(/\n/g, " ")}
                  className="h-full w-full object-cover"
                  style={reducedMotion ? undefined : { y: imageY, scale: imageScale }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export function ScrollGallery({ panels, className }: ScrollGalleryProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div className={cn(className)}>
      {panels.map((panel, index) => (
        <SkillsPanel key={`${panel.title}-${index}`} panel={panel} index={index} reducedMotion={reducedMotion} />
      ))}
    </div>
  );
}
