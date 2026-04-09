"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-setup";
import { cn } from "@/lib/utils";

type ScrollTextMarqueeProps = {
  text: string;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
};

export function ScrollTextMarquee({
  text,
  className,
  speed = 1,
  direction = "left",
}: ScrollTextMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".marquee-item");

    const ctx = gsap.context(() => {
      gsap.to(items, {
        xPercent: direction === "left" ? -100 : 100,
        repeat: -1,
        duration: 20 / speed,
        ease: "none",
        modifiers: {
          xPercent: gsap.utils.wrap(
            direction === "left" ? -100 : 0,
            direction === "left" ? 0 : 100,
          ),
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [speed, direction]);

  const repeated = `${text}  -  ${text}  -  ${text}  -  ${text}  -  `;

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden whitespace-nowrap border-y border-border/35", className)}
    >
      <div className="marquee-item inline-block pr-8 text-[clamp(3rem,8vw,8rem)] font-display tracking-tight text-foreground/[0.1] dark:text-white/[0.16]">
        {repeated}
      </div>
      <div className="marquee-item inline-block pr-8 text-[clamp(3rem,8vw,8rem)] font-display tracking-tight text-foreground/[0.1] dark:text-white/[0.16]">
        {repeated}
      </div>
    </div>
  );
}
