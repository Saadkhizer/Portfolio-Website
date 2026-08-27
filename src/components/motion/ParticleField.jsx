"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas constellation field. Hand-rolled rather than a 3D library so the
 * bundle stays small and it degrades cleanly.
 *
 * Positioning comes from `className` so the same component works either
 * scoped to one section (`absolute inset-0`, the default) or fixed behind
 * the entire page (`fixed inset-0 -z-10`, as in the root layout). Do not
 * hardcode a position here — two positioning classes in one attribute
 * resolve by stylesheet order, not attribute order, and the loser is
 * whichever Tailwind emitted second.
 *
 * Reads colour from --particle / --particle-two / --particle-opacity /
 * --particle-link-opacity. Two hues, blended across the field, so it reads
 * as a duotone rather than one flat tint. Kept separate from --accent so the
 * motion can be retuned without moving buttons and links with it.
 *
 * Pauses off-screen, renders one static frame under prefers-reduced-motion,
 * and scales particle count with viewport area (capped for low-end devices).
 */
export default function ParticleField({
  className = "absolute inset-0",
  density = 0.00008,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let particles = [];
    let frame;
    let tick = 0;
    let visible = true;
    let pointer = { x: -9999, y: -9999 };

    function hexToRgb(raw, fallback) {
      return raw.startsWith("#") && raw.length === 7
        ? [
            parseInt(raw.slice(1, 3), 16),
            parseInt(raw.slice(3, 5), 16),
            parseInt(raw.slice(5, 7), 16),
          ]
        : fallback;
    }

    function readTheme() {
      const styles = getComputedStyle(document.documentElement);
      const one = hexToRgb(styles.getPropertyValue("--particle").trim() || "", [102, 102, 102]);
      // --particle-two is optional: without it the field is single-colour,
      // which is exactly the old behaviour rather than a broken one.
      const twoRaw = styles.getPropertyValue("--particle-two").trim();
      const two = twoRaw ? hexToRgb(twoRaw, one) : one;
      const threeRaw = styles.getPropertyValue("--particle-three").trim();
      const three = threeRaw ? hexToRgb(threeRaw, two) : two;
      const dot = parseFloat(styles.getPropertyValue("--particle-opacity")) || 0.34;
      const link = parseFloat(styles.getPropertyValue("--particle-link-opacity")) || 0.11;
      return { one, two, three, dot, link };
    }

    /* Each particle carries a fixed blend position, so the field reads as a
       gradient across the viewport instead of one flat colour. Mixing is
       done per frame rather than cached because the palette changes when
       the theme is toggled. */
    function lerp(a, c, t) {
      return [
        Math.round(a[0] + (c[0] - a[0]) * t),
        Math.round(a[1] + (c[1] - a[1]) * t),
        Math.round(a[2] + (c[2] - a[2]) * t),
      ];
    }

    function mix(theme, t) {
      return t < 0.5
        ? lerp(theme.one, theme.two, t * 2)
        : lerp(theme.two, theme.three, (t - 0.5) * 2);
    }

    let theme = readTheme();

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.round(Math.min(Math.max(width * height * density, 24), 110));
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.7 + 0.7,
        t: Math.random(),
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        const [r, g, b] = mix(theme, p.t);
        // Slow per-particle brightness cycle. Each has its own phase, so the
        // field shimmers instead of pulsing in unison — which would read as
        // a flashing page rather than depth. Amplitude stays small on
        // purpose: motion should draw the eye, not fight the headline.
        const twinkle = 0.78 + 0.22 * Math.sin(tick * 0.012 + p.phase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${theme.dot * twinkle})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const c = particles[j];
          const dist = Math.hypot(a.x - c.x, a.y - c.y);
          if (dist < 128) {
            // Average the two endpoints' blend positions. A real canvas
            // gradient per line would be truer but allocates an object per
            // link per frame, which is hundreds of allocations at 60fps.
            const [r, g, b] = mix(theme, (a.t + c.t) / 2);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(c.x, c.y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${theme.link * (1 - dist / 128)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }

    function step() {
      tick += 1;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110 && dist > 0) {
          p.x += (dx / dist) * 0.6;
          p.y += (dy / dist) * 0.6;
        }
      }
      draw();
      frame = requestAnimationFrame(step);
    }

    function onPointer(e) {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onLeave() {
      pointer = { x: -9999, y: -9999 };
    }

    resize();

    if (reduce) {
      draw();
      const onResizeStatic = () => {
        theme = readTheme();
        resize();
        draw();
      };
      window.addEventListener("resize", onResizeStatic);
      return () => window.removeEventListener("resize", onResizeStatic);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting;
        if (nowVisible && !visible) {
          visible = true;
          frame = requestAnimationFrame(step);
        } else if (!nowVisible && visible) {
          visible = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);
    frame = requestAnimationFrame(step);

    window.addEventListener("pointermove", onPointer);
    window.addEventListener("pointerleave", onLeave);

    const onResize = () => {
      theme = readTheme();
      resize();
    };
    window.addEventListener("resize", onResize);

    /* Particle colour comes from CSS variables read once into a JS object,
       so a theme change is invisible to the canvas unless we re-read it.
       Watch both triggers: the toggle (data-theme on <html>) and the OS
       switching while the page is open. */
    const rereadTheme = () => {
      theme = readTheme();
    };
    const themeObserver = new MutationObserver(rereadTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", rereadTheme);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      themeObserver.disconnect();
      scheme.removeEventListener("change", rereadTheme);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}
