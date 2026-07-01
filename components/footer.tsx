import Link from "next/link";
import { FileText, Github, Linkedin, Mail, Phone } from "lucide-react";
import { GITHUB_URL, LINKEDIN_URL, RESUME_DRIVE_URL } from "@/lib/constant";
import { cn } from "@/lib/utils";

const contactLinks = [
  {
    href: "mailto:rkrahul8181@gmail.com",
    label: "Email",
    value: "rkrahul8181@gmail.com",
    icon: Mail,
  },
  {
    href: "tel:+918745983389",
    label: "Phone",
    value: "+91 87459 83389",
    icon: Phone,
  },
  {
    href: LINKEDIN_URL,
    label: "LinkedIn",
    value: "linkedin.com/in/rahul-kumar-850b39232",
    icon: Linkedin,
    external: true,
  },
  {
    href: GITHUB_URL,
    label: "GitHub",
    value: "github.com/rahulkr-dev",
    icon: Github,
    external: true,
  },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-accent py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Open to full-stack roles focused on SaaS, cloud, and AI-enabled
              product systems.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              The best fit is a team that needs someone comfortable moving
              between React interfaces, Node.js services, queues, databases, and
              production deployments.
            </p>
            <Link
              href={RESUME_DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow transition duration-300 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <FileText className="h-4 w-4" />
              View resume
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {contactLinks.map(({ href, label, value, icon: Icon, external }) => (
              <FooterContactLink
                key={href}
                href={href}
                label={label}
                value={value}
                external={external}
              >
                <Icon className="h-5 w-5" />
              </FooterContactLink>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Rahul Kumar. Built with Next.js,
          TypeScript, and Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}

type FooterContactLinkProps = {
  href: string;
  label: string;
  value: string;
  children: React.ReactNode;
  external?: boolean;
};

function FooterContactLink({
  href,
  label,
  value,
  children,
  external,
}: FooterContactLinkProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "premium-card rounded-lg bg-background p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      <div className="flex items-center gap-3 text-primary">
        {children}
        <span className="font-semibold text-foreground">{label}</span>
      </div>
      <p className="mt-3 break-words text-sm text-muted-foreground">{value}</p>
    </Link>
  );
}
