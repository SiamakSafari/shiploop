import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* 404 Display */}
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-primary/20">404</h1>
          <h2 className="text-2xl font-bold text-foreground">
            Page not found
          </h2>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Suggestions */}
        <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
          <p className="text-sm font-medium text-foreground">
            Here are some helpful links:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>
              <Link href="/dashboard" className="text-primary hover:underline">
                Dashboard
              </Link>{" "}
              - View your Ship Score and stats
            </li>
            <li>
              <Link href="/dashboard/projects" className="text-primary hover:underline">
                Projects
              </Link>{" "}
              - Manage your projects
            </li>
            <li>
              <Link href="/" className="text-primary hover:underline">
                Home
              </Link>{" "}
              - Back to the landing page
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="default" asChild>
            <Link href="/dashboard">
              <Home className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
