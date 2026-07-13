import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import { projects, getProject } from "@/lib/content/projects";
import { profile } from "@/lib/content/profile";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.short,
    openGraph: { title: `${project.title} — ${profile.name}`, description: project.short },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div>
      <Nav />
      <main className="mx-auto w-full max-w-5xl px-5 pb-24 pt-28 sm:px-8">
        {/* breadcrumb */}
        <Link href="/#projects" className="font-mono text-xs text-faint transition-colors hover:text-accent">
          ← back to all projects
        </Link>

        {/* header */}
        <header className="mt-8">
          <p className="font-mono text-xs text-faint">
            project/{project.index}{" "}
            <span className={`ml-2 ${project.status.live ? "text-accent" : "text-muted"}`}>
              {project.status.live && (
                <span className="dot-live mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
              )}
              {project.status.label}
            </span>
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{project.tagline}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-[#06251c] transition-opacity hover:opacity-90"
              >
                Live Demo ↗
              </a>
            )}
            {project.links.repo ? (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-line-bright px-5 py-2.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
              >
                Source Code ↗
              </a>
            ) : (
              project.repoNote && (
                <span className="rounded-md border border-line px-4 py-2.5 font-mono text-xs text-faint">
                  {project.repoNote}
                </span>
              )
            )}
          </div>
        </header>

        {/* problem / solution */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-xl border border-line bg-surface p-6">
              <p className="font-mono text-xs tracking-wide text-warm">{"//"} THE PROBLEM</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.problem}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-xl border border-line bg-surface p-6">
              <p className="font-mono text-xs tracking-wide text-accent">{"//"} THE SOLUTION</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.solution}</p>
            </div>
          </Reveal>
        </div>

        {/* architecture */}
        <section className="mt-20">
          <p className="font-mono text-xs tracking-[0.2em] text-accent">
            <span className="text-faint">{"//"}</span> ARCHITECTURE
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">How the pipeline works</h2>
          <div className="mt-8">
            <ArchitectureDiagram stages={project.stages} />
          </div>
        </section>

        {/* media (only when assets exist) */}
        {project.media.length > 0 ? (
          <section className="mt-20">
            <p className="font-mono text-xs tracking-[0.2em] text-accent">
              <span className="text-faint">{"//"}</span> IN ACTION
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {project.media.map((m) => (
                <figure key={m.src} className="overflow-hidden rounded-xl border border-line bg-surface">
                  <Image src={m.src} alt={m.alt} width={1280} height={720} className="h-auto w-full" />
                  {m.caption && (
                    <figcaption className="px-4 py-3 font-mono text-[11px] text-faint">{m.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        ) : (
          project.mediaNote && (
            <p className="mt-16 rounded-lg border border-line bg-surface px-5 py-4 font-mono text-xs leading-relaxed text-faint">
              note: {project.mediaNote}
            </p>
          )
        )}

        {/* challenges */}
        <section className="mt-20">
          <p className="font-mono text-xs tracking-[0.2em] text-accent">
            <span className="text-faint">{"//"}</span> TECHNICAL CHALLENGES
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            The hard parts, and how they were solved
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {project.challenges.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div className="h-full rounded-xl border border-line bg-surface p-6">
                  <p className="font-mono text-xs text-faint">challenge_{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-base font-semibold text-fg">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* decisions */}
        <section className="mt-20">
          <p className="font-mono text-xs tracking-[0.2em] text-accent">
            <span className="text-faint">{"//"}</span> ENGINEERING DECISIONS
          </p>
          <ul className="mt-6 space-y-3">
            {project.decisions.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
                {d}
              </li>
            ))}
          </ul>
        </section>

        {/* tech */}
        <section className="mt-20">
          <p className="font-mono text-xs tracking-[0.2em] text-accent">
            <span className="text-faint">{"//"}</span> STACK
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-md border border-line-bright bg-surface px-3 py-1.5 font-mono text-xs text-fg">
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* next project */}
        <NextProject currentSlug={project.slug} />
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-6 font-mono text-[11px] text-faint sm:px-8">
          <Link href="/#contact" className="transition-colors hover:text-accent">
            {profile.email}
          </Link>
          <p>© {new Date().getFullYear()} {profile.name}</p>
        </div>
      </footer>
    </div>
  );
}

function NextProject({ currentSlug }: { currentSlug: string }) {
  const i = projects.findIndex((p) => p.slug === currentSlug);
  const next = projects[(i + 1) % projects.length];
  return (
    <div className="mt-24 border-t border-line pt-10">
      <p className="font-mono text-xs text-faint">next case study</p>
      <Link
        href={`/projects/${next.slug}`}
        className="group mt-3 flex items-center justify-between gap-4"
      >
        <span className="text-xl font-semibold text-fg transition-colors group-hover:text-accent sm:text-2xl">
          {next.title}
        </span>
        <span className="font-mono text-sm text-faint transition-colors group-hover:text-accent">→</span>
      </Link>
    </div>
  );
}
