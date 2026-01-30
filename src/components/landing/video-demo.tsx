"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoDemoProps {
  className?: string;
}

export function VideoDemo({ className }: VideoDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className={cn("py-20 px-4 md:px-6", className)}>
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            See It In Action
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Watch ShipLoop in Action
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            See how indie hackers use ShipLoop to track their progress,
            maintain streaks, and build in public.
          </p>
        </div>

        {/* Video container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 aspect-video bg-gray-900">
          {!isPlaying ? (
            /* Poster / Placeholder */
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
              {/* Background decorations */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
              </div>

              {/* Dashboard preview mockup */}
              <div className="absolute inset-8 md:inset-12 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm overflow-hidden">
                {/* Mock header bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-800/80 border-b border-gray-700/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 rounded-full bg-gray-700/50 text-xs text-gray-400">
                      shiploop.io/dashboard
                    </div>
                  </div>
                </div>

                {/* Mock dashboard content */}
                <div className="p-4 space-y-3">
                  <div className="flex gap-3">
                    <div className="w-1/3 h-20 rounded-lg bg-gray-700/40 shimmer" />
                    <div className="w-1/3 h-20 rounded-lg bg-gray-700/40 shimmer" style={{ animationDelay: "0.2s" }} />
                    <div className="w-1/3 h-20 rounded-lg bg-gray-700/40 shimmer" style={{ animationDelay: "0.4s" }} />
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2/3 h-32 rounded-lg bg-gray-700/40 shimmer" style={{ animationDelay: "0.6s" }} />
                    <div className="w-1/3 h-32 rounded-lg bg-gray-700/40 shimmer" style={{ animationDelay: "0.8s" }} />
                  </div>
                </div>
              </div>

              {/* Play button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="relative z-10 flex items-center justify-center h-20 w-20 rounded-full bg-primary/90 text-white shadow-xl transition-all hover:scale-110 hover:bg-primary active:scale-95 group"
              >
                <Play className="h-8 w-8 ml-1 transition-transform group-hover:scale-110" fill="currentColor" />

                {/* Pulse rings */}
                <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                <span className="absolute -inset-4 rounded-full border-2 border-primary/30 animate-pulse" />
              </button>

              {/* Label */}
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <p className="text-sm text-gray-400">
                  2 min product tour
                </p>
              </div>
            </div>
          ) : (
            /* Video player placeholder - replace src with actual video */
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              {/* Close button */}
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Placeholder when no video is available */}
              <div className="text-center text-gray-400">
                <Play className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">Video Coming Soon</p>
                <p className="text-sm mt-2 text-gray-500">
                  Our product demo is being recorded. Stay tuned!
                </p>
              </div>

              {/* Uncomment this when video is ready:
              <iframe
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
              */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
