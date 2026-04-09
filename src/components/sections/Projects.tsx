"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, BarChart3, CheckCircle2, MoveRight, Sparkles } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import {
  dashboardHighlights,
  dashboardMetrics,
  projectCaseStudies,
} from "@/lib/portfolio-data";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";

const PROJECT_TONES = [
  {
    shell:
      "border-slate-900/8 bg-[linear-gradient(135deg,rgb(255,255,255),rgb(246,239,228))] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgb(16,22,34),rgb(10,14,22))]",
    accent: "text-sky-600 dark:text-sky-300",
    glow: "from-sky-500/18 via-transparent to-transparent dark:from-sky-400/20",
    chip: "bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-200",
  },
  {
    shell:
      "border-amber-900/10 bg-[linear-gradient(135deg,rgb(255,252,246),rgb(248,241,231))] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgb(28,20,14),rgb(18,14,10))]",
    accent: "text-amber-600 dark:text-amber-300",
    glow: "from-amber-500/18 via-transparent to-transparent dark:from-amber-400/20",
    chip: "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200",
  },
  {
    shell:
      "border-emerald-900/10 bg-[linear-gradient(135deg,rgb(246,255,251),rgb(238,247,242))] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgb(11,28,21),rgb(7,18,14))]",
    accent: "text-emerald-600 dark:text-emerald-300",
    glow: "from-emerald-500/18 via-transparent to-transparent dark:from-emerald-400/20",
    chip: "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200",
  },
  {
    shell:
      "border-violet-900/10 bg-[linear-gradient(135deg,rgb(251,248,255),rgb(243,239,249))] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgb(23,17,38),rgb(14,11,24))]",
    accent: "text-violet-600 dark:text-violet-300",
    glow: "from-violet-500/18 via-transparent to-transparent dark:from-violet-400/20",
    chip: "bg-violet-500/10 text-violet-700 dark:bg-violet-400/10 dark:text-violet-200",
  },
] as const;

const PROJECT_VISUALS = [
  {
    label: "Pipeline health",
    stats: [
      { label: "Collection", value: "84%" },
      { label: "Validation", value: "91%" },
      { label: "Delivery", value: "89%" },
    ],
    bars: [
      { label: "Extract", value: 72 },
      { label: "QA", value: 91 },
      { label: "Trend", value: 82 },
      { label: "Report", value: 88 },
    ],
    trend: [18, 28, 24, 36, 48, 44, 63, 72],
  },
  {
    label: "Attrition model flow",
    stats: [
      { label: "EDA", value: "92%" },
      { label: "ROC-AUC", value: "89%" },
      { label: "Readiness", value: "86%" },
    ],
    bars: [
      { label: "Drivers", value: 84 },
      { label: "Model", value: 88 },
      { label: "ROC", value: 91 },
      { label: "Narrative", value: 79 },
    ],
    trend: [22, 33, 39, 44, 52, 61, 68, 80],
  },
  {
    label: "Risk analysis",
    stats: [
      { label: "Sensitivity", value: "93%" },
      { label: "Signals", value: "90%" },
      { label: "Readability", value: "95%" },
    ],
    bars: [
      { label: "Signals", value: 75 },
      { label: "Model", value: 83 },
      { label: "Summary", value: 92 },
      { label: "Care", value: 88 },
    ],
    trend: [16, 24, 35, 46, 44, 56, 70, 82],
  },
  {
    label: "Threat classification",
    stats: [
      { label: "Precision", value: "94%" },
      { label: "Features", value: "91%" },
      { label: "Workflow", value: "90%" },
    ],
    bars: [
      { label: "URLs", value: 79 },
      { label: "Signals", value: 87 },
      { label: "Anomaly", value: 81 },
      { label: "Review", value: 90 },
    ],
    trend: [14, 21, 29, 43, 51, 58, 74, 88],
  },
] as const;

function buildLinePath(values: readonly number[], width = 320, height = 144) {
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

type ProjectStudy = (typeof projectCaseStudies)[number];

function ProjectVisual({
  project,
  index,
}: {
  project: ProjectStudy;
  index: number;
}) {
  const tone = PROJECT_TONES[index % PROJECT_TONES.length]!;
  const visual = PROJECT_VISUALS[index % PROJECT_VISUALS.length]!;
  const linePath = buildLinePath(visual.trend);

  return (
    <div className={cn("relative h-full overflow-hidden rounded-[2rem] border p-4", tone.shell)}>
      <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70", tone.glow)} />

      <div className="relative grid h-full gap-4 xl:grid-rows-[1.15fr_0.85fr]">
        <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="overflow-hidden rounded-[1.6rem] border border-white/20 bg-black/10 dark:border-white/10 dark:bg-white/5">
            <img
              src={project.image}
              alt={project.title}
              className="h-full min-h-[220px] w-full object-cover"
            />
          </div>

          <div className="rounded-[1.6rem] border border-border/60 bg-background/72 p-4 backdrop-blur">
            <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              {visual.label}
            </p>
            <div className="mt-4 grid gap-3">
              {visual.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between rounded-[1rem] border border-border/60 bg-background/70 px-3 py-3"
                >
                  <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {stat.label}
                  </span>
                  <span className={cn("text-lg font-semibold", tone.accent)}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[1.6rem] border border-border/60 bg-background/76 p-4 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Outcome trajectory
              </p>
              <BarChart3 className={cn("h-4 w-4", tone.accent)} />
            </div>

            <svg viewBox="0 0 320 144" className="h-[150px] w-full" fill="none">
              {[0.2, 0.4, 0.6, 0.8].map((fraction) => (
                <line
                  key={fraction}
                  x1="8"
                  x2="312"
                  y1={12 + fraction * 120}
                  y2={12 + fraction * 120}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  opacity="0.4"
                />
              ))}

              <path
                d={`${linePath} L310,132 L10,132 Z`}
                fill="hsl(var(--accent) / 0.14)"
              />
              <path
                d={linePath}
                stroke="hsl(var(--accent))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="rounded-[1.6rem] border border-border/60 bg-background/76 p-4 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Delivery stack
              </p>
              <Sparkles className={cn("h-4 w-4", tone.accent)} />
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
    </div>
  );
}

function ProjectPanel({
  project,
  index,
  isLoopClone = false,
}: {
  project: ProjectStudy;
  index: number;
  isLoopClone?: boolean;
}) {
  const tone = PROJECT_TONES[index % PROJECT_TONES.length]!;

  return (
    <article
      className={cn(
        "absolute inset-0 isolate overflow-hidden rounded-[2.5rem] bg-background dark:bg-[#090b10]",
        isLoopClone && "pointer-events-none",
      )}
    >
      <div className={cn("grid h-full gap-5 rounded-[2.4rem] border p-5 shadow-[0_30px_90px_rgba(15,23,42,0.12)] xl:grid-cols-[0.92fr_1.08fr] xl:p-6", tone.shell)}>
        <div className="flex h-full flex-col gap-5 overflow-hidden rounded-[1.9rem] border border-border/50 bg-background p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-background/70">
                  <project.icon className={cn("h-5 w-5", tone.accent)} />
                </div>
                <Badge
                  variant="outline"
                  className={cn("rounded-full border-transparent px-3 py-1.5 text-[11px] uppercase tracking-[0.18em]", tone.chip)}
                >
                  {project.badge}
                </Badge>
              </div>

              <h3 className="mt-5 max-w-[12ch] font-display text-[clamp(2.3rem,3vw,4rem)] leading-[0.94] tracking-tight text-foreground">
                {project.title}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                {project.summary}
              </p>
            </div>

            <p className="text-5xl font-semibold tracking-[-0.04em] text-foreground/10">
              {String((index % projectCaseStudies.length) + 1).padStart(2, "0")}
            </p>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[1.5rem] border border-border/60 bg-background p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Role</p>
              <p className="mt-3 text-lg font-semibold text-foreground">{project.role}</p>
              <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Problem framing</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.problem}</p>
            </div>

            <div className="rounded-[1.5rem] border border-border/60 bg-background p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Tools used</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-foreground/72"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid flex-1 gap-3">
            {project.approach.map((step, stepIndex) => (
              <div
                key={step}
                className="flex items-start gap-4 rounded-[1.35rem] border border-border/60 bg-background px-4 py-4"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/80 text-sm font-semibold text-foreground">
                  {stepIndex + 1}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Approach</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{step}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="rounded-[1.35rem] border border-border/60 bg-background p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{metric.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>

        <ProjectVisual project={project} index={index} />
      </div>
    </article>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const triggerRef = useRef<any>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const loopedStudies = useMemo(
    () => [...projectCaseStudies, projectCaseStudies[0]!],
    [],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const summaryCards = sectionRef.current?.querySelectorAll(".project-summary-card");
      if (summaryCards?.length) {
        gsap.from(summaryCards, {
          y: 20,
          opacity: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 76%",
          },
        });
      }

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          const panels = panelRefs.current.filter(Boolean) as HTMLElement[];
          if (!viewportRef.current || panels.length < 2) {
            return;
          }

          const stageCount = panels.length - 1;

          gsap.set(panels, {
            autoAlpha: 0,
            yPercent: 0,
            scale: 1.01,
            zIndex: (index: number) => panels.length - index,
          });
          gsap.set(panels[0]!, { autoAlpha: 1, yPercent: 0, scale: 1 });

          const timeline = gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: viewportRef.current,
              start: "top top+=84",
              end: () => `+=${stageCount * window.innerHeight * 0.8}`,
              pin: true,
              scrub: 0.35,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              snap: {
                snapTo: (value: number) => gsap.utils.snap(1 / stageCount, value),
                duration: { min: 0.06, max: 0.18 },
                delay: 0.01,
                ease: "power1.inOut",
              },
              onUpdate: (self) => {
                const nextIndex = Math.round(self.progress * stageCount) % projectCaseStudies.length;
                if (nextIndex !== activeIndexRef.current) {
                  activeIndexRef.current = nextIndex;
                  setActiveIndex(nextIndex);
                }
              },
            },
          });

          panels.forEach((panel, index) => {
            if (index === panels.length - 1) {
              return;
            }

            const nextPanel = panels[index + 1];
            if (!nextPanel) {
              return;
            }

            timeline
              .to(
                panel,
                {
                  autoAlpha: 0,
                  yPercent: 0,
                  scale: 0.985,
                  duration: 0.62,
                },
                index,
              )
              .fromTo(
                nextPanel,
                {
                  autoAlpha: 0,
                  yPercent: 0,
                  scale: 1.015,
                },
                {
                  autoAlpha: 1,
                  yPercent: 0,
                  scale: 1,
                  duration: 0.62,
                },
                index,
              );
          });

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

  const handlePanelJump = (index: number) => {
    const trigger = triggerRef.current;
    if (!trigger || typeof trigger.start !== "number" || typeof trigger.end !== "number") {
      return;
    }

    const stageCount = loopedStudies.length - 1;
    const target = trigger.start + (trigger.end - trigger.start) * (index / stageCount);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="dashboard" className="px-2 pb-8 pt-4 sm:px-3 sm:pb-10 lg:pb-6">
      <div className="site-shell">
        <SectionHeading
          eyebrow="Projects"
          title="Case studies in data analysis, modeling, and insight delivery."
          description="A tighter project gallery with layered motion, stronger contrast, and smoother progression from one analytical story to the next."
        />

        <Reveal className="mt-10 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="project-summary-card panel-surface rounded-[2rem] p-6 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Pinned panel gallery
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-[2.4rem]">
                  Four projects, one smooth analytical journey.
                </h3>
              </div>
              <div className="rounded-full border border-border/70 bg-background/72 px-4 py-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Layered scrolling
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {dashboardMetrics.slice(0, 3).map((metric) => (
                <div key={metric.label} className="rounded-[1.5rem] border border-border/60 bg-background/76 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-3">
            {dashboardHighlights.map((highlight) => (
              <div key={highlight.title} className="project-summary-card panel-soft rounded-[1.7rem] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-foreground/[0.04]">
                  <highlight.icon className="h-5 w-5 text-accent" />
                </div>
                <h4 className="mt-4 text-base font-semibold text-foreground">{highlight.title}</h4>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{highlight.description}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 hidden lg:block">
          <div
            ref={viewportRef}
            className="relative h-[calc(100vh-7.25rem)] min-h-[680px] overflow-hidden rounded-[2.6rem] bg-background dark:bg-[#090b10]"
          >
              {loopedStudies.map((project, index) => (
                <div
                  key={`${project.id}-${index === loopedStudies.length - 1 ? "loop" : "panel"}`}
                ref={(element) => {
                  panelRefs.current[index] = element;
                }}
                className="absolute inset-0"
              >
                <ProjectPanel
                  project={project}
                  index={index}
                  isLoopClone={index === loopedStudies.length - 1}
                />
              </div>
            ))}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-5">
              <div className="pointer-events-auto ml-auto flex max-w-max flex-wrap gap-2 rounded-full border border-border/70 bg-background/88 px-3 py-2 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                {projectCaseStudies.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => handlePanelJump(index)}
                    className={cn(
                      "rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition duration-300",
                      activeIndex === index
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-foreground/8 hover:text-foreground",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")} {project.badge}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:hidden">
            {projectCaseStudies.map((project, index) => (
              <div key={project.id} className="panel-surface overflow-hidden rounded-[2rem] p-4">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-foreground/[0.04]">
                    <project.icon className="h-5 w-5 text-accent" />
                  </div>
                  <Badge
                    variant="outline"
                    className="rounded-full border-border/70 bg-background/72 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-foreground/72"
                  >
                    {project.badge}
                  </Badge>
                </div>
                <span className="text-4xl font-semibold tracking-[-0.04em] text-foreground/10">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="font-display text-[clamp(2rem,8vw,3rem)] leading-[0.95] tracking-tight text-foreground">
                {project.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.summary}</p>

              <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-border/60">
                <img src={project.image} alt={project.title} className="h-60 w-full object-cover" />
              </div>

              <div className="mt-5 grid gap-3">
                {project.impact.map((item) => (
                  <div key={item} className="flex gap-3 rounded-[1.2rem] border border-border/60 bg-background/76 px-4 py-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 text-accent" />
                    <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Reveal className="mt-6 grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
          <div className="project-summary-card panel-surface rounded-[2rem] p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Flow notes
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  Each panel keeps the content fixed while the whole stage glides from one story to the next.
                </p>
              </div>
              <MoveRight className="h-5 w-5 text-accent" />
            </div>
          </div>

          <div className="project-summary-card panel-soft rounded-[2rem] p-6">
            <div className="flex items-center gap-3">
              <ArrowUpRight className="h-5 w-5 text-accent" />
              <p className="text-sm leading-7 text-muted-foreground">
                Dark mode visuals are now treated as intentional analytical surfaces instead of light-theme cards recolored after the fact.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
