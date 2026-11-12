# Rahul Kumar - Portfolio

Live site: **https://rahulkr-dev.github.io**

A portfolio built as an interactive 3D desk. Visitors go "live" from a broadcast-style start screen, land in a lit room, sit down at a desk and use a macOS-style computer to browse experience, projects and skills. Phones and browsers without WebGL get a fast, regular site instead.

## What's inside

**The 3D desk (`/`)**
- A start screen styled like a live stream: tally light, lower-third caption, stack ticker, a 3-2-1 countdown and a "Go live" button. Any key skips it, and repeat visits in the same session skip the countdown. A "Skip to the classic site" link is there for visitors in a hurry.
- A modern desk scene built entirely from code (no model files): standing desk, flat monitor, lamp, headphones, chair, plants, shelf and wall art, with soft shadows, ambient occlusion and bloom.
- Click the scene (or press `Enter`) and the camera moves to the monitor, where a macOS-style desktop runs:
  - menu bar, dock with magnification, and draggable windows with close, minimize and zoom
  - **Spotlight** search with `Ctrl/Cmd + K`: finds apps, links, projects, employers and skills (try `redis`)
  - a working **Terminal** with Tab completion (try `help`, `whoami`, `projects`, `open projects 2`, `sudo hire-me`)
  - apps for About, Experience, Projects, Skills and Contact
- **Night mode**: the "Lights off" button (or `N` at the desk, `lights off` in the Terminal, or the system menu) dims the room so the lamp and the screen light the desk. The choice is remembered.
- `Esc` closes Spotlight first, then goes back to the desk.

**The classic site (`/classic/`)**
A conventional single-page portfolio with the same content: hero, about, experience, skills, projects, GitHub contribution graph and contact. It is also the fallback for small screens (under 768px), browsers without WebGL, and any 3D render error.

## Tech stack

| Area | Tools |
|---|---|
| Framework | Next.js 16 (App Router, static export), React 19, TypeScript |
| 3D | three.js, React Three Fiber, drei, postprocessing (N8AO, bloom, tone mapping) |
| Styling | Tailwind CSS 3, shadcn-style components on Radix UI, lucide-react |
| Tooling | pnpm, ESLint 10 (flat config), gh-pages |

## Getting started

Requirements: Node.js 20.9 or newer (developed on Node 24) and pnpm 12 (pinned in `package.json` and `mise.toml`).

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Command | What it does |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Create the static export in `out/` |
| `pnpm lint` | Run ESLint |
| `pnpm run deploy` | Build and publish `out/` to the `gh-pages` branch |

Use `pnpm run deploy`, not `pnpm deploy`: `deploy` is also a built-in pnpm command.

## Editing the content

Most content lives in `lib/`. Experience, projects, skills and the links are shared by the classic site and the 3D desktop.

| File | Controls |
|---|---|
| `lib/experience.ts` | Work history (the entry with `current: true` is shown as the current role) |
| `lib/projects.ts` | Projects, in the order they are shown. Set `sourceLink` and `liveLink` to show the GitHub and live-site buttons, `status` for a badge such as "In development", and `shots` to show screenshots from `public/projects/` (a project without them shows its `flow` steps instead) |
| `lib/skills.ts` | Skill groups |
| `lib/profile.ts` | Name, role, summary and the "right now" line. `ROLE` is the job title used on every page and in the page title |
| `lib/constant.ts` | Site URL, email, phone, GitHub, LinkedIn and resume links |

The classic hero and About text live in `components/home.tsx` and `components/about.tsx`. The start screen's stack ticker is in `components/desk/boot-screen.tsx`.

The link preview image, `app/opengraph-image.jpg` (1200x630), is a screenshot of the desk with the name and role drawn on it. Replace the file if either changes; its alt text is in `app/opengraph-image.alt.txt`.

## Project structure

```
app/
  page.tsx            3D desk home page
  classic/            the regular site (own layout with the navbar)
  not-found.tsx       404 page
  sitemap.ts, robots.ts, opengraph-image.jpg    search and link-preview files
components/
  desk/               3D scene, room, effects, start screen
  os/                 the macOS-style desktop (window manager, dock, Terminal, Spotlight)
  ui/                 shared UI primitives
lib/                  content and constants
```

Useful places when tuning the scene:
- `components/desk/layout.ts`: camera positions, field of view and where the OS is projected onto the monitor.
- `components/desk/desk-set.tsx`: desk, monitor, lamp, chair and plants.
- `components/desk/room.tsx`: floor, wall, shelf and art.
- `components/desk/effects.tsx`: post-processing.
- `components/desk/scene.tsx`: the day and night moods (`MOODS`) for sun, sky and background. The night-only lamp, screen and wall lights use `useFadingLight` from `components/desk/night.ts`.

## How the 3D page works

- three.js is loaded lazily on `/` only, while the start screen plays, so `/classic/` does not pay for it.
- The desktop is regular React rendered into the 3D scene with CSS 3D, so its text stays crisp, selectable and keyboard-accessible.
- If the GPU struggles, post-processing is switched off and the pixel ratio drops to 1.
- Reduced-motion users skip the countdown and camera sway. `/` also carries real text (summary, experience, projects) for crawlers and screen readers, and the layout adds `Person` structured data.
- The desktop is inert until the camera is on the monitor, so Tab never lands on a screen too small to read.
- Developed and tested in Chromium. Safari and Firefox have not been tested.

## Deployment

The site is a static export hosted on GitHub Pages.

- Source code lives on the `latest` branch.
- Pages serves the **`gh-pages` branch root**, which holds only build output.
- `pnpm run deploy` builds the site, commits `out/` to `gh-pages` and pushes it (a `.nojekyll` file is added so Pages serves `_next/`).

```bash
pnpm lint && pnpm build        # sanity check
git config user.name "Your Name"          # once per clone, if git has no identity
git config user.email "you@example.com"
pnpm run deploy
```

Pages can take a few minutes to update. To roll back, push an earlier `gh-pages` commit back to the branch.

## Ideas for later

- A "Live" app on the desktop that shows how the live-class streaming pipeline works.
- Optional sound.
