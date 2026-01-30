import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { AnalyticsProvider } from "@/components/providers/analytics-provider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shiploop.io";

export const metadata: Metadata = {
  title: {
    default: "ShipLoop - The Indie Hacker Operating System",
    template: "%s | ShipLoop",
  },
  description:
    "Stop building in the dark. Ship with confidence. Track your Ship Score, maintain streaks, and compete with 2,800+ indie hackers building in public.",
  keywords: [
    "indie hacker",
    "shipping",
    "product",
    "startup",
    "dashboard",
    "analytics",
    "build in public",
    "ship score",
    "MRR tracking",
    "founder tools",
  ],
  authors: [{ name: "ShipLoop" }],
  creator: "ShipLoop",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ShipLoop",
    title: "ShipLoop - The Indie Hacker Operating System",
    description:
      "Stop building in the dark. Ship with confidence. Track your Ship Score, maintain streaks, and compete with 2,800+ indie hackers building in public.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ShipLoop - The Indie Hacker Operating System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShipLoop - The Indie Hacker Operating System",
    description:
      "Stop building in the dark. Ship with confidence. Track your Ship Score, maintain streaks, and compete with indie hackers worldwide.",
    images: ["/og-image.png"],
    creator: "@shiploop",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>
              <AnalyticsProvider>
              {/* Global background */}
              <div className="fixed inset-0 bg-background -z-50" />
              <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-muted/30 -z-40" />
              <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-40" />
              <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-40" />
              <div className="fixed inset-0 pattern-grid -z-30" />

              {children}
              </AnalyticsProvider>
              <Toaster
                position="bottom-right"
                toastOptions={{
                  classNames: {
                    toast: "bg-background border-border text-foreground shadow-lg",
                    title: "text-foreground font-medium",
                    description: "text-muted-foreground",
                    success: "!bg-emerald-50 dark:!bg-emerald-950/50 !border-emerald-200 dark:!border-emerald-800",
                    error: "!bg-red-50 dark:!bg-red-950/50 !border-red-200 dark:!border-red-800",
                  },
                }}
              />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
