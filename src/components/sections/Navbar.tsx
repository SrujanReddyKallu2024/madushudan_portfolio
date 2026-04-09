"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { profile, resumeHref } from "@/lib/portfolio-data";
import { gsap } from "@/lib/gsap-setup";

const navLinks = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 24);

      // Hide on scroll down, show on scroll up
      if (headerRef.current && currentY > 100) {
        if (currentY > lastScrollY.current + 10) {
          gsap.to(headerRef.current, {
            y: -120,
            duration: 0.3,
            ease: "power2.inOut",
            overwrite: true,
          });
        } else if (currentY < lastScrollY.current - 5) {
          gsap.to(headerRef.current, {
            y: 0,
            duration: 0.28,
            ease: "power2.out",
            overwrite: true,
          });
        }
      } else if (headerRef.current) {
        gsap.to(headerRef.current, {
          y: 0,
          duration: 0.24,
          ease: "power2.out",
          overwrite: true,
        });
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "site-shell rounded-full border transition-all duration-500",
          isScrolled
            ? "border-border/70 bg-background/84 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:shadow-[0_20px_80px_rgba(0,0,0,0.28)]"
            : "border-border/60 bg-background/68 backdrop-blur-lg",
        )}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5 xl:px-6">
          <a href="#hero" className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-foreground/[0.04] text-sm font-semibold text-foreground">
                MP
              </div>
              <div className="hidden min-w-0 md:block">
                <p className="truncate text-sm font-semibold text-foreground">{profile.name}</p>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{profile.title}</p>
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-0.5 xl:flex 2xl:gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm text-muted-foreground transition duration-300 hover:bg-foreground/6 hover:text-foreground 2xl:px-4"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 xl:flex 2xl:gap-3">
            <ThemeToggle className="shrink-0" />
            <Button
              asChild
              variant="ghost"
              className="shrink-0 rounded-full border border-border/70 bg-background/72 px-4 text-foreground hover:bg-foreground/6 hover:text-foreground 2xl:px-5"
            >
              <a href={resumeHref} download>
                Resume
                <Download className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/72 text-foreground xl:hidden"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div
          className={cn(
            "overflow-hidden px-4 transition-all duration-300 xl:hidden",
            mobileOpen ? "max-h-80 pb-4 opacity-100" : "max-h-0 pb-0 opacity-0",
          )}
        >
          <div className="space-y-2 rounded-[1.5rem] border border-border/70 bg-background/88 p-3 backdrop-blur-xl">
            <ThemeToggle className="w-full justify-center" />
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm text-muted-foreground transition hover:bg-foreground/6 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href={resumeHref}
              download
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl border border-border/70 bg-foreground/[0.05] px-4 py-3 text-sm font-medium text-foreground"
            >
              Download Resume
              <Download className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
