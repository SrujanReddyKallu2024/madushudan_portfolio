"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BarChart3, FlaskConical, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type DashboardMode = "workforce" | "healthcare" | "security";

type ModeConfig = {
  label: string;
  description: string;
  trend: number[];
  bars: Array<{ label: string; value: number }>;
  matrix: number[][];
  score: number;
  scoreLabel: string;
  stats: Array<{ label: string; baseValue: number; unit: string }>;
};

const MODE_CONFIG: Record<DashboardMode, ModeConfig> = {
  workforce: {
    label: "Workforce",
    description: "Employee attrition drivers explored through EDA and classification modeling.",
    trend: [54, 60, 57, 63, 66, 64, 71, 74, 70, 79, 82, 86],
    bars: [
      { label: "Satisfaction", value: 91 },
      { label: "Overtime", value: 87 },
      { label: "Income", value: 84 },
      { label: "Distance", value: 72 },
      { label: "Age", value: 69 },
      { label: "Tenure", value: 76 },
    ],
    matrix: [
      [85, 72, 34, 56, 40, 23],
      [72, 90, 48, 63, 55, 37],
      [34, 48, 88, 71, 62, 45],
      [56, 63, 71, 92, 78, 58],
    ],
    score: 89,
    scoreLabel: "ROC-AUC",
    stats: [
      { label: "Rows analyzed", baseValue: 1470, unit: "" },
      { label: "Features used", baseValue: 14, unit: "" },
      { label: "Accuracy", baseValue: 87, unit: "%" },
    ],
  },
  healthcare: {
    label: "Healthcare",
    description: "Stroke risk indicators identified through statistical modeling in R.",
    trend: [46, 52, 55, 60, 58, 63, 68, 66, 73, 77, 82, 88],
    bars: [
      { label: "Hypertension", value: 95 },
      { label: "Glucose", value: 89 },
      { label: "BMI", value: 86 },
      { label: "Age", value: 83 },
      { label: "Smoking", value: 78 },
      { label: "Heart Dz", value: 74 },
    ],
    matrix: [
      [90, 65, 42, 58, 35, 28],
      [65, 88, 55, 70, 48, 40],
      [42, 55, 85, 62, 52, 44],
      [58, 70, 62, 91, 68, 55],
    ],
    score: 93,
    scoreLabel: "Sensitivity",
    stats: [
      { label: "Patient records", baseValue: 5110, unit: "" },
      { label: "Risk factors", baseValue: 11, unit: "" },
      { label: "Specificity", baseValue: 91, unit: "%" },
    ],
  },
  security: {
    label: "Security",
    description: "Phishing detection via feature engineering and ML classification pipelines.",
    trend: [38, 44, 48, 52, 57, 61, 66, 64, 71, 76, 79, 85],
    bars: [
      { label: "URL Len", value: 88 },
      { label: "HTTPS", value: 84 },
      { label: "Domain", value: 81 },
      { label: "Redirects", value: 79 },
      { label: "Anchors", value: 74 },
      { label: "Iframes", value: 77 },
    ],
    matrix: [
      [92, 68, 45, 55, 38, 30],
      [68, 89, 58, 64, 50, 42],
      [45, 58, 86, 70, 55, 48],
      [55, 64, 70, 93, 72, 60],
    ],
    score: 91,
    scoreLabel: "F1-Score",
    stats: [
      { label: "URLs classified", baseValue: 11055, unit: "" },
      { label: "Features engineered", baseValue: 30, unit: "" },
      { label: "Precision", baseValue: 94, unit: "%" },
    ],
  },
};

const MODE_ORDER: DashboardMode[] = ["workforce", "healthcare", "security"];
const ITERATION_TICKS = ["Iter 1", "Iter 2", "Iter 3", "Iter 4", "Iter 5", "Iter 6", "Iter 7", "Iter 8", "Iter 9", "Iter 10", "Iter 11", "Iter 12"];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function buildTrendPath(values: number[], width: number, height: number, padX: number, padY: number) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(1, max - min);

  return values
    .map((value, index) => {
      const x = padX + (index / (values.length - 1)) * (width - padX * 2);
      const y = padY + (1 - (value - min) / range) * (height - padY * 2);
      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

function buildAreaPath(linePath: string, width: number, height: number, padX: number, padY: number) {
  return `${linePath} L${width - padX},${height - padY} L${padX},${height - padY} Z`;
}

function CircularGauge({ score, label }: { score: number; label: string }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="6" opacity="0.35" />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-2xl font-semibold tracking-tight text-foreground">{score}%</p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export function LiveDashboard({ className }: { className?: string }) {
  const [mode, setMode] = useState<DashboardMode>("workforce");
  const [tick, setTick] = useState(0);
  const [hoveredTrendIndex, setHoveredTrendIndex] = useState<number | null>(null);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const gradientId = useId().replace(/:/g, "");
  const activeMode = MODE_CONFIG[mode];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1800);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    setHoveredTrendIndex(null);
    setHoveredBarIndex(null);
  }, [mode]);

  const trendValues = useMemo(
    () =>
      activeMode.trend.map((value, index) => {
        const pulse = Math.sin((tick + index * 0.8) * 0.45) * 2.4;
        return clamp(Math.round(value + pulse), 10, 99);
      }),
    [activeMode.trend, tick],
  );

  const barValues = useMemo(
    () =>
      activeMode.bars.map((bar, index) => {
        const pulse = Math.sin((tick + index * 1.1) * 0.42) * 1.8;
        return { ...bar, value: clamp(Math.round(bar.value + pulse), 35, 99) };
      }),
    [activeMode.bars, tick],
  );

  const matrixValues = useMemo(
    () =>
      activeMode.matrix.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          clamp(Math.round(cell + Math.sin((tick + rowIndex + colIndex) * 0.38) * 3), 15, 99),
        ),
      ),
    [activeMode.matrix, tick],
  );

  const liveScore = useMemo(
    () => clamp(Math.round(activeMode.score + Math.sin(tick * 0.6) * 1.6), 75, 99),
    [activeMode.score, tick],
  );

  const width = 350;
  const height = 150;
  const padX = 12;
  const padY = 12;
  const linePath = buildTrendPath(trendValues, width, height, padX, padY);
  const areaPath = buildAreaPath(linePath, width, height, padX, padY);
  const activePointIndex = hoveredTrendIndex ?? trendValues.length - 1;

  const pointPosition = useMemo(() => {
    const max = Math.max(...trendValues);
    const min = Math.min(...trendValues);
    const range = Math.max(1, max - min);
    const x = padX + (activePointIndex / (trendValues.length - 1)) * (width - padX * 2);
    const y = padY + (1 - (trendValues[activePointIndex]! - min) / range) * (height - padY * 2);
    return { x, y };
  }, [activePointIndex, trendValues]);

  return (
    <div className={cn("panel-surface overflow-hidden rounded-[2.35rem] p-5 md:p-6", className)}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Data Analysis Showcase</p>
          <p className="mt-1 text-base font-semibold text-foreground">Analytics Workbench</p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/80 p-1 backdrop-blur">
          {MODE_ORDER.map((modeOption) => (
            <button
              key={modeOption}
              type="button"
              onClick={() => setMode(modeOption)}
              className={cn(
                "rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] transition duration-300",
                mode === modeOption
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-foreground/8 hover:text-foreground",
              )}
            >
              {MODE_CONFIG[modeOption].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="panel-soft rounded-[1.9rem] p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Model Performance Trend</p>
            <p className="text-xs text-muted-foreground">{activeMode.description}</p>
          </div>

          <div className="relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full" fill="none">
              <defs>
                <linearGradient id={`${gradientId}-fill`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                </linearGradient>
              </defs>

              {[0.25, 0.5, 0.75].map((fraction) => (
                <line
                  key={fraction}
                  x1={padX}
                  x2={width - padX}
                  y1={padY + fraction * (height - padY * 2)}
                  y2={padY + fraction * (height - padY * 2)}
                  stroke="hsl(var(--border))"
                  strokeWidth="0.8"
                  opacity="0.45"
                />
              ))}

              <motion.path
                d={areaPath}
                fill={`url(#${gradientId}-fill)`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />

              <motion.path
                d={linePath}
                stroke="hsl(var(--accent))"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduceMotion ? undefined : { pathLength: 0 }}
                animate={reduceMotion ? undefined : { pathLength: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />

              {trendValues.map((value, index) => {
                const max = Math.max(...trendValues);
                const min = Math.min(...trendValues);
                const range = Math.max(1, max - min);
                const x = padX + (index / (trendValues.length - 1)) * (width - padX * 2);
                const y = padY + (1 - (value - min) / range) * (height - padY * 2);
                const isActive = index === activePointIndex;

                return (
                  <g key={`${mode}-${index}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r={isActive ? 4.4 : 3}
                      fill={isActive ? "hsl(var(--accent))" : "hsl(var(--background))"}
                      stroke="hsl(var(--accent))"
                      strokeWidth="1.6"
                    />
                    <rect
                      x={x - 12}
                      y={y - 16}
                      width={24}
                      height={32}
                      fill="transparent"
                      onMouseEnter={() => setHoveredTrendIndex(index)}
                      onMouseLeave={() => setHoveredTrendIndex(null)}
                    />
                  </g>
                );
              })}
            </svg>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${mode}-${activePointIndex}-${trendValues[activePointIndex]}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="pointer-events-none absolute rounded-lg border border-border/70 bg-background/90 px-3 py-2 text-xs backdrop-blur"
                style={{ left: pointPosition.x - 18, top: pointPosition.y - 44 }}
              >
                <p className="font-semibold text-foreground">{trendValues[activePointIndex]}%</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {ITERATION_TICKS[activePointIndex]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>Baseline</span>
            <span>Tuned model</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <div className="panel-soft flex items-center justify-between rounded-[1.8rem] p-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Model Performance</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{liveScore}%</p>
              <p className="mt-1 text-xs text-muted-foreground">{activeMode.scoreLabel} score</p>
            </div>
            <CircularGauge score={liveScore} label={activeMode.scoreLabel} />
          </div>

          <div className="panel-soft rounded-[1.8rem] p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Analysis Summary</p>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1">
                <FlaskConical className="h-3 w-3 text-accent" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Explored</span>
              </div>
            </div>

            <div className="grid gap-2">
              {activeMode.stats.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-xl border border-border/60 bg-background/70 px-3 py-2">
                  <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <TrendingUp className="h-3.5 w-3.5 text-accent" />
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {item.baseValue.toLocaleString()}{item.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_0.95fr]">
        <div className="panel-soft rounded-[1.8rem] p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Feature Importance</p>
            <BarChart3 className="h-4 w-4 text-accent" />
          </div>

          <div className="flex h-36 items-end gap-2">
            {barValues.map((bar, index) => (
              <div key={bar.label} className="group flex flex-1 flex-col items-center gap-2">
                <div className="relative flex h-28 w-full items-end">
                  <motion.div
                    className="w-full rounded-t-xl bg-gradient-to-t from-foreground/85 via-accent/85 to-accent/50"
                    initial={{ height: 0 }}
                    animate={{ height: `${bar.value}%` }}
                    transition={{
                      duration: reduceMotion ? 0.25 : 0.55,
                      delay: reduceMotion ? 0 : index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: hoveredBarIndex === index ? 1 : 0, y: hoveredBarIndex === index ? 0 : 6 }}
                    className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-[10px] font-semibold text-background"
                  >
                    {bar.value}%
                  </motion.span>
                  <button
                    type="button"
                    className="absolute inset-0"
                    onMouseEnter={() => setHoveredBarIndex(index)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                    aria-label={`${bar.label} value`}
                  />
                </div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-soft rounded-[1.8rem] p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Feature Correlation</p>
            <Sparkles className="h-4 w-4 text-accent" />
          </div>

          <div className="grid grid-cols-6 gap-2">
            {matrixValues.flatMap((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <motion.div
                  key={`${mode}-${rowIndex}-${colIndex}`}
                  className="relative overflow-hidden rounded-lg border border-border/60 bg-background/70 p-2 text-center"
                  whileHover={{ y: -2, scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-accent/25 to-foreground/5"
                    style={{ opacity: clamp((cell - 15) / 85, 0.08, 0.92) }}
                  />
                  <span className="relative text-[10px] font-semibold text-foreground">.{cell}</span>
                </motion.div>
              )),
            )}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-border/60 bg-background/70 px-3 py-2">
            <span className="text-xs text-muted-foreground">Hover over features and correlations to explore values.</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent">Interactive</span>
          </div>
        </div>
      </div>
    </div>
  );
}
