import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import MagneticButton from "@/components/motion/MagneticButton";
import SectionHeading from "@/components/SectionHeading";
import { PROJECTS } from "@/data/projects";
import { PROFILE, SERVICES, STACK, PROCESS, ABOUT, whatsappLink } from "@/data/site";

/* The constellation field is rendered once in the root layout and fixed
   behind every section, so nothing is drawn here. */

export default function Home() {
  const whatsapp = whatsappLink();

  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative px-6 pb-28 pt-28 sm:pb-36 sm:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          {PROFILE.available && (
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-xs text-muted backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-positive opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-positive" />
                </span>
                Available for freelance work
              </p>
            </Reveal>
          )}

          <Reveal delay={0.08}>
            <h1 className="mt-7 text-4xl font-semibold tracking-tight sm:text-6xl">
              {PROFILE.headline}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {PROFILE.intro}
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#work">
              <MagneticButton className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground">
                See my work
              </MagneticButton>
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="rounded-full border border-border bg-surface/40 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:border-accent hover:text-accent"
            >
              Start a project
            </a>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ Services */}
      <section id="services" className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading index="01" label="Services" title="What I can build for you">
          Three things I do most. If what you need is close to one of these, it is
          probably a fit.
        </SectionHeading>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {SERVICES.map((service) => (
            <StaggerItem key={service.title}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/70 p-7 backdrop-blur transition-colors hover:border-accent/40">
                <h3 className="text-lg font-semibold tracking-tight">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{service.body}</p>
                <ul className="mt-6 flex flex-col gap-2.5 border-t border-border pt-6">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm text-muted">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ---------------------------------------------------------- Work */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading index="02" label="Work" title="Selected projects">
          Live links and the source code for each one. Open anything and judge it
          yourself.
        </SectionHeading>

        {/* One project should not sit in a half-empty two-column grid. The grid
            only splits once there is a second card to fill it. */}
        <Stagger
          className={
            PROJECTS.length > 1 ? "mt-14 grid gap-6 lg:grid-cols-2" : "mt-14 grid max-w-2xl gap-6"
          }
        >
          {PROJECTS.map((project) => (
            <StaggerItem key={project.slug}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-surface/70 p-7 backdrop-blur transition-colors hover:border-accent/40">
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

      {/* --------------------------------------------------------- Stack */}
      <section id="stack" className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading index="03" label="Stack" title="What I work with">
          Chosen per project, not by habit. Everything listed here is something I
          have actually shipped with.
        </SectionHeading>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STACK.map((column) => (
            <StaggerItem key={column.group}>
              <div className="h-full rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {column.group}
                </h3>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {column.items.map((item) => (
                    <li key={item} className="text-sm text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ------------------------------------------------------- Process */}
      <section id="process" className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading index="04" label="Process" title="How working together goes">
          No jargon, no disappearing for three weeks. You always know what is
          happening and what it costs.
        </SectionHeading>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {PROCESS.map((phase) => (
            <StaggerItem key={phase.step}>
              <div className="h-full rounded-2xl border border-border bg-surface/70 p-7 backdrop-blur">
                <span className="font-mono text-3xl font-semibold text-accent/30">
                  {phase.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{phase.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{phase.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* --------------------------------------------------------- About */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading index="05" label="About" title="Who you would be working with" />
        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col gap-5">
              {ABOUT.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-lg leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="h-fit rounded-2xl border border-border bg-surface/70 p-7 backdrop-blur">
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Based in</dt>
                <dd>{PROFILE.location}</dd>
              </div>
              <div className="mt-6 flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Role</dt>
                <dd>{PROFILE.role}</dd>
              </div>
              <div className="mt-6 flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  Availability
                </dt>
                <dd className="text-positive">
                  {PROFILE.available ? "Open to new projects" : "Currently booked"}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------------- Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="rounded-3xl border border-border bg-surface/70 px-8 py-16 text-center backdrop-blur sm:px-16">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Have something you want built?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Tell me what it needs to do. I will reply with what I think it takes,
              what it costs, and how long it runs — no obligation.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${PROFILE.email}`}>
                <MagneticButton className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground">
                  {PROFILE.email}
                </MagneticButton>
              </a>

              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  WhatsApp
                </a>
              )}

              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                GitHub
              </a>

              {PROFILE.linkedin && (
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  LinkedIn
                </a>
              )}
            </div>

            <p className="mt-8 font-mono text-xs text-muted">
              Based in {PROFILE.location} &middot; replies within a day
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
