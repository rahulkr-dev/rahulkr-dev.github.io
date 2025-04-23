"use client"

import {
  FileJson2,
  Braces,
  CodepenIcon as ReactLogo,
  Server,
  Database,
  FishIcon as Whale,
  MessageSquare,
  CloudIcon,
  GitBranchIcon,
  Cloud,
  Code,
  Terminal,
  List,
  Monitor,
  ServerIcon,
  Layers,
  Star,
  Sparkles,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

const skills = [
  {
    name: "JavaScript",
    icon: FileJson2,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    description: "Expert in ES6+ features and async programming",
    category: "Frontend",
    level: 90,
  },
  {
    name: "TypeScript",
    icon: Braces,
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    description: "Strong typing and advanced TypeScript features",
    category: "Frontend",
    level: 85,
  },
  {
    name: "React",
    icon: ReactLogo,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    description: "Advanced state management and performance optimization",
    category: "Frontend",
    level: 90,
  },
  {
    name: "Next.js",
    icon: () => <span className="text-xl font-bold">N</span>,
    color: "text-foreground",
    bgColor: "bg-foreground/10",
    description: "Server-side rendering and API routes",
    category: "Frontend",
    level: 85,
  },
  {
    name: "Node.js",
    icon: Server,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    description: "Building scalable backend services",
    category: "Backend",
    level: 88,
  },
  {
    name: "Express",
    icon: Server,
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
    description: "RESTful API design and middleware development",
    category: "Backend",
    level: 85,
  },
  {
    name: "Docker",
    icon: Whale,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    description: "Containerization and orchestration",
    category: "Other",
    level: 80,
  },
  {
    name: "HTML",
    icon: Code,
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
    description: "Semantic markup and accessibility best practices",
    category: "Frontend",
    level: 95,
  },
  {
    name: "CSS",
    icon: Code,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    description: "Responsive design and CSS preprocessors",
    category: "Frontend",
    level: 90,
  },
  {
    name: "Tailwind CSS",
    icon: Code,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
    description: "Utility-first CSS framework for rapid UI development",
    category: "Frontend",
    level: 95,
  },
  {
    name: "Linux",
    icon: Terminal,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    description: "System administration and shell scripting",
    category: "Other",
    level: 75,
  },
  {
    name: "BullMQ",
    icon: MessageSquare,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    description: "Robust job and message queue for Node.js",
    category: "Backend",
    level: 80,
  },
  {
    name: "Kafka",
    icon: MessageSquare,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    description:
      "Distributed streaming platform for building real-time applications",
    category: "Backend",
    level: 70,
  },
  {
    name: "Cloudflared",
    icon: Cloud,
    color: "text-blue-300",
    bgColor: "bg-blue-300/10",
    description:
      "Secure tunneling service for exposing local servers to the internet",
    category: "Other",
    level: 75,
  },
  {
    name: "Redis",
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 32 32" fill="currentColor">
        <path d="M32 19.1l-5-2.4-1 1.7 5 2.4 1-1.7zM22 24.2l-5-2.4-1 1.7 5 2.4 1-1.7zM11 24.2l-5-2.4-1 1.7 5 2.4 1-1.7zM6 19.1l-5-2.4-1 1.7 5 2.4 1-1.7zM17 14.1l-5-2.4-1 1.7 5 2.4 1-1.7zM28 14.1l-5-2.4-1 1.7 5 2.4 1-1.7zM17 9.1l-5-2.4-1 1.7 5 2.4 1-1.7z" />
      </svg>
    ),
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    description: "Caching and pub/sub messaging",
    category: "Backend",
    level: 82,
  },
  {
    name: "MongoDB",
    icon: Database,
    color: "text-green-600",
    bgColor: "bg-green-600/10",
    description: "Schema design and aggregation pipelines",
    category: "Backend",
    level: 85,
  },
  {
    name: "PostgreSQL",
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.805 1.11c-1.614.115-2.837.703-3.695 1.702-.955 1.116-1.472 2.616-1.639 4.734-.05.637-.044 2.489.01 3.181.223 2.862.95 4.835 2.234 6.068.527.506 1.12.854 1.789 1.052.39.116.766.179 1.23.207.402.024.526.02.845-.027 1.425-.21 2.565-.878 3.451-2.022.72-.93 1.222-2.07 1.564-3.554.254-1.1.343-1.974.343-3.38 0-1.214-.076-2.06-.265-2.962-.508-2.417-1.692-4.228-3.332-5.092-.706-.372-1.562-.595-2.351-.614-.205-.005-.398.001-.584.018v-.311zm.412 1.115c1.707.196 3.058 1.244 3.753 2.91.476 1.142.714 2.338.761 3.83.022.7-.007 1.752-.07 2.582-.222 2.884-1.079 5.012-2.541 6.317-.59.526-1.324.912-2.125 1.118-.36.093-.518.11-.935.104-.415-.006-.523-.023-.88-.133-1.616-.499-2.826-1.924-3.392-3.99-.345-1.258-.508-2.63-.524-4.39-.013-1.41.098-2.533.36-3.68.334-1.46.953-2.621 1.799-3.365.517-.455 1.13-.79 1.81-.992.518-.154.989-.22 1.513-.21.21.003.421.02.634.049l-.163-.15z" />
      </svg>
    ),
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    description: "Complex queries and database optimization",
    category: "Backend",
    level: 80,
  },
  {
    name: "RabbitMQ",
    icon: MessageSquare,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    description: "Message queues and distributed systems",
    category: "Backend",
    level: 75,
  },
  {
    name: "AWS",
    icon: CloudIcon,
    color: "text-yellow-600",
    bgColor: "bg-yellow-600/10",
    description: "Cloud infrastructure and serverless architecture",
    category: "Other",
    level: 80,
  },
  {
    name: "GraphQL",
    icon: GitBranchIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    description: "API design and efficient data fetching",
    category: "Backend",
    level: 78,
  },
  {
    name: "S3",
    icon: Cloud,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    description: "Efficient storage and delivery using AWS S3 and CloudFront",
    category: "Other",
    level: 85,
  },
  {
    name: "Deployment",
    icon: Server,
    color: "text-green-600",
    bgColor: "bg-green-600/10",
    description:
      "Automating application deployment pipelines and infrastructure",
    category: "Other",
    level: 83,
  },
]

const categories = [
  { name: "All", icon: List },
  { name: "Frontend", icon: Monitor },
  { name: "Backend", icon: ServerIcon },
  { name: "Other", icon: Layers },
]

export function Skills() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [containerHeight, setContainerHeight] = useState(0)
  const [viewMode, setViewMode] = useState("grid") // "grid" or "list"
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gridRef.current) {
      setContainerHeight(
        Math.max(containerHeight, gridRef.current.offsetHeight)
      )
    }
  }, [activeCategory, containerHeight])

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  )

  // Sort skills by level (descending) for list view
  const sortedSkills = [...filteredSkills].sort((a, b) => b.level - a.level)

  return (
    <section
      id="skills"
      className="py-24 bg-gradient-to-b from-background to-accent/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="outline"
            className="px-4 py-1 text-sm font-medium rounded-full mb-4"
          >
            My Expertise
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-6 rounded-full" />
          <p className="mt-6 text-lg text-foreground/70 max-w-2xl mx-auto">
            {`I've acquired a diverse range of technical skills through hands-on experience building 
            scalable applications and continuous learning.`}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          {/* Categories */}
          <div className="flex overflow-auto gap-2 pb-2 w-full md:w-auto">
            {categories.map(({ name, icon: Icon }) => (
              <Button
                variant="ghost"
                key={name}
                onClick={() => setActiveCategory(name)}
                className={cn(
                  "relative h-10 px-4 rounded-full border border-transparent",
                  activeCategory === name
                    ? "border-primary/20 bg-primary/5 text-primary shadow-sm"
                    : "hover:bg-accent/50"
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                <span>{name}</span>
                {activeCategory === name && (
                  <motion.span
                    className="absolute inset-0 rounded-full border border-primary/30"
                    layoutId="activeCategory"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Button>
            ))}
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-2 bg-background/30 p-1 rounded-full border border-foreground/10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("grid")}
              className={cn(
                "h-8 rounded-full px-3",
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent hover:bg-accent/50"
              )}
            >
              <Monitor className="w-4 h-4 mr-2" />
              <span>Grid</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("list")}
              className={cn(
                "h-8 rounded-full px-3",
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent hover:bg-accent/50"
              )}
            >
              <List className="w-4 h-4 mr-2" />
              <span>List</span>
            </Button>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
                ref={gridRef}
              >
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.03,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div
                            className="flex flex-col items-center group cursor-pointer"
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div
                              className={cn(
                                "relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm",
                                skill.bgColor,
                                "before:absolute before:inset-0 before:rounded-2xl before:border before:border-foreground/5 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:dark:from-white/5"
                              )}
                            >
                              {/* Semi-circular progress indicator */}
                              <svg
                                className="absolute -bottom-1 w-full h-5"
                                viewBox="0 0 100 10"
                              >
                                <path
                                  d="M 0,10 C 30,3 70,3 100,10"
                                  fill="none"
                                  stroke={`hsl(var(--primary))`}
                                  strokeWidth="2"
                                  strokeDasharray="100"
                                  strokeDashoffset={100 - skill.level}
                                  className="transition-all duration-1000 ease-out"
                                />
                              </svg>
                              <skill.icon
                                className={cn(
                                  "w-9 h-9 transition-transform group-hover:scale-110",
                                  skill.color
                                )}
                              />
                            </div>
                            <span className="mt-3 text-sm font-medium text-center group-hover:text-primary transition-colors">
                              {skill.name}
                            </span>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent
                          className="bg-foreground text-background"
                          sideOffset={10}
                        >
                          <div className="text-center">
                            <span className="flex items-center justify-center gap-1 mb-1">
                              <Star className="w-3 h-3 fill-current" />
                              <span className="font-medium">
                                {skill.level}%
                              </span>
                            </span>
                            <p>{skill.description}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="space-y-3">
                  {sortedSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      className="bg-background/40 backdrop-blur-sm rounded-xl p-4 border border-foreground/5 hover:border-primary/20 shadow-sm hover:shadow transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
                            skill.bgColor
                          )}
                        >
                          <skill.icon className={cn("w-6 h-6", skill.color)} />
                        </div>

                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium">{skill.name}</h3>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-primary fill-primary mr-1" />
                              <span className="text-sm font-medium">
                                {skill.level}%
                              </span>
                            </div>
                          </div>

                          <p className="text-sm text-foreground/70">
                            {skill.description}
                          </p>

                          <div className="mt-2 w-full bg-foreground/10 rounded-full h-1.5 overflow-hidden">
                            <motion.div
                              className="h-full bg-primary"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{
                                duration: 1,
                                delay: 0.2 + index * 0.03,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Featured Skills */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-6 justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold">Core Expertise</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeaturedSkill
              title="Frontend Development"
              icon={Monitor}
              skills={["React", "Next.js", "TypeScript", "Tailwind CSS"]}
              description="Building responsive, accessible and performant user interfaces with modern frameworks and tools"
            />
            <FeaturedSkill
              title="Backend Development"
              icon={ServerIcon}
              skills={["Node.js", "Express", "MongoDB", "PostgreSQL"]}
              description="Creating robust APIs, handling database operations and implementing business logic"
            />
            <FeaturedSkill
              title="DevOps & Infrastructure"
              icon={Cloud}
              skills={["Docker", "AWS", "CI/CD", "Linux"]}
              description="Setting up and managing deployment pipelines, containers, and cloud resources"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

type FeaturedSkillProps = {
  title: string
  icon: React.ComponentType<{ className?: string }>
  skills: string[]
  description: string
}

function FeaturedSkill({
  title,
  icon: Icon,
  skills,
  description,
}: FeaturedSkillProps) {
  return (
    <motion.div
      className="bg-background/60 backdrop-blur-sm rounded-2xl p-6 border border-foreground/5 hover:border-primary/20 transition-all duration-300 hover:shadow-lg"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h4 className="text-lg font-bold">{title}</h4>
      </div>

      <p className="text-foreground/70 mb-4">{description}</p>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="bg-primary/10 text-primary hover:bg-primary/20 border-none"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </motion.div>
  )
}
