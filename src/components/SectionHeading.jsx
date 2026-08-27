import Reveal from "@/components/motion/Reveal";

/**
 * Shared section header so every band on the page has the same rhythm:
 * a numbered mono label, a heading, and an optional line of context.
 * Consistency here is most of what separates a designed page from a
 * stack of sections that each look slightly different.
 */
export default function SectionHeading({ index, label, title, children }) {
  return (
    <Reveal>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-accent">{index}</span>
        <span className="h-px w-8 bg-border" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{label}</span>
      </div>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{children}</p>}
    </Reveal>
  );
}
