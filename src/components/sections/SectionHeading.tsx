"use client";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "space-y-4",
        centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      <p className="eyebrow">{eyebrow}</p>
      <div className="space-y-3">
        <h2 className="font-display text-4xl leading-none tracking-tight text-[clamp(2.75rem,5vw,4.75rem)] text-foreground">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
