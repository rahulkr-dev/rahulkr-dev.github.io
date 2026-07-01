import Image, { StaticImageData } from "next/image";
import { ExternalLink, Github, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import pizzaImage from "@/public/pizza.png";
import whatsappImage from "@/public/whatsapp-broadcast.png";
import { GITHUB_URL } from "@/lib/constant";

type Project = {
  title: string;
  eyebrow: string;
  description: string;
  image?: StaticImageData;
  technologies: string[];
  impact: string[];
  sourceLink?: string;
  liveLink?: string;
};

const projects: Project[] = [
  {
    title: "Omnichannel Customer Support Platform",
    eyebrow: "Production-grade SaaS architecture",
    description:
      "A type-safe customer support platform for unified conversations across channels, built around serverless APIs, multi-tenant authentication, event-driven workflows, and globally stored assets.",
    technologies: [
      "TypeScript",
      "Turborepo",
      "Hono",
      "Cloudflare Workers",
      "Inngest",
      "Drizzle ORM",
      "PostgreSQL",
      "Better Auth",
      "TanStack Start",
      "oRPC",
      "Cloudflare R2",
    ],
    impact: [
      "Designed a serverless monorepo architecture with type-safe API and database boundaries.",
      "Implemented secure multi-tenant authentication and event-driven workflow automation.",
      "Built for scalable support operations across multiple customer communication channels.",
    ],
    sourceLink: GITHUB_URL,
  },
  {
    title: "WhatsApp Message Broadcast System",
    eyebrow: "High-throughput messaging",
    description:
      "A backend service for programmatic WhatsApp broadcasts using Meta's Cloud API, queue-backed workers, Redis state, Dockerized deployment, and AWS storage.",
    image: whatsappImage,
    technologies: [
      "Node.js",
      "Express",
      "Meta WhatsApp API",
      "BullMQ",
      "Redis",
      "AWS S3",
      "Docker",
    ],
    impact: [
      "Processed bulk broadcast workloads with retry-friendly asynchronous workers.",
      "Supported reliable delivery patterns for high-volume customer messaging.",
      "Separated API, worker, cache, and storage responsibilities for operational clarity.",
    ],
    sourceLink: GITHUB_URL,
  },
  {
    title: "Online Pizza Delivery Platform",
    eyebrow: "Full-stack commerce workflow",
    description:
      "A full-stack ordering application with authentication, product catalog, order management, payment flow, real-time updates, and containerized services.",
    image: pizzaImage,
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Kafka",
      "S3",
      "Tailwind CSS",
      "Docker",
      "WebSockets",
    ],
    impact: [
      "Modeled core commerce flows from catalog browsing through order updates.",
      "Used real-time communication patterns for order status visibility.",
      "Practiced production-style service boundaries across frontend, API, data, and storage.",
    ],
    sourceLink: GITHUB_URL,
  },
];

export function Projects() {
  return (
    <section id="projects" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Projects
          </p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Case studies that show architecture, not just screens.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            These projects emphasize systems thinking: queues, auth, cloud
            deployment, data modeling, and reliable user-facing workflows.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {projects.map((project) => (
            <article
              key={project.title}
              className="overflow-hidden rounded-lg border bg-card"
            >
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <ProjectVisual project={project} />
                <div className="p-6 sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                    {project.eyebrow}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold">{project.title}</h3>
                  <p className="mt-4 leading-7 text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <ul className="mt-6 space-y-2">
                    {project.impact.map((item) => (
                      <li
                        key={item}
                        className="text-sm leading-6 text-muted-foreground"
                      >
                        <span className="mr-2 text-primary">-</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    {project.sourceLink ? (
                      <Button variant="outline" asChild>
                        <a
                          href={project.sourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </a>
                      </Button>
                    ) : null}
                    {project.liveLink ? (
                      <Button variant="outline" asChild>
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live demo
                        </a>
                      </Button>
                    ) : null}
                    <Button asChild>
                      <a href="mailto:rkrahul8181@gmail.com?subject=Portfolio%20project%20walkthrough">
                        <Mail className="h-4 w-4" />
                        Request walkthrough
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative min-h-72 bg-accent lg:min-h-full">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-72 items-center bg-accent p-6 sm:p-8">
      <div className="w-full rounded-lg border bg-background p-5 shadow-sm">
        <div className="grid gap-3">
          {["Channel intake", "Type-safe API", "Workflow engine", "Tenant data"].map(
            (item, index) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <span className="text-sm font-medium">{item}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  0{index + 1}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
