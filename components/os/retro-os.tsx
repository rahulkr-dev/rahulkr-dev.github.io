"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  FileText,
  FolderGit2,
  Globe,
  Mail,
  Power,
  User,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
import "./retro-os.css";

type WindowId = "about" | "experience" | "projects" | "skills" | "contact";

type AppEntry = {
  id: WindowId;
  label: string;
  title: string;
  icon: LucideIcon;
  width: number;
  height: number;
  render: () => React.ReactNode;
};

const apps: AppEntry[] = [
  {
    id: "about",
    label: "About.txt",
    title: "About - Notepad",
    icon: User,
    width: 560,
    height: 400,
    render: () => <About />,
  },
  {
    id: "experience",
    label: "Experience",
    title: "Experience - Explorer",
    icon: Briefcase,
    width: 600,
    height: 430,
    render: () => <Experience />,
  },
  {
    id: "projects",
    label: "Projects",
    title: "Projects - Explorer",
    icon: FolderGit2,
    width: 620,
    height: 440,
    render: () => <Projects />,
  },
  {
    id: "skills",
    label: "Skills.exe",
    title: "Skills - Properties",
    icon: Wrench,
    width: 540,
    height: 410,
    render: () => <Skills />,
  },
  {
    id: "contact",
    label: "Contact",
    title: "Contact - Mail",
    icon: Mail,
    width: 480,
    height: 340,
    render: () => <Contact />,
  },
];

const appById = Object.fromEntries(apps.map((app) => [app.id, app])) as Record<
  WindowId,
  AppEntry
>;

const TASKBAR_HEIGHT = 34;
const SCREEN = { width: 800, height: 600 };

export function RetroOS({ onShutDown }: { onShutDown: () => void }) {
  const [booted, setBooted] = useState(false);
  const [open, setOpen] = useState<WindowId[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [clock, setClock] = useState(() => formatClock());

  useEffect(() => {
    const boot = window.setTimeout(() => {
      setBooted(true);
      setOpen(["about"]);
    }, 1300);
    return () => window.clearTimeout(boot);
  }, []);

  useEffect(() => {
    const tick = window.setInterval(() => setClock(formatClock()), 15_000);
    return () => window.clearInterval(tick);
  }, []);

  // Opening or focusing moves the window to the end of the list (top of stack).
  const focus = (id: WindowId) => {
    setOpen((current) => [...current.filter((item) => item !== id), id]);
    setMenuOpen(false);
  };
  const close = (id: WindowId) =>
    setOpen((current) => current.filter((item) => item !== id));
  const activeId = open[open.length - 1];

  if (!booted) {
    return (
      <div className="retro-os">
        <div className="os-splash">
          <div>RK-OS 2026</div>
          <div className="os-splash-bar" aria-hidden="true">
            <span />
          </div>
          <div className="os-muted" style={{ color: "#8fb8a6" }}>
            Starting up...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="retro-os" onClick={() => setMenuOpen(false)}>
      <div className="os-icons">
        {apps.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className="os-icon"
            onClick={(event) => {
              event.stopPropagation();
              focus(id);
            }}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
        <a
          className="os-icon"
          href={RESUME_DRIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileText aria-hidden="true" />
          <span>Resume.pdf</span>
        </a>
      </div>

      {open.map((id, index) => {
        const app = appById[id];
        return (
          <section
            key={id}
            className="os-window"
            data-active={id === activeId}
            style={{
              width: app.width,
              height: Math.min(app.height, SCREEN.height - TASKBAR_HEIGHT - 12),
              left: 110 + (index % 4) * 28,
              top: 10 + (index % 4) * 22,
              zIndex: index + 1,
            }}
            onMouseDown={() => focus(id)}
            aria-label={app.title}
          >
            <div className="os-titlebar">
              <span>{app.title}</span>
              <button
                type="button"
                className="os-btn"
                aria-label={`Close ${app.label}`}
                onClick={(event) => {
                  event.stopPropagation();
                  close(id);
                }}
              >
                x
              </button>
            </div>
            <div className="os-body">{app.render()}</div>
          </section>
        );
      })}

      {menuOpen ? (
        <div className="os-menu" onClick={(event) => event.stopPropagation()}>
          {apps.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" onClick={() => focus(id)}>
              <Icon size={16} aria-hidden="true" />
              {label}
            </button>
          ))}
          <a href="/classic">
            <Globe size={16} aria-hidden="true" />
            Classic website
          </a>
          <hr />
          <button type="button" onClick={onShutDown}>
            <Power size={16} aria-hidden="true" />
            Shut down...
          </button>
        </div>
      ) : null}

      <div className="os-taskbar">
        <button
          type="button"
          className="os-btn os-start"
          onClick={(event) => {
            event.stopPropagation();
            setMenuOpen((value) => !value);
          }}
        >
          Start
        </button>
        {open.map((id) => (
          <button
            key={id}
            type="button"
            className="os-btn os-task"
            data-active={id === activeId}
            onClick={(event) => {
              event.stopPropagation();
              focus(id);
            }}
          >
            {appById[id].label}
          </button>
        ))}
        <div className="os-clock">{clock}</div>
      </div>
    </div>
  );
}

function formatClock() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function About() {
  return (
    <>
      <h2>Rahul Kumar</h2>
      <p className="os-muted">Full-Stack Engineer - Delhi, India</p>
      <hr className="os-rule" />
      <p>
        I build production systems: APIs, queues, databases, cloud deployments
        and the interfaces on top of them. My strongest work is in products
        that need reliability behind the UI.
      </p>
      <p>
        Right now I am at <strong>Infinity Learn</strong>, deploying the
        live-class streaming feature on Google Cloud and building backend
        services in Python with FastAPI.
      </p>
      <h3>Education</h3>
      <p>Full Stack Web Development - Masai School (Feb 2022 - Mar 2023)</p>
      <p className="os-muted">
        Tip: open the other icons on the desktop, or use Start.
      </p>
    </>
  );
}

function Experience() {
  return (
    <>
      {experience.map((item, index) => (
        <div key={`${item.company}-${item.period}`}>
          {index > 0 ? <hr className="os-rule" /> : null}
          <h2>
            {item.company}
            {item.current ? <span className="os-badge">Current</span> : null}
          </h2>
          <p className="os-muted">
            {item.role} - {item.period}
          </p>
          <p>{item.summary}</p>
          <ul>
            {item.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <p className="os-muted">Stack: {item.stack}</p>
        </div>
      ))}
    </>
  );
}

function Projects() {
  return (
    <>
      {projects.map((project, index) => (
        <div key={project.title}>
          {index > 0 ? <hr className="os-rule" /> : null}
          <h2>{project.title}</h2>
          <p className="os-muted">{project.eyebrow}</p>
          <p>{project.description}</p>
          <p>
            {project.technologies.map((tech) => (
              <span key={tech} className="os-tag">
                {tech}
              </span>
            ))}
          </p>
          <ul>
            {project.impact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {project.sourceLink ? (
            <p>
              <a href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </p>
          ) : null}
        </div>
      ))}
    </>
  );
}

function Skills() {
  return (
    <>
      {skillGroups.map((group) => (
        <div key={group.title}>
          <h3>{group.title}</h3>
          <p>
            {group.skills.map((skill) => (
              <span key={skill} className="os-tag">
                {skill}
              </span>
            ))}
          </p>
        </div>
      ))}
    </>
  );
}

function Contact() {
  return (
    <>
      <h2>Get in touch</h2>
      <p className="os-muted">Open to full-stack and backend roles.</p>
      <hr className="os-rule" />
      <p>
        Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
      <p>
        Phone: <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
      </p>
      <p>
        LinkedIn:{" "}
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          rahul-kumar-850b39232
        </a>
      </p>
      <p>
        GitHub:{" "}
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          rahulkr-dev
        </a>
      </p>
      <p>
        <a href={RESUME_DRIVE_URL} target="_blank" rel="noopener noreferrer">
          Download resume
        </a>
      </p>
    </>
  );
}
