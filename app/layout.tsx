import type { Metadata } from "next";
import {
  Playfair_Display,
  Source_Sans_3,
  JetBrains_Mono,
} from "next/font/google";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { BackToTop } from "@/components/ui/back-to-top";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000")
  ),
  title: "Jesus Rosario — Software Engineer",
  description:
    "Software Engineering Intern at YU & Associates. Full-stack developer specializing in React, Node.js, and TypeScript. NJIT WIS 2026.",
  openGraph: {
    title: "Jesus Rosario — Software Engineer",
    description:
      "Full-stack developer specializing in React, Node.js, and TypeScript.",
    url: "/",
    siteName: "Jesus Rosario",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesus Rosario — Software Engineer",
    description:
      "Full-stack developer specializing in React, Node.js, and TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem("theme");
                  var supportDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches === true;
                  if (!theme && supportDarkMode) theme = "dark";
                  if (theme === "dark") {
                    document.documentElement.classList.add("dark");
                  } else {
                    document.documentElement.classList.remove("dark");
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <SkipToContent />
          <Navbar />
          <main id="main-content">{children}</main>
          <BackToTop />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
