import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/lib/experience";

export function Experience() {
  return (
    <section id="experience" className="bg-accent py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Experience
        </p>
        <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
          Where I have shipped production systems.
        </h2>

        <div className="mt-10 space-y-6">
          {experience.map((item) => (
            <article
              key={`${item.company}-${item.period}`}
              className="premium-card rounded-lg bg-background p-6"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">{item.role}</h3>
                    {item.current ? <Badge>Current</Badge> : null}
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
    </section>
  );
}
