"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Database, MapPin, ShieldCheck, Sparkles } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { experiences } from "@/lib/portfolio-data";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";

const EXPERIENCE_VISUALS = [
  {
    title: "Reporting pipeline status",
    icon: Database,
    stats: [
      { label: "SQL extracts", value: "24+" },
      { label: "QA checks", value: "96%" },
      { label: "Ops reports", value: "Weekly" },
    ],
    bars: [
      { label: "Transform", value: 84 },
      { label: "Validate", value: 92 },
      { label: "Monitor", value: 86 },
      { label: "Deliver", value: 89 },
    ],
    trend: [18, 24, 31, 46, 43, 58, 66, 80],
    notes: ["SQL reporting", "QA/QC logic", "Excel dashboards"],
  },
  {
    title: "Data integrity support",
    icon: ShieldCheck,
    stats: [
      { label: "DB support", value: "Relational" },
      { label: "Validation", value: "High" },
      { label: "Reports", value: "Ops-ready" },
    ],
    bars: [
      { label: "Collect", value: 71 },
      { label: "Organize", value: 84 },
      { label: "Validate", value: 87 },
      { label: "Report", value: 75 },
    ],
    trend: [14, 19, 27, 35, 44, 53, 64, 74],
    notes: ["Structured storage", "Integrity rules", "Monitoring support"],
  },
] as const;

function buildLinePath(values: readonly number[], width = 320, height = 150) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1, max - min);
  const padX = 10;
  const padY = 12;

  return values
    .map((value, index) => {
      const x = padX + (index / (values.length - 1)) * (width - padX * 2);
      const y = padY + (1 - (value - min) / range) * (height - padY * 2);
      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

type ExperienceItem = (typeof experiences)[number];

function ExperienceVisual({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index: number;
}) {
  const visual = EXPERIENCE_VISUALS[index % EXPERIENCE_VISUALS.length]!;
  const VisualIcon = visual.icon;
  const linePath = buildLinePath(visual.trend);

  return (
    <div className="grid h-full gap-4 xl:grid-rows-[0.95fr_1.05fr]">
      <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-[radial-gradient(circle_at_top_left,hsl(var(--accent)/0.16),transparent_32%),linear-gradient(180deg,hsl(var(--background)/0.96),hsl(var(--background)/0.88))] p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {visual.title}
            </p>
            <p className="mt-2 text-xl font-semibold text-foreground">{experience.company}</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-background/78">
            <VisualIcon className="h-5 w-5 text-accent" />
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {visual.stats.map((stat) => (
            <div key={stat.label} className="rounded-[1.2rem] border border-border/60 bg-background/76 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</p>
              <p className="mt-3 text-xl font-semibold tracking-tight text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {visual.notes.map((note) => (
            <Badge
              key={note}
              variant="outline"
              className="rounded-full border-border/70 bg-background/72 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-foreground/72"
            >
              {note}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.04fr_0.96fr]">
        <div className="rounded-[2rem] border border-border/60 bg-background/76 p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Delivery progression
            </p>
            <Sparkles className="h-4 w-4 text-accent" />
          </div>
          <svg viewBox="0 0 320 150" className="h-[155px] w-full" fill="none">
            {[0.2, 0.4, 0.6, 0.8].map((fraction) => (
              <line
                key={fraction}
                x1="8"
                x2="312"
                y1={12 + fraction * 126}
                y2={12 + fraction * 126}
                stroke="hsl(var(--border))"
                strokeWidth="1"
                opacity="0.4"
              />
            ))}

            <path d={`${linePath} L310,138 L10,138 Z`} fill="hsl(var(--accent) / 0.16)" />
            <path
              d={linePath}
              stroke="hsl(var(--accent))"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="rounded-[2rem] border border-border/60 bg-background/76 p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Workflow stages
            </p>
            <ArrowUpRight className="h-4 w-4 text-accent" />
          </div>
          <div className="grid gap-3">
            {visual.bars.map((bar) => (
              <div key={bar.label}>
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{bar.label}</span>
                  <span>{bar.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-foreground/8 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent via-accent to-foreground/60"
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const fillRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<any>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const desktopEntries = useMemo(() => experiences, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mobileCards = sectionRef.current?.querySelectorAll(".experience-mobile-card");
      if (mobileCards?.length) {
        gsap.from(mobileCards, {
          y: 28,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        });
      }

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          const slides = slideRefs.current.filter(Boolean) as HTMLElement[];
          if (!frameRef.current || !slides.length || !fillRef.current) {
            return;
          }

          const stageCount = Math.max(1, slides.length - 1);

          gsap.set(slides, { autoAlpha: 0, y: 34 });
          gsap.set(slides[0]!, { autoAlpha: 1, y: 0 });
          gsap.set(fillRef.current, {
            scaleY: slides.length > 1 ? 1 / slides.length : 1,
            transformOrigin: "top center",
          });

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: frameRef.current,
              start: "top top+=84",
              end: () => `+=${stageCount * window.innerHeight * 0.82}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              snap: slides.length > 1
                ? {
                    snapTo: (value: number) => gsap.utils.snap(1 / stageCount, value),
                    duration: { min: 0.1, max: 0.3 },
                    delay: 0.05,
                    ease: "power1.inOut",
                  }
                : undefined,
              onUpdate: (self) => {
                const nextIndex = Math.min(
                  slides.length - 1,
                  Math.round(self.progress * stageCount),
                );

                if (nextIndex !== activeIndexRef.current) {
                  activeIndexRef.current = nextIndex;
                  setActiveIndex(nextIndex);
                }
              },
            },
          });

          slides.forEach((slide, index) => {
            if (index === slides.length - 1) {
              return;
            }

            const nextSlide = slides[index + 1];
            if (!nextSlide) {
              return;
            }

            timeline
              .to(
                slide,
                {
                  autoAlpha: 0,
                  y: -26,
                  duration: 1,
                },
                index,
              )
              .fromTo(
                nextSlide,
                {
                  autoAlpha: 0,
                  y: 34,
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 1,
                },
                index,
              );
          });

          timeline.to(
            fillRef.current,
            {
              scaleY: 1,
              duration: stageCount,
            },
            0,
          );

          triggerRef.current = timeline.scrollTrigger ?? null;

          return () => {
            triggerRef.current = null;
            activeIndexRef.current = 0;
            setActiveIndex(0);
          };
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDateJump = (index: number) => {
    const trigger = triggerRef.current;
    if (!trigger || typeof trigger.start !== "number" || typeof trigger.end !== "number") {
      return;
    }

    const stageCount = Math.max(1, desktopEntries.length - 1);
    const target = trigger.start + (trigger.end - trigger.start) * (index / stageCount);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="experience" className="px-2 py-16 sm:px-3 sm:py-20">
      <div className="site-shell-tight">
        <SectionHeading
          eyebrow="Experience"
          title="Pinned delivery stories with the dates always in view."
          description="The experience section now keeps the timeline visible while the reporting, QA, and analytics work changes beside it."
        />

        <div className="mt-12 hidden lg:block">
          <div
            ref={frameRef}
            className="relative h-[calc(100vh-7rem)] min-h-[660px] overflow-hidden rounded-[2.5rem] border border-border/60 bg-card/72 shadow-[0_32px_110px_rgba(15,23,42,0.1)] backdrop-blur-xl"
          >
            <div className="grid h-full grid-cols-[16rem_minmax(0,1fr)]">
              <aside className="relative border-r border-border/60 bg-background/76 px-6 py-8">
                <div className="absolute left-11 top-14 h-[calc(100%-7rem)] w-px bg-border/70" />
                <div
                  ref={fillRef}
                  className="absolute left-11 top-14 h-[calc(100%-7rem)] w-px bg-gradient-to-b from-accent via-accent/70 to-accent/20"
                />

                <div className="space-y-8 pt-4">
                  {desktopEntries.map((experience, index) => (
                    <button
                      key={experience.company}
                      type="button"
                      onClick={() => handleDateJump(index)}
                      className={cn(
                        "group relative block w-full rounded-[1.4rem] px-4 py-4 text-left transition duration-300",
                        activeIndex === index
                          ? "bg-accent/10 shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
                          : "hover:bg-foreground/4",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute left-[-0.18rem] top-7 h-4 w-4 rounded-full border border-background shadow-[0_0_0_6px_hsl(var(--accent)/0.12)]",
                          activeIndex === index ? "bg-accent" : "bg-border",
                        )}
                      />
                      <p className="pl-4 text-sm uppercase tracking-[0.24em] text-muted-foreground">
                        {experience.period}
                      </p>
                      <p className="mt-3 pl-4 text-base font-semibold text-foreground">
                        {experience.company}
                      </p>
                      <p className="mt-2 pl-4 text-sm leading-6 text-muted-foreground">
                        {experience.role}
                      </p>
                    </button>
                  ))}
                </div>
              </aside>

              <div className="relative h-full overflow-hidden p-6">
                {desktopEntries.map((experience, index) => (
                  <article
                    key={experience.company}
                    ref={(element) => {
                      slideRefs.current[index] = element;
                    }}
                    className="absolute inset-6 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]"
                  >
                    <div className="flex h-full flex-col gap-4 rounded-[2rem] border border-border/60 bg-background/76 p-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-foreground/[0.04]">
                          <experience.icon className="h-5 w-5 text-accent" />
                        </div>
                        <Badge
                          variant="outline"
                          className="rounded-full border-border/70 bg-background/72 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-foreground/72"
                        >
                          {experience.location}
                        </Badge>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                          Role
                        </p>
                        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                          {experience.role}
                        </h3>
                        <p className="mt-5 text-sm leading-7 text-muted-foreground">
                          {experience.summary}
                        </p>
                      </div>

                      <div className="rounded-[1.5rem] border border-border/60 bg-background/78 p-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          Location
                        </p>
                        <p className="mt-3 flex items-center gap-2 text-sm text-foreground/80">
                          <MapPin className="h-4 w-4 text-accent" />
                          {experience.location}
                        </p>
                      </div>

                      <div className="grid flex-1 gap-3">
                        {experience.bullets.map((bullet) => (
                          <div
                            key={bullet}
                            className="rounded-[1.3rem] border border-border/60 bg-background/78 px-4 py-4"
                          >
                            <p className="text-sm leading-7 text-muted-foreground">{bullet}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <ExperienceVisual experience={experience} index={index} />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:hidden">
          {experiences.map((experience, index) => (
            <div
              key={experience.company}
              className="experience-mobile-card panel-surface rounded-[2rem] p-5"
            >
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-foreground/[0.04]">
                  <experience.icon className="h-5 w-5 text-accent" />
                </div>
                <Badge
                  variant="outline"
                  className="rounded-full border-border/70 bg-background/72 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-foreground/72"
                >
                  {experience.period}
                </Badge>
              </div>

              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
                {experience.company}
              </h3>
              <p className="mt-2 text-sm text-foreground/80">{experience.role}</p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{experience.summary}</p>

              <div className="mt-5 grid gap-3">
                {experience.bullets.map((bullet) => (
                  <div key={bullet} className="rounded-[1.2rem] border border-border/60 bg-background/76 px-4 py-3">
                    <p className="text-sm leading-7 text-muted-foreground">{bullet}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <ExperienceVisual experience={experience} index={index} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
