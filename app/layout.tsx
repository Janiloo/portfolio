import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/lib/content/profile";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — AI Automation Engineer`,
    template: `%s — ${profile.name}`,
  },
  description: `${profile.statement} AI automation engineer and full-stack developer working with LLM pipelines, real-time systems, and multi-tenant SaaS.`,
  keywords: [
    "AI Automation Engineer",
    "Software Engineer",
    "Full-Stack Developer",
    "LLM",
    "Claude API",
    "Gemini API",
    "Next.js",
    "ASP.NET Core",
    "Philippines",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  openGraph: {
    type: "website",
    title: `${profile.name} — AI Automation Engineer`,
    description: profile.statement,
    url: profile.siteUrl,
    siteName: profile.name,
  },
  twitter: {
    card: "summary",
    title: `${profile.name} — AI Automation Engineer`,
    description: profile.statement,
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  email: `mailto:${profile.email}`,
  jobTitle: profile.titles[0],
  url: profile.siteUrl,
  sameAs: [profile.github, profile.linkedin],
  address: { "@type": "PostalAddress", addressLocality: "Metro Manila", addressCountry: "PH" },
  knowsAbout: [
    "AI Automation",
    "LLM Integration",
    "Full-Stack Development",
    "Real-Time Systems",
    "Workflow Automation",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
