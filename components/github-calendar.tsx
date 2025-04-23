"use client";

import { useState, useEffect } from "react";
import GitHubCalendar from "react-github-calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Github, Calendar, GitFork, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GitHubContributionCalendar({ username = "yourGithubUsername" }) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalContributions: 0,
    streak: 0,
    repositories: 0,
  });

  useEffect(() => {
    // Simulating API data loading
    const timer = setTimeout(() => {
      setLoading(false);
      // Simulated stats - in a real app, you would fetch these from GitHub API
      setStats({
        totalContributions: 1240,
        streak: 42,
        repositories: 28,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  interface GitHubContribution {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
  }

  const selectLastHalfYear = (contributions: GitHubContribution[]): GitHubContribution[] => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const shownMonths = 12;
    
    return contributions.filter((activity) => {
      const date = new Date(activity.date);
      const monthsAgo = (currentYear - date.getFullYear()) * 12 + (currentMonth - date.getMonth());
      return monthsAgo < shownMonths;
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-4">
            GitHub Activity
          </h2>
          <div className="h-1 w-16 bg-primary rounded-full mb-4"></div>
          <p className="text-muted-foreground text-center max-w-xl">
            A visual representation of my open-source contributions and coding activity
          </p>
        </div>

        <Card className="bg-background/80 backdrop-blur-sm border-accent/20 overflow-hidden relative">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          
          <CardHeader className="border-b border-accent/10 bg-accent/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center">
                <Github className="w-6 h-6 mr-3 text-primary" />
                <CardTitle className="text-2xl font-bold">GitHub Contributions</CardTitle>
              </div>
              <Badge variant="outline" className="flex items-center px-3 py-1 bg-background/50 self-start sm:self-auto">
                <Github className="w-4 h-4 mr-1" />
                <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {username}
                </a>
              </Badge>
            </div>
            <CardDescription className="mt-2">
              Last 12 months of coding activity and contributions
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            {loading ? (
              <div className="space-y-6">
                <Skeleton className="h-[120px] w-full" />
                <div className="grid grid-cols-3 gap-4">
                  <Skeleton className="h-24 rounded-lg" />
                  <Skeleton className="h-24 rounded-lg" />
                  <Skeleton className="h-24 rounded-lg" />
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="calendar-container overflow-x-auto pb-4">
                  <GitHubCalendar
                    username={username}
                    hideColorLegend
                    transformData={selectLastHalfYear}
                    renderBlock={(block, activity) => (
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>{block}</TooltipTrigger>
                          <TooltipContent side="top" className="font-medium">
                            <p>{`${activity.count} contribution${
                              activity.count === 1 ? "" : "s"
                            } on ${new Date(activity.date).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}`}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    theme={{
                      light: ['#f0f0f0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                      dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                    }}
                    fontSize={12}
                  />
                </div>

                {/* GitHub Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard 
                    icon={<Code className="w-5 h-5 text-emerald-500" />}
                    title="Total Contributions"
                    value={stats.totalContributions.toLocaleString()}
                    description="Code commits, PRs, issues, and reviews"
                  />
                  <StatCard 
                    icon={<Calendar className="w-5 h-5 text-blue-500" />}
                    title="Current Streak"
                    value={`${stats.streak} days`}
                    description="Consecutive days of activity"
                  />
                  <StatCard 
                    icon={<GitFork className="w-5 h-5 text-purple-500" />}
                    title="Repositories"
                    value={stats.repositories.toString()}
                    description="Public projects and contributions"
                  />
                </div>

                <div className="flex justify-center mt-4">
                  <Button variant="outline" className="group" asChild>
                    <a 
                      href={`https://github.com/${username}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      <span>View Full GitHub Profile</span>
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  description: string;
};

function StatCard({ icon, title, value, description }: StatCardProps) {
  return (
    <div className="bg-accent/5 rounded-lg p-4 border border-accent/10 flex items-start">
      <div className="p-3 rounded-md bg-background mr-4">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-sm text-muted-foreground">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}