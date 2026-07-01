"use client";

import { useCallback, useEffect, useState } from "react";
import GitHubCalendar, { type Activity } from "react-github-calendar";
import {
  Activity as ActivityIcon,
  CalendarDays,
  ExternalLink,
  Flame,
  Github,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ContributionStats = {
  total: number;
  activeDays: number;
  longestStreak: number;
  bestDay: {
    count: number;
    date: string;
  };
  signature: string;
};

const contributionTheme = {
  light: ["#eef2f6", "#9be7c1", "#4fcf88", "#1e9d5a", "#0f5d3a"],
  dark: ["#1b1f24", "#123625", "#1d7042", "#28a95e", "#5ee08d"],
};

export function GitHubContributionCalendar({ username }: { username: string }) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<ContributionStats | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => window.clearTimeout(timer);
  }, []);

  const transformContributionData = useCallback((data: Activity[]) => {
    const nextStats = getContributionStats(data);

    window.queueMicrotask(() => {
      setStats((currentStats) =>
        currentStats?.signature === nextStats.signature
          ? currentStats
          : nextStats
      );
    });

    return data;
  }, []);

  return (
    <section id="github" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              GitHub
            </p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Engineering consistency in public.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              A snapshot of steady practice across production work, experiments,
              and side projects. The value is not the graph alone - it is the
              habit behind it.
            </p>
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-md border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Github className="h-4 w-4" />
            {username}
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
          </a>
        </div>

        <div className="mt-10 overflow-hidden rounded-lg border bg-card shadow-sm">
          <div className="grid lg:grid-cols-[18rem_minmax(0,1fr)]">
            <aside className="border-b bg-accent/60 p-5 sm:p-6 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold">Contribution pulse</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Last 12 months
                  </p>
                </div>
                <Badge variant="secondary" className="gap-1.5">
                  <ActivityIcon className="h-3.5 w-3.5" />
                  Live
                </Badge>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <StatTile
                  icon={Github}
                  label="Contributions"
                  value={stats ? formatNumber(stats.total) : null}
                />
                <StatTile
                  icon={CalendarDays}
                  label="Active days"
                  value={stats ? formatNumber(stats.activeDays) : null}
                />
                <StatTile
                  icon={Flame}
                  label="Longest streak"
                  value={stats ? `${stats.longestStreak} days` : null}
                />
                <StatTile
                  icon={ActivityIcon}
                  label="Best day"
                  value={
                    stats
                      ? `${stats.bestDay.count} on ${formatShortDate(
                          stats.bestDay.date
                        )}`
                      : null
                  }
                />
              </div>
            </aside>

            <div className="min-w-0 p-4 sm:p-6">
              <div className="overflow-x-auto pb-2">
                {loading ? (
                  <div className="min-w-[720px] space-y-3">
                    <Skeleton className="h-[122px] w-full" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ) : (
                  <GitHubCalendar
                    username={username}
                    hideColorLegend
                    hideTotalCount
                    showWeekdayLabels={["mon", "wed", "fri"]}
                    transformData={transformContributionData}
                    blockMargin={4}
                    blockRadius={3}
                    blockSize={12}
                    fontSize={12}
                    labels={{
                      weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    }}
                    renderBlock={(block, activity) => (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>{block}</TooltipTrigger>
                          <TooltipContent>
                            <p>{`${activity.count} contribution${
                              activity.count === 1 ? "" : "s"
                            } on ${new Date(
                              activity.date
                            ).toLocaleDateString()}`}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    theme={contributionTheme}
                  />
                )}
              </div>

              <div className="mt-5 flex flex-col gap-3 border-t pt-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <p>
                  Darker cells indicate higher activity. Hover any day for the
                  exact contribution count.
                </p>
                <div className="flex items-center gap-2">
                  <span>Less</span>
                  {contributionTheme.light.map((color) => (
                    <span
                      key={color}
                      className="h-3 w-3 rounded-sm border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null;
}) {
  return (
    <div className="rounded-md border bg-background p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        <span>{label}</span>
      </div>
      {value ? (
        <div className="mt-2 text-2xl font-bold tracking-tight">{value}</div>
      ) : (
        <Skeleton className="mt-3 h-8 w-28" />
      )}
    </div>
  );
}

function getContributionStats(data: Activity[]): ContributionStats {
  const total = data.reduce((sum, day) => sum + day.count, 0);
  const activeDays = data.filter((day) => day.count > 0).length;
  const bestDay = data.reduce(
    (best, day) => (day.count > best.count ? day : best),
    data[0] ?? { count: 0, date: "", level: 0 }
  );
  const longestStreak = getLongestStreak(data);

  return {
    total,
    activeDays,
    longestStreak,
    bestDay: {
      count: bestDay.count,
      date: bestDay.date,
    },
    signature: `${total}-${activeDays}-${longestStreak}-${bestDay.date}-${bestDay.count}`,
  };
}

function getLongestStreak(data: Activity[]) {
  let longestStreak = 0;
  let currentStreak = 0;

  for (const day of data) {
    if (day.count > 0) {
      currentStreak += 1;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return longestStreak;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatShortDate(value: string) {
  if (!value) {
    return "n/a";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}
