"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { PipelineStage } from "@/lib/content/projects";

/**
 * Interactive pipeline: stages connected vertically; selecting one reveals the
 * engineering detail behind it. Keyboard accessible (buttons).
 */
export default function ArchitectureDiagram({ stages }: { stages: PipelineStage[] }) {
  const [activeId, setActiveId] = useState(stages[0].id);
  const reduce = useReducedMotion();
  const active = stages.find((s) => s.id === activeId)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr]">
      {/* stage rail */}
      <ol className="relative">
        {stages.map((s, i) => {
          const selected = s.id === activeId;
          const last = i === stages.length - 1;
          return (
            <li key={s.id} className="relative pl-8">
              {/* connector */}
              {!last && <span aria-hidden className="absolute left-[11px] top-8 h-full w-px bg-line-bright" />}
              {/* node */}
              <span
                aria-hidden
                className={`absolute left-1 top-2.5 h-[14px] w-[14px] rounded-full border-2 transition-colors ${
                  selected ? "border-accent bg-accent/20" : "border-line-bright bg-surface"
                }`}
              />
              <button
                onClick={() => setActiveId(s.id)}
                aria-pressed={selected}
                className={`mb-4 block w-full rounded-lg border px-4 py-3 text-left transition-colors ${
                  selected
                    ? "border-accent-dim bg-surface"
                    : "border-line bg-transparent hover:border-line-bright"
                }`}
              >
                <span className={`block text-sm font-medium ${selected ? "text-fg" : "text-muted"}`}>
                  <span className="mr-2 font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                  {s.label}
                </span>
                <span className={`mt-0.5 block font-mono text-[11px] ${selected ? "text-accent" : "text-faint"}`}>
                  {s.sub}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* detail panel */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-xl border border-line bg-surface p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <p className="font-mono text-xs tracking-wide text-accent">
                stage/{active.id} <span className="text-faint">— {active.sub}</span>
              </p>
              <h4 className="mt-2 text-lg font-semibold text-fg">{active.label}</h4>
              <p className="mt-3 text-sm leading-relaxed text-muted">{active.detail}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-3 font-mono text-[11px] text-faint">select a stage to inspect the engineering behind it</p>
      </div>
    </div>
  );
}
