"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/content/profile";

interface Line {
  prompt?: boolean;
  text: string;
  accent?: boolean;
}

const script: Line[] = [
  { prompt: true, text: "whoami" },
  { text: "john nilo avanceña — ai automation engineer" },
  { prompt: true, text: "ls ./projects" },
  { text: "ai-hiring-saas/   storey-clipper/   ondago/" },
  { prompt: true, text: "cat contact.txt" },
  { text: profile.email, accent: true },
  { text: `github.com/${profile.githubHandle}` },
  { text: "linkedin.com/in/john-nilo-avanceña" },
  { prompt: true, text: "./status --check" },
  { text: "● open_to_work — remote (global) · metro manila", accent: true },
];

export default function Terminal() {
  const [visible, setVisible] = useState(0); // lines fully shown
  const [chars, setChars] = useState(0); // chars of current line
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // begin when scrolled into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(script.length);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || visible >= script.length) return;
    const line = script[visible];
    // prompts "type"; output lines print instantly after a beat
    if (line.prompt) {
      if (chars < line.text.length) {
        const t = setTimeout(() => setChars((c) => c + 1), 42);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setVisible((v) => v + 1);
        setChars(0);
      }, 320);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setVisible((v) => v + 1);
      setChars(0);
    }, 140);
    return () => clearTimeout(t);
  }, [started, visible, chars]);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-line bg-surface font-mono text-[13px] leading-relaxed shadow-2xl shadow-black/40"
    >
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-line-bright" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-bright" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-bright" />
        <span className="ml-3 text-xs text-faint">john@avancena — zsh</span>
      </div>
      <div className="min-h-[16rem] px-4 py-4">
        {script.slice(0, visible).map((l, i) => (
          <p key={i} className={l.accent ? "text-accent" : l.prompt ? "text-fg" : "text-muted"}>
            {l.prompt && <span className="text-accent">$ </span>}
            {l.text}
          </p>
        ))}
        {visible < script.length && script[visible].prompt && (
          <p className="caret text-fg">
            <span className="text-accent">$ </span>
            {script[visible].text.slice(0, chars)}
          </p>
        )}
        {visible >= script.length && <p className="caret text-fg" />}
      </div>
    </div>
  );
}
