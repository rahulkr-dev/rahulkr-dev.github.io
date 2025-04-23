import Link from "next/link"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  ArrowRight,
} from "lucide-react"
import { Resume } from "@/components/resume"
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/constant"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-gradient-to-b from-background to-accent/20 pt-20 pb-8 border-t border-accent/10"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
              <div className="h-1 w-16 bg-primary rounded-full mb-4"></div>
              <p className="text-muted-foreground max-w-md">
                Feel free to reach out for collaborations, opportunities, or
                just a friendly chat about tech.
              </p>
            </div>

            <div className="space-y-4">
              <ContactItem
                icon={<Mail className="w-5 h-5" />}
                label="Email"
                value="rkrahul8181@gmail.com"
                href="mailto:rkrahul8181@gmail.com"
              />

              <ContactItem
                icon={<Phone className="w-5 h-5" />}
                label="Phone"
                value="+91 8745983389"
                href="tel:+918745983389"
              />
            </div>

            <Resume>
              <Button variant="outline" className="group">
                <Download className="mr-2 h-4 w-4" />
                <span>Download Resume</span>
                <ArrowRight className="ml-2 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Button>
            </Resume>
          </div>

          {/* Right Column - Connect & Map */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Connect</h2>
              <div className="h-1 w-16 bg-primary rounded-full mb-4"></div>
              <p className="text-muted-foreground max-w-md">
                Follow me on social media to stay updated with my latest
                projects and activities.
              </p>
            </div>

            <div className="flex space-x-4">
              <SocialLink
                href={LINKEDIN_URL}
                icon={<Linkedin className="w-5 h-5" />}
                label="LinkedIn"
                bgColor="bg-blue-600"
              />
              <SocialLink
                href={GITHUB_URL}
                icon={<Github className="w-5 h-5" />}
                label="GitHub"
                bgColor="bg-gray-800"
              />
              <SocialLink
                href="mailto:rkrahul8181@gmail.com"
                icon={<Mail className="w-5 h-5" />}
                label="Email"
                bgColor="bg-green-600"
              />
              <SocialLink
                href="tel:+918745983389"
                icon={<Phone className="w-5 h-5" />}
                label="Phone"
                bgColor="bg-purple-600"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-accent/20 mb-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rahul Kumar. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Made with ❤️ using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}

type ContactItemProps = {
  icon: React.ReactNode
  label: string
  value: string
  href: string
}

function ContactItem({ icon, label, value, href }: ContactItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center group hover:text-primary transition-colors"
    >
      <div className="mr-3 p-2 bg-accent/30 rounded-md border border-accent/20 group-hover:border-primary/20 group-hover:bg-primary/10 transition-all">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </Link>
  )
}

type SocialLinkProps = {
  href: string
  icon: React.ReactNode
  label: string
  bgColor: string
}

function SocialLink({ href, icon, label, bgColor }: SocialLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
      aria-label={label}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center text-white transition-all",
          "transform hover:scale-110 hover:shadow-lg",
          bgColor
        )}
      >
        {icon}
      </div>
      <span className="sr-only">{label}</span>
    </Link>
  )
}
