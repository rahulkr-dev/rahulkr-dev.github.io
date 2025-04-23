"use client"
import Image from "next/image"
import { Calendar, MapPin, Briefcase, Award, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import profileImage from "@/public/profile-image.jpeg"
import { Badge } from "@/components/ui/badge"

export function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-background to-accent/30"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Badge
            variant="outline"
            className="px-4 py-1 text-sm font-medium rounded-full mb-4"
          >
            About Me
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            My Journey
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-6 rounded-full" />
        </motion.div>

        <motion.div
          className="flex flex-col lg:flex-row gap-12 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          {/* Left Column - Profile */}
          <motion.div
            className="lg:w-1/3 flex flex-col items-center lg:sticky lg:top-24"
            variants={fadeIn}
          >
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative overflow-hidden rounded-3xl shadow-xl">
                <Image
                  className="h-80 w-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  src={profileImage}
                  alt="Profile picture"
                  width={320}
                  height={320}
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold">Rahul Kumar</h3>
              <p className="mt-1 text-lg text-primary">Full Stack Developer</p>

              <div className="mt-4 flex items-center justify-center text-foreground/60">
                <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-primary" />
                <span>Delhi, India</span>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <SkillBadge>TypeScript</SkillBadge>
                <SkillBadge>React.js</SkillBadge>
                <SkillBadge>Node.js</SkillBadge>
                <SkillBadge>AWS</SkillBadge>
                <SkillBadge>Docker</SkillBadge>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div className="lg:w-2/3 space-y-10" variants={fadeIn}>
            {/* Bio */}
            <div className="prose dark:prose-invert max-w-none">
              <motion.p className="text-lg leading-relaxed" variants={fadeIn}>
                {`I'm a passionate full stack developer with over 2 years of experience in creating robust and scalable web applications. My journey in tech started with a curiosity about how things work on the internet, which led me to dive deep into both front-end and back-end technologies.`}
              </motion.p>
              <motion.p className="text-lg leading-relaxed" variants={fadeIn}>
                I thrive in collaborative environments where I can contribute my
                skills to solve complex problems and create user-centric
                solutions. My approach to development is rooted in clean code
                practices, test-driven development, and continuous learning.
              </motion.p>
            </div>

            {/* Experience */}
            <motion.div variants={fadeIn}>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Briefcase className="mr-2 h-6 w-6 text-primary" />
                Experience
              </h3>
              <div className="space-y-8">
                <ExperienceCard
                  title="Full Stack Developer"
                  company="Veblika"
                  type="Full-time"
                  period="Aug 2023 - Present · 1 yr 5 mos"
                  description="I work on building automation tools to optimize workflows and improve efficiency. My role involves developing scalable applications using Node.js, Next.js, and TypeScript, deploying containerized solutions with Docker, and managing infrastructure on AWS."
                  skills={[
                    "TypeScript",
                    "React.js",
                    "AWS",
                    "Docker",
                    "Node.js",
                  ]}
                />

                <ExperienceCard
                  title="MERN Stack Developer"
                  company="CNS Web Technologies Pvt Ltd"
                  type="Full-time"
                  period="Jan 2023 - Aug 2023 · 8 mos"
                  description="I developed and maintained web applications using the MERN stack, focusing on REST APIs and UI development with React.js. I collaborated with cross-functional teams to ensure smooth deployment and integration of features."
                  skills={[
                    "React.js",
                    "Node.js",
                    "Express",
                    "MongoDB",
                    "REST APIs",
                  ]}
                />
              </div>
            </motion.div>

            {/* Certificates */}
            <motion.div variants={fadeIn}>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Award className="mr-2 h-6 w-6 text-primary" />
                Certificates
              </h3>
              <div className="bg-accent/30 rounded-2xl p-6 border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">
                      Full Stack Development
                    </h4>
                    <p className="text-foreground/70">Masai School</p>
                    <div className="flex items-center text-sm text-foreground/60 mt-1">
                      <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      <span>April 2022 - June 2023</span>
                    </div>
                    <p className="mt-3 text-foreground/80">
                      Completed intensive full stack development program
                      covering MERN stack, data structures, algorithms, and web
                      development best practices.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

type ExperienceCardProps = {
  title: string
  company: string
  type: string
  period: string
  description: string
  skills: string[]
}

function ExperienceCard({ title, company, type, period, description, skills }: ExperienceCardProps) {
  return (
    <div className="group relative">
      <div className="absolute -inset-px bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 rounded-2xl transition duration-300"></div>
      <div className="relative bg-accent/30 rounded-2xl p-6 border border-primary/10 group-hover:border-primary/20 transition-all duration-300 group-hover:shadow-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-bold">{title}</h4>
              <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-foreground/70">
              {company} · {type}
            </p>
            <div className="flex items-center text-sm text-foreground/60 mt-1">
              <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4" />
              <span>{period}</span>
            </div>
            <p className="mt-3 text-foreground/80">{description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="rounded-full text-xs"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SkillBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full hover:bg-primary/20 transition-colors">
      {children}
    </span>
  )
}
