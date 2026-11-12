import "./globals.css";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_URL } from "@/lib/constant";
import { experience } from "@/lib/experience";
import { NAME, ROLE, SUMMARY } from "@/lib/profile";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${NAME} | ${ROLE}`,
    template: "%s | Rahul Kumar",
  },
  description:
    "Full-stack engineer building scalable SaaS platforms, live-class streaming, real-time messaging systems, and AI-powered support workflows with Python, FastAPI, Node.js, React, Google Cloud, AWS, and PostgreSQL.",
  keywords: [
    "Rahul Kumar",
    "Full Stack Developer",
    "Full Stack Engineer",
    "AI Engineer",
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
  authors: [{ name: "Rahul Kumar", url: SITE_URL }],
  creator: "Rahul Kumar",
  openGraph: {
    title: `${NAME} | ${ROLE}`,
    description:
      "Scalable SaaS, real-time messaging systems, cloud architecture, and AI-powered support workflows.",
    url: SITE_URL,
    siteName: "Rahul Kumar",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${NAME} | ${ROLE}`,
    description:
      "Full-stack engineer building scalable SaaS platforms, messaging systems, and AI support workflows.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0e12" },
  ],
};

const currentRole = experience.find((item) => item.current);

/** Structured data, so search engines can show a proper profile result. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: NAME,
  jobTitle: ROLE,
  description: SUMMARY,
  url: SITE_URL,
  email: `mailto:${EMAIL}`,
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Delhi",
    addressCountry: "IN",
  },
  ...(currentRole
    ? { worksFor: { "@type": "Organization", name: currentRole.company } }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
