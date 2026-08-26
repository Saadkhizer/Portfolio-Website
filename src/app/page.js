import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import MagneticButton from "@/components/motion/MagneticButton";
import ParticleField from "@/components/motion/ParticleField";
import { PROJECTS } from "@/data/projects";

const CONTACT = {
  email: "saadkhizer9@gmail.com",
  github: "https://github.com/Saadkhizer",
};

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden px-6 py-32 sm:py-40">
        <ParticleField />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-mono text-sm text-accent">Full-stack developer &middot; MERN</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              I build real-time web apps that go live and stay up.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
              React, Node, Express and MongoDB. I write the APIs, set up JWT auth and
              third-party integrations, and deploy on Vercel and Render.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#work">
              <MagneticButton className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground">
                View my work
              </MagneticButton>
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Hire me
            </a>
          </Reveal>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight">Selected work</h2>
          <p className="mt-3 max-w-xl text-muted">
            Real projects, live links and the source. Open anything and judge it yourself.
          </p>
        </Reveal>

        {/* One project should not sit in a half-empty two-column grid.
            The grid only splits once there is a second card to fill it. */}
        <Stagger
          className={
            PROJECTS.length > 1
              ? "mt-10 grid gap-6 lg:grid-cols-2"
              : "mt-10 grid max-w-2xl gap-6"
          }
        >
          {PROJECTS.map((project) => (
            <StaggerItem key={project.slug}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7">
                <p className="font-mono text-xs uppercase tracking-wider text-accent">
                  {project.tagline}
                </p>

                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                  <Link href={`/work/${project.slug}`} className="hover:text-accent">
                    {project.name}
                  </Link>
                </h3>

                <p className="mt-1 text-sm text-muted">{project.context}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{project.summary}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-7 text-sm">
                  <Link
                    href={`/work/${project.slug}`}
                    className="font-medium text-accent hover:underline"
                  >
                    Read the case study
                  </Link>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted transition-colors hover:text-foreground"
                    >
                      Live site ↗
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted transition-colors hover:text-foreground"
                    >
                      Source ↗
                    </a>
                  )}
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight">Get in touch</h2>
          <p className="mt-3 max-w-xl text-muted">
            Available for freelance work. Email is the fastest way to reach me.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${CONTACT.email}`}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
