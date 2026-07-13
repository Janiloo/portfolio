import Link from "next/link";
import Nav from "@/components/Nav";
import PipelineHero from "@/components/PipelineHero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import SkillsExplorer from "@/components/SkillsExplorer";
import Terminal from "@/components/Terminal";
import { profile } from "@/lib/content/profile";
import { projects } from "@/lib/content/projects";
import { timeline, careerArc } from "@/lib/content/experience";

export default function Home() {
  return (
    <div id="top">
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <main className="relative overflow-hidden">
        <div aria-hidden className="hero-grid absolute inset-0" />
        <div
          aria-hidden
          className="absolute left-1/2 top-[-10%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[120px]"
        />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-16 pt-32 text-center sm:px-8 sm:pt-40">
          <p className="flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-1.5 font-mono text-xs text-muted">
            <span className="dot-live inline-block h-2 w-2 rounded-full bg-accent" />
            open to work — remote (global) · {profile.location}
          </p>

          <h1 className="mt-8 text-4xl font-semibold tracking-tight text-fg sm:text-6xl">
            {profile.name}
          </h1>

          <p className="mt-4 font-mono text-sm text-accent sm:text-base">
            {profile.titles.join("  ·  ")}
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.statement}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-[#06251c] transition-opacity hover:opacity-90"
            >
              View Projects
            </a>
            <a
              href={profile.resumeFile}
              download
              className="rounded-md border border-line-bright px-5 py-2.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="rounded-md border border-line-bright px-5 py-2.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-6 flex items-center gap-5 font-mono text-xs text-faint">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
              github/{profile.githubHandle}
            </a>
            <span aria-hidden>·</span>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
              linkedin
            </a>
          </div>

          <div className="mt-16 w-full">
            <PipelineHero />
            <p className="mt-3 text-center font-mono text-[11px] text-faint">
              unstructured input → intelligent pipeline → structured output — the pattern behind everything below
            </p>
          </div>
        </div>
      </main>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <Section id="about" kicker="about" title="From enterprise systems to AI automation">
        <div className="grid gap-10 md:grid-cols-[1fr_300px]">
          <Reveal>
            <div className="space-y-5 text-[15px] leading-relaxed text-muted">
              <p>
                I started where software is least forgiving: <span className="text-fg">enterprise systems</span>. A BSIT
                degree, then production work customizing Microsoft Dynamics AX 2012 in X++ — financial document
                automation where a wrong number isn&apos;t a bug, it&apos;s an audit finding. From there, SAP ABAP at
                Accenture: object-oriented development and deep debugging inside systems that run entire companies.
              </p>
              <p>
                That foundation — data integrity, workflow discipline, code that must be right — is what I brought into{" "}
                <span className="text-fg">modern full-stack development</span>: multi-tenant SaaS on Next.js and
                Supabase, real-time platforms on ASP.NET Core and SignalR, mobile apps in React Native.
              </p>
              <p>
                Now I build <span className="text-fg">AI automation systems</span> — most recently on contract for{" "}
                <span className="text-fg">SourceOne Global</span>, replacing an operations team&apos;s triple manual
                data entry with a drag-and-drop, Claude-powered document pipeline synced to NetSuite and Monday.com.
                The common thread across my work: LLMs do the reading, scoring, and selecting; deterministic code
                handles routing, state, and everything irreversible — with a human approval gate in front of
                consequences.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="font-mono text-xs text-faint">career_arc.log</p>
              <ol className="mt-4 space-y-1">
                {careerArc.map((step, i) => (
                  <li key={step}>
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs ${i === careerArc.length - 1 ? "text-accent" : "text-faint"}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-sm ${i === careerArc.length - 1 ? "font-medium text-accent" : "text-fg"}`}
                      >
                        {step}
                      </span>
                    </div>
                    {i < careerArc.length - 1 && (
                      <span aria-hidden className="ml-[3px] block h-5 w-px translate-x-[2px] bg-line-bright" />
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <Section id="projects" kicker="featured work" title="Systems I've built">
        <div className="space-y-6">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link
                href={`/projects/${p.slug}`}
                className="group block rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent-dim sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-faint">
                      {p.index} <span className="mx-1">/</span>{" "}
                      <span className={p.status.live ? "text-accent" : "text-muted"}>
                        {p.status.live && <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />}
                        {p.status.label}
                      </span>
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-fg transition-colors group-hover:text-accent sm:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{p.short}</p>
                  </div>
                  <span className="hidden shrink-0 font-mono text-xs text-faint transition-colors group-hover:text-accent sm:block">
                    case study →
                  </span>
                </div>

                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {p.homeHighlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-[13px] text-muted">
                      <span aria-hidden className="mt-[5px] h-1 w-3 shrink-0 bg-accent-dim" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 7).map((t) => (
                    <span key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-faint">
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 7 && (
                    <span className="px-1 py-0.5 font-mono text-[11px] text-faint">+{p.tech.length - 7}</span>
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <Section id="skills" kicker="capabilities" title="Technical skills">
        <Reveal>
          <SkillsExplorer />
        </Reveal>
      </Section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <Section id="experience" kicker="timeline" title="Experience">
        <ol className="relative space-y-8 border-l border-line-bright pl-8">
          {timeline.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.05}>
              <li className="relative">
                <span
                  aria-hidden
                  className={`absolute -left-[37px] top-1.5 h-[14px] w-[14px] rounded-full border-2 ${
                    t.kind === "arc" ? "border-accent bg-accent/20" : "border-line-bright bg-surface"
                  }`}
                />
                <p className="font-mono text-xs text-faint">{t.period}</p>
                <h3 className="mt-1 text-lg font-semibold text-fg">{t.title}</h3>
                <p className={`font-mono text-xs ${t.kind === "arc" ? "text-accent" : "text-muted"}`}>{t.org}</p>
                <ul className="mt-3 space-y-1.5">
                  {t.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                      <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-faint" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ── RESUME ───────────────────────────────────────────────────────── */}
      <Section id="resume" kicker="resume" title="The full picture, one file">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="font-mono text-xs text-faint">Avancena-Resume-2026.pdf</p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                Three production systems, enterprise ERP background, and a skills matrix built from real code — not
                keyword padding. ATS-friendly format.
              </p>
            </div>
            <a
              href={profile.resumeFile}
              download
              className="shrink-0 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-[#06251c] transition-opacity hover:opacity-90"
            >
              Download Resume ↓
            </a>
          </div>
        </Reveal>
      </Section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <Section id="contact" kicker="contact" title="Let's build something">
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <div>
              <p className="text-[15px] leading-relaxed text-muted">
                Looking for an engineer who ships AI automation that survives production? I&apos;m open to full-time
                roles (remote or on-site) and interesting freelance work.
              </p>
              <div className="mt-8 space-y-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center justify-between rounded-lg border border-line bg-surface px-5 py-4 transition-colors hover:border-accent-dim"
                >
                  <span className="font-mono text-sm text-fg">{profile.email}</span>
                  <span className="font-mono text-xs text-faint group-hover:text-accent">email →</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-lg border border-line bg-surface px-5 py-4 transition-colors hover:border-accent-dim"
                >
                  <span className="font-mono text-sm text-fg">linkedin/john-nilo-avanceña</span>
                  <span className="font-mono text-xs text-faint group-hover:text-accent">connect →</span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-lg border border-line bg-surface px-5 py-4 transition-colors hover:border-accent-dim"
                >
                  <span className="font-mono text-sm text-fg">github/{profile.githubHandle}</span>
                  <span className="font-mono text-xs text-faint group-hover:text-accent">follow →</span>
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Terminal />
          </Reveal>
        </div>
      </Section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-6 font-mono text-[11px] text-faint sm:px-8">
          <p>
            <span className="dot-live mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
            all systems operational — open to work
          </p>
          <p>
            © {new Date().getFullYear()} {profile.name} · built with Next.js, deployed on Vercel
          </p>
        </div>
      </footer>
    </div>
  );
}
