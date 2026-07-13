/**
 * Hero pipeline visualization — pure SVG + CSS offset-path animation.
 * Server component: zero JS shipped for the animation itself.
 * Packets travel input → pipeline core → output; reduced-motion hides them.
 */

const IN = [
  { y: 64, label: "EMAIL", sub: "resume.pdf" },
  { y: 160, label: "VIDEO", sub: "stream.vod" },
  { y: 256, label: "GPS", sub: "telemetry" },
];

const OUT = [
  { y: 64, label: "RANKED", sub: "candidates" },
  { y: 160, label: "CLIPS", sub: "short-form" },
  { y: 256, label: "LIVE MAP", sub: "fleet" },
];

const pathsIn = [
  "M 128 64 C 210 64, 240 160, 300 160",
  "M 128 160 C 200 160, 240 160, 300 160",
  "M 128 256 C 210 256, 240 160, 300 160",
];
const pathsOut = [
  "M 452 160 C 512 160, 542 64, 624 64",
  "M 452 160 C 524 160, 552 160, 624 160",
  "M 452 160 C 512 160, 542 256, 624 256",
];

function Node({ x, y, label, sub, anchor }: { x: number; y: number; label: string; sub: string; anchor: "start" | "end" }) {
  const rx = anchor === "start" ? x : x - 88;
  return (
    <g>
      <rect x={rx} y={y - 22} width="88" height="44" rx="8" fill="var(--color-surface)" stroke="var(--color-line-bright)" />
      <text x={rx + 44} y={y - 3} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="var(--color-fg)" fontWeight="600">
        {label}
      </text>
      <text x={rx + 44} y={y + 12} textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--color-faint)">
        {sub}
      </text>
    </g>
  );
}

export default function PipelineHero() {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-3xl select-none">
      <svg viewBox="0 0 752 320" className="h-auto w-full">
        {/* flow lines */}
        {[...pathsIn, ...pathsOut].map((d, i) => (
          <path key={i} d={d} fill="none" stroke="var(--color-line-bright)" strokeWidth="1.25" />
        ))}

        {/* animated packets (CSS offset-path; hidden under prefers-reduced-motion) */}
        {pathsIn.map((d, i) => (
          <circle
            key={`in-${i}`}
            className="packet"
            r="3.5"
            fill="var(--color-accent)"
            style={{ offsetPath: `path("${d}")`, ["--dur" as string]: "4.2s", ["--delay" as string]: `${i * 1.4}s` }}
          />
        ))}
        {pathsOut.map((d, i) => (
          <circle
            key={`out-${i}`}
            className="packet"
            r="3.5"
            fill="var(--color-accent)"
            style={{ offsetPath: `path("${d}")`, ["--dur" as string]: "4.2s", ["--delay" as string]: `${i * 1.4 + 2.1}s` }}
          />
        ))}

        {/* input nodes */}
        {IN.map((n) => (
          <Node key={n.label} x={40} y={n.y} label={n.label} sub={n.sub} anchor="start" />
        ))}

        {/* pipeline core */}
        <g>
          <rect x="300" y="106" width="152" height="108" rx="10" fill="var(--color-surface)" stroke="var(--color-accent-dim)" />
          <rect x="300" y="106" width="152" height="108" rx="10" fill="none" stroke="var(--color-accent)" className="stage-pulse" opacity="0.5" />
          <text x="376" y="132" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="var(--color-accent)" fontWeight="700" letterSpacing="1">
            PIPELINE
          </text>
          <text x="376" y="152" textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--color-muted)">
            ingest → evaluate → act
          </text>
          <text x="376" y="176" textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--color-faint)">
            llm: structured_output
          </text>
          <text x="376" y="192" textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--color-faint)">
            queue: draining ▮▮▮▯
          </text>
        </g>

        {/* output nodes */}
        {OUT.map((n) => (
          <Node key={n.label} x={712} y={n.y} label={n.label} sub={n.sub} anchor="end" />
        ))}
      </svg>
    </div>
  );
}
