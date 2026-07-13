export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  org: string;
  kind: "work" | "education" | "arc";
  points: string[];
}

/** Newest first. */
export const timeline: TimelineEntry[] = [
  {
    id: "sourceone",
    period: "06/2026 · 1-month contract",
    title: "Software Engineer (Contract)",
    org: "SourceOne Global",
    kind: "work",
    points: [
      "Automated the operations team's manual triple data entry (NetSuite, Monday.com, Google Sheets): drag-and-drop a quotation PDF and structured sales-order data flows to every downstream system.",
      "Integrated the Anthropic Claude API for native-PDF extraction — output prefills a human-review form and is never persisted without operator confirmation.",
      "Implemented NetSuite SuiteTalk REST integration with OAuth 2.0 machine-to-machine auth (PS256-signed JWT client assertions, token caching) and Monday.com board automation via GraphQL.",
      "Built semantic product matching: pgvector embedding retrieval with a Claude Sonnet final-selection stage, prompt caching, and versioned prompts — inside a FastAPI + Next.js + Supabase portal.",
    ],
  },
  {
    id: "accenture",
    period: "02/2026 — 06/2026",
    title: "SAP ABAP Developer — Academy Delegate",
    org: "Accenture Philippines",
    kind: "work",
    points: [
      "Developed Object-Oriented ABAP programs, reports, and classes using SAP GUI / SAP Logon.",
      "Structured debugging with the ABAP Debugger — breakpoints, stack analysis, runtime navigation.",
      "Worked across core SAP transactions (SE80, SE24, SE11, SE37, SE16N, SCI, SE30).",
    ],
  },
  {
    id: "cds",
    period: "03/2025 — 01/2026",
    title: "Microsoft Dynamics AX 2012 Developer",
    org: "Creative Dynamics Solutions Inc.",
    kind: "work",
    points: [
      "Designed and customized forms and business logic in X++ (controllers, data providers, services).",
      "Built SSRS reports with multiple datasets and custom AX views; automated financial document generation (AP vouchers, check vouchers, sales invoices).",
      "Delivered customizations for clients including LHPI and Cirtek Electronics Corporation.",
    ],
  },
  {
    id: "sti",
    period: "Graduate",
    title: "BS Information Technology",
    org: "STI College Cubao",
    kind: "education",
    points: ["Accenture Academy — SAP ABAP Development & SAP End-to-End Basis."],
  },
];

export const careerArc = ["Enterprise Systems", "Full-Stack Development", "AI Automation"] as const;
