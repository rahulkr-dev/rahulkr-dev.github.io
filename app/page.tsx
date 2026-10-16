import { About } from "@/components/about";
import { Home } from "@/components/home";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { GitHubContributionCalendar } from "@/components/github-calendar";
import React from "react";
import { Projects } from "@/components/projects";
import { Footer } from "@/components/footer";

const RootPage = () => {
  return (
    <div>
      <Home />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <GitHubContributionCalendar username="rahulkr-dev" />
      <Footer />
    </div>
  );
};

export default RootPage;
