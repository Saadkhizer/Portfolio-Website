"use client";

import { useEffect, useState } from "react";

export const THEME_KEY = "theme";

/**
 * Three-state theme control: system → light → dark → system.
 *
 * The stored value is only ever "light", "dark", or absent. Absent means
 * "follow the OS", which is the default and the state most people want —
 * a toggle that forces a choice on first visit is worse than one that
 * starts by matching their machine.
 *
 * The <html data-theme> attribute is set by an inline script in the root
 * layout BEFORE paint, so there is no flash of the wrong theme. This
 * component only handles clicks after hydration.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(null); // null = follow system
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === "light" || stored === "dark") setTheme(stored);
    } catch {
      /* Private mode and locked-down browsers throw on access. Not a
         reason to break the page — fall through to system default. */
    }
  }, []);

  function apply(next) {
    setTheme(next);
    const root = document.documentElement;

    if (next) root.setAttribute("data-theme", next);
    else root.removeAttribute("data-theme");

    try {
      if (next) localStorage.setItem(THEME_KEY, next);
      else localStorage.removeItem(THEME_KEY);
    } catch {
      /* Preference just won't persist. The page still works. */
    }
  }

  function cycle() {
    apply(theme === null ? "light" : theme === "light" ? "dark" : null);
  }

  const label =
    theme === null ? "Theme: system" : theme === "light" ? "Theme: light" : "Theme: dark";

  return (
    <button
      type="button"
      onClick={cycle}
      title={label}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground"
    >
      {/* Rendered only after mount: on the server we do not know which
          theme the visitor resolved to, and guessing produces a hydration
          mismatch. The button keeps its size either way so the header
          does not shift. */}
      {mounted && (
        <span aria-hidden="true">
          {theme === null ? <IconSystem /> : theme === "light" ? <IconSun /> : <IconMoon />}
        </span>
      )}
    </button>
  );
}

const strokeProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function IconSun() {
  return (
    <svg {...strokeProps}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg {...strokeProps}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

function IconSystem() {
  return (
    <svg {...strokeProps}>
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}
