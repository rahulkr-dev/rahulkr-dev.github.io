# Build Plan: Portfolio Update

What to build and what to change, in the order to do it. `prompt.md` is the prompt for an agent. This file is the checklist.

Legend: `[ ]` to do · **(ask)** needs a decision from Rahul · **(data)** needs real info from Rahul

---

## Decisions already made

- **No full 3D / Three.js.** It hurts mobile performance and works against the "reliable systems engineer" message. An optional small lazy-loaded WebGL/canvas hero accent is allowed only if it is off on mobile and under `prefers-reduced-motion`.
- **Lead with the Infinity Learn live-class streaming work.** It is the newest and most relevant credential.
- **No photos for now.** The profile photo and project screenshots are removed (done). Any visual we need is generated: inline SVG, CSS, or initials. A real photo can be added later.
- **Python / FastAPI is part of the Infinity Learn work.** It goes in the hero, skills, experience and case study alongside the streaming and GCP work.
- **Upgrade dependencies in stages**, not with one blanket update.
- **Stay a static export** deployed to GitHub Pages.

## Open questions (blocking)

- [ ] **(ask)** Package manager: pnpm (recommended, `mise.toml` already pins it) or npm?
- [ ] **(ask)** Upgrade Tailwind 3 → 4, or stay on 3? (Optional, do last.)
- [ ] **(ask)** What should the Omnichannel project link to if the repo is private: an honest "Private repository" label, or a different public link?
- [ ] **(data)** Infinity Learn details:
  - What "GCS" means here (Google Cloud Storage, or GCP broadly: GKE, Cloud Run, CDN, Pub/Sub).
  - The pipeline: ingest → transcode → HLS/DASH → CDN → player.
  - What the Python / FastAPI services do (for example session APIs, auth, scheduling, recording, webhooks) and how they are deployed.
  - What Rahul personally built or deployed.
  - Real numbers (concurrent viewers, latency, uptime, cost, deploy time).
  - What the employer allows to be published.
- [ ] **(data)** Experience history: roles, companies, dates, outcomes.
- [ ] **(data)** Contact route: email address and whether to use a form service.

---

## Phase 0: Baseline and housekeeping

- [ ] Run `npm run build` and `npm run lint`, and record the output.
- [ ] Capture the current site at 375 / 768 / 1440px in light and dark themes.
- [ ] Record Lighthouse mobile scores (Performance, Accessibility, Best Practices, SEO).
- [ ] Choose one package manager. Delete the other lockfile, update scripts and README.
- [ ] Decide whether `mise.toml` and `pnpm-workspace.yaml` are committed or ignored.
- [ ] Work on a new branch, not directly on `latest` or `gh-pages`.

## Phase 1: Dependency upgrades (one commit per step)

Run `lint` + `build` and check the page in the browser after each step.

- [ ] **1a.** `lucide-react` (0.468 → 1.x), `react-github-calendar` (4.5 → 5.x), `tailwind-merge` (2.6 → 3.x).
- [ ] **1b.** `next` 14 → 16, `react` and `react-dom` 18 → 19, `@types/react` and `@types/react-dom` → 19, `eslint-config-next` → 16. Check that `output: "export"`, `next-themes` and the Radix packages still work.
- [ ] **1c.** `eslint` 8 → 10, and move `.eslintrc.json` to a flat `eslint.config.mjs`.
- [ ] **1d.** `@types/node` to match the Node runtime (24), not the latest (26).
- [ ] **1e. (optional, last)** Tailwind 3 → 4. Touches `tailwind.config.ts`, `postcss.config.mjs`, `globals.css` and the color variables. Compare screenshots before and after.
- [ ] **Hold:** TypeScript stays on 5.9 for now (7.0 is a large change).
- [ ] Remove unused dependencies (audit `@radix-ui/*`) and unused `components/ui/*` files.

## Phase 2: Content and information architecture

New page order: **Hero → Experience → Featured case studies → More projects → Skills (regrouped) → Contact → Footer**

- [ ] **Hero** (`components/home.tsx`)
  - One-line value proposition and 2–3 proof points. No invented numbers; use `TODO(rahul)` markers.
  - The hero copy and stats currently describe only the Node/TypeScript work. Add live streaming, Python and FastAPI.
  - A "Currently: Infinity Learn" status chip.
  - Two CTAs: View projects, Contact / Résumé.
- [ ] **Experience.** It currently lives inside `components/about.tsx` with two entries (Brainvibs, CNS Web Tech) and no Infinity Learn.
  - Add Infinity Learn as the top entry (from August).
  - Extract it into `components/experience.tsx` with data in `lib/experience.ts`.
  - Role, company, dates, and 2–3 outcome-focused bullets per entry.
  - Check the Brainvibs end date (Feb 2026) against the actual timeline.
- [ ] **Skills** (`components/skills.tsx`): replace the badge wall with groups such as "Streaming & cloud (GCP)", "Backend (Node.js, Python / FastAPI)", "Data & queues", "Frontend", "Tooling", each tied to what was built with it.
- [ ] **GitHub calendar:** shrink, move to the bottom of the page, or remove. Low value for hiring managers. If kept, add a loading skeleton and an error fallback with no layout shift.
- [ ] **Contact** (new section): `mailto:` plus an optional form (Formspree / Web3Forms) via an env var. No secrets in the repo.
- [ ] **Résumé:** keep the Drive link in `lib/constant.ts` and also serve a PDF from `public/`.

## Phase 3: Projects and case studies

- [ ] Move project data out of `components/projects.tsx` into a typed `lib/projects.ts`.
- [ ] Add a `/projects/[slug]` case-study page for each major project, using static params so it works with static export. Use MDX or typed content.
- [ ] Case study structure: problem → architecture → key decisions and trade-offs → stack → outcome.
- [ ] **Infinity Learn live-class streaming case study** (once the data above is provided):
  - An interactive SVG architecture diagram of the streaming pipeline.
  - Generalized, with no internal names or numbers the employer hasn't cleared.
- [ ] Rewrite the generic `impact` bullets on the existing projects to be specific.
- [ ] Fix the Omnichannel project link (currently the GitHub profile root, not a repo).
- [ ] Give projects without an image a consistent placeholder or generated visual.
- [ ] Featured layout: one large featured card, compact cards for the rest.

## Phase 4: Design and interaction

- [ ] Keep the existing color tokens and theme. Refine one accent color, the type scale, spacing rhythm and card consistency.
- [ ] Check contrast against WCAG AA in both themes.
- [ ] Motion: add `motion` (Framer Motion's successor) only if the added weight is justified. Otherwise use CSS scroll-driven animations or the View Transitions API.
- [ ] All animation respects `prefers-reduced-motion`.
- [ ] **Navbar** (`components/navbar.tsx`): scroll-spy active state, correct anchor offset for the sticky header, keyboard- and touch-friendly mobile menu.
- [ ] **⌘K command palette** for navigation (optional, signature touch).
- [ ] Optional: lazy-loaded WebGL/canvas hero accent (off on mobile and under reduced motion).

## Phase 5: Images and visuals

**Done:**
- [x] Removed all five files from `public/` (`profile-image.png`, `profile-image.jpeg`, `coder-cartoon.png`, `pizza.png`, `whatsapp-broadcast.png`) and every `next/image` import that used them.
- [x] Hero photo → inline SVG request-flow diagram (`components/hero-visual.tsx`).
- [x] About photo → "RK" initials avatar.
- [x] Project screenshots → a text flow card per project, driven by a `flow` array in `components/projects.tsx`.

**Still to do:**
- [ ] Add generated visuals for new content: an SVG architecture diagram for the Infinity Learn streaming pipeline, and a Python / FastAPI service diagram if useful.
- [ ] Add a favicon and an Open Graph image (generated, e.g. `app/opengraph-image` or a static SVG→PNG), since `public/` is now empty.
- [ ] Keep every visual inline SVG or CSS so it scales, themes with light/dark, and costs almost no bytes. Add `role="img"` and an `aria-label` to each diagram.
- [ ] Optional, later: add a real photo (square, ≥ 800×800, natural light), converted to WebP, with explicit width and height.

## Phase 6: SEO, performance, accessibility

- [ ] Add `sitemap.xml` and `robots.txt` (static-export friendly) and a canonical URL.
- [ ] Add a real Open Graph / Twitter image, then set `twitter.card` to `summary_large_image`.
- [ ] Add JSON-LD `Person` structured data.
- [ ] Accessibility:
  - Skip-to-content link.
  - Landmarks and heading order.
  - Visible focus rings.
  - `aria-label` on icon-only buttons.
  - Full keyboard navigation.
- [ ] No horizontal scroll at 320px, and no layout shift from images, fonts or the GitHub calendar.
- [ ] Target Lighthouse mobile **≥ 95** in all four categories.

## Phase 7: Docs and release

- [ ] Update `README.md`: what the site is, how to run / build / deploy, and how to add a project or experience entry.
- [ ] Run `npm run lint` and `npm run build` (or the pnpm equivalents) with zero warnings, and serve `out/` locally to check it.
- [ ] Re-run Lighthouse and record before/after numbers.
- [ ] Merge to the deploy branch and run `deploy` **only after Rahul approves**.

---

## Definition of done

- Lint and build pass with zero warnings, and the static `out/` folder serves correctly.
- Lighthouse mobile ≥ 95 in all categories, or a short explanation for any that fall short.
- Every project card has a truthful, working link or an explicit "private" state.
- No fabricated employers, dates, metrics or testimonials. Every `TODO(rahul)` is either filled in or listed in the final report.
- Hero, Experience, Projects and Contact each make sense on their own in under 10 seconds.
- No photos or raster images in `public/` unless deliberately added. Every visual is inline SVG/CSS with an accessible label.
- Python / FastAPI and live-streaming work are visible in the hero, Experience, Skills and the case study.

## Suggested order of work

1. Answer the open questions above (the package manager and the Infinity Learn details unblock the most).
2. Phase 0 → Phase 1 (upgrade the foundation before changing the design).
3. Phase 2 (hero, Experience, Contact) next. It gives the biggest visible improvement. Phase 5 is already partly done.
4. Phase 3 (case studies), then Phase 4 (polish), then Phase 6 and Phase 7.
