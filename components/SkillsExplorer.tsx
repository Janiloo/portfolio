"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { skillCategories } from "@/lib/content/skills";

export default function SkillsExplorer() {
  const [active, setActive] = useState(skillCategories[0].id);
  const reduce = useReducedMotion();
  const cat = skillCategories.find((c) => c.id === active)!;

  return (
    <div className="grid gap-6 md:grid-cols-[240px_1fr]">
      {/* category rail */}
      <div className="flex flex-row gap-2 overflow-x-auto md:flex-col md:overflow-visible" role="tablist" aria-label="Skill categories">
        {skillCategories.map((c) => {
          const selected = c.id === active;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(c.id)}
              className={`flex shrink-0 items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left text-sm transition-colors ${
                selected
                  ? "border-accent-dim bg-surface text-fg"
                  : "border-line bg-transparent text-muted hover:border-line-bright hover:text-fg"
              }`}
            >
              <span className={`font-mono text-base ${selected ? "text-accent" : "text-faint"}`}>{c.glyph}</span>
              {c.label}
            </button>
          );
        })}
      </div>

      {/* active category */}
      <div className="rounded-xl border border-line bg-surface p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={cat.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <p className="font-mono text-xs text-accent">
              {"$"} inspect --category {cat.id}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{cat.blurb}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {cat.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-line-bright bg-elevated px-3 py-1.5 font-mono text-xs text-fg"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
