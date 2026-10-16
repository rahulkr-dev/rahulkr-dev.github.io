"use client";

import { useState } from "react";
import {
  Briefcase,
  Check,
  Copy,
  FolderGit2,
  Mail,
  Phone,
  SquareTerminal,
  User,
  Wrench,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { experience } from "@/lib/experience";
import { projects } from "@/lib/projects";
import { skillGroups } from "@/lib/skills";
import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  RESUME_DRIVE_URL,
} from "@/lib/constant";
import { EDUCATION, LOCATION, NAME, NOW, ROLE, SUMMARY } from "@/lib/profile";
import { Terminal } from "./terminal";
import type { AppContext, AppDef, AppId } from "./types";

export const apps: AppDef[] = [
  {
    id: "about",
    title: "About Rahul",
    icon: User,
    gradient: "linear-gradient(145deg,#5ac8fa,#0a7aff)",
    width: 540,
    height: 450,
    x: 70,
    y: 40,
    render: (context) => <About context={context} />,
  },
  {
    id: "experience",
    title: "Experience",
    icon: Briefcase,
    gradient: "linear-gradient(145deg,#ffb36b,#ff6b3d)",
    width: 560,
    height: 440,
    x: 130,
    y: 58,
    render: () => <Experience />,
  },
  {
    id: "projects",
    title: "Projects",
    icon: FolderGit2,
    gradient: "linear-gradient(145deg,#b58cff,#6a4bff)",
    width: 740,
    height: 450,
    x: 150,
    y: 50,
    render: () => <Projects />,
  },
  {
    id: "skills",
    title: "Skills",
    icon: Wrench,
    gradient: "linear-gradient(145deg,#6be39a,#1fa95b)",
    width: 600,
    height: 430,
    x: 210,
    y: 66,
    render: () => <Skills />,
  },
  {
    id: "terminal",
    title: "Terminal - rahul@desk",
    icon: SquareTerminal,
    gradient: "linear-gradient(145deg,#4a4d55,#16171b)",
    theme: "dark",
    width: 600,
    height: 370,
    x: 250,
    y: 96,
    render: (context) => <Terminal context={context} />,
  },
  {
    id: "contact",
    title: "Contact",
    icon: Mail,
    gradient: "linear-gradient(145deg,#6fd3ff,#2a8bf2)",
    width: 480,
    height: 360,
    x: 300,
    y: 84,
    render: () => <Contact />,
  },
];

export const appById = Object.fromEntries(
  apps.map((app) => [app.id, app])
) as Record<AppId, AppDef>;

function About({ context }: { context: AppContext }) {
  return (
    <div className="mx-pad">
      <div className="mx-profile">
        <div className="mx-avatar" aria-hidden="true">
          RK
        </div>
        <div>
          <h2>{NAME}</h2>
          <div className="mx-sub">
            {ROLE} - {LOCATION}
          </div>
        </div>
      </div>
      <p style={{ marginTop: 16 }}>{SUMMARY}</p>
      <div className="mx-card mx-now">
        <div className="mx-live">Right now</div>
        <div>{NOW}</div>
      </div>
      <h3>Education</h3>
      <div>{EDUCATION.title}</div>
      <div className="mx-sub">{EDUCATION.period}</div>
      <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
        <button
          type="button"
          className="mx-btn mx-btn-primary"
          onClick={() => context.open("projects")}
        >
          See projects
        </button>
        <button
          type="button"
          className="mx-btn"
          onClick={() => context.open("contact")}
        >
          Get in touch
        </button>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <div className="mx-pad">
      <h2>Experience</h2>
      <div className="mx-timeline">
        {experience.map((item) => (
          <div key={`${item.company}-${item.period}`} data-current={item.current}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{item.company}</div>
            <div className="mx-sub">
              {item.role} - {item.period}
            </div>
            <p>{item.summary}</p>
            <ul>
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <div style={{ marginTop: 6 }}>
              {item.stack.split(", ").map((tech) => (
                <span key={tech} className="mx-chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];

  return (
    <div className="mx-split">
      <nav className="mx-side" aria-label="Projects">
        <h3>Projects</h3>
        {projects.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-current={index === selected}
            onClick={() => setSelected(index)}
          >
            {item.title}
          </button>
        ))}
      </nav>
      <div className="mx-detail">
        <div className="mx-sub">{project.eyebrow}</div>
        <h2 style={{ marginTop: 2 }}>{project.title}</h2>
        <p>{project.description}</p>
        <h3>Highlights</h3>
        <ul>
          {project.impact.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3>Stack</h3>
        <div>
          {project.technologies.map((tech) => (
            <span key={tech} className="mx-chip">
              {tech}
            </span>
          ))}
        </div>
        {project.sourceLink ? (
          <p style={{ marginTop: 16 }}>
            <a
              className="mx-btn"
              href={project.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </p>
        ) : null}
      </div>
    </div>
  );
}

function Skills() {
  return (
    <div className="mx-pad">
      <h2>Skills</h2>
      <div className="mx-grid-2" style={{ marginTop: 16 }}>
        {skillGroups.map((group) => (
          <div key={group.title} className="mx-card">
            <h3>{group.title}</h3>
            <div>
              {group.skills.map((skill) => (
                <span key={skill} className="mx-chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked; the visible link still works.
    }
  };

  return (
    <button type="button" className="mx-btn" onClick={copy}>
      {copied ? (
        <Check size={13} style={{ verticalAlign: -2 }} />
      ) : (
        <Copy size={13} style={{ verticalAlign: -2 }} />
      )}{" "}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function Contact() {
  const rows = [
    { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Phone, label: "Phone", value: PHONE_DISPLAY, href: PHONE_HREF },
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      value: "rahul-kumar-850b39232",
      href: LINKEDIN_URL,
    },
    { icon: GithubIcon, label: "GitHub", value: "rahulkr-dev", href: GITHUB_URL },
  ];

  return (
    <div className="mx-pad">
      <h2>Get in touch</h2>
      <div className="mx-sub">Open to full-stack and backend roles.</div>
      <div style={{ marginTop: 10 }}>
        {rows.map(({ icon: Icon, label, value, href }) => (
          <div key={label} className="mx-row">
            <div className="mx-row-icon">
              <Icon />
            </div>
            <div className="mx-row-main">
              <div>{label}</div>
              <a href={href} target="_blank" rel="noopener noreferrer">
                {value}
              </a>
            </div>
            {label === "Email" || label === "Phone" ? (
              <CopyButton value={value} />
            ) : null}
          </div>
        ))}
      </div>
      <p style={{ marginTop: 12 }}>
        <a
          className="mx-btn mx-btn-primary"
          href={RESUME_DRIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download resume
        </a>
      </p>
    </div>
  );
}
