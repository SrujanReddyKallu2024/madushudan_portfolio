"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { skillGroups } from "@/lib/portfolio-data";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
import "./skills-panels.css";

const stackCards = [
  {
    number: "01",
    title: "Data Experience\nDesign",
    tone: "light" as const,
    approach:
      "I turn raw numbers into clear visuals: dashboards, charts, and reports that decision-makers can read at a glance.",
    bodyLeft:
      "Every visualization starts with understanding who will read it and what action it should drive. I shape the hierarchy and layout before choosing tools.",
    bodyRight:
      "Using Tableau, Matplotlib, Seaborn, and Excel, I build reporting surfaces that are clean, accurate, and easy to maintain.",
    cta: "See visualization work",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80",
    chips: skillGroups[2]?.items.slice(0, 5) ?? [],
  },
  {
    number: "02",
    title: "Workflow\nDevelopment",
    tone: "light" as const,
    approach:
      "I build reliable data pipelines from SQL extraction through Python transformation to QA checkpoints and delivery.",
    bodyLeft:
      "Each stage is designed for repeatability: extraction scripts, cleaning logic, validation rules, and transformation steps that other analysts can follow.",
    bodyRight:
      "The result is a clean data workflow where every step is documented, testable, and ready for production reporting.",
    cta: "Explore workflow projects",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=2000&q=80",
    chips: skillGroups[0]?.items.slice(0, 6) ?? [],
  },
  {
    number: "03",
    title: "Full-Scope\nCreation",
    tone: "dark" as const,
    approach:
      "I own the full analytical cycle from problem framing and data collection to modeling, evaluation, and stakeholder communication.",
    bodyLeft:
      "It starts with understanding the question: what does the team need to decide? Then I shape the analysis, choose the right model, and validate the results.",
    bodyRight:
      "The final output is always a clear story: statistical findings translated into language that non-technical stakeholders can act on.",
    cta: "View case studies",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2000&q=80",
    chips: [...(skillGroups[1]?.items.slice(0, 4) ?? []), ...(skillGroups[3]?.items.slice(0, 3) ?? [])],
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          const panels = gsap.utils.toArray<HTMLElement>(".skills-overscroll-panel", sectionRef.current);
          if (panels.length < 2) {
            return;
          }

          const animatedPanels = panels.slice(0, -1);
          const timelines: gsap.core.Timeline[] = [];

          animatedPanels.forEach((panel) => {
            const innerPanel = panel.querySelector(".skills-overscroll-panel-inner") as HTMLElement | null;
            if (!innerPanel) {
              return;
            }

            const panelViewportHeight = panel.offsetHeight;
            const panelHeight = innerPanel.offsetHeight;
            const difference = Math.max(0, panelHeight - panelViewportHeight);

            panel.style.marginBottom = difference > 0 ? `${difference}px` : "0px";

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: panel,
                start: "bottom bottom",
                end: () => (difference > 0 ? `+=${innerPanel.offsetHeight}` : "bottom top"),
                pinSpacing: false,
                pin: true,
                scrub: 0.55,
                invalidateOnRefresh: true,
              },
            });

            if (difference > 0) {
              tl.to(innerPanel, {
                y: -difference,
                duration: difference / panelViewportHeight,
                ease: "none",
              });
            }

            tl.fromTo(
              panel,
              { scale: 1, opacity: 1 },
              { scale: 0.78, opacity: 0.42, duration: 0.88, ease: "none" },
            ).to(panel, { opacity: 0, duration: 0.12, ease: "none" });

            timelines.push(tl);
          });

          ScrollTrigger.refresh();

          return () => {
            timelines.forEach((timeline) => timeline.kill());
            panels.forEach((panel) => {
              panel.style.marginBottom = "0px";
            });
          };
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="pt-20 sm:pt-24">
      <div className="px-2 sm:px-3">
        <div className="site-shell">
          <SectionHeading
            eyebrow="Skills"
            title="Core competencies across the data lifecycle."
            description="From raw data to polished insight: visualization, engineering, and end-to-end analytical thinking."
            align="center"
          />
        </div>
      </div>

      <div className="skills-overscroll-wrapper mt-4">
        {stackCards.map((card) => {
          const isDark = card.tone === "dark";

          return (
            <section key={card.number} className="skills-overscroll-panel px-2 sm:px-3">
              <div className="site-shell">
                <article
                  className={
                    isDark
                      ? "skills-overscroll-panel-inner overflow-hidden rounded-[2rem] border border-zinc-200/15 bg-zinc-800 text-zinc-50 shadow-[0_28px_90px_rgba(0,0,0,0.24)]"
                      : "skills-overscroll-panel-inner overflow-hidden rounded-[2rem] border border-zinc-900/10 bg-zinc-50 text-zinc-950 shadow-[0_28px_90px_rgba(15,23,42,0.08)]"
                  }
                >
                  <div className="flex h-full flex-col p-4 sm:p-6 lg:p-7">
                    <header className="grid grid-cols-[1fr_auto] gap-3">
                      <h3 className="text-[clamp(2.5rem,7vw,6.5rem)] font-semibold leading-[0.88] tracking-[-0.04em]">
                        {card.title.split("\n").map((line) => (
                          <span key={`${card.number}-${line}`} className="block">
                            {line}
                          </span>
                        ))}
                      </h3>
                      <p
                        className={
                          isDark
                            ? "text-[clamp(3rem,7vw,6.5rem)] text-zinc-300/60"
                            : "text-[clamp(3rem,7vw,6.5rem)] text-zinc-400"
                        }
                      >
                        {card.number}
                      </p>
                    </header>

                    <div
                      className={
                        isDark
                          ? "mt-5 flex-1 border-t border-zinc-100/20 pt-5"
                          : "mt-5 flex-1 border-t border-zinc-900/20 pt-5"
                      }
                    >
                      <div className="grid h-full gap-5 lg:grid-cols-[0.72fr_0.86fr_1.18fr] lg:gap-8">
                        <div className="space-y-4">
                          <p className={isDark ? "text-sm text-zinc-300" : "text-sm text-zinc-600"}>Approach</p>
                          <p className={isDark ? "text-sm leading-7 text-zinc-300/90" : "text-sm leading-7 text-zinc-600"}>
                            {card.approach}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {card.chips.map((chip) => (
                              <span
                                key={`${card.number}-${chip}`}
                                className={
                                  isDark
                                    ? "rounded-full border border-zinc-100/25 bg-zinc-950/40 px-3 py-1 text-xs uppercase tracking-[0.18em] text-zinc-200"
                                    : "rounded-full border border-zinc-900/15 bg-zinc-100/75 px-3 py-1 text-xs uppercase tracking-[0.18em] text-zinc-700"
                                }
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div
                          className={
                            isDark
                              ? "space-y-4 text-[clamp(1rem,1.1vw,1.35rem)] leading-[1.28] text-zinc-300/90"
                              : "space-y-4 text-[clamp(1rem,1.1vw,1.35rem)] leading-[1.28] text-zinc-600"
                          }
                        >
                          <p>{card.bodyLeft}</p>
                          <p>{card.bodyRight}</p>
                          <div
                            className={
                              isDark
                                ? "inline-flex items-center border-b border-zinc-100/25 pb-1 pt-4 text-lg text-zinc-200"
                                : "inline-flex items-center border-b border-zinc-900/25 pb-1 pt-4 text-lg text-zinc-700"
                            }
                          >
                            {card.cta}
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                          </div>
                        </div>

                        <div className="relative h-[32vh] min-h-[240px] overflow-hidden rounded-[1.25rem] border border-black/10 lg:h-full">
                          <img src={card.image} alt={card.title.replace("\n", " ")} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
