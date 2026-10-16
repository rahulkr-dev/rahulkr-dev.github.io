"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Globe, Mail, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { EMAIL, GITHUB_URL, RESUME_DRIVE_URL } from "@/lib/constant";
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
};

type SpotlightProps = {
  apps: AppDef[];
  onOpenApp: (id: AppId) => void;
  onClose: () => void;
};

export function Spotlight({ apps, onOpenApp, onClose }: SpotlightProps) {
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
      href: `mailto:${EMAIL}`,
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
      key: "classic",
      label: "Classic website",
      kind: "Link",
      icon: Globe,
      keywords: "classic website regular 2d",
      href: "/classic/",
    },
  ];

  const term = query.trim().toLowerCase();
  const results = term
    ? entries.filter((entry) =>
        `${entry.label} ${entry.keywords}`.toLowerCase().includes(term)
      )
    : entries.slice(0, apps.length);

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
            placeholder="Search apps, projects, links"
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
                  <span>{entry.label}</span>
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
                      onClick={() => entry.appId && onOpenApp(entry.appId)}
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
