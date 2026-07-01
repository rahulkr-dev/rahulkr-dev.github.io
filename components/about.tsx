import Image from "next/image";
import {
  Bot,
  Briefcase,
  Calendar,
  CheckCircle2,
  Cloud,
  Database,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import profileImage from "@/public/profile-image.png";

const highlights = [
  "Architected multi-tenant CRM modules with RBAC-enforced security.",
  "Built BullMQ and SQS messaging pipelines processing 50k+ daily broadcasts.",
  "Integrated OpenAI, Anthropic Claude, and Gemini for autonomous query triage.",
  "Optimized APIs with Redis caching and PostgreSQL indexing under load.",
];

const experience = [
  {
    role: "Full Stack Developer",
    company: "Brainvibs Technologies Pvt Ltd (Veblika)",
    period: "Aug 2023 - Feb 2026",
    summary:
      "Owned product architecture, backend services, cloud delivery, and automation workflows for production SaaS systems.",
    bullets: [
      "Architected a modular multi-tenant CRM platform with secure role-based access control.",
      "Engineered a bulk broadcasting system using BullMQ and AWS SQS with 99.9% delivery reliability.",
      "Shipped LLM-powered chatbot workflows using OpenAI, Anthropic, and Gemini APIs.",
      "Managed AWS, Docker, Cloudflare, and GitHub Actions deployments for reliable releases.",
    ],
    stack: "TypeScript, React, Next.js, Node.js, PostgreSQL, Redis, AWS, Docker, Cloudflare",
  },
  {
    role: "Full Stack Developer",
    company: "CNS Web Tech",
    period: "Mar 2023 - Aug 2023",
    summary:
      "Built REST APIs and reusable frontend systems for client-facing applications in a fast-paced engineering team.",
    bullets: [
      "Developed Node.js and Express APIs for authentication, data modeling, and application workflows.",
      "Created React and Tailwind component patterns that reduced duplicate UI code.",
      "Collaborated through sprint planning, code review, documentation, and production handoffs.",
    ],
    stack: "React, Tailwind CSS, Node.js, Express, MongoDB, REST APIs",
  },
];

const focusAreas = [
  {
    icon: ShieldCheck,
    title: "SaaS Architecture",
    text: "Multi-tenant modules, RBAC, workflow builders, and product-ready backend boundaries.",
  },
  {
    icon: Cloud,
    title: "Cloud Delivery",
    text: "AWS, Docker, Cloudflare, GitHub Actions, static exports, and reliable deployment pipelines.",
  },
  {
    icon: Database,
    title: "Data & Queues",
    text: "PostgreSQL, MongoDB, Redis, BullMQ, SQS, indexing, caching, and async processing.",
  },
  {
    icon: Bot,
    title: "AI Integrations",
    text: "OpenAI, Anthropic Claude, and Gemini workflows for support automation and query triage.",
  },
];

export function About() {
  return (
    <section id="about" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              About
            </p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Backend-heavy full-stack engineering for SaaS, automation, and
              support systems.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              I am Rahul Kumar, a full-stack engineer in Delhi focused on
              production systems: APIs, queues, databases, cloud deployments,
              and clean React interfaces. My strongest work is in products that
              need reliability behind the UI.
            </p>
            <div className="mt-8 flex items-center gap-5 rounded-lg border bg-accent p-5">
              <Image
                className="h-20 w-20 rounded-full object-cover"
                src={profileImage}
                alt="Rahul Kumar"
                width={80}
                height={80}
                sizes="80px"
              />
              <div>
                <h3 className="text-xl font-bold">Rahul Kumar</h3>
                <p className="mt-1 text-muted-foreground">
                  Full-Stack Engineer
                </p>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1.5 h-4 w-4" />
                  <span>Delhi, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {focusAreas.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-lg border p-5">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-lg border bg-accent p-6 sm:p-8">
          <h3 className="text-2xl font-bold">Selected impact</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {highlights.map((item) => (
              <div key={item} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <p className="text-sm leading-6 text-muted-foreground">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold">Experience</h3>
          <div className="mt-6 space-y-6">
            {experience.map((item) => (
              <article key={item.company} className="rounded-lg border p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <h4 className="text-xl font-semibold">{item.role}</h4>
                    </div>
                    <p className="mt-2 font-medium text-muted-foreground">
                      {item.company}
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1.5 h-4 w-4" />
                    <span>{item.period}</span>
                  </div>
                </div>
                <p className="mt-4 leading-7 text-muted-foreground">
                  {item.summary}
                </p>
                <ul className="mt-4 space-y-2">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-6 text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-medium text-foreground">
                  Stack: {item.stack}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-lg border p-6">
          <h3 className="text-2xl font-bold">Education</h3>
          <p className="mt-3 font-medium text-muted-foreground">
            Full Stack Web Development - Masai School
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Feb 2022 - Mar 2023
          </p>
          <p className="mt-4 leading-7 text-muted-foreground">
            Intensive program covering data structures and algorithms,
            JavaScript, React, Node.js, MongoDB, system design, and
            collaborative engineering practices.
          </p>
        </div>
      </div>
    </section>
  );
}
