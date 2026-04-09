import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";

type GsapRevealOptions = {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  scrub?: boolean | number;
  once?: boolean;
  children?: boolean;
};

export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  options: GsapRevealOptions = {},
) {
  const ref = useRef<T>(null);

  const {
    y = 60,
    x = 0,
    opacity = 0,
    duration = 0.9,
    delay = 0,
    stagger = 0.08,
    ease = "power3.out",
    start = "top 85%",
    scrub = false,
    once = true,
    children = false,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const targets = children ? ref.current!.children : ref.current;

      gsap.from(targets, {
        y,
        x,
        opacity,
        duration: scrub ? undefined : duration,
        delay: scrub ? undefined : delay,
        stagger: children ? stagger : undefined,
        ease: scrub ? "none" : ease,
        scrollTrigger: {
          trigger: ref.current,
          start,
          scrub: scrub || undefined,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [y, x, opacity, duration, delay, stagger, ease, start, scrub, once, children]);

  return ref;
}

export function useGsapParallax<T extends HTMLElement = HTMLDivElement>(
  yAmount = -80,
  scrubValue: number = 1.5,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: yAmount,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: scrubValue,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [yAmount, scrubValue]);

  return ref;
}
