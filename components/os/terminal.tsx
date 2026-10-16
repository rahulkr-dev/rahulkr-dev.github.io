"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { experience } from "@/lib/experience";
import { projects } from "@/lib/projects";
import { skillGroups } from "@/lib/skills";
import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  PHONE_DISPLAY,
  RESUME_DRIVE_URL,
} from "@/lib/constant";
import { LOCATION, NAME, NOW, ROLE, SUMMARY } from "@/lib/profile";
import type { AppContext, AppId } from "./types";

type Line = { kind: "cmd" | "out"; text: string };

const OPENABLE: AppId[] = ["about", "experience", "projects", "skills", "contact"];

const BANNER = [
  `${NAME} - interactive terminal`,
  "Type 'help' to see what you can do.",
];

function run(raw: string, context: AppContext): string[] | "clear" {
  const [command = "", ...args] = raw.trim().split(/\s+/);

  switch (command.toLowerCase()) {
    case "":
      return [];
    case "help":
      return [
        "Available commands:",
        "  help         show this list",
        "  whoami       who I am",
        "  about        a short bio",
        "  experience   where I have worked",
        "  projects     things I have built",
        "  skills       tools I use",
        "  contact      how to reach me",
        "  resume       link to my resume",
        "  open <app>   open an app: " + OPENABLE.join(", "),
        "  ls           list apps",
        "  date         current date and time",
        "  clear        clear the screen",
      ];
    case "whoami":
      return [`${NAME.toLowerCase().replace(" ", ".")} - ${ROLE}, ${LOCATION}`];
    case "about":
      return [SUMMARY, "", `Now at ${NOW}`];
    case "experience":
      return experience.flatMap((item) => [
        `${item.company}${item.current ? " (current)" : ""}`,
        `  ${item.role}, ${item.period}`,
        `  ${item.stack}`,
        "",
      ]);
    case "projects":
      return [
        ...projects.flatMap((project) => [
          project.title,
          `  ${project.eyebrow}`,
          "",
        ]),
        "Tip: 'open projects' shows the details.",
      ];
    case "skills":
      return skillGroups.map(
        (group) => `${group.title.padEnd(16)} ${group.skills.join(", ")}`
      );
    case "contact":
      return [
        `Email     ${EMAIL}`,
        `Phone     ${PHONE_DISPLAY}`,
        `LinkedIn  ${LINKEDIN_URL}`,
        `GitHub    ${GITHUB_URL}`,
      ];
    case "resume":
      return [RESUME_DRIVE_URL];
    case "ls":
      return [OPENABLE.join("  ") + "  terminal"];
    case "date":
      return [new Date().toString()];
    case "clear":
      return "clear";
    case "open": {
      const target = args[0]?.toLowerCase() as AppId | undefined;
      if (target && OPENABLE.includes(target)) {
        context.open(target);
        return [`Opening ${target}...`];
      }
      return [`usage: open <${OPENABLE.join("|")}>`];
    }
    case "sudo":
      if (args[0] === "hire-me") {
        return [
          "[sudo] password for recruiter: ********",
          "Access granted. Great choice.",
          `Say hello: ${EMAIL}`,
        ];
      }
      return ["Nice try. This is a portfolio, not a server."];
    default:
      return [`zsh: command not found: ${command}`];
  }
}

const LINK = /(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.]+)/g;

function Linkified({ text }: { text: string }) {
  return (
    <>
      {text.split(LINK).map((part, index) => {
        if (index % 2 === 0) return part;
        const href = part.includes("://") ? part : `mailto:${part}`;
        return (
          <a key={index} href={href} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      })}
    </>
  );
}

export function Terminal({ context }: { context: AppContext }) {
  const [lines, setLines] = useState<Line[]>(() =>
    BANNER.map((text) => ({ kind: "out", text }))
  );
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = box.current?.parentElement;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const submit = () => {
    const raw = value;
    const result = run(raw, context);
    history.current.push(raw);
    cursor.current = history.current.length;
    setValue("");
    if (result === "clear") {
      setLines([]);
      return;
    }
    setLines((current) => [
      ...current,
      { kind: "cmd", text: raw },
      ...result.map((text): Line => ({ kind: "out", text })),
    ]);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submit();
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = cursor.current + (event.key === "ArrowUp" ? -1 : 1);
      const clamped = Math.max(0, Math.min(history.current.length, next));
      cursor.current = clamped;
      setValue(history.current[clamped] ?? "");
    }
  };

  return (
    <div className="mx-term" ref={box} onClick={() => input.current?.focus()}>
      {lines.map((line, index) => (
        <div key={index} className="mx-term-line">
          {line.kind === "cmd" ? (
            <>
              <Prompt />
              {line.text}
            </>
          ) : (
            <Linkified text={line.text} />
          )}
        </div>
      ))}
      <div className="mx-term-input">
        <span>
          <Prompt />
        </span>
        <input
          ref={input}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal input"
        />
      </div>
    </div>
  );
}

function Prompt() {
  return (
    <>
      <span className="mx-prompt">rahul@desk</span>{" "}
      <span className="mx-prompt-path">~</span> %{" "}
    </>
  );
}
