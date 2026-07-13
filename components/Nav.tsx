"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content/profile";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-canvas/85 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5 sm:px-8">
        <a href="/#top" className="font-mono text-sm font-semibold tracking-tight text-fg">
          <span className="text-accent">~/</span>avanceña
        </a>
        <div className="hidden items-center gap-6 sm:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
              {l.label}
            </a>
          ))}
          <a
            href={profile.resumeFile}
            download
            className="rounded-md border border-line-bright px-3 py-1.5 font-mono text-xs text-fg transition-colors hover:border-accent hover:text-accent"
          >
            resume ↓
          </a>
        </div>
        {/* mobile: keep it minimal — anchor to projects + resume */}
        <div className="flex items-center gap-4 sm:hidden">
          <a href="/#projects" className="text-sm text-muted">
            Projects
          </a>
          <a href={profile.resumeFile} download className="font-mono text-xs text-accent">
            resume ↓
          </a>
        </div>
      </nav>
    </header>
  );
}
