"use client";

import Link from "next/link";
import { Shield, Users, Settings, BarChart3 } from "lucide-react";

const adminLinks = [
  {
    title: "Waitlist",
    description: "Manage waitlist signups and send invites",
    href: "/admin/waitlist",
    icon: Users,
  },
  {
    title: "Analytics",
    description: "View platform analytics and metrics",
    href: "/admin/analytics",
    icon: BarChart3,
    disabled: true,
  },
  {
    title: "Settings",
    description: "Configure platform settings",
    href: "/admin/settings",
    icon: Settings,
    disabled: true,
  },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Manage ShipLoop platform settings and users
          </p>
        </div>

        {/* Admin Links Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.disabled ? "#" : link.href}
              className={`
                group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800 p-6 transition-all
                ${link.disabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:border-primary/50 hover:shadow-lg"
                }
              `}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 group-hover:bg-primary/10 transition-colors">
                  <link.icon className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-1">
                    {link.title}
                    {link.disabled && (
                      <span className="ml-2 text-xs font-normal text-gray-400">
                        Coming Soon
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {link.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back to App Link */}
        <div className="mt-8 text-center">
          <Link
            href="/dashboard"
            className="text-sm text-gray-500 hover:text-primary transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
