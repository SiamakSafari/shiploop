"use client";

import { Github, Twitter, Globe, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ProfileHeaderProps {
  user: {
    name: string;
    username: string;
    avatar: string;
    bio?: string;
    location?: string;
    website?: string;
    twitter?: string;
    github?: string;
    joinedDate: string;
    shipScore: number;
    tier: string;
    streak: number;
    projectCount: number;
  };
  className?: string;
}

export function ProfileHeader({ user, className }: ProfileHeaderProps) {
  return (
    <div className={cn("glass rounded-2xl p-8", className)}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="shrink-0">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/50 to-blue-500/50 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              {user.name}
            </h1>
            <span className="text-gray-500 dark:text-gray-400">
              @{user.username}
            </span>
          </div>

          {user.bio && (
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-lg">
              {user.bio}
            </p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            {user.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {user.location}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Joined {format(new Date(user.joinedDate), "MMM yyyy")}
            </span>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
              >
                <Globe className="h-4 w-4" />
                Website
              </a>
            )}
            {user.twitter && (
              <a
                href={`https://twitter.com/${user.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1DA1F2] transition-colors"
              >
                <Twitter className="h-4 w-4" />
                @{user.twitter}
              </a>
            )}
            {user.github && (
              <a
                href={`https://github.com/${user.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-50 transition-colors"
              >
                <Github className="h-4 w-4" />
                {user.github}
              </a>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-row md:flex-col gap-4 md:text-right">
          <div className="rounded-xl bg-primary/10 px-4 py-3 text-center">
            <div className="text-2xl font-bold text-primary">{user.shipScore}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Ship Score</div>
          </div>
          <div className="rounded-xl bg-gray-100 dark:bg-gray-800 px-4 py-3 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">{user.streak}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Day Streak</div>
          </div>
          <div className="rounded-xl bg-gray-100 dark:bg-gray-800 px-4 py-3 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">{user.projectCount}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Projects</div>
          </div>
        </div>
      </div>
    </div>
  );
}
