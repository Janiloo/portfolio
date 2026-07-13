# John Nilo Avanceña — Portfolio

Personal developer portfolio. Next.js App Router · TypeScript · Tailwind CSS v4 · Framer Motion.
Fully static (SSG) — zero serverless functions, built for the Vercel Hobby plan.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes prerendered)
```

## Deploy to Vercel (free)

1. Push this folder to a GitHub repo.
2. vercel.com → Add New Project → import the repo → deploy (defaults are fine).
3. After deploying, update `siteUrl` in `lib/content/profile.ts` to your real URL
   (used for SEO metadata + sitemap) and push again.

## Where everything lives

| What | File |
|---|---|
| Name, links, email, resume path | `lib/content/profile.ts` |
| Project case studies (all copy + diagrams) | `lib/content/projects.ts` |
| Skills categories | `lib/content/skills.ts` |
| Experience timeline | `lib/content/experience.ts` |
| Resume file served by Download buttons | `public/Avancena-Resume-2026.pdf` |

## Adding project screenshots / GIFs later

1. Drop images into `public/projects/<slug>/` (e.g. `public/projects/ai-video-pipeline/gui.png`).
2. In `lib/content/projects.ts`, add them to that project's `media` array:
   ```ts
   media: [{ src: "/projects/ai-video-pipeline/gui.png", alt: "Clipper GUI", caption: "One-click GUI with live progress" }],
   ```
3. The case-study page renders them automatically (the "being prepared" note disappears).

## Updating the resume

The Download buttons serve `public/Avancena-Resume-2026.pdf`. To update it, replace that
file (keep the name), or drop a new file in `public/` and change `resumeFile` in
`lib/content/profile.ts`. A `.docx` copy also lives in `public/` for reference.

## Optional polish

- `public/og.png` (1200×630) — then add `images: [{ url: "/og.png" }]` to `openGraph` in `app/layout.tsx`.
- A custom domain in Vercel project settings.
