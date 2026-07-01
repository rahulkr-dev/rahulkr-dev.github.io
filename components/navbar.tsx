"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Resume } from "@/components/resume";
import { cn } from "@/lib/utils";

const NavLink = ({
  href,
  icon: Icon,
  children,
  className = "",
  ...restProps
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) => (
  <Link
    href={href}
    className={cn(
      `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors`,
      className
    )}
    {...restProps}
  >
    <Icon className="w-4 h-4" />
    <span>{children}</span>
  </Link>
);

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { href: "/", icon: Home, label: "Home" },
    { href: "#about", icon: User, label: "About" },
    { href: "#skills", icon: Code, label: "Skills" },
    { href: "#projects", icon: Briefcase, label: "Projects" },
    { href: "#contact", icon: Mail, label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-primary sm:text-2xl">
                Rahul Kumar
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline gap-1">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href} icon={link.icon}>
                  {link.label}
                </NavLink>
              ))}
              <Resume>Resume</Resume>
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
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* Mobile Menu Sheet */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader className="mb-4">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4">
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <NavLink
                        key={link.href}
                        href={link.href}
                        icon={link.icon}
                        className="w-full justify-start"
                      >
                        {link.label}
                      </NavLink>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Resume>Resume</Resume>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
