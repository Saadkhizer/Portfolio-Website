import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import { PROJECTS, getProject } from "@/data/projects";

/* Pre-render every case study at build time. */
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

/* Next.js 15+ hands params in as a promise — await it before use. */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <Reveal>
        <Link href="/#work" className="font-mono text-sm text-muted hover:text-accent">
          ← Back to work
        </Link>
      </Reveal>

      <Reveal delay={0.06}>
        <p className="mt-10 font-mono text-xs uppercase tracking-wider text-accent">
          {project.tagline}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
          {project.name}
        </h1>
        <p className="mt-3 text-muted">
          {project.context} · {project.year}
        </p>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mt-8 text-lg leading-relaxed text-muted">{project.summary}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Visit the live site ↗
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              View the source ↗
            </a>
          )}
        </div>
      </Reveal>

      {project.image && (
        <Reveal delay={0.14}>
          <Image
            src={project.image}
            alt={project.imageAlt || ""}
            width={1200}
            height={657}
            className="mt-14 h-auto w-full rounded-2xl border border-border"
            priority
          />
        </Reveal>
      )}

      <Reveal delay={0.16}>
        <section className="mt-16">
          <h2 className="font-mono text-sm uppercase tracking-wider text-muted">Built with</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal delay={0.2}>
        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight">What it does</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-muted">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal delay={0.24}>
        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight">The hard parts</h2>
          <div className="mt-6 flex flex-col gap-6">
            {project.challenges.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-medium">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.28}>
        <section className="mt-16 border-t border-border pt-10">
          <p className="text-muted">
            Want something like this built?{" "}
            <a href="mailto:saadkhizer9@gmail.com" className="text-accent hover:underline">
              Get in touch
            </a>
            .
          </p>
        </section>
      </Reveal>
    </article>
  );
}
