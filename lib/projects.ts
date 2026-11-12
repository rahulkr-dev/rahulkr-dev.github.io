export type ProjectShots = {
  /**
   * "browser" shows one wide screenshot at 4:3. "phone" shows up to three
   * tall ones at 9:20. Larger images are cropped from the top.
   */
  frame: "browser" | "phone";
  /** Files in `public/projects`, written as `/projects/<name>`. */
  images: { src: string; alt: string }[];
  /** Small label under the screenshots, such as "Design mockups". */
  note?: string;
};

export type Project = {
  title: string;
  eyebrow: string;
  description: string;
  /** Shown as a badge beside the title, such as "In development". */
  status?: string;
  /** Screenshots. A project without them shows its `flow` steps instead. */
  shots?: ProjectShots;
  flow: string[];
  technologies: string[];
  impact: string[];
  /** URL of this project's own repository. Leave unset while it is private. */
  sourceLink?: string;
  liveLink?: string;
};

export const projects: Project[] = [
  {
    title: "keyxray",
    eyebrow: "Touch-typing coach",
    description:
      "A typing coach for people stuck on a plateau. A 60-second test produces a Keyboard X-Ray showing which keys, letter pairs and fingers slow you down, and daily practice drills those weak spots.",
    shots: {
      frame: "browser",
      images: [
        {
          src: "/projects/keyxray-xray.webp",
          alt: "keyxray's X-Ray report: typing speed, accuracy and a keyboard coloured by how slow each key is",
        },
      ],
    },
    flow: ["60-second test", "Keyboard X-Ray", "Daily drills", "Progress chart"],
    technologies: [
      "SvelteKit",
      "TypeScript",
      "Tailwind CSS",
      "IndexedDB (Dexie)",
      "Cloudflare Pages",
      "Vitest",
      "Playwright",
    ],
    impact: [
      "Built a typing engine, separate from the UI, that times every keystroke and finds the slowest keys, letter pairs and fingers.",
      "Kept progress in the browser's IndexedDB, so the test and the report work without an account.",
      "Added practice beyond the test: ten classic books to type, code snippets, Spanish and French passages, and five keyboard layouts.",
    ],
    liveLink: "https://keyxray.pages.dev/",
  },
  {
    title: "Repzen",
    eyebrow: "Offline-first mobile app",
    description:
      "A gym tracker for Android, built for logging sets quickly between rests. Routines, set logging prefilled from the last session, a rest timer and history all work offline, and workouts sync to the cloud after sign-in.",
    shots: {
      frame: "phone",
      images: [
        {
          src: "/projects/repzen-routines.webp",
          alt: "Repzen's routines screen listing push, pull and leg days",
        },
        {
          src: "/projects/repzen-workout.webp",
          alt: "Repzen during a workout: sets logged for bench press with a rest timer running",
        },
        {
          src: "/projects/repzen-history.webp",
          alt: "Repzen's workout history screen",
        },
      ],
    },
    flow: ["Routines", "Log sets", "Rest timer", "Cloud sync"],
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "SQLite",
      "Drizzle ORM",
      "Zustand",
      "Next.js",
      "Neon Postgres",
      "Better Auth",
    ],
    impact: [
      "Made SQLite on the phone the source of truth, so a workout survives the app being closed mid-session.",
      "Built push and pull sync to a Next.js and Postgres backend, with last-write-wins and soft deletes.",
      "Released beta 0.2.0 as a downloadable Android build with phone-number login.",
    ],
    liveLink: "https://repzen-server.vercel.app/",
  },
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
  },
  {
    title: "LearnStreak",
    eyebrow: "Daily-practice learning app",
    status: "In development",
    description:
      "A daily-practice app for CBSE Class 10 Science: short lessons, quizzes and streaks on Android, with the app, the API and the website in one TypeScript monorepo. It is still being built and is not released yet.",
    shots: {
      frame: "phone",
      images: [
        {
          src: "/projects/learnstreak-home.webp",
          alt: "LearnStreak design for the home screen: a chapter card and a path of lessons",
        },
        {
          src: "/projects/learnstreak-quiz.webp",
          alt: "LearnStreak design for a quiz question about a chemical reaction, answered correctly",
        },
      ],
      note: "Design mockups",
    },
    flow: ["Onboarding quiz", "Lesson path", "Offline lessons", "Shared contracts"],
    technologies: [
      "React Native",
      "Expo",
      "NativeWind",
      "NestJS",
      "Fastify",
      "PostgreSQL",
      "Drizzle ORM",
      "Redis",
      "BullMQ",
      "Turborepo",
      "Zod",
    ],
    impact: [
      "Shared Zod API contracts and quiz-scoring rules between the app and the server as monorepo packages.",
      "Structured the NestJS API as a modular monolith with separate HTTP and background-worker entry points.",
      "Onboarding, the lesson path and multiple-choice lessons are built; sign-in, sync and deployment come next.",
    ],
  },
];
