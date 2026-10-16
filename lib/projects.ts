import { GITHUB_URL } from "@/lib/constant";

export type Project = {
  title: string;
  eyebrow: string;
  description: string;
  flow: string[];
  technologies: string[];
  impact: string[];
  sourceLink?: string;
  liveLink?: string;
};

export const projects: Project[] = [
  {
    title: "Omnichannel Customer Support Platform",
    eyebrow: "Production-grade SaaS architecture",
    description:
      "A type-safe customer support platform for unified conversations across channels, built around serverless APIs, multi-tenant authentication, event-driven workflows, and globally stored assets.",
    flow: ["Channel intake", "Type-safe API", "Workflow engine", "Tenant data"],
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
    flow: ["Broadcast API", "BullMQ queue", "Workers + retries", "Meta Cloud API"],
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
    flow: ["Catalog and cart", "Order service", "Kafka events", "Live order status"],
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
