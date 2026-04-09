"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, GraduationCap, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { Reveal } from "@/components/ui/reveal";
import { InteractiveGlobe } from "@/components/ui/interactive-globe";
import { certifications, education, profile, resumeHref } from "@/lib/portfolio-data";
import { gsap } from "@/lib/gsap-setup";

const contactLinks = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`,
    icon: Phone,
  },
  {
    label: "LinkedIn",
    value: "madhusudhanprakash",
    href: profile.linkedin,
    icon: Linkedin,
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Contact links stagger
      const links = linksRef.current?.querySelectorAll(".contact-link");
      if (links?.length) {
        gsap.from(links, {
          x: -24,
          opacity: 0,
          stagger: 0.08,
          duration: 0.52,
          ease: "power2.out",
          scrollTrigger: {
            trigger: linksRef.current,
            start: "top 82%",
          },
        });
      }

      // Education cards stagger
      if (eduRef.current) {
        gsap.from(eduRef.current.children, {
          y: 24,
          opacity: 0,
          stagger: 0.1,
          duration: 0.58,
          ease: "power2.out",
          scrollTrigger: {
            trigger: eduRef.current,
            start: "top 85%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="px-2 pb-14 pt-[4.5rem] sm:px-3 sm:pb-16 sm:pt-20">
      <div className="site-shell">
        <SectionHeading
          eyebrow="Contact"
          title="Ready for analytics work that feels trustworthy and polished."
          description="Currently pursuing an MS in Data Science at UAlbany and open to roles where clean reporting, data quality, and clear communication all matter."
        />

        <div className="mt-14 grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="space-y-6">
            <Reveal className="panel-surface rounded-[2rem] p-7">
              <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Let's connect</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
                Open to data analyst, reporting, and analytics-focused opportunities.
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                I am especially interested in work where clean reporting, data quality, and strong
                communication all matter at the same time.
              </p>

              <div ref={linksRef} className="mt-8 grid gap-3">
                {contactLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === "LinkedIn" ? "_blank" : undefined}
                    rel={item.label === "LinkedIn" ? "noreferrer" : undefined}
                    className="contact-link panel-soft flex items-center gap-4 rounded-[1.5rem] px-5 py-4 transition duration-300 hover:-translate-y-1 hover:border-border"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-foreground/[0.04]">
                      <item.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{item.label}</p>
                      <p className="truncate text-sm text-foreground/80">{item.value}</p>
                    </div>
                    <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
              </div>

              <a
                href={resumeHref}
                download
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90"
              >
                Download resume
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>

            <div ref={eduRef} className="grid gap-5 lg:grid-cols-2">
              <div className="panel-surface rounded-[2rem] p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Education</p>
                <div className="mt-5 space-y-5">
                  {education.map((item) => (
                    <div key={item.school} className="panel-soft rounded-[1.5rem] p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-foreground/[0.04]">
                          <GraduationCap className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-foreground">{item.school}</p>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.degree}</p>
                          <p className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            {item.location} / {item.period}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel-surface rounded-[2rem] p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Certifications</p>
                <div className="mt-5 space-y-3">
                  {certifications.map((certification) => (
                    <div
                      key={certification}
                      className="panel-soft rounded-[1.5rem] px-4 py-4 text-sm leading-7 text-muted-foreground"
                    >
                      {certification}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Reveal className="panel-surface rounded-[2rem] p-4 xl:sticky xl:top-28 xl:self-start">
            <div className="rounded-[1.75rem] border border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--accent)/0.06),transparent_42%),linear-gradient(180deg,hsl(var(--foreground)/0.03),transparent)] p-4">
              <div className="mb-4 flex items-center justify-between px-3 pt-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Global perspective</p>
                  <p className="mt-2 text-lg font-semibold text-foreground">Data work — anywhere in the world</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Interactive</span>
                </div>
              </div>

              <div className="mx-auto flex min-h-[360px] w-full max-w-[510px] items-center justify-center">
                <InteractiveGlobe size={420} className="aspect-square max-h-[420px] max-w-[420px]" />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Regions", value: "4+" },
                  { label: "Project domains", value: "8+" },
                  { label: "Collaboration modes", value: "Remote/Hybrid" },
                ].map((item) => (
                  <div key={item.label} className="panel-soft rounded-[1rem] px-3 py-3 text-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{item.label}</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10 border-t border-border/60 pt-6">
          <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              Copyright {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
            <p>Built with React, TypeScript, Tailwind CSS, Framer Motion, and D3.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
