export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  summary: string;
  bullets: string[];
  stack: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Full Stack Developer",
    company: "Infinity Learn",
    period: "Aug 2026 - Present",
    current: true,
    summary:
      "Working on the live-class platform: deploying the live-class streaming feature on Google Cloud and building backend services in Python.",
    bullets: [
      "Responsible for deploying the live-class streaming feature to production on Google Cloud.",
      "Build and ship backend services in Python with FastAPI.",
    ],
    stack: "Python, FastAPI, Google Cloud",
  },
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
    stack:
      "TypeScript, React, Next.js, Node.js, PostgreSQL, Redis, AWS, Docker, Cloudflare",
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
