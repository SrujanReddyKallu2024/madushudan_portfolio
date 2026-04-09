"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LiveDashboard } from "@/components/ui/live-dashboard";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { SplineScene } from "@/components/ui/splite";
import { Reveal } from "@/components/ui/reveal";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { dashboardMetrics, profile, resumeHref } from "@/lib/portfolio-data";
import { gsap } from "@/lib/gsap-setup";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nameChars = nameRef.current?.querySelectorAll(".char");
      if (nameChars?.length) {
        gsap.from(nameChars, {
          y: 72,
          opacity: 0,
          rotateX: -90,
          stagger: 0.03,
          duration: 1,
          ease: "power3.out",
          delay: 0.16,
        });
      }

      if (badgeRef.current) {
        gsap.from(badgeRef.current, {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.08,
        });
      }

      const taglineWords = taglineRef.current?.querySelectorAll(".word");
      if (taglineWords?.length) {
        gsap.from(taglineWords, {
          y: 36,
          opacity: 0,
          stagger: 0.045,
          duration: 0.82,
          ease: "power3.out",
          delay: 0.54,
        });
      }

      if (summaryRef.current) {
        gsap.from(summaryRef.current, {
          y: 24,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          delay: 0.82,
        });
      }

      if (ctaRef.current) {
        gsap.from(ctaRef.current.children, {
          y: 18,
          opacity: 0,
          stagger: 0.1,
          duration: 0.68,
          ease: "power3.out",
          delay: 0.98,
        });
      }

      if (metricsRef.current) {
        gsap.from(metricsRef.current.children, {
          y: 24,
          opacity: 0,
          stagger: 0.08,
          duration: 0.72,
          ease: "power3.out",
          delay: 1.08,
        });
      }

      if (robotRef.current) {
        gsap.from(robotRef.current, {
          x: 72,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.34,
        });
      }

      if (robotRef.current && sectionRef.current) {
        gsap.to(robotRef.current, {
          y: -72,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      }

      const textCol = sectionRef.current?.querySelector(".hero-text-col");
      if (textCol && sectionRef.current) {
        gsap.to(textCol, {
          y: -34,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.85,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nameChars = profile.name.split("").map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ display: char === " " ? "inline" : undefined }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  const taglineWords = "Turning complex data into dashboards people actually trust."
    .split(" ")
    .map((word, i) => (
      <span key={i} className="word inline-block mr-[0.3em]">
        {word}
      </span>
    ));

  return (
    <section ref={sectionRef} id="hero" className="relative overflow-hidden px-2 pb-2 pt-24 sm:px-3 sm:pt-28">
      <BackgroundPaths
        className="inset-x-[-18%] inset-y-[-18%] -z-10"
        overlayClassName="opacity-[0.72] dark:opacity-[0.82] [mask-image:radial-gradient(circle_at_center,black_0%,black_58%,transparent_100%)]"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_24%_28%,hsl(var(--accent)/0.12),transparent_26%),radial-gradient(circle_at_72%_38%,hsl(var(--foreground)/0.07),transparent_32%)] dark:bg-[radial-gradient(circle_at_24%_28%,hsl(var(--accent)/0.14),transparent_24%),radial-gradient(circle_at_72%_38%,hsl(var(--foreground)/0.08),transparent_30%)]" />

      <div className="site-shell relative z-10 grid min-h-[calc(100vh-6.5rem)] items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
        <div className="hero-text-col relative z-10 min-w-0 max-w-[42rem] lg:pr-2">
          <div ref={badgeRef} className="mb-4 flex flex-wrap items-center gap-3">
            <Badge
              variant="outline"
              className="rounded-full border-border/70 bg-background/75 px-4 py-2 text-xs uppercase tracking-[0.28em] text-foreground/72"
            >
              Open to analytics opportunities
            </Badge>
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
          </div>

          <div className="max-w-[40rem]">
            <p className="mb-3 text-sm uppercase tracking-[0.32em] text-muted-foreground">
              Data analyst / reporting / machine learning
            </p>

            <h1
              ref={nameRef}
              className="font-display text-[clamp(3.15rem,6.2vw,6.35rem)] leading-[0.9] tracking-tight text-foreground"
              style={{ perspective: "600px" }}
            >
              {nameChars}
            </h1>

            <h2
              ref={taglineRef}
              className="mt-4 max-w-[14ch] text-[clamp(1.65rem,2.9vw,2.95rem)] leading-[1.06] tracking-tight text-accent [text-shadow:0_1px_0_hsl(var(--background))]"
            >
              {taglineWords}
            </h2>
          </div>

          <div ref={summaryRef} className="mt-6 max-w-[39rem] space-y-4 text-base leading-7 text-muted-foreground sm:text-[1.05rem] sm:leading-8">
            <p>{profile.summary}</p>
          </div>

          <div ref={ctaRef} className="mt-7 flex flex-col gap-4 sm:flex-row">
            <Button asChild className="rounded-full px-7 py-6 text-[0.95rem] font-semibold">
              <a href="#dashboard">
                Explore Dashboard
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="rounded-full border border-border/70 bg-background/72 px-7 py-6 text-[0.95rem] text-foreground hover:bg-foreground/6 hover:text-foreground"
            >
              <a href={resumeHref} download>
                Download Resume
                <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div ref={metricsRef} className="mt-9 grid gap-4 sm:grid-cols-3">
            {dashboardMetrics.slice(0, 3).map((metric) => (
              <div
                key={metric.label}
                className="panel-soft rounded-[1.75rem] p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]"
              >
                <p className="text-3xl font-semibold tracking-tight text-foreground">{metric.value}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={robotRef}
          className="relative min-w-0 min-h-[360px] sm:min-h-[420px] lg:min-h-[640px] xl:min-h-[720px]"
        >
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="h-full w-full scale-[1.08] lg:scale-[1.18] xl:scale-[1.24]"
          />
        </div>
      </div>

      <ContainerScroll
        titleComponent={
          <Reveal className="mb-4">
            <p className="text-sm uppercase tracking-[0.32em] text-muted-foreground">
              Data Analysis Showcase
            </p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Analytics <span className="text-accent">Workbench</span>
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              Explore how I approach data problems through a full-screen interactive analytics view while you scroll down from the hero into the project stories.
            </p>
          </Reveal>
        }
      >
        <LiveDashboard className="h-full w-full" />
      </ContainerScroll>
    </section>
  );
}
