"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import { cn } from "@/lib/utils";
import "./scroll-stack.css";

/* ── Types ── */

type ScrollStackItemProps = {
  children: ReactNode;
  itemClassName?: string;
};

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  scaleEndPosition?: string | number;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
};

type CardLayout = {
  /** Card's original top position measured WITHOUT any transforms */
  naturalTop: number;
};

/* ── Sub-component ── */

export const ScrollStackItem = ({ children, itemClassName = "" }: ScrollStackItemProps) => (
  <div className={cn("scroll-stack-card", itemClassName)}>{children}</div>
);

/* ── Helpers ── */

function clamp01(scrollTop: number, start: number, end: number) {
  if (end <= start) return 0;
  if (scrollTop <= start) return 0;
  if (scrollTop >= end) return 1;
  return (scrollTop - start) / (end - start);
}

function toPx(value: string | number, containerH: number) {
  if (typeof value === "string" && value.includes("%")) {
    return (Number.parseFloat(value) / 100) * containerH;
  }
  return Number.parseFloat(String(value));
}

/* ── Main component ── */

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
}: ScrollStackProps) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stackDoneRef = useRef(false);
  const rafRef = useRef<number>(0);
  const lenisRef = useRef<Lenis | null>(null);

  /* Cached DOM references & measurements (set once, updated on resize) */
  const cardsRef = useRef<HTMLElement[]>([]);
  const layoutRef = useRef<CardLayout[]>([]);
  const endTopRef = useRef(0);

  /* ───────────────────────────────────────────────
   * measureNaturalPositions
   *
   * Strips transforms → reads true layout positions →
   * restores transforms.  Called on mount + resize only.
   * ─────────────────────────────────────────────── */
  const measureNaturalPositions = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    // 1. Save current transforms
    const saved = cards.map((c) => c.style.transform);

    // 2. Strip transforms so getBoundingClientRect gives layout positions
    for (const card of cards) card.style.transform = "none";

    // 3. Force one synchronous reflow
    void cards[0]!.offsetHeight;

    // 4. Read positions
    const scrollY = useWindowScroll ? window.scrollY : (scrollerRef.current?.scrollTop ?? 0);

    layoutRef.current = cards.map((card) => {
      if (useWindowScroll) {
        return { naturalTop: card.getBoundingClientRect().top + scrollY };
      }
      return { naturalTop: card.offsetTop };
    });

    // 5. Read end-marker
    const endEl = useWindowScroll
      ? document.querySelector(".scroll-stack-end")
      : scrollerRef.current?.querySelector(".scroll-stack-end");

    if (endEl) {
      endTopRef.current = useWindowScroll
        ? endEl.getBoundingClientRect().top + scrollY
        : (endEl as HTMLElement).offsetTop;
    }

    // 6. Restore transforms
    cards.forEach((c, i) => {
      c.style.transform = saved[i] ?? "";
    });
  }, [useWindowScroll]);

  /* ───────────────────────────────────────────────
   * applyTransforms
   *
   * Pure write path — reads ONLY scrollTop (from Lenis
   * or native), then writes transforms.  No DOM reads
   * on card positions (uses cached layoutRef).
   * ─────────────────────────────────────────────── */
  const applyTransforms = useCallback(
    (scrollTop?: number) => {
      const cards = cardsRef.current;
      const layouts = layoutRef.current;
      if (!cards.length || !layouts.length) return;

      // Use provided scrollTop (from Lenis callback) or read directly
      const st =
        scrollTop ??
        (useWindowScroll ? window.scrollY : (scrollerRef.current?.scrollTop ?? 0));

      const containerH = useWindowScroll
        ? window.innerHeight
        : (scrollerRef.current?.clientHeight ?? 0);

      const stackPosPx = toPx(stackPosition, containerH);
      const scaleEndPx = toPx(scaleEndPosition, containerH);
      const pinEnd = endTopRef.current - containerH / 2;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i]!;
        const cardTop = layouts[i]!.naturalTop;

        const triggerStart = cardTop - stackPosPx - itemStackDistance * i;
        const triggerEnd = cardTop - scaleEndPx;
        const pinStart = triggerStart;

        // Scale
        const sp = clamp01(st, triggerStart, triggerEnd);
        const tgtScale = baseScale + i * itemScale;
        const scale = 1 - sp * (1 - tgtScale);

        // Rotation
        const rotation = rotationAmount ? i * rotationAmount * sp : 0;

        // Blur (depth-based)
        let blur = 0;
        if (blurAmount) {
          let topIdx = -1;
          for (let j = 0; j < layouts.length; j++) {
            const jStart = layouts[j]!.naturalTop - stackPosPx - itemStackDistance * j;
            if (st >= jStart) topIdx = j;
          }
          if (i < topIdx) blur = Math.max(0, (topIdx - i) * blurAmount);
        }

        // Translate Y (pinning)
        let ty = 0;
        if (st >= pinStart && st <= pinEnd) {
          ty = st - cardTop + stackPosPx + itemStackDistance * i;
        } else if (st > pinEnd) {
          ty = pinEnd - cardTop + stackPosPx + itemStackDistance * i;
        }

        // Write (no diffing needed — GPU composited, very cheap)
        card.style.transform = `translate3d(0,${ty}px,0) scale(${scale}) rotate(${rotation}deg)`;
        if (blurAmount) {
          card.style.filter = blur > 0.05 ? `blur(${blur}px)` : "none";
        }

        // Callback
        if (i === cards.length - 1) {
          const pinned = st >= pinStart && st <= pinEnd;
          if (pinned && !stackDoneRef.current) {
            stackDoneRef.current = true;
            onStackComplete?.();
          } else if (!pinned && stackDoneRef.current) {
            stackDoneRef.current = false;
          }
        }
      }
    },
    [
      baseScale,
      blurAmount,
      itemScale,
      itemStackDistance,
      onStackComplete,
      rotationAmount,
      scaleEndPosition,
      stackPosition,
      useWindowScroll,
    ],
  );

  /* ───────────────────────────────────────────────
   * Lifecycle
   * ─────────────────────────────────────────────── */
  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // ── Gather cards ──
    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll(".scroll-stack-card")
        : scroller.querySelectorAll(".scroll-stack-card"),
    ) as HTMLElement[];

    cardsRef.current = cards;

    // ── One-time card styling ──
    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translateZ(0)";
    });

    // ── Measure positions (transforms stripped internally) ──
    measureNaturalPositions();

    // ── Lenis smooth scroll ──
    let lenis: Lenis;

    if (useWindowScroll) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
      });
    } else {
      lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector(".scroll-stack-inner") as HTMLElement,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
      });
    }

    // Lenis fires on every interpolated frame — use its scroll value
    lenis.on("scroll", (e: { scroll: number }) => {
      applyTransforms(e.scroll);
    });

    // Lenis RAF loop
    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;

    // ── Apply initial transforms ──
    applyTransforms();

    // ── Resize: re-measure then re-apply ──
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        measureNaturalPositions();
        applyTransforms();
      }, 120);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      stackDoneRef.current = false;
      cardsRef.current = [];
      layoutRef.current = [];
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    measureNaturalPositions,
    applyTransforms,
  ]);

  return (
    <div className={cn("scroll-stack-scroller", className)} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
