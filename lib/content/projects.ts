export interface PipelineStage {
  id: string;
  label: string;
  sub: string;
  /** Shown when the stage is selected in the interactive diagram. */
  detail: string;
}

export interface Challenge {
  title: string;
  detail: string;
}

export interface Project {
  slug: string;
  index: string; // "01"
  title: string;
  short: string; // one-liner for the homepage panel
  tagline: string;
  status: { label: string; live: boolean };
  problem: string;
  solution: string;
  stages: PipelineStage[];
  challenges: Challenge[];
  decisions: string[];
  tech: string[];
  links: { demo?: string; repo?: string };
  repoNote?: string;
  /** Drop files into public/projects/<slug>/ and list filenames here to show media. */
  media: { src: string; alt: string; caption?: string }[];
  mediaNote?: string;
  homeHighlights: string[];
}

export const projects: Project[] = [
  {
    slug: "ai-recruitment-platform",
    index: "01",
    title: "AI Recruitment Automation Platform",
    short:
      "Multi-tenant SaaS that turns inbound resume emails into AI-screened, ranked candidates — zero manual data entry.",
    tagline:
      "Inbound resume emails become AI-screened, ranked candidates. Humans approve every irreversible action.",
    status: { label: "Live on Vercel", live: true },
    problem:
      "Recruiting teams drown in unstructured inbound applications. Every emailed resume means manual downloading, reading, data entry, and inconsistent first-pass screening — the slowest, most error-prone part of the funnel, multiplied across every open role.",
    solution:
      "A multi-tenant hiring platform that automates the top of the funnel end to end. Each organization connects its recruitment inbox via Gmail OAuth; inbound applications are routed deterministically, parsed and scored by an LLM in a background queue, and surfaced as ranked candidates with strengths, weaknesses, and reasoning. AI parses and evaluates — humans approve anything candidate-facing.",
    stages: [
      {
        id: "email",
        label: "Email Application",
        sub: "candidate → inbox",
        detail:
          "Candidates apply by emailing a PDF resume with the subject “<Job Title> Candidate”. Malformed submissions get an automatic corrective reply listing the open positions — the system teaches its own input format.",
      },
      {
        id: "oauth",
        label: "Gmail OAuth Ingestion",
        sub: "per-org refresh tokens",
        detail:
          "Each tenant connects its own inbox via Google OAuth (gmail.modify scope). A minimal hand-rolled Gmail REST client polls unread messages, walks MIME trees for PDF attachments, deduplicates by message ID, and logs every decision to an ingestion audit table.",
      },
      {
        id: "routing",
        label: "Deterministic Routing",
        sub: "subject line — never the LLM",
        detail:
          "The email subject decides which job post a candidate applied to — matched against active postings only. A hard system rule: the LLM never chooses the job and never moves pipeline stages. Deterministic code routes; AI only evaluates.",
      },
      {
        id: "storage",
        label: "Resume Storage",
        sub: "Supabase Storage + pending row",
        detail:
          "The PDF is stored in object storage and a candidate row is created with ai_status='pending'. Ingestion is deliberately AI-free so inbox syncs finish fast and never block on a model.",
      },
      {
        id: "queue",
        label: "Background AI Queue",
        sub: "CAS claiming · crash recovery",
        detail:
          "A queue processor claims rows with a compare-and-swap update (pending → processing), so concurrent workers can't double-process. Rows stuck in 'processing' past a timeout are reclaimed automatically. Drains post-response via Next.js after() and via an authenticated Vercel Cron endpoint as retry/fallback.",
      },
      {
        id: "llm",
        label: "LLM Evaluation",
        sub: "Claude · Gemini · Ollama",
        detail:
          "One provider-agnostic interface — generateText / generateJSON — over three model providers. JSON-schema-constrained output, native PDF input on Claude/Gemini, and a pdf-parse text fallback for local models. Scores are clamped defensively before hitting DB CHECK constraints.",
      },
      {
        id: "ranking",
        label: "Candidate Ranking",
        sub: "0–100 fit + reasoning",
        detail:
          "Each candidate gets a fit score, recommendation (recommended / borderline / not recommended), strengths, weaknesses, and a recruiter-facing summary — evaluated against the specific job post's requirements, not a generic rubric.",
      },
      {
        id: "workflow",
        label: "Recruiter Workflow",
        sub: "RBAC · human approval",
        detail:
          "Admins, recruiters, and interviewers see role-scoped dashboards. Candidate-facing automation (emails, stage moves) is exposed as n8n-orchestrated endpoints that only execute on an approved draft — AI proposes, humans approve, automation executes.",
      },
    ],
    challenges: [
      {
        title: "LLMs return malformed JSON in production",
        detail:
          "Schema-constrained generation where the provider supports it, embedded-schema prompting where it doesn't, code-fence stripping, and a bounded retry — the evaluation pipeline treats model output as untrusted input.",
      },
      {
        title: "Keeping the model off the request path",
        detail:
          "Inbox sync creates pending rows and returns; evaluation happens in a background queue with compare-and-swap claiming and stuck-row reclamation. A slow or rate-limited model can never time out a user request.",
      },
      {
        title: "Multi-tenant isolation that can't be forgotten",
        detail:
          "Every table is scoped by organization_id and enforced by PostgreSQL Row-Level Security — isolation lives in the database, not in per-query discipline. The service-role key is confined to backend admin actions.",
      },
      {
        title: "Provider lock-in",
        detail:
          "The same evaluation logic runs on Anthropic Claude, Google Gemini, or a free local Ollama model by flipping one env var — swapping cost/quality tradeoffs without touching business logic.",
      },
    ],
    decisions: [
      "Deterministic code routes applications; the LLM only parses and scores — a hard boundary, not a convention.",
      "Postgres-backed queue over external infra: compare-and-swap claiming gives safe concurrency with zero extra services on a serverless platform.",
      "Suspended organizations are excluded at the query level — platform moderation automatically halts their ingestion and AI spend.",
      "Auto-replies teach applicants the expected format instead of silently dropping mail.",
    ],
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase (PostgreSQL + RLS)",
      "Anthropic Claude API",
      "Google Gemini API",
      "Ollama",
      "Gmail API",
      "OAuth 2.0",
      "Vercel Cron",
      "n8n",
      "Tailwind CSS",
    ],
    links: { demo: "https://ai-hiring-saas.vercel.app/" },
    repoNote: "Source is private — code walkthrough available on request.",
    media: [],
    homeHighlights: [
      "Provider-agnostic LLM layer (Claude / Gemini / Ollama)",
      "Background queue with CAS claiming + crash recovery",
      "PostgreSQL RLS multi-tenancy · RBAC",
      "Human-approval gates on all candidate-facing actions",
    ],
  },
  {
    slug: "ai-video-pipeline",
    index: "02",
    title: "AI Video Clipping Pipeline",
    short:
      "Turns a livestream VOD into captioned vertical clips — Whisper transcription, Gemini moment selection, face-aware FFmpeg rendering.",
    tagline:
      "One command in: a YouTube VOD. A folder of captioned, face-framed, post-ready vertical clips out.",
    status: { label: "Desktop GPU pipeline — runs locally", live: false },
    problem:
      "Turning a two-hour livestream into short-form content is hours of manual work: scrubbing for highlights, cutting, reframing to 9:16, and captioning. Editors do it by feel; most streams never get clipped at all.",
    solution:
      "A six-stage Python pipeline that automates the whole job on a consumer GPU using only free tools: download, transcribe with word-level timestamps, have an LLM pick the hook-forward moments, detect faces to choose framing, then render captioned vertical clips with burned-in word-by-word karaoke subtitles. Ships with a one-click Flask GUI with live progress.",
    stages: [
      {
        id: "ingest",
        label: "VOD Download",
        sub: "yt-dlp ≤1080p",
        detail:
          "yt-dlp fetches the stream at a capped resolution to respect disk budget. Source video and extracted audio are deleted after rendering — even if the run crashes — so a failed job can't strand gigabytes.",
      },
      {
        id: "stt",
        label: "Whisper Transcription",
        sub: "GPU · word timestamps",
        detail:
          "faster-whisper on CUDA with int8_float16 quantization (~1.5 GB VRAM). On CUDA init failure it registers cuDNN/cuBLAS DLL paths, falls back to CPU, and downshifts model size automatically — a run degrades, never dies.",
      },
      {
        id: "llm",
        label: "Gemini Moment Selection",
        sub: "prompt-engineered · JSON",
        detail:
          "The timestamped transcript goes to Gemini with a prompt engineered for self-contained, hook-first moments. The parser strips code fences, salvages truncated JSON arrays, retries up to 3×, and drops overlapping picks.",
      },
      {
        id: "snap",
        label: "Boundary Snapping",
        sub: "never cut a word",
        detail:
          "LLM-chosen clip boundaries are snapped to the nearest word edges from the word-level transcript, so clips start and end on natural speech boundaries instead of mid-syllable.",
      },
      {
        id: "cv",
        label: "Face-Aware Framing",
        sub: "OpenCV YuNet",
        detail:
          "YuNet face detection on sampled frames picks the layout per clip: facecam split-screen, face-centered crop, or plain center. Detection failure always falls back to center crop — computer vision can never abort a render.",
      },
      {
        id: "render",
        label: "FFmpeg Render",
        sub: "NVENC · 9:16 · karaoke captions",
        detail:
          "FFmpeg cuts, crops to vertical, encodes on the GPU (NVENC probed at startup with libx264 fallback), and burns in styled .ass subtitles with word-by-word highlighting. Output: ready-to-post MP4s plus a per-clip hook/caption summary.",
      },
    ],
    challenges: [
      {
        title: "CUDA on consumer Windows machines",
        detail:
          "ctranslate2 needs cuBLAS/cuDNN DLLs that pip installs but Windows doesn't search. The pipeline registers the DLL directories at runtime and verifies the full GPU chain at startup with actionable fix hints.",
      },
      {
        title: "LLM output as a structured data source",
        detail:
          "Segment selection demands machine-readable JSON from a creative task. Defense in depth: JSON response mode, fence stripping, truncated-array salvage, bounded retries, duration clamping, and overlap deduplication.",
      },
      {
        title: "A 6 GB VRAM / low-disk budget",
        detail:
          "Quantized inference, streaming transcription progress for long VODs, capped download resolution, and guaranteed source cleanup in a finally block — engineered for the hardware people actually own.",
      },
    ],
    decisions: [
      "Every stage independently testable via --stop-after (download / transcribe / segment) — pipeline debugging without full re-runs.",
      "Zero-cost constraint as a design principle: yt-dlp + faster-whisper + FFmpeg + Gemini free tier.",
      "VAD off by default after real-world testing showed it dropping legitimate speech.",
      "The GUI verifies the Gemini key against Google before saving it to a local .env — keys never leave the machine.",
    ],
    tech: [
      "Python",
      "faster-whisper (CUDA)",
      "Google Gemini API",
      "FFmpeg (NVENC)",
      "OpenCV (YuNet)",
      "yt-dlp",
      "Flask",
    ],
    links: {},
    repoNote: "Source is private — code walkthrough available on request.",
    media: [],
    mediaNote:
      "This is a desktop GPU pipeline, not a hosted app — it runs where the hardware is. Clip previews and a GUI demo video are being prepared.",
    homeHighlights: [
      "Speech-to-text on GPU with graceful CPU fallback",
      "Prompt-engineered clip selection with hardened JSON parsing",
      "OpenCV face detection drives per-clip framing",
      "NVENC rendering with burned-in karaoke captions",
    ],
  },
  {
    slug: "ondago-fleet-tracking",
    index: "03",
    title: "ONDAGO — Real-Time Fleet Tracking Platform",
    short:
      "Live public-transport tracking: SignalR fan-out, MongoDB geospatial queries, and multi-tenant .NET backend serving mobile + web clients.",
    tagline:
      "Commuters see vehicles move in real time. Operators run their fleet. One backend, three client platforms.",
    status: { label: "Case study — Azure-hosted backend", live: false },
    problem:
      "Public utility vehicle (PUV) commuters wait blind: no idea where the next ride is, how full it is, or what the fare will be. Operators, meanwhile, have no live view of their fleet and no record of driver shifts.",
    solution:
      "A multi-tenant tracking platform: drivers broadcast GPS and passenger counts from a React Native app; an ASP.NET Core backend fans updates out over SignalR to commuter apps and an operator web console in real time, with fare estimation, capacity monitoring, geospatial 'vehicles near me' queries, and per-company data isolation.",
    stages: [
      {
        id: "driver",
        label: "Driver App",
        sub: "GPS + occupancy broadcast",
        detail:
          "React Native (Expo) with background location via expo-task-manager — drivers broadcast position and passenger count even with the phone in a pocket. Starting a broadcast auto-opens a duty shift; ending it (or going silent) closes it.",
      },
      {
        id: "write",
        label: "Single Write Path",
        sub: "PATCH /vehicle/{puv}/status",
        detail:
          "All position writes flow through one endpoint — one place for validation, duty-state transitions, and the GeoJSON mirror that keeps the geospatial index usable. The controller broadcasts after each successful write.",
      },
      {
        id: "api",
        label: "ASP.NET Core API",
        sub: ".NET 8 · MongoDB · JWT",
        detail:
          "JWT auth with BCrypt hashing, per-IP rate limiting on login and password reset, KYC ID + selfie verification at driver registration, and a hosted DutyTimeoutService that auto-closes abandoned shifts when a phone dies mid-route.",
      },
      {
        id: "fanout",
        label: "SignalR Fan-Out",
        sub: "route-scoped groups",
        detail:
          "Updates broadcast to an 'all vehicles' firehose group and to per-route groups, so a commuter watching one route only receives that route's traffic as the network grows. WebSocket auth via query-string JWT handoff (headers aren't available on WS upgrade).",
      },
      {
        id: "clients",
        label: "Commuter App + Console",
        sub: "self-healing live map",
        detail:
          "Clients seed from REST and layer live pushes on top — a dropped WebSocket message means slightly staler data, never a blank map. The operator console (React + Leaflet) shows the same live picture with fleet management on top.",
      },
    ],
    challenges: [
      {
        title: "Real-time at growing scale",
        detail:
          "A naive broadcast sends every vehicle to every client. Route-scoped SignalR groups turn fan-out cost from vehicles × clients into vehicles × interested clients — a pure bandwidth win with REST reconciliation as the safety net.",
      },
      {
        title: "Geospatial queries without collection scans",
        detail:
          "Vehicle positions are mirrored into GeoJSON points under a 2dsphere index, so 'vehicles within N meters' runs as an indexed $nearSphere query. Indexes are created idempotently at startup.",
      },
      {
        title: "Phones die mid-shift",
        detail:
          "A background hosted service closes shifts that go silent past a timeout, with a re-applied staleness filter so a vehicle that broadcasts between detection and update isn't force-closed — no ghost buses on the map.",
      },
      {
        title: "Multi-tenancy across companies",
        detail:
          "A per-request TenantContext resolved from JWT claims feeds company-scoped repository wrappers; platform admin is an additive claim, not a role swap. Missing tenant scope fails as a clean 409 with a fix, not a 500.",
      },
    ],
    decisions: [
      "REST seed + WebSocket deltas: real-time as an optimization layered over a correct baseline, never a single point of failure.",
      "Duty state modeled as explicit transitions (driver-ended vs. timeout) — shift history stays trustworthy for operators.",
      "SignalR keep-alive tuned for mobile reality: 10s pings, 60s client timeout, because phones background apps far more than browsers.",
      "One authoritative write path for vehicle state instead of scattered update endpoints.",
    ],
    tech: [
      "ASP.NET Core (.NET 8)",
      "C#",
      "SignalR (WebSockets)",
      "MongoDB (2dsphere)",
      "JWT + BCrypt",
      "React Native (Expo)",
      "React + Leaflet",
      "Azure App Service",
      "Docker",
    ],
    links: {},
    repoNote: "Source is private — code walkthrough available on request.",
    media: [],
    mediaNote:
      "The backend runs on Azure App Service with native mobile clients — presented here as an architecture case study. App screenshots and a demo video are being prepared.",
    homeHighlights: [
      "Route-scoped SignalR groups for scalable fan-out",
      "MongoDB $nearSphere geospatial queries, no scans",
      "JWT-claim multi-tenancy across 3 client platforms",
      "Self-healing shift lifecycle via background services",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
