"use client"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, FileText, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import picture from "@/public/coder-cartoon.png"
import { GITHUB_URL, LINKEDIN_URL, RESUME_DRIVE_URL } from "@/lib/constant"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Home() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Pattern Overlay (light grid) */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIzIDAgMi4xOTguOTY4IDIuMTk4IDIuMlYyMmEyLjIgMi4yIDAgMCAxLTQuMzk2IDB2LTEuOGMwLTEuMjMyLjk2OC0yLjIgMi4xOTgtMi4yeiIgZmlsbD0icmdiYSgwLDAsMCwwLjAyKSIvPjwvZz48L3N2Zz4=')] opacity-40 -z-10" />

      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content - Image & Social Links */}
          <motion.div
            className="w-full lg:w-2/5 flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative w-48 h-48 lg:w-64 lg:h-64 overflow-hidden rounded-full bg-background border-2 border-background">
                <Image
                  src={picture}
                  alt="Profile cartoon Picture"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="flex mt-8 space-x-3">
              <SocialLink href={LINKEDIN_URL} label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </SocialLink>
              <SocialLink href={GITHUB_URL} label="GitHub">
                <Github className="w-5 h-5" />
              </SocialLink>
              <SocialLink href={RESUME_DRIVE_URL} label="Resume">
                <FileText className="w-5 h-5" />
              </SocialLink>
            </div>
          </motion.div>

          {/* Right Content - Text & CTA */}
          <motion.div
            className="w-full lg:w-3/5 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-medium text-primary">{`Hello, I'm`}</h2>
            <h1 className="mt-2 mb-4 text-4xl lg:text-6xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Rahul Kumar
            </h1>
            <h3 className="text-xl lg:text-2xl font-medium text-foreground/80 mb-6">
              Full Stack Developer
            </h3>
            <p className="max-w-2xl mx-auto lg:mx-0 mb-8 text-lg text-foreground/70 leading-relaxed">
              Highly motivated and results-driven full stack developer with a
              proven track record of success in building innovative web
              applications. Passionate about creating efficient, scalable
              solutions and continuously learning new technologies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="rounded-full px-8 py-6 text-base font-medium hover:shadow-lg hover:scale-105 transition-all">
                Contact Me
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 text-base font-medium hover:bg-accent/50 transition-all"
              >
                View Projects
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-foreground/50 mb-2">
            Scroll Down
          </span>
          <ChevronDown className="w-5 h-5 text-foreground/50" />
        </div>
      </motion.div>
    </section>
  )
}

type SocialLinkProps = {
  href: string
  children: React.ReactNode
  label: string
  className?: string
}

function SocialLink({
  href,
  children,
  label,
  className = "",
}: SocialLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "group relative p-4 flex items-center justify-center transition-all duration-300",
        "bg-background hover:bg-primary/10 text-foreground/70 hover:text-primary",
        "rounded-full border border-foreground/10 hover:border-primary/30",
        "hover:shadow-md hover:scale-110",
        className
      )}
    >
      <span className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium">
        {label}
      </span>
      {children}
    </Link>
  )
}
