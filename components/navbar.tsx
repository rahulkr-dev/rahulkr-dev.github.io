"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  Moon,
  Sun,
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Menu,
  ChevronRight,
} from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Resume } from "@/components/resume"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

type NavLinkProps = {
  href: string
  icon: React.ElementType
  children: React.ReactNode
  className?: string
  isMobile?: boolean
}

const NavLink = ({
  href,
  icon: Icon,
  children,
  className = "",
  isMobile = false,
  ...restProps
}: NavLinkProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className={cn(
        `relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300`,
        isMobile ? "w-full justify-start py-3" : "hover:bg-accent/30",
        isHovered ? "text-primary" : "text-foreground/80",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...restProps}
    >
      <Icon className={cn("w-4 h-4", isHovered ? "text-primary" : "")} />
      <span>{children}</span>
      {!isMobile && isHovered && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      )}
      {isMobile && <ChevronRight className="ml-auto w-4 h-4 opacity-50" />}
    </Link>
  )
}

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) return null

  const navLinks = [
    { href: "/", icon: Home, label: "Home" },
    { href: "#about", icon: User, label: "About" },
    { href: "#skills", icon: Code, label: "Skills" },
    { href: "#projects", icon: Briefcase, label: "Projects" },
    { href: "#contact", icon: Mail, label: "Contact" },
  ]

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-lg"
          : "bg-background"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 group">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent group-hover:from-primary-foreground group-hover:to-primary transition-all duration-500">
                Portfolio
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href} icon={link.icon}>
                  {link.label}
                </NavLink>
              ))}
              <div className="ml-2">
                <Resume>
                  <Button
                    variant="default"
                    size="sm"
                    className="rounded-full px-6 hover:shadow-md hover:scale-105 transition-all duration-300"
                  >
                    Resume
                  </Button>
                </Resume>
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="rounded-full hover:bg-accent/30 transition-all duration-300"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-500" />
              )}
            </Button>

            {/* Mobile Menu Sheet */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-primary/20 hover:border-primary transition-all duration-300"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="border-l-primary/20">
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <div className="grid gap-1">
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <NavLink
                        href={link.href}
                        icon={link.icon}
                        className="hover:bg-accent/20 mb-1"
                        isMobile={true}
                      >
                        {link.label}
                      </NavLink>
                    </SheetClose>
                  ))}
                  <SheetClose asChild className="mt-4">
                    <div className="w-full">
                      <Resume>
                        <Button
                          variant="default"
                          className="w-full rounded-full py-6 hover:shadow-md"
                        >
                          View Resume
                        </Button>
                      </Resume>
                    </div>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
