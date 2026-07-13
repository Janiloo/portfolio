export interface SkillCategory {
  id: string;
  label: string;
  /** mono chip shown on the category tab */
  glyph: string;
  blurb: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    label: "AI Engineering",
    glyph: "λ",
    blurb:
      "Production LLM integration — structured output, provider portability, and pipelines that survive malformed model responses.",
    skills: [
      "Claude API",
      "Gemini API",
      "Ollama",
      "Whisper (faster-whisper)",
      "OpenCV",
      "Prompt Engineering",
      "Structured / JSON-Schema Outputs",
      "Vector Embeddings (pgvector)",
      "Semantic Search",
      "Prompt Caching",
      "Multi-Provider LLM Abstraction",
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    glyph: "◈",
    blurb:
      "React across web and native — server components, app router, and mobile maps with live data.",
    skills: ["React 19", "Next.js (App Router)", "TypeScript", "React Native (Expo)", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    glyph: "⚙",
    blurb:
      "API layers in three runtimes — .NET real-time services, Node server actions, and Python services.",
    skills: ["ASP.NET Core (.NET 8)", "FastAPI", "Node.js", "Flask", "SignalR", "Server Actions", "REST API Design", "GraphQL (Monday.com)"],
  },
  {
    id: "data",
    label: "Databases",
    glyph: "▤",
    blurb:
      "Relational with row-level security, document with geospatial indexes, and object storage.",
    skills: [
      "PostgreSQL (Supabase)",
      "MongoDB (2dsphere geospatial)",
      "SQL Server (SSRS)",
      "Row-Level Security",
      "Supabase Storage",
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    glyph: "▲",
    blurb: "Shipping to managed platforms with CI-friendly, reproducible builds.",
    skills: ["Azure App Service", "Vercel (serverless + Cron)", "Docker", "Git / GitHub", "CI/CD"],
  },
  {
    id: "architecture",
    label: "Architecture",
    glyph: "⌘",
    blurb:
      "The patterns behind the projects — async by default, tenant-isolated, self-healing under failure.",
    skills: [
      "WebSockets / Real-Time Fan-out",
      "Background Workers & Job Queues",
      "Multi-Tenant Systems",
      "Event-Driven Processing",
      "OAuth 2.0 / JWT / RBAC",
      "System Design",
    ],
  },
];
