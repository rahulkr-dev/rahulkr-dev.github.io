import {
  Bot,
  Braces,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers,
  ServerCog,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const skillGroups = [
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
    ],
  },
  {
    title: "Backend & APIs",
    icon: ServerCog,
    skills: [
      "Node.js",
      "Express.js",
      "Hono",
      "REST APIs",
      "WebSockets",
      "oRPC",
    ],
  },
  {
    title: "Architecture",
    icon: Layers,
    skills: [
      "Distributed Systems",
      "Multi-Tenant SaaS",
      "RBAC",
      "Turborepo",
      "Event-Driven Workflows",
    ],
  },
  {
    title: "Data & Queues",
    icon: Database,
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "BullMQ",
      "AWS SQS",
      "Drizzle ORM",
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      "AWS EC2",
      "AWS S3",
      "AWS IAM",
      "AWS Lambda",
      "Docker",
      "Cloudflare",
      "GitHub Actions",
    ],
  },
  {
    title: "AI Integrations",
    icon: Bot,
    skills: ["OpenAI", "Anthropic Claude", "Google Gemini", "LLM Workflows"],
  },
];

const coreStrengths = [
  {
    icon: GitBranch,
    title: "Async systems",
    text: "Bulk broadcasting, queue workers, retry flows, and event-driven jobs.",
  },
  {
    icon: Braces,
    title: "Type-safe delivery",
    text: "TypeScript-first APIs, reusable components, and maintainable monorepos.",
  },
  {
    icon: Cloud,
    title: "Production ownership",
    text: "Infrastructure setup, CI/CD, deployment automation, and release reliability.",
  },
];

export function Skills() {
  return (
    <section id="skills" className="bg-accent py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Skills
          </p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            A stack shaped by SaaS products, cloud workflows, and real-time
            systems.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            I work across the product surface, but my strongest value is
            connecting clean interfaces with reliable backend architecture.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map(({ title, icon: Icon, skills }) => (
            <div key={title} className="premium-card rounded-lg bg-background p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {coreStrengths.map(({ icon: Icon, title, text }) => (
            <div key={title} className="premium-card rounded-lg bg-background p-5">
              <Icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
