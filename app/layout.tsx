import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rahulkr-dev.github.io"),
  title: {
    default: "Rahul Kumar | Full-Stack Engineer",
    template: "%s | Rahul Kumar",
  },
  description:
    "Full-stack engineer building scalable SaaS platforms, live-class streaming, real-time messaging systems, and AI-powered support workflows with Python, FastAPI, Node.js, React, Google Cloud, AWS, and PostgreSQL.",
  keywords: [
    "Rahul Kumar",
    "Full Stack Developer",
    "Full Stack Engineer",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "FastAPI",
    "Google Cloud",
    "Live Streaming",
    "AWS",
    "Cloudflare",
    "PostgreSQL",
    "Distributed Systems",
  ],
  authors: [{ name: "Rahul Kumar", url: "https://rahulkr-dev.github.io" }],
  creator: "Rahul Kumar",
  openGraph: {
    title: "Rahul Kumar | Full-Stack Engineer",
    description:
      "Scalable SaaS, real-time messaging systems, cloud architecture, and AI-powered support workflows.",
    url: "https://rahulkr-dev.github.io",
    siteName: "Rahul Kumar",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Rahul Kumar | Full-Stack Engineer",
    description:
      "Full-stack engineer building scalable SaaS platforms, messaging systems, and AI support workflows.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
