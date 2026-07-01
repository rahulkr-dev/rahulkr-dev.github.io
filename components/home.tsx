import Image from "next/image";
import Link from "next/link";
import { ArrowDown, FileText, Github, Linkedin, Mail } from "lucide-react";
import picture from "@/public/profile-image.png";
import { GITHUB_URL, LINKEDIN_URL, RESUME_DRIVE_URL } from "@/lib/constant";
import { cn } from "@/lib/utils";

const impactStats = [
  { value: "3 yrs", label: "production engineering" },
  { value: "50k+", label: "daily messages processed" },
  { value: "99.9%", label: "broadcast delivery reliability" },
];

export function Home() {
  return (
    <section className="bg-accent px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Full-Stack Engineer
          </p>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Rahul Kumar
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
            I build scalable SaaS platforms, real-time messaging systems, and
            AI-powered support workflows across React, Next.js, Node.js,
            PostgreSQL, Redis, AWS, Docker, and Cloudflare.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border bg-background/70 p-4 text-left shadow-sm"
              >
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View projects
              <ArrowDown className="h-4 w-4" />
            </Link>
            <Link
              href={RESUME_DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <FileText className="h-4 w-4" />
              Resume
            </Link>
            <Link
              href="mailto:rkrahul8181@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Mail className="h-4 w-4" />
              Email me
            </Link>
          </div>
          <div className="mt-7 flex justify-center gap-4 lg:justify-start">
            <SocialLink href={LINKEDIN_URL} label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </SocialLink>
            <SocialLink href={GITHUB_URL} label="GitHub">
              <Github className="h-5 w-5" />
            </SocialLink>
          </div>
        </div>

        <div className="order-first mx-auto w-full max-w-52 sm:max-w-sm lg:order-none lg:max-w-md">
          <div className="rounded-lg border bg-background p-4 shadow-xl">
            <div className="relative aspect-square overflow-hidden rounded-md bg-accent">
          <Image
            src={picture}
                alt="Rahul Kumar"
                fill
                priority
                sizes="(min-width: 1024px) 448px, 90vw"
                className="object-cover"
          />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-md bg-accent p-3">
                <div className="font-semibold">Core focus</div>
                <div className="mt-1 text-muted-foreground">
                  SaaS, queues, APIs, cloud
                </div>
              </div>
              <div className="rounded-md bg-accent p-3">
                <div className="font-semibold">Current stack</div>
                <div className="mt-1 text-muted-foreground">
                  TypeScript, AWS, Cloudflare
                </div>
              </div>
            </div>
          </div>
      </div>
      </div>
    </section>
  );
}

function SocialLink({
  href,
  children,
  label,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <Link
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 text-foreground/70 transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {children}
    </Link>
  );
}
