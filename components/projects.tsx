import Image, { StaticImageData } from 'next/image'
import { Github, ExternalLink, ArrowRight } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import pizzaImage from "@/public/pizza.png"
import whatsappImage from "@/public/whatsapp-broadcast.png"

interface Project {
  title: string
  description: string
  image: StaticImageData
  technologies: string[]
  githubLink: string
  liveLink: string
}

const projects: Project[] = [
  {
    title: "Online Pizza Delivery",
    description: `A full-stack online pizza delivery application with user authentication, product catalog, order management, payment gateway integration, and real-time updates.`,
    image: pizzaImage,
    technologies: ["ReactJS", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "Kafka", "S3 Bucket", "Tailwind CSS", "Docker", "WebSocket"],
    githubLink: "#",
    liveLink: "#"
  },
  {
    title: "WhatsApp Message Broadcast",
    description: `A microservice for broadcasting WhatsApp messages using Meta's official WhatsApp Cloud API. It allows sending bulk messages to WhatsApp users programmatically.`,
    image: whatsappImage,
    technologies: ["Node.js", "Express", "Meta WhatsApp API", "Docker", "Redis", "AWS S3"],
    githubLink: "#",
    liveLink: "#"
  }
]

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-background to-slate-50 dark:to-slate-900/50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-4">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
          <p className="text-muted-foreground text-center max-w-xl">
            Explore some of my recent work showcasing my technical skills and problem-solving approach
          </p>
        </div>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
            >
              {/* Project Image with Hover Effect */}
              <div className="w-full md:w-1/2 group">
                <div className="relative overflow-hidden rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <div className="aspect-video relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="w-full md:w-1/2 space-y-6">
                <div>
                  <h3 className="text-3xl font-bold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground text-lg mb-6">{project.description}</p>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-sm uppercase tracking-wider font-semibold text-muted-foreground mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="px-3 py-1 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-2">
                  <Button variant="outline" className="group" asChild>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </Button>
                  <Button variant="default" className="group" asChild>
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="hidden md:block absolute -z-10 w-64 h-64 rounded-full blur-3xl opacity-20 bg-primary/30 
                  left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}