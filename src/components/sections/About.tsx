"use client";

import { useEffect, useRef } from "react";
import { Quote } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { focusAreas, profile, strengths } from "@/lib/portfolio-data";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const strengthsRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scrub-based word-by-word quote reveal — words go from dim to bright as you scroll
      const quoteWords = quoteRef.current?.querySelectorAll(".quote-word");
      if (quoteWords?.length) {
        gsap.set(quoteWords, { opacity: 0.12, y: 8 });
        ScrollTrigger.create({
          trigger: quoteRef.current,
          start: "top 78%",
          end: "bottom 40%",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            quoteWords.forEach((word, i) => {
              const wordProgress = gsap.utils.clamp(
                0,
                1,
                (progress * quoteWords.length - i) * 1.5,
              );
              gsap.set(word, {
                opacity: 0.12 + wordProgress * 0.88,
                y: 8 - wordProgress * 8,
              });
            });
          },
        });
      }

      // Summary paragraph slide in
      if (summaryRef.current) {
        gsap.from(summaryRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: summaryRef.current,
            start: "top 82%",
          },
        });
      }

      // Focus area cards stagger with rotation
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 60,
          opacity: 0,
          rotateY: 15,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 82%",
          },
        });
      }

      // Strengths badges stagger with scale bounce
      const badges = strengthsRef.current?.querySelectorAll(".strength-badge");
      if (badges?.length) {
        gsap.from(badges, {
          scale: 0.6,
          opacity: 0,
          stagger: 0.04,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: strengthsRef.current,
            start: "top 85%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const quoteText =
    "I like building analysis that feels stable from the inside out: strong data hygiene, visible logic, and reporting that helps people move faster.";

  return (
    <section ref={sectionRef} id="about" className="px-2 py-[4.5rem] sm:px-3 sm:py-20">
      <div className="site-shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="About"
            title="Grounded in data, driven by clarity."
            description="Five years of turning messy datasets into clean insights, reliable reports, and decisions people can actually trust."
          />

          <div ref={quoteRef} className="panel-surface rounded-[2rem] p-7">
            <Quote className="h-7 w-7 text-accent" />
            <p className="mt-5 text-lg leading-8 text-foreground/90">
              "{quoteText.split(" ").map((word, i) => (
                <span key={i} className="quote-word inline-block mr-[0.28em]">
                  {word}
                </span>
              ))}"
            </p>
            <p className="mt-5 text-sm uppercase tracking-[0.22em] text-muted-foreground">
              {profile.name}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div ref={summaryRef} className="panel-surface rounded-[2rem] p-7">
            <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
              Professional summary
            </p>
            <p className="mt-5 text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              {profile.summary}
            </p>
          </div>

          <div ref={cardsRef} className="grid gap-4 md:grid-cols-3" style={{ perspective: "800px" }}>
            {focusAreas.map((area) => (
              <div
                key={area.title}
                className="panel-soft rounded-[1.75rem] p-5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-foreground/[0.04]">
                  <area.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{area.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{area.description}</p>
              </div>
            ))}
          </div>

          <div ref={strengthsRef} className="panel-surface rounded-[2rem] p-7">
            <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Strengths</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {strengths.map((strength) => (
                <span
                  key={strength}
                  className="strength-badge rounded-full border border-border/70 bg-background/72 px-4 py-2 text-sm text-foreground/80"
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
