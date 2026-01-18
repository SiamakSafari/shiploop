import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ShipLoop - The Indie Hacker Operating System",
  description: "Build. Ship. Grow. Track. Repeat. The complete dashboard for indie hackers.",
  keywords: ["indie hacker", "shipping", "product", "startup", "dashboard", "analytics"],
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
          {/* Global background */}
          <div className="fixed inset-0 bg-background -z-50" />
          <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-muted/30 -z-40" />
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-40" />
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-40" />
          <div className="fixed inset-0 pattern-grid -z-30" />

          {children}
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
        </ThemeProvider>
      </body>
    </html>
  );
}
