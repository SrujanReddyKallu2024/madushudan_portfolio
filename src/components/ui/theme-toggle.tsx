"use client";

import { LaptopMinimal, MoonStar, SunMedium } from "lucide-react";

import { useTheme, type Theme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const themeOptions: Array<{
  label: string;
  value: Theme;
  icon: typeof SunMedium;
}> = [
  { label: "Auto", value: "system", icon: LaptopMinimal },
  { label: "Dark", value: "dark", icon: MoonStar },
  { label: "Light", value: "light", icon: SunMedium },
];

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme, theme } = useTheme();

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border border-border/70 bg-background/80 p-1 backdrop-blur-xl",
        className,
      )}
      aria-label="Theme switcher"
      role="group"
    >
      {themeOptions.map((option) => {
        const isActive = theme === option.value;
        const Icon = option.icon;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-2.5 py-2 text-[11px] font-medium tracking-[0.16em] transition duration-300 sm:px-3 sm:text-xs sm:tracking-[0.18em]",
              isActive
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:bg-foreground/6 hover:text-foreground",
            )}
            aria-pressed={isActive}
            title={`${option.label} theme${option.value === "system" ? ` (${resolvedTheme})` : ""}`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden 2xl:inline">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
