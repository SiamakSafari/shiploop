"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, LayoutDashboard, Bug } from "lucide-react";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle>Dashboard Error</CardTitle>
          <CardDescription>
            Something went wrong while loading this page. Your data is safe.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Error Details (development only) */}
          {process.env.NODE_ENV === "development" && (
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                <Bug className="w-4 h-4" />
                Debug Info
              </div>
              <p className="text-sm font-mono text-muted-foreground break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-1">
                  ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={reset} className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/dashboard">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard Home
              </Link>
            </Button>
          </div>

          {/* Tips */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Quick fixes to try:</p>
            <ul className="mt-1 space-y-1">
              <li>Refresh the page</li>
              <li>Clear your browser cache</li>
              <li>Check your internet connection</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
