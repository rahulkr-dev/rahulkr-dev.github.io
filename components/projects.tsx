import { ExternalLink, Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/lib/projects";

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
              className="premium-card overflow-hidden rounded-lg bg-card"
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
                          <GithubIcon className="h-4 w-4" />
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
  return (
    <div className="flex min-h-72 items-center bg-accent p-6 sm:p-8">
      <div className="premium-card w-full rounded-lg bg-background p-5 shadow-sm">
        <div className="grid gap-3">
          {project.flow.map((item, index) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-md border p-3 transition-colors hover:border-primary/60"
            >
              <span className="text-sm font-medium">{item}</span>
              <span className="font-mono text-xs text-muted-foreground">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
