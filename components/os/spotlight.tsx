"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Briefcase, FolderGit2, Globe, Mail, Search, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import {
  EMAIL_HREF,
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME_DRIVE_URL,
} from "@/lib/constant";
import { experience } from "@/lib/experience";
import { projects } from "@/lib/projects";
import { skillGroups } from "@/lib/skills";
import type { AppDef, AppId } from "./types";

type Entry = {
  key: string;
  label: string;
  kind: string;
  icon: LucideIcon | typeof GithubIcon;
  keywords: string;
  /** Link entries render as real anchors; the rest open an app. */
  href?: string;
  external?: boolean;
  appId?: AppId;
  /** Opens the Projects app on this project. */
  projectIndex?: number;
};

/** Content results, found only by typing: projects, employers and skills. */
const contentEntries: Entry[] = [
  ...projects.map(
    (project, index): Entry => ({
      key: `project-${index}`,
      label: project.title,
      kind: "Project",
      icon: FolderGit2,
      keywords: `project ${project.eyebrow} ${project.technologies.join(" ")}`,
      projectIndex: index,
    })
  ),
  ...experience.map(
    (item): Entry => ({
      key: `experience-${item.company}`,
      label: item.company,
      kind: "Experience",
      icon: Briefcase,
      keywords: `work job ${item.role} ${item.period} ${item.stack}`,
      appId: "experience",
    })
  ),
  ...skillGroups.map(
    (group): Entry => ({
      key: `skills-${group.title}`,
      label: `${group.title} skills`,
      kind: "Skills",
      icon: Wrench,
      keywords: group.skills.join(" "),
      appId: "skills",
    })
  ),
];

type SpotlightProps = {
  apps: AppDef[];
  onOpenApp: (id: AppId) => void;
  onOpenProject: (index: number) => void;
  onClose: () => void;
};

export function Spotlight({
  apps,
  onOpenApp,
  onOpenProject,
  onClose,
}: SpotlightProps) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const list = useRef<HTMLUListElement>(null);

  const entries: Entry[] = [
    ...apps.map(
      (app): Entry => ({
        key: app.id,
        label: app.title,
        kind: "Application",
        icon: app.icon,
        keywords: `${app.id} ${app.title}`,
        appId: app.id,
      })
    ),
    {
      key: "email",
      label: "Email Rahul",
      kind: "Action",
      icon: Mail,
      keywords: "email mail contact hire",
      href: EMAIL_HREF,
      external: true,
    },
    {
      key: "resume",
      label: "Open resume",
      kind: "Action",
      icon: Globe,
      keywords: "resume cv pdf",
      href: RESUME_DRIVE_URL,
      external: true,
    },
    {
      key: "github",
      label: "GitHub profile",
      kind: "Link",
      icon: GithubIcon,
      keywords: "github code repositories",
      href: GITHUB_URL,
      external: true,
    },
    {
      key: "linkedin",
      label: "LinkedIn profile",
      kind: "Link",
      icon: LinkedinIcon,
      keywords: "linkedin connect network",
      href: LINKEDIN_URL,
      external: true,
    },
    {
      key: "classic",
      label: "Classic website",
      kind: "Link",
      icon: Globe,
      keywords: "classic website regular 2d",
      href: "/classic/",
    },
    ...contentEntries,
  ];

  // Every typed word has to appear somewhere in the entry.
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = words.length
    ? entries.filter((entry) => {
        const haystack = `${entry.label} ${entry.keywords}`.toLowerCase();
        return words.every((word) => haystack.includes(word));
      })
    : entries.slice(0, apps.length);

  // Keep the highlighted row in view while moving with the arrow keys.
  useEffect(() => {
    const box = list.current;
    const row = box?.querySelector<HTMLElement>('[aria-selected="true"]')
      ?.parentElement;
    if (!box || !row) return;
    const top = row.offsetTop;
    const bottom = top + row.offsetHeight;
    if (top < box.scrollTop) {
      box.scrollTop = top - 6;
    } else if (bottom > box.scrollTop + box.clientHeight) {
      box.scrollTop = bottom - box.clientHeight + 6;
    }
  }, [index]);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIndex((value) => Math.min(results.length - 1, value + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIndex((value) => Math.max(0, value - 1));
    } else if (event.key === "Enter") {
      list.current
        ?.querySelector<HTMLElement>('[aria-selected="true"]')
        ?.click();
    }
  };

  return (
    <div className="mx-spot" onMouseDown={onClose}>
      <div
        className="mx-spot-box"
        role="dialog"
        aria-label="Spotlight search"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mx-spot-input">
          <Search size={20} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search apps, projects, skills, links"
            aria-label="Search"
            autoFocus
            spellCheck={false}
          />
        </div>
        {results.length ? (
          <ul className="mx-spot-list" role="listbox" ref={list}>
            {results.map((entry, position) => {
              const Icon = entry.icon;
              const content = (
                <>
                  <Icon />
                  <span className="mx-spot-label">{entry.label}</span>
                  <span className="mx-sub mx-spot-kind">{entry.kind}</span>
                </>
              );
              const shared = {
                role: "option",
                "aria-selected": position === index,
                onMouseEnter: () => setIndex(position),
              };
              return (
                <li key={entry.key}>
                  {entry.href ? (
                    <a
                      {...shared}
                      href={entry.href}
                      target={entry.external ? "_blank" : undefined}
                      rel={entry.external ? "noopener noreferrer" : undefined}
                      onClick={onClose}
                    >
                      {content}
                    </a>
                  ) : (
                    <button
                      {...shared}
                      type="button"
                      onClick={() => {
                        if (entry.projectIndex !== undefined) {
                          onOpenProject(entry.projectIndex);
                        } else if (entry.appId) {
                          onOpenApp(entry.appId);
                        }
                      }}
                    >
                      {content}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mx-spot-empty">No results for &quot;{query}&quot;</div>
        )}
      </div>
    </div>
  );
}
