/**
 * Soft wash that sits behind every page: two low-opacity radial gradients
 * plus fine grain, driven by --ambient-one / --ambient-two / --ambient-strength
 * / --grain-opacity so it follows whatever palette the project defines.
 *
 * Should read as depth, not decoration — if you can consciously see the
 * gradient, turn --ambient-strength down.
 *
 * Server component: zero JS ships for this. Fixed + pointer-events-none, so
 * it never scrolls and never intercepts clicks.
 */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")";

export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -left-[10%] -top-[18%] h-[70vh] w-[70vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgb(var(--ambient-one) / var(--ambient-strength)) 0%, transparent 68%)",
        }}
      />
      <div
        className="absolute -bottom-[22%] -right-[12%] h-[65vh] w-[65vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgb(var(--ambient-two) / var(--ambient-strength)) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[45vh]"
        style={{
          background:
            "linear-gradient(to bottom, rgb(var(--ambient-one) / calc(var(--ambient-strength) * 0.5)) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-multiply dark:mix-blend-screen"
        style={{ backgroundImage: GRAIN, backgroundRepeat: "repeat", opacity: "var(--grain-opacity)" }}
      />
    </div>
  );
}
