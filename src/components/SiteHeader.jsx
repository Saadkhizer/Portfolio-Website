"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PROFILE } from "@/data/site";
import ThemeToggle from "@/components/ThemeToggle";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#stack", label: "Stack" },
  { href: "/#about", label: "About" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  /* Close on Escape, and lock body scroll while the panel is open so the
     page behind it doesn't slide around under the menu. */
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-mono text-sm font-semibold tracking-tight"
        >
          saad khizer
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />

          <Link
            href="/#contact"
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 sm:block"
          >
            Let&apos;s talk
          </Link>

          {/* Mobile trigger. Below `sm` the nav links were previously hidden
              with no replacement, leaving phone visitors no way to reach any
              section but the top of the page. */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-lg text-foreground sm:hidden"
          >
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-200 ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-200 ${
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-border/60 bg-background/95 backdrop-blur-md sm:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/40 py-4 text-base text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 pb-6 pt-2">
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="rounded-full bg-accent px-4 py-3 text-center text-sm font-medium text-accent-foreground"
            >
              Let&apos;s talk
            </Link>
            <a
              href={`mailto:${PROFILE.email}`}
              onClick={() => setOpen(false)}
              className="rounded-full border border-border px-4 py-3 text-center text-sm font-medium"
            >
              Email me
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
